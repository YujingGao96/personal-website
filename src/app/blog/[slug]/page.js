import Link from "next/link";
import {redirect} from "next/navigation";
import BlogLanguageSelector from "../../../components/blog/BlogLanguageSelector";
import GeneratedBlogCover, {getBlogLabelColor} from "../../../components/blog/GeneratedBlogCover";
import MarkdownRenderer from "../../../components/blog/MarkdownRenderer";
import ViewTracker from "../../../components/blog/ViewTracker";
import {getPost} from "../../../lib/blog/blobStore";
import {getBlogCopy, getBlogLanguage, withBlogLanguage} from "../../../lib/blog/language";
import {resolveBlogLanguage} from "../../../lib/blog/serverLanguage";

export const revalidate = 3600;

export async function generateMetadata({params, searchParams}) {
    const {slug} = await params;
    const language = await resolveBlogLanguage(searchParams);
    const post = await getPost(slug, {language});

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

export default async function BlogArticleRoute({params, searchParams}) {
    const {slug} = await params;
    const language = await resolveBlogLanguage(searchParams);
    const copy = getBlogCopy(language);
    const locale = getBlogLanguage(language).locale;
    const post = await getPost(slug, {language});

    if (!post) {
        redirect("/error/404");
    }

    const labels = post.metadata.labels || [];

    return (
        <main className="blog-article-shell">
            <ViewTracker slug={post.metadata.slug}/>
            <article className="blog-article">
                <div className="blog-article-topbar">
                    <Link href={withBlogLanguage("/blog", language)} className="blog-back-link">
                        &larr; {copy.articleBack}
                    </Link>
                    <BlogLanguageSelector initialLanguage={language} compact/>
                </div>

                <GeneratedBlogCover post={post.metadata} className="blog-generated-cover"/>

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
                                ? new Date(post.metadata.publishedAt).toLocaleDateString(locale, {
                                    month: "long",
                                    day: "numeric",
                                    year: "numeric",
                                })
                                : copy.draft
                            }
                        </span>
                        <span className="meta-dot"/>
                        <span>{post.metadata.readingTime} {copy.minRead}</span>
                    </div>

                    {labels.length > 0 && (
                        <div className="blog-article-labels">
                            {labels.map((label) => {
                                const c = getBlogLabelColor(label);
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

                <div className="blog-article-body" lang={post.metadata.language === "zh" ? "zh-Hans" : "en"}>
                    <MarkdownRenderer content={post.content}/>
                </div>

                {labels.length > 0 && (
                    <footer className="blog-article-footer">
                        <div className="blog-article-footer-labels">
                            {labels.map((label) => {
                                const c = getBlogLabelColor(label);
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
