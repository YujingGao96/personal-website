"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/prism-light";
import java from "react-syntax-highlighter/dist/esm/languages/prism/java";
import darcula from "react-syntax-highlighter/dist/esm/styles/prism/darcula";
SyntaxHighlighter.registerLanguage("java", java);
import { Zoom } from "react-awesome-reveal";
import {
    birthday, company, email, gender,
    getAge, jobTitle, linkedin, name,
} from "../../../resolvers/profileResolver";
import fisIcon      from "./images/fis.png";
import emailIcon    from "./images/email.png";
import linkedinIcon from "./images/linkedin.png";
import SectionHeader from "../../common/SectionHeader";
import useWindowSize from "react-use/lib/useWindowSize";

const Confetti = dynamic(() => import("react-confetti"), { ssr: false });

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

function OrbitalSystem({ onPlanetClick, onPlanetHover, onPlanetLeave }) {
    const planetRefs = useRef([]);
    const rafRef     = useRef(null);

    useEffect(() => {
        const CX = 155, CY = 155;

        function tick(ts) {
            const t = ts / 1000;
            PLANETS.forEach((planet, i) => {
                const el = planetRefs.current[i];
                if (!el) return;
                const ang    = t * planet.speed + planet.phase;
                const x      = CX + planet.rx * Math.cos(ang);
                const y      = CY + planet.ry * Math.sin(ang);
                const sinAng = Math.sin(ang);
                const depth  = (sinAng + 1) / 2;
                el.style.left    = x + "px";
                el.style.top     = y + "px";
                el.style.zIndex  = sinAng > 0 ? "1" : "4";
                el.style.opacity = String(1 - depth * 0.65);
                el.style.filter  = `brightness(${1 - depth * 0.35})`;
            });
            rafRef.current = requestAnimationFrame(tick);
        }

        rafRef.current = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(rafRef.current);
    }, []);

    return (
        <div style={{ position: "relative", width: 310, height: 310, flexShrink: 0 }}>
            {/* 4 tilted-ellipse orbit tracks */}
            <div className="orbit-ring orbit-ring-1" />
            <div className="orbit-ring orbit-ring-2" />
            <div className="orbit-ring orbit-ring-3" />
            <div className="orbit-ring orbit-ring-4" />

            {/* Profile photo — the star at the centre */}
            <div
                className="planet-wrap"
                onMouseOver={onPlanetHover}
                onMouseLeave={onPlanetLeave}
                onClick={onPlanetClick}
                onMouseDown={e => e.preventDefault()}
                onContextMenu={e => e.preventDefault()}
                style={{
                    position: "absolute",
                    top: "50%", left: "50%",
                    width: 118, height: 118,
                    marginLeft: -59, marginTop: -59,
                    zIndex: 2, cursor: "pointer",
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
            {PLANETS.map((planet, i) => (
                <div
                    key={planet.name}
                    ref={el => { planetRefs.current[i] = el; }}
                    className={`planet-dot ${planet.cls}`}
                />
            ))}
        </div>
    );
}

const Intro = () => {
    const [ageState, setAgeState]         = useState("0.000000000");
    const [showConfetti, setShowConfetti] = useState(false);
    const { width, height } = useWindowSize();

    useEffect(() => {
        const iv = setInterval(() => setAgeState(getAge(birthday)), 500);
        return () => clearInterval(iv);
    }, []);

    const codeString =
        "PersonBuilder" +
        `\n\t.setName("${name}")` +
        `\n\t.setAge(${ageState})` +
        `\n\t.setGender(Gender.${gender.toUpperCase()})` +
        `\n\t.setJob("${jobTitle}")` +
        "\n\t.isAppleFan(true)" +
        "\n\t.addInterests(" +
        '\n\t\tList.of("Coding", "Gym")' +
        "\n\t)" +
        "\n\t.addEducation(" +
        '\n\t\tnew Degree(' +
        '\n\t\t\t"B.S. in Computer Science", ' +
        '\n\t\t\t"CSU, Columbus, GA", ' +
        '\n\t\t\t"May 15th, 2020"' +
        "\n\t\t)," +
        '\n\t\tnew Degree(' +
        '\n\t\t\t"M.S. in Computer Science",' +
        '\n\t\t\t"CSU, Columbus, GA",' +
        '\n\t\t\t"Aug 4th, 2021"' +
        "\n\t\t)" +
        "\n\t)" +
        "\n\t.build();";

    const showBurst = () => {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 1000);
    };

    return (
        <div id="about">
            <SectionHeader eyebrow="Profile" title="About Me" sectionId="about" />

            <Zoom triggerOnce>
                <div className="mt-5 intro-mac-window">
                    <Confetti
                        recycle={showConfetti}
                        gravity={0.3}
                        width={width}
                        height={height + 300}
                    />

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
                                <OrbitalSystem
                                    onPlanetHover={showBurst}
                                    onPlanetLeave={() => setShowConfetti(false)}
                                    onPlanetClick={showBurst}
                                />

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
                            <SyntaxHighlighter
                                language="java"
                                style={darcula}
                                useInlineStyles={true}
                                customStyle={{
                                    background: "transparent",
                                    border: "1px solid rgba(255,255,255,0.06)",
                                    borderRadius: "1rem",
                                    fontSize: "0.82rem",
                                    lineHeight: "1.65",
                                    margin: 0,
                                }}
                            >
                                {codeString}
                            </SyntaxHighlighter>
                        </div>

                    </div>
                </div>
            </Zoom>
        </div>
    );
};

export default Intro;
