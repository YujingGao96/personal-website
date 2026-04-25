"use client";

import {useEffect} from "react";

export default function ViewTracker({slug}) {
    useEffect(() => {
        if (!slug) {
            return;
        }

        const key = `blog-view:${slug}`;
        const lastViewedAt = Number(window.localStorage.getItem(key) || 0);
        const oneDay = 24 * 60 * 60 * 1000;

        if (Date.now() - lastViewedAt < oneDay) {
            return;
        }

        window.localStorage.setItem(key, String(Date.now()));
        const body = JSON.stringify({slug});

        if (navigator.sendBeacon) {
            navigator.sendBeacon("/api/blog/view", new Blob([body], {type: "application/json"}));
            return;
        }

        fetch("/api/blog/view", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body,
            keepalive: true,
        }).catch(() => undefined);
    }, [slug]);

    return null;
}
