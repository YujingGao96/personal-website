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
    return (
        <>
            <ParticleBG/>
            <FluidCursor/>
            <div className="container" style={{marginTop: "10em"}}>
                <section><Intro/></section>
                <section><Blogs language={blogLanguage}/></section>
                <section><TimeLine/></section>
                <section><Projects/></section>
                <section><Compliments/></section>
            </div>
            <BottomFrame blogLanguage={blogLanguage}/>
        </>
    );
};

export default Home;
