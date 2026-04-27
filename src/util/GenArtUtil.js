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

export function seededFloat(seed, offset) {
    return seededNumber(seed, offset, 10000) / 10000;
}

export function sanitizeArtId(value, fallback = "art") {
    return String(value || fallback).replace(/[^a-z0-9-]/gi, "") || fallback;
}

export function buildTimelinePalette(entry) {
    const seed = hashText(entry?.id || entry?.title || entry?.organization);
    const baseHue = entry?.hue ?? seed % 360;

    return {
        seed,
        baseHue,
        background: `hsl(${baseHue} 38% 7%)`,
        colorA: `hsl(${baseHue} 82% 64%)`,
        colorB: `hsl(${(baseHue + 42) % 360} 74% 58%)`,
        colorC: `hsl(${(baseHue + 132) % 360} 68% 54%)`,
        colorD: `hsl(${(baseHue + 210) % 360} 78% 66%)`,
    };
}

export function buildTimelineWavePath(seed, layer, width = 360, height = 126) {
    const points = [];
    const frequency = 1.5 + seededFloat(seed, layer + 3) * 3.2;
    const amplitude = 10 + seededFloat(seed, layer + 13) * 22;
    const baseY = height * (0.3 + seededFloat(seed, layer + 29) * 0.4);
    const phase = seededFloat(seed, layer + 47) * Math.PI * 2;

    for (let x = -8; x <= width + 8; x += 4) {
        const t = (x / width) * Math.PI * 2 * frequency + phase;
        const y = baseY + Math.sin(t) * amplitude + Math.sin(t * 2.2 + layer) * amplitude * 0.28;
        points.push(`${x.toFixed(1)},${Math.max(6, Math.min(height - 6, y)).toFixed(1)}`);
    }

    return points.join(" ");
}

export function buildTimelineSparkPoints(seed, count = 26, width = 360, height = 126) {
    return Array.from({length: count}, (_, index) => ({
        x: seededNumber(seed, index + 7, width),
        y: seededNumber(seed, index + 19, height),
        radius: 1.1 + seededFloat(seed, index + 31) * 3.6,
        opacity: 0.12 + seededFloat(seed, index + 43) * 0.38,
    }));
}

export function buildTimelineCircuitPath(seed, width = 360, height = 126) {
    const y1 = 22 + seededNumber(seed, 3, 30);
    const y2 = 70 + seededNumber(seed, 5, 34);
    const x1 = 36 + seededNumber(seed, 7, 52);
    const x2 = 138 + seededNumber(seed, 11, 60);
    const x3 = 244 + seededNumber(seed, 13, 56);

    return [
        `M0 ${y1}`,
        `H${x1}`,
        `L${x1 + 28} ${y2}`,
        `H${x2}`,
        `L${x2 + 32} ${height - y1}`,
        `H${x3}`,
        `L${x3 + 34} ${y2 - 22}`,
        `H${width}`,
    ].join(" ");
}

export function buildProjectPalette(project) {
    const seed = hashText(project?.slug || project?.title || project?.addr || "project");
    const baseHue = project?.hue ?? seed % 360;

    return {
        seed,
        baseHue,
        colorA: `hsl(${baseHue} 72% 62%)`,
        colorB: `hsl(${(baseHue + 34) % 360} 70% 54%)`,
        colorC: `hsl(${(baseHue + 180) % 360} 58% 52%)`,
        border: `hsl(${baseHue} 58% 42%)`,
        dark: `hsl(${baseHue} 44% 8%)`,
    };
}

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

function projectTerrainPoint(seed, index, col, row, cellWidth, cellHeight, width, height, isEdge) {
    const jitterX = isEdge ? 0 : (seededFloat(seed, index * 3 + 1) - 0.5) * cellWidth * 0.85;
    const jitterY = isEdge ? 0 : (seededFloat(seed, index * 3 + 2) - 0.5) * cellHeight * 0.85;

    return [
        clamp(col * cellWidth + jitterX, 0, width),
        clamp(row * cellHeight + jitterY, 0, height),
    ];
}

export function buildProjectTerrainTriangles(seed, width = 400, height = 200, cols = 10, rows = 6) {
    const cellWidth = width / (cols - 1);
    const cellHeight = height / (rows - 1);
    const points = [];

    for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < cols; col += 1) {
            const index = row * cols + col;
            const isEdge = row === 0 || row === rows - 1 || col === 0 || col === cols - 1;
            points.push(projectTerrainPoint(seed, index, col, row, cellWidth, cellHeight, width, height, isEdge));
        }
    }

    const triangles = [];

    for (let row = 0; row < rows - 1; row += 1) {
        for (let col = 0; col < cols - 1; col += 1) {
            const topLeft = row * cols + col;
            const topRight = topLeft + 1;
            const bottomLeft = (row + 1) * cols + col;
            const bottomRight = bottomLeft + 1;

            if (seededFloat(seed, (row * cols + col) * 7) > 0.5) {
                triangles.push([points[topLeft], points[topRight], points[bottomRight]]);
                triangles.push([points[topLeft], points[bottomRight], points[bottomLeft]]);
            } else {
                triangles.push([points[topLeft], points[topRight], points[bottomLeft]]);
                triangles.push([points[topRight], points[bottomRight], points[bottomLeft]]);
            }
        }
    }

    return triangles;
}

export function getProjectTerrainTriangleColor(triangle, index, seed, hueA, hueB, width = 400, height = 200) {
    const centerX = (triangle[0][0] + triangle[1][0] + triangle[2][0]) / 3;
    const centerY = (triangle[0][1] + triangle[1][1] + triangle[2][1]) / 3;
    const elevation =
        seededFloat(seed, index * 13 + 5) * 0.5 +
        seededFloat(seed, index * 7 + 3) * 0.3 +
        seededFloat(seed, index * 3 + 1) * 0.2;
    const blend = clamp((centerX / width) * 0.45 + (1 - centerY / height) * 0.35 + elevation * 0.2, 0, 1);
    const hue = hueA + (hueB - hueA) * blend;
    const saturation = 45 + seededFloat(seed, index * 11) * 30;
    const lightness = 8 + elevation * 20;

    return `hsl(${hue} ${saturation}% ${lightness}%)`;
}

export function buildProjectConstellation(seed, count = 18, width = 400, height = 200) {
    return Array.from({length: count}, (_, index) => ({
        x: 18 + seededNumber(seed, index + 61, width - 36),
        y: 12 + seededNumber(seed, index + 83, Math.floor(height * 0.58)),
        radius: 0.7 + seededFloat(seed, index + 97) * 1.8,
        opacity: 0.14 + seededFloat(seed, index + 113) * 0.34,
    }));
}
