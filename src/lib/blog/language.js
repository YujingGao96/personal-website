export const DEFAULT_BLOG_LANGUAGE = "en";
export const BLOG_LANGUAGE_COOKIE = "blog-language";
export const BLOG_LANGUAGE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;
export const BLOG_LANGUAGE_EVENT = "blog-language-change";
export const BLOG_LANGUAGE_PARAM = "lang";

export const BLOG_LANGUAGES = [
    {code: "en", label: "English", shortLabel: "EN", locale: "en-US"},
    {code: "zh", label: "简体中文", shortLabel: "中", locale: "zh-CN"},
];

const LANGUAGE_ALIASES = {
    cn: "zh",
    chinese: "zh",
    "zh-cn": "zh",
    "zh-hans": "zh",
    "zh-sg": "zh",
};

const COPY = {
    en: {
        articleBack: "Back to Blog",
        blogDescription: "Notes on software, cloud systems, and the things I am learning.",
        blogEyebrow: "Random Thoughts",
        blogIndexTitle: "Blog",
        blogLanguage: "Language",
        clearFiltersHint: "Try a different keyword or clear the filters",
        cursorFxOff: "Cursor Effects: OFF",
        cursorFxOn: "Cursor Effects: ON",
        draft: "Draft",
        filtered: "filtered",
        homeBlogEmpty: "Blog posts will appear here after the first posts are published.",
        homeBlogEyebrow: "Writing",
        homeBlogTitle: "Popular Posts",
        latest: "Latest",
        minRead: "min read",
        noPostsFound: "No posts found",
        noPostsYet: "No posts published yet",
        posts: "posts",
        searchPlaceholder: "Search posts by title, summary, label...",
        toggleCursorFx: "Toggle cursor fluid effect",
        viewAllPosts: "View all posts",
        views: "views",
    },
    zh: {
        articleBack: "返回博客",
        blogDescription: "记录软件工程、云系统，以及一路踩坑学到的东西。",
        blogEyebrow: "随笔",
        blogIndexTitle: "博客",
        blogLanguage: "语言",
        clearFiltersHint: "换个关键词试试，或者清空筛选条件",
        cursorFxOff: "光标特效：关",
        cursorFxOn: "光标特效：开",
        draft: "草稿",
        filtered: "已筛选",
        homeBlogEmpty: "文章发布后会显示在这里。",
        homeBlogEyebrow: "写作",
        homeBlogTitle: "热门文章",
        latest: "最新",
        minRead: "分钟读完",
        noPostsFound: "没有找到文章",
        noPostsYet: "还没有发布文章",
        posts: "篇文章",
        searchPlaceholder: "搜索标题、摘要或标签...",
        toggleCursorFx: "切换光标流体效果",
        viewAllPosts: "查看全部文章",
        views: "次浏览",
    },
};

export function normalizeBlogLanguage(value) {
    const normalized = String(value || "").trim().toLowerCase();
    const aliased = LANGUAGE_ALIASES[normalized] || normalized;

    return BLOG_LANGUAGES.some((language) => language.code === aliased)
        ? aliased
        : DEFAULT_BLOG_LANGUAGE;
}

export function getSupportedBlogLanguage(value) {
    const normalized = String(value || "").trim().toLowerCase();
    const aliased = LANGUAGE_ALIASES[normalized] || normalized;

    return BLOG_LANGUAGES.some((language) => language.code === aliased) ? aliased : "";
}

export function getBlogLanguage(language) {
    const code = normalizeBlogLanguage(language);
    return BLOG_LANGUAGES.find((item) => item.code === code) || BLOG_LANGUAGES[0];
}

export function getBlogCopy(language) {
    return COPY[normalizeBlogLanguage(language)] || COPY[DEFAULT_BLOG_LANGUAGE];
}

export function withBlogLanguage(href, language) {
    const [pathAndSearch, hash = ""] = String(href || "/").split("#");
    const [path, search = ""] = pathAndSearch.split("?");
    const params = new URLSearchParams(search);

    params.set(BLOG_LANGUAGE_PARAM, normalizeBlogLanguage(language));

    const query = params.toString();
    return `${path}${query ? `?${query}` : ""}${hash ? `#${hash}` : ""}`;
}
