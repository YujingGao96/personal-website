import GeneratedSigil, {getSigilColor} from "../../common/GeneratedSigil";
import {hashText} from "../../../util/GenArtUtil";
import "./Compliments.css";

const COMPLIMENTS = [
    {
        name: "Lee Holmes",
        title: "Vice President",
        company: "Global Payments",
        quote: "Thank you for guiding and mentoring our interns. With your coaching, they have accomplished great things. I am genuinely grateful for all your wisdom and advice that you have shared with all our team members, including our interns.",
    },
    {
        name: "Larry Cline",
        title: "Manager",
        company: "Midland Farmers Market",
        quote: "I am beyond grateful for your dedication to this project to make it right. I would be happy to help if you ever need a letter of recommendation, as I'm sure any employer would be pleased to know what kind of a person he's considering.",
    },
    {
        name: "Rebecca Hagues",
        title: "ESOL Teacher",
        company: "Shaw High School",
        quote: "Yujing, I am so incredibly proud of you! Your hard work and determination to succeed inspire everyone around you! I am genuinely excited and eager to see the amazing things you will accomplish in the future. Keep being awesome!",
    },
    {
        name: "Rania Hodhod",
        title: "Assistant CS Professor",
        company: "Columbus State University",
        quote: "I want to express my heartfelt gratitude to you for generously offering your time and expertise to support our student, as it will undoubtedly have a significant impact on the professional development of our CS and IT students.",
    },
    {
        name: "Shamim Khan",
        title: "Professor & Chair of CS Department",
        company: "Columbus State University",
        quote: "Your work demonstrates a wonderful example of interdisciplinary work that we always aspire for. This speaks volumes about the calibre of our faculty and students. We won't miss an opportunity to brag about this achievement.",
    },
];

const TWO_ROW_THRESHOLD = 6;

function getSigilHue(name) {
    return hashText(name) % 360;
}

function ComplimentCard({name, title, company, quote}) {
    const hue = getSigilHue(name);
    const c = `oklch(0.65 0.16 ${hue})`;

    return (
        <div
            className="compliment-card"
            style={{"--c": c}}
        >
            {/* Top band */}
            <div
                className="compliment-card-header"
                style={{background: `linear-gradient(135deg, rgba(14,14,24,0) 0%, oklch(0.65 0.16 ${hue} / 0.04) 100%)`}}
            >
                {/* Subtle diagonal texture lines */}
                <svg
                    style={{position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.06}}
                    viewBox="0 0 340 100"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                >
                    {Array.from({length: 8}, (_, i) => (
                        <line key={i} x1={i * 50} y1="0" x2={i * 50 - 30} y2="100" stroke="white" strokeWidth="0.8"/>
                    ))}
                </svg>

                <GeneratedSigil name={name} size={72}/>

                <div style={{flex: 1, minWidth: 0}}>
                    <div className="compliment-author-name">{name}</div>
                    <div className="compliment-author-title" style={{color: c}}>{title}</div>
                    <div className="compliment-author-company">{company}</div>
                </div>
            </div>

            {/* Quote body */}
            <div className="compliment-quote-body">
                <div
                    className="compliment-quote-mark"
                    style={{color: c}}
                >
                    &ldquo;
                </div>
                <p className="compliment-quote-text">{quote}</p>
                <div
                    className="compliment-quote-accent"
                    style={{background: `linear-gradient(to right, oklch(0.65 0.16 ${hue} / 0.25), transparent)`}}
                />
            </div>
        </div>
    );
}

const Compliments = () => {
    const twoRows = COMPLIMENTS.length >= TWO_ROW_THRESHOLD;
    const row1 = twoRows ? COMPLIMENTS.slice(0, Math.ceil(COMPLIMENTS.length / 2)) : COMPLIMENTS;
    const row2 = twoRows ? COMPLIMENTS.slice(Math.ceil(COMPLIMENTS.length / 2)) : [];

    return (
        <div id="compliments">
            {/* Section header */}
            <div className="compliments-header">
                <div className="compliments-eyebrow">KIND WORDS</div>
                <div className="compliments-title-row">
                    <h1 className="compliments-title">Compliments</h1>
                    <p className="compliments-subtitle">
                        Praise and recommendations collected from colleagues, managers, and collaborators over the years.
                    </p>
                </div>
            </div>

            {/* Marquee */}
            <div className="compliments-marquee-outer">
                <div className="marquee-row">
                    <div className="track track-left">
                        {[...row1, ...row1].map((c, i) => (
                            <ComplimentCard key={`r1-${i}`} {...c}/>
                        ))}
                    </div>
                </div>
                {twoRows && (
                    <div className="marquee-row">
                        <div className="track track-right">
                            {[...row2, ...row2].map((c, i) => (
                                <ComplimentCard key={`r2-${i}`} {...c}/>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Compliments;
