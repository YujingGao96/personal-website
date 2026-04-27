const SNOW_PARTICLES = Array.from({length: 72}, (_, index) => {
    const seed = index + 1;
    const size = 1.2 + (seed % 5) * 0.45;
    const left = (seed * 37) % 100;
    const delay = -((seed * 1.9) % 54).toFixed(2);
    const duration = 44 + (seed % 9) * 4;
    const wind = ((seed % 7) - 3) * 2.2;
    const opacity = 0.28 + (seed % 6) * 0.08;

    return {size, left, delay, duration, wind, opacity};
});

const ParticleBG = () => {
    return (
        <div className="particle-bg" aria-hidden="true">
            <div className="particle-ambient particle-ambient-a" />
            <div className="particle-ambient particle-ambient-b" />
            <div className="particle-ambient particle-ambient-c" />
            <div className="snow-field">
                {SNOW_PARTICLES.map((particle, index) => (
                    <span
                        key={index}
                        className="snow-particle"
                        style={{
                            "--snow-size": `${particle.size}px`,
                            "--snow-left": `${particle.left}%`,
                            "--snow-delay": `${particle.delay}s`,
                            "--snow-duration": `${particle.duration}s`,
                            "--snow-wind": `${particle.wind}px`,
                            "--snow-opacity": particle.opacity,
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default ParticleBG;
