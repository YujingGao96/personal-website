const SectionHeader = ({eyebrow, title, gradient = "gradient-text-1", className = ""}) => {
    const classes = ["section-header", className].filter(Boolean).join(" ");

    return (
        <header className={classes}>
            <div className="section-header-copy">
                {eyebrow && <p className={`section-header-eyebrow ${gradient}`}>{eyebrow}</p>}
                <h1 className={`section-header-title text-light`}>{title}</h1>
            </div>
        </header>
    );
};

export default SectionHeader;
