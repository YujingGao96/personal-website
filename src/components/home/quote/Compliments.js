"use client";

import {useCallback, useEffect, useRef, useState} from "react";
import GeneratedSigil from "../../common/GeneratedSigil";
import SectionHeader from "../../common/SectionHeader";
import {hashText} from "../../../util/GenArtUtil";
import "./Compliments.css";

const COMPLIMENTS = [
    {
        name: "Lee Holmes",
        title: "Vice President",
        company: "Global Payments",
        quote: "Thank you for guiding and mentoring our interns. With your coaching, they have accomplished great things. I am genuinely grateful for all your wisdom and advice that you have shared with all our team members, including our interns.",
    },
    {
        name: "Larry Cline",
        title: "Manager",
        company: "Midland Farmers Market",
        quote: "I am beyond grateful for your dedication to this project to make it right. I would be happy to help if you ever need a letter of recommendation, as I'm sure any employer would be pleased to know what kind of a person he's considering.",
    },
    {
        name: "Rebecca Hagues",
        title: "ESOL Teacher",
        company: "Shaw High School",
        quote: "Yujing, I am so incredibly proud of you! Your hard work and determination to succeed inspire everyone around you! I am genuinely excited and eager to see the amazing things you will accomplish in the future. Keep being awesome!",
    },
    {
        name: "Rania Hodhod",
        title: "Assistant CS Professor",
        company: "Columbus State University",
        quote: "I want to express my heartfelt gratitude to you for generously offering your time and expertise to support our student, as it will undoubtedly have a significant impact on the professional development of our CS and IT students.",
    },
    {
        name: "Shamim Khan",
        title: "Professor & Chair of CS Department",
        company: "Columbus State University",
        quote: "Your work demonstrates a wonderful example of interdisciplinary work that we always aspire for. This speaks volumes about the calibre of our faculty and students. We won't miss an opportunity to brag about this achievement.",
    },
];

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

function MarqueeRow({items, reverse = false, speed = 42}) {
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
            card.style.opacity = `${1 - distance * 0.28}`;
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
                aria-label="Scrollable compliments"
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

const Compliments = () => {
    const twoRows = COMPLIMENTS.length >= TWO_ROW_THRESHOLD;
    const row1 = twoRows ? COMPLIMENTS.slice(0, Math.ceil(COMPLIMENTS.length / 2)) : COMPLIMENTS;
    const row2 = twoRows ? COMPLIMENTS.slice(Math.ceil(COMPLIMENTS.length / 2)) : [];

    return (
        <div id="compliments">
            <SectionHeader eyebrow="Kind Words" title="Compliments" gradient="gradient-text-4"/>

            <div className="compliments-marquee-outer">
                <MarqueeRow items={row1} speed={44}/>
                {twoRows && <MarqueeRow items={row2} reverse speed={54}/>}
            </div>
        </div>
    );
};

export default Compliments;
