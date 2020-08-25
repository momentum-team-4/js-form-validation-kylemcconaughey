const total = document.querySelector('#total');
const form = document.querySelector('#parking-form');

// Puts the total price in the #total div
form.addEventListener('submit', function (event) {
    event.preventDefault();
    let cost = price();

    total.innerHTML = '$' + cost;
})

const today = new Date();
const year = today.getFullYear();
const date = today.getDate();
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const month = months[today.getMonth()];
const monthIndex = today.getMonth();

//calculates price with $5 for weekdays, $7 for weekends
function price() {
    const dayHolder = document.querySelector('#start-date').value;
    startDate = new Date(dayHolder + 'T00:00');
    const weekDay = startDate.getDay();
    const numDays = document.querySelector('#days').value;
    let priceAgg = 0;
    for (i = 0; i < numDays; i++) {
        let check = weekDay + i + 1;
        if ((check % 7) > 1) {
            priceAgg += 5;
        } else {
            priceAgg += 7;
        }
    }
    return priceAgg;
}

////////////////////////
//magic with algorithms probably
function validateCardNumber(number) {
    var regex = new RegExp("^[0-9]{16}$");
    if (!regex.test(number))
        return false;

    return luhnCheck(number);
}

function luhnCheck(val) {
    var sum = 0;
    for (var i = 0; i < val.length; i++) {
        var intVal = parseInt(val.substr(i, 1));
        if (i % 2 == 0) {
            intVal *= 2;
            if (intVal > 9) {
                intVal = 1 + (intVal % 10);
            }
        }
        sum += intVal;
    }
    return (sum % 10) == 0;
}


const ccnum = document.querySelector('#credit-card').value;
const ccfield = document.querySelector('#credit-card');

//Ensures credit card number is valid
ccfield.addEventListener('focusout', function () {
    console.log(validateCardNumber(document.querySelector('#credit-card').value));
    if (validateCardNumber(document.querySelector('#credit-card').value)) {
        ccfield.setCustomValidity('')
    } else {
        ccfield.setCustomValidity('Please enter a 16 digit CC number')
    }
})

const parkDate = document.querySelector('#start-date');
//ensures parking date is in the future
parkDate.addEventListener('focusout', function () {
    let currentStamp = today.valueOf();
    let parkingStamp = parkDate.valueAsNumber + 86400000;
    console.log(parkingStamp > currentStamp);
    if (parkingStamp > currentStamp) {
        parkDate.setCustomValidity('')
    } else {
        parkDate.setCustomValidity('Please choose a date in the future!');
    }
})

const carYearField = document.querySelector('#car-year');
//ensures the car year is equal to or before current year
carYearField.addEventListener('focusout', function () {
    if (year >= document.querySelector('#car-year').valueAsNumber) {
        carYearField.setCustomValidity('')
    } else {
        carYearField.setCustomValidity('Please choose a year before or equal to the current year')
    }
})

const expField = document.querySelector('#expiration');
//ensures the credit card expiration date is in the future
expField.addEventListener('focusout', function () {
    let monthTemp = document.querySelector('#expiration').valueAsDate;
    monthTemp.setMonth(monthTemp.getMonth() + 1);
    let yearTemp = document.querySelector('#expiration').valueAsDate;

    let expMonth = monthTemp.getMonth();
    let expYear = yearTemp.getFullYear();

    if ((expMonth >= monthIndex) && (expYear >= year)) {
        expField.setCustomValidity('')
    } else {
        expField.setCustomValidity('Please choose a month and year greater than or equal to the current one')

    }
})
