import React from "react";
import Intro from "../intro/Intro";
import ParticleBG from "../background/ParticleBG";
import Projects from "../personalproject/Projects";
import TimeLine from "../timeline/Timeline";
import Compliments from "../compliment/Compliments";
import Blogs from "../blog/Blogs";
import BottomFrame from "../bottomframe/BottomFrame";
import FluidCursor from "./FluidCursor";
import {DEFAULT_BLOG_LANGUAGE} from "../../../lib/blog/language";

const Home = ({blogLanguage = DEFAULT_BLOG_LANGUAGE}) => {
    const documentLanguage = blogLanguage === "zh" ? "zh-Hans" : "en";

    return (
        <>
            <ParticleBG/>
            <FluidCursor/>
            <div className="container" style={{marginTop: "10em"}} lang={documentLanguage}>
                <section><Intro language={blogLanguage}/></section>
                <section><Blogs language={blogLanguage}/></section>
                <section><TimeLine language={blogLanguage}/></section>
                <section><Projects language={blogLanguage}/></section>
                <section><Compliments language={blogLanguage}/></section>
            </div>
            <BottomFrame blogLanguage={blogLanguage}/>
        </>
    );
};

export default Home;
