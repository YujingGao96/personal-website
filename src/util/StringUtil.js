export function extractBeforeLastDash(inputString) {
    // Split the string by dashes
    const parts = inputString.split('-');
    // Remove the last part
    parts.pop();
    // Join the remaining parts back together with dashes
    return parts.join('-');
}
