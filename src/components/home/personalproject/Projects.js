import React from "react";
import SectionHeader from "../../common/SectionHeader";
import ProjectCard from "./ProjectCard";
import {DEFAULT_BLOG_LANGUAGE} from "../../../lib/blog/language";
import {getHomeCopy, getProjects} from "../../../lib/home/content";

const Projects = ({language = DEFAULT_BLOG_LANGUAGE}) => {
    const copy = getHomeCopy(language);
    const projects = getProjects(language);

    return (
        <div id="projects">
            <SectionHeader eyebrow={copy.projectsEyebrow} title={copy.projectsTitle} sectionId="projects" />
            <div className="projects-grid">
                {projects.map((project, index) => (
                    <ProjectCard key={project.title} project={project} index={index} ctaLabel={copy.projectExplore}/>
                ))}
            </div>
        </div>
    );
};

export default Projects;
