import React from "react";
import ProjectCard from "./ProjectCard";

const MyProjectsCards = () => {
    const body = () => {
        return (
            <div className="row mt-5">
                <ProjectCard
                    src="./ieee.jpeg"
                    title="Spring 2019, IEEE SoutheastCon, Huntsville, Alabama"
                    text="Published paper on 2019 IEEE SoutheastCon entitled Multi-Factor Stateful Authentication using NFC and Mobile Phones. The project implemented a Windows Authentication System using technologies like AES Encryption, pGina, and Android Host-based Card Emulation."
                    link="https://ieeexplore.ieee.org/abstract/document/9020559"/>
                <ProjectCard
                    src="./market.png"
                    title="Spring 2020, Midland Community Farmers Market, Midland, Georgia"
                    text="Voluntarily helped a local charity redesign their website and implement the vendor reservation system from scratch. The project involved using various technologies like Node.js with Express, PayPal RESTful API, Cloud Hosting as well as MySQL database system."
                    link="https://www.midlandmarket.org"/>
                <ProjectCard
                    src="./restaurant.png"
                    title="Summer 2020, China Cafe Restaurant, Columbus, Georgia"
                    text="Help a local family-owned business design and implement online menu system. The system allows customers to place an order online and restaurant owner will get notified by email. Frameworks like React and Redux are used for handling large and complex menu dataset."
                    link="https://menu-brown.vercel.app/"/>
                <ProjectCard
                    src="./server-side.png"
                    title="Fall 2019, Server Side Web Dev, Columbus State University"
                    text="The Team Gao project was launched under Server Side Web Development class. Four members was assigned to create an aesthetic movie searching engine. The website utilized OMDb RESTful API along with PHP as backend. It aims to bring the best user experience to our audiences."
                    link="https://web-project-team-gao.herokuapp.com/"/>
                <ProjectCard
                    src="./group-chat.jpeg"
                    title="Spring 2019, Mobile Computing, Columbus State University"
                    text="A final project for Mobile Computing class. The app is built for Android Mobile Operating System. It utilized the most popular Firebase real-time database framework & phone number authentication API from Google, and bring the best user experience to the customers. "
                    link="https://play.google.com/store/apps/details?id=com.gao.groupchat"/>
                <ProjectCard
                    src="./mtm.png"
                    title="Fall 2019, Master the Mainframe Competition, IBM"
                    text="Participated in 2019 Master the Mainframe hosted by IBM and recognized as one of the 2019 Global Part 2 Winners and Part 3 Finishers. I have, thus, exposed to various mainframe programming languages like Mainframe Assembler, JCL, and COBOL etc."
                    link="https://www.youracclaim.com/users/yujing-gao.6c962a4d"/>
            </div>
        );
    };

    return (
        <div id="experience">
            <h1 className="text-center gradient-text-2 font-weight-bold">Related Experience</h1>
            {body()}
        </div>
    );
};

export default MyProjectsCards;