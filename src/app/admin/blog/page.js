import Link from "next/link";
import {redirect} from "next/navigation";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import AdminPostDeleteButton from "../../../components/admin/AdminPostDeleteButton";
import {getAdminAuth} from "../../../lib/blog/auth";
import {getAllPosts} from "../../../lib/blog/blobStore";
import {hasBlobConfig} from "../../../lib/blog/config";

export const metadata = {
    title: "Blog Admin | Yujing Gao",
};

export default async function AdminBlogRoute() {
    const auth = await getAdminAuth();

    if (auth.reason === "signed-out") {
        redirect("/sign-in?redirect_url=/admin/blog");
    }

    if (!auth.ok) {
        return (
            <main className="admin-blog-shell">
                <div className="admin-blog-inner">
                    <div className="admin-alert">
                        {auth.reason === "unconfigured"
                            ? "Admin auth is not configured. Set Clerk keys and ADMIN_EMAILS before using the CMS."
                            : "You are signed in, but your email is not listed in ADMIN_EMAILS."}
                    </div>
                </div>
            </main>
        );
    }

    const posts = await getAllPosts({includeDrafts: true});

    return (
        <main className="admin-blog-shell">
            <div className="admin-blog-inner">
                <header className="admin-blog-header">
                    <div>
                        <p>CMS</p>
                        <h1>Blog Admin</h1>
                        <span>Write Markdown posts, manage labels, and publish when ready.</span>
                    </div>
                    <Link href="/admin/blog/new">
                        <FontAwesomeIcon icon={faPlus}/>
                        New Post
                    </Link>
                </header>
                {!hasBlobConfig() && (
                    <div className="admin-alert">
                        Set `BLOB_READ_WRITE_TOKEN` to read and save posts from Vercel Blob.
                    </div>
                )}
                <div className="admin-post-list">
                    {posts.map((post) => (
                        <article className="admin-post-row" key={post.slug}>
                            <Link className="admin-post-row-link" href={`/admin/blog/${post.slug}`}>
                                <span>{post.status}</span>
                                <h2>{post.title}</h2>
                                <p>{post.summary}</p>
                            </Link>
                            <AdminPostDeleteButton slug={post.slug} title={post.title} status={post.status}/>
                        </article>
                    ))}
                    {posts.length === 0 && (
                        <div className="admin-post-row">
                            <span>No posts yet</span>
                            <h2>Create your first post</h2>
                            <p>Imported or newly written posts will appear here.</p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
