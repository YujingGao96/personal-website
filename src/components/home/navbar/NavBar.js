"use client";

import React, {useState} from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser, faFileCode, faStream, faQuoteRight, faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import logo from "./logo.png";

const AuthButton = dynamic(() => import("./AuthButton"), {ssr: false});

const NavBar = () => {
    const pathname = usePathname();
    const [currentTab, setCurrentTab] = useState('about');
    const [showMenu, setShowMenu] = useState(false);
    const isHomePage = pathname === "/";
    const activeTab = pathname?.startsWith("/blog") || pathname?.startsWith("/admin/blog") ? "blogs" : currentTab;

    const currentSelectJSX = <span className="visually-hidden">(current)</span>;

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
                    <Link className="navbar-brand nav-row me-3" href="/">
                        <span className="nav-icon-col">
                            <Image src={logo} alt="Logo" height={38} width={38} priority/>
                        </span>
                    </Link>

                    <button
                        className={`navbar-toggler pr-2 hamburger hamburger--spring ${showMenu ? "is-active" : ''}`}
                        type="button"
                        aria-controls="navbarNav"
                        aria-expanded={showMenu ? "true" : "false"}
                        aria-label="Toggle navigation"
                        onClick={() => setShowMenu(!showMenu)}
                    >
                        <span className="hamburger-box">
                            <span className="hamburger-inner" />
                        </span>
                    </button>

                    <div className={`collapse navbar-collapse ${showMenu ? "show" : ""}`} id="navbarNav">
                        <ul className="navbar-nav">
                            {renderNavItem('about', isHomePage ? '#about' : '/#about', faUser, 'About', "#6c74ab")}
                            {renderNavItem('projects', isHomePage ? '#projects' : '/#projects', faFileCode, 'Projects', "#e4899a")}
                            {renderNavItem('blogs', isHomePage ? '#blogs' : '/blog', faPaperPlane, 'Blogs', "#b593e1")}
                            {renderNavItem('timeline', isHomePage ? '#timeline' : '/#timeline', faStream, 'Timeline',"#f49f22")}
                            {renderNavItem('compliments', isHomePage ? '#compliments' : '/#compliments', faQuoteRight, 'Compliments', "#1ad1ee")}
                        </ul>
                        {/* Auth button pushed to the right */}
                        <div className="ms-auto">
                            <AuthButton/>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default NavBar;
