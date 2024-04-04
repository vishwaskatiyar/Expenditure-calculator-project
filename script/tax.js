document.addEventListener("DOMContentLoaded", function () {
    let storedValue = localStorage.getItem('incomeCategories');
    let totalIncomeDisplay = document.getElementById('totalIncomeDisplay');
    let taxRateTableBody = document.querySelector('#taxRateTable tbody');
    let calculateTaxBtn = document.getElementById('calculateTaxBtn');
    let taxResult = document.getElementById('taxResult');
    let amountLeftDisplay = document.getElementById('amountLeftDisplay');
    let payButton = document.getElementById('rzp-button1');

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
            { threshold: 40000, rate: 0.20 },
            { threshold: 30000, rate: 0.15 },
            { threshold: 20000, rate: 0.10 },
            { threshold: 10000, rate: 0.05 }
        ];

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

            // Razorpay integration
            parsedValue.forEach((item, index) => {
                let options = {
                    "key": "rzp_test_ghXPZiJim09ftB",
                    "amount": tax * 100, // Assuming you have tax amount stored in 'item.tax'
                    "currency": "INR",
                    "name": "Acme Corp", // your business name
                    "description": "Test Transaction",
                    "image": "https://example.com/your_logo",
                    "order_id": item.order_id, // Assuming you have the order ID stored in 'item.order_id'
                    "handler": function (response) {
                        taxResult.textContent = `Tax to pay: ₹0.00`;


                        alert(response.razorpay_payment_id);
                        // alert(response.razorpay_order_id);
                        // alert(response.razorpay_signature)
                    },
                    "prefill": {
                        "name": "Vishwas Katiyar", // your customer's name
                        "email": "vishwas.kumar@example.com",
                        "contact": "9000090000"
                    },
                    "notes": {
                        "address": "Razorpay Corporate Office"
                    },
                    "theme": {
                        "color": "#3399cc"
                    }
                };

                let rzp = new Razorpay(options);

                // Set onclick event handler for the Razorpay button
                let rzpButton = document.getElementById(`rzp-button${index + 1}`);
                if (rzpButton) {
                    rzpButton.onclick = function (e) {
                        rzp.open();
                        e.preventDefault();
                    };
                }
            });
        });

        // Display tax rates in table
        taxRates.forEach(rate => {
            let row = taxRateTableBody.insertRow();
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            cell1.textContent = `Income above ₹${rate.threshold.toFixed(2)}`;
            cell2.textContent = `${rate.rate * 100}%`;
        });
    }
});
