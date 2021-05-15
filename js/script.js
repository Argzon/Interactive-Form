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
const inputCheckbox = document.querySelectorAll('input[type="checkbox"]');
const activitiesBox = document.querySelector('#activities-box');


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
        otherJobRole.focus();
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

    let morningTime = document.querySelectorAll("[data-day-and-time='Tuesday 9am-12pm']");
    let afternoonTime = document.querySelectorAll("[data-day-and-time='Tuesday 1pm-4pm']");

    // when box is checked, disable checkbox for any conflicting event

    if(morningTime[0].checked == true) {
        morningTime[1].disabled = true;
        morningTime[1].parentElement.classList.add('disabled');
    } else if(morningTime[0].checked == false) {
        morningTime[1].disabled = false;
        morningTime[1].parentElement.classList.remove('disabled');
    }

    if(morningTime[1].checked == true) {
        morningTime[0].disabled = true;
        morningTime[0].parentElement.classList.add('disabled');
    } else if(morningTime[1].checked == false) {
        morningTime[0].disabled = false;
        morningTime[0].parentElement.classList.remove('disabled');
    }

    if(afternoonTime[0].checked == true) {
        afternoonTime[1].disabled = true;
        afternoonTime[1].parentElement.classList.add('disabled');
    } else if(afternoonTime[0].checked == false) {
        afternoonTime[1].disabled = false;
        afternoonTime[1].parentElement.classList.remove('disabled');
    }

    if(afternoonTime[1].checked == true) {
        afternoonTime[0].disabled = true;
        afternoonTime[0].parentElement.classList.add('disabled');
    } else if(afternoonTime[1].checked == false) {
        afternoonTime[0].disabled = false;
        afternoonTime[0].parentElement.classList.remove('disabled');
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
    if (nameValidation()) {
        isValid(name);
    } else {
        e.preventDefault();
        notValid(name);
    }

    // Email Validation
    if (emailValidation()) {
        isValid(emailAddress);
    } else {
        e.preventDefault();
        notValid(emailAddress);
    }

    // Register Activities Validation
    if (regActValidation()) {
        isValid(activitiesBox);
    } else {
        e.preventDefault();
        notValid(activitiesBox);
    }

    // If credit card is selected
    if (payment.children[1].selected) {
        if(creditCardValidation()) {
            isValid(cardNumber);
        } else {
            e.preventDefault();
            notValid(cardNumber);
        }

        if (zipCodeValidation()) {
            isValid(zipCode);
        } else {
            e.preventDefault();
            notValid(zipCode);
        }

        if (cvvCodeValidation()) {
            isValid(cvv);
        } else {
            e.preventDefault();
            notValid(cvv);
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
    for (let i = 0; i < inputCheckbox.length; i++) {
        if(inputCheckbox[i].checked) {
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

/**
 * Accessibility
 */
 
for (let i = 0; i < inputCheckbox.length; i++) {
    inputCheckbox[i].addEventListener('focus', (e) => {
        e.target.parentElement.classList.add('focus');
    });
    
    inputCheckbox[i].addEventListener('blur', (e) => {
        e.target.parentElement.classList.remove('focus');
    });
}



function isValid(prop) {
    prop.parentElement.classList.add('valid');
    prop.parentElement.classList.remove('not-valid')
    prop.parentElement.lastElementChild.style.display = 'none';
}

function notValid(prop) {
    prop.parentElement.classList.add('not-valid');
    prop.parentElement.classList.remove('valid')
    prop.parentElement.lastElementChild.style.display = 'block';
}