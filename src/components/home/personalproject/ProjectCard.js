import BannerTreatment from "../../common/BannerTreatment";
import React from "react";
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
    const triangles = buildProjectTerrainTriangles(palette.seed, width, height);
    const stars = buildProjectConstellation(palette.seed, 20, width, height);

    return (
        <div className="project-cover">
            <BannerTreatment className="project-cover-svg">
                <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
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
            </BannerTreatment>
        </div>
    );
}

const ProjectCard = ({project, ctaLabel = "Explore Project"}) => {
    const palette = buildProjectPalette(project);

    return (
        <div className="project-card-shell">
            <article
                className="project-card"
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
                    <h3 className="project-card-title">{project.title}</h3>
                    <p>{project.text}</p>
                    <div className="project-tags">
                        {project.tags.map((tag) => (
                            <span key={tag}>{tag}</span>
                        ))}
                    </div>
                    <a target="_blank" rel="noopener noreferrer" href={project.link} className="project-link">
                        {ctaLabel}
                        <span className="project-link-arrow" aria-hidden="true">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                                <path d="M5 19 19 5M5 5h14v14"/>
                            </svg>
                        </span>
                    </a>
                </div>
            </article>
        </div>

    );
};

export default ProjectCard;
