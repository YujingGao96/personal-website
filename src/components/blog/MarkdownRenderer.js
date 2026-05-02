import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import {Children, Fragment} from "react";

function renderDropCapParagraph(children) {
    const childArray = Children.toArray(children);
    const textIndex = childArray.findIndex((child) => typeof child === "string" && child.trim());

    if (textIndex === -1) {
        return <p>{children}</p>;
    }

    const text = childArray[textIndex];
    const leadingWhitespace = text.match(/^\s*/)?.[0] || "";
    const visibleText = text.slice(leadingWhitespace.length);
    const [firstCharacter, ...remainingCharacters] = Array.from(visibleText);
    const updatedChildren = [...childArray];

    updatedChildren[textIndex] = (
        <Fragment key="blog-dropcap">
            {leadingWhitespace}
            <span className="blog-dropcap" aria-hidden="true">{firstCharacter}</span>
            <span className="visually-hidden">{firstCharacter}</span>
            {remainingCharacters.join("")}
        </Fragment>
    );

    return <p className="blog-lead-paragraph">{updatedChildren}</p>;
}

function getFirstParagraphOffset(content) {
    const lines = String(content || "").split("\n");
    let offset = 0;

    for (const line of lines) {
        const firstVisibleIndex = line.search(/\S/);
        const trimmed = line.trim();

        if (!trimmed) {
            offset += line.length + 1;
            continue;
        }

        if (/^(#{1,6}\s|>|[-*+]\s|\d+\.\s|---+$|```)/.test(trimmed)) {
            offset += line.length + 1;
            continue;
        }

        return offset + Math.max(firstVisibleIndex, 0);
    }

    return -1;
}

export default function MarkdownRenderer({content}) {
    const firstParagraphOffset = getFirstParagraphOffset(content);
    const markdownComponents = {
        a: ({children, href}) => (
            <a href={href} target={href?.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                {children}
            </a>
        ),
        p: ({children, node}) => (
            node?.position?.start?.offset === firstParagraphOffset
                ? renderDropCapParagraph(children)
                : <p>{children}</p>
        ),
    };

    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={markdownComponents}
        >
            {content}
        </ReactMarkdown>
    );
}
