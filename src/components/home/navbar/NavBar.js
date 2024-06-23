import React, { useState, useEffect } from "react";
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faFileCode, faStream, faQuoteRight, faBlog } from "@fortawesome/free-solid-svg-icons";
import "./NavBar.css";
import trophyImg from './trophy.png';

const NavBar = () => {
    const [currentTab, setCurrentTab] = useState('about');
    const [showMenu, setShowMenu] = useState(false);

    const currentSelectJSX = <span className="sr-only">(current)</span>;

    useEffect(() => {
        const navBarCollapse = document.getElementById('navbarNav');
        if (showMenu) {
            navBarCollapse.classList.add('show');
        } else {
            navBarCollapse.classList.remove('show');
        }
    }, [showMenu]);

    const handleMenuClick = (tab) => {
        setCurrentTab(tab);
        setShowMenu(false); // Close the menu after clicking an item
    };

    const renderNavItem = (tab, href, icon, label) => (
        <li className={`px-2 nav-item ${currentTab === tab ? 'active' : ''}`}>
            <AnchorLink
                offset="100"
                className="nav-link"
                href={href}
                onClick={() => handleMenuClick(tab)}
            >
                <FontAwesomeIcon icon={icon} size="lg" fixedWidth /> &nbsp;
                {label}
                {currentTab === tab ? currentSelectJSX : null}
            </AnchorLink>
        </li>
    );

    return (
        <div className="container sticky-top">
            <nav className="navbar navbar-expand-lg navbar-dark px-3" id="navbar-bg">
                <div className="container-fluid d-flex justify-content-between flex-row-reverse">
                    <a className="navbar-brand" href="/">
                        <img src={trophyImg} alt="Logo" height="44px" />
                    </a>

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

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ml-auto">
                            {renderNavItem('about', '#about', faUser, 'About')}
                            {renderNavItem('projects', '#projects', faFileCode, 'Projects')}
                            {renderNavItem('blogs', '#blogs', faBlog, 'Blogs')}
                            {renderNavItem('timeline', '#timeline', faStream, 'Timeline')}
                            {renderNavItem('compliments', '#compliments', faQuoteRight, 'Compliments')}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default NavBar;
