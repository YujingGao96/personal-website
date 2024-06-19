import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChevronRight} from '@fortawesome/free-solid-svg-icons';
import {generateRandomGradient} from '../../../util/ColorUtil';
import './BlogCard.css';

const BlogCard = ({title, link}) => {
    const gradientStyle = {
        backgroundImage: generateRandomGradient(),
        height: '200px',
        borderTopLeftRadius: '1.2rem',
        borderTopRightRadius: '1.2rem',
        animation: 'moveGradient 7s ease infinite',
        backgroundSize: '200% 200%',
    };

    return (
        <div className="card dark-bg text-light rounded-all h-100 blur-background">
            <div style={gradientStyle} className="gradient-bg d-flex align-items-center justify-content-center">
                <h1 className="text-center fw-bold">{title}</h1>
            </div>
            <div className="card-body">

                <a href={"blog/" + link} className="btn btn-outline-light my-3 rounded-all d-block">
                    Learn More &nbsp;
                    <FontAwesomeIcon icon={faChevronRight}/>
                </a>
            </div>
        </div>
    );
};

export default BlogCard;
