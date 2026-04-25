import React from "react";
import Link from "next/link";
import BlogCard from "./BlogCard";
import {getAllPosts} from "../../../lib/blog/blobStore";
import {rankPostsByPopularity} from "../../../lib/blog/popularity";

const fontClasses = ['blog-cover-front-0', 'blog-cover-front-1', 'blog-cover-front-2', 'blog-cover-front-3'];

const Blogs = async () => {
    const posts = await getAllPosts();
    const popularPosts = await rankPostsByPopularity(posts, 4);

    return (
        <div id="blogs">
            <div className="blog-home-heading">
                <h1 className="text-center gradient-text-5 fw-bold">Popular Posts</h1>
                <Link href="/blog" className="btn btn-outline-light py-2 rounded-all glow-button">
                    View All
                </Link>
            </div>
            {popularPosts.length > 0 ? (
                <div className="blog-card-grid py-5 px-3">
                    {popularPosts.map((post, index) => (
                        <BlogCard
                            key={post.slug}
                            post={post}
                            fontClass={fontClasses[index % fontClasses.length]}
                        />
                    ))}
                </div>
            ) : (
                <p className="blog-home-empty">Blog posts will appear here after the first posts are published.</p>
            )}
        </div>
    );
};

export default Blogs;
