export const BLOG_INDEX_PATH = "blog/index.json";
export const BLOG_POSTS_PREFIX = "blog/posts/";
export const BLOG_ASSETS_PREFIX = "blog/assets/";
export const BLOG_CONTENT_ACCESS = "private";
export const BLOG_PUBLIC_STATUS = "published";
export const POPULAR_POST_WINDOW_DAYS = 30;
export const VIEW_COUNTER_TTL_DAYS = 120;

export function hasBlobConfig() {
    return Boolean(getContentBlobToken());
}

export function hasPublicBlobConfig() {
    return Boolean(getPublicBlobToken());
}

export function getContentBlobToken() {
    return process.env.BLOG_CONTENT_BLOB_READ_WRITE_TOKEN
        || process.env.BLOG_CONTENT_READ_WRITE_TOKEN
        || process.env.BLOB_READ_WRITE_TOKEN
        || "";
}

export function getPublicBlobToken() {
    return process.env.BLOG_PUBLIC_BLOB_READ_WRITE_TOKEN
        || process.env.BLOG_PUBLIC_READ_WRITE_TOKEN
        || process.env.BLOB_READ_WRITE_TOKEN
        || "";
}

export function hasRedisConfig() {
    return Boolean(getRedisUrl() && getRedisToken());
}

export function getRedisUrl() {
    return process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL || "";
}

export function getRedisToken() {
    return process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN || "";
}

export function hasClerkConfig() {
    return Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && process.env.CLERK_SECRET_KEY);
}

export function getAdminEmails() {
    return String(process.env.ADMIN_EMAILS || "")
        .split(",")
        .map((email) => email.trim().toLowerCase())
        .filter(Boolean);
}
