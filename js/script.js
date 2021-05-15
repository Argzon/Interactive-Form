/**
 * Declaring Variables
 */
const form = document.querySelector('form');
const name = document.querySelector('#name');
const emailAddress = document.querySelector('#email');
const jobRole = document.querySelector('#title');
const otherJobRole = document.querySelector('#other-job-role');

// T-Shirt Info
const design = document.querySelector('#design');
const color = document.querySelector('#color');

// Register for Activities
const activities = document.querySelector('#activities');
const total = document.querySelector('#activities-cost');
const activitiesBox = document.querySelectorAll('input[type="checkbox"]');

// Payment info
const payment = document.querySelector('#payment');
const creditCard = document.querySelector('#credit-card');
const paypal = document.querySelector('#paypal');
const bitcoin = document.querySelector('#bitcoin');
const cardNumber = document.querySelector('#cc-num');
const zipCode = document.querySelector('#zip');
const cvv = document.querySelector('#cvv');


name.focus();

otherJobRole.style.display = 'none';

jobRole.addEventListener('change', (e) => {
    if (e.target.value == 'other') {
        otherJobRole.style.display = 'block';
    } else {
        otherJobRole.style.display = 'none';
    }
});

/**
 * T-Shirt Info Section
 */
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

/**
 * Register for Activities Section
 */
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

/**
 * Payment info Section
 */ 
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

/**
 * Form Validation
 */
form.addEventListener('submit', (e) => {
    // Name Validation
    if (!nameValidation() || !emailValidation() || !regActValidation() ) {
        e.preventDefault();
    } 

    // If credit card is selected
    if (payment.children[1].selected) {
        if(!creditCardValidation() || !zipCodeValidation() || !cvvCodeValidation()) {
            e.preventDefault();
        }
    }
})

// Name Validation function
function nameValidation() {
    return /^[A-Za-z]+$/.test(name.value);
}

// Email Validation function
function emailValidation() {
    return /[a-z0-9]+@[a-z]+\..+[.com]/ig.test(emailAddress.value);
}

// Register for Activities Validation function
function regActValidation() {
    let isChecked = 0;
    for (let i = 0; i < activitiesBox.length; i++) {
        if(activitiesBox[i].checked) {
            isChecked += 1;
        } else {
            isChecked += 0;
        }
    }
    return isChecked;
}

// Credit Card validation function
function creditCardValidation() {
    return /^[0-9]{13,16}$/.test(cardNumber.value);
}

// Zip Code Validation function
function zipCodeValidation() {
    return /^[0-9]{5}$/.test(zipCode.value);
}

// CVV Validation function
function cvvCodeValidation() {
    return /^[0-9]{3}$/.test(cvv.value);
}