import matter from "gray-matter";
import {put} from "@vercel/blob";
import {readFileSync} from "node:fs";

function loadLocalEnv(path = ".env.local") {
    try {
        const lines = readFileSync(path, "utf8").split(/\r?\n/);

        for (const line of lines) {
            const trimmed = line.trim();

            if (!trimmed || trimmed.startsWith("#")) {
                continue;
            }

            const match = trimmed.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);

            if (!match) {
                continue;
            }

            const [, key, rawValue] = match;
            const value = rawValue.replace(/^['"]|['"]$/g, "");

            if (process.env[key] === undefined) {
                process.env[key] = value;
            }
        }
    } catch (error) {
        if (error.code !== "ENOENT") {
            throw error;
        }
    }
}

loadLocalEnv();

const BLOG_CONTENT_BLOB_TOKEN = process.env.BLOG_CONTENT_BLOB_READ_WRITE_TOKEN
    || process.env.BLOG_CONTENT_READ_WRITE_TOKEN
    || process.env.BLOB_READ_WRITE_TOKEN;
const BLOG_PUBLIC_BLOB_TOKEN = process.env.BLOG_PUBLIC_BLOB_READ_WRITE_TOKEN
    || process.env.BLOG_PUBLIC_READ_WRITE_TOKEN
    || process.env.BLOB_READ_WRITE_TOKEN;
const BLOG_API_BASE_URL = "https://a27345r7f9.execute-api.us-east-1.amazonaws.com/Prod/blog";
const BLOG_IDS_TO_IMPORT = [
    "Route-53-b1ffd1121bfb4bdc985f056de7fae69d",
    "S3-b6cb17180e264dd59df770b231eabe66",
    "EC2-7baf0c12d78a44f2ad6d18a03241ea13",
    "Blog-Achitecture-Design-1b888f784bf74a639f19c511acd75340",
];

function slugify(value) {
    return String(value || "")
        .trim()
        .toLowerCase()
        .replace(/['"]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .slice(0, 80);
}

function plainText(value) {
    return (value || [])
        .map(([text]) => text)
        .join("")
        .trim();
}

function richText(value) {
    return (value || [])
        .map(([text, annotations = []]) => {
            let output = text;

            for (const annotation of annotations) {
                const [type, data] = annotation;

                if (type === "a") {
                    output = `[${output}](${data})`;
                }

                if (type === "b") {
                    output = `**${output}**`;
                }

                if (type === "i") {
                    output = `_${output}_`;
                }

                if (type === "c") {
                    output = `\`${output}\``;
                }
            }

            return output;
        })
        .join("")
        .trim();
}

function calculateReadingTime(content) {
    const words = String(content || "")
        .replace(/```[\s\S]*?```/g, " ")
        .replace(/[^\w\s-]/g, " ")
        .trim()
        .split(/\s+/)
        .filter(Boolean);

    return Math.max(1, Math.ceil(words.length / 220));
}

function createSummary(content) {
    return String(content || "")
        .replace(/^#\s+.+$/gm, "")
        .replace(/!\[[^\]]*]\([^)]+\)/g, "")
        .replace(/\[[^\]]+]\(([^)]+)\)/g, "$1")
        .replace(/[`*_>#-]/g, "")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 180);
}

function getBlocks(recordMap) {
    return Object.fromEntries(
        Object.entries(recordMap.block || {})
            .filter(([, block]) => block?.value)
            .map(([id, block]) => [id, block.value]),
    );
}

async function imageToMarkdown(block, recordMap, title) {
    const source = block.format?.display_source || block.properties?.source?.[0]?.[0];
    const signedSource = recordMap.signed_urls?.[source] || source;

    if (!signedSource) {
        return "";
    }

    try {
        const response = await fetch(signedSource);

        if (!response.ok) {
            return "";
        }

        const contentType = response.headers.get("content-type") || "image/jpeg";
        const extension = contentType.split("/").pop()?.split(";")[0] || "jpg";
        const blob = await put(`blog/assets/imported/${Date.now()}-${slugify(title)}.${extension}`, await response.blob(), {
            access: "public",
            addRandomSuffix: true,
            contentType,
            token: BLOG_PUBLIC_BLOB_TOKEN,
        });

        return `![${title}](${blob.url})`;
    } catch {
        return "";
    }
}

async function blockToMarkdown(blockId, blocks, recordMap, depth = 0) {
    const block = blocks[blockId];

    if (!block) {
        return "";
    }

    const text = richText(block.properties?.title);
    let current = "";

    if (block.type === "header") {
        current = `## ${text}`;
    } else if (block.type === "sub_header") {
        current = `### ${text}`;
    } else if (block.type === "sub_sub_header") {
        current = `#### ${text}`;
    } else if (block.type === "bulleted_list") {
        current = `${"  ".repeat(depth)}- ${text}`;
    } else if (block.type === "numbered_list") {
        current = `${"  ".repeat(depth)}1. ${text}`;
    } else if (block.type === "quote" || block.type === "callout") {
        current = `> ${text}`;
    } else if (block.type === "code") {
        const language = block.properties?.language?.[0]?.[0] || "";
        current = `\`\`\`${language}\n${plainText(block.properties?.title)}\n\`\`\``;
    } else if (block.type === "divider") {
        current = "---";
    } else if (block.type === "image") {
        current = await imageToMarkdown(block, recordMap, text || "blog-image");
    } else if (block.type === "text") {
        current = text;
    }

    const children = [];

    for (const childId of block.content || []) {
        const child = await blockToMarkdown(childId, blocks, recordMap, block.type?.includes("list") ? depth + 1 : depth);

        if (child) {
            children.push(child);
        }
    }

    return [current, ...children].filter(Boolean).join("\n\n");
}

async function importPost(sourceId) {
    const response = await fetch(`${BLOG_API_BASE_URL}/${encodeURIComponent(sourceId)}`);

    if (!response.ok) {
        throw new Error(`Failed to fetch ${sourceId}: ${response.status}`);
    }

    const recordMap = await response.json();
    const blocks = getBlocks(recordMap);
    const page = Object.values(blocks).find((block) => block.type === "page");
    const title = plainText(page?.properties?.title) || sourceId.split("-").slice(0, -1).join(" ");
    const slug = slugify(title);
    const parts = [];

    for (const childId of page?.content || []) {
        const child = await blockToMarkdown(childId, blocks, recordMap);

        if (child) {
            parts.push(child);
        }
    }

    const content = parts.join("\n\n").trim();
    const metadata = {
        title,
        slug,
        summary: createSummary(content),
        labels: [],
        keywords: [],
        status: "draft",
        publishedAt: "",
        updatedAt: new Date().toISOString(),
        coverImageUrl: "",
        readingTime: calculateReadingTime(content),
    };
    const markdown = matter.stringify(content + "\n", metadata);

    await put(`blog/posts/${slug}.md`, markdown, {
        access: "private",
        allowOverwrite: true,
        contentType: "text/markdown; charset=utf-8",
        cacheControlMaxAge: 60,
        token: BLOG_CONTENT_BLOB_TOKEN,
    });

    return metadata;
}

async function main() {
    if (!BLOG_CONTENT_BLOB_TOKEN || !BLOG_PUBLIC_BLOB_TOKEN) {
        throw new Error("Set BLOB_READ_WRITE_TOKEN and BLOG_PUBLIC_READ_WRITE_TOKEN before importing posts.");
    }

    const posts = [];

    for (const sourceId of BLOG_IDS_TO_IMPORT) {
        const post = await importPost(sourceId);
        posts.push(post);
        console.log(`Imported draft: ${post.title} -> ${post.slug}`);
    }

    await put("blog/index.json", JSON.stringify({
        version: 1,
        updatedAt: new Date().toISOString(),
        posts,
    }, null, 2) + "\n", {
        access: "private",
        allowOverwrite: true,
        contentType: "application/json; charset=utf-8",
        cacheControlMaxAge: 60,
        token: BLOG_CONTENT_BLOB_TOKEN,
    });

    console.log(`Imported ${posts.length} draft posts.`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
