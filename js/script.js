const name = document.getElementById('name');
name.focus();

const jobRole = document.querySelector('#title');
const otherJobRole = document.querySelector('#other-job-role');

otherJobRole.style.display = 'none';

jobRole.addEventListener('change', (e) => {
    if (e.target.value == 'other') {
        otherJobRole.style.display = 'block';
    } else {
        otherJobRole.style.display = 'none';
    }
});

// T-Shirt Info
const design = document.querySelector('#design');
const color = document.querySelector('#color');
const colorChildren = color.children;

color.disabled = true;

design.addEventListener('change', (e) => {
    color.disabled = false;
    for ( let i = 1; i < colorChildren.length; i++ ) {
        const val = e.target.value;
        const attr = colorChildren[i].getAttribute('data-theme');
        if (val !== attr) {
            colorChildren[i].setAttribute('hidden', 'true');
        } else {
            colorChildren[i].removeAttribute('hidden');
        }
    }
})

// Register for Activities
const activities = document.querySelector('#activities');
const total = document.querySelector('#activities-cost');
let totalCosts = 0;

activities.addEventListener('change', (e) => {
    let dataCost = +e.target.getAttribute('data-cost');
    if (e.target.checked) {
        totalCosts += dataCost;
    } else {
        totalCosts -= dataCost;
    }
    total.innerHTML = `Total: $${totalCosts}`;
})

// Payment info
const payment = document.querySelector('#payment');
const creditCard = document.querySelector('#credit-card');
const paypal = document.querySelector('#paypal');
const bitcoin = document.querySelector('#bitcoin');

paypal.setAttribute('style', 'display: none');
bitcoin.setAttribute('style', 'display: none');

payment.children[1].setAttribute('selected', true);

payment.addEventListener('change', (e) => {
    if (e.target.value == 'bitcoin') {
        bitcoin.style.display = 'block';
        creditCard.style.display = 'none';
        paypal.style.display = 'none';
    } else if (e.target.value == 'paypal') {
        bitcoin.style.display = 'none';
        creditCard.style.display = 'none';
        paypal.style.display = 'block';
    } else {
        bitcoin.style.display = 'none';
        creditCard.style.display = 'block';
        paypal.style.display = 'none';
    }
})