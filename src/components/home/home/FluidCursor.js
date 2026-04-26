'use client';
import { useEffect, useRef } from 'react';

const STORAGE_KEY = 'fluid-cursor-enabled';
export const TOGGLE_EVENT = 'fluid-cursor-toggle';

function getDefaultEnabled() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored !== null) return stored === 'true';
    return (
        window.matchMedia('(pointer: fine)').matches &&
        !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
}

const FluidCursor = () => {
    const stateRef = useRef({ destroy: null, starting: null, mounted: true });

    useEffect(() => {
        const state = stateRef.current;
        state.mounted = true;

        async function start() {
            if (state.destroy || state.starting) return;
            state.starting = (async () => {
                try {
                    const { default: fluidCursor } = await import('./hook/use-FluidCursor');
                    const result = fluidCursor();
                    if (!state.mounted) {
                        result?.destroy?.();
                        return;
                    }
                    state.destroy = result?.destroy ?? null;
                } finally {
                    state.starting = null;
                }
            })();
        }

        function stop() {
            if (state.destroy) {
                state.destroy();
                state.destroy = null;
            }
        }

        if (getDefaultEnabled()) start();

        function handleToggle(e) {
            if (e.detail?.enabled) start();
            else stop();
        }

        window.addEventListener(TOGGLE_EVENT, handleToggle);
        return () => {
            state.mounted = false;
            window.removeEventListener(TOGGLE_EVENT, handleToggle);
            stop();
        };
    }, []);

    return (
        <div className="fixed top-0 left-0 z-2">
            <canvas id="fluid" className="w-screen h-screen" />
        </div>
    );
};

export default FluidCursor;
