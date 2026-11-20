"use client";

import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import GeneratedTimelineArt from "./GeneratedTimelineArt";
import SectionHeader from "../../common/SectionHeader";
import {DEFAULT_BLOG_LANGUAGE, normalizeBlogLanguage} from "../../../lib/blog/language";
import {getHomeCopy, getTimelineElements} from "../../../lib/home/content";

const TIMELINE_LABELS = {
    en: {details: "Details", order: "Latest first"},
    zh: {details: "详细经历", order: "由近及远"},
};

function TimelineEntry({entry, index, copy, labels}) {
    const typeLabel = copy.timelineTypes[entry.type] || copy.timelineTypes.fallback;
    const number = String(index + 1).padStart(2, "0");

    return (
        <li className="timeline-row">
            <div className="timeline-entry-index" aria-hidden="true">
                <span>{number}</span>
                <FontAwesomeIcon icon={entry.icon} fixedWidth/>
            </div>
            <div className="timeline-card-meta">
                <span className="timeline-type-label">{typeLabel}</span>
                <span className="timeline-period">{entry.period}</span>
            </div>
            <article className="timeline-entry" aria-labelledby={`timeline-title-${entry.id}`}>
                <header>
                    <h3 id={`timeline-title-${entry.id}`}>{entry.title}</h3>
                    <p className="timeline-org-row">
                        <span>{entry.organization}</span>
                        <span className="timeline-location">{entry.location}</span>
                    </p>
                </header>
                <p className="timeline-summary">{entry.summary}</p>
                <details className="timeline-details" open={index === 0}>
                    <summary>
                        <span>{labels.details}</span>
                        <span className="timeline-details-toggle" aria-hidden="true"/>
                    </summary>
                    <div className="timeline-details-body">
                        <ul>
                            {entry.bullets.map((bullet) => (
                                <li key={bullet}>{bullet}</li>
                            ))}
                        </ul>
                        <div className="timeline-tags">
                            {entry.tags.map((tag) => (
                                <span key={tag}>{tag}</span>
                            ))}
                        </div>
                    </div>
                </details>
            </article>
            <div className="timeline-art-wrap" aria-hidden="true">
                <GeneratedTimelineArt entry={entry}/>
                <span className="timeline-art-code">SIG/{entry.id.slice(0, 6).toUpperCase()}</span>
            </div>
        </li>
    );
}

const TimeLine = ({language = DEFAULT_BLOG_LANGUAGE}) => {
    const copy = getHomeCopy(language);
    const timelineElements = getTimelineElements(language);
    const labels = TIMELINE_LABELS[normalizeBlogLanguage(language)];

    return (
        <section id="timeline" className="timeline-section">
            <SectionHeader eyebrow={copy.timelineEyebrow} title={copy.timelineTitle} sectionId="timeline"/>
            <div className="timeline-index-caption">
                <span>{copy.timelineAria}</span>
                <span>{labels.order}<span aria-hidden="true"> / {String(timelineElements.length).padStart(2, "0")}</span></span>
            </div>
            <ol className="timeline-rail" aria-label={copy.timelineAria}>
                {timelineElements.map((entry, index) => (
                    <TimelineEntry key={entry.id} entry={entry} index={index} copy={copy} labels={labels}/>
                ))}
            </ol>
        </section>
    );
};

export default TimeLine;
