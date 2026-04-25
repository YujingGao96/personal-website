import {SignIn} from "@clerk/nextjs";
import {hasClerkConfig} from "../../../lib/blog/config";

export const metadata = {
    title: "Sign In | Yujing Gao",
};

export default function SignInRoute() {
    if (!hasClerkConfig()) {
        return (
            <main className="admin-blog-shell">
                <div className="admin-blog-inner">
                    <div className="admin-alert">
                        Clerk is not configured. Set `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY`.
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="admin-blog-shell">
            <div className="admin-blog-inner">
                <SignIn routing="path" path="/sign-in"/>
            </div>
        </main>
    );
}
