"use client";

import {useLayoutEffect, useRef} from "react";
import {ATTR_BAR, shimmer as animateSkeleton} from "skullet/internal";
import {SkeletonBox} from "skullet/react";
import useMotionVisibility from "../../hooks/useMotionVisibility";

export function LoadingBox({className = "", ...props}) {
    return <SkeletonBox {...props} className={`loading-box ${className}`.trim()}/>;
}

export function LoadingRegion({children, className = "", label = "Loading… / 加载中…", style, decorative = false, animate = true}) {
    const ref = useRef(null);
    const active = useMotionVisibility(ref);

    useLayoutEffect(() => {
        const bars = Array.from(ref.current?.querySelectorAll(`[${ATTR_BAR}]`) || []);
        const cancel = () => bars.forEach((bar) => bar.getAnimations?.().forEach((animation) => animation.cancel()));

        // Skullet uses WAAPI; CSS animation-play-state alone cannot suspend it.
        cancel();
        if (active && animate) {
            bars.forEach((bar) => {
                if (bar.getClientRects().length) animateSkeleton(bar);
            });
        }
        return cancel;
    }, [active, animate, children]);

    return (
        <div
            ref={ref}
            className={`loading-region ${className}`.trim()}
            style={style}
            role={decorative ? undefined : "status"}
            aria-busy={decorative ? undefined : true}
            aria-live={decorative ? undefined : "polite"}
            aria-hidden={decorative || undefined}
            data-site-skeleton=""
        >
            {!decorative && <span className="visually-hidden">{label}</span>}
            <div className="loading-region-content" aria-hidden="true" inert>{children}</div>
        </div>
    );
}

export function AvatarSkeleton({size = 72}) {
    return (
        <LoadingRegion decorative animate={false} className="loading-avatar" style={{width: size, height: size}}>
            <LoadingBox width={size} height={size} radius="50%"/>
        </LoadingRegion>
    );
}

export function NavAuthSkeleton({label = "Loading account… / 正在加载账户…"}) {
    return (
        <LoadingRegion label={label} animate={false} className="loading-nav-auth">
            <LoadingBox width={30} height={30} radius="50%"/>
        </LoadingRegion>
    );
}
