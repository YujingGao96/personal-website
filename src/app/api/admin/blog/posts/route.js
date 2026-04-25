import {revalidatePath} from "next/cache";
import {requireAdminResponse} from "../../../../../lib/blog/auth";
import {savePost} from "../../../../../lib/blog/blobStore";

export async function POST(request) {
    const adminError = await requireAdminResponse();

    if (adminError) {
        return adminError;
    }

    try {
        const body = await request.json();
        const post = await savePost({
            metadata: body.metadata,
            content: body.content,
            previousSlug: body.previousSlug,
        });

        revalidatePath("/");
        revalidatePath("/blog");
        revalidatePath(`/blog/${post.metadata.slug}`);
        revalidatePath("/admin/blog");

        return Response.json({post});
    } catch (error) {
        return Response.json({error: error.message || "Unable to save post."}, {status: 400});
    }
}
