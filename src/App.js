import React, {useState} from "react";
import Intro from "./components/intro/Intro";
import NavBar from "./components/NavBar";
import './App.css';
import ParticleBG from "./components/ParticleBG";
import BottomFrame from "./components/BottomFrame";
import MyProjectsCards from "./components/MyProjectsCards";
import TimeLine from "./components/Timeline";
import Quote from "./components/Quotes";

const App = () => {
    const [showMenu, setShowMenu] = useState(false);
    return (
        <React.Fragment>
            <NavBar showMenu={showMenu} setShowMenu={setShowMenu}/>
            <ParticleBG/>
            <div className="container">
                <section><Intro/></section>
                <section><MyProjectsCards/></section>
                <section><TimeLine/></section>
                <section><Quote/></section>
            </div>
            <BottomFrame/>
        </React.Fragment>
    );
};

export default App;