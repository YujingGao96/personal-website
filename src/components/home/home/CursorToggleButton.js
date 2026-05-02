'use client';
import { useEffect, useState, useSyncExternalStore } from 'react';
import {BLOG_LANGUAGE_EVENT, getBlogCopy, normalizeBlogLanguage} from "../../../lib/blog/language";
import {getClientCookie, setClientCookie} from "../../../lib/clientPreferenceCookie";
import { CURSOR_FX_COOKIE, TOGGLE_EVENT } from './FluidCursor';

const LEGACY_STORAGE_KEY = 'fluid-cursor-enabled';

function getStoredEnabled() {
    const cookieValue = getClientCookie(CURSOR_FX_COOKIE);

    if (cookieValue) {
        return cookieValue === 'true';
    }

    try {
        const stored = localStorage.getItem(LEGACY_STORAGE_KEY);
        return stored === null ? null : stored === 'true';
    } catch {
        return null;
    }
}

function getDefaultEnabled() {
    const stored = getStoredEnabled();
    if (stored !== null) return stored;
    return (
        window.matchMedia('(pointer: fine)').matches &&
        !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
}

function subscribeDefaultEnabled() {
    return () => {};
}

function getServerEnabled() {
    return null;
}

const CursorToggleButton = ({language}) => {
    const [selectedLanguage, setSelectedLanguage] = useState(normalizeBlogLanguage(language));
    const copy = getBlogCopy(selectedLanguage);
    const defaultEnabled = useSyncExternalStore(
        subscribeDefaultEnabled,
        getDefaultEnabled,
        getServerEnabled
    );
    const [selectedEnabled, setSelectedEnabled] = useState(null);
    const enabled = selectedEnabled ?? defaultEnabled;

    useEffect(() => {
        const handleLanguageChange = (event) => {
            setSelectedLanguage(normalizeBlogLanguage(event.detail?.language));
        };

        window.addEventListener(BLOG_LANGUAGE_EVENT, handleLanguageChange);
        return () => window.removeEventListener(BLOG_LANGUAGE_EVENT, handleLanguageChange);
    }, []);

    if (enabled === null) return null;

    function toggle() {
        const next = !enabled;
        setSelectedEnabled(next);
        setClientCookie(CURSOR_FX_COOKIE, String(next));
        try {
            localStorage.setItem(LEGACY_STORAGE_KEY, String(next));
        } catch {
            // The cookie is the durable preference; localStorage is only a legacy mirror.
        }
        window.dispatchEvent(new CustomEvent(TOGGLE_EVENT, { detail: { enabled: next } }));
    }

    return (
        <button
            type="button"
            className={`cursor-toggle-button ${enabled ? 'enabled' : 'disabled'}`}
            onClick={toggle}
            aria-label={copy.toggleCursorFx}
            aria-pressed={enabled}
        >
            <span className="cursor-toggle-icon" aria-hidden="true">✦</span>
            <span className="cursor-toggle-label">{enabled ? copy.cursorFxOn : copy.cursorFxOff}</span>
        </button>
    );
};

export default CursorToggleButton;
