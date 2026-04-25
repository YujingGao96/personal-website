import Link from "next/link";
import {redirect} from "next/navigation";
import MarkdownRenderer from "../../../components/blog/MarkdownRenderer";
import ViewTracker from "../../../components/blog/ViewTracker";
import {getPost} from "../../../lib/blog/blobStore";

export const revalidate = 3600;

const LABEL_COLORS = {
    "Cloud": "#3da8a6",
    "AWS": "#c4854a",
    "DevOps": "#4aad6e",
    "Kubernetes": "#7b6dd6",
    "TypeScript": "#4a8ec4",
    "Backend": "#4aad8e",
    "API": "#b3a04a",
    "Monitoring": "#5aad5a",
    "Rust": "#c47a4a",
    "Systems": "#a65aad",
    "Database": "#c46a4a",
    "React": "#4a7ec4",
    "Frontend": "#8a5ac4",
    "Reflections": "#c45a8a",
    "Product": "#b39a4a",
};

function getLabelColor(label) {
    return LABEL_COLORS[label] || "#68c5c3";
}

export async function generateMetadata({params}) {
    const {slug} = await params;
    const post = await getPost(slug);

    if (!post) {
        return {
            title: "Blog post not found | Yujing Gao",
        };
    }

    return {
        title: `${post.metadata.title} | Yujing Gao`,
        description: post.metadata.summary,
    };
}

export default async function BlogArticleRoute({params}) {
    const {slug} = await params;
    const post = await getPost(slug);

    if (!post) {
        redirect("/error/404");
    }

    const labels = post.metadata.labels || [];

    return (
        <main className="blog-article-shell">
            <ViewTracker slug={post.metadata.slug}/>
            <article className="blog-article">
                <Link href="/blog" className="blog-back-link">
                    &larr; Back to Blog
                </Link>

                {post.metadata.coverImageUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img className="blog-cover-image" src={post.metadata.coverImageUrl} alt=""/>
                )}

                <header className="blog-article-header">
                    {labels.length > 0 && (
                        <p className="blog-article-kicker">
                            {labels.join(" / ")}
                        </p>
                    )}
                    <h1>{post.metadata.title}</h1>

                    <div className="blog-article-meta">
                        <span>
                            {post.metadata.publishedAt
                                ? new Date(post.metadata.publishedAt).toLocaleDateString("en-US", {
                                    month: "long",
                                    day: "numeric",
                                    year: "numeric",
                                })
                                : "Draft"
                            }
                        </span>
                        <span className="meta-dot"/>
                        <span>{post.metadata.readingTime} min read</span>
                    </div>

                    {labels.length > 0 && (
                        <div className="blog-article-labels">
                            {labels.map((label) => {
                                const c = getLabelColor(label);
                                return (
                                    <span
                                        key={label}
                                        className="blog-article-label-pill"
                                        style={{
                                            background: `${c}1f`,
                                            border: `1px solid ${c}4d`,
                                            color: c,
                                        }}
                                    >
                                        {label}
                                    </span>
                                );
                            })}
                        </div>
                    )}

                    {post.metadata.summary && <p>{post.metadata.summary}</p>}
                </header>

                <hr className="blog-article-divider"/>

                <div className="blog-article-body">
                    <MarkdownRenderer content={post.content}/>
                </div>

                {labels.length > 0 && (
                    <footer className="blog-article-footer">
                        <div className="blog-article-footer-labels">
                            {labels.map((label) => {
                                const c = getLabelColor(label);
                                return (
                                    <span
                                        key={label}
                                        className="blog-article-label-pill"
                                        style={{
                                            background: `${c}1f`,
                                            border: `1px solid ${c}4d`,
                                            color: c,
                                        }}
                                    >
                                        {label}
                                    </span>
                                );
                            })}
                        </div>
                    </footer>
                )}
            </article>
        </main>
    );
}
