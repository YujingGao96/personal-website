"use client";

import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import GeneratedTimelineArt from "./GeneratedTimelineArt";
import SectionHeader from "../../common/SectionHeader";
import {timelineElements} from "../../../resolvers/timelineInfoResolver";

const TYPE_LABELS = {
    work: "Work",
    education: "Education",
    teaching: "Teaching",
    award: "Milestone",
};

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

function TimelineCard({entry, index}) {
    const isRight = index % 2 === 0;

    return (
        <article className={`timeline-signal-card ${isRight ? "timeline-card-right" : "timeline-card-left"}`} style={{"--timeline-accent": `hsl(${entry.hue} 82% 64%)`}}>
            <div className="timeline-art-wrap">
                <GeneratedTimelineArt entry={entry}/>
                <span className="timeline-art-code">SIG/{entry.id.slice(0, 6).toUpperCase()}</span>
            </div>
            <div className="timeline-card-body">
                <div className="timeline-card-meta">
                    <span className="timeline-type-pill">{TYPE_LABELS[entry.type] || "Event"}</span>
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

const TimeLine = () => {
    return (
        <div id="timeline" className="timeline-section">
            <SectionHeader eyebrow="Life Journey" title="Timeline" sectionId="timeline" />
            <div className="timeline-rail" aria-label="Career and education timeline">
                {timelineElements.map((entry, index) => (
                    <div className="timeline-row" key={entry.id}>
                        <div className="timeline-slot timeline-slot-left">
                            {index % 2 === 1 && <TimelineCard entry={entry} index={index}/>}
                        </div>
                        <TimelineNode entry={entry}/>
                        <div className="timeline-slot timeline-slot-right">
                            {index % 2 === 0 && <TimelineCard entry={entry} index={index}/>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TimeLine;
