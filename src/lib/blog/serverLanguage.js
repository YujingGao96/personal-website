import {cookies} from "next/headers";
import {BLOG_LANGUAGE_COOKIE, DEFAULT_BLOG_LANGUAGE, normalizeBlogLanguage} from "./language";

export async function getBlogLanguageFromCookies() {
    const cookieStore = await cookies();
    const language = cookieStore.get(BLOG_LANGUAGE_COOKIE)?.value || DEFAULT_BLOG_LANGUAGE;

    return normalizeBlogLanguage(language);
}
