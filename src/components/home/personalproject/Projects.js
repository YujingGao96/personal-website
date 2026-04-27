import React from "react";
import SectionHeader from "../../common/SectionHeader";
import ProjectCard from "./ProjectCard";

const PROJECTS = [
    {
        title: "IEEE SoutheastCon",
        addr: "Huntsville, Alabama",
        date: "Spring 2019",
        text: "Published paper on 2019 IEEE SoutheastCon entitled Multi-Factor Stateful Authentication using NFC and Mobile Phones. The project implemented a Windows Authentication System using technologies like AES Encryption, pGina, and Android Host-based Card Emulation.",
        link: "https://ieeexplore.ieee.org/abstract/document/9020559",
        tags: ["Security", "NFC", "Android", "AES", "Java"],
        hue: 220,
        hue2: 260,
    },
    {
        title: "China Cafe Restaurant",
        addr: "Columbus, Georgia",
        date: "Summer 2020",
        text: "Help a local family-owned business design and implement online menu system. The system allows customers to place an order online and restaurant owner will get notified by email. Frameworks like React and Redux are used for handling large and complex menu dataset.",
        link: "https://menu-brown.vercel.app/",
        tags: ["React", "Redux", "Node.js", "Firebase"],
        hue: 150,
        hue2: 190,
    },
    {
        title: "Master the Mainframe",
        addr: "IBM",
        date: "Fall 2019",
        text: "Participated in the 2019 Master the Mainframe competition hosted by IBM and was recognized as 2019 Global Part 2 Winners and Part 3 Finishers. Through this experience, I gained knowledge of various mainframe programming languages, including Mainframe Assembler, JCL, and COBOL.",
        link: "https://www.youracclaim.com/users/yujing-gao.6c962a4d",
        tags: ["COBOL", "JCL", "Assembler", "IBM"],
        hue: 35,
        hue2: 20,
    },
];

const Projects = () => {
    return (
        <div id="projects">
            <SectionHeader eyebrow="Selected Work" title="Personal Projects" gradient="gradient-text-2"/>
            <div className="projects-grid">
                {PROJECTS.map((project, index) => (
                    <ProjectCard key={project.title} project={project} index={index}/>
                ))}
            </div>
        </div>
    );
};

export default Projects;
