import {redirect} from "next/navigation";
import BlogEditor from "../../../../components/admin/BlogEditor";
import {getAdminAuth} from "../../../../lib/blog/auth";
import {hasBlobConfig, hasPublicBlobConfig} from "../../../../lib/blog/config";

export const metadata = {
    title: "New Blog Post | Yujing Gao",
};

export default async function NewBlogPostRoute() {
    const auth = await getAdminAuth();

    if (auth.reason === "signed-out") {
        redirect("/sign-in?redirect_url=/admin/blog/new");
    }

    if (!auth.ok) {
        redirect("/admin/blog");
    }

    return (
        <main className="admin-blog-shell">
            <div className="admin-blog-inner">
                <header className="admin-blog-header">
                    <h1>New Post</h1>
                </header>
                <BlogEditor blobConfigured={hasBlobConfig()} publicBlobConfigured={hasPublicBlobConfig()}/>
            </div>
        </main>
    );
}
