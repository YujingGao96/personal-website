import matter from "gray-matter";

const WORDS_PER_MINUTE = 220;

export function slugify(value) {
    return String(value || "")
        .trim()
        .toLowerCase()
        .replace(/['"]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .slice(0, 80);
}

export function csvToList(value) {
    if (Array.isArray(value)) {
        return value.map((item) => String(item).trim()).filter(Boolean);
    }

    return String(value || "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
}

export function listToCsv(value) {
    return csvToList(value).join(", ");
}

export function calculateReadingTime(content) {
    const words = String(content || "")
        .replace(/```[\s\S]*?```/g, " ")
        .replace(/[^\w\s-]/g, " ")
        .trim()
        .split(/\s+/)
        .filter(Boolean);

    return Math.max(1, Math.ceil(words.length / WORDS_PER_MINUTE));
}

export function createSummary(content) {
    return String(content || "")
        .replace(/^#\s+.+$/gm, "")
        .replace(/!\[[^\]]*]\([^)]+\)/g, "")
        .replace(/\[[^\]]+]\(([^)]+)\)/g, "$1")
        .replace(/[`*_>#-]/g, "")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 180);
}

export function normalizePostMetadata(rawMetadata = {}, content = "") {
    const title = String(rawMetadata.title || "Untitled post").trim();
    const slug = slugify(rawMetadata.slug || title);
    const now = new Date().toISOString();

    return {
        title,
        slug,
        summary: String(rawMetadata.summary || createSummary(content)).trim(),
        labels: csvToList(rawMetadata.labels),
        keywords: csvToList(rawMetadata.keywords),
        status: rawMetadata.status === "published" ? "published" : "draft",
        publishedAt: rawMetadata.publishedAt || "",
        updatedAt: rawMetadata.updatedAt || now,
        coverImageUrl: String(rawMetadata.coverImageUrl || "").trim(),
        readingTime: Number(rawMetadata.readingTime) || calculateReadingTime(content),
    };
}

export function parsePostMarkdown(source, slugFallback = "") {
    const parsed = matter(source || "");
    const metadata = normalizePostMetadata(
        {...parsed.data, slug: parsed.data.slug || slugFallback},
        parsed.content,
    );

    return {
        metadata,
        content: parsed.content.trim(),
        raw: source,
    };
}

export function serializePostMarkdown(metadata, content) {
    const normalized = normalizePostMetadata(metadata, content);

    return matter.stringify(String(content || "").trim() + "\n", normalized);
}
