'use client';
import { useEffect, useState, useSyncExternalStore } from 'react';
import {BLOG_LANGUAGE_EVENT, getBlogCopy, normalizeBlogLanguage} from "../../../lib/blog/language";
import {setClientCookie} from "../../../lib/clientPreferenceCookie";
import { CURSOR_FX_COOKIE, TOGGLE_EVENT, getDefaultEnabled } from './FluidCursor';

const LEGACY_STORAGE_KEY = 'fluid-cursor-enabled';

function subscribeMotionPreference(onChange) {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = window.matchMedia('(pointer: fine)');
    reducedMotion.addEventListener('change', onChange);
    finePointer.addEventListener('change', onChange);
    return () => {
        reducedMotion.removeEventListener('change', onChange);
        finePointer.removeEventListener('change', onChange);
    };
}

function getReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function getServerReducedMotion() {
    return false;
}

function getServerEnabled() {
    return null;
}

const CursorToggleButton = ({language}) => {
    const [selectedLanguage, setSelectedLanguage] = useState(normalizeBlogLanguage(language));
    const copy = getBlogCopy(selectedLanguage);
    const defaultEnabled = useSyncExternalStore(
        subscribeMotionPreference,
        getDefaultEnabled,
        getServerEnabled
    );
    const reducedMotion = useSyncExternalStore(
        subscribeMotionPreference,
        getReducedMotion,
        getServerReducedMotion
    );
    const [selectedEnabled, setSelectedEnabled] = useState(null);
    const preferredEnabled = selectedEnabled ?? defaultEnabled;
    const enabled = preferredEnabled === null ? null : preferredEnabled && !reducedMotion;

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
            disabled={reducedMotion}
            aria-label={copy.toggleCursorFx}
            aria-pressed={enabled}
        >
            <span className="cursor-toggle-icon" aria-hidden="true">✦</span>
            <span className="cursor-toggle-label">{enabled ? copy.cursorFxOn : copy.cursorFxOff}</span>
        </button>
    );
};

export default CursorToggleButton;
