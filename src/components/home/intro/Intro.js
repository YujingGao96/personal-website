"use client";

import React, {useEffect, useRef, useState} from "react";
import Image from "next/image";
import {
    birthday, company, email, gender,
    getAge, jobTitle, linkedin, name,
} from "../../../resolvers/profileResolver";
import fisIcon      from "./images/fis.png";
import emailIcon    from "./images/email.png";
import linkedinIcon from "./images/linkedin.png";
import SectionHeader from "../../common/SectionHeader";

// Solar system planets — relative sizes and orbital parameters
const PLANETS = [
    { name: "mercury", rx: 78,  ry: 27, speed: 0.80, phase: 0,                   cls: "planet-mercury" },
    { name: "venus",   rx: 78,  ry: 27, speed: 0.63, phase: Math.PI,             cls: "planet-venus"   },
    { name: "earth",   rx: 100, ry: 35, speed: 0.55, phase: 0.5,                 cls: "planet-earth"   },
    { name: "mars",    rx: 100, ry: 35, speed: 0.44, phase: Math.PI + 0.5,       cls: "planet-mars"    },
    { name: "jupiter", rx: 122, ry: 42, speed: 0.33, phase: 1.0,                 cls: "planet-jupiter" },
    { name: "saturn",  rx: 122, ry: 42, speed: 0.26, phase: Math.PI + 1.0,       cls: "planet-saturn"  },
    { name: "uranus",  rx: 142, ry: 49, speed: 0.20, phase: 1.5,                 cls: "planet-uranus"  },
    { name: "neptune", rx: 142, ry: 49, speed: 0.16, phase: Math.PI + 1.5,       cls: "planet-neptune" },
];

function OrbitalSystem() {
    const planetRefs = useRef([]);
    const rafRef = useRef(null);
    const containerRef = useRef(null);
    const activeRef = useRef(true);

    useEffect(() => {
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const CX = 155;
        const CY = 155;

        function updatePlanets(ts = 0) {
            const t = ts / 1000;
            PLANETS.forEach((planet, index) => {
                const el = planetRefs.current[index];
                if (!el) return;

                const ang = t * planet.speed + planet.phase;
                const x = CX + planet.rx * Math.cos(ang);
                const y = CY + planet.ry * Math.sin(ang);
                const sinAng = Math.sin(ang);
                const depth = (sinAng + 1) / 2;

                el.style.left = `${x}px`;
                el.style.top = `${y}px`;
                el.style.zIndex = sinAng > 0 ? "4" : "1";
                el.style.opacity = String(0.35 + depth * 0.65);
                el.style.filter = `brightness(${0.65 + depth * 0.35})`;
            });
        }

        if (reducedMotion) {
            updatePlanets(0);
            return undefined;
        }

        let lastDraw = 0;
        function tick(ts) {
            if (activeRef.current && ts - lastDraw >= 32) {
                updatePlanets(ts);
                lastDraw = ts;
            }
            rafRef.current = requestAnimationFrame(tick);
        }

        const observer = new IntersectionObserver(([entry]) => {
            activeRef.current = entry.isIntersecting;
        }, {rootMargin: "120px"});

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        updatePlanets(0);
        rafRef.current = requestAnimationFrame(tick);

        return () => {
            observer.disconnect();
            cancelAnimationFrame(rafRef.current);
        };
    }, []);

    return (
        <div className="orbital-system" ref={containerRef}>
            {/* 4 tilted-ellipse orbit tracks */}
            <div className="orbit-ring orbit-ring-1" />
            <div className="orbit-ring orbit-ring-2" />
            <div className="orbit-ring orbit-ring-3" />
            <div className="orbit-ring orbit-ring-4" />

            {/* Profile photo — the star at the centre */}
            <div
                className="planet-wrap"
                onMouseDown={e => e.preventDefault()}
                onContextMenu={e => e.preventDefault()}
                style={{
                    position: "absolute",
                    top: "50%", left: "50%",
                    width: 118, height: 118,
                    marginLeft: -59, marginTop: -59,
                    zIndex: 2,
                }}
            >
                <Image
                    src="/profile.jpg"
                    alt="Yujing Gao"
                    width={118}
                    height={118}
                    priority
                    style={{
                        borderRadius: "50%",
                        border: "1.5px solid rgba(255,255,255,0.12)",
                        display: "block",
                        width: "100%",
                        height: "auto",
                    }}
                />
                <div className="atmo atmo-1" />
                <div className="atmo atmo-2" />
                <div className="atmo atmo-3" />
            </div>

            {/* 8 solar-system planets */}
            {PLANETS.map((planet, index) => (
                <div
                    key={planet.name}
                    ref={el => { planetRefs.current[index] = el; }}
                    className={`planet-dot ${planet.cls}`}
                />
            ))}
        </div>
    );
}

function CodeLine({indent = 0, children}) {
    return (
        <span className="intro-code-line" style={{"--indent": indent}}>
            {children}
        </span>
    );
}

function IntroCodeBlock({ageState}) {
    return (
        <pre className="intro-code-block" aria-label="Profile builder code">
            <code>
                <CodeLine>
                    <span className="code-class">PersonBuilder</span>
                </CodeLine>
                <CodeLine indent={1}>.<span className="code-method">setName</span>(<span className="code-string">&quot;{name}&quot;</span>)</CodeLine>
                <CodeLine indent={1}>.<span className="code-method">setAge</span>(<span className="code-number">{ageState}</span>)</CodeLine>
                <CodeLine indent={1}>.<span className="code-method">setGender</span>(<span className="code-class">Gender</span>.<span className="code-constant">{gender.toUpperCase()}</span>)</CodeLine>
                <CodeLine indent={1}>.<span className="code-method">setJob</span>(<span className="code-string">&quot;{jobTitle}&quot;</span>)</CodeLine>
                <CodeLine indent={1}>.<span className="code-method">isAppleFan</span>(<span className="code-keyword">true</span>)</CodeLine>
                <CodeLine indent={1}>.<span className="code-method">addInterests</span>(</CodeLine>
                <CodeLine indent={2}><span className="code-class">List</span>.<span className="code-method">of</span>(<span className="code-string">&quot;Coding&quot;</span>, <span className="code-string">&quot;Gym&quot;</span>)</CodeLine>
                <CodeLine indent={1}>)</CodeLine>
                <CodeLine indent={1}>.<span className="code-method">addEducation</span>(</CodeLine>
                <CodeLine indent={2}><span className="code-keyword">new</span> <span className="code-class">Degree</span>(</CodeLine>
                <CodeLine indent={3}><span className="code-string">&quot;B.S. in Computer Science&quot;</span>,</CodeLine>
                <CodeLine indent={3}><span className="code-string">&quot;CSU, Columbus, GA&quot;</span>,</CodeLine>
                <CodeLine indent={3}><span className="code-string">&quot;May 15th, 2020&quot;</span></CodeLine>
                <CodeLine indent={2}>),</CodeLine>
                <CodeLine indent={2}><span className="code-keyword">new</span> <span className="code-class">Degree</span>(</CodeLine>
                <CodeLine indent={3}><span className="code-string">&quot;M.S. in Computer Science&quot;</span>,</CodeLine>
                <CodeLine indent={3}><span className="code-string">&quot;CSU, Columbus, GA&quot;</span>,</CodeLine>
                <CodeLine indent={3}><span className="code-string">&quot;Aug 4th, 2021&quot;</span></CodeLine>
                <CodeLine indent={2}>)</CodeLine>
                <CodeLine indent={1}>)</CodeLine>
                <CodeLine indent={1}>.<span className="code-method">build</span>();</CodeLine>
            </code>
        </pre>
    );
}

const Intro = () => {
    const [ageState, setAgeState] = useState("0.000000000");

    useEffect(() => {
        const iv = setInterval(() => setAgeState(getAge(birthday)), 500);
        return () => clearInterval(iv);
    }, []);

    return (
        <div id="about">
            <SectionHeader eyebrow="Profile" title="About Me" sectionId="about" />

            <div className="mt-5 intro-mac-window">
                <div className="row g-0 p-0 intro-astronomy-body">

                    {/* LEFT — elevated glass sidebar with traffic lights */}
                    <div className="col-md-5 col-sm-12 astro-panel">
                        <div className="astro-traffic-lights">
                            <span className="terminal-window-control terminal-window-control-close" />
                            <span className="terminal-window-control terminal-window-control-minimize" />
                            <span className="terminal-window-control terminal-window-control-expand" />
                        </div>

                        <div className="star-bg" />
                        <div className="astro-nebula" />

                        <div className="astro-panel-body">
                            <OrbitalSystem />

                            <h2 className="intro-profile-name fw-bold mb-0">{name}</h2>
                            <h4 className="text-secondary my-0">{jobTitle}</h4>

                            <div className="text-start d-inline-block">
                                <a className="text-secondary pt-1 h6 text-decoration-none d-block"
                                   target="_blank" rel="noreferrer" href="https://www.fisglobal.com/">
                                    <span className="mx-3"><Image src={fisIcon} alt="FIS" height={23} width={23} /></span>
                                    {company}
                                </a>
                                <a className="text-secondary pt-1 h6 text-decoration-none d-block"
                                   href="mailto:1@ygao.app">
                                    <span className="mx-3"><Image src={emailIcon} alt="Email" height={23} width={23} /></span>
                                    {email}
                                </a>
                                <a className="text-secondary pt-1 h6 text-decoration-none d-block"
                                   target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/yujing-gao">
                                    <span className="mx-3"><Image src={linkedinIcon} alt="LinkedIn" height={23} width={23} /></span>
                                    {linkedin}
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT — transparent code panel */}
                    <div className="col-md-7 col-sm-12 intro-code-panel">
                        <IntroCodeBlock ageState={ageState} />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Intro;
