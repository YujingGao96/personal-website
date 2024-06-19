import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faQuoteLeft} from "@fortawesome/free-solid-svg-icons/faQuoteLeft";
import Fade from "react-reveal/Fade";

const SingleQuote = ({text, authorName, authorTitle}) => {
    return (
        <Fade up>
            <div className="row mt-5 blur-background">
                <div className="col-12">
                    <div className="card text-white dark-bg mb-3 rounded-all p-3">
                        <div className="card-header"><FontAwesomeIcon icon={faQuoteLeft} size="lg"/></div>
                        <div className="card-body">
                            <h4 className="card-text quote-text">{text}</h4>
                            <br/>
                            <h4 className="text-end fw-bold quote-text">
                                - {authorName}
                            </h4>
                            <h6 className="text-end fw-bold quote-text">
                                {authorTitle}
                            </h6>
                        </div>
                    </div>
                </div>
            </div>
        </Fade>

    );
};

export default SingleQuote;