const LABEL_COLORS = {
    Cloud: "#3da8a6",
    AWS: "#c4854a",
    DevOps: "#4aad6e",
    Kubernetes: "#7b6dd6",
    TypeScript: "#4a8ec4",
    Backend: "#4aad8e",
    API: "#b3a04a",
    Monitoring: "#8aa34a",
    Rust: "#c47a4a",
    Systems: "#a65aad",
    Database: "#c46a4a",
    React: "#4a8ec4",
    Frontend: "#8a5ac4",
    Reflections: "#c45a8a",
    Product: "#b39a4a",
};

const FALLBACK_COLORS = ["#68c5c3", "#7b6dd6", "#c4854a", "#4aad8e", "#b593e1"];
const COVER_SHAPES = ["circles", "grid", "waves", "dots"];

function hashText(value) {
    return [...String(value || "")].reduce((hash, char) => hash + char.charCodeAt(0), 0);
}

export function getBlogLabelColor(label) {
    return LABEL_COLORS[label] || FALLBACK_COLORS[hashText(label) % FALLBACK_COLORS.length];
}

export function getBlogCoverPalette(post) {
    const labels = post?.labels?.length ? post.labels : [post?.title || post?.slug || "blog"];
    const colors = labels.slice(0, 3).map(getBlogLabelColor);
    const seed = hashText(post?.slug || post?.title);

    while (colors.length < 3) {
        colors.push(FALLBACK_COLORS[(seed + colors.length) % FALLBACK_COLORS.length]);
    }

    return colors;
}

function getCoverShape(post) {
    const seed = hashText(post?.slug || post?.title);
    return COVER_SHAPES[seed % COVER_SHAPES.length];
}

export default function GeneratedBlogCover({post, className = ""}) {
    const [colorA, colorB, colorC] = getBlogCoverPalette(post);
    const shape = getCoverShape(post);
    const seed = String(post?.slug || post?.title || "blog").replace(/[^a-z0-9-]/gi, "") || "blog";
    const id = `blog-cover-${seed}`;

    return (
        <svg className={`generated-blog-cover-svg ${className}`.trim()} viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <defs>
                <linearGradient id={`${id}-gradient`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={colorA}/>
                    <stop offset="55%" stopColor={colorB}/>
                    <stop offset="100%" stopColor={colorC}/>
                </linearGradient>
                <radialGradient id={`${id}-glow`} cx="78%" cy="16%" r="72%">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.22)"/>
                    <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
                </radialGradient>
            </defs>
            <rect width="320" height="160" fill={`url(#${id}-gradient)`}/>
            <rect width="320" height="160" fill={`url(#${id}-glow)`}/>
            {shape === "circles" && (
                <>
                    <circle cx="244" cy="26" r="88" fill="rgba(255,255,255,0.08)"/>
                    <circle cx="50" cy="130" r="58" fill="rgba(255,255,255,0.07)"/>
                    <circle cx="285" cy="140" r="42" fill="rgba(255,255,255,0.06)"/>
                    <circle cx="158" cy="78" r="112" fill="rgba(0,0,0,0.1)"/>
                </>
            )}
            {shape === "grid" && (
                <>
                    {Array.from({length: 9}).map((_, lineIndex) => (
                        <line key={`v-${lineIndex}`} x1={lineIndex * 40} y1="0" x2={lineIndex * 40} y2="160" stroke="rgba(255,255,255,0.09)" strokeWidth="1"/>
                    ))}
                    {Array.from({length: 5}).map((_, lineIndex) => (
                        <line key={`h-${lineIndex}`} x1="0" y1={lineIndex * 40} x2="320" y2={lineIndex * 40} stroke="rgba(255,255,255,0.09)" strokeWidth="1"/>
                    ))}
                    <rect x="40" y="22" width="80" height="78" rx="5" fill="rgba(255,255,255,0.08)"/>
                    <rect x="202" y="62" width="78" height="78" rx="5" fill="rgba(255,255,255,0.07)"/>
                </>
            )}
            {shape === "waves" && (
                <>
                    <path d="M0,78 C58,48 118,108 180,78 C240,48 300,108 360,78 L360,160 L0,160 Z" fill="rgba(255,255,255,0.08)"/>
                    <path d="M0,102 C78,70 158,130 240,100 C284,84 310,106 360,90 L360,160 L0,160 Z" fill="rgba(255,255,255,0.06)"/>
                    <path d="M0,48 C50,28 102,70 160,50 C222,30 280,60 320,44 L320,0 L0,0 Z" fill="rgba(255,255,255,0.06)"/>
                </>
            )}
            {shape === "dots" && (
                <>
                    {Array.from({length: 8}).map((_, col) => (
                        Array.from({length: 4}).map((__, row) => (
                            <circle key={`${col}-${row}`} cx={col * 44 + 22} cy={row * 44 + 22} r="3" fill="rgba(255,255,255,0.18)"/>
                        ))
                    ))}
                    <circle cx="202" cy="50" r="50" fill="rgba(255,255,255,0.07)"/>
                    <circle cx="82" cy="112" r="35" fill="rgba(255,255,255,0.08)"/>
                </>
            )}
            <rect width="320" height="160" fill="rgba(0,0,0,0.12)"/>
        </svg>
    );
}
