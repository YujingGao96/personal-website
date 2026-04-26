import {redirect} from "next/navigation";
import BlogEditor from "../../../../components/admin/BlogEditor";
import {getAdminAuth} from "../../../../lib/blog/auth";
import {getAllPosts} from "../../../../lib/blog/blobStore";
import {hasBlobConfig, hasPublicBlobConfig} from "../../../../lib/blog/config";

export const metadata = {
    title: "New Blog Post | Yujing Gao",
};

function getAvailableLabels(posts) {
    return Array.from(new Set(posts.flatMap((post) => post.labels || []))).sort();
}

export default async function NewBlogPostRoute() {
    const auth = await getAdminAuth();

    if (auth.reason === "signed-out") {
        redirect("/sign-in?redirect_url=/admin/blog/new");
    }

    if (!auth.ok) {
        redirect("/admin/blog");
    }

    const posts = await getAllPosts({includeDrafts: true});

    return (
        <main className="admin-blog-shell">
            <div className="admin-blog-inner">
                <header className="admin-blog-header">
                    <div>
                        <p>Editor</p>
                        <h1>New Post</h1>
                    </div>
                </header>
                <BlogEditor
                    blobConfigured={hasBlobConfig()}
                    publicBlobConfigured={hasPublicBlobConfig()}
                    availableLabels={getAvailableLabels(posts)}
                />
            </div>
        </main>
    );
}
