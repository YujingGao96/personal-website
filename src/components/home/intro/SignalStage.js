"use client";

import Image from "next/image";
import {useEffect, useRef, useState} from "react";
import useMotionVisibility from "../../../hooks/useMotionVisibility";
import SignalArrow from "./SignalArrow";

const MODES = [
    {id: "spectrum"},
    {id: "systems", href: "#projects"},
    {id: "writing", href: "#blogs"},
];

const CIRCUITS = [
    "M58 226H146L216 156H329L398 87H500",
    "M69 299H150L220 229H363L460 132H573",
    "M77 371H171L258 284H376L471 189H579",
    "M117 417H208L267 358H422L516 264H587",
];
const PRINT_LINES = [
    [246, 173, 398], [246, 188, 430], [246, 203, 422], [246, 218, 369],
    [246, 257, 430], [246, 272, 411], [246, 287, 425], [246, 302, 399],
    [246, 317, 417], [246, 332, 375],
];

function SpectrumGuides() {
    return (
        <g className="signal-spectrum-guides">
            <circle cx="320" cy="252" r="180" strokeDasharray="1 9" />
            <circle cx="320" cy="252" r="207" strokeOpacity=".29" />
            <path d="M320 36v33m0 366v33M104 252h34m364 0h34" />
            <path className="signal-draw" pathLength="1" d="M113 252a207 207 0 0 1 207-207m207 207a207 207 0 0 1-207 207" />
        </g>
    );
}

function SystemsDrawing() {
    return (
        <g className="signal-circuit">
            <path d="M320 57 538 175v157L320 451 102 332V175Zm0 0v394M102 175l218 120 218-120M102 332l218-118 218 118" strokeOpacity=".32"/>
            <path d="M210 186 320 127l110 59v122l-110 60-110-60Zm0 0 110 60 110-60m-110 60v122" fill="#0e1921" fillOpacity=".76"/>
            {CIRCUITS.map((path, index) => (
                <path key={path} d={path} pathLength="1" className="signal-draw" style={{"--trace-delay": `${index * 70}ms`}}/>
            ))}
            <circle cx="320" cy="246" r="6" fill="currentColor"/>
            <circle cx="500" cy="87" r="3"/><circle cx="587" cy="264" r="3"/>
            <circle cx="77" cy="371" r="3"/><circle cx="117" cy="417" r="3"/>
        </g>
    );
}

function WritingDrawing() {
    return (
        <g className="signal-print" transform="rotate(-12 320 252)">
            <path d="M184 123h224l29 30v255H184z" strokeOpacity=".28" fill="#24171b" fillOpacity=".61" transform="translate(-29 31)"/>
            <path d="M210 92h220l30 30v255H210z" fill="#24171b" fillOpacity=".72"/>
            <path d="M430 92v30h30" />
            <path className="signal-draw" pathLength="1" d="M246 147h100" strokeWidth="5"/>
            {PRINT_LINES.map(([x, y, end], index) => (
                <path key={y} d={`M${x} ${y}H${end}`} pathLength="1" className="signal-draw"
                      style={{"--trace-delay": `${45 + index * 24}ms`}} strokeOpacity={index % 3 ? ".58" : ".81"}/>
            ))}
            <path d="M336 349c24-21 43-26 48-26 10 0-14 24-11 26s24-7 48-15" strokeWidth="1.6"/>
        </g>
    );
}

export default function SignalStage({label, tabs}) {
    const [index, setIndex] = useState(0);
    const scene = useRef(null);
    const controls = useRef([]);
    const pointerFrame = useRef(0);
    const active = useMotionVisibility(scene, {rootMargin: "0px"});
    const mode = MODES[index];

    useEffect(() => {
        const node = scene.current;

        return () => {
            cancelAnimationFrame(pointerFrame.current);
            pointerFrame.current = 0;
            node?.style.removeProperty("--signal-x");
            node?.style.removeProperty("--signal-y");
        };
    }, [active]);

    function movePointer(event) {
        if (!active || event.pointerType !== "mouse") return;

        const {clientX, clientY, currentTarget} = event;
        cancelAnimationFrame(pointerFrame.current);
        pointerFrame.current = requestAnimationFrame(() => {
            const rect = currentTarget.getBoundingClientRect();
            currentTarget.style.setProperty("--signal-x", `${((clientX - rect.left) / rect.width - 0.5) * 20}px`);
            currentTarget.style.setProperty("--signal-y", `${((clientY - rect.top) / rect.height - 0.5) * 20}px`);
        });
    }

    function resetPointer(event) {
        cancelAnimationFrame(pointerFrame.current);
        event.currentTarget.style.removeProperty("--signal-x");
        event.currentTarget.style.removeProperty("--signal-y");
    }

    function onTabKey(event, tabIndex) {
        let nextIndex;

        switch (event.key) {
            case "ArrowRight":
                nextIndex = (tabIndex + 1) % MODES.length;
                break;
            case "ArrowLeft":
                nextIndex = (tabIndex - 1 + MODES.length) % MODES.length;
                break;
            case "Home":
                nextIndex = 0;
                break;
            case "End":
                nextIndex = MODES.length - 1;
                break;
            default:
                return;
        }

        event.preventDefault();
        setIndex(nextIndex);
        controls.current[nextIndex]?.focus();
    }

    return (
        <div className="signal-stage" data-mode={mode.id}>
            <div className="signal-scene" ref={scene} onPointerMove={movePointer} onPointerLeave={resetPointer} aria-hidden="true">
                <div className="signal-art">
                    <Image src="/art/signal-aperture.webp" alt="" fill unoptimized preload
                           sizes="(max-width: 760px) 100vw, 650px" className="signal-photo"/>
                    <div className="signal-art-veil"/>
                </div>
                <svg className="signal-instrument" viewBox="0 0 640 504" fill="none" stroke="currentColor" focusable="false">
                    <g key={mode.id} className="signal-diagram">
                        {mode.id === "spectrum" && <SpectrumGuides/>}
                        {mode.id === "systems" && <SystemsDrawing/>}
                        {mode.id === "writing" && <WritingDrawing/>}
                    </g>
                </svg>
                <div className="signal-reticle" aria-hidden="true">
                    <span/><span/><span/><span/>
                </div>
                <div className="signal-scene-label"><span className="signal-led"/>{label}</div>
                <div className="signal-scene-index">0{index + 1} <span>/</span> 0{MODES.length}</div>
            </div>

            <div className="signal-tabs" role="tablist" aria-label={label}>
                {tabs.map(({label: tabLabel}, tabIndex) => {
                    const {id} = MODES[tabIndex];
                    const selected = index === tabIndex;

                    return (
                        <button key={id} ref={node => { controls.current[tabIndex] = node; }} type="button"
                                id={`signal-tab-${id}`} role="tab" aria-controls={`signal-panel-${id}`}
                                aria-selected={selected} tabIndex={selected ? 0 : -1}
                                onClick={() => setIndex(tabIndex)} onKeyDown={event => onTabKey(event, tabIndex)}>
                            <span>{tabLabel}</span>
                        </button>
                    );
                })}
            </div>

            {tabs.map((tab, tabIndex) => {
                const {id, href} = MODES[tabIndex];

                return (
                    <div key={id} className="signal-caption" id={`signal-panel-${id}`} role="tabpanel"
                         aria-labelledby={`signal-tab-${id}`} hidden={index !== tabIndex} tabIndex={href ? undefined : 0}>
                        <div>
                            <strong>{tab.caption}</strong>
                            <p>{tab.detail}</p>
                        </div>
                        {href && <a href={href}>{tab.linkLabel} <SignalArrow/></a>}
                    </div>
                );
            })}
        </div>
    );
}
