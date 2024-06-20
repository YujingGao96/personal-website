import React from "react";
import ProjectCard from "./ProjectCard";

const Projects = () => {
    const body = () => {
        return (
            <div className="row mt-5">
                <ProjectCard
                    src="./ieee.jpeg"
                    title="IEEE SoutheastCon "
                    addr="Huntsville, Alabama"
                    date="Spring 2019"
                    text="Published paper on 2019 IEEE SoutheastCon entitled Multi-Factor Stateful Authentication using NFC and Mobile Phones. The project implemented a Windows Authentication System using technologies like AES Encryption, pGina, and Android Host-based Card Emulation."
                    link="https://ieeexplore.ieee.org/abstract/document/9020559"/>
                <ProjectCard
                    src="./restaurant.png"
                    title="China Cafe Restaurant"
                    addr="Columbus, Georgia"
                    date="Summer 2020"
                    text="Help a local family-owned business design and implement online menu system. The system allows customers to place an order online and restaurant owner will get notified by email. Frameworks like React and Redux are used for handling large and complex menu dataset."
                    link="https://menu-brown.vercel.app/"/>
                <ProjectCard
                    src="./mtm.png"
                    title="Master the Mainframe Competition"
                    addr="IBM"
                    date="Fall 2019"
                    text="Participated in 2019 Master the Mainframe hosted by IBM and recognized as one of the 2019 Global Part 2 Winners and Part 3 Finishers. I have, thus, exposed to various mainframe programming languages like Mainframe Assembler, JCL, and COBOL etc."
                    link="https://www.youracclaim.com/users/yujing-gao.6c962a4d"/>
            </div>
        );
    };

    return (
        <div id="experience">
            <h1 className="text-center gradient-text-2 fw-bold">Related Experience</h1>
            {body()}
        </div>
    );
};

export default Projects;