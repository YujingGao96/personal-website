"use client";

import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import GeneratedTimelineArt from "./GeneratedTimelineArt";
import SectionHeader from "../../common/SectionHeader";
import {DEFAULT_BLOG_LANGUAGE} from "../../../lib/blog/language";
import {getHomeCopy, getTimelineElements} from "../../../lib/home/content";

function TimelineNode({entry}) {
    return (
        <div className="timeline-node" style={{"--timeline-accent": `hsl(${entry.hue} 82% 64%)`}}>
            <span className="timeline-node-ping"/>
            <span className="timeline-node-core">
                <FontAwesomeIcon icon={entry.icon} fixedWidth/>
            </span>
        </div>
    );
}

function TimelineCard({entry, index, copy}) {
    const isRight = index % 2 === 0;
    const typeLabel = copy.timelineTypes[entry.type] || copy.timelineTypes.fallback;

    return (
        <article className={`timeline-signal-card ${isRight ? "timeline-card-right" : "timeline-card-left"}`} style={{"--timeline-accent": `hsl(${entry.hue} 82% 64%)`}}>
            <div className="timeline-art-wrap">
                <GeneratedTimelineArt entry={entry}/>
                <span className="timeline-art-code">SIG/{entry.id.slice(0, 6).toUpperCase()}</span>
            </div>
            <div className="timeline-card-body">
                <div className="timeline-card-meta">
                    <span className="timeline-type-pill">{typeLabel}</span>
                    <span className="timeline-period">{entry.period}</span>
                </div>
                <h3>{entry.title}</h3>
                <div className="timeline-org-row">
                    <span>{entry.organization}</span>
                    <span className="timeline-meta-dot"/>
                    <span>{entry.location}</span>
                </div>
                <p>{entry.summary}</p>
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
        </article>
    );
}

const TimeLine = ({language = DEFAULT_BLOG_LANGUAGE}) => {
    const copy = getHomeCopy(language);
    const timelineElements = getTimelineElements(language);

    return (
        <div id="timeline" className="timeline-section">
            <SectionHeader eyebrow={copy.timelineEyebrow} title={copy.timelineTitle} sectionId="timeline" />
            <div className="timeline-rail" aria-label={copy.timelineAria}>
                {timelineElements.map((entry, index) => (
                    <div className="timeline-row" key={entry.id}>
                        <div className="timeline-slot timeline-slot-left">
                            {index % 2 === 1 && <TimelineCard entry={entry} index={index} copy={copy}/>}
                        </div>
                        <TimelineNode entry={entry}/>
                        <div className="timeline-slot timeline-slot-right">
                            {index % 2 === 0 && <TimelineCard entry={entry} index={index} copy={copy}/>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TimeLine;
