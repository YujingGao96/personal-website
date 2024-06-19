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
                            borderRadius: '1.2em',
                            backdropFilter: 'blur(2px)'
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
                            borderRadius: '1.2em',
                            backdropFilter: 'blur(2px)'
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
                        🕸 I carry a specialized expertise in crafting web services using J2EE and Websphere.
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
                            borderRadius: '1.2em',
                            backdropFilter: 'blur(2px)'
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
                        👨🏻‍🏫 Throughout this role, I honed my teaching and coaching skills, effectively guiding and
                        inspiring
                        students in the fields of science, technology, engineering, and mathematics.
                    </p>
                    <p>
                        📋 As a Graduate Assistant, I collaborated with professors to design and deliver engaging
                        instructional
                        materials, fostering a dynamic learning environment that encouraged active participation and
                        critical thinking among students.
                    </p>
                    <p>
                        🧭 Additionally, my role as a STEM Program Mentor allowed me to provide one-on-one support,
                        guiding
                        students through complex concepts, and nurturing their problem-solving abilities.
                    </p>
                    <p>
                        💪🏼 These experiences have not only strengthened my technical expertise but have also cultivated
                        my
                        communication skills, adaptability, and empathy in order to tailor my approach to each student's
                        unique learning style.
                    </p>
                    <p>
                        ⚡️ As I continue to grow in my career as a software developer, I am eager to apply these
                        invaluable
                        teaching and coaching skills to contribute effectively to any team and foster a culture of
                        continuous learning and development.
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
                            borderRadius: '1.2em',
                            backdropFilter: 'blur(2px)'
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
                        ⭐️ During my pursuit of a Master of Computer Science (Software Development track) degree at
                        Columbus State University, I have acquired a diverse and comprehensive skill set through a
                        rigorous curriculum that emphasized both theoretical knowledge and practical application.
                    </p>
                    <p>
                        📚 Relevant Courses:
                        <ul>
                            <li>Modeling and Simulation</li>
                            <li>Computer Language Design and Interpretation</li>
                            <li>Software Estimation and Measure</li>
                            <li>Object-Oriented Development with Components</li>
                            <li>Contemporary Issues In DB Management System</li>
                            <li>Data Visualization and Presentation</li>
                            <li>Software Design and Development</li>
                            <li>Introduction to Cyber-security</li>
                            <li>Mobile Systems & Applications</li>
                        </ul>
                    </p>
                    <p>
                        🏁 I am proud of my academic achievements and the diverse range of skills I have acquired
                        throughout my Master's program. These experiences have equipped me with a strong foundation to
                        excel as a software developer, capable of tackling complex challenges and contributing
                        effectively to the development of cutting-edge software solutions.
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
                            borderRadius: '1.2em',
                            backdropFilter: 'blur(2px)'
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
                        👨🏻‍🎓 During my pursuit of a Bachelor of Computer Science degree, I gained a solid foundation in
                        various fundamental areas of computer science. The program covered a wide range of essential
                        topics, enabling me to develop a comprehensive skill set as a software developer.
                    </p>
                    <p>
                        🔑 Key Areas of Study:
                        <ul>
                            <li>Object-Oriented Language and Design Patterns</li>
                            <li>Operating Systems</li>
                            <li>Computer Networks</li>
                            <li>Internet Programming and Web Development</li>
                            <li>Database Systems</li>
                            <li>Mobile Computing</li>
                            <li>etc.</li>
                        </ul>
                    </p>
                    <p>
                        🌈 My bachelor's degree in computer science has laid a solid groundwork for my continued growth
                        as a software developer, enabling me to adapt to diverse challenges and stay abreast of the latest
                        advancements in the ever-evolving field of computer science.
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
            <h1 className="text-center gradient-text-3 fw-bold">Life Timeline</h1>
            {body()}
        </div>
    );
};

export default TimeLine;