document.addEventListener("DOMContentLoaded", function () {
    let storedValue = localStorage.getItem('incomeCategories');
    let totalIncomeDisplay = document.getElementById('totalIncomeDisplay');
    let taxRateTableBody = document.querySelector('#taxRateTable tbody');
    let calculateTaxBtn = document.getElementById('calculateTaxBtn');
    let taxResult = document.getElementById('taxResult');
    let amountLeftDisplay = document.getElementById('amountLeftDisplay');
    let payButton = document.getElementById('payButton');

    if (storedValue !== null) {
        let parsedValue = JSON.parse(storedValue);

        let totalIncome = 0;
        parsedValue.forEach(item => {
            let income = parseFloat(item.income);
            totalIncome += income;
        });

        totalIncomeDisplay.textContent = totalIncome.toFixed(2);

        // Define tax rates
        let taxRates = [
            { threshold: 4000, rate: 0.20 },
            { threshold: 3000, rate: 0.15 },
            { threshold: 2000, rate: 0.10 },
            { threshold: 1000, rate: 0.05 }
        ];

        // Display tax rates in table
        taxRates.forEach(rate => {
            let row = taxRateTableBody.insertRow();
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            cell1.textContent = `Income above ₹${rate.threshold.toFixed(2)}`;
            cell2.textContent = `${rate.rate * 100}%`;
        });

        // Calculate tax and amount left
        calculateTaxBtn.addEventListener('click', function () {
            // Disable the button
            calculateTaxBtn.disabled = true;

            let applicableRate = taxRates.find(rate => totalIncome >= rate.threshold);
            let tax = 0;
            if (applicableRate) {
                if (totalIncome >= applicableRate.threshold) {
                    tax = totalIncome * applicableRate.rate;
                }
            }

            let amountLeft = totalIncome - tax;
            taxResult.textContent = `Tax to pay: ₹${tax.toFixed(2)}`;
            amountLeftDisplay.textContent = `Amount left after tax: ₹${amountLeft.toFixed(2)}`;

            // Show pay button
            payButton.style.display = 'block';
            payButton.addEventListener('click', function () {
                // Simulate payment processing
                alert('Payment processed successfully!');
                payButton.disabled = true;

                // Reset tax amount
                taxResult.textContent = 'Tax to pay: ₹0.00';
            });
        });
    }
});
