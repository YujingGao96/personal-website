"use client";

import {useEffect, useState} from "react";

// Share observers and page/preference listeners across all animated regions.
const groups = new Map();
let subscriptions = 0;
let motionPreference = null;
let pageVisible = true;
let reducedMotion = false;

function publish(target) {
    const active = target.inView && pageVisible && !reducedMotion;
    target.listeners.forEach((listener) => listener(active));
}

function refresh() {
    pageVisible = document.visibilityState !== "hidden";
    reducedMotion = motionPreference?.matches ?? false;
    groups.forEach((group) => group.targets.forEach(publish));
}

function subscribe(element, listener, rootMargin) {
    if (subscriptions === 0) {
        motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
        pageVisible = document.visibilityState !== "hidden";
        reducedMotion = motionPreference.matches;
        document.addEventListener("visibilitychange", refresh);
        motionPreference.addEventListener("change", refresh);
    }
    subscriptions += 1;

    let group = groups.get(rootMargin);
    if (!group) {
        group = {targets: new Map(), observer: null};
        if ("IntersectionObserver" in window) {
            group.observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    const target = group.targets.get(entry.target);
                    if (!target) return;
                    target.inView = entry.isIntersecting;
                    publish(target);
                });
            }, {rootMargin});
        }
        groups.set(rootMargin, group);
    }

    let target = group.targets.get(element);
    if (!target) {
        target = {inView: !group.observer, listeners: new Set()};
        group.targets.set(element, target);
        group.observer?.observe(element);
    }
    target.listeners.add(listener);
    publish(target);

    return () => {
        target.listeners.delete(listener);
        if (target.listeners.size === 0) {
            group.observer?.unobserve(element);
            group.targets.delete(element);
        }
        if (group.targets.size === 0) {
            group.observer?.disconnect();
            groups.delete(rootMargin);
        }
        subscriptions -= 1;
        if (subscriptions === 0) {
            document.removeEventListener("visibilitychange", refresh);
            motionPreference.removeEventListener("change", refresh);
            motionPreference = null;
        }
    };
}

export default function useMotionVisibility(ref, {rootMargin = "120px"} = {}) {
    const [active, setActive] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return undefined;
        return subscribe(element, setActive, rootMargin);
    }, [ref, rootMargin]);

    return active;
}
