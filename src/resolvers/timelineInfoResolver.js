import {faBriefcase, faChalkboardTeacher, faLayerGroup, faUserGraduate} from "@fortawesome/free-solid-svg-icons";

export const timelineElements = [
    {
        className: "vertical-timeline-element--education",
        color: "orange",
        contentStyle: {
            background: '#ff6d00AF',
            boxShadow: '2px 3px 29px 7px rgba(79, 34, 0, 0.7)',
        },
        contentArrowStyle: { borderRight: '7px solid #ff6d00AF' },
        date: "January 2022 - Present",
        iconStyle: { background: '#FF6D00', color: '#fff' },
        icon: faLayerGroup,
        title: "Software Engineer Senior",
        subtitle: "Global Payments, Columbus, GA",
        description: [
            "☁️ During my tenure at TSYS (Global Payments) I played a crucial role in building a modern distributed payment platform using cloud services, primarily AWS.",
            "👨🏻‍💻 As part of the team, we embarked on an ambitious project to develop the entire financial control system and posting system from scratch, incorporating the business logic of the old legacy mainframe system.",
            "🛠️ Our primary focus was to create a auto-scalable, high-availability, resilient systems with self-healing capabilities and robust retry mechanisms. To achieve this, we utilized cutting-edge technologies such as Kafka, Airflow, Spark, Java with Spring, and a wide range of AWS services.",
            "💵 Together, we successfully built the Core Batch architecture, making significant strides in transforming the company's payment infrastructure."
        ]
    },
    {
        className: "vertical-timeline-element--education",
        color: "red",
        contentStyle: {
            background: '#FF1744AF',
            boxShadow: '2px 3px 29px 7px rgba(79, 6, 21, 0.7)',
        },
        contentArrowStyle: { borderRight: '7px solid #FF1744AF' },
        date: "April 2021 - December 2021",
        iconStyle: { background: '#FF1744', color: '#fff' },
        icon: faBriefcase,
        title: "IT Apprenticeship",
        subtitle: "Aflac, Columbus, GA",
        description: [
            "🕸 I carry a specialized expertise in crafting web services using J2EE and Websphere.",
            "💾 I have had the privilege to significantly participate in the transformation of legacy mainframe software, originally in COBOL, into more contemporary and robust Java applications.",
            "🧪 In an effort to streamline our processes, I architected an advanced parallel integration testing framework leveraging Postman and web services.",
            "✅ This framework has played a pivotal role in enhancing our software quality assurance measures, even exceeding the performance of pre-existing testing frameworks such as JUnit.",
            "💡 I am eager to apply and expand my competencies and insights in future projects and opportunities."
        ]
    },
    {
        className: "vertical-timeline-element--work",
        color: "lime",
        contentStyle: {
            background: '#AEEA00AF',
            boxShadow: '2px 3px 29px 7px rgba(50, 66, 0, 0.7)',
        },
        contentArrowStyle: { borderRight: '7px solid #AEEA00AF' },
        date: "August 2020 - August 2021",
        iconStyle: { background: '#AEEA00', color: '#fff' },
        icon: faChalkboardTeacher,
        title: "Graduate Assistance / STEM Mentor",
        subtitle: "Columbus State University, Columbus, GA",
        description: [
            "👨🏻‍🏫 Throughout this role, I honed my teaching and coaching skills, effectively guiding and inspiring students in the fields of science, technology, engineering, and mathematics.",
            "📋 As a Graduate Assistant, I collaborated with professors to design and deliver engaging instructional materials, fostering a dynamic learning environment that encouraged active participation and critical thinking among students.",
            "🧭 Additionally, my role as a STEM Program Mentor allowed me to provide one-on-one support, guiding students through complex concepts, and nurturing their problem-solving abilities.",
            "💪🏼 These experiences have not only strengthened my technical expertise but have also cultivated my communication skills, adaptability, and empathy in order to tailor my approach to each student's unique learning style.",
            "⚡️ As I continue to grow in my career as a software developer, I am eager to apply these invaluable teaching and coaching skills to contribute effectively to any team and foster a culture of continuous learning and development."
        ]
    },
    {
        className: "vertical-timeline-element--education",
        color: "green",
        contentStyle: {
            background: '#1DE9B6AF',
            boxShadow: '2px 3px 29px 7px rgba(8, 64, 50, 0.7)',
        },
        contentArrowStyle: { borderRight: '7px solid #1DE9B6AF' },
        date: "August 2016 - August 2021",
        iconStyle: { background: '#1DE9B6', color: '#fff' },
        icon: faUserGraduate,
        title: "Bachelor & Master of Science",
        subtitle: "Columbus State University, Columbus, GA",
        description: [
            "⭐️ During my pursuit of a Master of Computer Science (Software Development track) degree at Columbus State University, I have acquired a diverse and comprehensive skill set through a rigorous curriculum that emphasized both theoretical knowledge and practical application.",
            "🏁 I am proud of my academic achievements and the diverse range of skills I have acquired throughout my Master's program. These experiences have equipped me with a strong foundation to excel as a software developer, capable of tackling complex challenges and contributing effectively to the development of cutting-edge software solutions.",
            "👨🏻‍🎓 During my pursuit of a Bachelor of Computer Science degree, I gained a solid foundation in various fundamental areas of computer science. The program covered a wide range of essential topics, enabling me to develop a comprehensive skill set as a software developer.",
            "🌈 My bachelor's degree in computer science has laid a solid groundwork for my continued growth as a software developer, enabling me to adapt to diverse challenges and stay abreast of the latest advancements in the ever-evolving field of computer science."
        ]
    }
];
