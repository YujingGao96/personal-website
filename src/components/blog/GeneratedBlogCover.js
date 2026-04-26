import {hashText, pick, seededNumber, VIBRANT_COLORS, GRADIENT_DIRECTIONS} from "../../util/GenArtUtil";

const LABEL_COLORS = {
    Cloud: "#19e6ff",
    AWS: "#ff8a3d",
    DevOps: "#4dff88",
    Kubernetes: "#8a7dff",
    TypeScript: "#31b8ff",
    Backend: "#21e8b7",
    API: "#ffd34d",
    Monitoring: "#b7f542",
    Rust: "#ff7a45",
    Systems: "#d466ff",
    Database: "#ff5f7a",
    React: "#36e4ff",
    Frontend: "#b45cff",
    Reflections: "#ff5bc8",
    Product: "#ffe66d",
};

const COVER_SHAPES = [
    "circles",
    "orbits",
    "grid",
    "blueprint",
    "waves",
    "contours",
    "dots",
    "particles",
    "ribbons",
    "constellation",
    "tiles",
    "beams",
];

export function getBlogLabelColor(label) {
    const seed = hashText(label);
    return LABEL_COLORS[label] || VIBRANT_COLORS[seed % VIBRANT_COLORS.length];
}

export function getBlogCoverPalette(post) {
    const labels = post?.labels?.length ? post.labels : [post?.title || post?.slug || "blog"];
    const seed = hashText(post?.slug || post?.title);
    const labelColors = labels.slice(0, 3).map(getBlogLabelColor);
    const pool = [...labelColors, ...VIBRANT_COLORS];
    const colors = [labelColors[0] || pick(VIBRANT_COLORS, seed)];

    while (colors.length < 5) {
        colors.push(pick(pool, seed, colors.length));
    }

    return colors;
}

function getCoverShape(post) {
    const seed = hashText(post?.slug || post?.title);
    return COVER_SHAPES[seed % COVER_SHAPES.length];
}

function renderPattern(shape, seed, colors) {
    const [, colorB, , colorD, colorE] = colors;
    const rotate = (seed % 36) - 18;

    switch (shape) {
        case "circles":
            return (
                <>
                    <circle cx="260" cy="34" r="98" fill={colorD} opacity="0.16"/>
                    <circle cx="50" cy="128" r="64" fill="#fff" opacity="0.09"/>
                    <circle cx="170" cy="78" r="118" fill="#050511" opacity="0.14"/>
                    <circle cx="260" cy="34" r="56" fill="none" stroke="#fff" strokeOpacity="0.28" strokeWidth="2"/>
                    <circle cx="260" cy="34" r="84" fill="none" stroke={colorE} strokeOpacity="0.28" strokeWidth="1"/>
                </>
            );
        case "orbits":
            return (
                <g transform={`rotate(${rotate} 160 80)`}>
                    <ellipse cx="160" cy="80" rx="150" ry="42" fill="none" stroke="#fff" strokeOpacity="0.18" strokeWidth="2"/>
                    <ellipse cx="160" cy="80" rx="124" ry="28" fill="none" stroke={colorD} strokeOpacity="0.35" strokeWidth="3"/>
                    <ellipse cx="160" cy="80" rx="86" ry="88" fill="none" stroke={colorE} strokeOpacity="0.22" strokeWidth="1.5"/>
                    <circle cx="68" cy="70" r="9" fill="#fff" opacity="0.24"/>
                    <circle cx="244" cy="92" r="14" fill={colorB} opacity="0.3"/>
                    <circle cx="160" cy="80" r="42" fill="#050511" opacity="0.18"/>
                </g>
            );
        case "grid":
            return (
                <>
                    {Array.from({length: 11}).map((_, lineIndex) => (
                        <line key={`v-${lineIndex}`} x1={lineIndex * 32} y1="0" x2={lineIndex * 32 - 34} y2="160" stroke="#fff" strokeOpacity="0.12" strokeWidth="1"/>
                    ))}
                    {Array.from({length: 7}).map((_, lineIndex) => (
                        <line key={`h-${lineIndex}`} x1="0" y1={lineIndex * 28} x2="320" y2={lineIndex * 28 - 18} stroke="#fff" strokeOpacity="0.1" strokeWidth="1"/>
                    ))}
                    <rect x="42" y="32" width="88" height="74" rx="7" fill="#fff" opacity="0.1"/>
                    <rect x="202" y="58" width="86" height="82" rx="7" fill={colorD} opacity="0.13"/>
                    <path d="M0,138 L320,88 L320,160 L0,160 Z" fill="#050511" opacity="0.18"/>
                </>
            );
        case "blueprint":
            return (
                <>
                    {Array.from({length: 8}).map((_, lineIndex) => (
                        <line key={`blue-v-${lineIndex}`} x1={lineIndex * 46 - 20} y1="0" x2={lineIndex * 46 + 80} y2="160" stroke="#fff" strokeOpacity="0.1" strokeWidth="1"/>
                    ))}
                    <polyline points="20,112 78,58 132,82 192,34 276,62 314,22" fill="none" stroke="#fff" strokeOpacity="0.34" strokeWidth="1.6"/>
                    {[20, 78, 132, 192, 276, 314].map((x, index) => (
                        <circle key={x} cx={x} cy={[112, 58, 82, 34, 62, 22][index]} r="4" fill={index % 2 ? colorE : "#fff"} opacity="0.72"/>
                    ))}
                    <rect x="26" y="24" width="268" height="104" rx="10" fill="none" stroke="#fff" strokeOpacity="0.12"/>
                </>
            );
        case "waves":
            return (
                <>
                    <path d="M-20,60 C38,18 92,104 154,62 C218,18 260,106 340,52 L340,160 L-20,160 Z" fill={colorD} opacity="0.18"/>
                    <path d="M-20,92 C50,54 112,130 184,88 C236,58 292,86 340,66 L340,160 L-20,160 Z" fill="#fff" opacity="0.09"/>
                    <path d="M-20,118 C54,78 126,150 206,110 C264,82 300,104 340,88 L340,160 L-20,160 Z" fill={colorE} opacity="0.16"/>
                    <path d="M0,42 C58,12 118,72 176,42 C234,12 282,48 320,32" fill="none" stroke="#fff" strokeOpacity="0.24" strokeWidth="2"/>
                </>
            );
        case "contours":
            return (
                <>
                    {Array.from({length: 7}).map((_, index) => (
                        <path
                            key={`contour-${index}`}
                            d={`M${-30 + index * 4},${34 + index * 18} C52,${6 + index * 19} 88,${88 + index * 4} 156,${52 + index * 15} C228,${18 + index * 12} 264,${84 + index * 3} 356,${48 + index * 17}`}
                            fill="none"
                            stroke={index % 2 ? colorE : "#fff"}
                            strokeOpacity={0.13 + index * 0.02}
                            strokeWidth={index % 3 === 0 ? 2 : 1}
                        />
                    ))}
                    <circle cx="246" cy="44" r="70" fill={colorD} opacity="0.12"/>
                </>
            );
        case "dots":
            return (
                <>
                    {Array.from({length: 9}).map((_, col) => (
                        Array.from({length: 5}).map((__, row) => {
                            const radius = 2 + ((col + row + seed) % 5);
                            return (
                                <circle
                                    key={`${col}-${row}`}
                                    cx={col * 38 + 14}
                                    cy={row * 34 + 12}
                                    r={radius}
                                    fill={row % 2 ? colorE : "#fff"}
                                    opacity={0.13 + ((col + row) % 4) * 0.05}
                                />
                            );
                        })
                    ))}
                    <circle cx="232" cy="74" r="56" fill={colorD} opacity="0.14"/>
                </>
            );
        case "particles":
            return (
                <>
                    {Array.from({length: 34}).map((_, index) => (
                        <circle
                            key={`particle-${index}`}
                            cx={seededNumber(seed, index + 1, 340) - 10}
                            cy={seededNumber(seed, index + 17, 180) - 10}
                            r={1.4 + seededNumber(seed, index + 31, 7)}
                            fill={index % 3 === 0 ? colorE : "#fff"}
                            opacity={0.12 + seededNumber(seed, index + 44, 38) / 100}
                        />
                    ))}
                    <path d="M30,118 L112,46 L200,102 L292,30" fill="none" stroke="#fff" strokeOpacity="0.16" strokeWidth="1"/>
                </>
            );
        case "ribbons":
            return (
                <>
                    <path d="M-20,34 C60,8 96,98 166,70 C230,44 252,12 340,28" fill="none" stroke={colorD} strokeLinecap="round" strokeOpacity="0.28" strokeWidth="30"/>
                    <path d="M-28,118 C48,82 106,164 184,116 C232,86 276,118 348,76" fill="none" stroke="#fff" strokeLinecap="round" strokeOpacity="0.15" strokeWidth="26"/>
                    <path d="M12,160 C62,88 112,74 178,86 C232,94 286,62 320,18" fill="none" stroke={colorE} strokeLinecap="round" strokeOpacity="0.22" strokeWidth="18"/>
                </>
            );
        case "constellation":
            return (
                <>
                    <polyline points="24,112 74,66 118,86 164,42 228,58 284,24" fill="none" stroke="#fff" strokeOpacity="0.22" strokeWidth="1.5"/>
                    <polyline points="48,34 96,116 176,94 238,132 306,78" fill="none" stroke={colorE} strokeOpacity="0.22" strokeWidth="1.5"/>
                    {[24, 74, 118, 164, 228, 284, 48, 96, 176, 238, 306].map((x, index) => (
                        <circle key={`star-${index}`} cx={x} cy={[112, 66, 86, 42, 58, 24, 34, 116, 94, 132, 78][index]} r={index % 3 === 0 ? 5 : 3} fill={index % 2 ? colorD : "#fff"} opacity="0.58"/>
                    ))}
                    <circle cx="248" cy="92" r="78" fill="#050511" opacity="0.16"/>
                </>
            );
        case "tiles":
            return (
                <>
                    {Array.from({length: 7}).map((_, col) => (
                        Array.from({length: 4}).map((__, row) => (
                            <path
                                key={`tile-${col}-${row}`}
                                d={`M${col * 54 + 14},${row * 44 + 12} L${col * 54 + 40},${row * 44} L${col * 54 + 66},${row * 44 + 12} L${col * 54 + 40},${row * 44 + 26} Z`}
                                fill={row % 2 ? colorD : "#fff"}
                                opacity={0.07 + ((col + row) % 4) * 0.025}
                            />
                        ))
                    ))}
                    <path d="M188,-20 L340,60 L340,180 L224,180 Z" fill={colorE} opacity="0.12"/>
                </>
            );
        default:
            return (
                <>
                    {Array.from({length: 10}).map((_, index) => (
                        <path
                            key={`beam-${index}`}
                            d={`M160,80 L${-20 + index * 42},-10 L${8 + index * 42},170 Z`}
                            fill={index % 2 ? colorD : "#fff"}
                            opacity={0.045 + (index % 4) * 0.018}
                        />
                    ))}
                    <circle cx="160" cy="80" r="52" fill="#050511" opacity="0.13"/>
                    <circle cx="160" cy="80" r="28" fill={colorE} opacity="0.22"/>
                </>
            );
    }
}

export default function GeneratedBlogCover({post, className = ""}) {
    const palette = getBlogCoverPalette(post);
    const [colorA, colorB, colorC, colorD, colorE] = palette;
    const seedValue = hashText(post?.slug || post?.title);
    const shape = getCoverShape(post);
    const seed = String(post?.slug || post?.title || "blog").replace(/[^a-z0-9-]/gi, "") || "blog";
    const id = `blog-cover-${seed}`;
    const direction = GRADIENT_DIRECTIONS[seedValue % GRADIENT_DIRECTIONS.length];

    return (
        <svg className={`generated-blog-cover-svg ${className}`.trim()} viewBox="0 0 320 160" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <defs>
                <linearGradient id={`${id}-gradient`} {...direction}>
                    <stop offset="0%" stopColor={colorA}/>
                    <stop offset="36%" stopColor={colorB}/>
                    <stop offset="68%" stopColor={colorC}/>
                    <stop offset="100%" stopColor={colorD}/>
                </linearGradient>
                <radialGradient id={`${id}-glow`} cx={`${28 + seededNumber(seedValue, 3, 52)}%`} cy={`${14 + seededNumber(seedValue, 9, 44)}%`} r="78%">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.22)"/>
                    <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
                </radialGradient>
                <radialGradient id={`${id}-color-pop`} cx={`${seededNumber(seedValue, 13, 100)}%`} cy={`${seededNumber(seedValue, 19, 100)}%`} r="62%">
                    <stop offset="0%" stopColor={colorE} stopOpacity="0.5"/>
                    <stop offset="100%" stopColor={colorE} stopOpacity="0"/>
                </radialGradient>
            </defs>
            <rect width="320" height="160" fill={`url(#${id}-gradient)`}/>
            <rect width="320" height="160" fill={`url(#${id}-glow)`}/>
            <rect width="320" height="160" fill={`url(#${id}-color-pop)`}/>
            {renderPattern(shape, seedValue, palette)}
            <rect width="320" height="160" fill="rgba(0,0,0,0.16)"/>
            <rect width="320" height="160" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1"/>
        </svg>
    );
}
