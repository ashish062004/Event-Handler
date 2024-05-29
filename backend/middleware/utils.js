function cleanInput(input) {
    // Remove non-printable characters
    const cleanedInput = input.replace(/[^ -~]+/g, '');
    // Convert to lowercase
    return cleanedInput.toLowerCase();
}

module.exports = { cleanInput };