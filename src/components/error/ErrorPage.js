import React, {useEffect} from 'react';
import './ErrorPage.css';
import Parallax from 'parallax-js';
import {useRouter} from 'next/router';
import resolveHttpError from "../../resolvers/ErrorCodeResolver";
import {faHome} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const ErrorPage = () => {
    const router = useRouter();
    const {errorCode} = router.query;
    const error = resolveHttpError(errorCode);

    useEffect(() => {
        const isTouchDevice = () => {
            return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        };

        if(!isTouchDevice()){
            const scene = document.getElementById('scene');
            new Parallax(scene);
        }
    }, []);

    return (
        <>
            {/* Main Section */}
            <section className="wrapper">
                <div className="container">
                    <div id="scene" className="scene" data-hover-only="false">
                        <div className="circle" data-depth="1.2"></div>
                        <div className="one" data-depth="0.9">
                            <div className="content">
                                <span className="piece"></span>
                                <span className="piece"></span>
                                <span className="piece"></span>
                            </div>
                        </div>
                        <div className="two" data-depth="0.60">
                            <div className="content">
                                <span className="piece"></span>
                                <span className="piece"></span>
                                <span className="piece"></span>
                            </div>
                        </div>
                        <div className="three" data-depth="0.40">
                            <div className="content">
                                <span className="piece"></span>
                                <span className="piece"></span>
                                <span className="piece"></span>
                            </div>
                        </div>
                        <p className="p404" data-depth="0.50">{error.errorCode}</p>
                        <p className="p404" data-depth="0.10">{error.errorCode}</p>
                    </div>
                    <div className="text">
                        <article>
                            <p>{error.briefDescription} - {error.detailDescription}</p>
                            <button onClick={() => router.push("/")}> <FontAwesomeIcon icon={faHome}/> &nbsp; Back Home</button>
                        </article>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ErrorPage;
