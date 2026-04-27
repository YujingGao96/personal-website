import {
    buildTimelineCircuitPath,
    buildTimelinePalette,
    buildTimelineSparkPoints,
    buildTimelineWavePath,
    sanitizeArtId,
    seededNumber,
} from "../../../util/GenArtUtil";

const MOTIFS = ["signal", "mesh", "ledger", "orbit"];

function renderMotif(motif, seed, palette, width, height) {
    const {colorA, colorB, colorC, colorD} = palette;

    if (motif === "mesh") {
        const meshWave = buildTimelineWavePath(seed, 4, width, height);

        return (
            <>
                {Array.from({length: 8}).map((_, index) => (
                    <line
                        key={`mesh-v-${index}`}
                        x1={index * 56 - 24}
                        y1="0"
                        x2={index * 56 + 42}
                        y2={height}
                        stroke="white"
                        strokeOpacity="0.08"
                    />
                ))}
                <g className="timeline-art-wave">
                    <polyline points={meshWave} fill="none" stroke={colorB} strokeOpacity="0.42" strokeWidth="2"/>
                    <polyline points={meshWave} transform={`translate(${width} 0)`} fill="none" stroke={colorB} strokeOpacity="0.42" strokeWidth="2"/>
                </g>
                <circle cx={width - 56} cy="34" r="58" fill={colorC} opacity="0.13"/>
            </>
        );
    }

    if (motif === "ledger") {
        return (
            <>
                {Array.from({length: 5}).map((_, index) => (
                    <rect
                        key={`ledger-${index}`}
                        x={18 + index * 68}
                        y={18 + seededNumber(seed, index + 9, 18)}
                        width={34 + seededNumber(seed, index + 15, 44)}
                        height={8 + seededNumber(seed, index + 21, 18)}
                        rx="4"
                        fill={index % 2 ? colorA : "white"}
                        opacity={0.08 + index * 0.025}
                    />
                ))}
                <path className="timeline-art-circuit" d={buildTimelineCircuitPath(seed, width, height)} fill="none" stroke={colorD} strokeOpacity="0.48" strokeWidth="1.8"/>
                <path d={`M0 ${height - 18} C70 ${height - 72} 132 ${height - 22} 196 ${height - 60} S300 ${height - 46} ${width} ${height - 86}`} fill="none" stroke="white" strokeOpacity="0.16"/>
            </>
        );
    }

    if (motif === "orbit") {
        return (
            <g className="timeline-art-orbit" transform={`rotate(${seed % 18 - 9} ${width / 2} ${height / 2})`}>
                <ellipse cx={width / 2} cy={height / 2} rx="154" ry="30" fill="none" stroke={colorA} strokeOpacity="0.42" strokeWidth="1.4"/>
                <ellipse cx={width / 2} cy={height / 2} rx="116" ry="62" fill="none" stroke="white" strokeOpacity="0.16"/>
                <ellipse cx={width / 2} cy={height / 2} rx="66" ry="72" fill="none" stroke={colorD} strokeOpacity="0.22"/>
                <circle cx={width / 2 - 104} cy={height / 2 - 12} r="6" fill={colorB} opacity="0.78"/>
                <circle cx={width / 2 + 82} cy={height / 2 + 24} r="10" fill="white" opacity="0.16"/>
            </g>
        );
    }

    const waveA = buildTimelineWavePath(seed, 1, width, height);
    const waveB = buildTimelineWavePath(seed, 2, width, height);
    const waveC = buildTimelineWavePath(seed, 3, width, height);

    return (
        <>
            <g className="timeline-art-wave">
                <polyline points={waveA} fill="none" stroke={colorA} strokeOpacity="0.62" strokeWidth="2.4" strokeLinecap="round"/>
                <polyline points={waveA} transform={`translate(${width} 0)`} fill="none" stroke={colorA} strokeOpacity="0.62" strokeWidth="2.4" strokeLinecap="round"/>
            </g>
            <g className="timeline-art-wave timeline-art-wave-alt">
                <polyline points={waveB} fill="none" stroke={colorB} strokeOpacity="0.38" strokeWidth="1.6" strokeLinecap="round"/>
                <polyline points={waveB} transform={`translate(${width} 0)`} fill="none" stroke={colorB} strokeOpacity="0.38" strokeWidth="1.6" strokeLinecap="round"/>
            </g>
            <g className="timeline-art-wave">
                <polyline points={waveC} fill="none" stroke={colorD} strokeOpacity="0.24" strokeWidth="1" strokeLinecap="round"/>
                <polyline points={waveC} transform={`translate(${width} 0)`} fill="none" stroke={colorD} strokeOpacity="0.24" strokeWidth="1" strokeLinecap="round"/>
            </g>
        </>
    );
}

export default function GeneratedTimelineArt({entry, className = ""}) {
    const width = 360;
    const height = 126;
    const palette = buildTimelinePalette(entry);
    const {seed, colorA, colorB, colorC, colorD} = palette;
    const id = `timeline-art-${sanitizeArtId(entry?.id || entry?.title, "item")}-${seed}`;
    const motif = MOTIFS[seed % MOTIFS.length];
    const sparks = buildTimelineSparkPoints(seed, 30, width, height);

    return (
        <svg className={`timeline-art ${className}`.trim()} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <defs>
                <linearGradient id={`${id}-base`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={colorA} stopOpacity="0.72"/>
                    <stop offset="42%" stopColor={colorB} stopOpacity="0.4"/>
                    <stop offset="100%" stopColor={colorC} stopOpacity="0.58"/>
                </linearGradient>
                <radialGradient id={`${id}-glow`} cx={`${18 + seededNumber(seed, 4, 64)}%`} cy={`${16 + seededNumber(seed, 8, 54)}%`} r="72%">
                    <stop offset="0%" stopColor="white" stopOpacity="0.24"/>
                    <stop offset="100%" stopColor="white" stopOpacity="0"/>
                </radialGradient>
                <pattern id={`${id}-grid`} width="26" height="26" patternUnits="userSpaceOnUse">
                    <path d="M26 0 L0 0 0 26" fill="none" stroke="white" strokeOpacity="0.08"/>
                    <circle cx="2" cy="2" r="0.9" fill={colorD} opacity="0.35"/>
                </pattern>
            </defs>
            <rect width={width} height={height} fill={`url(#${id}-base)`}/>
            <rect width={width} height={height} fill={`url(#${id}-glow)`}/>
            <rect className="timeline-art-grid" width={width + 52} height={height} fill={`url(#${id}-grid)`}/>
            <g className="timeline-art-sparks">
                {sparks.map((spark, index) => (
                    <circle key={index} cx={spark.x} cy={spark.y} r={spark.radius} fill={index % 3 === 0 ? colorD : "white"} opacity={spark.opacity}/>
                ))}
            </g>
            {renderMotif(motif, seed, palette, width, height)}
            <rect width={width} height={height} fill="rgba(6,6,14,0.32)"/>
            <rect x="0.5" y="0.5" width={width - 1} height={height - 1} fill="none" stroke="rgba(255,255,255,0.15)"/>
        </svg>
    );
}
