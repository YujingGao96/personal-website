import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronRight} from "@fortawesome/free-solid-svg-icons/faChevronRight";
import Fade from "react-reveal/Fade";

const ProjectCard = ({src, title, addr, date, text, link}) => {
    return (

        <Fade up>
            <div className="col-lg-4 col-sm-12 mb-5 blur-background">
                <div className="card dark-bg text-light rounded-all h-100">
                    <img src={src} className="card-img-top rounded-top" alt={src}/>
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-title h5 text-secondary">{addr}</p>
                        <p className="card-title h6 text-secondary">{date}</p>
                        <b className={`hr anim gray`}></b>
                        <p className="card-text fw-light">{text}</p>
                    </div>
                    <a target="_blank" rel="noopener noreferrer" href={link} className="btn btn-outline-light mx-5 my-3 py-2 rounded-all glow-button">
                        Learn More &nbsp;
                        <FontAwesomeIcon icon={faChevronRight}/>
                    </a>

                </div>
            </div>
        </Fade>
    );
};

export default ProjectCard;