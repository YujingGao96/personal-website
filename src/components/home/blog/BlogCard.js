import React from "react";
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronRight} from "@fortawesome/free-solid-svg-icons";
import {generateGradientFromText} from "../../../util/ColorUtil";

const BlogCard = ({post, fontClass}) => {
    const gradientStyle = {
        backgroundImage: generateGradientFromText(post.title),
        height: '200px',
        borderTopLeftRadius: '1.2rem',
        borderTopRightRadius: '1.2rem',
        animation: 'moveGradient 7s ease infinite',
        backgroundSize: '200% 200%',
    };

    return (
        <div className="card dark-bg text-light rounded-all h-100 blur-background">
            <Link
                href={`/blog/${post.slug}`}
                style={gradientStyle}
                className="gradient-bg d-flex align-items-center justify-content-center text-decoration-none text-light"
            >
                <h3 className={`blog-card-title text-center m-3 ${fontClass}`}>
                    {post.title}
                </h3>
            </Link>
            <div className="card-body">
                <p className="blog-card-summary">{post.summary}</p>
                <div className="blog-card-meta">
                    <span>{post.readingTime} min read</span>
                    {post.viewCount > 0 && <span>{post.viewCount} views</span>}
                </div>
                <Link href={`/blog/${post.slug}`} className="btn btn-outline-light m-3 py-2 rounded-all d-block glow-button">
                    Read More &nbsp;
                    <FontAwesomeIcon icon={faChevronRight}/>
                </Link>
            </div>
        </div>
    );
};

export default BlogCard;
