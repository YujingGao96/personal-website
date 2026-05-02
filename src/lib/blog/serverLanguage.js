import {cookies} from "next/headers";
import {BLOG_LANGUAGE_COOKIE, BLOG_LANGUAGE_PARAM, DEFAULT_BLOG_LANGUAGE, getSupportedBlogLanguage, normalizeBlogLanguage} from "./language";

export async function getBlogLanguageFromCookies() {
    const cookieStore = await cookies();
    const language = cookieStore.get(BLOG_LANGUAGE_COOKIE)?.value || DEFAULT_BLOG_LANGUAGE;

    return normalizeBlogLanguage(language);
}

function getSearchParam(searchParams, key) {
    if (!searchParams) {
        return "";
    }

    if (typeof searchParams.get === "function") {
        return searchParams.get(key) || "";
    }

    const value = searchParams[key];
    return Array.isArray(value) ? value[0] : value || "";
}

export async function resolveBlogLanguage(searchParams) {
    const resolvedSearchParams = await searchParams;
    const urlLanguage = getSupportedBlogLanguage(getSearchParam(resolvedSearchParams, BLOG_LANGUAGE_PARAM));

    if (urlLanguage) {
        return urlLanguage;
    }

    return getBlogLanguageFromCookies();
}
