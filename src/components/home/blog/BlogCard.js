import React from "react";
import Link from "next/link";
import GeneratedBlogCover, {getBlogCoverPalette, getBlogLabelColor} from "../../blog/GeneratedBlogCover";
import {DEFAULT_BLOG_LANGUAGE, getBlogCopy, getBlogLanguage, withBlogLanguage} from "../../../lib/blog/language";

function formatDate(value, language) {
    if (!value) {
        return getBlogCopy(language).draft;
    }

    return new Date(value).toLocaleDateString(getBlogLanguage(language).locale, {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

const BlogCard = ({post, isLatest = false, language = DEFAULT_BLOG_LANGUAGE}) => {
    const copy = getBlogCopy(language);
    const primaryColor = getBlogCoverPalette(post)[0];
    const labels = post.labels || [];

    return (
        <article className={`home-blog-card${isLatest ? " latest" : ""}`} style={{"--blog-accent": primaryColor}}>
            <Link href={withBlogLanguage(`/blog/${post.slug}`, language)} className="home-blog-card-link">
                <div className="home-blog-cover">
                    <GeneratedBlogCover post={post} className="home-blog-cover-svg"/>
                    <div className="home-blog-cover-fade"/>
                    {isLatest && <span className="home-blog-latest-badge">{copy.latest}</span>}
                    <h2>{post.title}</h2>
                </div>
                <div className="home-blog-card-body">
                    {isLatest && <h2 className="home-blog-feature-title">{post.title}</h2>}
                    {labels.length > 0 && (
                        <div className="home-blog-labels">
                            {labels.map((label) => (
                                <span key={label} style={{"--label-color": getBlogLabelColor(label)}}>
                                    {label}
                                </span>
                            ))}
                        </div>
                    )}
                    <p>{post.summary}</p>
                    <div className="home-blog-footer">
                        <span>{formatDate(post.publishedAt || post.updatedAt, language)}</span>
                        <span className="home-blog-dot"/>
                        <span>{post.readingTime} {copy.minRead}</span>
                        {post.viewCount > 0 && (
                            <>
                                <span className="home-blog-dot"/>
                                <span>{post.viewCount} {copy.views}</span>
                            </>
                        )}
                        <span className="home-blog-arrow">→</span>
                    </div>
                </div>
            </Link>
        </article>
    );
};

export default BlogCard;
