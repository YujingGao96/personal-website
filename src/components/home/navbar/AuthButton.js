"use client";

import Link from "next/link";
import {useEffect, useRef, useState} from "react";
import {createPortal} from "react-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleUser, faRightToBracket, faUserShield, faXmark} from "@fortawesome/free-solid-svg-icons";
import {useAuth, useUser, SignOutButton, SignIn} from "@clerk/nextjs";

export default function AuthButton() {
    const {isSignedIn, isLoaded} = useAuth();
    const {user} = useUser();
    const wrapperRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [signInFrame, setSignInFrame] = useState(null);

    useEffect(() => {
        const closeMenu = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("pointerdown", closeMenu);
        return () => document.removeEventListener("pointerdown", closeMenu);
    }, []);

    useEffect(() => {
        if (!signInFrame) return;

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                setSignInFrame(null);
            }
        };

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [signInFrame]);

    const openSignIn = (event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const panelWidth = Math.min(560, window.innerWidth - 32);
        const preferredLeft = rect.left + rect.width / 2 - panelWidth / 2;
        const left = Math.min(Math.max(preferredLeft, 16), window.innerWidth - panelWidth - 16);
        const top = Math.max(Math.min(rect.bottom + 12, window.innerHeight - 96), 16);

        setSignInFrame({
            left,
            top,
            originX: rect.left + rect.width / 2 - left,
            originY: Math.max(rect.top + rect.height / 2 - top, 0),
        });
    };

    const signInDialog = signInFrame && typeof document !== "undefined"
        ? createPortal(
            <div className="nav-auth-modal-layer">
                <div className="nav-auth-modal-backdrop" onClick={() => setSignInFrame(null)} />
                <section
                    aria-label="Sign in"
                    aria-modal="true"
                    className="nav-auth-modal-panel"
                    role="dialog"
                    style={{
                        "--auth-modal-left": `${signInFrame.left}px`,
                        "--auth-modal-top": `${signInFrame.top}px`,
                        "--auth-modal-origin-x": `${signInFrame.originX}px`,
                        "--auth-modal-origin-y": `${signInFrame.originY}px`,
                    }}
                >
                    <button
                        aria-label="Close sign-in dialog"
                        className="nav-auth-modal-close"
                        onClick={() => setSignInFrame(null)}
                        type="button"
                    >
                        <FontAwesomeIcon icon={faXmark}/>
                    </button>
                    <SignIn routing="hash"/>
                </section>
            </div>,
            document.body
        )
        : null;

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
                {signInDialog}
            </div>
        );
    }

    return (
        <>
            <button className="nav-auth-signin-item" type="button" aria-label="Sign in" onClick={openSignIn}>
                <FontAwesomeIcon icon={faCircleUser} size="xl"/>
            </button>
            {signInDialog}
        </>
    );
}
