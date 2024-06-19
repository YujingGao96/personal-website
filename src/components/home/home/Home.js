import React, {useState} from "react";


import './Home.css';

import Intro from "../intro/Intro";
import ParticleBG from "../background/ParticleBG";
import NavBar from "../navbar/NavBar";
import Projects from "../personalproject/Projects";
import TimeLine from "../Timeline";
import Compliments from "../Compliments";
import Blogs from "../blog/Blogs";
import BottomFrame from "../bottomframe/BottomFrame";

const Home = () => {
    const [showMenu, setShowMenu] = useState(false);
    return (
        <>
            <ParticleBG/>
            <NavBar showMenu={showMenu} setShowMenu={setShowMenu}/>
            <div className="container mt-5">
                <section><Intro/></section>
                <section><Projects/></section>
                <section><TimeLine/></section>
                <section><Compliments/></section>
                <section><Blogs/></section>
            </div>
            <BottomFrame/>
        </>
    );
};

export default Home;