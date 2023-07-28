import React, {useState} from "react";
import AnchorLink from 'react-anchor-link-smooth-scroll'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTerminal, faUser, faFileCode, faStream, faQuoteRight} from "@fortawesome/free-solid-svg-icons";
import "./navbar.css";

const NavBar = ({showMenu, setShowMenu}) => {
    const [currentTab, setCurrentTab] = useState('about');
    const currentSelectJSX = <span className="sr-only">(current)</span>;

    return (
        <nav className="navbar navbar-expand-lg navbar-dark fixed-top" id="navbar-bg">
            <div className="container">
                <a className="navbar-brand text-warning pl-2" href="/#about">
                    <FontAwesomeIcon icon={faTerminal} size="lg"/>
                </a>
                <button
                    className={`navbar-toggler pr-2 hamburger hamburger--spring ${showMenu ? "is-active" : ''}`}
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    onClick={() => setShowMenu(!showMenu)}
                >
                                <span className="hamburger-box">
                                    <span className="hamburger-inner"/>
                                </span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        <li className={`px-2 nav-item ${currentTab === 'about' ? 'active' : ''}`}>
                            <AnchorLink
                                offset="100"
                                className="nav-link"
                                href="#about"
                                data-toggle="collapse"
                                data-target="#navbarNav"
                                onClick={() => {
                                    setCurrentTab('about');
                                    setShowMenu(!showMenu)
                                }}
                            >
                                <FontAwesomeIcon icon={faUser} size="lg" fixedWidth/> &nbsp;
                                About{currentTab === 'about' ? currentSelectJSX : null}
                            </AnchorLink>
                        </li>
                        <li className={`px-2 nav-item ${currentTab === 'experience' ? 'active' : ''}`}>
                            <AnchorLink
                                offset="100"
                                className="nav-link"
                                href="#experience"
                                data-toggle="collapse"
                                data-target="#navbarNav"
                                onClick={() => {
                                    setCurrentTab('experience');
                                    setShowMenu(!showMenu)
                                }}
                            >
                                <FontAwesomeIcon icon={faFileCode} size="lg" fixedWidth/> &nbsp;
                                Experience{currentTab === 'experience' ? currentSelectJSX : null}
                            </AnchorLink>
                        </li>
                        <li className={`px-2 nav-item ${currentTab === 'timeline' ? 'active' : ''}`}>
                            <AnchorLink
                                offset="100"
                                className="nav-link"
                                href="#timeline"
                                data-toggle="collapse"
                                data-target="#navbarNav"
                                onClick={() => {
                                    setCurrentTab('timeline');
                                    setShowMenu(!showMenu)
                                }}
                            >
                                <FontAwesomeIcon icon={faStream} size="lg" fixedWidth/> &nbsp;
                                Timeline{currentTab === 'timeline' ? currentSelectJSX : null}
                            </AnchorLink>
                        </li>
                        <li className={`px-2 nav-item ${currentTab === 'quotes' ? 'active' : ''}`}>
                            <AnchorLink
                                offset="100"
                                className="nav-link"
                                href="#quotes"
                                data-toggle="collapse"
                                data-target="#navbarNav"
                                onClick={() => {
                                    setCurrentTab('quotes');
                                    setShowMenu(!showMenu)
                                }}>
                                <FontAwesomeIcon icon={faQuoteRight} size="lg" fixedWidth/> &nbsp;
                                Quotes{currentTab === 'quotes' ? currentSelectJSX : null}
                            </AnchorLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
