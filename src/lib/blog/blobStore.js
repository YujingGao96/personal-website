import {del, get, list, put} from "@vercel/blob";
import {
    BLOG_ASSETS_PREFIX,
    BLOG_CONTENT_ACCESS,
    BLOG_INDEX_PATH,
    BLOG_POSTS_PREFIX,
    BLOG_PUBLIC_STATUS,
    getContentBlobToken,
    getPublicBlobToken,
    hasBlobConfig,
    hasPublicBlobConfig,
} from "./config";
import {normalizePostMetadata, parsePostMarkdown, serializePostMarkdown, slugify} from "./markdown";

const emptyIndex = {
    version: 1,
    updatedAt: "",
    posts: [],
};

async function streamToText(stream) {
    if (!stream) {
        return "";
    }

    return new Response(stream).text();
}

function assertBlobConfigured() {
    if (!hasBlobConfig()) {
        throw new Error("BLOB_READ_WRITE_TOKEN is required to manage blog content.");
    }
}

function assertPublicBlobConfigured() {
    if (!hasPublicBlobConfig()) {
        throw new Error("BLOG_PUBLIC_READ_WRITE_TOKEN is required to upload blog assets.");
    }
}

function getPostPath(slug) {
    return `${BLOG_POSTS_PREFIX}${slug}.md`;
}

async function readTextBlob(path) {
    assertBlobConfigured();

    const result = await get(path, {
        access: BLOG_CONTENT_ACCESS,
        useCache: false,
        token: getContentBlobToken(),
    });

    if (!result || result.statusCode !== 200) {
        return null;
    }

    return streamToText(result.stream);
}

async function writeTextBlob(path, body, contentType = "text/plain; charset=utf-8") {
    assertBlobConfigured();

    return put(path, body, {
        access: BLOG_CONTENT_ACCESS,
        allowOverwrite: true,
        contentType,
        cacheControlMaxAge: 60,
        token: getContentBlobToken(),
    });
}

export async function getBlogIndex({includeDrafts = false} = {}) {
    if (!hasBlobConfig()) {
        return emptyIndex;
    }

    try {
        const text = await readTextBlob(BLOG_INDEX_PATH);
        const index = text ? JSON.parse(text) : emptyIndex;
        const posts = Array.isArray(index.posts) ? index.posts : [];

        return {
            ...emptyIndex,
            ...index,
            posts: includeDrafts ? posts : posts.filter((post) => post.status === BLOG_PUBLIC_STATUS),
        };
    } catch {
        return emptyIndex;
    }
}

export async function getAllPosts({includeDrafts = false} = {}) {
    const index = await getBlogIndex({includeDrafts});

    return [...index.posts].sort((a, b) => {
        const aDate = a.publishedAt || a.updatedAt || "";
        const bDate = b.publishedAt || b.updatedAt || "";

        return bDate.localeCompare(aDate);
    });
}

export async function getPost(slug, {includeDrafts = false} = {}) {
    const safeSlug = slugify(slug);

    if (!safeSlug || !hasBlobConfig()) {
        return null;
    }

    const text = await readTextBlob(getPostPath(safeSlug));

    if (!text) {
        return null;
    }

    const post = parsePostMarkdown(text, safeSlug);

    if (!includeDrafts && post.metadata.status !== BLOG_PUBLIC_STATUS) {
        return null;
    }

    return post;
}

async function regenerateIndexFromBlobs() {
    assertBlobConfigured();

    const result = await list({prefix: BLOG_POSTS_PREFIX, limit: 1000, token: getContentBlobToken()});
    const posts = [];

    for (const blob of result.blobs) {
        if (!blob.pathname.endsWith(".md")) {
            continue;
        }

        const source = await readTextBlob(blob.pathname);

        if (!source) {
            continue;
        }

        const fallbackSlug = blob.pathname.replace(BLOG_POSTS_PREFIX, "").replace(/\.md$/, "");
        const post = parsePostMarkdown(source, fallbackSlug);
        posts.push(post.metadata);
    }

    const index = {
        version: 1,
        updatedAt: new Date().toISOString(),
        posts: posts.sort((a, b) => (b.publishedAt || b.updatedAt || "").localeCompare(a.publishedAt || a.updatedAt || "")),
    };

    await writeTextBlob(BLOG_INDEX_PATH, JSON.stringify(index, null, 2) + "\n", "application/json; charset=utf-8");

    return index;
}

export async function savePost({metadata, content, previousSlug = ""}) {
    assertBlobConfigured();

    const now = new Date().toISOString();
    const normalized = normalizePostMetadata(
        {
            ...metadata,
            slug: slugify(metadata.slug || metadata.title),
            updatedAt: now,
            publishedAt: metadata.status === BLOG_PUBLIC_STATUS ? (metadata.publishedAt || now) : "",
        },
        content,
    );

    const markdown = serializePostMarkdown(normalized, content);
    await writeTextBlob(getPostPath(normalized.slug), markdown);

    const safePreviousSlug = slugify(previousSlug);

    if (safePreviousSlug && safePreviousSlug !== normalized.slug) {
        await del(getPostPath(safePreviousSlug), {token: getContentBlobToken()}).catch(() => undefined);
    }

    await regenerateIndexFromBlobs();

    return {
        metadata: normalized,
        content,
    };
}

export async function deletePost(slug) {
    assertBlobConfigured();

    const safeSlug = slugify(slug);

    if (!safeSlug) {
        return;
    }

    await del(getPostPath(safeSlug), {token: getContentBlobToken()});
    await regenerateIndexFromBlobs();
}

export async function uploadBlogAsset(file) {
    assertPublicBlobConfigured();

    const extension = file.name.includes(".") ? file.name.split(".").pop() : "bin";
    const baseName = slugify(file.name.replace(/\.[^.]+$/, "")) || "asset";
    const pathname = `${BLOG_ASSETS_PREFIX}${Date.now()}-${baseName}.${extension}`;

    return put(pathname, file, {
        access: "public",
        addRandomSuffix: true,
        contentType: file.type || undefined,
        token: getPublicBlobToken(),
    });
}
