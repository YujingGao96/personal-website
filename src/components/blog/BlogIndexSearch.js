"use client";

import Link from "next/link";
import {useEffect, useMemo, useRef, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {DEFAULT_BLOG_LANGUAGE, getBlogCopy, getBlogLanguage, withBlogLanguage} from "../../lib/blog/language";

const LABEL_COLORS = {
    "Cloud": "#3da8a6",
    "AWS": "#c4854a",
    "DevOps": "#4aad6e",
    "Kubernetes": "#7b6dd6",
    "TypeScript": "#4a8ec4",
    "Backend": "#4aad8e",
    "API": "#b3a04a",
    "Monitoring": "#5aad5a",
    "Rust": "#c47a4a",
    "Systems": "#a65aad",
    "Database": "#c46a4a",
    "React": "#4a7ec4",
    "Frontend": "#8a5ac4",
    "Reflections": "#c45a8a",
    "Product": "#b39a4a",
};

function getLabelColor(label) {
    return LABEL_COLORS[label] || "#68c5c3";
}

function matchesSearch(post, query) {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return true;
    return [
        post.title,
        post.summary,
        ...(post.labels || []),
        ...(post.keywords || []),
    ].join(" ").toLowerCase().includes(normalized);
}

const SORT_OPTIONS = [
    {key: "newest", label: {en: "↓ Date", zh: "↓ 日期"}},
    {key: "oldest", label: {en: "↑ Date", zh: "↑ 日期"}},
    {key: "short", label: {en: "Short", zh: "短文"}},
    {key: "long", label: {en: "Long", zh: "长文"}},
];

function sortPosts(posts, sortKey) {
    const sorted = [...posts];
    switch (sortKey) {
        case "oldest":
            return sorted.sort((a, b) => (a.publishedAt || a.updatedAt || "").localeCompare(b.publishedAt || b.updatedAt || ""));
        case "short":
            return sorted.sort((a, b) => (a.readingTime || 0) - (b.readingTime || 0));
        case "long":
            return sorted.sort((a, b) => (b.readingTime || 0) - (a.readingTime || 0));
        default:
            return sorted.sort((a, b) => (b.publishedAt || b.updatedAt || "").localeCompare(a.publishedAt || a.updatedAt || ""));
    }
}

export default function BlogIndexSearch({posts, language = DEFAULT_BLOG_LANGUAGE}) {
    const copy = getBlogCopy(language);
    const locale = getBlogLanguage(language).locale;
    const [query, setQuery] = useState("");
    const [activeLabel, setActiveLabel] = useState("");
    const [sortKey, setSortKey] = useState("newest");
    const searchRef = useRef(null);

    const labels = useMemo(() => {
        return Array.from(new Set(posts.flatMap((post) => post.labels || []))).sort();
    }, [posts]);

    const filteredPosts = useMemo(() => {
        const filtered = posts.filter((post) => {
            const labelMatches = activeLabel ? post.labels?.includes(activeLabel) : true;
            return labelMatches && matchesSearch(post, query);
        });
        return sortPosts(filtered, sortKey);
    }, [activeLabel, posts, query, sortKey]);

    const isFiltered = query.trim() || activeLabel;

    useEffect(() => {
        const focusSearch = (event) => {
            const activeElement = document.activeElement;
            const isTyping = activeElement?.tagName === "INPUT"
                || activeElement?.tagName === "TEXTAREA"
                || activeElement?.isContentEditable;

            if (event.key === "/" && !isTyping) {
                event.preventDefault();
                searchRef.current?.focus();
            }
        };

        window.addEventListener("keydown", focusSearch);
        return () => window.removeEventListener("keydown", focusSearch);
    }, []);

    return (
        <div className="blog-index-panel">
            {/* Search */}
            <div className="blog-search-row">
                <label className="blog-search-box">
                    <FontAwesomeIcon icon={faMagnifyingGlass}/>
                    <input
                        ref={searchRef}
                        type="search"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder={copy.searchPlaceholder}
                    />
                    {!query && <kbd className="blog-search-shortcut">/</kbd>}
                </label>
            </div>

            {/* Label chips */}
            {labels.length > 0 && (
                <div className="blog-label-row" aria-label="Blog labels">
                    <button
                        className={!activeLabel ? "blog-label active" : "blog-label"}
                        type="button"
                        onClick={() => setActiveLabel("")}
                    >
                        All
                    </button>
                    {labels.map((label) => {
                        const color = getLabelColor(label);
                        const isActive = activeLabel === label;
                        return (
                            <button
                                className={isActive ? "blog-label active" : "blog-label"}
                                key={label}
                                type="button"
                                onClick={() => setActiveLabel(isActive ? "" : label)}
                                style={isActive ? {
                                    background: `${color}26`,
                                    borderColor: `${color}66`,
                                } : undefined}
                            >
                                <span
                                    className="blog-label-dot"
                                    style={{background: color}}
                                />
                                {label}
                            </button>
                        );
                    })}
                </div>
            )}

            {/* Sort + count */}
            {posts.length > 0 && (
                <div className="blog-controls-row">
                    <span className="blog-results-count">
                        {isFiltered
                            ? `${filteredPosts.length} of ${posts.length} ${copy.posts} · ${copy.filtered}`
                            : `${posts.length} ${copy.posts}`
                        }
                    </span>
                    <div className="blog-sort-group">
                        {SORT_OPTIONS.map((opt) => (
                            <button
                                key={opt.key}
                                type="button"
                                className={`blog-sort-btn${sortKey === opt.key ? " active" : ""}`}
                                onClick={() => setSortKey(opt.key)}
                            >
                                {opt.label[language] || opt.label.en}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Post cards */}
            <div className="blog-list">
                {filteredPosts.map((post, index) => {
                    const postLabels = post.labels || [];
                    return (
                        <article
                            className="blog-list-item"
                            key={post.slug}
                            style={{animationDelay: `${index * 60}ms`}}
                        >
                            <Link href={withBlogLanguage(`/blog/${post.slug}`, language)}>
                                <div className="blog-list-meta-row">
                                    <span className="blog-list-meta">
                                        {post.publishedAt
                                            ? new Date(post.publishedAt).toLocaleDateString(locale, {
                                                month: "short",
                                                day: "numeric",
                                                year: "numeric",
                                            })
                                            : copy.draft
                                        }
                                        <span className="meta-dot"/>
                                        {post.readingTime} {copy.minRead}
                                    </span>
                                    {postLabels.length > 0 && (
                                        <span className="blog-list-labels">
                                            {postLabels.map((label) => {
                                                const c = getLabelColor(label);
                                                return (
                                                    <span
                                                        key={label}
                                                        className="blog-list-label-pill"
                                                        style={{
                                                            background: `${c}1f`,
                                                            border: `1px solid ${c}4d`,
                                                            color: c,
                                                        }}
                                                    >
                                                        {label}
                                                    </span>
                                                );
                                            })}
                                        </span>
                                    )}
                                </div>
                                <h2>{post.title}</h2>
                                <p>{post.summary}</p>
                                <span className="blog-list-arrow">&rarr;</span>
                            </Link>
                        </article>
                    );
                })}
            </div>

            {/* Empty states */}
            {posts.length === 0 && (
                <div className="blog-empty-state">
                    {copy.noPostsYet}
                    <div className="blog-empty-sub">{copy.homeBlogEmpty}</div>
                </div>
            )}
            {posts.length > 0 && filteredPosts.length === 0 && (
                <div className="blog-empty-state">
                    {copy.noPostsFound}
                    <div className="blog-empty-sub">{copy.clearFiltersHint}</div>
                </div>
            )}
        </div>
    );
}
