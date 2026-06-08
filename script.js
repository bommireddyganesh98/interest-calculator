// Constants
const DAYS_IN_YEAR = 365;
const MONTHS_IN_YEAR = 12;

// State
let calculationHistory = [];
let lastCalculation = null;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadHistory();
    // Set today as default for start date
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('startDate').value = today;
});

/**
 * Validate form inputs
 */
function validateForm() {
    const principal = parseFloat(document.getElementById('principal').value);
    const rate = parseFloat(document.getElementById('rate').value);
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;

    // Validation checks
    if (!principal || principal <= 0) {
        showError('Principal amount must be greater than 0');
        return false;
    }

    if (!rate || rate < 0) {
        showError('Rate of interest must be a valid positive number');
        return false;
    }

    if (!startDate) {
        showError('Start date is required');
        return false;
    }

    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();

    if (start >= end) {
        showError('Start date must be before end date');
        return false;
    }

    return true;
}

/**
 * Calculate interest based on selected method
 */
function calculate(event) {
    if (event) event.preventDefault();

    if (!validateForm()) {
        return;
    }

    closeAlert();

    const principal = parseFloat(document.getElementById('principal').value);
    const rate = parseFloat(document.getElementById('rate').value);
    const startDate = new Date(document.getElementById('startDate').value);
    const endDate = document.getElementById('endDate').value 
        ? new Date(document.getElementById('endDate').value) 
        : new Date();
    const interestType = document.getElementById('interestType').value;

    // Calculate time period
    const { years, months, days, totalDays } = calculateTimePeriod(startDate, endDate);

    let interest = 0;
    let typeLabel = '';

    switch (interestType) {
        case 'simple':
            interest = calculateSimpleInterest(principal, rate, totalDays);
            typeLabel = 'Simple Interest';
            break;
        case 'compound':
            interest = calculateCompoundInterest(principal, rate, years, months, days, 1);
            typeLabel = 'Compound Interest (Annual)';
            break;
        case 'compound-monthly':
            interest = calculateCompoundInterest(principal, rate, years, months, days, 12);
            typeLabel = 'Compound Interest (Monthly)';
            break;
        case 'compound-quarterly':
            interest = calculateCompoundInterest(principal, rate, years, months, days, 4);
            typeLabel = 'Compound Interest (Quarterly)';
            break;
    }

    const total = principal + interest;

    // Store calculation
    lastCalculation = {
        principal,
        rate,
        interest,
        total,
        typeLabel,
        startDate: startDate.toDateString(),
        endDate: endDate.toDateString(),
        duration: `${years} years ${months} months ${days} days`,
        timestamp: new Date().toLocaleString()
    };

    // Display results
    displayResults(principal, rate, interest, total, typeLabel, years, months, days);
}

/**
 * Calculate simple interest
 * SI = (P × R × T) / 100
 * where T is in years as decimal
 */
function calculateSimpleInterest(principal, rate, totalDays) {
    const timeInYears = totalDays / DAYS_IN_YEAR;
    return (principal * rate * timeInYears) / 100;
}

/**
 * Calculate compound interest
 * A = P(1 + r/n)^(nt)
 * where:
 * P = principal
 * r = annual rate (as decimal)
 * n = compounding frequency per year
 * t = time in years
 */
function calculateCompoundInterest(principal, rate, years, months, days, frequency) {
    const totalMonths = years * MONTHS_IN_YEAR + months + (days / 30);
    const totalYears = totalMonths / MONTHS_IN_YEAR;
    
    const r = rate / 100;
    const amount = principal * Math.pow(1 + r / frequency, frequency * totalYears);
    
    return amount - principal;
}

/**
 * Calculate time period between two dates
 */
function calculateTimePeriod(startDate, endDate) {
    let years = endDate.getFullYear() - startDate.getFullYear();
    let months = endDate.getMonth() - startDate.getMonth();
    let days = endDate.getDate() - startDate.getDate();

    if (days < 0) {
        months--;
        days += 30;
    }

    if (months < 0) {
        years--;
        months += MONTHS_IN_YEAR;
    }

    const totalDays = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));

    return { years, months, days, totalDays };
}

/**
 * Display calculation results
 */
function displayResults(principal, rate, interest, total, typeLabel, years, months, days) {
    const resultSection = document.getElementById('resultSection');

    document.getElementById('duration').textContent = 
        `${years} years ${months} months ${days} days`;
    document.getElementById('interest').textContent = 
        `₹${interest.toFixed(2)}`;
    document.getElementById('total').textContent = 
        `₹${total.toFixed(2)}`;
    document.getElementById('typeDisplay').textContent = typeLabel;
    document.getElementById('principalDisplay').textContent = principal.toFixed(2);
    document.getElementById('rateDisplay').textContent = rate.toFixed(2);

    resultSection.classList.add('show');

    // Scroll to results
    resultSection.scrollIntoView({ behavior: 'smooth' });
}

/**
 * Export to CSV
 */
function exportCSV() {
    if (!lastCalculation) {
        showError('Please calculate interest first');
        return;
    }

    const { principal, rate, interest, total, typeLabel, startDate, endDate, duration } = lastCalculation;

    let csv = 'Interest Calculator Report\n';
    csv += `Generated: ${new Date().toLocaleString()}\n\n`;
    csv += 'Calculation Details\n';
    csv += `Principal,Rate (%),Interest Type,Start Date,End Date,Duration,Interest Amount,Total Amount\n`;
    csv += `${principal.toFixed(2)},${rate.toFixed(2)},${typeLabel},${startDate},${endDate},${duration},${interest.toFixed(2)},${total.toFixed(2)}`;

    downloadFile(csv, 'interest-calculation.csv', 'text/csv');
}

/**
 * Export to PDF
 */
function exportPDF() {
    if (!lastCalculation) {
        showError('Please calculate interest first');
        return;
    }

    const element = document.getElementById('resultSection');
    const opt = {
        margin: 10,
        filename: 'interest-calculation.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
    };

    html2pdf().set(opt).from(element).save();
}

/**
 * Print results
 */
function printResults() {
    if (!lastCalculation) {
        showError('Please calculate interest first');
        return;
    }

    window.print();
}

/**
 * Add to history
 */
function addToHistory() {
    if (!lastCalculation) {
        showError('Please calculate interest first');
        return;
    }

    calculationHistory.unshift({
        ...lastCalculation,
        id: Date.now()
    });

    // Keep only last 50 items
    if (calculationHistory.length > 50) {
        calculationHistory.pop();
    }

    saveHistory();
    displayHistory();
    showSuccess('Calculation added to history');
}

/**
 * Display history
 */
function displayHistory() {
    const historyList = document.getElementById('historyList');
    const clearBtn = document.getElementById('clearHistoryBtn');

    if (calculationHistory.length === 0) {
        historyList.innerHTML = '<div class="empty-state">No calculations in history yet</div>';
        clearBtn.style.display = 'none';
        return;
    }

    historyList.innerHTML = calculationHistory.map(item => `
        <div class="history-item">
            <div class="history-item-info">
                <strong>${item.typeLabel}</strong><br>
                Principal: ₹${item.principal.toFixed(2)} | 
                Rate: ${item.rate.toFixed(2)}% | 
                Interest: ₹${item.interest.toFixed(2)} | 
                Total: ₹${item.total.toFixed(2)}<br>
                <small>${item.timestamp}</small>
            </div>
            <button class="history-item-delete" onclick="deleteHistoryItem(${item.id})">Delete</button>
        </div>
    `).join('');

    clearBtn.style.display = 'block';
}

/**
 * Delete history item
 */
function deleteHistoryItem(id) {
    calculationHistory = calculationHistory.filter(item => item.id !== id);
    saveHistory();
    displayHistory();
}

/**
 * Clear entire history
 */
function clearHistory() {
    if (confirm('Are you sure you want to clear all calculation history?')) {
        calculationHistory = [];
        saveHistory();
        displayHistory();
        showSuccess('History cleared');
    }
}

/**
 * Save history to localStorage
 */
function saveHistory() {
    localStorage.setItem('interestCalculatorHistory', JSON.stringify(calculationHistory));
}

/**
 * Load history from localStorage
 */
function loadHistory() {
    const stored = localStorage.getItem('interestCalculatorHistory');
    if (stored) {
        try {
            calculationHistory = JSON.parse(stored);
            displayHistory();
        } catch (e) {
            console.error('Failed to load history:', e);
        }
    }
}

/**
 * Download file
 */
function downloadFile(content, filename, type) {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

/**
 * Show error message
 */
function showError(message) {
    const alert = document.getElementById('errorAlert');
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.textContent = message;
    alert.classList.add('show');
}

/**
 * Show success message
 */
function showSuccess(message) {
    const alert = document.getElementById('errorAlert');
    alert.classList.remove('alert-error');
    alert.classList.add('alert-success');
    alert.style.backgroundColor = '#efe';
    alert.style.color = '#3c3';
    alert.style.borderLeftColor = '#3c3';
    document.getElementById('errorMessage').textContent = message;
    alert.classList.add('show');
    
    setTimeout(() => {
        alert.classList.add('alert-error');
        alert.classList.remove('alert-success');
        alert.style.backgroundColor = '';
        alert.style.color = '';
        alert.style.borderLeftColor = '';
    }, 3000);
}

/**
 * Close alert
 */
function closeAlert() {
    document.getElementById('errorAlert').classList.remove('show');
}
