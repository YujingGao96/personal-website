import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faQuoteLeft} from "@fortawesome/free-solid-svg-icons/faQuoteLeft";

const SingleQuote = ({text, authorName, authorTitle}) => {
    return (
        <div className="row mt-5">
            <div className="col-12">
                <div className="card text-white dark-bg mb-3 rounded-all" >
                    <div className="card-header"><FontAwesomeIcon icon={faQuoteLeft} size="lg"/></div>
                    <div className="card-body">
                        <h4 className="card-text quote-text">{text}</h4>
                        <br/>
                        <h4 className="text-right font-weight-bold quote-text">
                            - {authorName}
                        </h4>
                        <h6 className="text-right font-weight-bold quote-text">
                            {authorTitle}
                        </h6>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleQuote;