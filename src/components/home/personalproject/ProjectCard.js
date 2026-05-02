"use client";

import React, {useEffect, useMemo, useRef, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronRight} from "@fortawesome/free-solid-svg-icons/faChevronRight";
import {
    buildProjectConstellation,
    buildProjectPalette,
    buildProjectTerrainTriangles,
    getProjectTerrainTriangleColor,
} from "../../../util/GenArtUtil";

function GeneratedProjectCover({project, palette}) {
    const width = 400;
    const height = 200;
    const hueB = project.hue2 ?? (palette.baseHue + 42) % 360;
    const triangles = useMemo(() => buildProjectTerrainTriangles(palette.seed, width, height), [palette.seed]);
    const stars = useMemo(() => buildProjectConstellation(palette.seed, 20, width, height), [palette.seed]);

    return (
        <div className="project-cover">
            <svg className="project-cover-svg" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                <rect width={width} height={height} fill={palette.dark}/>
                {triangles.map((triangle, index) => {
                    const color = getProjectTerrainTriangleColor(triangle, index, palette.seed, palette.baseHue, hueB, width, height);

                    return (
                        <polygon
                            className="project-terrain-triangle"
                            key={`${triangle[0].join("-")}-${index}`}
                            points={triangle.map((point) => point.join(",")).join(" ")}
                            fill={color}
                            stroke={color}
                            strokeWidth="0.6"
                        />
                    );
                })}
                <g opacity="0.58">
                    {stars.map((star, index) => (
                        <circle key={index} cx={star.x} cy={star.y} r={star.radius} fill={index % 3 === 0 ? palette.colorC : "#fff"} opacity={star.opacity}/>
                    ))}
                </g>
                <path d={`M0 ${height * 0.72} C72 ${height * 0.48} 126 ${height * 0.86} 196 ${height * 0.62} C262 ${height * 0.4} 312 ${height * 0.78} ${width} ${height * 0.52} L${width} ${height} L0 ${height} Z`} fill={palette.colorB} opacity="0.08"/>
                <path d={`M0 ${height * 0.36} C68 ${height * 0.16} 116 ${height * 0.5} 172 ${height * 0.32} C244 ${height * 0.08} 306 ${height * 0.42} ${width} ${height * 0.22}`} fill="none" stroke="#fff" strokeOpacity="0.18" strokeWidth="1.3"/>
            </svg>
            <div className="project-cover-horizon"/>
            <div className="project-cover-atmosphere"/>
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
