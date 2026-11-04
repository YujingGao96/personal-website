"use client";

import {useRef, useSyncExternalStore} from "react";
import useMotionVisibility from "../../hooks/useMotionVisibility";

const subscribeHydration = () => () => {};
const getClientReady = () => true;
const getServerReady = () => false;

export default function MotionBoundary({as: Element = "div", className = "", children, ...props}) {
    const ref = useRef(null);
    const active = useMotionVisibility(ref);
    const hydrated = useSyncExternalStore(subscribeHydration, getClientReady, getServerReady);

    return (
        // Preserve the server's visible entry paint; pause offscreen work after hydration.
        <Element {...props} ref={ref} className={`motion-boundary ${className}`.trim()} data-motion={!hydrated || active ? "running" : "paused"}>
            {children}
        </Element>
    );
}
