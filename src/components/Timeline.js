import React from "react";
import {VerticalTimeline, VerticalTimelineElement} from 'react-vertical-timeline-component';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBriefcase,
    faUserGraduate,
    faGraduationCap,
    faSchool,
    faGlobeAsia,
    faBaby
} from "@fortawesome/free-solid-svg-icons";
import 'react-vertical-timeline-component/style.min.css';

const TimeLine = () => {
    const body = () => {
        return (
            <VerticalTimeline className="mt-5">
                <VerticalTimelineElement
                    className="vertical-timeline-element--education"
                    contentStyle={
                        {
                            background: '#FF1744AF',
                            color: '#fff',
                            boxShadow: '2px 3px 29px 7px rgba(79, 6, 21, 0.7)',
                            borderTop: '3px solid white',
                            borderRadius : '.7em'
                        }
                    }
                    contentArrowStyle={{borderRight: '7px solid #FF1744AF'}}
                    date="April 2021 - Present"
                    iconStyle={{background: '#FF1744', color: '#fff'}}
                    icon={<FontAwesomeIcon icon={faGlobeAsia} size="lg" fixedWidth/>}
                >
                    <h3 className="vertical-timeline-element-title">IT Apprenticeship</h3>
                    <h5 className="vertical-timeline-element-subtitle">Columbus, GA</h5>
                    <p>
                        Work on modernizing legacy mainframe applications.
                        Designed and implemented the web services workflow using SOA principle and micro-services approach.
                        Developed a test harness framework for code quality assurance.
                        Also applied Agile SCRUM approaches to the team to help others commit to their work and deliver their work on time.

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
                            borderRadius : '.7em'
                        }
                    }
                    contentArrowStyle={{borderRight: '7px solid #AEEA00AF'}}
                    date="August 2020 - August 2021"
                    iconStyle={{background: '#AEEA00', color: '#fff'}}
                    icon={<FontAwesomeIcon icon={faBriefcase} size="lg" fixedWidth/>}
                >
                    <h3 className="vertical-timeline-element-title">Graduate Assistance / STEM Mentor</h3>
                    <h5 className="vertical-timeline-element-subtitle">Columbus, GA</h5>
                    <p>
                        While studying at Columbus State University, I worked as a graduate assistance and a STEM program
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
                            borderRadius : '.7em'
                        }
                    }
                    contentArrowStyle={{borderRight: '7px solid #1DE9B6AF'}}
                    date="August 2020 - August 2021"
                    iconStyle={{background: '#1DE9B6', color: '#fff'}}
                    icon={<FontAwesomeIcon icon={faUserGraduate} size="lg" fixedWidth/>}
                >
                    <h3 className="vertical-timeline-element-title">Master of Science</h3>
                    <h5 className="vertical-timeline-element-subtitle">Columbus, GA</h5>
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
                            borderRadius : '.7em'
                        }
                    }
                    contentArrowStyle={{borderRight: '7px solid #00B8D4AF'}}
                    date="August 2016 - May 2020"
                    iconStyle={{background: '#00B8D4', color: '#fff'}}
                    icon={<FontAwesomeIcon icon={faGraduationCap} size="lg" fixedWidth/>}
                >
                    <h3 className="vertical-timeline-element-title">Bachelor of Science</h3>
                    <h5 className="vertical-timeline-element-subtitle">Columbus, GA</h5>
                    <p>
                        Studied <b><i>Computer Science - Applied Computing</i></b> at Columbus State University.
                    </p>
                </VerticalTimelineElement>

                <VerticalTimelineElement
                    className="vertical-timeline-element--education"
                    contentStyle={
                        {
                            background: '#ff6d00AF',
                            color: '#fff',
                            boxShadow: '2px 3px 29px 7px rgba(79, 34, 0, 0.7)',
                            borderTop: '3px solid white',
                            borderRadius : '.7em'
                        }
                    }
                    contentArrowStyle={{borderRight: '7px solid #ff6d00AF'}}
                    date="August 2015 - May 2016"
                    iconStyle={{background: '#FF6D00', color: '#fff'}}
                    icon={<FontAwesomeIcon icon={faSchool} size="lg" fixedWidth/>}
                >
                    <h3 className="vertical-timeline-element-title">High School Diploma</h3>
                    <h5 className="vertical-timeline-element-subtitle">Columbus, GA</h5>
                    <p>
                        Graduated from Shaw High School where I started learning how to code.
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