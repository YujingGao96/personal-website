import {notFound, redirect} from "next/navigation";
import BlogEditor from "../../../../components/admin/BlogEditor";
import {getAdminAuth} from "../../../../lib/blog/auth";
import {getPost} from "../../../../lib/blog/blobStore";
import {hasBlobConfig, hasPublicBlobConfig} from "../../../../lib/blog/config";

export const metadata = {
    title: "Edit Blog Post | Yujing Gao",
};

export default async function EditBlogPostRoute({params}) {
    const auth = await getAdminAuth();

    if (auth.reason === "signed-out") {
        redirect("/sign-in?redirect_url=/admin/blog");
    }

    if (!auth.ok) {
        redirect("/admin/blog");
    }

    const {slug} = await params;
    const post = await getPost(slug, {includeDrafts: true});

    if (!post) {
        notFound();
    }

    return (
        <main className="admin-blog-shell">
            <div className="admin-blog-inner">
                <header className="admin-blog-header">
                    <h1>Edit Post</h1>
                </header>
                <BlogEditor post={post} blobConfigured={hasBlobConfig()} publicBlobConfigured={hasPublicBlobConfig()}/>
            </div>
        </main>
    );
}
