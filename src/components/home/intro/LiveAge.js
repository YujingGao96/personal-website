"use client";

import {useCallback, useRef, useSyncExternalStore} from "react";
import useMotionVisibility from "../../../hooks/useMotionVisibility";
import {birthday, getAge} from "../../../resolvers/profileResolver";

// React reads a cached value; only this leaf subscribes to the ticking clock.
let ageSnapshot = "0.000000000";
const getSnapshot = () => ageSnapshot;
const getServerSnapshot = () => "0.000000000";

export default function LiveAge() {
    const elementRef = useRef(null);
    const active = useMotionVisibility(elementRef, {rootMargin: "120px"});
    const subscribe = useCallback((onChange) => {
        const update = () => {
            ageSnapshot = getAge(birthday);
            onChange();
        };

        // An inactive clock still shows an accurate static age after hydration.
        update();
        if (!active) return () => {};

        const intervalId = setInterval(update, 500);
        return () => clearInterval(intervalId);
    }, [active]);
    const age = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

    return <span className="code-number" ref={elementRef}>{age}</span>;
}
