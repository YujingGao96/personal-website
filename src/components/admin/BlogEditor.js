"use client";

import {useEffect, useMemo, useRef, useState, useTransition} from "react";
import {useRouter} from "next/navigation";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBold,
    faCheck,
    faCloudArrowUp,
    faCode,
    faEye,
    faFloppyDisk,
    faHeading,
    faImage,
    faItalic,
    faLink,
    faListUl,
    faPenNib,
    faPlus,
    faTrashCan,
    faXmark,
} from "@fortawesome/free-solid-svg-icons";
import GeneratedBlogCover, {getBlogLabelColor} from "../blog/GeneratedBlogCover";
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

function cleanLabel(value) {
    return String(value || "").trim().replace(/\s+/g, " ");
}

function uniqueLabels(labels) {
    return Array.from(new Set((labels || []).map(cleanLabel).filter(Boolean)));
}

function Field({label, hint, children}) {
    return (
        <div className="admin-field">
            <div className="admin-field-heading">
                <label>{label}</label>
                {hint && <span>{hint}</span>}
            </div>
            {children}
        </div>
    );
}

const emptyPost = {
    metadata: {
        title: "",
        slug: "",
        summary: "",
        labels: [],
        status: "draft",
        publishedAt: "",
        updatedAt: "",
        coverImageUrl: "",
        readingTime: 1,
    },
    content: "",
};

export default function BlogEditor({post = emptyPost, blobConfigured, publicBlobConfigured, availableLabels = []}) {
    const router = useRouter();
    const fileRef = useRef(null);
    const labelRef = useRef(null);
    const markdownRef = useRef(null);
    const initialCursor = post.content?.length || 0;
    const selectionRef = useRef({start: initialCursor, end: initialCursor});
    const [isPending, startTransition] = useTransition();
    const [message, setMessage] = useState("");
    const [metadata, setMetadata] = useState(post.metadata);
    const [content, setContent] = useState(post.content || "");
    const contentRef = useRef(post.content || "");
    const [previousSlug] = useState(post.metadata.slug || "");
    const [labels, setLabels] = useState(uniqueLabels(post.metadata.labels));
    const [labelInput, setLabelInput] = useState("");
    const [labelsOpen, setLabelsOpen] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const derivedSlug = useMemo(() => slugify(metadata.title), [metadata.title]);
    const labelOptions = useMemo(() => {
        return uniqueLabels([...availableLabels, ...labels]).sort((a, b) => a.localeCompare(b));
    }, [availableLabels, labels]);
    const filteredLabelOptions = useMemo(() => {
        const query = labelInput.trim().toLowerCase();
        return query ? labelOptions.filter((label) => label.toLowerCase().includes(query)) : labelOptions;
    }, [labelInput, labelOptions]);
    const wordCount = useMemo(() => {
        return String(content || "").trim().split(/\s+/).filter(Boolean).length;
    }, [content]);
    const previewMetadata = useMemo(() => ({
        ...metadata,
        slug: derivedSlug,
        labels,
        keywords: [],
    }), [derivedSlug, labels, metadata]);

    useEffect(() => {
        const closeLabels = (event) => {
            if (labelRef.current && !labelRef.current.contains(event.target)) {
                setLabelsOpen(false);
            }
        };

        document.addEventListener("mousedown", closeLabels);
        return () => document.removeEventListener("mousedown", closeLabels);
    }, []);

    const updateMetadata = (key, value) => {
        setMetadata((current) => ({
            ...current,
            [key]: value,
        }));
    };

    const savePost = (status = metadata.status) => {
        const slug = slugify(metadata.title);

        if (!slug) {
            setMessage("Add a title before saving.");
            return;
        }

        setMessage("");

        startTransition(async () => {
            const nextMetadata = {
                ...previewMetadata,
                status,
                slug,
                keywords: [],
            };
            const response = await fetch("/api/admin/blog/posts", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    metadata: nextMetadata,
                    content: contentRef.current,
                    previousSlug,
                }),
            });
            const result = await response.json();

            if (!response.ok) {
                setMessage(result.error || "Unable to save post.");
                return;
            }

            setMetadata(result.post.metadata);
            setLabels(uniqueLabels(result.post.metadata.labels));
            setMessage("Saved.");

            if (!previousSlug || previousSlug !== result.post.metadata.slug) {
                router.replace(`/admin/blog/${result.post.metadata.slug}`);
                return;
            }

            router.refresh();
        });
    };

    const deleteCurrentPost = () => {
        if (!previousSlug) {
            return;
        }

        const confirmed = window.confirm(`Delete "${metadata.title || previousSlug}"? This removes the ${metadata.status} post from blog storage.`);

        if (!confirmed) {
            return;
        }

        setMessage("");

        startTransition(async () => {
            const response = await fetch(`/api/admin/blog/posts/${encodeURIComponent(previousSlug)}`, {
                method: "DELETE",
            });
            const result = await response.json();

            if (!response.ok) {
                setMessage(result.error || "Unable to delete post.");
                return;
            }

            router.replace("/admin/blog");
            router.refresh();
        });
    };

    const trackSelection = () => {
        const textarea = markdownRef.current;

        if (!textarea) {
            return;
        }

        selectionRef.current = {
            start: textarea.selectionStart,
            end: textarea.selectionEnd,
        };
    };

    const insertMarkdown = (prefix, suffix = "", placeholder = "") => {
        const {start, end} = selectionRef.current;
        const current = contentRef.current;
        const safeStart = Math.min(start, current.length);
        const safeEnd = Math.min(end, current.length);
        const selected = current.slice(safeStart, safeEnd) || placeholder;
        const next = `${current.slice(0, safeStart)}${prefix}${selected}${suffix}${current.slice(safeEnd)}`;
        const cursorStart = safeStart + prefix.length;
        const cursorEnd = cursorStart + selected.length;

        contentRef.current = next;
        setContent(next);

        window.requestAnimationFrame(() => {
            markdownRef.current?.focus();
            markdownRef.current?.setSelectionRange(cursorStart, cursorEnd);
            selectionRef.current = {start: cursorStart, end: cursorEnd};
        });
    };

    const insertImageMarkdown = (url, name) => {
        const alt = cleanLabel(name.replace(/\.[^.]+$/, "")) || "image";
        insertMarkdown(`\n\n![${alt}](${url})\n\n`);
    };

    const uploadImage = (file) => {
        if (!file || !file.type.startsWith("image/")) {
            setMessage("Choose an image file.");
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

            insertImageMarkdown(result.url, file.name);

            if (fileRef.current) {
                fileRef.current.value = "";
            }

            setMessage("Image uploaded.");
        });
    };

    const selectImage = (event) => {
        uploadImage(event.target.files?.[0]);
    };

    const dropImage = (event) => {
        event.preventDefault();
        setDragActive(false);
        uploadImage(event.dataTransfer.files?.[0]);
    };

    const addLabel = (value = labelInput) => {
        const label = cleanLabel(value);

        if (!label) {
            return;
        }

        setLabels((current) => uniqueLabels([...current, label]));
        setLabelInput("");
        setLabelsOpen(true);
    };

    const toggleLabel = (label) => {
        setLabels((current) => current.includes(label)
            ? current.filter((item) => item !== label)
            : uniqueLabels([...current, label]));
        setLabelInput("");
    };

    const removeLabel = (label) => {
        setLabels((current) => current.filter((item) => item !== label));
    };

    const submitLabelInput = (event) => {
        if (event.key === "Enter" || event.key === ",") {
            event.preventDefault();
            addLabel();
        }
    };

    const canAddTypedLabel = labelInput.trim()
        && !labelOptions.some((label) => label.toLowerCase() === labelInput.trim().toLowerCase());
    const isPublished = metadata.status === "published";

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
                    <button type="button" onClick={() => savePost()} disabled={isPending || !blobConfigured}>
                        <FontAwesomeIcon icon={faFloppyDisk}/>
                        Save Changes
                    </button>
                    {!isPublished && (
                        <button type="button" className="admin-primary-action" onClick={() => savePost("published")} disabled={isPending || !blobConfigured}>
                            <FontAwesomeIcon icon={faPenNib}/>
                            Publish
                        </button>
                    )}
                    {previousSlug && (
                        <button type="button" className="admin-danger-action" onClick={deleteCurrentPost} disabled={isPending || !blobConfigured}>
                            <FontAwesomeIcon icon={faTrashCan}/>
                            Delete
                        </button>
                    )}
                    {message && <span>{message}</span>}
                </div>
                <Field label="Title">
                    <input
                        value={metadata.title}
                        onChange={(event) => updateMetadata("title", event.target.value)}
                        required
                    />
                </Field>
                <Field label="Slug" hint="auto-generated">
                    <div className="admin-slug-preview">
                        <span>/blog/</span>
                        <input value={derivedSlug} readOnly/>
                    </div>
                </Field>
                <Field label="Summary">
                    <textarea
                        value={metadata.summary}
                        onChange={(event) => updateMetadata("summary", event.target.value)}
                        rows={3}
                    />
                </Field>
                <Field label="Estimated read time" hint="minutes">
                    <input
                        type="number"
                        min="1"
                        max="120"
                        value={metadata.readingTime || 1}
                        onChange={(event) => updateMetadata("readingTime", Math.max(1, Number(event.target.value) || 1))}
                    />
                </Field>
                <Field label="Labels">
                    <div className="admin-label-picker" ref={labelRef}>
                        <div className="admin-label-input" onClick={() => setLabelsOpen(true)}>
                            {labels.map((label) => (
                                <span className="admin-label-chip" key={label} style={{"--label-color": getBlogLabelColor(label)}}>
                                    {label}
                                    <button type="button" onClick={(event) => {
                                        event.stopPropagation();
                                        removeLabel(label);
                                    }}>
                                        <FontAwesomeIcon icon={faXmark}/>
                                    </button>
                                </span>
                            ))}
                            <input
                                value={labelInput}
                                onChange={(event) => {
                                    setLabelInput(event.target.value);
                                    setLabelsOpen(true);
                                }}
                                onFocus={() => setLabelsOpen(true)}
                                onKeyDown={submitLabelInput}
                                placeholder={labels.length ? "" : "Add label..."}
                            />
                        </div>
                        {labelsOpen && (
                            <div className="admin-label-menu">
                                {filteredLabelOptions.map((label) => (
                                    <button type="button" key={label} onClick={() => toggleLabel(label)} style={{"--label-color": getBlogLabelColor(label)}}>
                                        {labels.includes(label) && <FontAwesomeIcon icon={faCheck}/>}
                                        {label}
                                    </button>
                                ))}
                                {canAddTypedLabel && (
                                    <button type="button" className="admin-label-add" onClick={() => addLabel()}>
                                        <FontAwesomeIcon icon={faPlus}/>
                                        {labelInput.trim()}
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </Field>
                <Field label="Status">
                    <div className="admin-status-display">
                        <span className={`admin-status-pill ${metadata.status}`}>
                            {metadata.status}
                        </span>
                        <span>{metadata.updatedAt ? `Updated ${new Date(metadata.updatedAt).toLocaleDateString()}` : "Not saved yet"}</span>
                    </div>
                </Field>
                <Field label="Content" hint="Markdown">
                    <div className="admin-markdown-editor">
                        <div className="admin-markdown-toolbar">
                            <button type="button" onClick={() => insertMarkdown("# ", "", "Heading")}>
                                <FontAwesomeIcon icon={faHeading}/>
                                H1
                            </button>
                            <button type="button" onClick={() => insertMarkdown("## ", "", "Heading")}>
                                <FontAwesomeIcon icon={faHeading}/>
                                H2
                            </button>
                            <button type="button" onClick={() => insertMarkdown("**", "**", "bold")}>
                                <FontAwesomeIcon icon={faBold}/>
                            </button>
                            <button type="button" onClick={() => insertMarkdown("*", "*", "italic")}>
                                <FontAwesomeIcon icon={faItalic}/>
                            </button>
                            <button type="button" onClick={() => insertMarkdown("`", "`", "code")}>
                                <FontAwesomeIcon icon={faCode}/>
                            </button>
                            <button type="button" onClick={() => insertMarkdown("- ", "", "item")}>
                                <FontAwesomeIcon icon={faListUl}/>
                            </button>
                            <button type="button" onClick={() => insertMarkdown("[", "](url)", "link text")}>
                                <FontAwesomeIcon icon={faLink}/>
                            </button>
                        </div>
                        <input className="admin-image-file-input" ref={fileRef} type="file" accept="image/png,image/jpeg,image/webp,image/gif" onChange={selectImage}/>
                        <button
                            type="button"
                            className={`admin-image-dropzone${dragActive ? " active" : ""}`}
                            onClick={() => fileRef.current?.click()}
                            onDragOver={(event) => {
                                event.preventDefault();
                                setDragActive(true);
                            }}
                            onDragLeave={() => setDragActive(false)}
                            onDrop={dropImage}
                            disabled={isPending || !publicBlobConfigured}
                        >
                            <span>
                                <FontAwesomeIcon icon={faCloudArrowUp}/>
                            </span>
                            <strong>Drop image or browse</strong>
                            <small>Inserted into markdown automatically</small>
                        </button>
                        <div className="admin-markdown-input-wrap">
                            <FontAwesomeIcon icon={faImage}/>
                            <span>{wordCount} words</span>
                        </div>
                        <textarea
                            ref={markdownRef}
                            className="admin-markdown-input"
                            value={content}
                            onChange={(event) => {
                                contentRef.current = event.target.value;
                                setContent(event.target.value);
                            }}
                            onClick={trackSelection}
                            onKeyUp={trackSelection}
                            onSelect={trackSelection}
                            rows={24}
                            placeholder="# Start writing..."
                        />
                    </div>
                </Field>
            </form>
            <aside className="admin-preview">
                <div className="admin-preview-heading">
                    <FontAwesomeIcon icon={faEye}/>
                    Preview
                    <span>{wordCount} words</span>
                </div>
                <article className="blog-article preview">
                    <GeneratedBlogCover post={previewMetadata} className="blog-generated-cover"/>
                    <header className="blog-article-header">
                        {previewMetadata.labels.length > 0 && (
                            <div className="admin-preview-labels">
                                {previewMetadata.labels.map((label) => (
                                    <span key={label} style={{"--label-color": getBlogLabelColor(label)}}>{label}</span>
                                ))}
                            </div>
                        )}
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
