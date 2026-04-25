import {requireAdminResponse} from "../../../../../lib/blog/auth";
import {uploadBlogAsset} from "../../../../../lib/blog/blobStore";

const MAX_UPLOAD_SIZE = 4.5 * 1024 * 1024;

export async function POST(request) {
    const adminError = await requireAdminResponse();

    if (adminError) {
        return adminError;
    }

    try {
        const formData = await request.formData();
        const file = formData.get("file");

        if (!file || typeof file === "string") {
            return Response.json({error: "No file uploaded."}, {status: 400});
        }

        if (file.size > MAX_UPLOAD_SIZE) {
            return Response.json({error: "Image must be smaller than 4.5 MB for server upload."}, {status: 400});
        }

        if (!file.type.startsWith("image/")) {
            return Response.json({error: "Only image uploads are supported."}, {status: 400});
        }

        const blob = await uploadBlogAsset(file);

        return Response.json({url: blob.url, pathname: blob.pathname});
    } catch (error) {
        return Response.json({error: error.message || "Unable to upload image."}, {status: 400});
    }
}
