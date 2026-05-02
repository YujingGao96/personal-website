export const PREFERENCE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export function getClientCookie(name) {
    if (typeof document === "undefined") {
        return "";
    }

    const encodedName = `${encodeURIComponent(name)}=`;
    const cookie = document.cookie
        .split(";")
        .map((part) => part.trim())
        .find((part) => part.startsWith(encodedName));

    return cookie ? decodeURIComponent(cookie.slice(encodedName.length)) : "";
}

export function setClientCookie(name, value, maxAge = PREFERENCE_COOKIE_MAX_AGE) {
    if (typeof document === "undefined") {
        return;
    }

    document.cookie = [
        `${encodeURIComponent(name)}=${encodeURIComponent(value)}`,
        "Path=/",
        `Max-Age=${maxAge}`,
        "SameSite=Lax",
    ].join("; ");
}
