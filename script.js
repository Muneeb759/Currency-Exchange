// Getting Elements from DOM

const currOnePicker = document.getElementById('currency-one');
const currTwoPicker = document.getElementById('currency-two');
const currOneAmount = document.getElementById('amount-one');
const currTwoAmount = document.getElementById('amount-two');
const FlipBtn = document.getElementById('flip');
const rate = document.getElementById('rate'); 

// Fetch exchange rate from 3rd Party API and update DOM
// www.exchangerate-api.com
 
function calculate() {
    const currencyOneCode = currOnePicker.value;
    const currencyTwoCode = currTwoPicker.value;

    fetch(`https://v6.exchangerate-api.com/v6/245896f307441d7f5dc3521b/latest/${currencyOneCode}`)
    .then( res => res.json() )
    .then(data => {
        // Get the Exchange Rate from API Data
        const exchangeRate = data.conversion_rates[currencyTwoCode];

        // Display the conversion rate
        rate.innerText = `1 ${currencyOneCode} = ${exchangeRate} ${currencyTwoCode}`;

        // Apply Conversion rate and Update Amount of Currency Two 
        currTwoAmount.value = (currOneAmount.value * exchangeRate).toFixed(2);       
    });
}

// Flip btn to reverse currency
function flip (){
    const temp =  currOnePicker.value;
    currOnePicker.value = currTwoPicker.value;
    currTwoPicker.value = temp;
    calculate();
};

// Event Listeners

currOnePicker.addEventListener('change', calculate);
currTwoPicker.addEventListener('change', calculate);
currOneAmount.addEventListener('input', calculate);
currTwoAmount.addEventListener('input', calculate);
FlipBtn.addEventListener('click', flip)


calculate();