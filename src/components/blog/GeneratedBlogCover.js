import FilmArtwork from "../common/FilmArtwork";
import {hashText, pick, VIBRANT_COLORS} from "../../util/GenArtUtil";

const LABEL_COLORS = {
    Cloud: "#19e6ff",
    AWS: "#ff8a3d",
    DevOps: "#4dff88",
    Kubernetes: "#8a7dff",
    TypeScript: "#31b8ff",
    Backend: "#21e8b7",
    API: "#ffd34d",
    Monitoring: "#b7f542",
    Rust: "#ff7a45",
    Systems: "#d466ff",
    Database: "#ff5f7a",
    React: "#36e4ff",
    Frontend: "#b45cff",
    Reflections: "#ff5bc8",
    Product: "#ffe66d",
};

export function getBlogLabelColor(label) {
    const seed = hashText(label);
    return LABEL_COLORS[label] || VIBRANT_COLORS[seed % VIBRANT_COLORS.length];
}

export function getBlogCoverPalette(post) {
    const labels = post?.labels?.length ? post.labels : [post?.title || post?.slug || "blog"];
    const seed = hashText(post?.slug || post?.title);
    const labelColors = labels.slice(0, 3).map(getBlogLabelColor);
    const pool = [...labelColors, ...VIBRANT_COLORS];
    const colors = [labelColors[0] || pick(VIBRANT_COLORS, seed)];

    while (colors.length < 5) {
        colors.push(pick(pool, seed, colors.length));
    }

    return colors;
}

export default function GeneratedBlogCover({post, className = ""}) {
    return (
        <FilmArtwork
            subject={post?.slug || post?.title || "blog"}
            className={`generated-blog-cover-svg ${className}`.trim()}
            width={320}
            height={160}
        />
    );
}
