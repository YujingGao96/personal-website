"use client";

import {useState, useRef, useEffect} from "react";
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRightToBracket, faUserShield} from "@fortawesome/free-solid-svg-icons";
import {useAuth, useUser, SignOutButton, SignIn} from "@clerk/nextjs";
import {dark} from "@clerk/themes";

export default function AuthButton() {
    const {isSignedIn, isLoaded} = useAuth();
    const {user} = useUser();
    const [showSignIn, setShowSignIn] = useState(false);
    const wrapperRef = useRef(null);

    useEffect(() => {
        if (!showSignIn) return;
        const handleClickOutside = (e) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setShowSignIn(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [showSignIn]);

    if (!isLoaded) return null;

    if (isSignedIn && user) {
        const initials = (user.firstName?.[0] || "") + (user.lastName?.[0] || "") || user.emailAddresses?.[0]?.emailAddress?.[0]?.toUpperCase() || "U";
        return (
            <div className="nav-auth-wrapper">
                <button
                    className="nav-auth-avatar-btn"
                    type="button"
                    title={`Signed in as ${user.emailAddresses?.[0]?.emailAddress || "user"}`}
                >
                    {user.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={user.imageUrl}
                            alt=""
                            style={{width: 30, height: 30, borderRadius: "50%", objectFit: "cover"}}
                        />
                    ) : (
                        <span className="nav-auth-initials">
                            {initials}
                        </span>
                    )}
                </button>
                <div className="nav-auth-dropdown">
                    <Link href="/admin/blog" className="nav-auth-dropdown-item">
                        <FontAwesomeIcon icon={faUserShield} fixedWidth/>
                        Admin
                    </Link>
                    <SignOutButton>
                        <button className="nav-auth-dropdown-item" type="button">
                            <FontAwesomeIcon icon={faRightToBracket} fixedWidth style={{transform: "scaleX(-1)"}}/>
                            Sign Out
                        </button>
                    </SignOutButton>
                </div>
            </div>
        );
    }

    return (
        <div className="nav-auth-wrapper" ref={wrapperRef}>
            <button
                className="nav-link nav-auth-signin"
                type="button"
                aria-label="Sign in"
                onClick={() => setShowSignIn(s => !s)}
            >
                <FontAwesomeIcon icon={faRightToBracket} size="lg" fixedWidth/>
            </button>
            {showSignIn && (
                <>
                    <div className="nav-signin-backdrop" onClick={() => setShowSignIn(false)}/>
                    <div className="nav-signin-panel">
                        <SignIn routing="hash" appearance={{baseTheme: dark}}/>
                    </div>
                </>
            )}
        </div>
    );
}
