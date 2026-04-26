export const VIBRANT_COLORS = [
    "#18ffff",
    "#ff4fd8",
    "#7c4dff",
    "#39ff88",
    "#ffb703",
    "#ff5f6d",
    "#00b2ff",
    "#f8ff5a",
    "#ff7a18",
    "#b8ff2c",
];

export const GRADIENT_DIRECTIONS = [
    {x1: "0%", y1: "0%", x2: "100%", y2: "100%"},
    {x1: "100%", y1: "0%", x2: "0%", y2: "100%"},
    {x1: "0%", y1: "65%", x2: "100%", y2: "20%"},
    {x1: "18%", y1: "100%", x2: "82%", y2: "0%"},
];

export function hashText(value) {
    return [...String(value || "")].reduce((hash, char) => {
        return Math.imul(hash ^ char.charCodeAt(0), 16777619);
    }, 2166136261) >>> 0;
}

export function pick(list, seed, offset = 0) {
    const index = ((seed + Math.imul(offset + 1, 2654435761)) >>> 0) % list.length;
    return list[index];
}

export function seededNumber(seed, offset, max) {
    return (Math.imul(seed + offset * 97, 1103515245) >>> 0) % max;
}
