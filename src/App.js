import React, {useState} from "react";
import Intro from "./components/Intro";
import NavBar from "./components/layout/NavBar";
import './App.css';
import ParticleBG from "./components/layout/ParticleBG";
import BottomFrame from "./components/BottomFrame";
import Projects from "./components/Projects";
import TimeLine from "./components/Timeline";
import Compliments from "./components/Compliments";
import Blogs from "./components/blog/Blogs";
import BlogPage from "./components/blog/BlogPage";

const App = () => {
    const [showMenu, setShowMenu] = useState(false);
    return (
        <React.Fragment>

            <ParticleBG/>
            <div className="container">
                <section><NavBar showMenu={showMenu} setShowMenu={setShowMenu}/></section>
                <section><Intro/></section>
                <section><Projects/></section>
                <section><TimeLine/></section>
                <section><Compliments/></section>
                <section><Blogs/></section>
                <section><BlogPage/></section>
            </div>
            <BottomFrame/>
        </React.Fragment>
    );
};

export default App;