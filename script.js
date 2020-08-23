const total = document.querySelector('#total');
const form = document.querySelector('#parking-form');

form.addEventListener('submit', function (event) {
    event.preventDefault();
    let days = document.querySelector('#days').value;
    console.log('$' + days + '||' + days * 5);
    let cost = days * 5;

    total.innerHTML = '$' + cost;
})