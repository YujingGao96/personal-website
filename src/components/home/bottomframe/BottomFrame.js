import React from "react";
import {currentYear} from "../../../resolvers/profileResolver";
import BlogLanguageSelector from "../../blog/BlogLanguageSelector";
import {DEFAULT_BLOG_LANGUAGE} from "../../../lib/blog/language";
import CursorToggleButton from "../home/CursorToggleButton";

const BottomFrame = ({blogLanguage = DEFAULT_BLOG_LANGUAGE}) => {
    return (
        <>
            <div className="footer-preferences text-center mb-3">
                <BlogLanguageSelector initialLanguage={blogLanguage}/>
                <CursorToggleButton language={blogLanguage}/>
            </div>
            <p className="text-center text-secondary mb-2 ">Copyright &copy; Yujing Gao {currentYear}. All Rights Reserved</p>
            <p className="text-center text-secondary mb-2">Made with <span style={{color: "#ff5353"}}>♥</span> in Columbus, GA, USA</p>
            <div id="bottom-frame"/>
        </>
    );
};

export default BottomFrame;
