"use client";

import React, {useEffect, useState} from "react";
import Particles, {initParticlesEngine} from "@tsparticles/react";

import {loadSlim} from "@tsparticles/slim";

const ParticleBG = () => {
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    return (
        init && <Particles
            id="tsparticles"
            options={{
                fpsLimit: 30,
                pauseOnBlur: true,
                pauseOnOutsideViewport: true,
                interactivity: {
                    events: {
                        resize: true,
                    },
                },
                particles: {
                    move: {
                        direction: "bottom",
                        enable: true,
                        outModes: {
                            default: "out",
                        },
                        random: false,
                        speed: 1,
                        straight: false,
                    },
                    number: {
                        density: {
                            enable: true,
                            area: 800,
                        },
                        value: 50,
                    },
                    opacity: {
                        value: .5,
                    },
                    shape: {
                        type: "circle",
                    },
                    size: {
                        value: {min: 1, max: 4},
                    },
                },
                detectRetina: true,
            }}
        />
    );
};

export default ParticleBG;
