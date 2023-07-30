import React, {useCallback} from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const ParticleBG = () => {
    const particlesInit = useCallback(async engine => {
        await loadFull(engine);
    }, []);


    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            options={{
                fpsLimit: 120,
                interactivity: {
                    events: {
                        onClick: {
                            enable: true,
                            mode: "push",
                        },
                        resize: true,
                    }
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
                            area: 350,
                        },
                        value: 80,
                    },
                    opacity: {
                        value: 0.5,
                    },
                    shape: {
                        type: "circle",
                    },
                    size: {
                        value: { min: 0.3, max: 3 },
                    },
                },
                detectRetina: true,
            }}
        />

    );
};

export default ParticleBG;