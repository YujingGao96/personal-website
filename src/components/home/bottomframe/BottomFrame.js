import React from "react";
import "./BottomFrame.css";
import {currentYear} from "../../../resolvers/profileResolver";

const BottomFrame = () => {
    return (
        <>
            <p className="text-center text-secondary mb-2 ">Copyright &copy; Yujing Gao {currentYear}. All Rights Reserved</p>
            <p className="text-center text-secondary mb-2">Made with <span style={{color: "#ff5353"}}>♥</span> in Columbus, GA, USA</p>
            <div id="bottom-frame"/>
        </>
    );
};

export default BottomFrame;