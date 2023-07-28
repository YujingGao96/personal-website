import React from "react";
import Particles from "react-particles-js";

const ParticleBG = () => {
    return (
        <Particles
            id="particle-bg"
            params={{
                "particles": {
                    "number": {
                        "value": 160
                    },
                    "size": {
                        "value": 3,
                        "random": true,
                        "anim": {
                            "speed": 4,
                            "size_min": 0.3
                        }
                    },
                    "line_linked": {
                        "enable": false
                    },
                    "move": {
                        "random": true,
                        "speed": 1,
                        "direction": "bottom",
                        "out_mode": "out"
                    }
                }
            }}/>

    );
};

export default ParticleBG;