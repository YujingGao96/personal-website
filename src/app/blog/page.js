import BlogIndexSearch from "../../components/blog/BlogIndexSearch";
import {getAllPosts} from "../../lib/blog/blobStore";

export const metadata = {
    title: "Blog | Yujing Gao",
    description: "Technical notes and essays by Yujing Gao.",
};

export const revalidate = 3600;

export default async function BlogIndexRoute() {
    const posts = await getAllPosts();

    return (
        <main className="blog-page-shell">
            <section className="blog-page-header">
                <p>Writing</p>
                <h1>Blog</h1>
                <span>Notes on software, cloud systems, and the things I am learning.</span>
            </section>
            <BlogIndexSearch posts={posts}/>
        </main>
    );
}
