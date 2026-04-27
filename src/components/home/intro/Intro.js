"use client";

import React, {useEffect, useState} from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/prism-light";
import java from "react-syntax-highlighter/dist/esm/languages/prism/java";
import darcula from "react-syntax-highlighter/dist/esm/styles/prism/darcula";
SyntaxHighlighter.registerLanguage("java", java);
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
import fisIcon from "./images/fis.png";
import emailIcon from "./images/email.png";
import linkedinIcon from "./images/linkedin.png";
import SectionHeader from "../../common/SectionHeader";
import TerminalWindow from "../../common/TerminalWindow";
import useWindowSize from "react-use/lib/useWindowSize";

const Confetti = dynamic(() => import("react-confetti"), {ssr: false});

const Intro = () => {
    const [ageState, setAgeState] = useState("0.000000000");
    const [showConfetti, setShowConfetti] = useState(false);
    const { width, height } = useWindowSize();

    useEffect(() => {
        const interval = setInterval(() => {
            setAgeState(getAge(birthday))
        }, 500);
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
            <div className="blur-background">
                <Zoom triggerOnce>
                    <div className="mt-5">
                        <TerminalWindow>
                            <div className="row p-2">
                                <Confetti recycle={showConfetti} gravity={0.3} width={width} height={height + 300}/>
                                <div className="col-md-5 col-sm-12 p-3 text-center">
                                    <Image
                                        className="rounded-circle border border-light dark-shadow border-opacity-10 border-2"
                                        height={260} width={260} src="/profile.jpg" alt="profile"
                                        priority
                                        style={{width: "50%", height: "auto"}}
                                        onMouseOver={_ => showConfettiFor1Sec()}
                                        onClick={_ => showConfettiFor1Sec()}
                                        onMouseLeave={_ => setShowConfetti(false)}
                                        onMouseDown={e => e.preventDefault()}
                                        onMouseUp={e => e.preventDefault()}
                                        onContextMenu={e => e.preventDefault()}/>
                                    <h2 className="intro-profile-name mt-4 fw-bold">{name}</h2>
                                    <h4 className="text-secondary my-3">{jobTitle}</h4>
                                    <div className="mx-auto">
                                        <div className="text-start d-inline-block">
                                            <a className="text-secondary pt-1 h6 text-decoration-none d-block"
                                               target="_blank" rel="noreferrer" href="https://www.fisglobal.com/">
                                                <span className="mx-3">
                                                    <Image src={fisIcon} alt="FIS" height={23} width={23}/>
                                                </span>{company}
                                            </a>
                                            <a className="text-secondary pt-1 h6 text-decoration-none d-block"
                                               href="mailto:1@ygao.app">
                                                <span className="mx-3">
                                                    <Image src={emailIcon} alt="Email" height={23} width={23}/>
                                                </span>{email}
                                            </a>
                                            <a className="text-secondary pt-1 h6 text-decoration-none d-block"
                                               target="_blank" rel="noreferrer"
                                               href="https://www.linkedin.com/in/yujing-gao">
                                                <span className="mx-3">
                                                    <Image src={linkedinIcon} alt="Linkedin" height={23} width={23}/>
                                                </span>{linkedin}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-7 col-sm-12">
                                    <SyntaxHighlighter language="java"
                                                       style={darcula}
                                                       useInlineStyles={true}
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

                        </TerminalWindow></div>
                </Zoom>
            </div>
        );
    };

    return (
        <div id="about">
            <SectionHeader eyebrow="Profile" title="About Me" gradient="gradient-text-1"/>
            {body()}
        </div>

    );
}

export default Intro;
