// select button and nav
const menuButton = document.querySelector('#menu-button');
const primaryNav = document.querySelector('#primary-nav');

// toggle open class on button click
menuButton.addEventListener('click', function() {
    primaryNav.classList.toggle('open');

    // swap icon and aria-label
    if (primaryNav.classList.contains('open')) {
        menuButton.textContent = '✕';
        menuButton.setAttribute('aria-label', 'close navigation menu');
    } else {
        menuButton.textContent = '☰';
        menuButton.setAttribute('aria-label', 'open navigation menu');
    }
});

// close menu when a link is clicked
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        primaryNav.classList.remove('open');
        menuButton.textContent = '☰';
        menuButton.setAttribute('aria-label', 'open navigation menu');
    });
});