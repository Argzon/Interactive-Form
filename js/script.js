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