// Array of temple objects (10 total)
const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
    // -------- ADDED 3 MORE (total 10) --------
    {
        templeName: "Salt Lake Utah",
        location: "Salt Lake City, Utah, United States",
        dedicated: "1893, April, 6",
        area: 253015,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/salt-lake-city-utah/400x250/salt-lake-temple-37762.jpg"
    },
    {
        templeName: "Rome Italy",
        location: "Rome, Italy",
        dedicated: "2019, March, 10",
        area: 41010,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/rome-italy/400x250/rome-italy-temple-1312217-wallpaper.jpg"
    },
    {
        templeName: "Buenos Aires Argentina",
        location: "Buenos Aires, Argentina",
        dedicated: "1986, January, 17",
        area: 30656,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/buenos-aires-argentina/400x250/buenos-aires-temple-27405-wallpaper.jpg"
    }
];

// DOM elements
const container = document.getElementById('temple-cards-container');
const navLinks = document.querySelectorAll('nav a');

// Render function
function renderTemples(templeArray) {
    container.innerHTML = '';

    templeArray.forEach(temple => {
        const card = document.createElement('div');
        card.classList.add('temple-card');

        const img = document.createElement('img');
        img.src = temple.imageUrl;
        img.alt = temple.templeName;
        img.loading = 'lazy';
        img.width = 400;
        img.height = 250;

        const content = document.createElement('div');
        content.classList.add('card-content');

        const name = document.createElement('h3');
        name.textContent = temple.templeName;

        const loc = document.createElement('p');
        loc.innerHTML = `<span class="label">Location:</span> ${temple.location}`;

        const dedicated = document.createElement('p');
        dedicated.innerHTML = `<span class="label">Dedicated:</span> ${temple.dedicated}`;

        const area = document.createElement('p');
        area.innerHTML = `<span class="label">Area:</span> ${temple.area.toLocaleString()} sq ft`;

        content.appendChild(name);
        content.appendChild(loc);
        content.appendChild(dedicated);
        content.appendChild(area);

        card.appendChild(img);
        card.appendChild(content);
        container.appendChild(card);
    });
}

// Filter functions
function filterByOld(templesArray) {
    return templesArray.filter(t => parseInt(t.dedicated.split(',')[0]) < 1900);
}

function filterByNew(templesArray) {
    return templesArray.filter(t => parseInt(t.dedicated.split(',')[0]) > 2000);
}

function filterByLarge(templesArray) {
    return templesArray.filter(t => t.area > 90000);
}

function filterBySmall(templesArray) {
    return templesArray.filter(t => t.area < 10000);
}

// Navigation event listeners
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const filter = link.dataset.filter;
        let filtered = [];

        switch (filter) {
            case 'home': filtered = temples; break;
            case 'old': filtered = filterByOld(temples); break;
            case 'new': filtered = filterByNew(temples); break;
            case 'large': filtered = filterByLarge(temples); break;
            case 'small': filtered = filterBySmall(temples); break;
            default: filtered = temples;
        }

        renderTemples(filtered);
    });
});

// Footer dynamic content
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;

// Initial render (Home)
renderTemples(temples);