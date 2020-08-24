const total = document.querySelector('#total');
const form = document.querySelector('#parking-form');

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


function price() {
    const dayHolder = document.querySelector('#start-date').value;
    startDate = new Date(dayHolder + 'T00:00');
    // const firstDay = new Date(startDate);
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

ccfield.addEventListener('focusout', function () {
    console.log(validateCardNumber(document.querySelector('#credit-card').value));
    if (validateCardNumber(document.querySelector('#credit-card').value)) {
        ccfield.setCustomValidity('')
    } else {
        ccfield.setCustomValidity('Please enter a 16 digit CC number')
    }
})
//      4111111111111111

const parkDate = document.querySelector('#start-date');

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

carYearField.addEventListener('focusout', function () {
    let carYear = carYearField.valueAsNumber;
    if (carYear > year) {
        parkDate.setCustomValidity('ruh roh')
    } else {
        parkDate.setCustomValidity('');
    }
})