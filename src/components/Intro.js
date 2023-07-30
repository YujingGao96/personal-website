import React from "react";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import {darcula} from "react-syntax-highlighter/dist/cjs/styles/prism";
import {MacTerminal} from "react-window-ui";
import Zoom from "react-reveal/Zoom";
import {age, name, gender, jobTitle, company, email, phoneNumber, linkedin} from "../resolvers/profileResolver";
import globalPaymentsIcon from "../images/gp.png";
import emailIcon from "../images/email.png";
import phoneIcon from "../images/phone.png";
import linkedinIcon from "../images/linkedin.png";

const Intro = () => {
    const codeString = 'PersonBuilder' +
        `\n\t.setName("${name}")` +
        `\n\t.setAge(${age})` +
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

    const body = () => {
        return (
            <Zoom>
                <div className="mt-2">
                    <div id="intro-head"/>
                    <MacTerminal style={{overflow: "hidden", marginTop: 0}} background="#212121df"
                                 boxShadow="rgb(0 0 0 / 50%) 6px 4px 9px 3px">
                        <div>
                            <div className="row p-2">
                                <div className="col-md-5 col-sm-12 p-3 text-center">
                                    <img className="rounded-circle border border-light dark-shadow"
                                         height="auto" width="50%" src="/profile.jpg" alt="profile"
                                         onMouseDown={e => e.preventDefault()}
                                         onContextMenu={e => e.preventDefault()}/>
                                    <h2 className="pt-4">Yujing Gao</h2>
                                    <h4 className="text-muted pt-3">{jobTitle}</h4>
                                    <div className="mx-auto">
                                        <div className="text-left d-inline-block">
                                            <h6 className="text-muted pt-1 ">
                                                <span className="mx-3"><img src={globalPaymentsIcon} alt="Global Payments" height="20px" width="20px"/></span>{company}
                                            </h6>
                                            <h6 className="text-muted pt-1">
                                                <span className="mx-3"><img src={emailIcon} alt="Email" height="20px" width="20px"/></span>{email}
                                            </h6>
                                            <h6 className="text-muted pt-1">
                                                <span className="mx-3"><img src={phoneIcon} alt="Phone" height="20px" width="20px"/></span>{phoneNumber}
                                            </h6>
                                            <h6 className="text-muted pt-1">
                                                <span className="mx-3"><img src={linkedinIcon} alt="Linkedin" height="20px" width="20px"/></span>{linkedin}
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-7 col-sm-12">
                                    <SyntaxHighlighter className="rounded" language="java" style={darcula}>
                                        {codeString}
                                    </SyntaxHighlighter>
                                </div>
                            </div>
                        </div>
                    </MacTerminal>
                </div>
            </Zoom>
        );
    };

    return (
        <div id="about">
            <h1 className="text-center gradient-text-1 font-weight-bold">About Me</h1>
            {body()}
        </div>

    );
}

export default Intro;