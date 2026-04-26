import {hashText} from "../../util/GenArtUtil";

const SIGIL_TYPES = ["orbit", "prism", "helix"];

function getSigilHue(name) {
    return hashText(name) % 360;
}

export function getSigilColor(name) {
    return `oklch(0.65 0.16 ${getSigilHue(name)})`;
}

export default function GeneratedSigil({name, size = 72}) {
    const seed = hashText(name);
    const r = (offset = 0) => ((seed >>> offset) & 0xff) / 255;
    const hue = getSigilHue(name);
    const shape = SIGIL_TYPES[seed % SIGIL_TYPES.length];

    const c1 = `oklch(0.68 0.22 ${hue})`;
    const c2 = `oklch(0.55 0.28 ${(hue + 60) % 360})`;
    const c3 = `oklch(0.45 0.18 ${(hue + 180) % 360})`;
    const cx = 50, cy = 50;

    // ── Orbit: nested rotating ellipses with node dots
    const rings = [38, 26, 15];
    const nodeCounts = [8, 5, 3];
    const rotations = [r(0) * 30, r(8) * 45 + 15, r(16) * 60 + 30];

    const OrbitSigil = () => (
        <g>
            {rings.map((rad, ri) => (
                <g key={ri}>
                    <ellipse
                        cx={cx} cy={cy} rx={rad} ry={rad * 0.38}
                        fill="none"
                        stroke={ri === 0 ? c1 : ri === 1 ? c2 : c3}
                        strokeWidth={0.8} opacity={0.6}
                        transform={`rotate(${rotations[ri] + ri * 25} ${cx} ${cy})`}
                    />
                    {Array.from({length: nodeCounts[ri]}, (_, i) => {
                        const a = (i / nodeCounts[ri]) * Math.PI * 2 + rotations[ri] * Math.PI / 180;
                        return (
                            <circle
                                key={i}
                                cx={cx + Math.cos(a) * rad}
                                cy={cy + Math.sin(a) * rad * 0.38}
                                r={1.2}
                                fill={ri === 0 ? c1 : ri === 1 ? c2 : c3}
                                opacity={0.9}
                                transform={`rotate(${rotations[ri] + ri * 25} ${cx} ${cy})`}
                            />
                        );
                    })}
                </g>
            ))}
            <circle cx={cx} cy={cy} r={3.5} fill={c1} opacity={0.9}/>
            <circle cx={cx} cy={cy} r={6} fill="none" stroke={c1} strokeWidth={0.6} opacity={0.4}/>
        </g>
    );

    // ── Prism: nested polygons with center spokes
    const sides = 3 + (seed & 3);
    const layers = [36, 24, 14];
    const offsets = [r(4) * 20, r(12) * 40 + 15, r(20) * 30];

    const polyPoints = (n, radius, offsetDeg) =>
        Array.from({length: n}, (_, i) => {
            const a = (i / n) * Math.PI * 2 + offsetDeg * Math.PI / 180;
            return `${cx + Math.cos(a) * radius},${cy + Math.sin(a) * radius}`;
        }).join(" ");

    const PrismSigil = () => (
        <g>
            {layers.map((rad, li) => (
                <polygon
                    key={li}
                    points={polyPoints(sides, rad, offsets[li])}
                    fill="none"
                    stroke={li === 0 ? c1 : li === 1 ? c2 : c3}
                    strokeWidth={0.9} opacity={0.65}
                />
            ))}
            {Array.from({length: sides}, (_, i) => {
                const a = (i / sides) * Math.PI * 2 + offsets[0] * Math.PI / 180;
                return (
                    <line key={i}
                        x1={cx} y1={cy}
                        x2={cx + Math.cos(a) * 36} y2={cy + Math.sin(a) * 36}
                        stroke={c2} strokeWidth={0.5} opacity={0.4}
                    />
                );
            })}
            <circle cx={cx} cy={cy} r={4} fill={c1} opacity={0.85}/>
            <circle cx={cx} cy={cy} r={8} fill="none" stroke={c1} strokeWidth={0.5} opacity={0.3}/>
        </g>
    );

    // ── Helix: two intertwined spiral polylines
    const freq = 3 + (seed & 3);
    const pts1 = [], pts2 = [];
    for (let i = 0; i <= 120; i++) {
        const t = (i / 120) * Math.PI * 2;
        const base = 32, amp = 14;
        const r1 = base + Math.sin(t * freq + r(6) * Math.PI) * amp;
        const r2 = base + Math.sin(t * freq + Math.PI + r(6) * Math.PI) * amp;
        pts1.push(`${cx + Math.cos(t) * r1},${cy + Math.sin(t) * r1}`);
        pts2.push(`${cx + Math.cos(t) * r2},${cy + Math.sin(t) * r2}`);
    }
    const dashLen = 2 + r(24) * 6;
    const dashGap = 4 + r(28) * 8;

    const HelixSigil = () => (
        <g>
            <polyline points={pts1.join(" ")} fill="none" stroke={c1} strokeWidth={0.9} opacity={0.7}/>
            <polyline points={pts2.join(" ")} fill="none" stroke={c2} strokeWidth={0.9} opacity={0.7}/>
            <circle cx={cx} cy={cy} r={28} fill="none" stroke={c3} strokeWidth={0.5}
                strokeDasharray={`${dashLen} ${dashGap}`} opacity={0.45}/>
            <circle cx={cx} cy={cy} r={4} fill={c1} opacity={0.9}/>
            <circle cx={cx} cy={cy} r={8} fill="none" stroke={c1} strokeWidth={0.5} opacity={0.3}/>
        </g>
    );

    const outerDash = `${2 + r(24) * 6} ${4 + r(28) * 8}`;

    return (
        <div style={{position: "relative", width: size, height: size, flexShrink: 0}}>
            <div
                className="sigil-glow"
                style={{
                    position: "absolute",
                    inset: -8,
                    borderRadius: "50%",
                    background: `radial-gradient(circle at 50% 50%, ${c1}22 0%, transparent 70%)`,
                }}
            />
            <svg
                viewBox="0 0 100 100"
                width={size}
                height={size}
                style={{display: "block", position: "relative", zIndex: 1}}
                aria-hidden="true"
            >
                <circle cx={cx} cy={cy} r={46} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
                <circle cx={cx} cy={cy} r={46} fill="none" stroke={c1} strokeWidth="0.4" opacity="0.4"
                    strokeDasharray={outerDash}/>
                {shape === "orbit" && <OrbitSigil/>}
                {shape === "prism" && <PrismSigil/>}
                {shape === "helix" && <HelixSigil/>}
            </svg>
        </div>
    );
}
