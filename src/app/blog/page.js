import BlogIndexSearch from "../../components/blog/BlogIndexSearch";
import {getAllPosts} from "../../lib/blog/blobStore";
import {getBlogCopy} from "../../lib/blog/language";
import {resolveBlogLanguage} from "../../lib/blog/serverLanguage";

export const metadata = {
    title: "Blog | Yujing Gao",
    description: "Technical notes and essays by Yujing Gao.",
};

export const revalidate = 3600;

export default async function BlogIndexRoute({searchParams}) {
    const language = await resolveBlogLanguage(searchParams);
    const copy = getBlogCopy(language);
    const posts = await getAllPosts({language});

    return (
        <main className="blog-page-shell">
            <section className="blog-page-header">
                <p>{copy.blogEyebrow}</p>
                <h1>{copy.blogIndexTitle}</h1>
                <span>{copy.blogDescription}</span>
            </section>
            <BlogIndexSearch posts={posts} language={language}/>
        </main>
    );
}
