import {faAward, faBriefcase, faChalkboardTeacher, faLayerGroup, faMicrochip, faUserGraduate} from "@fortawesome/free-solid-svg-icons";
import {DEFAULT_BLOG_LANGUAGE, normalizeBlogLanguage} from "../blog/language";

const HOME_COPY = {
    en: {
        navCurrent: "(current)",
        navToggle: "Toggle navigation",
        navAbout: "About",
        navBlogs: "Blogs",
        navTimeline: "Timeline",
        navProjects: "Projects",
        navCompliments: "Compliments",

        authAccount: "Account",
        authAdmin: "Admin",
        authCloseSignIn: "Close sign-in dialog",
        authSignIn: "Sign in",
        authSignOut: "Sign Out",
        authSignedInAs: (email) => `Signed in as ${email || "user"}`,

        profileEyebrow: "Profile",
        profileTitle: "About Me",
        profileJobTitle: "Software Engineer Senior",
        profileBuilderActions: "Profile builder actions",
        profileBuilderCode: "Profile builder code",
        openProfileBuilderFile: "Open file ProfileBuilder.java",
        gitControls: "Git controls",
        branches: "Branches",
        changedLines: (count) => `${count} changed lines`,
        gitStatusChanged: "setJob() updated",
        gitStatusCommitted: "commit 9f3c2a1",
        gitStatusPushed: (branch) => `Pushed 9f3c2a1 to origin/${branch}`,
        ideActions: {
            run: "Run",
            debug: "Debug",
            reset: "Reset",
            commit: "Commit",
            push: "Push",
        },
        consoleMessages: {
            run: "Run complete: ProfileBuilder emitted a procedural avatar from the code graph.",
            debug: "Debugger isolated a logic artifact near addInterests(); inspecting the signal.",
            branch: (branch) => `Checked out ${branch}. Editor chrome updated.`,
            committed: "Committed 9f3c2a1: build person profile.",
            pushed: (branch) => `Commit 9f3c2a1 successfully pushed into remote origin/${branch}.`,
            dirty: "Working tree changed: setJob upgraded from II to Senior.",
        },
        code: {
            previousJobTitle: "Software Engineer II",
            currentJobTitle: "Software Engineer Senior",
            interests: ["Coding", "Gym"],
            bachelorDegree: "B.S. in Computer Science",
            masterDegree: "M.S. in Computer Science",
            school: "CSU, Columbus, GA",
            bachelorDate: "May 15th, 2020",
            masterDate: "Aug 4th, 2021",
        },

        timelineEyebrow: "Life Journey",
        timelineTitle: "Timeline",
        timelineAria: "Career and education timeline",
        timelineTypes: {
            work: "Work",
            education: "Education",
            teaching: "Teaching",
            award: "Milestone",
            fallback: "Event",
        },

        projectsEyebrow: "Selected Work",
        projectsTitle: "Personal Projects",
        projectExplore: "Explore Project",

        complimentsEyebrow: "Kind Words",
        complimentsTitle: "Compliments",
        complimentsAria: "Scrollable compliments",

        footerCopyright: (year) => `Copyright © Yujing Gao ${year}. All Rights Reserved`,
        footerMade: "Made with ♥ in Columbus, GA, USA",
    },
    zh: {
        navCurrent: "（当前）",
        navToggle: "切换导航",
        navAbout: "关于",
        navBlogs: "博客",
        navTimeline: "时间线",
        navProjects: "项目",
        navCompliments: "评价",

        authAccount: "账户",
        authAdmin: "管理",
        authCloseSignIn: "关闭登录窗口",
        authSignIn: "登录",
        authSignOut: "退出登录",
        authSignedInAs: (email) => `已登录：${email || "用户"}`,

        profileEyebrow: "个人资料",
        profileTitle: "关于我",
        profileJobTitle: "高级软件工程师",
        profileBuilderActions: "个人资料构建器操作",
        profileBuilderCode: "个人资料构建器代码",
        openProfileBuilderFile: "打开文件 ProfileBuilder.java",
        gitControls: "Git 控件",
        branches: "分支",
        changedLines: (count) => `${count} 行变更`,
        gitStatusChanged: "setJob() 已更新",
        gitStatusCommitted: "commit 9f3c2a1",
        gitStatusPushed: (branch) => `已推送 9f3c2a1 到 origin/${branch}`,
        ideActions: {
            run: "运行",
            debug: "调试",
            reset: "重置",
            commit: "提交",
            push: "推送",
        },
        consoleMessages: {
            run: "运行完成：ProfileBuilder 已从代码图谱生成程序化头像。",
            debug: "调试器在 addInterests() 附近定位到逻辑信号，正在检查。",
            branch: (branch) => `已切换到 ${branch}。编辑器界面已更新。`,
            committed: "已提交 9f3c2a1：构建个人资料。",
            pushed: (branch) => `提交 9f3c2a1 已成功推送到远端 origin/${branch}。`,
            dirty: "工作区已变更：setJob 从 II 升级为 Senior。",
        },
        code: {
            previousJobTitle: "Software Engineer II",
            currentJobTitle: "高级软件工程师",
            interests: ["编程", "健身"],
            bachelorDegree: "计算机科学学士",
            masterDegree: "计算机科学硕士",
            school: "哥伦布州立大学，佐治亚州哥伦布",
            bachelorDate: "2020 年 5 月 15 日",
            masterDate: "2021 年 8 月 4 日",
        },

        timelineEyebrow: "人生轨迹",
        timelineTitle: "时间线",
        timelineAria: "职业和教育时间线",
        timelineTypes: {
            work: "工作",
            education: "教育",
            teaching: "教学",
            award: "里程碑",
            fallback: "事件",
        },

        projectsEyebrow: "精选作品",
        projectsTitle: "个人项目",
        projectExplore: "查看项目",

        complimentsEyebrow: "他人评价",
        complimentsTitle: "推荐语",
        complimentsAria: "可横向滚动的推荐语",

        footerCopyright: (year) => `版权所有 © Yujing Gao ${year}。保留所有权利`,
        footerMade: "用心制作于美国佐治亚州哥伦布",
    },
};

const TIMELINE_ELEMENTS = [
    {
        id: "fis-clearing-settlement",
        type: "work",
        title: "Software Engineer Senior",
        organization: "FIS",
        location: "Jacksonville, FL",
        period: "Jan 2026 - Present",
        icon: faMicrochip,
        hue: 194,
        summary: "Designing resilient clearing and settlement systems for high-volume transaction processing.",
        bullets: [
            "Fault-tolerant workflows for clearing and settlement",
            "Large transaction datasets modeled and processed with Spark",
            "Batch reliability patterns similar to Global Payments core processing",
            "Failure recovery, replay, and operational visibility for payment flows",
        ],
        tags: ["FIS", "Spark", "Settlement", "Reliability"],
        translations: {
            zh: {
                title: "高级软件工程师",
                location: "佛罗里达州杰克逊维尔",
                period: "2026 年 1 月 - 至今",
                summary: "为高并发交易处理设计可靠的清算与结算系统。",
                bullets: [
                    "面向清算与结算的容错工作流",
                    "使用 Spark 建模和处理大规模交易数据",
                    "类似 Global Payments 核心处理的批量可靠性模式",
                    "面向支付流程的失败恢复、重放和运营可观测性",
                ],
                tags: ["FIS", "Spark", "结算", "可靠性"],
            },
        },
    },
    {
        id: "georgia-tech-omscs",
        type: "education",
        title: "M.S. Computer Science",
        organization: "Georgia Tech",
        location: "Online",
        period: "Jan 2026 - Dec 2027",
        icon: faUserGraduate,
        hue: 48,
        summary: "Pursuing a second CS master's with a machine learning focus.",
        bullets: [
            "Semester starts Jan 2026",
            "Studying machine learning and applied AI systems",
            "Building stronger CS theory depth alongside production experience",
            "Expected graduation Dec 2027",
        ],
        tags: ["Georgia Tech", "ML", "CS"],
        translations: {
            zh: {
                title: "计算机科学硕士",
                location: "在线",
                period: "2026 年 1 月 - 2027 年 12 月",
                summary: "攻读第二个计算机科学硕士学位，方向聚焦机器学习。",
                bullets: [
                    "课程于 2026 年 1 月开始",
                    "学习机器学习与应用 AI 系统",
                    "在生产经验之外补强计算机科学理论深度",
                    "预计 2027 年 12 月毕业",
                ],
                tags: ["Georgia Tech", "机器学习", "计算机科学"],
            },
        },
    },
    {
        id: "global-payments-core-batch",
        type: "work",
        title: "Software Engineer Senior",
        organization: "Global Payments",
        location: "Columbus, GA",
        period: "Jan 2022 - Jan 2026",
        icon: faLayerGroup,
        hue: 24,
        summary: "Built modern payment platforms that moved core batch processing beyond legacy mainframes.",
        bullets: [
            "Distributed payment processing services on AWS",
            "Kafka, Airflow, Spark, and Java Spring for core batch architecture",
            "Posting and financial control logic rebuilt from legacy behavior",
            "Self-healing retries, observability, and fault-tolerant job orchestration",
        ],
        tags: ["AWS", "Kafka", "Spark", "Java"],
        translations: {
            zh: {
                title: "高级软件工程师",
                location: "佐治亚州哥伦布",
                period: "2022 年 1 月 - 2026 年 1 月",
                summary: "构建现代支付平台，将核心批处理能力从传统大型机体系中推进出来。",
                bullets: [
                    "基于 AWS 的分布式支付处理服务",
                    "使用 Kafka、Airflow、Spark 和 Java Spring 搭建核心批处理架构",
                    "从遗留行为中重建入账与财务控制逻辑",
                    "自愈重试、可观测性和容错任务编排",
                ],
            },
        },
    },
    {
        id: "aflac-apprenticeship",
        type: "work",
        title: "IT Apprenticeship",
        organization: "Aflac",
        location: "Columbus, GA",
        period: "Apr 2021 - Dec 2021",
        icon: faBriefcase,
        hue: 348,
        summary: "Built enterprise Java services and learned legacy modernization from the inside.",
        bullets: [
            "J2EE and WebSphere services for enterprise integrations",
            "Mainframe modernization patterns from COBOL-era systems",
            "Parallel API testing workflows for faster validation",
            "Early foundation in production Java and service reliability",
        ],
        tags: ["Java", "J2EE", "WebSphere"],
        translations: {
            zh: {
                title: "IT 学徒",
                location: "佐治亚州哥伦布",
                period: "2021 年 4 月 - 2021 年 12 月",
                summary: "构建企业 Java 服务，并从内部理解遗留系统现代化。",
                bullets: [
                    "面向企业集成的 J2EE 与 WebSphere 服务",
                    "来自 COBOL 时代系统的大型机现代化模式",
                    "提升验证效率的并行 API 测试流程",
                    "生产级 Java 与服务可靠性的早期基础",
                ],
            },
        },
    },
    {
        id: "csu-stem-mentor",
        type: "teaching",
        title: "Graduate Assistant",
        organization: "Columbus State University",
        location: "Columbus, GA",
        period: "Aug 2020 - Aug 2021",
        icon: faChalkboardTeacher,
        hue: 92,
        summary: "Mentored STEM students while sharpening communication and coaching skills.",
        bullets: [
            "Course support, tutoring, and lab guidance",
            "One-on-one mentoring for STEM students",
            "Teaching through problem solving instead of memorization",
            "Clearer technical communication through repeated coaching",
        ],
        tags: ["Mentoring", "STEM", "Teaching"],
        translations: {
            zh: {
                title: "研究生助教",
                organization: "哥伦布州立大学",
                location: "佐治亚州哥伦布",
                period: "2020 年 8 月 - 2021 年 8 月",
                summary: "指导 STEM 学生，同时打磨沟通与辅导能力。",
                bullets: [
                    "课程支持、辅导和实验室指导",
                    "为 STEM 学生提供一对一辅导",
                    "通过解决问题来教学，而不是靠死记硬背",
                    "在重复辅导中提升清晰的技术沟通能力",
                ],
                tags: ["辅导", "STEM", "教学"],
            },
        },
    },
    {
        id: "csu-degrees",
        type: "education",
        title: "B.S. and M.S. Computer Science",
        organization: "Columbus State University",
        location: "Columbus, GA",
        period: "Aug 2016 - Aug 2021",
        icon: faUserGraduate,
        hue: 162,
        summary: "Built the foundation for software engineering, systems, and applied CS work.",
        bullets: [
            "Software development graduate track",
            "Systems, algorithms, databases, and application design",
            "Undergraduate and graduate CS foundation",
            "Project-heavy coursework that shaped practical engineering habits",
        ],
        tags: ["CS", "Software", "Systems"],
        translations: {
            zh: {
                title: "计算机科学本科与硕士",
                organization: "哥伦布州立大学",
                location: "佐治亚州哥伦布",
                period: "2016 年 8 月 - 2021 年 8 月",
                summary: "建立软件工程、系统和应用计算机科学工作的基础。",
                bullets: [
                    "软件开发方向研究生课程",
                    "系统、算法、数据库与应用设计",
                    "本科与研究生阶段的计算机科学基础",
                    "大量项目课程塑造了务实的工程习惯",
                ],
                tags: ["计算机科学", "软件", "系统"],
            },
        },
    },
    {
        id: "ieee-southeastcon",
        type: "award",
        title: "IEEE SoutheastCon",
        organization: "Published Research",
        location: "Huntsville, AL",
        period: "Spring 2019",
        icon: faAward,
        hue: 288,
        summary: "Published NFC-based multi-factor authentication research.",
        bullets: [
            "Mobile HCE authentication with NFC",
            "AES-backed Windows login prototype",
            "pGina integration for custom authentication flow",
            "Research presented through IEEE SoutheastCon",
        ],
        tags: ["Security", "NFC", "Android", "IEEE"],
        translations: {
            zh: {
                organization: "已发表研究",
                location: "阿拉巴马州亨茨维尔",
                period: "2019 年春季",
                summary: "发表基于 NFC 的多因素认证研究。",
                bullets: [
                    "基于 NFC 的移动端 HCE 认证",
                    "使用 AES 的 Windows 登录原型",
                    "面向自定义认证流程的 pGina 集成",
                    "研究发表于 IEEE SoutheastCon",
                ],
                tags: ["安全", "NFC", "Android", "IEEE"],
            },
        },
    },
];

const PROJECTS = [
    {
        title: "IEEE SoutheastCon",
        addr: "Huntsville, Alabama",
        date: "Spring 2019",
        text: "Published paper on 2019 IEEE SoutheastCon entitled Multi-Factor Stateful Authentication using NFC and Mobile Phones. The project implemented a Windows Authentication System using technologies like AES Encryption, pGina, and Android Host-based Card Emulation.",
        link: "https://ieeexplore.ieee.org/abstract/document/9020559",
        tags: ["Security", "NFC", "Android", "AES", "Java"],
        hue: 220,
        hue2: 260,
        translations: {
            zh: {
                addr: "阿拉巴马州亨茨维尔",
                date: "2019 年春季",
                text: "在 2019 IEEE SoutheastCon 发表论文《Multi-Factor Stateful Authentication using NFC and Mobile Phones》。项目实现了一个 Windows 认证系统，使用 AES 加密、pGina 和 Android Host-based Card Emulation 等技术。",
                tags: ["安全", "NFC", "Android", "AES", "Java"],
            },
        },
    },
    {
        title: "China Cafe Restaurant",
        addr: "Columbus, Georgia",
        date: "Summer 2020",
        text: "Help a local family-owned business design and implement online menu system. The system allows customers to place an order online and restaurant owner will get notified by email. Frameworks like React and Redux are used for handling large and complex menu dataset.",
        link: "https://menu-brown.vercel.app/",
        tags: ["React", "Redux", "Node.js", "Firebase"],
        hue: 150,
        hue2: 190,
        translations: {
            zh: {
                title: "China Cafe 餐厅",
                addr: "佐治亚州哥伦布",
                date: "2020 年夏季",
                text: "帮助本地家庭经营餐厅设计并实现在线菜单系统。顾客可以在线下单，店主会通过邮件收到通知。项目使用 React 和 Redux 处理较大且复杂的菜单数据。",
            },
        },
    },
    {
        title: "Master the Mainframe",
        addr: "IBM",
        date: "Fall 2019",
        text: "Participated in the 2019 Master the Mainframe competition hosted by IBM and was recognized as 2019 Global Part 2 Winners and Part 3 Finishers. Through this experience, I gained knowledge of various mainframe programming languages, including Mainframe Assembler, JCL, and COBOL.",
        link: "https://www.youracclaim.com/users/yujing-gao.6c962a4d",
        tags: ["COBOL", "JCL", "Assembler", "IBM"],
        hue: 35,
        hue2: 20,
        translations: {
            zh: {
                date: "2019 年秋季",
                text: "参加 IBM 主办的 2019 Master the Mainframe 比赛，并获得 2019 Global Part 2 Winners 和 Part 3 Finishers 认可。通过这段经历，我学习了多种大型机编程语言，包括 Mainframe Assembler、JCL 和 COBOL。",
            },
        },
    },
];

const COMPLIMENTS = [
    {
        name: "Lee Holmes",
        title: "Vice President",
        company: "FIS",
        quote: "Thank you for guiding and mentoring our interns. With your coaching, they have accomplished great things. I am genuinely grateful for all your wisdom and advice that you have shared with all our team members, including our interns.",
        translations: {
            zh: {
                title: "副总裁",
                quote: "感谢你指导和辅导我们的实习生。在你的帮助下，他们完成了很棒的成果。我真心感谢你与团队成员，包括实习生，分享的智慧和建议。",
            },
        },
    },
    {
        name: "Larry Cline",
        title: "Manager",
        company: "Midland Farmers Market",
        quote: "I am beyond grateful for your dedication to this project to make it right. I would be happy to help if you ever need a letter of recommendation, as I'm sure any employer would be pleased to know what kind of a person he's considering.",
        translations: {
            zh: {
                title: "经理",
                quote: "我非常感谢你为把这个项目做好所付出的投入。如果你之后需要推荐信，我很愿意帮忙，因为我相信任何雇主都会很高兴了解他正在考虑的是怎样的人。",
            },
        },
    },
    {
        name: "Rebecca Hagues",
        title: "ESOL Teacher",
        company: "Shaw High School",
        quote: "Yujing, I am so incredibly proud of you! Your hard work and determination to succeed inspire everyone around you! I am genuinely excited and eager to see the amazing things you will accomplish in the future. Keep being awesome!",
        translations: {
            zh: {
                title: "ESOL 教师",
                quote: "Yujing，我真的为你感到无比骄傲！你的努力和成功的决心激励着身边的每一个人！我真心期待看到你未来会完成的精彩事情。继续保持出色！",
            },
        },
    },
    {
        name: "Rania Hodhod",
        title: "Assistant CS Professor",
        company: "Columbus State University",
        quote: "I want to express my heartfelt gratitude to you for generously offering your time and expertise to support our student, as it will undoubtedly have a significant impact on the professional development of our CS and IT students.",
        translations: {
            zh: {
                title: "计算机科学助理教授",
                company: "哥伦布州立大学",
                quote: "我想真诚感谢你慷慨地投入时间和专业能力来支持我们的学生。这无疑会对计算机科学和 IT 学生的职业发展产生重要影响。",
            },
        },
    },
    {
        name: "Shamim Khan",
        title: "Professor & Chair of CS Department",
        company: "Columbus State University",
        quote: "Your work demonstrates a wonderful example of interdisciplinary work that we always aspire for. This speaks volumes about the calibre of our faculty and students. We won't miss an opportunity to brag about this achievement.",
        translations: {
            zh: {
                title: "教授兼计算机科学系主任",
                company: "哥伦布州立大学",
                quote: "你的工作展示了我们一直追求的跨学科合作范例。这充分体现了我们师生的水准。我们不会错过任何机会去分享这项成就。",
            },
        },
    },
];

function localizeItem(item, language) {
    const code = normalizeBlogLanguage(language);
    const translation = code === DEFAULT_BLOG_LANGUAGE ? null : item.translations?.[code];
    const {translations, ...base} = item;

    return {
        ...base,
        ...(translation || {}),
    };
}

export function getHomeCopy(language = DEFAULT_BLOG_LANGUAGE) {
    return HOME_COPY[normalizeBlogLanguage(language)] || HOME_COPY[DEFAULT_BLOG_LANGUAGE];
}

export function getTimelineElements(language = DEFAULT_BLOG_LANGUAGE) {
    return TIMELINE_ELEMENTS.map((item) => localizeItem(item, language));
}

export function getProjects(language = DEFAULT_BLOG_LANGUAGE) {
    return PROJECTS.map((item) => localizeItem(item, language));
}

export function getCompliments(language = DEFAULT_BLOG_LANGUAGE) {
    return COMPLIMENTS.map((item) => localizeItem(item, language));
}
