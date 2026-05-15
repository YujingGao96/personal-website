"use client";

import Link from "next/link";
import {useEffect, useRef, useState} from "react";
import {createPortal} from "react-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleUser, faRightToBracket, faUserShield, faXmark} from "@fortawesome/free-solid-svg-icons";
import {useAuth, useUser, SignOutButton, SignIn, SignUp} from "@clerk/nextjs";
import {DEFAULT_BLOG_LANGUAGE} from "../../../lib/blog/language";
import {getHomeCopy} from "../../../lib/home/content";

const PHONE_AUTH_BREAKPOINT = 640;

export default function AuthButton({language = DEFAULT_BLOG_LANGUAGE}) {
    const {isSignedIn, isLoaded, sessionId} = useAuth();
    const {user} = useUser();
    const wrapperRef = useRef(null);
    const authPanelRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [adminSessionId, setAdminSessionId] = useState(null);
    const [authFrame, setAuthFrame] = useState(null);
    const copy = getHomeCopy(language);
    const isAdmin = Boolean(isSignedIn && sessionId && adminSessionId === sessionId);
    const authMode = authFrame?.mode;

    useEffect(() => {
        if (!isLoaded || !isSignedIn || !sessionId) {
            return;
        }

        const controller = new AbortController();

        fetch("/api/admin/me", {
            cache: "no-store",
            headers: {Accept: "application/json"},
            signal: controller.signal,
        })
            .then((response) => response.ok ? response.json() : {isAdmin: false})
            .then((data) => {
                if (!controller.signal.aborted) {
                    setAdminSessionId(data?.isAdmin ? sessionId : null);
                }
            })
            .catch((error) => {
                if (error.name !== "AbortError") {
                    setAdminSessionId(null);
                }
            });

        return () => controller.abort();
    }, [isLoaded, isSignedIn, sessionId]);

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
        if (!authFrame) return;

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                setAuthFrame(null);
            }
        };

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [authFrame]);

    const openAuth = (event, mode = "sign-in") => {
        const rect = event.currentTarget.getBoundingClientRect();
        const compact = window.innerWidth <= PHONE_AUTH_BREAKPOINT;
        const panelWidth = Math.min(450, window.innerWidth - 32);
        const anchorY = event.clientY || rect.top + rect.height / 2;
        const preferredLeft = compact
            ? window.innerWidth / 2
            : rect.right - panelWidth;
        const left = compact
            ? preferredLeft
            : Math.min(Math.max(preferredLeft, 16), window.innerWidth - panelWidth - 16);
        const top = Math.max(Math.min(rect.bottom + 12, window.innerHeight - 96), 16);

        setAuthFrame({
            compact,
            left,
            mode,
            originX: compact ? panelWidth / 2 : rect.right - left,
            originY: compact ? window.innerHeight / 2 : Math.max(anchorY - top, 0),
            top: compact ? window.innerHeight / 2 : top,
        });
    };

    useEffect(() => {
        if (!authMode || !authPanelRef.current) return;

        const panel = authPanelRef.current;
        const handleAuthSwitch = (event) => {
            const target = event.target?.closest?.("a");
            if (!target) return;

            const href = target.getAttribute("href") || "";
            const text = (target.textContent || "").trim().toLowerCase();
            const wantsSignUp = authMode === "sign-in"
                && (href.includes("sign-up") || href === "#sign-up" || text.includes("sign up") || text.includes("注册"));
            const wantsSignIn = authMode === "sign-up"
                && (href.includes("sign-in") || href === "#sign-in" || text.includes("sign in") || text.includes("登录"));

            if (!wantsSignUp && !wantsSignIn) return;

            event.preventDefault();
            event.stopImmediatePropagation();
            setAuthFrame((current) => current ? {...current, mode: wantsSignUp ? "sign-up" : "sign-in"} : current);
        };

        panel.addEventListener("click", handleAuthSwitch, true);
        return () => panel.removeEventListener("click", handleAuthSwitch, true);
    }, [authMode]);

    const authDialog = authFrame && typeof document !== "undefined"
        ? createPortal(
            <div className="nav-auth-modal-layer">
                <div className="nav-auth-modal-backdrop" onClick={() => setAuthFrame(null)} />
                <section
                    aria-label={authFrame.mode === "sign-up" ? copy.authSignUp : copy.authSignIn}
                    aria-modal="true"
                    className={`nav-auth-modal-panel ${authFrame.compact ? "is-centered" : ""}`}
                    ref={authPanelRef}
                    role="dialog"
                    style={{
                        "--auth-modal-left": `${authFrame.left}px`,
                        "--auth-modal-top": `${authFrame.top}px`,
                        "--auth-modal-origin-x": `${authFrame.originX}px`,
                        "--auth-modal-origin-y": `${authFrame.originY}px`,
                    }}
                >
                    <button
                        aria-label={copy.authCloseAuth}
                        className="nav-auth-modal-close"
                        onClick={() => setAuthFrame(null)}
                        type="button"
                    >
                        <FontAwesomeIcon icon={faXmark}/>
                    </button>
                    {authFrame.mode === "sign-up" ? (
                        <SignUp key="sign-up" routing="hash" signInUrl="#sign-in"/>
                    ) : (
                        <SignIn key="sign-in" routing="hash" signUpUrl="#sign-up"/>
                    )}
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
                    title={copy.authSignedInAs(user.emailAddresses?.[0]?.emailAddress)}
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
                    <span className="nav-auth-label">{copy.authAccount}</span>
                </button>
                <div className="nav-auth-dropdown" role="menu">
                    {isAdmin && (
                        <Link href="/admin/blog" className="nav-auth-dropdown-item" onClick={() => setIsOpen(false)} role="menuitem">
                            <FontAwesomeIcon icon={faUserShield} fixedWidth/>
                            {copy.authAdmin}
                        </Link>
                    )}
                    <SignOutButton>
                        <button className="nav-auth-dropdown-item" type="button" role="menuitem">
                            <FontAwesomeIcon icon={faRightToBracket} fixedWidth style={{transform: "scaleX(-1)"}}/>
                            {copy.authSignOut}
                        </button>
                    </SignOutButton>
                </div>
                {authDialog}
            </div>
        );
    }

    return (
        <>
            <button className="nav-auth-signin-item" type="button" aria-label={copy.authSignIn} onClick={(event) => openAuth(event)}>
                <FontAwesomeIcon icon={faCircleUser} size="xl"/>
                <span className="nav-auth-signin-label">{copy.authSignIn}</span>
            </button>
            {authDialog}
        </>
    );
}
