import React from "react";
import {currentYear} from "../../../resolvers/profileResolver";
import CursorToggleButton from "../home/CursorToggleButton";

const BottomFrame = () => {
    return (
        <>
            <div className="text-center mb-3">
                <CursorToggleButton/>
            </div>
            <p className="text-center text-secondary mb-2 ">Copyright &copy; Yujing Gao {currentYear}. All Rights Reserved</p>
            <p className="text-center text-secondary mb-2">Made with <span style={{color: "#ff5353"}}>♥</span> in Columbus, GA, USA</p>
            <div id="bottom-frame"/>
        </>
    );
};

export default BottomFrame;
