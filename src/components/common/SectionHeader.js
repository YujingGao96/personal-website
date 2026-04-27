const SECTION_NUMBERS = {
    about:       "01",
    blogs:       "02",
    timeline:    "03",
    projects:    "04",
    compliments: "05",
};

const SectionHeader = ({
    eyebrow,
    title,
    sectionId = "",
    className = "",
    gradient, // accepted but ignored — accent now via CSS vars
}) => {
    const classes = ["section-header", className].filter(Boolean).join(" ");
    const num = SECTION_NUMBERS[sectionId] ?? undefined;

    return (
        <header className={classes} {...(num ? { "data-num": num } : {})}>
            <div className="section-header-copy">
                {eyebrow && (
                    <p className="section-header-eyebrow">{eyebrow}</p>
                )}
                <h1 className="section-header-title">{title}</h1>
            </div>
        </header>
    );
};

export default SectionHeader;
