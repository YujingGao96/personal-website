import Image from "next/image";
import Link from "next/link";
import {company, email, linkedin} from "../../../resolvers/profileResolver";
import {DEFAULT_BLOG_LANGUAGE, withBlogLanguage} from "../../../lib/blog/language";
import {getHomeCopy} from "../../../lib/home/content";
import ProfileSource from "./ProfileSource";
import SignalStage from "./SignalStage";
import SignalArrow from "./SignalArrow";

const INTRO_COPY = {
    en: {
        description: "I build software, explore systems, and write about what I learn along the way.",
        projects: "Explore my work",
        writing: "Read the blog",
        stage: "Signal explorer",
        source: "View source",
        email: "Email",
        tabs: [
            {label: "Spectrum", caption: "Aperture study", detail: "Split light on fine-grain film."},
            {label: "Systems", caption: "Systems in motion", detail: "Software and side projects.", linkLabel: "View projects"},
            {label: "Writing", caption: "Notes in the margins", detail: "Ideas from work and beyond.", linkLabel: "Read the posts"},
        ],
    },
    zh: {
        description: "写软件，研究系统，也把一路学到的东西写下来。",
        projects: "浏览我的项目",
        writing: "阅读博客",
        stage: "信号台",
        source: "查看源码",
        email: "邮箱",
        tabs: [
            {label: "光谱", caption: "光圈习作", detail: "细颗粒胶片上的分色光。"},
            {label: "系统", caption: "流动的系统", detail: "软件和个人项目。", linkLabel: "浏览项目"},
            {label: "随笔", caption: "页边随笔", detail: "工作内外值得记下的思考。", linkLabel: "阅读文章"},
        ],
    },
};

export default function Intro({language = DEFAULT_BLOG_LANGUAGE}) {
    const profile = getHomeCopy(language);
    const copy = INTRO_COPY[language] || INTRO_COPY.en;

    return (
        <section id="about" className="signal-hero" aria-labelledby="signal-title">
            <div className="signal-hero-grid">
                <div className="signal-intro">
                    <div className="signal-identity">
                        <Image src="/profile.jpg" alt="" width={80} height={80} sizes="44px" className="signal-portrait"/>
                        <div>
                            <p>{profile.profileJobTitle}</p>
                            <a href="https://www.fisglobal.com/">{company}</a>
                        </div>
                    </div>
                    <h1 id="signal-title" className="signal-title">{profile.profileName}</h1>
                    <p className="signal-description">{copy.description}</p>
                    <div className="signal-actions">
                        <a href="#projects" className="signal-primary">
                            {copy.projects}<SignalArrow down/>
                        </a>
                        <Link href={withBlogLanguage("/blog", language)} className="signal-secondary">
                            {copy.writing}<SignalArrow/>
                        </Link>
                    </div>
                    <address className="signal-contact">
                        <a href={`mailto:${email}`}>{copy.email}</a>
                        <a href={`https://${linkedin}`} target="_blank" rel="noreferrer">LinkedIn <SignalArrow/></a>
                    </address>
                </div>

                <SignalStage label={copy.stage} tabs={copy.tabs}/>
            </div>

            <details className="signal-source">
                <summary>
                    <span className="signal-source-icon" aria-hidden="true">{"</>"}</span>
                    <span className="signal-source-file">ProfileBuilder.java</span>
                    <span className="signal-source-label">{copy.source}</span>
                    <span className="signal-source-plus" aria-hidden="true"/>
                </summary>
                <ProfileSource language={language}/>
            </details>
        </section>
    );
}
