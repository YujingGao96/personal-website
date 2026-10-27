"use client";

import React, {useEffect, useMemo, useRef, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronRight} from "@fortawesome/free-solid-svg-icons/faChevronRight";
import {buildProjectPalette} from "../../../util/GenArtUtil";
import FilmArtwork from "../../common/FilmArtwork";

function GeneratedProjectCover({project, palette}) {
    return (
        <div className="project-cover">
            <FilmArtwork subject={project.title} className="project-cover-svg"/>
            <div className="project-cover-fade"/>
            <div className="project-cover-title">
                <h3>{project.title}</h3>
            </div>
            <span className="project-map-code">MAP/{(palette.seed % 65536).toString(16).padStart(4, "0").toUpperCase()}</span>
        </div>
    );
}

const ProjectCard = ({project, index, ctaLabel = "Explore Project"}) => {
    const cardRef = useRef(null);
    const shellRef = useRef(null);
    const [visible, setVisible] = useState(false);
    const palette = useMemo(() => buildProjectPalette(project), [project]);

    useEffect(() => {
        const element = shellRef.current;
        if (!element) {
            return undefined;
        }

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setVisible(true);
                observer.disconnect();
            }
        }, {threshold: 0.12});

        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    function handleMouseMove(event) {
        const card = cardRef.current;
        if (!card) {
            return;
        }

        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;
        const maxTilt = 10;

        card.style.setProperty("--tilt-x", `${(y - 0.5) * maxTilt * -1}deg`);
        card.style.setProperty("--tilt-y", `${(x - 0.5) * maxTilt}deg`);
        card.style.setProperty("--spotlight-x", `${x * 100}%`);
        card.style.setProperty("--spotlight-y", `${y * 100}%`);
    }

    function handleMouseLeave() {
        const card = cardRef.current;
        if (!card) {
            return;
        }

        card.style.setProperty("--tilt-x", "0deg");
        card.style.setProperty("--tilt-y", "0deg");
        card.style.setProperty("--spotlight-x", "50%");
        card.style.setProperty("--spotlight-y", "50%");
    }

    return (
        <div
            className={`project-card-shell${visible ? " is-visible" : ""}`}
            ref={shellRef}
            style={{animationDelay: `${index * 120}ms`}}
        >
            <article
                className="project-card"
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    "--project-accent": palette.colorA,
                    "--project-accent-border": palette.border,
                }}
            >
                <GeneratedProjectCover project={project} palette={palette}/>
                <div className="project-card-body">
                    <div className="project-meta-row">
                        <span className="project-location">{project.addr}</span>
                        <span className="project-meta-dot"/>
                        <span className="project-date">{project.date}</span>
                    </div>
                    <p>{project.text}</p>
                    <div className="project-tags">
                        {project.tags.map((tag, tagIndex) => (
                            <span key={tag} style={{transitionDelay: `${tagIndex * 45}ms`}}>{tag}</span>
                        ))}
                    </div>
                    <a target="_blank" rel="noopener noreferrer" href={project.link} className="project-link">
                        {ctaLabel}
                        <FontAwesomeIcon icon={faChevronRight}/>
                    </a>
                </div>
            </article>
        </div>

    );
};

export default ProjectCard;
