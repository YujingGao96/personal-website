"use client";

import {useEffect, useState} from "react";
import {BLOG_LANGUAGE_EVENT, DEFAULT_BLOG_LANGUAGE, normalizeBlogLanguage} from "../../../lib/blog/language";
import {getHomeCopy} from "../../../lib/home/content";

function renderFooterMade(text) {
    return text.split("❤").map((part, index, parts) => (
        <span key={`${part}-${index}`}>
            {part}
            {index < parts.length - 1 && <span className="footer-heart">❤</span>}
        </span>
    ));
}

export default function FooterText({initialLanguage = DEFAULT_BLOG_LANGUAGE, currentYear}) {
    const [selectedLanguage, setSelectedLanguage] = useState("");
    const language = normalizeBlogLanguage(selectedLanguage || initialLanguage);
    const copy = getHomeCopy(language);

    useEffect(() => {
        const handleLanguageChange = (event) => {
            setSelectedLanguage(normalizeBlogLanguage(event.detail?.language));
        };

        window.addEventListener(BLOG_LANGUAGE_EVENT, handleLanguageChange);
        return () => window.removeEventListener(BLOG_LANGUAGE_EVENT, handleLanguageChange);
    }, []);

    return (
        <>
            <p className="text-center text-secondary mb-2 ">{copy.footerCopyright(currentYear)}</p>
            <p className="text-center text-secondary mb-2">{renderFooterMade(copy.footerMade)}</p>
        </>
    );
}
