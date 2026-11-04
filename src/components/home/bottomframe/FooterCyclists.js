import React from "react";

const CYCLISTS = ["morning", "evening", "late", "home"];

const PixelBicycle = () => (
    <svg className="footer-bicycle" viewBox="0 0 88 68" fill="none" shapeRendering="crispEdges">
        {/* A small, unfiltered beam travels with the bike instead of repainting the road. */}
        <path d="m65 31 60 25-22 8Z" fill="#fff3aa" opacity="0.055"/>
        <path d="m65 31 45 25-13 4Z" fill="#fff3aa" opacity="0.055"/>
        <path d="M99 59h23v2H99Z" fill="#fff3aa" opacity="0.12"/>
        {/* Stepped silhouettes keep the wheels in the skyline's pixel-art style. */}
        <g fill="#050b10" stroke="var(--cycle-rim)" strokeWidth="2">
            <path d="M7 45h3v-4h4v-3h12v3h4v4h3v12h-3v4h-4v3H14v-3h-4v-4H7Z"/>
            <path d="M55 45h3v-4h4v-3h12v3h4v4h3v12h-3v4h-4v3H62v-3h-4v-4h-3Z"/>
        </g>
        <g stroke="var(--cycle-rim)" strokeWidth="1" opacity="0.65">
            <g className="footer-bike-spokes footer-bike-spokes--rear">
                <path d="M10 51h20M20 41v20M13 44l14 14M13 58l14-14"/>
            </g>
            <g className="footer-bike-spokes footer-bike-spokes--front">
                <path d="M58 51h20M68 41v20M61 44l14 14M61 58l14-14"/>
            </g>
        </g>
        <path d="m20 51 13-17 11 17H20m13-17h24L44 51m13-17 11 17m-11-17-3-9h9" stroke="var(--cycle-frame)" strokeWidth="2" strokeLinejoin="bevel"/>
        <path d="M30 32h13v3H30Z" fill="var(--cycle-frame)"/>
        <path d="M63 30h5v4h-5Z" fill="#fff3aa"/>
        <path d="M43 47h3v5h-3Z" fill="var(--cycle-frame)"/>
        <g className="footer-bike-crank" stroke="var(--cycle-frame)" strokeWidth="2">
            <path d="M36 51h16m-18-2h5m10 4h5"/>
        </g>
        <g className="footer-rider">
            <g className="footer-rider-legs footer-rider-legs--first" strokeLinejoin="bevel">
                <path d="m38 32-7 10 10 8" stroke="var(--cycle-trousers)" strokeWidth="4"/>
                <path d="m39 32 11 9-5 13" stroke="var(--cycle-shirt)" strokeWidth="4"/>
                <path d="M39 50h7m-2 5h7" stroke="#fff1b0" strokeWidth="3"/>
            </g>
            <g className="footer-rider-legs footer-rider-legs--second" strokeLinejoin="bevel">
                <path d="m38 32 11 10-7 9" stroke="var(--cycle-trousers)" strokeWidth="4"/>
                <path d="m39 32-6 11 11 5" stroke="var(--cycle-shirt)" strokeWidth="4"/>
                <path d="M39 52h7m-3-4h7" stroke="#fff1b0" strokeWidth="3"/>
            </g>
            <path d="M42 20h10v7h-6v7H35v-7h7Z" fill="var(--cycle-shirt)"/>
            <path d="M49 23h7v5h7v5h-4v-3h-7v-4h-3Z" fill="#fff1b0"/>
            <path d="M47 17h5v6h-5Z" fill="#fff1b0"/>
            <path d="M47 8h10v4h3v5h-4v3h-9Z" fill="#fff1b0"/>
            <path d="M45 7h12v3h3v3H45Z" fill="var(--cycle-rim)"/>
            <path d="M55 13h2v2h-2Z" fill="#050b10"/>
        </g>
    </svg>
);

const FooterCyclists = () => (
    <div className="footer-cyclists" aria-hidden="true">
        <span className="footer-shooting-star"/>
        {CYCLISTS.map((cyclist) => (
            <div className={`footer-cycle-trip footer-cycle-trip--${cyclist}`} key={cyclist}>
                <div className="footer-cycle-facing">
                    <PixelBicycle/>
                </div>
            </div>
        ))}
    </div>
);

export default FooterCyclists;
