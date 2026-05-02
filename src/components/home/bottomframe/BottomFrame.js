import React from "react";
import {currentYear} from "../../../resolvers/profileResolver";
import BlogLanguageSelector from "../../blog/BlogLanguageSelector";
import {DEFAULT_BLOG_LANGUAGE} from "../../../lib/blog/language";
import {getHomeCopy} from "../../../lib/home/content";
import CursorToggleButton from "../home/CursorToggleButton";

const BottomFrame = ({blogLanguage = DEFAULT_BLOG_LANGUAGE}) => {
    const copy = getHomeCopy(blogLanguage);

    return (
        <>
            <div className="footer-preferences text-center mb-3">
                <BlogLanguageSelector initialLanguage={blogLanguage}/>
                <CursorToggleButton language={blogLanguage}/>
            </div>
            <p className="text-center text-secondary mb-2 ">{copy.footerCopyright(currentYear)}</p>
            <p className="text-center text-secondary mb-2">{copy.footerMade}</p>
            <div id="bottom-frame"/>
        </>
    );
};

export default BottomFrame;
