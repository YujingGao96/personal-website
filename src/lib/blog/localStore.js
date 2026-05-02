import {readdir, readFile} from "node:fs/promises";
import path from "node:path";
import {BLOG_PUBLIC_STATUS} from "./config";
import {parsePostMarkdown, slugify} from "./markdown";

const LOCAL_BLOG_DIR = path.join(process.cwd(), "src/content/blog");

async function getLocalMarkdownFiles() {
    try {
        const files = await readdir(LOCAL_BLOG_DIR);
        return files.filter((file) => file.endsWith(".md"));
    } catch {
        return [];
    }
}

async function readLocalPostFile(file) {
    const source = await readFile(path.join(LOCAL_BLOG_DIR, file), "utf8");
    const fallbackSlug = file.replace(/\.md$/, "");

    return parsePostMarkdown(source, fallbackSlug);
}

export async function getLocalPosts({includeDrafts = false} = {}) {
    const files = await getLocalMarkdownFiles();
    const posts = [];

    for (const file of files) {
        const post = await readLocalPostFile(file);

        if (includeDrafts || post.metadata.status === BLOG_PUBLIC_STATUS) {
            posts.push(post.metadata);
        }
    }

    return posts;
}

export async function getLocalPost(slug, {includeDrafts = false} = {}) {
    const safeSlug = slugify(slug);

    if (!safeSlug) {
        return null;
    }

    const files = await getLocalMarkdownFiles();

    for (const file of files) {
        const post = await readLocalPostFile(file);

        if (post.metadata.slug !== safeSlug) {
            continue;
        }

        return includeDrafts || post.metadata.status === BLOG_PUBLIC_STATUS ? post : null;
    }

    return null;
}
