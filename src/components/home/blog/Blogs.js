import React from "react";
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import BlogCard from "./BlogCard";
import {getAllPosts} from "../../../lib/blog/blobStore";
import {rankPostsByPopularity} from "../../../lib/blog/popularity";

const Blogs = async () => {
    const posts = await getAllPosts();
    const rankedPosts = await rankPostsByPopularity(posts, 6);
    const latestPost = posts[0];
    const popularPosts = latestPost && !rankedPosts.some((post) => post.slug === latestPost.slug)
        ? [latestPost, ...rankedPosts].slice(0, 6)
        : rankedPosts;
    const latestSlug = latestPost?.slug || "";

    return (
        <div id="blogs">
            <div className="blog-home-heading">
                <h1 className="text-center gradient-text-5 fw-bold">Popular Posts</h1>
            </div>
            {popularPosts.length > 0 ? (
                <div className="blog-card-grid py-5 px-3">
                    {popularPosts.map((post) => (
                        <BlogCard
                            key={post.slug}
                            post={post}
                            isLatest={post.slug === latestSlug}
                        />
                    ))}
                </div>
            ) : (
                <p className="blog-home-empty">Blog posts will appear here after the first posts are published.</p>
            )}
            <div className="blog-home-heading">
                <Link href="/blog" className="blog-home-link">
                    <span>View all posts</span>
                    <span className="blog-home-link-icon" aria-hidden="true">
                        <FontAwesomeIcon icon={faArrowRight}/>
                    </span>
                </Link>
            </div>
        </div>
    );
};

export default Blogs;
