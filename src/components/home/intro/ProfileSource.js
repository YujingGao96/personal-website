import LiveAge from "./LiveAge";
import {DEFAULT_BLOG_LANGUAGE} from "../../../lib/blog/language";
import {getHomeCopy} from "../../../lib/home/content";
import "./ProfileSource.css";

function SourceLine({number, indent = 0, children}) {
    return (
        <span className="profile-source-line">
            <span className="profile-source-number" aria-hidden="true">{number}</span>
            <span className="profile-source-text" style={{"--source-indent": indent}}>{children}</span>
        </span>
    );
}

function Token({type, children}) {
    return <span className={`profile-source-${type}`}>{children}</span>;
}

function SourceString({children}) {
    return <Token type="string">&quot;{children}&quot;</Token>;
}

function SourceDate({date}) {
    return (
        <>
            <Token type="class">LocalDate</Token>.<Token type="method">of</Token>(
            {date.map((value, index) => (
                <span key={index}>{index > 0 ? ", " : ""}<Token type="value">{value}</Token></span>
            ))})
        </>
    );
}

export default function ProfileSource({language = DEFAULT_BLOG_LANGUAGE}) {
    const copy = getHomeCopy(language);
    const profile = copy.code;

    return (
        <pre className="profile-source" role="region" aria-label={copy.profileBuilderCode} tabIndex={0}>
            <code>
                <SourceLine number={1}><Token type="class">PersonBuilder</Token></SourceLine>
                <SourceLine number={2} indent={1}>.<Token type="method">setName</Token>(<SourceString>{profile.name}</SourceString>)</SourceLine>
                <SourceLine number={3} indent={1}>.<Token type="method">setAge</Token>(<LiveAge/>)</SourceLine>
                <SourceLine number={4} indent={1}>.<Token type="method">setGender</Token>(<Token type="class">Gender</Token>.<Token type="value">{profile.gender}</Token>)</SourceLine>
                <SourceLine number={5} indent={1}>.<Token type="method">setJob</Token>(<SourceString>{profile.currentJobTitle}</SourceString>)</SourceLine>
                <SourceLine number={6} indent={1}>.<Token type="method">addInterests</Token>(</SourceLine>
                <SourceLine number={7} indent={2}>
                    <Token type="class">List</Token>.<Token type="method">of</Token>(
                    {profile.interests.map((interest, index) => (
                        <span key={interest}>{index > 0 ? ", " : ""}<SourceString>{interest}</SourceString></span>
                    ))})
                </SourceLine>
                <SourceLine number={8} indent={1}>)</SourceLine>
                <SourceLine number={9} indent={1}>.<Token type="method">addEducation</Token>(</SourceLine>
                <SourceLine number={10} indent={2}>
                    <Token type="keyword">new</Token> <Token type="class">Degree</Token>(<SourceString>{profile.bachelorDegree}</SourceString>, <SourceString>{profile.school}</SourceString>, <SourceDate date={profile.bachelorDate}/>),
                </SourceLine>
                <SourceLine number={11} indent={2}>
                    <Token type="keyword">new</Token> <Token type="class">Degree</Token>(<SourceString>{profile.masterDegree}</SourceString>, <SourceString>{profile.school}</SourceString>, <SourceDate date={profile.masterDate}/>),
                </SourceLine>
                <SourceLine number={12} indent={2}>
                    <Token type="class">Degree</Token>.<Token type="method">inProgress</Token>(<SourceString>{profile.omscsDegree}</SourceString>, <SourceString>{profile.omscsSchool}</SourceString>)
                </SourceLine>
                <SourceLine number={13} indent={1}>)</SourceLine>
                <SourceLine number={14} indent={1}>.<Token type="method">build</Token>();</SourceLine>
            </code>
        </pre>
    );
}
