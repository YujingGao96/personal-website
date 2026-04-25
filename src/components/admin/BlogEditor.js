"use client";

import {useMemo, useRef, useState, useTransition} from "react";
import {useRouter} from "next/navigation";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCloudArrowUp, faEye, faFloppyDisk, faPenNib} from "@fortawesome/free-solid-svg-icons";
import MarkdownRenderer from "../blog/MarkdownRenderer";

function slugify(value) {
    return String(value || "")
        .trim()
        .toLowerCase()
        .replace(/['"]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .slice(0, 80);
}

function toCsv(value) {
    return Array.isArray(value) ? value.join(", ") : "";
}

function fromCsv(value) {
    return String(value || "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
}

const emptyPost = {
    metadata: {
        title: "",
        slug: "",
        summary: "",
        labels: [],
        keywords: [],
        status: "draft",
        publishedAt: "",
        updatedAt: "",
        coverImageUrl: "",
        readingTime: 1,
    },
    content: "",
};

export default function BlogEditor({post = emptyPost, blobConfigured, publicBlobConfigured}) {
    const router = useRouter();
    const fileRef = useRef(null);
    const [isPending, startTransition] = useTransition();
    const [message, setMessage] = useState("");
    const [metadata, setMetadata] = useState(post.metadata);
    const [content, setContent] = useState(post.content || "");
    const [previousSlug] = useState(post.metadata.slug || "");
    const [labels, setLabels] = useState(toCsv(post.metadata.labels));
    const [keywords, setKeywords] = useState(toCsv(post.metadata.keywords));
    const previewMetadata = useMemo(() => ({
        ...metadata,
        labels: fromCsv(labels),
        keywords: fromCsv(keywords),
    }), [keywords, labels, metadata]);

    const updateMetadata = (key, value) => {
        setMetadata((current) => ({
            ...current,
            [key]: value,
        }));
    };

    const savePost = (status = metadata.status) => {
        setMessage("");

        startTransition(async () => {
            const nextMetadata = {
                ...previewMetadata,
                status,
                slug: metadata.slug || slugify(metadata.title),
            };
            const response = await fetch("/api/admin/blog/posts", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    metadata: nextMetadata,
                    content,
                    previousSlug,
                }),
            });
            const result = await response.json();

            if (!response.ok) {
                setMessage(result.error || "Unable to save post.");
                return;
            }

            setMetadata(result.post.metadata);
            setMessage("Saved.");

            if (!previousSlug || previousSlug !== result.post.metadata.slug) {
                router.replace(`/admin/blog/${result.post.metadata.slug}`);
                return;
            }

            router.refresh();
        });
    };

    const uploadImage = () => {
        const file = fileRef.current?.files?.[0];

        if (!file) {
            return;
        }

        setMessage("");

        startTransition(async () => {
            const formData = new FormData();
            formData.append("file", file);

            const response = await fetch("/api/admin/blog/upload", {
                method: "POST",
                body: formData,
            });
            const result = await response.json();

            if (!response.ok) {
                setMessage(result.error || "Unable to upload image.");
                return;
            }

            const imageMarkdown = `\n\n![${file.name}](${result.url})\n`;
            setContent((current) => `${current}${imageMarkdown}`);

            if (!metadata.coverImageUrl) {
                updateMetadata("coverImageUrl", result.url);
            }

            if (fileRef.current) {
                fileRef.current.value = "";
            }

            setMessage("Image uploaded.");
        });
    };

    return (
        <div className="admin-editor-grid">
            <form className="admin-editor-form" onSubmit={(event) => event.preventDefault()}>
                {!blobConfigured && (
                    <div className="admin-alert">
                        Set `BLOB_READ_WRITE_TOKEN` before saving posts.
                    </div>
                )}
                {!publicBlobConfigured && (
                    <div className="admin-alert">
                        Set `BLOG_PUBLIC_READ_WRITE_TOKEN` before uploading assets.
                    </div>
                )}
                <div className="admin-toolbar">
                    <button type="button" onClick={() => savePost("draft")} disabled={isPending || !blobConfigured}>
                        <FontAwesomeIcon icon={faFloppyDisk}/>
                        Save Draft
                    </button>
                    <button type="button" onClick={() => savePost("published")} disabled={isPending || !blobConfigured}>
                        <FontAwesomeIcon icon={faPenNib}/>
                        Publish
                    </button>
                    {message && <span>{message}</span>}
                </div>
                <label>
                    Title
                    <input
                        value={metadata.title}
                        onChange={(event) => {
                            updateMetadata("title", event.target.value);

                            if (!previousSlug) {
                                updateMetadata("slug", slugify(event.target.value));
                            }
                        }}
                        required
                    />
                </label>
                <label>
                    Slug
                    <input
                        value={metadata.slug}
                        onChange={(event) => updateMetadata("slug", slugify(event.target.value))}
                        required
                    />
                </label>
                <label>
                    Summary
                    <textarea
                        value={metadata.summary}
                        onChange={(event) => updateMetadata("summary", event.target.value)}
                        rows={3}
                    />
                </label>
                <div className="admin-field-row">
                    <label>
                        Labels
                        <input value={labels} onChange={(event) => setLabels(event.target.value)} placeholder="aws, nextjs"/>
                    </label>
                    <label>
                        Keywords
                        <input value={keywords} onChange={(event) => setKeywords(event.target.value)} placeholder="routing, storage"/>
                    </label>
                </div>
                <div className="admin-field-row">
                    <label>
                        Status
                        <select value={metadata.status} onChange={(event) => updateMetadata("status", event.target.value)}>
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                        </select>
                    </label>
                    <label>
                        Cover image URL
                        <input value={metadata.coverImageUrl} onChange={(event) => updateMetadata("coverImageUrl", event.target.value)}/>
                    </label>
                </div>
                <label>
                    Upload image
                    <span className="admin-upload-row">
                        <input ref={fileRef} type="file" accept="image/png,image/jpeg,image/webp,image/gif"/>
                        <button type="button" onClick={uploadImage} disabled={isPending || !publicBlobConfigured}>
                            <FontAwesomeIcon icon={faCloudArrowUp}/>
                            Upload
                        </button>
                    </span>
                </label>
                <label>
                    Markdown
                    <textarea
                        className="admin-markdown-input"
                        value={content}
                        onChange={(event) => setContent(event.target.value)}
                        rows={24}
                        placeholder="# Start writing..."
                    />
                </label>
            </form>
            <aside className="admin-preview">
                <div className="admin-preview-heading">
                    <FontAwesomeIcon icon={faEye}/>
                    Preview
                </div>
                <article className="blog-article preview">
                    {previewMetadata.coverImageUrl && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img className="blog-cover-image" src={previewMetadata.coverImageUrl} alt=""/>
                    )}
                    <header className="blog-article-header">
                        <h1>{previewMetadata.title || "Untitled post"}</h1>
                        <p>{previewMetadata.summary}</p>
                    </header>
                    <div className="blog-article-body">
                        <MarkdownRenderer content={content || "Start writing to preview your post."}/>
                    </div>
                </article>
            </aside>
        </div>
    );
}
