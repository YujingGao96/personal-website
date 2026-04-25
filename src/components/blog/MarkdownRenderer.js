import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";

const markdownComponents = {
    a: ({children, href}) => (
        <a href={href} target={href?.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
            {children}
        </a>
    ),
};

export default function MarkdownRenderer({content}) {
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
