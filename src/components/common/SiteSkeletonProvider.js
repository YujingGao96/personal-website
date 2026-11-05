"use client";

import {SkulletProvider} from "skullet/react";

const theme = {
    dark: {base: "rgb(255 255 255 / 0.08)", highlight: "rgb(255 255 255 / 0.14)"},
    animation: "pulse",
    speed: "slow",
    radius: "6px",
};

export default function SiteSkeletonProvider({children}) {
    return <SkulletProvider mode="dark" theme={theme} reveal="together">{children}</SkulletProvider>;
}
