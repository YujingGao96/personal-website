import {recordPostView} from "../../../../lib/blog/popularity";
import {slugify} from "../../../../lib/blog/markdown";

export async function POST(request) {
    try {
        const body = await request.json();
        const slug = slugify(body.slug);

        if (!slug) {
            return Response.json({tracked: false}, {status: 400});
        }

        const result = await recordPostView(slug);

        return Response.json(result);
    } catch {
        return Response.json({tracked: false}, {status: 400});
    }
}
