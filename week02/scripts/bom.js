// DOM references
const input = document.querySelector('#favchap');
const button = document.querySelector('#add-btn');
const list = document.querySelector('#list');
const main = document.querySelector('main');

// bonus: keep track of entries
let entryCount = 0;
const MAX_ENTRIES = 10;

// helper to show messages
function showMessage(text, type = 'error') {
    // remove any existing message
    const oldMsg = document.querySelector('.message');
    if (oldMsg) oldMsg.remove();

    const msg = document.createElement('div');
    msg.className = `message ${type}`;
    msg.textContent = text;
    main.insertBefore(msg, list);
}

// helper to remove message after delay
function clearMessageAfterDelay(delay = 3000) {
    setTimeout(() => {
        const msg = document.querySelector('.message');
        if (msg) msg.remove();
    }, delay);
}

// format chapter input
function formatChapter(input) {
    // trim and normalize multiple spaces
    let formatted = input.trim().replace(/\s+/g, ' ');

    // capitalize first letter of each word (optional)
    formatted = formatted.replace(/\b\w/g, c => c.toUpperCase());

    return formatted;
}

// validation: list of book of mormon books
const bomBooks = [
    '1 nephi', '2 nephi', 'jacob', 'enos', 'jarom', 'omni',
    'words of mormon', 'mosiah', 'alma', 'helaman', '3 nephi',
    '4 nephi', 'mormon', 'ether', 'moroni'
];

function isValidBookOfMormon(input) {
    const lower = input.toLowerCase().trim();
    // check if input starts with any book name
    for (let book of bomBooks) {
        if (lower.startsWith(book)) {
            return true;
        }
    }
    return false;
}

// click event for add button
button.addEventListener('click', function() {
    // validation: check if input is empty
    if (input.value.trim() === '') {
        showMessage('please enter a book and chapter', 'error');
        clearMessageAfterDelay(3000);
        input.focus();
        return;
    }

    // check if we've reached the limit
    if (entryCount >= MAX_ENTRIES) {
        showMessage(`maximum ${MAX_ENTRIES} chapters reached!`, 'warning');
        clearMessageAfterDelay(3000);
        input.focus();
        return;
    }

    // validate it's a book of mormon book
    if (!isValidBookOfMormon(input.value)) {
        showMessage('please enter a valid book of mormon book', 'error');
        clearMessageAfterDelay(3000);
        input.value = '';
        input.focus();
        return;
    }

    // format the input
    const formattedInput = formatChapter(input.value);

    // check for duplicates
    const existingItems = list.querySelectorAll('li');
    for (let item of existingItems) {
        const text = item.querySelector('.chapter-text').textContent;
        if (text.toLowerCase() === formattedInput.toLowerCase()) {
            showMessage(`"${formattedInput}" already in the list`, 'warning');
            clearMessageAfterDelay(3000);
            input.value = '';
            input.focus();
            return;
        }
    }

    // create li and delete button
    const li = document.createElement('li');
    const deleteButton = document.createElement('button');
    const chapterSpan = document.createElement('span');

    // populate the li with formatted input
    chapterSpan.className = 'chapter-text';
    chapterSpan.textContent = formattedInput;

    // set up the delete button
    deleteButton.textContent = '❌';
    deleteButton.setAttribute('aria-label', `remove ${formattedInput}`);
    deleteButton.classList.add('delete');

    // assemble and append
    li.append(chapterSpan);
    li.append(deleteButton);
    list.append(li);

    // increment counter
    entryCount++;

    // show success message
    showMessage(`added "${formattedInput}"`, 'success');
    clearMessageAfterDelay(1500);

    // clear input and refocus
    input.value = '';
    input.focus();

    // add functionality to the delete button
    deleteButton.addEventListener('click', function() {
        list.removeChild(li);
        entryCount--;

        // show removal message
        showMessage(`removed "${chapterSpan.textContent}"`, 'success');
        clearMessageAfterDelay(1500);
        input.focus();
    });
});

// allow "enter" key to submit
input.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        button.click();
    }
});

// clear message when user starts typing
input.addEventListener('input', function() {
    const msg = document.querySelector('.message');
    if (msg) msg.remove();
});

// focus input on page load
window.addEventListener('load', function() {
    input.focus();
});