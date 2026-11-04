'use client';
import { useEffect } from 'react';
import {getClientCookie} from "../../../lib/clientPreferenceCookie";

export const CURSOR_FX_COOKIE = 'fluid-cursor-enabled';
const LEGACY_STORAGE_KEY = 'fluid-cursor-enabled';
export const TOGGLE_EVENT = 'fluid-cursor-toggle';

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

function getInitialPreference() {
    // Touch devices can opt in with the button, without starting WebGL on page load.
    return getStoredEnabled() === true && window.matchMedia('(pointer: fine)').matches;
}

export function getDefaultEnabled() {
    return getInitialPreference() && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

const FluidCursor = () => {
    useEffect(() => {
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        const finePointer = window.matchMedia('(pointer: fine)');
        const state = {
            mounted: true,
            enabled: getInitialPreference(),
            hasManualPreference: false,
            pageHidden: false,
            generation: 0,
            destroy: null,
            starting: null,
            startRequested: false,
            cancelQueuedStart: null,
        };

        function canStart() {
            return state.mounted && state.enabled && !state.pageHidden &&
                document.visibilityState !== 'hidden' && !reducedMotion.matches;
        }

        async function start() {
            if (!canStart() || state.destroy) return;
            if (state.starting) {
                state.startRequested = true;
                return;
            }
            const generation = state.generation;
            state.startRequested = false;
            state.starting = import('./hook/use-FluidCursor');
            try {
                const { default: fluidCursor } = await state.starting;
                // OFF, navigation, visibility and motion changes can happen during import.
                if (!canStart() || generation !== state.generation) return;
                const result = fluidCursor();
                if (!canStart() || generation !== state.generation) {
                    result?.destroy?.();
                    return;
                }
                state.destroy = result?.destroy ?? null;
            } catch (error) {
                console.warn('Unable to start the fluid cursor.', error);
            } finally {
                state.starting = null;
                if (state.startRequested && canStart()) start();
            }
        }

        function clearQueuedStart() {
            state.cancelQueuedStart?.();
            state.cancelQueuedStart = null;
        }

        function queueStart({allowIdle = false} = {}) {
            if (!canStart() || state.cancelQueuedStart || state.destroy) return;
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
            if (allowIdle) {
                if ('requestIdleCallback' in window) {
                    idleId = window.requestIdleCallback(run, {timeout: 1800});
                } else {
                    timeoutId = window.setTimeout(run, 900);
                }
            }
            state.cancelQueuedStart = () => {
                events.forEach((eventName) => window.removeEventListener(eventName, run));
                if (idleId !== null) window.cancelIdleCallback(idleId);
                if (timeoutId !== null) window.clearTimeout(timeoutId);
            };
        }

        function cancelStart() {
            clearQueuedStart();
            state.generation += 1;
            state.startRequested = false;
        }

        function stop() {
            cancelStart();
            state.destroy?.();
            state.destroy = null;
        }

        function handleToggle(event) {
            state.hasManualPreference = true;
            state.enabled = event.detail?.enabled === true;
            if (state.enabled) {
                clearQueuedStart();
                start();
            } else {
                stop();
            }
        }

        function handleMotionChange() {
            if (reducedMotion.matches) stop();
            else queueStart();
        }

        function handlePointerChange() {
            if (state.hasManualPreference) return;
            state.enabled = getInitialPreference();
            if (state.enabled) queueStart();
            else stop();
        }

        function handleVisibilityChange() {
            if (document.visibilityState === 'hidden') cancelStart();
            else queueStart();
        }

        function handlePageHide() {
            state.pageHidden = true;
            cancelStart();
        }

        function handlePageShow() {
            state.pageHidden = false;
            queueStart();
        }

        queueStart({allowIdle: true});
        window.addEventListener(TOGGLE_EVENT, handleToggle);
        window.addEventListener('pagehide', handlePageHide, {passive: true});
        window.addEventListener('pageshow', handlePageShow, {passive: true});
        document.addEventListener('visibilitychange', handleVisibilityChange);
        reducedMotion.addEventListener('change', handleMotionChange);
        finePointer.addEventListener('change', handlePointerChange);
        return () => {
            state.mounted = false;
            window.removeEventListener(TOGGLE_EVENT, handleToggle);
            window.removeEventListener('pagehide', handlePageHide);
            window.removeEventListener('pageshow', handlePageShow);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            reducedMotion.removeEventListener('change', handleMotionChange);
            finePointer.removeEventListener('change', handlePointerChange);
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
