'use client';
import { useState, useSyncExternalStore } from 'react';
import { TOGGLE_EVENT } from './FluidCursor';

const STORAGE_KEY = 'fluid-cursor-enabled';

function getDefaultEnabled() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored !== null) return stored === 'true';
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

const CursorToggleButton = () => {
    const defaultEnabled = useSyncExternalStore(
        subscribeDefaultEnabled,
        getDefaultEnabled,
        getServerEnabled
    );
    const [selectedEnabled, setSelectedEnabled] = useState(null);
    const enabled = selectedEnabled ?? defaultEnabled;

    if (enabled === null) return null;

    function toggle() {
        const next = !enabled;
        setSelectedEnabled(next);
        localStorage.setItem(STORAGE_KEY, String(next));
        window.dispatchEvent(new CustomEvent(TOGGLE_EVENT, { detail: { enabled: next } }));
    }

    return (
        <button
            onClick={toggle}
            aria-label="Toggle cursor fluid effect"
            style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '2em',
                color: enabled ? '#86d5ff' : 'rgba(255,255,255,0.4)',
                cursor: 'pointer',
                fontSize: '0.75rem',
                letterSpacing: '0.05em',
                padding: '0.35em 1em',
                transition: 'color 0.2s, border-color 0.2s',
            }}
        >
            {enabled ? '✦ Cursor Effects: ON' : '✦ Cursor Effects: OFF'}
        </button>
    );
};

export default CursorToggleButton;
