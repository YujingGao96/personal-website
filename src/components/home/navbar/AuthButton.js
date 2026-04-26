"use client";

import Link from "next/link";
import {useEffect, useRef, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleUser, faRightToBracket, faUserShield} from "@fortawesome/free-solid-svg-icons";
import {useAuth, useUser, SignOutButton, SignInButton} from "@clerk/nextjs";

export default function AuthButton() {
    const {isSignedIn, isLoaded} = useAuth();
    const {user} = useUser();
    const wrapperRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const closeMenu = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("pointerdown", closeMenu);
        return () => document.removeEventListener("pointerdown", closeMenu);
    }, []);

    if (!isLoaded) return null;

    if (isSignedIn && user) {
        const initials = (user.firstName?.[0] || "") + (user.lastName?.[0] || "") || user.emailAddresses?.[0]?.emailAddress?.[0]?.toUpperCase() || "U";
        return (
            <div className={`nav-auth-wrapper ${isOpen ? "is-open" : ""}`} ref={wrapperRef}>
                <button
                    aria-expanded={isOpen}
                    aria-haspopup="menu"
                    className="nav-auth-avatar-btn nav-row"
                    onClick={() => setIsOpen((current) => !current)}
                    type="button"
                    title={`Signed in as ${user.emailAddresses?.[0]?.emailAddress || "user"}`}
                >
                    <span className="nav-auth-avatar-frame">
                        {user.imageUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={user.imageUrl}
                                alt=""
                                style={{width: 30, height: 30, borderRadius: "50%", objectFit: "cover"}}
                            />
                        ) : (
                            <span className="nav-auth-initials">{initials}</span>
                        )}
                    </span>
                    <span className="nav-auth-label">Account</span>
                </button>
                <div className="nav-auth-dropdown" role="menu">
                    <Link href="/admin/blog" className="nav-auth-dropdown-item" onClick={() => setIsOpen(false)} role="menuitem">
                        <FontAwesomeIcon icon={faUserShield} fixedWidth/>
                        Admin
                    </Link>
                    <SignOutButton>
                        <button className="nav-auth-dropdown-item" type="button" role="menuitem">
                            <FontAwesomeIcon icon={faRightToBracket} fixedWidth style={{transform: "scaleX(-1)"}}/>
                            Sign Out
                        </button>
                    </SignOutButton>
                </div>
            </div>
        );
    }

    return (
        <SignInButton mode="modal">
            <button className="nav-auth-signin-item" type="button" aria-label="Sign in">
                <FontAwesomeIcon icon={faCircleUser} size="xl"/>
            </button>
        </SignInButton>
    );
}
