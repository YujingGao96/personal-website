import matter from "gray-matter";
import {DEFAULT_BLOG_LANGUAGE, normalizeBlogLanguage} from "./language";

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
    const normalized = String(content || "")
        .replace(/```[\s\S]*?```/g, " ")
        .trim();
    const cjkCharacters = normalized.match(/[\u3400-\u9fff]/g)?.length || 0;
    const latinWords = normalized
        .replace(/[\u3400-\u9fff]/g, " ")
        .replace(/[^\w\s-]/g, " ")
        .trim()
        .split(/\s+/)
        .filter(Boolean);
    const estimatedWords = latinWords.length + Math.ceil(cjkCharacters / 2);

    return Math.max(1, Math.ceil(estimatedWords / WORDS_PER_MINUTE));
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

function normalizeTranslationMetadata(rawTranslation = {}, fallbackMetadata, content = "") {
    const translation = rawTranslation && typeof rawTranslation === "object" ? rawTranslation : {};

    return {
        title: String(translation.title || fallbackMetadata.title).trim(),
        summary: String(translation.summary || createSummary(content)).trim(),
        labels: csvToList(translation.labels || fallbackMetadata.labels),
        keywords: csvToList(translation.keywords || fallbackMetadata.keywords),
        readingTime: Number(translation.readingTime) || calculateReadingTime(content),
    };
}

export function normalizePostMetadata(rawMetadata = {}, content = "", contentByLanguage = null) {
    const title = String(rawMetadata.title || "Untitled post").trim();
    const slug = slugify(rawMetadata.slug || title);
    const now = new Date().toISOString();
    const fallbackMetadata = {
        title,
        labels: csvToList(rawMetadata.labels),
        keywords: csvToList(rawMetadata.keywords),
    };
    const localizedContent = contentByLanguage && typeof contentByLanguage === "object"
        ? contentByLanguage
        : {};
    const translations = {};
    const rawTranslations = rawMetadata.translations && typeof rawMetadata.translations === "object"
        ? rawMetadata.translations
        : {};

    for (const [rawLanguage, rawTranslation] of Object.entries(rawTranslations)) {
        const language = normalizeBlogLanguage(rawLanguage);

        if (language === DEFAULT_BLOG_LANGUAGE) {
            continue;
        }

        translations[language] = normalizeTranslationMetadata(
            rawTranslation,
            fallbackMetadata,
            localizedContent[language] || content,
        );
    }

    for (const [rawLanguage, languageContent] of Object.entries(localizedContent)) {
        const language = normalizeBlogLanguage(rawLanguage);

        if (language === DEFAULT_BLOG_LANGUAGE || translations[language]) {
            continue;
        }

        translations[language] = normalizeTranslationMetadata(
            {},
            fallbackMetadata,
            languageContent,
        );
    }

    const availableLanguages = Array.from(new Set([
        DEFAULT_BLOG_LANGUAGE,
        ...Object.keys(localizedContent).map(normalizeBlogLanguage),
        ...Object.keys(translations).map(normalizeBlogLanguage),
    ]));

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
        translations,
        availableLanguages,
    };
}

export function parseLocalizedContent(content) {
    const source = String(content || "").trim();
    const marker = /^<!--\s*blog-language:\s*([a-zA-Z-]+)\s*-->\s*$/gm;
    const matches = [...source.matchAll(marker)];

    if (!matches.length) {
        return {
            [DEFAULT_BLOG_LANGUAGE]: source,
        };
    }

    const sections = {};

    matches.forEach((match, index) => {
        const language = normalizeBlogLanguage(match[1]);
        const start = match.index + match[0].length;
        const end = index + 1 < matches.length ? matches[index + 1].index : source.length;
        const sectionContent = source.slice(start, end).trim();

        if (sectionContent) {
            sections[language] = sectionContent;
        }
    });

    return sections;
}

export function localizePostMetadata(metadata, language = DEFAULT_BLOG_LANGUAGE) {
    const requestedLanguage = normalizeBlogLanguage(language);
    const translation = requestedLanguage === DEFAULT_BLOG_LANGUAGE
        ? null
        : metadata.translations?.[requestedLanguage];

    return {
        ...metadata,
        ...(translation || {}),
        slug: metadata.slug,
        status: metadata.status,
        publishedAt: metadata.publishedAt,
        updatedAt: metadata.updatedAt,
        coverImageUrl: metadata.coverImageUrl,
        translations: metadata.translations || {},
        availableLanguages: metadata.availableLanguages || [DEFAULT_BLOG_LANGUAGE],
        language: translation ? requestedLanguage : DEFAULT_BLOG_LANGUAGE,
        requestedLanguage,
    };
}

export function localizePost(post, language = DEFAULT_BLOG_LANGUAGE) {
    const requestedLanguage = normalizeBlogLanguage(language);
    const localizedMetadata = localizePostMetadata(post.metadata, requestedLanguage);
    const contentByLanguage = post.contentByLanguage || {};
    const content = contentByLanguage[requestedLanguage] || post.content;
    const contentLanguage = contentByLanguage[requestedLanguage]
        ? requestedLanguage
        : DEFAULT_BLOG_LANGUAGE;

    return {
        ...post,
        metadata: {
            ...localizedMetadata,
            language: contentLanguage,
        },
        content,
    };
}

export function parsePostMarkdown(source, slugFallback = "") {
    const parsed = matter(source || "");
    const contentByLanguage = parseLocalizedContent(parsed.content);
    const content = contentByLanguage[DEFAULT_BLOG_LANGUAGE]
        || Object.values(contentByLanguage)[0]
        || "";
    const metadata = normalizePostMetadata(
        {...parsed.data, slug: parsed.data.slug || slugFallback},
        content,
        contentByLanguage,
    );

    return {
        metadata,
        content,
        contentByLanguage,
        raw: source,
    };
}

export function serializePostMarkdown(metadata, content) {
    const normalized = normalizePostMetadata(metadata, content);

    return matter.stringify(String(content || "").trim() + "\n", normalized);
}
