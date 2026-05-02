export const DEFAULT_BLOG_LANGUAGE = "en";
export const BLOG_LANGUAGE_COOKIE = "blog-language";
export const BLOG_LANGUAGE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;
export const BLOG_LANGUAGE_EVENT = "blog-language-change";

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
        blogLanguage: "Blog language",
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
        blogDescription: "关于软件、云系统，以及我正在学习的事情。",
        blogEyebrow: "随想",
        blogIndexTitle: "博客",
        blogLanguage: "博客语言",
        clearFiltersHint: "换一个关键词，或清除筛选条件",
        cursorFxOff: "光标效果：关闭",
        cursorFxOn: "光标效果：开启",
        draft: "草稿",
        filtered: "已筛选",
        homeBlogEmpty: "第一篇文章发布后会显示在这里。",
        homeBlogEyebrow: "写作",
        homeBlogTitle: "热门文章",
        latest: "最新",
        minRead: "分钟阅读",
        noPostsFound: "没有找到文章",
        noPostsYet: "还没有发布文章",
        posts: "篇文章",
        searchPlaceholder: "按标题、摘要或标签搜索文章...",
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

export function getBlogLanguage(language) {
    const code = normalizeBlogLanguage(language);
    return BLOG_LANGUAGES.find((item) => item.code === code) || BLOG_LANGUAGES[0];
}

export function getBlogCopy(language) {
    return COPY[normalizeBlogLanguage(language)] || COPY[DEFAULT_BLOG_LANGUAGE];
}
