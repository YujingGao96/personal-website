import React from "react";
import "./BottomFrame.css";
import {currentYear} from "../../../resolvers/profileResolver";

const BottomFrame = () => {
    return (
        <>
            <h6 className="text-center text-light mb-2 blog-cover-front-2 fw-lighter">Copyright &copy; Yujing Gao {currentYear}. All Rights Reserved</h6>
            <h6 className="text-center text-light blog-cover-front-2 fw-lighter">Made with <span style={{color: "red"}}>♥</span> in Columbus, GA, USA</h6>
            <div id="bottom-frame"/>
        </>
    );
};

export default BottomFrame;