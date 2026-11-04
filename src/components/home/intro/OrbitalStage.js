import {useId} from "react";

// A decorative entrance around the existing profile, never over its artwork.
export default function OrbitalStage({children}) {
    const id = `orbital-stage-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;

    return (
        <div id="about" className="orbital-stage">
            <div className="orbital-stage-sky" aria-hidden="true">
                <div className="orbital-stage-aura"/>
                <svg className="orbital-stage-map" viewBox="0 0 1440 900" fill="none" focusable="false">
                    <defs>
                        <linearGradient id={`${id}-cool`} x1="70" y1="620" x2="1300" y2="180" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#16bffd" stopOpacity="0.05"/>
                            <stop offset="0.38" stopColor="#16bffd" stopOpacity="0.8"/>
                            <stop offset="0.7" stopColor="#d9f5ff"/>
                            <stop offset="1" stopColor="#b593e1" stopOpacity="0.1"/>
                        </linearGradient>
                        <linearGradient id={`${id}-warm`} x1="150" y1="160" x2="1300" y2="640" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#b593e1" stopOpacity="0.1"/>
                            <stop offset="0.5" stopColor="#b593e1" stopOpacity="0.7"/>
                            <stop offset="0.85" stopColor="#f4b66b"/>
                            <stop offset="1" stopColor="#f4b66b" stopOpacity="0"/>
                        </linearGradient>
                        <radialGradient id={`${id}-star`}>
                            <stop stopColor="#e4faff" stopOpacity="0.6"/>
                            <stop offset="0.18" stopColor="#16bffd" stopOpacity="0.3"/>
                            <stop offset="1" stopColor="#16bffd" stopOpacity="0"/>
                        </radialGradient>
                    </defs>

                    <g transform="rotate(-18 720 450)">
                        <ellipse className="orbital-stage-track orbital-stage-track-primary" cx="720" cy="450" rx="688" ry="282" pathLength="1" stroke={`url(#${id}-cool)`}/>
                        <ellipse className="orbital-stage-track orbital-stage-track-inner" cx="720" cy="450" rx="638" ry="246" pathLength="1" stroke="#9acfe5" strokeOpacity="0.14"/>
                        <ellipse className="orbital-stage-track orbital-stage-tracer" cx="720" cy="450" rx="688" ry="282" pathLength="1" stroke="#d9f5ff"/>
                    </g>
                    <ellipse className="orbital-stage-track orbital-stage-track-cross" cx="720" cy="450" rx="650" ry="200" transform="rotate(20 720 450)" pathLength="1" stroke={`url(#${id}-warm)`}/>

                    <g className="orbital-stage-stars">
                        <g className="orbital-stage-beacon">
                            <circle cx="1113" cy="120" r="62" fill={`url(#${id}-star)`}/>
                            <circle cx="1113" cy="120" r="3" fill="#e4faff"/>
                            <path d="M1113 108V132M1101 120H1125" stroke="#c5f0ff" strokeOpacity="0.55"/>
                        </g>
                        <circle cx="158" cy="573" r="2.5" fill="#16bffd"/>
                        <circle cx="1257" cy="675" r="2" fill="#f4b66b"/>
                        <circle cx="1008" cy="161" r="1.5" fill="#b593e1"/>
                        <path d="M260 230V240M255 235H265M1210 352V362M1205 357H1215" stroke="#c1d9ed" strokeOpacity="0.28"/>
                    </g>
                </svg>
            </div>
            <div className="orbital-stage-content">{children}</div>
        </div>
    );
}
