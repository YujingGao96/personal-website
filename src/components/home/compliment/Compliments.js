"use client";

import {useEffect, useRef} from "react";
import GeneratedSigil from "../../common/GeneratedSigil";
import SectionHeader from "../../common/SectionHeader";
import {DEFAULT_BLOG_LANGUAGE, normalizeBlogLanguage} from "../../../lib/blog/language";
import {getCompliments, getHomeCopy} from "../../../lib/home/content";
import "./Compliments.css";

function ArrowIcon({previous = false}) {
    return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
            <path d={previous ? "M19 12H5m6 6-6-6 6-6" : "M5 12h14m-6-6 6 6-6 6"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
}

function ComplimentCard({name, title, company, quote, index}) {
    return (
        <figure className="compliment-card">
            <div className="compliment-card-topline" aria-hidden="true">
                <span className="compliment-card-number">{String(index + 1).padStart(2, "0")}</span>
                <span className="compliment-quote-mark">&ldquo;</span>
            </div>

            <blockquote className="compliment-quote-body">
                <p className="compliment-quote-text">{quote}</p>
            </blockquote>

            <figcaption className="compliment-card-author">
                <div className="compliment-sigil" aria-hidden="true">
                    <GeneratedSigil name={name} size={56}/>
                </div>
                <div className="compliment-author-details">
                    <div className="compliment-author-name">{name}</div>
                    <div className="compliment-author-title">{title}</div>
                    <div className="compliment-author-company">{company}</div>
                </div>
            </figcaption>
        </figure>
    );
}

const Compliments = ({language = DEFAULT_BLOG_LANGUAGE}) => {
    const copy = getHomeCopy(language);
    const compliments = getCompliments(language);
    const isChinese = normalizeBlogLanguage(language) === "zh";
    const scrollerRef = useRef(null);
    const controlsRef = useRef(null);
    const previousRef = useRef(null);
    const nextRef = useRef(null);

    useEffect(() => {
        const scroller = scrollerRef.current;
        const controls = controlsRef.current;
        const previous = previousRef.current;
        const next = nextRef.current;
        if (!scroller || !controls || !previous || !next) return undefined;

        const updateControls = () => {
            const position = scroller.scrollLeft;
            const end = scroller.scrollWidth - scroller.clientWidth;
            previous.disabled = position <= 2;
            next.disabled = position >= end - 2;
            controls.hidden = end <= 2;
        };

        updateControls();
        scroller.addEventListener("scroll", updateControls, {passive: true});
        const observer = typeof ResizeObserver !== "undefined" ? new ResizeObserver(updateControls) : null;
        observer?.observe(scroller);
        window.addEventListener("resize", updateControls, {passive: true});
        return () => {
            observer?.disconnect();
            scroller.removeEventListener("scroll", updateControls);
            window.removeEventListener("resize", updateControls);
        };
    }, [language, compliments.length]);

    function scrollCards(direction) {
        const scroller = scrollerRef.current;
        const firstCard = scroller?.firstElementChild;
        if (!scroller || !firstCard) return;
        const gap = Number.parseFloat(window.getComputedStyle(scroller).columnGap) || 0;
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        scroller.scrollBy({
            left: direction * (firstCard.getBoundingClientRect().width + gap),
            behavior: reducedMotion ? "auto" : "smooth",
        });
    }

    function handleKeyDown(event) {
        if (event.target !== event.currentTarget) return;
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            scrollCards(event.key === "ArrowLeft" ? -1 : 1);
        }
    }

    return (
        <div id="compliments" className="compliments-section">
            <div className="compliments-heading">
                <SectionHeader eyebrow={copy.complimentsEyebrow} title={copy.complimentsTitle} sectionId="compliments"/>
                <div className="compliments-controls" ref={controlsRef} hidden>
                    <button type="button" className="compliments-scroll-button" ref={previousRef} onClick={() => scrollCards(-1)} aria-label={isChinese ? "上一条推荐" : "Previous testimonial"} aria-controls="compliments-track">
                        <ArrowIcon previous/>
                    </button>
                    <button type="button" className="compliments-scroll-button" ref={nextRef} onClick={() => scrollCards(1)} aria-label={isChinese ? "下一条推荐" : "Next testimonial"} aria-controls="compliments-track">
                        <ArrowIcon/>
                    </button>
                </div>
            </div>

            <div
                id="compliments-track"
                className="compliments-track"
                ref={scrollerRef}
                tabIndex="0"
                role="region"
                aria-label={copy.complimentsAria}
                onKeyDown={handleKeyDown}
            >
                {compliments.map((compliment, index) => (
                    <ComplimentCard key={compliment.name} {...compliment} index={index}/>
                ))}
            </div>
            <p className="compliments-scroll-hint">
                <span aria-hidden="true">↔</span>
                {isChinese ? "左右滑动，阅读更多推荐" : "Scroll to read more"}
                <span className="compliments-total">{String(compliments.length).padStart(2, "0")}</span>
            </p>
        </div>
    );
};

export default Compliments;
