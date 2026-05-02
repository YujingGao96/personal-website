import React from "react";
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import BlogCard from "./BlogCard";
import SectionHeader from "../../common/SectionHeader";
import {getAllPosts} from "../../../lib/blog/blobStore";
import {DEFAULT_BLOG_LANGUAGE, getBlogCopy} from "../../../lib/blog/language";
import {rankPostsByPopularity} from "../../../lib/blog/popularity";

const Blogs = async ({language = DEFAULT_BLOG_LANGUAGE}) => {
    const copy = getBlogCopy(language);
    const posts = await getAllPosts({language});
    const rankedPosts = await rankPostsByPopularity(posts, 6);
    const latestPost = posts[0];
    const popularPosts = latestPost && !rankedPosts.some((post) => post.slug === latestPost.slug)
        ? [latestPost, ...rankedPosts].slice(0, 6)
        : rankedPosts;
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
                <Link href="/blog" className="blog-home-link">
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
