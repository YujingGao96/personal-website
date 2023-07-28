import React from "react";
import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronRight} from "@fortawesome/free-solid-svg-icons/faChevronRight";
import Fade from "react-reveal/Fade";
import HeadShake from 'react-reveal/HeadShake';

const ProjectCard = ({src, title, text, link}) => {
    const [show, setShow] = useState(false);
    return (
        <Fade up>
            <div className="col-lg-4 col-md-6 col-sm-12 mb-5">
                <div className="card dark-bg text-light rounded-all h-100">
                    <img src={src} className="card-img-top rounded-top" alt={src}/>
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text font-weight-light">{text}</p>
                    </div>
                    <HeadShake when={show}>
                        <a target="_blank"
                           rel="noopener noreferrer" href={link}
                           className="btn btn-outline-light mx-5 my-3 rounded-all"
                           onMouseOver={() => setShow(true)}
                           onMouseLeave={() => setShow(false)}
                        >
                            Learn More &nbsp;
                            <FontAwesomeIcon icon={faChevronRight}/>
                        </a>
                    </HeadShake>
                </div>
            </div>
        </Fade>
    );
};

export default ProjectCard;