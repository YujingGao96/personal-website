import React from "react";
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import BlogCard from "./BlogCard";
import SectionHeader from "../../common/SectionHeader";
import {getAllPosts} from "../../../lib/blog/blobStore";
import {DEFAULT_BLOG_LANGUAGE, getBlogCopy, withBlogLanguage} from "../../../lib/blog/language";
import {rankPostsByPopularity} from "../../../lib/blog/popularity";

const Blogs = async ({language = DEFAULT_BLOG_LANGUAGE}) => {
    const copy = getBlogCopy(language);
    const posts = await getAllPosts({language});
    const rankedPosts = await rankPostsByPopularity(posts, posts.length);
    const rankedPostsBySlug = new Map(rankedPosts.map((post) => [post.slug, post]));
    const latestPost = posts[0] ? (rankedPostsBySlug.get(posts[0].slug) || posts[0]) : null;
    const popularPosts = latestPost
        ? [
            latestPost,
            ...rankedPosts.filter((post) => post.slug !== latestPost.slug).slice(0, 4),
        ]
        : rankedPosts.slice(0, 4);
    const latestSlug = latestPost?.slug || "";

    return (
        <div id="blogs">
            <SectionHeader eyebrow={copy.homeBlogEyebrow} title={copy.homeBlogTitle} sectionId="blogs" />
            {popularPosts.length > 0 ? (
                <div className="blog-card-grid py-5 px-3">
                    {popularPosts.map((post) => (
                        <BlogCard
                            key={post.slug}
                            post={post}
                            isLatest={post.slug === latestSlug}
                            language={language}
                        />
                    ))}
                </div>
            ) : (
                <p className="blog-home-empty">{copy.homeBlogEmpty}</p>
            )}
            <div className="blog-home-heading">
                <Link href={withBlogLanguage("/blog", language)} className="blog-home-link">
                    <span>{copy.viewAllPosts}</span>
                    <span className="blog-home-link-icon" aria-hidden="true">
                        <FontAwesomeIcon icon={faArrowRight}/>
                    </span>
                </Link>
            </div>
        </div>
    );
};

export default Blogs;
