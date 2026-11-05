import {SignUp} from "@clerk/nextjs";
import {hasClerkConfig} from "../../../lib/blog/config";
import {AuthFormSkeleton} from "../../../components/common/PageSkeletons";

export const metadata = {
    title: "Sign Up | Yujing Gao",
};

export default function SignUpRoute() {
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
                <SignUp routing="path" path="/sign-up" fallback={<AuthFormSkeleton/>}/>
            </div>
        </main>
    );
}
