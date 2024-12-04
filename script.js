function convertText() {
    const inputText = document.getElementById('inputText').value.trim();

    // Reset all results if input is empty
    if (inputText === '') {
        resetResults();
        return;
    }

    // Split the input text by commas and process each part
    const items = inputText.split(',').map(item => item.trim()).filter(item => item.length > 0);
    const nameCount = items.length;

    // Update result count
    document.getElementById('nameCount').textContent = nameCount;

    // Check if any item has more than 8 words
    const isTwoColumn = items.some(item => countWords(item) > 8);

    // Generate formatted results
    const upperResult = items.map(item => item.toUpperCase()).join('\n');
    const lowerResult = items.map(item => item.toLowerCase()).join('\n');
    const capitalizeResult = items.map(item => capitalize(item)).join('\n');
    const titleCaseResult = items.map(item => toTitleCase(item)).join('\n');

    // Determine layout: single column or two columns
    if (isTwoColumn) {
        handleTwoColumnLayout(items);
    } else {
        handleSingleColumnLayout(upperResult, lowerResult, capitalizeResult, titleCaseResult);
    }
}

// Reset all displayed results
function resetResults() {
    const fields = ['uppercaseResult', 'lowercaseResult', 'capitalizeResult', 'titlecaseResult',
        'uppercaseResult2', 'lowercaseResult2', 'capitalizeResult2', 'titlecaseResult2'];
    fields.forEach(id => document.getElementById(id).textContent = '');
    document.getElementById('nameCount').textContent = '0';
    document.getElementById('resultContainer').classList.remove('double-column');
}

// Count the number of words in a string
function countWords(text) {
    return text.split(/\s+/).filter(word => word.length > 0).length;
}

// Convert string to capitalize case (first letter uppercase, rest lowercase)
function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

// Convert string to title case (capitalize each word)
function toTitleCase(text) {
    return text.split(' ').map(word => capitalize(word)).join(' ');
}

// Handle single-column layout
function handleSingleColumnLayout(upper, lower, capitalize, titleCase) {
    const resultContainer = document.getElementById('resultContainer');
    resultContainer.classList.remove('double-column');

    document.getElementById('uppercaseResult').textContent = upper;
    document.getElementById('lowercaseResult').textContent = lower;
    document.getElementById('capitalizeResult').textContent = capitalize;
    document.getElementById('titlecaseResult').textContent = titleCase;

    document.getElementById('uppercaseResult2').textContent = '';
    document.getElementById('lowercaseResult2').textContent = '';
    document.getElementById('capitalizeResult2').textContent = '';
    document.getElementById('titlecaseResult2').textContent = '';
}

// Handle two-column layout
function handleTwoColumnLayout(items) {
    const resultContainer = document.getElementById('resultContainer');
    resultContainer.classList.add('double-column');

    // Split items into two halves
    const half = Math.ceil(items.length / 2);
    const leftItems = items.slice(0, half);
    const rightItems = items.slice(half);

    // Generate formatted results for both halves
    const upperLeft = leftItems.map(item => item.toUpperCase()).join('\n');
    const upperRight = rightItems.map(item => item.toUpperCase()).join('\n');

    const lowerLeft = leftItems.map(item => item.toLowerCase()).join('\n');
    const lowerRight = rightItems.map(item => item.toLowerCase()).join('\n');

    const capitalizeLeft = leftItems.map(item => capitalize(item)).join('\n');
    const capitalizeRight = rightItems.map(item => capitalize(item)).join('\n');

    const titleCaseLeft = leftItems.map(item => toTitleCase(item)).join('\n');
    const titleCaseRight = rightItems.map(item => toTitleCase(item)).join('\n');

    // Update results
    document.getElementById('uppercaseResult').textContent = upperLeft;
    document.getElementById('uppercaseResult2').textContent = upperRight;

    document.getElementById('lowercaseResult').textContent = lowerLeft;
    document.getElementById('lowercaseResult2').textContent = lowerRight;

    document.getElementById('capitalizeResult').textContent = capitalizeLeft;
    document.getElementById('capitalizeResult2').textContent = capitalizeRight;

    document.getElementById('titlecaseResult').textContent = titleCaseLeft;
    document.getElementById('titlecaseResult2').textContent = titleCaseRight;
}
