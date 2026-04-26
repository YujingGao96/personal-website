import {revalidatePath} from "next/cache";
import {requireAdminResponse} from "../../../../../../lib/blog/auth";
import {deletePost} from "../../../../../../lib/blog/blobStore";
import {slugify} from "../../../../../../lib/blog/markdown";

export async function DELETE(_request, {params}) {
    const adminError = await requireAdminResponse();

    if (adminError) {
        return adminError;
    }

    const {slug} = await params;
    const safeSlug = slugify(slug);

    try {
        await deletePost(safeSlug);
        revalidatePath("/");
        revalidatePath("/blog");
        revalidatePath(`/blog/${safeSlug}`);
        revalidatePath("/admin/blog");
        revalidatePath(`/admin/blog/${safeSlug}`);

        return Response.json({deleted: true});
    } catch (error) {
        return Response.json({error: error.message || "Unable to delete post."}, {status: 400});
    }
}
