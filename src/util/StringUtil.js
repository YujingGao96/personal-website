export function extractBeforeLastDash(inputString) {
    // Return the original string if no dash is present
    if (!inputString.includes('-')) {
        return inputString;
    }

    // Split the string by dashes and remove the last part
    const parts = inputString.split('-');
    parts.pop();

    // Join the remaining parts with spaces
    return parts.join(' ');
}
