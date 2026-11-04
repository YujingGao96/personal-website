import React from "react";
import {currentYear} from "../../../resolvers/profileResolver";
import BlogLanguageSelector from "../../blog/BlogLanguageSelector";
import {DEFAULT_BLOG_LANGUAGE} from "../../../lib/blog/language";
import CursorToggleButton from "../home/CursorToggleButton";
import FooterText from "./FooterText";
import MotionBoundary from "../../common/MotionBoundary";
import FooterCyclists from "./FooterCyclists";

const BottomFrame = ({blogLanguage = DEFAULT_BLOG_LANGUAGE}) => {
    return (
        <>
            <div className="footer-preferences text-center mb-3">
                <BlogLanguageSelector key={`footer-language-${blogLanguage}`} initialLanguage={blogLanguage}/>
                <CursorToggleButton language={blogLanguage}/>
            </div>
            <FooterText key={`footer-text-${blogLanguage}`} initialLanguage={blogLanguage} currentYear={currentYear}/>
            <MotionBoundary id="bottom-frame" className="footer-city-scene">
                <FooterCyclists/>
            </MotionBoundary>
        </>
    );
};

export default BottomFrame;
