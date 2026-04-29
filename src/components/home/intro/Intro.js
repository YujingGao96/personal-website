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

// SVG paths/colors are from AtomMaterialUI/iconGenerator's MIT-licensed Atom Material Icons.
const ATOM_MATERIAL_ICONS = {
    run: {
        viewBox: "4 3 18 18",
        paths: [
            { fill: "#91B859", d: "M8,5.14V19.14L19,12.14L8,5.14Z" },
        ],
    },
    debug: {
        viewBox: "0 0 24 24",
        paths: [
            { fill: "#FF5370", d: "M19 7H16.19C15.74 6.2 15.12 5.5 14.37 5L16 3.41L14.59 2L12.42 4.17C11.96 4.06 11.5 4 11 4S10.05 4.06 9.59 4.17L7.41 2L6 3.41L7.62 5C6.87 5.5 6.26 6.21 5.81 7H3V9H5.09C5.03 9.33 5 9.66 5 10V11H3V13H5V14C5 14.34 5.03 14.67 5.09 15H3V17H5.81C7.26 19.5 10.28 20.61 13 19.65V19C13 16.46 14.61 14.2 17 13.35V13H19V11H17V10C17 9.66 16.97 9.33 16.91 9H19V7M13 15H9V13H13V15M13 11H9V9H13V11M17 16V22L22 19L17 16Z" },
        ],
    },
    reset: {
        viewBox: "0 0 24 24",
        paths: [
            { fill: "#4DB6AC", d: "M11,4C13.05,4 15.09,4.77 16.65,6.33C19.78,9.46 19.77,14.5 16.64,17.64C14.81,19.5 12.3,20.24 9.91,19.92L10.44,17.96C12.15,18.12 13.93,17.54 15.24,16.23C17.58,13.89 17.58,10.09 15.24,7.75C14.06,6.57 12.53,6 11,6V10.58L6.04,5.63L11,0.68V4M5.34,17.65C2.7,15 2.3,11 4.11,7.94L5.59,9.41C4.5,11.64 4.91,14.39 6.75,16.23C7.27,16.75 7.87,17.16 8.5,17.45L8,19.4C7,19 6.12,18.43 5.34,17.65Z" },
        ],
    },
    branch: {
        viewBox: "0 0 24 24",
        paths: [
            { fill: "#4FC3F7", d: "M13,14C9.64,14 8.54,15.35 8.18,16.24C9.25,16.7 10,17.76 10,19A3,3 0 0,1 7,22A3,3 0 0,1 4,19C4,17.69 4.83,16.58 6,16.17V7.83C4.83,7.42 4,6.31 4,5A3,3 0 0,1 7,2A3,3 0 0,1 10,5C10,6.31 9.17,7.42 8,7.83V13.12C8.88,12.47 10.16,12 12,12C14.67,12 15.56,10.66 15.85,9.77C14.77,9.32 14,8.25 14,7A3,3 0 0,1 17,4A3,3 0 0,1 20,7C20,8.34 19.12,9.5 17.91,9.86C17.65,11.29 16.68,14 13,14M7,18A1,1 0 0,0 6,19A1,1 0 0,0 7,20A1,1 0 0,0 8,19A1,1 0 0,0 7,18M7,4A1,1 0 0,0 6,5A1,1 0 0,0 7,6A1,1 0 0,0 8,5A1,1 0 0,0 7,4M17,6A1,1 0 0,0 16,7A1,1 0 0,0 17,8A1,1 0 0,0 18,7A1,1 0 0,0 17,6Z" },
        ],
    },
    commit: {
        viewBox: "0 0 24 24",
        paths: [
            { fill: "#F9A825", d: "M17,12C17,14.42 15.28,16.44 13,16.9V21H11V16.9C8.72,16.44 7,14.42 7,12C7,9.58 8.72,7.56 11,7.1V3H13V7.1C15.28,7.56 17,9.58 17,12M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z" },
        ],
    },
    push: {
        viewBox: "0 0 24 24",
        paths: [
            { fill: "#009688", d: "M23,18V17.5A2.5,2.5 0 0,0 20.5,15A2.5,2.5 0 0,0 18,17.5V18A1,1 0 0,0 17,19V23A1,1 0 0,0 18,24H23A1,1 0 0,0 24,23V19A1,1 0 0,0 23,18M22,18H19V17.5A1.5,1.5 0 0,1 20.5,16A1.5,1.5 0 0,1 22,17.5V18M23,12L2,21V14L17,12L2,10V3L23,12Z" },
        ],
    },
    java: {
        viewBox: "0 0 369 512",
        paths: [
            { fill: "#c792ea", d: "M118.8347473,391.8314514c-11.0463791,2.9020386-30.8727112,10.20224-25.4985275,25.1454468c10.2657928,16.2324829,32.2333145,18.5989685,49.5846481,22.1087646c43.9986115,6.1643982,89.6991577-0.4361572,129.8277893-19.565979c-13.7843018-4.3330078-26.6967163-12.5171509-39.4153748-17.5175171c-37.0448914,7.5523071-76.5756073,10.7302246-113.4392471,0.8476257c1.886116-4.4017639,18.7827988-14.5131226,4.6802292-11.4407043C122.6610413,391.5495911,120.7478333,391.6901245,118.8347473,391.8314514z M106.964592,338.0658875c-11.0428543,4.4443665-30.7042847,9.7420044-28.8187332,25.1456604c6.8268356,15.418457,27.3534775,16.8304138,41.7882004,20.1987305c54.8505478,7.9640503,111.1017227,0.9543457,163.7583618-15.4662476c-11.6207581-4.3516235-24.0296326-8.4572144-32.6334991-17.870636c-46.6656952,9.2505188-95.9490356,13.9017639-142.6123657,4.0263062c-6.5641327-3.4587402,6.7220764-9.9211731,7.4588852-13.4144897C129.080307,329.40625,111.3105392,339.0346069,106.964592,338.0658875z M292.5256653,112.0490875c-38.8645325,11.7290421-80.969223,27.7937775-104.0384216,62.9931488c-16.4302063,25.6138611-4.5041351,58.4992371,14.7626343,78.8990021c13.353775,13.1353302,8.0883484,34.6885223-5.5801544,45.4180756c-14.3238525,12.5110168,2.2148438,10.3175659,10.5245056,4.3087463c20.3131256-12.5423279,43.0028687-35.4559326,34.3283844-61.5947418c-6.8266144-19.7382965-32.4475403-36.0962372-23.3964081-59.1630554c17.582016-31.7272034,54.2102509-45.6840668,81.799118-67.223175C311.537384,108.6017914,296.6333923,113.0118713,292.5256653,112.0490875z M40.4912758,451.5814209c16.9685745-11.2787476,37.8758583-14.2047729,57.9201622-11.4427795c-9.3910446-6.807312-17.9786682-14.5080872-30.3689423-12.7851868c-23.2782326,2.2700806-48.2075577,8.3582153-65.1916656,25.4277649c-8.4207268,9.9065857,3.5251145,21.223877,13.6324844,22.3912354c86.1140213,16.2096252,175.8414001,18.5883484,262.3297424,3.4610901c22.5798035-5.8760681,49.5704956-8.4633484,65.9025574-26.6990662c7.6173096-12.914978-10.2987366-22.3733215-20.7990112-23.1882935c-4.3379517,1.0841675,7.7060852,8.7731018,7.3783875,14.4295654c-10.5741882,11.6734619-29.2931824,11.3467407-44.0762939,15.0453491C177.5,472.5,69.1221924,466.7949829,40.4912758,451.5814209z M275.505188,315.8980103c8.3691711-4.5243835,17.2249451-8.0758362,24.1567688-14.833252c-27.1533813-1.6239624-53.7112274,7.3096313-80.7257233,8.265625c-43.8738403,2.6915588-88.8258209,7.7044067-132.3088989-0.6369629c-6.724678-1.5560303,5.468811-5.0622559,7.2046509-6.4278564c15.6399765-6.9520569,32.918335-8.5035706,47.9603882-16.9523315c-6.2371521-1.4189758-12.2854004-4.0568848-18.7899857-3.2489929c-28.1797333,1.5705261-57.2032547,8.4977112-80.7361908,24.2276001c-8.3256264,7.8776245,2.0441666,18.0975342,10.6659737,19.1419983C112.7521286,341.9960938,248.5,333.6666565,275.505188,315.8980103z M320.5681458,277.4030457c-14.2689819-0.0597839-27.9729309,6.7670593-33.7684937,20.4739075c-6.6846313,9.065033,11.1994019-4.1524353,17.1698608-4.0154419c19.0513916-7.9066162,42.1271667,12.8203735,33.0571899,32.3510132c-9.3682251,23.7306519-34.7591553,35.1193542-53.8241882,48.7372131c-15.8569946,12.9924316-10.7930908,13.5957642,6.1331177,7.4459229c30.6443787-8.963562,67.3738403-23.3135071,77.4277649-56.6795959C374.0092163,298.2519531,347.3074646,274.8536682,320.5681458,277.4030457z M224.7153015,0c1.2240601,5.6507764,2.4481659,11.305665,3.6722412,16.9564419c21.279129,84.3768921-84.720871,103.7102203-110.0494919,163.5247192c-10.4239807,30.5713806,13.7318192,58.4686279,33.0548782,79.341568c13.2946777,13.4771118,26.795578,27.1580811,42.3131409,38.3348694c-7.078476-35.874939-47.0305634-58.9912109-43.4407196-97.5544434c7.1279144-37.0378418,45.9594879-53.2945557,68.2353821-80.0289307C255.5,79.5,263.7047424,36.5491676,224.7153015,0z M54.1986313,487.1745911c22.1386642,21.4512939,55.1589203,20.0031128,83.6328964,23.3801575c64.998642,2.807373,131.7580719,3.3970337,194.2473602-16.1755371c17.8270874-5.7960205,40.5970764-19.8230286,35.604248-42.0212402c1.4787292-13.2836304-5.2355347,4.1975098-8.0593872,6.4917603C321.0131531,497.125,149.0128784,502.3786621,54.1986313,487.1745911z" },
        ],
    },
    bug: {
        viewBox: "0 0 24 24",
        paths: [
            { fill: "#FF5370", d: "M14,12H10V10H14M14,16H10V14H14M20,8H17.19C16.74,7.22 16.12,6.55 15.37,6.04L17,4.41L15.59,3L13.42,5.17C12.96,5.06 12.5,5 12,5C11.5,5 11.04,5.06 10.59,5.17L8.41,3L7,4.41L8.62,6.04C7.88,6.55 7.26,7.22 6.81,8H4V10H6.09C6.04,10.33 6,10.66 6,11V12H4V14H6V15C6,15.34 6.04,15.67 6.09,16H4V18H6.81C7.85,19.79 9.78,21 12,21C14.22,21 16.15,19.79 17.19,18H20V16H17.91C17.96,15.67 18,15.34 18,15V14H20V12H18V11C18,10.66 17.96,10.33 17.91,10H20V8Z" },
        ],
    },
};

const IDE_ACTIONS = [
    { id: "run", label: "Run", icon: "run" },
    { id: "debug", label: "Debug", icon: "debug" },
    { id: "reset", label: "Reset", icon: "reset" },
];

const BRANCHES = ["main", "develop", "feature/build-person"];
const COMMIT_HASH = "9f3c2a1";

function AtomMaterialIcon({name: iconName}) {
    const icon = ATOM_MATERIAL_ICONS[iconName];

    return (
        <svg className={`atom-material-icon atom-material-icon-${iconName}`} viewBox={icon.viewBox} aria-hidden="true" focusable="false">
            {icon.paths.map(path => (
                <path key={path.d} fill={path.fill} d={path.d} />
            ))}
        </svg>
    );
}

function getConsoleMessage(activity, gitState, branch) {
    if (activity === "run") return "Generated PersonBuilder. The matchstick runtime is trying to leave the JVM.";
    if (activity === "debug") return "Breakpoint hit at line 8: List.of(\"Coding\", \"Gym\").";
    if (activity === "branch") return `Checked out ${branch}. Editor chrome updated.`;
    if (gitState === "committed") return `Committed ${COMMIT_HASH}: build person profile.`;
    if (gitState === "pushed") return `Commit ${COMMIT_HASH} successfully pushed into remote origin/${branch}.`;
    return "Working tree changed: setJob upgraded from II to Senior.";
}

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

function CodeLine({indent = 0, lineNumber, variant, className = "", children}) {
    return (
        <span className={`intro-code-line ${variant ? `is-${variant}` : ""} ${className}`}>
            <span className="intro-code-line-number">{lineNumber}</span>
            <span className="intro-code-line-source" style={{"--indent": indent}}>
                {variant && <span className="intro-code-diff-sign">{variant === "removed" ? "-" : "+"}</span>}
                {children}
            </span>
        </span>
    );
}

function StickPerson() {
    return (
        <div className="intro-stick-person" aria-hidden="true">
            <span className="stick-head" />
            <span className="stick-body" />
            <span className="stick-arm stick-arm-left" />
            <span className="stick-arm stick-arm-right" />
            <span className="stick-leg stick-leg-left" />
            <span className="stick-leg stick-leg-right" />
            <span className="stick-impact" />
        </div>
    );
}

function IntroCodeBlock({ageState, activity, gitState, showDiff}) {
    return (
        <pre className={`intro-code-block is-${activity} is-git-${gitState}`} aria-label="Profile builder code">
            <code>
                <CodeLine lineNumber={1}>
                    <span className="code-class">PersonBuilder</span>
                </CodeLine>
                <CodeLine lineNumber={2} indent={1}>.<span className="code-method">setName</span>(<span className="code-string">&quot;{name}&quot;</span>)</CodeLine>
                <CodeLine lineNumber={3} indent={1}>.<span className="code-method">setAge</span>(<span className="code-number">{ageState}</span>)</CodeLine>
                <CodeLine lineNumber={4} indent={1}>.<span className="code-method">setGender</span>(<span className="code-class">Gender</span>.<span className="code-constant">{gender.toUpperCase()}</span>)</CodeLine>
                {showDiff ? (
                    <>
                        <CodeLine lineNumber={5} indent={1} variant="removed">.<span className="code-method">setJob</span>(<span className="code-string">&quot;Software Engineer II&quot;</span>)</CodeLine>
                        <CodeLine lineNumber={5} indent={1} variant="added">.<span className="code-method">setJob</span>(<span className="code-string">&quot;{jobTitle}&quot;</span>)</CodeLine>
                    </>
                ) : (
                    <CodeLine lineNumber={5} indent={1}>.<span className="code-method">setJob</span>(<span className="code-string">&quot;{jobTitle}&quot;</span>)</CodeLine>
                )}
                <CodeLine lineNumber={6} indent={1}>.<span className="code-method">isAppleFan</span>(<span className="code-keyword">true</span>)</CodeLine>
                <CodeLine lineNumber={7} indent={1}>.<span className="code-method">addInterests</span>(</CodeLine>
                <CodeLine lineNumber={8} indent={2} className="is-debug-target"><span className="code-class">List</span>.<span className="code-method">of</span>(<span className="code-string">&quot;Coding&quot;</span>, <span className="code-string">&quot;Gym&quot;</span>)</CodeLine>
                <CodeLine lineNumber={9} indent={1}>)</CodeLine>
                <CodeLine lineNumber={10} indent={1}>.<span className="code-method">addEducation</span>(</CodeLine>
                <CodeLine lineNumber={11} indent={2}><span className="code-keyword">new</span> <span className="code-class">Degree</span>(</CodeLine>
                <CodeLine lineNumber={12} indent={3}><span className="code-string">&quot;B.S. in Computer Science&quot;</span>,</CodeLine>
                <CodeLine lineNumber={13} indent={3}><span className="code-string">&quot;CSU, Columbus, GA&quot;</span>,</CodeLine>
                <CodeLine lineNumber={14} indent={3}><span className="code-string">&quot;May 15th, 2020&quot;</span></CodeLine>
                <CodeLine lineNumber={15} indent={2}>),</CodeLine>
                <CodeLine lineNumber={16} indent={2}><span className="code-keyword">new</span> <span className="code-class">Degree</span>(</CodeLine>
                <CodeLine lineNumber={17} indent={3}><span className="code-string">&quot;M.S. in Computer Science&quot;</span>,</CodeLine>
                <CodeLine lineNumber={18} indent={3}><span className="code-string">&quot;CSU, Columbus, GA&quot;</span>,</CodeLine>
                <CodeLine lineNumber={19} indent={3}><span className="code-string">&quot;Aug 4th, 2021&quot;</span></CodeLine>
                <CodeLine lineNumber={20} indent={2}>)</CodeLine>
                <CodeLine lineNumber={21} indent={1}>)</CodeLine>
                <CodeLine lineNumber={22} indent={1} className="is-build-line">.<span className="code-method">build</span>();</CodeLine>
            </code>
        </pre>
    );
}

const Intro = () => {
    const [ageState, setAgeState] = useState("0.000000000");
    const [activity, setActivity] = useState("idle");
    const [gitState, setGitState] = useState("dirty");
    const [branchIndex, setBranchIndex] = useState(0);
    const [branchOpen, setBranchOpen] = useState(false);
    const [showDiff, setShowDiff] = useState(true);

    useEffect(() => {
        const iv = setInterval(() => setAgeState(getAge(birthday)), 500);
        return () => clearInterval(iv);
    }, []);

    const branch = BRANCHES[branchIndex];
    const consoleMessage = getConsoleMessage(activity, gitState, branch);
    const diffDelta = showDiff ? 2 : 0;

    function handleIdeAction(actionId) {
        if (actionId === "reset") {
            setBranchIndex(0);
            setBranchOpen(false);
            setActivity("idle");
            setGitState("dirty");
            setShowDiff(true);
            return;
        }

        setActivity(actionId);
    }

    function selectBranch(index) {
        setBranchIndex(index);
        setBranchOpen(false);
        setActivity("branch");
    }

    function commitChanges() {
        setShowDiff(false);
        setGitState("committed");
        setActivity("idle");
    }

    function pushChanges() {
        setGitState("pushed");
        setActivity("idle");
        setShowDiff(false);
    }

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

                    {/* RIGHT — interactive IDE panel */}
                    <div className={`col-md-7 col-sm-12 intro-code-panel is-${activity} is-git-${gitState}`}>
                        <div className="intro-ide-toolbar" role="toolbar" aria-label="Profile builder actions">
                            <div className="intro-ide-action-group">
                                {IDE_ACTIONS.map(action => (
                                    <button
                                        key={action.id}
                                        type="button"
                                        className={`intro-ide-button ${activity === action.id ? "is-active" : ""}`}
                                        disabled={(activity === "run" && action.id === "debug") || (activity === "debug" && action.id === "run")}
                                        aria-pressed={activity === action.id}
                                        title={action.label}
                                        onClick={() => handleIdeAction(action.id)}
                                    >
                                        <AtomMaterialIcon name={action.icon} />
                                        <span>{action.label}</span>
                                    </button>
                                ))}
                            </div>

                            <div
                                className="intro-ide-file-tab"
                                aria-label="Open file ProfileBuilder.java"
                            >
                                <AtomMaterialIcon name="java" />
                                <span>ProfileBuilder.java</span>
                            </div>
                        </div>

                        <div className="intro-editor-shell">
                            <IntroCodeBlock ageState={ageState} activity={activity} gitState={gitState} showDiff={showDiff} />

                            {activity === "debug" && (
                                <div className="intro-debug-bug" aria-hidden="true">
                                    <AtomMaterialIcon name="bug" />
                                    <div className="intro-debug-bubble">
                                        <span>Do you really?</span>
                                        <span>I thought you&apos;re lazy as hell.</span>
                                    </div>
                                </div>
                            )}

                            {activity === "run" && <StickPerson />}

                            <div className="intro-ide-console" aria-live="polite">
                                {consoleMessage}
                            </div>
                        </div>

                        <div className="intro-git-bar" aria-label="Git controls">
                            <div className="intro-git-delta" aria-label={`${diffDelta} changed lines`}>
                                <span aria-hidden="true">Δ</span>
                                <span>{diffDelta}</span>
                            </div>

                            <div className="intro-git-status-text" aria-live="polite">
                                {gitState === "pushed" ? `Pushed ${COMMIT_HASH} to origin/${branch}` : showDiff ? "setJob() updated" : `commit ${COMMIT_HASH}`}
                            </div>

                            <button type="button" className="intro-git-action" onClick={commitChanges}>
                                <AtomMaterialIcon name="commit" />
                                Commit
                            </button>

                            <button type="button" className="intro-git-action" onClick={pushChanges}>
                                <AtomMaterialIcon name="push" />
                                <span>Push</span>
                            </button>

                            <div className={`intro-branch-menu ${branchOpen ? "is-open" : ""}`}>
                                <button
                                    type="button"
                                    className="intro-git-branch-button"
                                    aria-expanded={branchOpen}
                                    onClick={() => setBranchOpen(open => !open)}
                                >
                                    <AtomMaterialIcon name="branch" />
                                    <span>{branch}</span>
                                </button>

                                <div className="intro-branch-popover" aria-label="Branches">
                                    {BRANCHES.map((branchName, index) => (
                                        <button
                                            key={branchName}
                                            type="button"
                                            className={index === branchIndex ? "is-current" : ""}
                                            onClick={() => selectBranch(index)}
                                        >
                                            <AtomMaterialIcon name="branch" />
                                            <span>{branchName}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Intro;
