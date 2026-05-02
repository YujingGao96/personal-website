"use client";

import {useCallback, useEffect, useRef, useState} from "react";
import GeneratedSigil from "../../common/GeneratedSigil";
import SectionHeader from "../../common/SectionHeader";
import {hashText} from "../../../util/GenArtUtil";
import {DEFAULT_BLOG_LANGUAGE} from "../../../lib/blog/language";
import {getCompliments, getHomeCopy} from "../../../lib/home/content";
import "./Compliments.css";

const TWO_ROW_THRESHOLD = 6;
const LOOP_COPIES = 3;
const AUTO_RESUME_DELAY = 5000;

function getSigilHue(name) {
    return hashText(name) % 360;
}

function ClientSigil({name, size}) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const frame = window.requestAnimationFrame(() => setMounted(true));
        return () => window.cancelAnimationFrame(frame);
    }, []);

    if (!mounted) {
        return <div className="compliment-sigil-placeholder" style={{width: size, height: size}} aria-hidden="true"/>;
    }

    return <GeneratedSigil name={name} size={size}/>;
}

function ComplimentCard({name, title, company, quote}) {
    const hue = getSigilHue(name);
    const c = `oklch(0.65 0.16 ${hue})`;
    const c2 = `oklch(0.66 0.2 ${(hue + 70) % 360})`;
    const c3 = `oklch(0.74 0.18 ${(hue + 150) % 360})`;

    return (
        <div
            className="compliment-card"
            style={{"--c": c, "--c2": c2, "--c3": c3}}
        >
            <div
                className="compliment-card-header"
                style={{
                    background: `
                        radial-gradient(circle at 16% 18%, ${c}26 0, transparent 34%),
                        radial-gradient(circle at 90% 0%, ${c2}1f 0, transparent 40%),
                        linear-gradient(135deg, rgba(14,14,24,0.18) 0%, ${c}0f 52%, ${c2}12 100%)
                    `
                }}
            >
                <div className="compliment-card-pattern" aria-hidden="true"/>
                <div className="compliment-card-shine" aria-hidden="true"/>

                <ClientSigil name={name} size={72}/>

                <div style={{flex: 1, minWidth: 0}}>
                    <div className="compliment-author-name">{name}</div>
                    <div className="compliment-author-title" style={{color: c}}>{title}</div>
                    <div className="compliment-author-company">{company}</div>
                </div>
            </div>

            <div className="compliment-quote-body">
                <div
                    className="compliment-quote-mark"
                    style={{color: c}}
                >
                    &ldquo;
                </div>
                <p className="compliment-quote-text">{quote}</p>
                <div
                    className="compliment-quote-accent"
                    style={{background: `linear-gradient(to right, ${c}, ${c2}, transparent)`}}
                />
            </div>
        </div>
    );
}

function MarqueeRow({items, reverse = false, speed = 42, ariaLabel}) {
    const scrollerRef = useRef(null);
    const rafRef = useRef(null);
    const lastInteractionRef = useRef(-AUTO_RESUME_DELAY);
    const scrollPositionRef = useRef(0);

    const getSegmentWidth = useCallback((scroller) => scroller.scrollWidth / LOOP_COPIES, []);

    const resetLoopPosition = useCallback((scroller) => {
        const segmentWidth = getSegmentWidth(scroller);
        if (!segmentWidth) return;

        if (scroller.scrollLeft < segmentWidth * 0.5) {
            scroller.scrollLeft += segmentWidth;
        } else if (scroller.scrollLeft > segmentWidth * 1.5) {
            scroller.scrollLeft -= segmentWidth;
        }
    }, [getSegmentWidth]);

    const updateCardDepth = useCallback(() => {
        const scroller = scrollerRef.current;
        if (!scroller) return;

        const scrollerRect = scroller.getBoundingClientRect();
        const centerX = scrollerRect.left + scrollerRect.width / 2;
        const maxDistance = scrollerRect.width * 0.58;
        const cards = scroller.querySelectorAll(".compliment-card");

        cards.forEach((card) => {
            const rect = card.getBoundingClientRect();
            const cardCenterX = rect.left + rect.width / 2;
            const offset = Math.max(-1, Math.min(1, (cardCenterX - centerX) / maxDistance));
            const distance = Math.abs(offset);
            const translateZ = -distance * 280;
            const rotateY = offset * -34;
            const scale = 1 - distance * 0.18;
            const translateY = distance * 14;

            card.style.transform = `translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale}) translateY(${translateY}px)`;
            card.style.opacity = `${1 - distance * 0.12}`;
            card.style.zIndex = `${Math.round((1 - distance) * 100)}`;
        });
    }, []);

    const pauseForUserScroll = useCallback(() => {
        lastInteractionRef.current = window.performance.now();
    }, []);

    const handleScroll = useCallback(() => {
        const scroller = scrollerRef.current;
        if (!scroller) return;

        resetLoopPosition(scroller);
        scrollPositionRef.current = scroller.scrollLeft;
        updateCardDepth();
    }, [resetLoopPosition, updateCardDepth]);

    useEffect(() => {
        const scroller = scrollerRef.current;
        if (!scroller) return undefined;

        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const centerScroller = () => {
            scrollPositionRef.current = getSegmentWidth(scroller);
            scroller.scrollLeft = scrollPositionRef.current;
            updateCardDepth();
        };

        let lastTimestamp = 0;
        const animate = (timestamp) => {
            if (!lastTimestamp) lastTimestamp = timestamp;
            const delta = timestamp - lastTimestamp;
            lastTimestamp = timestamp;

            if (!reducedMotion && timestamp - lastInteractionRef.current >= AUTO_RESUME_DELAY) {
                const segmentWidth = getSegmentWidth(scroller);
                const pixelsPerMillisecond = segmentWidth / (speed * 1000);
                scrollPositionRef.current += (reverse ? -1 : 1) * pixelsPerMillisecond * delta;

                if (scrollPositionRef.current < segmentWidth * 0.5) {
                    scrollPositionRef.current += segmentWidth;
                } else if (scrollPositionRef.current > segmentWidth * 1.5) {
                    scrollPositionRef.current -= segmentWidth;
                }

                scroller.scrollLeft = scrollPositionRef.current;
                updateCardDepth();
            }

            rafRef.current = window.requestAnimationFrame(animate);
        };

        window.requestAnimationFrame(centerScroller);
        rafRef.current = window.requestAnimationFrame(animate);
        window.addEventListener("resize", centerScroller);

        return () => {
            window.cancelAnimationFrame(rafRef.current);
            window.removeEventListener("resize", centerScroller);
        };
    }, [getSegmentWidth, resetLoopPosition, reverse, speed, updateCardDepth]);

    return (
        <div className="marquee-row">
            <div
                className="marquee-scroller"
                ref={scrollerRef}
                onScroll={handleScroll}
                onWheel={pauseForUserScroll}
                onPointerDown={pauseForUserScroll}
                onTouchStart={pauseForUserScroll}
                onKeyDown={pauseForUserScroll}
                tabIndex="0"
                role="region"
                aria-label={ariaLabel}
            >
                <div className="track">
                    {Array.from({length: LOOP_COPIES}, (_, group) => (
                        <div className="marquee-group" key={group} aria-hidden={group !== 1}>
                            {items.map((compliment) => (
                                <ComplimentCard key={`${group}-${compliment.name}`} {...compliment}/>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

const Compliments = ({language = DEFAULT_BLOG_LANGUAGE}) => {
    const copy = getHomeCopy(language);
    const compliments = getCompliments(language);
    const twoRows = compliments.length >= TWO_ROW_THRESHOLD;
    const row1 = twoRows ? compliments.slice(0, Math.ceil(compliments.length / 2)) : compliments;
    const row2 = twoRows ? compliments.slice(Math.ceil(compliments.length / 2)) : [];

    return (
        <div id="compliments">
            <SectionHeader eyebrow={copy.complimentsEyebrow} title={copy.complimentsTitle} sectionId="compliments" />

            <div className="compliments-marquee-outer">
                <MarqueeRow items={row1} speed={44} ariaLabel={copy.complimentsAria}/>
                {twoRows && <MarqueeRow items={row2} reverse speed={54} ariaLabel={copy.complimentsAria}/>}
            </div>
        </div>
    );
};

export default Compliments;
