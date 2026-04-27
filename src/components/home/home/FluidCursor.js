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
    const stateRef = useRef({ destroy: null, starting: null, mounted: true, cancelQueuedStart: null });

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

        function clearQueuedStart() {
            if (state.cancelQueuedStart) {
                state.cancelQueuedStart();
                state.cancelQueuedStart = null;
            }
        }

        function queueStart() {
            if (state.cancelQueuedStart || state.destroy || state.starting) return;

            const events = ['pointermove', 'pointerdown'];
            const run = () => {
                clearQueuedStart();
                start();
            };

            events.forEach((eventName) => {
                window.addEventListener(eventName, run, {once: true, passive: true});
            });

            let idleId = null;
            let timeoutId = null;
            if ('requestIdleCallback' in window) {
                idleId = window.requestIdleCallback(run, {timeout: 1800});
            } else {
                timeoutId = window.setTimeout(run, 900);
            }

            state.cancelQueuedStart = () => {
                events.forEach((eventName) => {
                    window.removeEventListener(eventName, run);
                });
                if (idleId !== null) window.cancelIdleCallback(idleId);
                if (timeoutId !== null) window.clearTimeout(timeoutId);
            };
        }

        function stop() {
            clearQueuedStart();
            if (state.destroy) {
                state.destroy();
                state.destroy = null;
            }
        }

        if (getDefaultEnabled()) queueStart();

        function handleToggle(e) {
            if (e.detail?.enabled) start();
            else stop();
        }

        window.addEventListener(TOGGLE_EVENT, handleToggle);
        return () => {
            state.mounted = false;
            window.removeEventListener(TOGGLE_EVENT, handleToggle);
            clearQueuedStart();
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
