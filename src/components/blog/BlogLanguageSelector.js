"use client";

import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {BLOG_LANGUAGE_COOKIE, BLOG_LANGUAGE_COOKIE_MAX_AGE, BLOG_LANGUAGE_EVENT, BLOG_LANGUAGE_PARAM, BLOG_LANGUAGES, getBlogCopy, normalizeBlogLanguage} from "../../lib/blog/language";
import {setClientCookie} from "../../lib/clientPreferenceCookie";

export default function BlogLanguageSelector({
    initialLanguage,
    className = "",
    compact = false,
}) {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const language = normalizeBlogLanguage(searchParams.get(BLOG_LANGUAGE_PARAM) || initialLanguage);
    const copy = getBlogCopy(language);
    const classes = [
        "blog-language-selector",
        compact ? "compact" : "",
        className,
    ].filter(Boolean).join(" ");

    function selectLanguage(nextLanguage) {
        const normalized = normalizeBlogLanguage(nextLanguage);
        const params = new URLSearchParams(searchParams.toString());

        params.set(BLOG_LANGUAGE_PARAM, normalized);
        setClientCookie(BLOG_LANGUAGE_COOKIE, normalized, BLOG_LANGUAGE_COOKIE_MAX_AGE);
        window.dispatchEvent(new CustomEvent(BLOG_LANGUAGE_EVENT, {detail: {language: normalized}}));
        router.replace(`${pathname}?${params.toString()}${window.location.hash}`, {scroll: false});
        router.refresh();
    }

    return (
        <div className={classes} aria-label={copy.blogLanguage}>
            <span className="blog-language-selector-label">{copy.blogLanguage}</span>
            <span className="blog-language-options" role="group" aria-label={copy.blogLanguage}>
                {BLOG_LANGUAGES.map((option) => {
                    const active = option.code === language;

                    return (
                        <button
                            key={option.code}
                            type="button"
                            className={`blog-language-option${active ? " active" : ""}`}
                            aria-pressed={active}
                            onClick={() => selectLanguage(option.code)}
                        >
                            <span className="blog-language-short">{option.shortLabel}</span>
                            <span className="blog-language-name">{option.label}</span>
                        </button>
                    );
                })}
            </span>
        </div>
    );
}
