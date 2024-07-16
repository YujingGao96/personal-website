import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faQuoteLeft} from "@fortawesome/free-solid-svg-icons/faQuoteLeft";
import {Zoom} from "react-awesome-reveal";
import "./SingleQuote.css";

const SingleQuote = ({text, authorName, authorTitle}) => {

    return (
        <Zoom>
            <div className="mt-5 blur-background">
                <div className="">
                    <div className="card text-white dark-bg mb-3 rounded-all p-3 quote-card">
                        <div className="card-header">
                            <FontAwesomeIcon icon={faQuoteLeft} size="lg"/>
                        </div>
                        <div className="card-body d-flex flex-column justify-content-around">
                            <h5 className="card-text quote-text">
                                {text}
                            </h5>
                            <br/>
                            <div>
                                <h6 className="text-end fw-bold quote-text">
                                    - {authorName},
                                </h6>
                                <h6 className="text-end  text-secondary fst-italic fw-bold">
                                    {authorTitle}
                                </h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Zoom>
    );
};

export default SingleQuote;
