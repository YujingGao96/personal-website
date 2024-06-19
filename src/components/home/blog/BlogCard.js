import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronRight} from "@fortawesome/free-solid-svg-icons/faChevronRight";

const BlogCard = ({picture, title, link}) => {
    return (

        <div className="card dark-bg text-light rounded-all h-100 blur-background">
            <img src={picture} className="card-img-top rounded-top" alt="Cover of blog post"/>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>

                    <a target="_blank"
                       rel="noopener noreferrer" href={link}
                       className="btn btn-outline-light mx-5 my-3 rounded-all"
                    >
                        Learn More &nbsp;
                        <FontAwesomeIcon icon={faChevronRight}/>
                    </a>

            </div>
        </div>

    );
};

export default BlogCard;