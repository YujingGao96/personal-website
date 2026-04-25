"use client";

import React, {useEffect, useRef} from "react";
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronRight} from "@fortawesome/free-solid-svg-icons";
import fitty from "fitty";
import {generateGradientFromText} from "../../../util/ColorUtil";

const BlogCard = ({title, link, fontClass}) => {
    const titleRef = useRef(null);
    const gradientStyle = {
        backgroundImage: generateGradientFromText(title),
        height: '200px',
        borderTopLeftRadius: '1.2rem',
        borderTopRightRadius: '1.2rem',
        animation: 'moveGradient 7s ease infinite',
        backgroundSize: '200% 200%',
    };

    useEffect(() => {
        if (!titleRef.current) {
            return undefined;
        }

        const fitInstance = fitty(titleRef.current, {
            minSize: 12,
            maxSize: 70,
            multiLine: true
        });

        return () => {
            fitInstance.unsubscribe();
        };
    }, []);

    return (
        <div className="card dark-bg text-light rounded-all h-100 blur-background">
            <Link
                href={`/blog/${link}`}
                style={gradientStyle}
                className="gradient-bg d-flex align-items-center justify-content-center text-decoration-none text-light"
            >
                <h3 ref={titleRef} className={`text-center m-3 ${fontClass}`}>
                    {title}
                </h3>
            </Link>
            <div className="card-body">
                <Link href={`/blog/${link}`} className="btn btn-outline-light m-3 py-2 rounded-all d-block glow-button">
                    Read More &nbsp;
                    <FontAwesomeIcon icon={faChevronRight}/>
                </Link>
            </div>
        </div>
    );
};

export default BlogCard;
