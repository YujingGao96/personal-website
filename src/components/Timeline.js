import React from "react";
import {VerticalTimeline, VerticalTimelineElement} from 'react-vertical-timeline-component';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBriefcase,
    faUserGraduate,
    faGraduationCap,
    faLayerGroup,
    faBaby,
    faChalkboardTeacher
} from "@fortawesome/free-solid-svg-icons";
import 'react-vertical-timeline-component/style.min.css';
import csuLogo from "../images/csu.png";

const TimeLine = () => {
    const body = () => {
        return (
            <VerticalTimeline className="mt-5">
                <VerticalTimelineElement
                    className="vertical-timeline-element--education"
                    contentStyle={
                        {
                            background: '#ff6d00AF',
                            color: '#fff',
                            boxShadow: '2px 3px 29px 7px rgba(79, 34, 0, 0.7)',
                            borderTop: '3px solid white',
                            borderRadius: '.7em'
                        }
                    }
                    contentArrowStyle={{borderRight: '7px solid #ff6d00AF'}}
                    date="January 2022 - Present"
                    iconStyle={{background: '#FF6D00', color: '#fff'}}
                    icon={<FontAwesomeIcon icon={faLayerGroup} size="lg" fixedWidth/>}
                >
                    <h3 className="vertical-timeline-element-title">Full Stack Developer</h3>
                    <h5 className="vertical-timeline-element-subtitle">Global Payments, Columbus, GA</h5>
                    <b className="hr anim orange"></b>
                    <p>
                        ☁️ During my tenure at TSYS (Global Payments) I played a crucial role in building a
                        modern distributed payment platform using cloud services, primarily AWS.
                    </p>
                    <p>
                        👨🏻‍💻 As part of the team, we embarked on an ambitious project to develop the entire financial
                        control
                        system and posting system from scratch, incorporating the business logic of the old legacy
                        mainframe system.
                    </p>
                    <p>
                        🛠️ Our primary focus was to create a scalable and maintainable system. To achieve this, we
                        utilized
                        cutting-edge technologies such as Kafka, Airflow, Spark, Java with Spring, and a wide range of
                        AWS services.
                    </p>
                    <p>
                        💵 Together, we successfully built the Batch Core architecture, making significant strides in
                        transforming the company's payment infrastructure.
                    </p>
                </VerticalTimelineElement>

                <VerticalTimelineElement
                    className="vertical-timeline-element--education"
                    contentStyle={
                        {
                            background: '#FF1744AF',
                            color: '#fff',
                            boxShadow: '2px 3px 29px 7px rgba(79, 6, 21, 0.7)',
                            borderTop: '3px solid white',
                            borderRadius: '.7em'
                        }
                    }
                    contentArrowStyle={{borderRight: '7px solid #FF1744AF'}}
                    date="April 2021 - December 2021"
                    iconStyle={{background: '#FF1744', color: '#fff'}}
                    icon={<FontAwesomeIcon icon={faBriefcase} size="lg" fixedWidth/>}
                >
                    <h3 className="vertical-timeline-element-title">IT Apprenticeship</h3>
                    <h5 className="vertical-timeline-element-subtitle">Aflac, Columbus, GA</h5>
                    <b className="hr anim red"></b>
                    <p>
                        🕸️ I carry a specialized expertise in crafting web services using J2EE and Websphere.
                    </p>
                    <p>
                        💾 I have had the privilege to significantly participate in the transformation of legacy
                        mainframe
                        software, originally in COBOL, into more contemporary and robust Java applications.
                    </p>
                    <p>
                        🧪 In an effort to streamline our processes, I architected an advanced parallel integration
                        testing
                        framework leveraging Postman and web services.
                    </p>
                    <p>
                        ✅ This framework has played a pivotal role in enhancing our software quality assurance measures,
                        even exceeding the performance of pre-existing testing frameworks such as JUnit.
                    </p>
                    <p>
                        💡 I am eager to apply and expand my competencies and insights in future projects and
                        opportunities.
                    </p>

                </VerticalTimelineElement>

                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    contentStyle={
                        {
                            background: '#AEEA00AF',
                            color: '#fff',
                            boxShadow: '2px 3px 29px 7px rgba(50, 66, 0, 0.7)',
                            borderTop: '3px solid white',
                            borderRadius: '.7em'
                        }
                    }
                    contentArrowStyle={{borderRight: '7px solid #AEEA00AF'}}
                    date="August 2020 - August 2021"
                    iconStyle={{background: '#AEEA00', color: '#fff'}}
                    icon={<FontAwesomeIcon icon={faChalkboardTeacher} size="lg" fixedWidth/>}
                >
                    <h3 className="vertical-timeline-element-title">Graduate Assistance / STEM Mentor</h3>
                    <h5 className="vertical-timeline-element-subtitle">Columbus State University, Columbus, GA</h5>
                    <b className="hr anim lime"></b>
                    <p>
                        While studying at Columbus State University, I worked as a graduate assistance and a STEM
                        program
                        mentor.
                    </p>
                </VerticalTimelineElement>

                <VerticalTimelineElement
                    className="vertical-timeline-element--education"
                    contentStyle={
                        {
                            background: '#1DE9B6AF',
                            color: '#fff',
                            boxShadow: '2px 3px 29px 7px rgba(8, 64, 50, 0.7)',
                            borderTop: '3px solid white',
                            borderRadius: '.7em'
                        }
                    }
                    contentArrowStyle={{borderRight: '7px solid #1DE9B6AF'}}
                    date="August 2020 - August 2021"
                    iconStyle={{background: '#1DE9B6', color: '#fff'}}
                    icon={<FontAwesomeIcon icon={faUserGraduate} size="lg" fixedWidth/>}
                >
                    <h3 className="vertical-timeline-element-title">Master of Science</h3>
                    <h5 className="vertical-timeline-element-subtitle">Columbus State University, Columbus, GA</h5>
                    <b className="hr anim green"></b>
                    <p>
                        Studied <b><i> Applied Computer Science - Software Development</i></b> at Columbus
                        State
                        University.
                    </p>
                </VerticalTimelineElement>

                <VerticalTimelineElement
                    className="vertical-timeline-element--education"
                    contentStyle={
                        {
                            background: '#00B8D4AF',
                            color: '#fff',
                            boxShadow: '2px 3px 29px 7px rgba(0, 77, 89, 0.7)',
                            borderTop: '3px solid white',
                            borderRadius: '.7em'
                        }
                    }
                    contentArrowStyle={{borderRight: '7px solid #00B8D4AF'}}
                    date="August 2016 - May 2020"
                    iconStyle={{background: '#00B8D4', color: '#fff'}}
                    icon={<FontAwesomeIcon icon={faGraduationCap} size="lg" fixedWidth/>}
                >
                    <h3 className="vertical-timeline-element-title">Bachelor of Science</h3>
                    <h6 className="vertical-timeline-element-subtitle">Columbus State University, Columbus, GA</h6>
                    <b className="hr anim blue"></b>
                    <p>
                        Studied <b><i>Computer Science - Applied Computing</i></b> at Columbus State University.
                    </p>
                </VerticalTimelineElement>

                <VerticalTimelineElement
                    iconStyle={{background: 'rgb(16, 204, 82)', color: '#fff'}}
                    icon={<FontAwesomeIcon icon={faBaby} size="lg" fixedWidth/>}
                />
            </VerticalTimeline>
        );
    }
    return (
        <div id="timeline">
            <h1 className="text-center gradient-text-3 font-weight-bold">Life Timeline</h1>
            {body()}
        </div>
    );
};

export default TimeLine;