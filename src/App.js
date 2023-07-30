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

const App = () => {
    const [showMenu, setShowMenu] = useState(false);
    return (
        <React.Fragment>
            <NavBar showMenu={showMenu} setShowMenu={setShowMenu}/>
            <ParticleBG/>
            <div className="container">
                <section><Intro/></section>
                <section><Projects/></section>
                <section><TimeLine/></section>
                <section><Compliments/></section>
                <section><Blogs/></section>
            </div>
            <BottomFrame/>
        </React.Fragment>
    );
};

export default App;