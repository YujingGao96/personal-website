import React, {useEffect, useState} from "react";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import {darcula} from "react-syntax-highlighter/dist/cjs/styles/prism";
import {Zoom} from "react-awesome-reveal";
import {
    birthday,
    company,
    email,
    gender,
    getAge,
    jobTitle,
    linkedin,
    name
} from "../../../resolvers/profileResolver";
import globalPaymentsIcon from "./images/gp.png";
import emailIcon from "./images/email.png";
import linkedinIcon from "./images/linkedin.png";
import Terminal from "../../common/Terminal";
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize'

const Intro = () => {
    const [ageState, setAgeState] = useState(getAge(birthday));
    const [showConfetti, setShowConfetti] = useState(false);
    const { width, height } = useWindowSize();

    useEffect(() => {
        const interval = setInterval(() => {
            setAgeState(getAge(birthday))
        }, 100);
        return () => clearInterval(interval);
    }, []);

    const codeString = 'PersonBuilder' +
        `\n\t.setName("${name}")` +
        `\n\t.setAge(${ageState})` +
        `\n\t.setGender(Gender.${gender.toUpperCase()})` +
        `\n\t.setJob("${jobTitle}")` +
        '\n\t.isAppleFan(true)' +
        '\n\t.addInterests(' +
        '\n\t\tList.of("Coding", "Gym")' +
        '\n\t)' +
        '\n\t.addEducation(' +
        '\n\t\tnew Degree(' +
        '\n\t\t\t"B.S. in Computer Science", ' +
        '\n\t\t\t"CSU, Columbus, GA", ' +
        '\n\t\t\t"May 15th, 2020"' +
        '\n\t\t),' +
        '\n\t\tnew Degree(' +
        '\n\t\t\t"M.S. in Computer Science",' +
        '\n\t\t\t"CSU, Columbus, GA",' +
        '\n\t\t\t"Aug 4th, 2021"' +
        '\n\t\t)' +
        '\n\t)' +
        '\n\t.build();';

    const showConfettiFor1Sec = () => {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 1000)
    }

    const body = () => {
        return (
            <Zoom triggerOnce>
                <div className="blur-background">
                    <div className="mt-5">
                        <Terminal style={{overflow: "hidden", marginTop: 0}}
                                  border="1px solid rgba(48, 47, 47, 0.41)"
                                  background="rgba(33, 33, 33, 0.3)"
                                  boxShadow="rgb(0 0 0 / 50%) 6px 4px 9px 3px"
                                  topbarColor="rgba(85, 85, 85, 0.3)">

                            <div className="row p-2">
                                <Confetti recycle={showConfetti} gravity={0.3} width={width} height={height + 300}/>
                                <div className="col-md-5 col-sm-12 p-3 text-center">
                                    <img
                                        className="rounded-circle border border-light dark-shadow border-opacity-10 border-2"
                                        height="auto" width="50%" src="/profile.jpg" alt="profile"
                                        onMouseOver={_ => showConfettiFor1Sec()}
                                        onClick={_ => showConfettiFor1Sec()}
                                        onMouseLeave={_ => setShowConfetti(false)}
                                        onMouseDown={e => e.preventDefault()}
                                        onMouseUp={e => e.preventDefault()}
                                        onContextMenu={e => e.preventDefault()}/>
                                    <h2 className="mt-4">{name}</h2>
                                    <h4 className="text-secondary my-3">{jobTitle}</h4>
                                    <div className="mx-auto">
                                        <div className="text-start d-inline-block">
                                            <a className="text-secondary pt-1 h6 text-decoration-none d-block"
                                               target="_blank" rel="noreferrer" href="https://www.globalpayments.com/">
                                                <span className="mx-3"><img src={globalPaymentsIcon}
                                                                            alt="Global Payments" height="23px"
                                                                            width="23px"/></span>{company}
                                            </a>
                                            <a className="text-secondary pt-1 h6 text-decoration-none d-block"
                                               href="mailto:1@ygao.app">
                                                <span className="mx-3"><img src={emailIcon} alt="Email" height="23px"
                                                                            width="23px"/></span>{email}
                                            </a>
                                            <a className="text-secondary pt-1 h6 text-decoration-none d-block"
                                               target="_blank" rel="noreferrer"
                                               href="https://www.linkedin.com/in/yujing-gao">
                                                <span className="mx-3"><img src={linkedinIcon} alt="Linkedin"
                                                                            height="23px"
                                                                            width="23px"/></span>{linkedin}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-7 col-sm-12">
                                    <SyntaxHighlighter language="java"
                                                       style={darcula}
                                                       customStyle={{
                                                           background: "transparent",
                                                           backdropFilter: "sepia()",
                                                           border: "1px solid rgba(48, 47, 47, 0.41)",
                                                           borderRadius: "1.2rem"
                                                       }}>
                                        {codeString}
                                    </SyntaxHighlighter>
                                </div>
                            </div>

                        </Terminal></div>
                </div>
            </Zoom>
        );
    };

    return (
        <div id="about">
            <h1 className="text-center gradient-text-1 fw-bold">About Me</h1>
            {body()}
        </div>

    );
}

export default Intro;