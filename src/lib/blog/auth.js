import {currentUser} from "@clerk/nextjs/server";
import {getAdminEmails, hasClerkConfig} from "./config";

export async function getAdminAuth() {
    if (!hasClerkConfig()) {
        return {
            ok: false,
            reason: "unconfigured",
            user: null,
        };
    }

    const user = await currentUser();

    if (!user) {
        return {
            ok: false,
            reason: "signed-out",
            user: null,
        };
    }

    const adminEmails = getAdminEmails();
    const userEmails = user.emailAddresses
        .map((email) => email.emailAddress.toLowerCase())
        .filter(Boolean);
    const isAdmin = adminEmails.some((email) => userEmails.includes(email));

    return {
        ok: isAdmin,
        reason: isAdmin ? "admin" : "forbidden",
        user,
    };
}

export async function requireAdminResponse() {
    const auth = await getAdminAuth();

    if (auth.ok) {
        return null;
    }

    const message = auth.reason === "unconfigured"
        ? "Admin auth is not configured. Set Clerk keys and ADMIN_EMAILS."
        : "You are not allowed to manage blog posts.";

    return Response.json({error: message}, {status: auth.reason === "signed-out" ? 401 : 403});
}
