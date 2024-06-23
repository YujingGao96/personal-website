import React, {useEffect, useRef} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChevronRight} from '@fortawesome/free-solid-svg-icons';
import {generateRandomGradient} from '../../../util/ColorUtil';
import fitty from 'fitty';
import './BlogCard.css';
import {Link} from 'react-router-dom';

const BlogCard = ({title, link, fontClass}) => {
    const gradientStyle = {
        backgroundImage: generateRandomGradient(),
        height: '200px',
        borderTopLeftRadius: '1.2rem',
        borderTopRightRadius: '1.2rem',
        animation: 'moveGradient 7s ease infinite',
        backgroundSize: '200% 200%',
    };

    const titleRef = useRef(null);

    useEffect(() => {
        const fitInstance = fitty(titleRef.current, {
            minSize: 12,
            maxSize: 80,
            multiLine: true
        });

        return () => {
            fitInstance.unsubscribe();
        };
    }, []);

    return (
        <div className="card dark-bg text-light rounded-all h-100 blur-background">
            <Link
                to={"blog/" + link}
                style={gradientStyle}
                className="gradient-bg d-flex align-items-center justify-content-center text-decoration-none text-light"
            >
                <h3 ref={titleRef} className={`text-center m-3 blog-cover-front ${fontClass}`}>
                    {title}
                </h3>
            </Link>
            <div className="card-body">
                <Link to={"blog/" + link} className="btn btn-outline-light m-3 py-2 rounded-all d-block glow-button">
                    Read More &nbsp;
                    <FontAwesomeIcon icon={faChevronRight}/>
                </Link>
            </div>
        </div>
    );
};

export default BlogCard;
