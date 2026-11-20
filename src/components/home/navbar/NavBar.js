"use client";

import React, {useEffect, useRef, useState} from "react";
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
import {NavAuthSkeleton} from "../../common/LoadingSkeleton";

const AuthButton = dynamic(() => import("./AuthButton"), {ssr: false, loading: () => <NavAuthSkeleton/>});
const HOME_SECTIONS = ["about", "projects", "blogs", "timeline", "compliments"];
const PAGE_NAVIGATION = ["about", "blogs", "timeline", "projects", "compliments"];

const NavBar = ({authEnabled = true}) => {
    const pathname = usePathname();
    const navRef = useRef(null);
    const menuButtonRef = useRef(null);
    const [currentTab, setCurrentTab] = useState('about');
    const [showMenu, setShowMenu] = useState(false);
    const [blogLanguage, setBlogLanguage] = useState(DEFAULT_BLOG_LANGUAGE);
    const isHomePage = pathname === "/";
    const activeTab = pathname?.startsWith("/blog") || pathname?.startsWith("/admin/blog") ? "blogs" : currentTab;
    const copy = getHomeCopy(blogLanguage);
    const navigationItems = {
        about: {icon: faUser, label: copy.navAbout, color: "#6c74ab"},
        blogs: {icon: faPaperPlane, label: copy.navBlogs, color: "#b593e1"},
        timeline: {icon: faStream, label: copy.navTimeline, color: "#f49f22"},
        projects: {icon: faFileCode, label: copy.navProjects, color: "#e4899a"},
        compliments: {icon: faQuoteRight, label: copy.navCompliments, color: "#1ad1ee"},
    };

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

    useEffect(() => {
        if (!isHomePage) return;

        const sections = HOME_SECTIONS.map((id) => document.getElementById(id)).filter(Boolean);
        const updateCurrentSection = () => {
            const readingLine = Math.max(110, window.innerHeight * 0.3);
            const reachedSections = sections.filter((section) => section.getBoundingClientRect().top <= readingLine);
            setCurrentTab(reachedSections.at(-1)?.id || "about");
        };
        const readHash = () => {
            const sectionId = window.location.hash.slice(1);
            if (HOME_SECTIONS.includes(sectionId)) setCurrentTab(sectionId);
        };
        const observer = typeof IntersectionObserver === "undefined" ? null : new IntersectionObserver(
            updateCurrentSection,
            {rootMargin: "-96px 0px -65% 0px", threshold: 0}
        );
        sections.forEach((section) => observer?.observe(section));
        const frame = window.requestAnimationFrame(updateCurrentSection);
        window.addEventListener("hashchange", readHash);

        return () => {
            window.cancelAnimationFrame(frame);
            observer?.disconnect();
            window.removeEventListener("hashchange", readHash);
        };
    }, [isHomePage]);

    useEffect(() => {
        if (!isHomePage || !showMenu) return;

        const closeOutside = (event) => {
            if (navRef.current && !navRef.current.contains(event.target)) setShowMenu(false);
        };
        const closeOnEscape = (event) => {
            if (event.key !== "Escape") return;
            setShowMenu(false);
            menuButtonRef.current?.focus();
        };
        document.addEventListener("pointerdown", closeOutside);
        document.addEventListener("keydown", closeOnEscape);
        return () => {
            document.removeEventListener("pointerdown", closeOutside);
            document.removeEventListener("keydown", closeOnEscape);
        };
    }, [isHomePage, showMenu]);

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
                aria-current={activeTab === tab ? (isHomePage ? "location" : "page") : undefined}
            >
                {!isHomePage && <span className="nav-icon-col">
                    <FontAwesomeIcon icon={icon} size="xl" fixedWidth color={iconColor}/>
                </span>}
                <span className="fw-medium nav-link-label" style={isHomePage ? undefined : {textShadow: "0 0 5px #000", fontSize: "1.15em"}}>{label}</span>
                {activeTab === tab ? currentSelectJSX : null}
            </a>
        </li>
    );

    return (
        <div className={isHomePage ? "site-nav-home fixed-top" : "container fixed-top"}>
            <nav
                aria-label={blogLanguage === "zh" ? "主导航" : "Main navigation"}
                className={`navbar navbar-expand-lg navbar-dark px-3 ${showMenu ? "nav-menu-open" : ""}`}
                id="navbar-bg"
                ref={navRef}
            >
                <div className="container-fluid">
                    {/* Logo on the left */}
                    <Link
                        aria-label={blogLanguage === "zh" ? "高宇靖 — 首页" : "Yujing Gao — Home"}
                        className="navbar-brand nav-row me-3"
                        href={withBlogLanguage(isHomePage ? "/#about" : "/", blogLanguage)}
                    >
                        <span className="nav-icon-col site-nav-logo">
                            <Image src={logo} alt="" height={38} width={38} priority/>
                        </span>
                        {isHomePage && <span className="site-nav-name">Yujing Gao<span className="site-nav-name-period">.</span></span>}
                    </Link>

                    <button
                        className={`navbar-toggler pr-2 hamburger hamburger--spring ${showMenu ? "is-active" : ''}`}
                        type="button"
                        aria-controls="navbarNav"
                        aria-expanded={showMenu ? "true" : "false"}
                        aria-label={copy.navToggle}
                        onClick={() => setShowMenu(!showMenu)}
                        ref={menuButtonRef}
                    >
                        <span className="hamburger-box">
                            <span className="hamburger-inner" />
                        </span>
                    </button>

                    <div className={`collapse navbar-collapse ${showMenu ? "show" : ""}`} id="navbarNav">
                        <ul className="navbar-nav">
                            {(isHomePage ? HOME_SECTIONS : PAGE_NAVIGATION).map((tab) => {
                                const item = navigationItems[tab];
                                const href = isHomePage
                                    ? `#${tab}`
                                    : withBlogLanguage(tab === "blogs" ? "/blog" : `/#${tab}`, blogLanguage);
                                return renderNavItem(tab, href, item.icon, item.label, item.color);
                            })}
                        </ul>
                        {/* Auth button pushed to the right */}
                        {authEnabled && <div className="ms-auto site-nav-auth-slot">
                            <AuthButton language={blogLanguage}/>
                        </div>}
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default NavBar;
