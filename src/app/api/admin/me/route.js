import {getAdminAuth} from "../../../../lib/blog/auth";

export const dynamic = "force-dynamic";

export async function GET() {
    const auth = await getAdminAuth();

    return Response.json(
        {isAdmin: auth.ok},
        {headers: {"Cache-Control": "no-store"}}
    );
}
