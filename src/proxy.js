import {clerkMiddleware} from "@clerk/nextjs/server";
import {NextResponse} from "next/server";
import {hasClerkConfig} from "./lib/blog/config";

const clerkBaseMiddleware = clerkMiddleware();

export default function proxy(request, event) {
    if (!hasClerkConfig()) {
        return NextResponse.next();
    }

    return clerkBaseMiddleware(request, event);
}

export const config = {
    matcher: [
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        "/(api|trpc)(.*)",
    ],
};
