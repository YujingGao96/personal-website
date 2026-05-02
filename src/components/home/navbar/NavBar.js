"use client";

import React, {useEffect, useState} from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser, faFileCode, faStream, faQuoteRight, faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import logo from "./logo.png";
import {BLOG_LANGUAGE_COOKIE, BLOG_LANGUAGE_EVENT, BLOG_LANGUAGE_PARAM, DEFAULT_BLOG_LANGUAGE, getSupportedBlogLanguage, normalizeBlogLanguage, withBlogLanguage} from "../../../lib/blog/language";
import {getClientCookie} from "../../../lib/clientPreferenceCookie";
import {getHomeCopy} from "../../../lib/home/content";

const AuthButton = dynamic(() => import("./AuthButton"), {ssr: false});

const NavBar = () => {
    const pathname = usePathname();
    const [currentTab, setCurrentTab] = useState('about');
    const [showMenu, setShowMenu] = useState(false);
    const [blogLanguage, setBlogLanguage] = useState(DEFAULT_BLOG_LANGUAGE);
    const isHomePage = pathname === "/";
    const activeTab = pathname?.startsWith("/blog") || pathname?.startsWith("/admin/blog") ? "blogs" : currentTab;
    const copy = getHomeCopy(blogLanguage);

    const currentSelectJSX = <span className="visually-hidden">{copy.navCurrent}</span>;

    useEffect(() => {
        const readLanguage = () => {
            const params = new URLSearchParams(window.location.search);
            const urlLanguage = getSupportedBlogLanguage(params.get(BLOG_LANGUAGE_PARAM));
            setBlogLanguage(urlLanguage || normalizeBlogLanguage(getClientCookie(BLOG_LANGUAGE_COOKIE)));
        };
        const handleLanguageChange = (event) => {
            setBlogLanguage(normalizeBlogLanguage(event.detail?.language));
        };

        readLanguage();
        window.addEventListener("popstate", readLanguage);
        window.addEventListener(BLOG_LANGUAGE_EVENT, handleLanguageChange);
        return () => {
            window.removeEventListener("popstate", readLanguage);
            window.removeEventListener(BLOG_LANGUAGE_EVENT, handleLanguageChange);
        };
    }, []);

    const handleMenuClick = (tab) => {
        setCurrentTab(tab);
        setShowMenu(false);
    };

    const renderNavItem = (tab, href, icon, label, iconColor) => (
        <li className={`px-2 nav-item ${activeTab === tab ? 'active' : ''}`} key={tab}>
            <a
                className="nav-link nav-row"
                href={href}
                onClick={() => handleMenuClick(tab)}
            >
                <span className="nav-icon-col">
                    <FontAwesomeIcon icon={icon} size="xl" fixedWidth color={iconColor}/>
                </span>
                <span className="fw-medium" style={{textShadow: "0 0 5px #000", fontSize: "1.15em"}}>{label}</span>
                {activeTab === tab ? currentSelectJSX : null}
            </a>
        </li>
    );

    return (
        <div className="container fixed-top">
            <nav className="navbar navbar-expand-lg navbar-dark px-3" id="navbar-bg">
                <div className="container-fluid">
                    {/* Logo on the left */}
                    <Link className="navbar-brand nav-row me-3" href={withBlogLanguage("/", blogLanguage)}>
                        <span className="nav-icon-col">
                            <Image src={logo} alt="Logo" height={38} width={38} priority/>
                        </span>
                    </Link>

                    <button
                        className={`navbar-toggler pr-2 hamburger hamburger--spring ${showMenu ? "is-active" : ''}`}
                        type="button"
                        aria-controls="navbarNav"
                        aria-expanded={showMenu ? "true" : "false"}
                        aria-label={copy.navToggle}
                        onClick={() => setShowMenu(!showMenu)}
                    >
                        <span className="hamburger-box">
                            <span className="hamburger-inner" />
                        </span>
                    </button>

                    <div className={`collapse navbar-collapse ${showMenu ? "show" : ""}`} id="navbarNav">
                        <ul className="navbar-nav">
                            {renderNavItem('about', isHomePage ? '#about' : withBlogLanguage('/#about', blogLanguage), faUser, copy.navAbout, "#6c74ab")}
                            {renderNavItem('blogs', isHomePage ? '#blogs' : withBlogLanguage('/blog', blogLanguage), faPaperPlane, copy.navBlogs, "#b593e1")}
                            {renderNavItem('timeline', isHomePage ? '#timeline' : withBlogLanguage('/#timeline', blogLanguage), faStream, copy.navTimeline,"#f49f22")}
                            {renderNavItem('projects', isHomePage ? '#projects' : withBlogLanguage('/#projects', blogLanguage), faFileCode, copy.navProjects, "#e4899a")}
                            {renderNavItem('compliments', isHomePage ? '#compliments' : withBlogLanguage('/#compliments', blogLanguage), faQuoteRight, copy.navCompliments, "#1ad1ee")}
                        </ul>
                        {/* Auth button pushed to the right */}
                        <div className="ms-auto">
                            <AuthButton language={blogLanguage}/>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default NavBar;
