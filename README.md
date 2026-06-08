# 💰 Interest Calculator Pro

A modern, feature-rich web application for calculating simple and compound interest with a beautiful UI.

## Features

✨ **Multiple Interest Calculation Methods**
- Simple Interest
- Compound Interest (Annual)
- Compound Interest (Monthly)
- Compound Interest (Quarterly)

📊 **Advanced Features**
- Real-time input validation with helpful error messages
- Beautiful, responsive UI that works on all devices
- Export results to CSV format
- Export results to PDF (using html2pdf library)
- Print-friendly formatting
- Calculation history with persistent storage (localStorage)
- Date range selection for flexible calculation periods

♿ **Accessibility**
- ARIA labels and descriptions
- Semantic HTML structure
- Keyboard-friendly form inputs
- Screen reader compatible

## How to Use

1. **Enter Principal Amount**: The initial amount you want to invest
2. **Enter Annual Rate of Interest**: The interest rate as a percentage
3. **Select Start Date**: When the investment begins
4. **Select End Date** (Optional): When the investment ends (defaults to today)
5. **Choose Interest Type**: Select your preferred calculation method
6. **Click Calculate**: See your results instantly
7. **Export or Print**: Download your calculations as CSV/PDF or print

## Calculation Methods Explained

### Simple Interest
- Formula: SI = (P × R × T) / 100
- Where: P = Principal, R = Rate per annum, T = Time in years
- Best for: Fixed deposits, loans with fixed interest

### Compound Interest
- Formula: A = P(1 + r/n)^(nt)
- Where: P = Principal, r = Rate, n = Compounding frequency, t = Time
- **Annual**: Compounded once per year
- **Monthly**: Compounded 12 times per year
- **Quarterly**: Compounded 4 times per year
- Best for: Savings accounts, investments with compounding

## Technical Stack

- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Modern styling with gradients, animations, and responsive design
- **JavaScript (Vanilla)**: No dependencies for core functionality
- **html2pdf.js**: For PDF export functionality
- **localStorage**: For calculation history persistence

## Files

- `index.html` - Main HTML structure
- `styles.css` - Comprehensive styling
- `script.js` - Application logic and calculations
- `README.md` - Documentation

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Features Breakdown

### Input Validation
- Non-empty fields required
- Positive values for principal and rate
- End date must be after start date
- Real-time error messages

### Results Display
- Duration in years, months, and days
- Interest amount
- Total amount (Principal + Interest)
- Interest calculation method used
- Input parameters displayed

### Export Options
- **CSV**: Open in Excel or any spreadsheet application
- **PDF**: Professional report format
- **Print**: System print dialog

### Calculation History
- Automatically saved to browser storage
- Up to 50 recent calculations
- Click to delete individual entries
- Clear all history with confirmation

## Formula Examples

### Simple Interest Calculation
```
Principal: ₹10,000
Rate: 5% per annum
Time Period: 1 year
Simple Interest = (10,000 × 5 × 1) / 100 = ₹500
Total Amount = ₹10,500
```

### Compound Interest Calculation (Annual)
```
Principal: ₹10,000
Rate: 5% per annum
Time Period: 1 year
Amount = 10,000 × (1 + 0.05/1)^(1×1) = ₹10,500
Compound Interest = ₹500
```

### Compound Interest Calculation (Monthly)
```
Principal: ₹10,000
Rate: 5% per annum
Time Period: 1 year
Amount = 10,000 × (1 + 0.05/12)^(12×1) = ₹10,511.62
Compound Interest = ₹511.62
```

## Data Privacy

- All calculations are performed locally in your browser
- No data is sent to any server
- Calculation history is stored only in your browser's localStorage
- Clear history anytime to remove all stored data

## Responsive Design

The application is fully responsive:
- **Desktop**: Full-width layout with multiple columns
- **Tablet**: Optimized grid layout
- **Mobile**: Single column layout with touch-friendly buttons

## Future Enhancements

Potential features for future versions:
- Dark mode toggle
- Multiple currency support
- Investment goal calculator
- Comparison between different interest types
- Charts and graphs for visualization
- Loan amortization schedule

## License

Open source - Feel free to use and modify

## Support

For issues or suggestions, please open an issue in the GitHub repository.

---

**Made with ❤️ by Interest Calculator Pro**
