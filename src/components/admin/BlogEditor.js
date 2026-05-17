"use client";

import {useEffect, useMemo, useRef, useState, useTransition} from "react";
import {useRouter} from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBold,
    faCheck,
    faCloudArrowUp,
    faCode,
    faFloppyDisk,
    faHeading,
    faImage,
    faItalic,
    faLink,
    faListOl,
    faListUl,
    faMinus,
    faPalette,
    faParagraph,
    faPenNib,
    faPlus,
    faQuoteLeft,
    faSquareCheck,
    faStrikethrough,
    faTable,
    faTrashCan,
    faWandMagicSparkles,
    faXmark,
} from "@fortawesome/free-solid-svg-icons";
import GeneratedBlogCover, {getBlogLabelColor} from "../blog/GeneratedBlogCover";

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

const inlineMarkdownComponents = {
    a: ({children, href}) => (
        <a href={href} onClick={(event) => event.preventDefault()} tabIndex={-1}>
            {children}
        </a>
    ),
    p: ({children}) => <>{children}</>,
};

function InlineMarkdown({content}) {
    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={inlineMarkdownComponents}
        >
            {content}
        </ReactMarkdown>
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
        language: "en",
    },
    content: "",
};

const defaultTable = [
    "| Idea | Notes |",
    "| --- | --- |",
    "| Spark | Add detail here |",
].join("\n");

const textBlockTypes = new Set(["paragraph", "heading", "quote", "list", "ordered-list", "checklist", "code", "callout", "table"]);
const listBlockTypes = new Set(["list", "ordered-list", "checklist"]);

const blockTools = [
    {key: "paragraph", label: "Text", icon: faParagraph, type: "paragraph"},
    {key: "heading-1", label: "H1", icon: faHeading, type: "heading", level: 1},
    {key: "heading-2", label: "H2", icon: faHeading, type: "heading", level: 2},
    {key: "heading-3", label: "H3", icon: faHeading, type: "heading", level: 3},
    {key: "quote", label: "Quote", icon: faQuoteLeft, type: "quote"},
    {key: "list", label: "Bullets", icon: faListUl, type: "list"},
    {key: "ordered-list", label: "Numbers", icon: faListOl, type: "ordered-list"},
    {key: "checklist", label: "Tasks", icon: faSquareCheck, type: "checklist"},
    {key: "code", label: "Code", icon: faCode, type: "code"},
    {key: "table", label: "Table", icon: faTable, type: "table"},
    {key: "callout", label: "Callout", icon: faWandMagicSparkles, type: "callout"},
    {key: "divider", label: "Divider", icon: faMinus, type: "divider", insertOnly: true},
];

const calloutTones = [
    {value: "NOTE", label: "Note", color: "#68c5c3"},
    {value: "TIP", label: "Tip", color: "#7df0a2"},
    {value: "IMPORTANT", label: "Pop", color: "#b593e1"},
    {value: "WARNING", label: "Fire", color: "#ffb15f"},
    {value: "CAUTION", label: "Hot", color: "#ff6f91"},
];

function makeBlock(id, type = "paragraph", fields = {}) {
    return {
        id,
        type,
        text: "",
        ...fields,
    };
}

function isTableDelimiter(line) {
    return /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(line || "");
}

function isTableStart(lines, index) {
    return /\|/.test(lines[index] || "") && isTableDelimiter(lines[index + 1]);
}

function isSpecialStart(lines, index) {
    const trimmed = (lines[index] || "").trim();

    return !trimmed
        || /^```/.test(trimmed)
        || /^#{1,6}\s+/.test(trimmed)
        || /^(---|\*\*\*|___)$/.test(trimmed)
        || /^!\[[^\]]*]\([^)]+\)$/.test(trimmed)
        || /^>\s?/.test(trimmed)
        || /^[-*+]\s+\[[ xX]]\s+/.test(trimmed)
        || /^[-*+]\s+/.test(trimmed)
        || /^\d+\.\s+/.test(trimmed)
        || isTableStart(lines, index);
}

function parseMarkdownBlocks(source) {
    const lines = String(source || "").replace(/\r\n/g, "\n").split("\n");
    const blocks = [];
    let index = 0;

    const pushBlock = (type, fields = {}) => {
        blocks.push(makeBlock(`block-${blocks.length}`, type, fields));
    };

    while (index < lines.length) {
        const line = lines[index];
        const trimmed = line.trim();

        if (!trimmed) {
            index += 1;
            continue;
        }

        if (/^```/.test(trimmed)) {
            const language = trimmed.replace(/^```/, "").trim();
            const codeLines = [];
            index += 1;

            while (index < lines.length && !/^```/.test(lines[index].trim())) {
                codeLines.push(lines[index]);
                index += 1;
            }

            if (index < lines.length) {
                index += 1;
            }

            pushBlock("code", {language, text: codeLines.join("\n")});
            continue;
        }

        if (isTableStart(lines, index)) {
            const tableLines = [line, lines[index + 1]];
            index += 2;

            while (index < lines.length && /\|/.test(lines[index]) && lines[index].trim()) {
                tableLines.push(lines[index]);
                index += 1;
            }

            pushBlock("table", {text: tableLines.join("\n")});
            continue;
        }

        const heading = trimmed.match(/^(#{1,6})\s+(.*)$/);

        if (heading) {
            pushBlock("heading", {level: Math.min(3, heading[1].length), text: heading[2]});
            index += 1;
            continue;
        }

        if (/^(---|\*\*\*|___)$/.test(trimmed)) {
            pushBlock("divider");
            index += 1;
            continue;
        }

        const image = trimmed.match(/^!\[([^\]]*)]\(([^)]+)\)$/);

        if (image) {
            pushBlock("image", {alt: image[1], url: image[2], text: image[1]});
            index += 1;
            continue;
        }

        if (/^>\s?/.test(trimmed)) {
            const quoteLines = [];

            while (index < lines.length && /^>\s?/.test(lines[index].trim())) {
                quoteLines.push(lines[index].trim().replace(/^>\s?/, ""));
                index += 1;
            }

            const callout = quoteLines[0]?.match(/^\[!(\w+)]\s*$/);

            if (callout) {
                pushBlock("callout", {tone: callout[1].toUpperCase(), text: quoteLines.slice(1).join("\n")});
            } else {
                pushBlock("quote", {text: quoteLines.join("\n")});
            }

            continue;
        }

        const checklist = trimmed.match(/^[-*+]\s+\[([ xX])]\s+(.*)$/);

        if (checklist) {
            pushBlock("checklist", {checked: checklist[1].toLowerCase() === "x", text: checklist[2]});
            index += 1;
            continue;
        }

        const unordered = trimmed.match(/^[-*+]\s+(.*)$/);

        if (unordered) {
            pushBlock("list", {text: unordered[1]});
            index += 1;
            continue;
        }

        const ordered = trimmed.match(/^\d+\.\s+(.*)$/);

        if (ordered) {
            pushBlock("ordered-list", {text: ordered[1]});
            index += 1;
            continue;
        }

        const paragraphLines = [line];
        index += 1;

        while (index < lines.length && !isSpecialStart(lines, index)) {
            paragraphLines.push(lines[index]);
            index += 1;
        }

        pushBlock("paragraph", {text: paragraphLines.join("\n")});
    }

    return blocks.length ? blocks : [makeBlock("block-0", "paragraph")];
}

function getBlockText(block) {
    if (block.type === "divider") {
        return "";
    }

    if (block.type === "image") {
        return block.alt || "";
    }

    return block.text || "";
}

function serializeBlock(block) {
    const text = String(block.text || "").trimEnd();

    switch (block.type) {
        case "heading":
            return text.trim() ? `${"#".repeat(block.level || 2)} ${text.trim()}` : "";
        case "quote":
            return text.trim() ? text.split("\n").map((line) => `> ${line}`).join("\n") : "";
        case "list":
            return text.trim() ? `- ${text}` : "";
        case "ordered-list":
            return text.trim() ? `1. ${text}` : "";
        case "checklist":
            return text.trim() ? `- [${block.checked ? "x" : " "}] ${text}` : "";
        case "code":
            return text.trim() ? `\`\`\`${block.language || ""}\n${text}\n\`\`\`` : "";
        case "divider":
            return "---";
        case "image":
            return block.url ? `![${block.alt || "image"}](${block.url})` : "";
        case "callout": {
            const tone = block.tone || "NOTE";
            const body = text.trim() ? text.split("\n").map((line) => `> ${line}`).join("\n") : "> ";
            return `> [!${tone}]\n${body}`;
        }
        case "table":
            return text.trim() ? text : "";
        default:
            return text.trim() ? text : "";
    }
}

function shouldTightJoin(previous, current) {
    return previous && current && listBlockTypes.has(previous.type) && previous.type === current.type;
}

function serializeBlocks(blocks) {
    return blocks.reduce((source, block, index) => {
        const serialized = serializeBlock(block);

        if (!serialized) {
            return source;
        }

        const previousBlock = blocks.slice(0, index).reverse().find((item) => serializeBlock(item));
        const gap = shouldTightJoin(previousBlock, block) ? "\n" : "\n\n";

        return source ? `${source}${gap}${serialized}` : serialized;
    }, "");
}

function cloneBlocks(blocks) {
    return blocks.map((block) => ({...block}));
}

function fitTextarea(textarea) {
    if (!textarea) {
        return;
    }

    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
}

export default function BlogEditor({post = emptyPost, blobConfigured, publicBlobConfigured, availableLabels = []}) {
    const router = useRouter();
    const fileRef = useRef(null);
    const labelRef = useRef(null);
    const titleRef = useRef(null);
    const summaryRef = useRef(null);
    const textareaRefs = useRef(new Map());
    const selectionRefs = useRef(new Map());
    const [savedSnapshot, setSavedSnapshot] = useState(() => {
        const initialBlocks = parseMarkdownBlocks(post.content || "");

        return {
            activeBlockId: initialBlocks[0]?.id || "block-0",
            blocks: cloneBlocks(initialBlocks),
            content: serializeBlocks(initialBlocks),
            labels: uniqueLabels(post.metadata.labels),
            metadata: {...emptyPost.metadata, ...post.metadata},
        };
    });
    const [isPending, startTransition] = useTransition();
    const [message, setMessage] = useState("");
    const [metadata, setMetadata] = useState(savedSnapshot.metadata);
    const [previousSlug] = useState(post.metadata.slug || "");
    const [labels, setLabels] = useState(savedSnapshot.labels);
    const [labelInput, setLabelInput] = useState("");
    const [labelsOpen, setLabelsOpen] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const [activeBlockId, setActiveBlockId] = useState(savedSnapshot.activeBlockId);
    const [editingBlockId, setEditingBlockId] = useState(null);
    const [blocks, setBlocks] = useState(() => cloneBlocks(savedSnapshot.blocks));
    const nextBlockIndex = useRef(savedSnapshot.blocks.length);
    const derivedSlug = useMemo(() => slugify(metadata.title), [metadata.title]);
    const content = useMemo(() => serializeBlocks(blocks), [blocks]);
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
    const hasUnsavedChanges = useMemo(() => {
        return serializeBlocks(blocks) !== savedSnapshot.content
            || JSON.stringify(labels) !== JSON.stringify(savedSnapshot.labels)
            || JSON.stringify(metadata) !== JSON.stringify(savedSnapshot.metadata);
    }, [blocks, labels, metadata, savedSnapshot]);
    const activeBlock = blocks.find((block) => block.id === activeBlockId) || blocks[0];
    const isPublished = metadata.status === "published";
    const articleLanguage = metadata.language === "zh" ? "zh-Hans" : "en";

    useEffect(() => {
        const closeLabels = (event) => {
            if (labelRef.current && !labelRef.current.contains(event.target)) {
                setLabelsOpen(false);
            }
        };

        document.addEventListener("mousedown", closeLabels);
        return () => document.removeEventListener("mousedown", closeLabels);
    }, []);

    useEffect(() => {
        textareaRefs.current.forEach(fitTextarea);
    }, [blocks]);

    useEffect(() => {
        fitTextarea(titleRef.current);
        fitTextarea(summaryRef.current);
    }, [metadata.title, metadata.summary]);

    const updateMetadata = (key, value) => {
        setMetadata((current) => ({
            ...current,
            [key]: value,
        }));
    };

    const createBlock = (type = "paragraph", fields = {}) => {
        const block = makeBlock(`block-new-${nextBlockIndex.current}`, type, fields);
        nextBlockIndex.current += 1;
        return block;
    };

    const focusBlock = (blockId, atStart = false) => {
        setEditingBlockId(blockId);
        window.requestAnimationFrame(() => {
            const textarea = textareaRefs.current.get(blockId);

            if (!textarea) {
                return;
            }

            textarea.focus();
            const cursor = atStart ? 0 : textarea.value.length;
            textarea.setSelectionRange(cursor, cursor);
            selectionRefs.current.set(blockId, {start: cursor, end: cursor});
            fitTextarea(textarea);
        });
    };

    const startEditingBlock = (blockId, atStart = false) => {
        setActiveBlockId(blockId);
        focusBlock(blockId, atStart);
    };

    const rememberSelection = (blockId, textarea) => {
        selectionRefs.current.set(blockId, {
            start: textarea.selectionStart,
            end: textarea.selectionEnd,
        });
    };

    const setTextareaRef = (blockId, node) => {
        if (node) {
            textareaRefs.current.set(blockId, node);
            fitTextarea(node);
            return;
        }

        textareaRefs.current.delete(blockId);
    };

    const updateBlock = (blockId, patch) => {
        setBlocks((current) => current.map((block) => (
            block.id === blockId ? {...block, ...patch} : block
        )));
    };

    const insertBlockAfter = (afterBlockId, type = "paragraph", fields = {}) => {
        const nextBlock = createBlock(type, fields);

        setBlocks((current) => {
            const insertIndex = current.findIndex((block) => block.id === afterBlockId);

            if (insertIndex === -1) {
                return [...current, nextBlock];
            }

            return [
                ...current.slice(0, insertIndex + 1),
                nextBlock,
                ...current.slice(insertIndex + 1),
            ];
        });

        setActiveBlockId(nextBlock.id);

        if (textBlockTypes.has(type)) {
            focusBlock(nextBlock.id);
        }
    };

    const removeBlock = (blockId) => {
        setBlocks((current) => {
            if (current.length === 1) {
                return [createBlock("paragraph")];
            }

            const removeIndex = current.findIndex((block) => block.id === blockId);
            const next = current.filter((block) => block.id !== blockId);
            const focusTarget = next[Math.max(0, removeIndex - 1)] || next[0];

            if (focusTarget) {
                setActiveBlockId(focusTarget.id);
                focusBlock(focusTarget.id);
            }

            return next;
        });
    };

    const replaceActiveBlock = (tool) => {
        if (tool.insertOnly) {
            insertBlockAfter(activeBlock?.id, tool.type);
            return;
        }

        const targetId = activeBlock?.id;

        if (!targetId) {
            return;
        }

        setBlocks((current) => current.map((block) => {
            if (block.id !== targetId) {
                return block;
            }

            const text = getBlockText(block);
            const base = {id: block.id, type: tool.type, text};

            if (tool.type === "heading") {
                return {...base, level: tool.level};
            }

            if (tool.type === "checklist") {
                return {...base, checked: block.checked || false};
            }

            if (tool.type === "code") {
                return {...base, language: block.language || "js"};
            }

            if (tool.type === "callout") {
                return {...base, tone: block.tone || "NOTE", text: text || "A bright idea worth remembering."};
            }

            if (tool.type === "table") {
                return {...base, text: block.type === "table" ? block.text : defaultTable};
            }

            return base;
        }));

        focusBlock(targetId);
    };

    const setActiveCalloutTone = (tone) => {
        if (activeBlock?.type === "callout") {
            updateBlock(activeBlock.id, {tone});
            return;
        }

        insertBlockAfter(activeBlock?.id, "callout", {tone, text: "A bright idea worth remembering."});
    };

    const wrapSelection = (prefix, suffix = "", placeholder = "") => {
        const target = activeBlock && textBlockTypes.has(activeBlock.type) && activeBlock.type !== "code"
            ? activeBlock
            : blocks[0];

        if (!target) {
            return;
        }

        const textarea = textareaRefs.current.get(target.id);
        const value = target.text || "";
        const savedSelection = selectionRefs.current.get(target.id);
        const start = textarea?.selectionStart ?? savedSelection?.start ?? value.length;
        const end = textarea?.selectionEnd ?? savedSelection?.end ?? value.length;
        const selected = value.slice(start, end) || placeholder;
        const nextText = `${value.slice(0, start)}${prefix}${selected}${suffix}${value.slice(end)}`;
        const cursorStart = start + prefix.length;
        const cursorEnd = cursorStart + selected.length;

        updateBlock(target.id, {text: nextText});
        setActiveBlockId(target.id);
        setEditingBlockId(null);
        selectionRefs.current.set(target.id, {start: cursorStart, end: cursorEnd});
    };

    const splitBlock = (event, block) => {
        if (event.key !== "Enter" || event.shiftKey || block.type === "code" || block.type === "table") {
            return;
        }

        const textarea = textareaRefs.current.get(block.id);

        if (!textarea) {
            return;
        }

        event.preventDefault();

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const before = (block.text || "").slice(0, start);
        const after = (block.text || "").slice(end);
        const nextType = listBlockTypes.has(block.type) ? block.type : "paragraph";
        const nextBlock = createBlock(nextType, {
            text: after,
            checked: false,
        });

        setBlocks((current) => {
            const blockIndex = current.findIndex((item) => item.id === block.id);

            if (blockIndex === -1) {
                return current;
            }

            return [
                ...current.slice(0, blockIndex),
                {...current[blockIndex], text: before},
                nextBlock,
                ...current.slice(blockIndex + 1),
            ];
        });

        setActiveBlockId(nextBlock.id);
        focusBlock(nextBlock.id, true);
    };

    const savePost = (status = metadata.status) => {
        const slug = slugify(metadata.title);

        if (!slug) {
            setMessage("Add a title before saving.");
            return;
        }

        const saveMessage = status === "published" && metadata.status !== "published"
            ? "Save and publish this post?"
            : "Save changes to this post?";

        if (!window.confirm(saveMessage)) {
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
                    content,
                    previousSlug,
                }),
            });
            const result = await response.json();

            if (!response.ok) {
                setMessage(result.error || "Unable to save post.");
                return;
            }

            const savedLabels = uniqueLabels(result.post.metadata.labels);
            setSavedSnapshot({
                activeBlockId: blocks[0]?.id || "block-0",
                blocks: cloneBlocks(blocks),
                content,
                labels: savedLabels,
                metadata: result.post.metadata,
            });

            setMetadata(result.post.metadata);
            setLabels(savedLabels);
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

        const confirmed = window.prompt(`Type "permanantly delete" to delete "${metadata.title || previousSlug}". This cannot be undone.`);

        if (confirmed !== "permanantly delete") {
            setMessage("Delete cancelled.");
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

    const cancelEdit = () => {
        if (hasUnsavedChanges && !window.confirm("Discard your unsaved edits?")) {
            return;
        }

        const restoredBlocks = cloneBlocks(savedSnapshot.blocks);

        setMetadata({...savedSnapshot.metadata});
        setLabels([...savedSnapshot.labels]);
        setLabelInput("");
        setLabelsOpen(false);
        setDragActive(false);
        setBlocks(restoredBlocks);
        setActiveBlockId(restoredBlocks[0]?.id || "block-0");
        setEditingBlockId(null);
        nextBlockIndex.current = restoredBlocks.length;
        setMessage("");
        router.replace("/admin/blog");
    };

    const insertImageBlock = (url, name) => {
        const alt = cleanLabel(name.replace(/\.[^.]+$/, "")) || "image";
        insertBlockAfter(activeBlock?.id, "image", {alt, url, text: alt});
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

            insertImageBlock(result.url, file.name);

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

    const renderBlockTextarea = (block, className, placeholder) => (
        <textarea
            ref={(node) => setTextareaRef(block.id, node)}
            className={className}
            value={block.text || ""}
            onChange={(event) => {
                updateBlock(block.id, {text: event.target.value});
                rememberSelection(block.id, event.currentTarget);
            }}
            onClick={(event) => rememberSelection(block.id, event.currentTarget)}
            onBlur={(event) => {
                rememberSelection(block.id, event.currentTarget);
                setEditingBlockId((current) => current === block.id ? null : current);
            }}
            onFocus={(event) => {
                setActiveBlockId(block.id);
                setEditingBlockId(block.id);
                rememberSelection(block.id, event.currentTarget);
            }}
            onInput={(event) => {
                fitTextarea(event.currentTarget);
                rememberSelection(block.id, event.currentTarget);
            }}
            onKeyDown={(event) => splitBlock(event, block)}
            onKeyUp={(event) => rememberSelection(block.id, event.currentTarget)}
            onSelect={(event) => rememberSelection(block.id, event.currentTarget)}
            placeholder={placeholder}
            rows={1}
        />
    );

    const renderMarkdownBlock = (block, className, placeholder) => {
        if (editingBlockId === block.id) {
            return renderBlockTextarea(block, className, placeholder);
        }

        const previewClassName = className.replace("admin-block-textarea", "admin-block-preview");
        const hasText = Boolean((block.text || "").trim());

        return (
            <div
                className={`${previewClassName}${hasText ? "" : " placeholder"}`}
                role="textbox"
                tabIndex={0}
                onClick={() => startEditingBlock(block.id)}
                onFocus={() => setActiveBlockId(block.id)}
                onKeyDown={(event) => {
                    if (event.key === "Enter") {
                        event.preventDefault();
                        startEditingBlock(block.id);
                    }
                }}
            >
                <InlineMarkdown content={hasText ? block.text : placeholder}/>
            </div>
        );
    };

    const renderBlock = (block, index) => {
        switch (block.type) {
            case "heading":
                return renderMarkdownBlock(block, `admin-block-textarea admin-heading-block level-${block.level || 2}`, "Heading");
            case "quote":
                return (
                    <blockquote className="admin-block-quote">
                        {renderMarkdownBlock(block, "admin-block-textarea", "Quote")}
                    </blockquote>
                );
            case "list":
                return (
                    <div className="admin-list-block">
                        <span aria-hidden="true">•</span>
                        {renderMarkdownBlock(block, "admin-block-textarea", "List item")}
                    </div>
                );
            case "ordered-list":
                return (
                    <div className="admin-list-block">
                        <span aria-hidden="true">{index + 1}.</span>
                        {renderMarkdownBlock(block, "admin-block-textarea", "List item")}
                    </div>
                );
            case "checklist":
                return (
                    <div className="admin-check-block">
                        <input
                            type="checkbox"
                            checked={Boolean(block.checked)}
                            onChange={(event) => updateBlock(block.id, {checked: event.target.checked})}
                        />
                        {renderMarkdownBlock(block, "admin-block-textarea", "Task")}
                    </div>
                );
            case "code":
                return (
                    <div className="admin-code-block">
                        <input
                            value={block.language || ""}
                            onChange={(event) => updateBlock(block.id, {language: event.target.value})}
                            onFocus={() => setActiveBlockId(block.id)}
                            placeholder="lang"
                        />
                        {renderBlockTextarea(block, "admin-block-textarea", "const idea = true;")}
                    </div>
                );
            case "divider":
                return <hr className="admin-divider-block"/>;
            case "image":
                return (
                    <figure className="admin-image-block">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        {block.url && <img src={block.url} alt={block.alt || ""}/>}
                        <input
                            value={block.alt || ""}
                            onChange={(event) => updateBlock(block.id, {alt: event.target.value, text: event.target.value})}
                            onFocus={() => setActiveBlockId(block.id)}
                            placeholder="Alt text"
                        />
                        <input
                            value={block.url || ""}
                            onChange={(event) => updateBlock(block.id, {url: event.target.value})}
                            onFocus={() => setActiveBlockId(block.id)}
                            placeholder="Image URL"
                        />
                    </figure>
                );
            case "callout":
                return (
                    <div className="admin-callout-block" data-tone={block.tone || "NOTE"}>
                        <span>{block.tone || "NOTE"}</span>
                        {renderMarkdownBlock(block, "admin-block-textarea", "A bright idea worth remembering.")}
                    </div>
                );
            case "table":
                return (
                    <div className="admin-table-block">
                        {renderBlockTextarea(block, "admin-block-textarea", defaultTable)}
                    </div>
                );
            default:
                return renderMarkdownBlock(block, "admin-block-textarea", "Start writing...");
        }
    };

    return (
        <form className="admin-live-editor" onSubmit={(event) => event.preventDefault()}>
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
            <div className="admin-toolbar admin-live-toolbar">
                <button type="button" className="admin-cancel-action" onClick={cancelEdit} disabled={isPending}>
                    <FontAwesomeIcon icon={faXmark}/>
                    Cancel
                </button>
                <button type="button" onClick={() => savePost()} disabled={isPending || !blobConfigured}>
                    <FontAwesomeIcon icon={faFloppyDisk}/>
                    Save
                </button>
                {!isPublished && (
                    <button type="button" className="admin-primary-action" onClick={() => savePost("published")} disabled={isPending || !blobConfigured}>
                        <FontAwesomeIcon icon={faPenNib}/>
                        Publish
                    </button>
                )}
                <span className="admin-live-counter">{message || `${wordCount} words`}</span>
                {previousSlug && (
                    <button type="button" className="admin-danger-action" onClick={deleteCurrentPost} disabled={isPending || !blobConfigured}>
                        <FontAwesomeIcon icon={faTrashCan}/>
                        Delete
                    </button>
                )}
            </div>
            <div className="admin-live-layout">
                <article className={`admin-live-canvas blog-article blog-language-${metadata.language || "en"}`}>
                    <GeneratedBlogCover post={previewMetadata} className="blog-generated-cover"/>
                    <header className="admin-live-hero">
                        {labels.length > 0 && (
                            <div className="admin-preview-labels">
                                {labels.map((label) => (
                                    <span key={label} style={{"--label-color": getBlogLabelColor(label)}}>{label}</span>
                                ))}
                            </div>
                        )}
                        <textarea
                            ref={titleRef}
                            className="admin-live-title"
                            value={metadata.title}
                            onChange={(event) => updateMetadata("title", event.target.value)}
                            onInput={(event) => fitTextarea(event.currentTarget)}
                            rows={1}
                            placeholder="Untitled post"
                            required
                        />
                        <textarea
                            ref={summaryRef}
                            className="admin-live-summary"
                            value={metadata.summary}
                            onChange={(event) => updateMetadata("summary", event.target.value)}
                            onInput={(event) => fitTextarea(event.currentTarget)}
                            rows={2}
                            placeholder="Add a short summary..."
                        />
                        <div className="blog-article-meta">
                            <span>{metadata.status}</span>
                            <span className="meta-dot"/>
                            <span>{metadata.readingTime || 1} min read</span>
                            <span className="meta-dot"/>
                            <span>{wordCount} words</span>
                        </div>
                    </header>
                    <div className="admin-live-blocks blog-article-body" lang={articleLanguage}>
                        {blocks.map((block, index) => (
                            <div
                                className={`admin-live-block ${activeBlockId === block.id ? "active" : ""} block-${block.type}`}
                                key={block.id}
                            >
                                <div className="admin-block-controls" aria-hidden="false">
                                    <button type="button" title="Add block below" aria-label="Add block below" onClick={() => insertBlockAfter(block.id)}>
                                        <FontAwesomeIcon icon={faPlus}/>
                                    </button>
                                    <button type="button" title="Remove block" aria-label="Remove block" onClick={() => removeBlock(block.id)}>
                                        <FontAwesomeIcon icon={faTrashCan}/>
                                    </button>
                                </div>
                                {renderBlock(block, index)}
                            </div>
                        ))}
                    </div>
                    <button type="button" className="admin-add-bottom" onClick={() => insertBlockAfter(blocks[blocks.length - 1]?.id)}>
                        <FontAwesomeIcon icon={faPlus}/>
                        Add block at end
                    </button>
                </article>
                <aside className="admin-style-panel">
                    <section>
                        <h2>
                            <FontAwesomeIcon icon={faPalette}/>
                            Style
                        </h2>
                        <div className="admin-style-grid">
                            {blockTools.map((tool) => (
                                <button
                                    type="button"
                                    key={tool.key}
                                    className={activeBlock?.type === tool.type && (!tool.level || activeBlock.level === tool.level) ? "active" : ""}
                                    onClick={() => replaceActiveBlock(tool)}
                                    title={tool.label}
                                >
                                    <FontAwesomeIcon icon={tool.icon}/>
                                    <span>{tool.label}</span>
                                </button>
                            ))}
                        </div>
                    </section>
                    <section>
                        <h2>
                            <FontAwesomeIcon icon={faWandMagicSparkles}/>
                            Inline
                        </h2>
                        <div className="admin-inline-row">
                            <button type="button" title="Bold" aria-label="Bold" onClick={() => wrapSelection("**", "**", "bold")}>
                                <FontAwesomeIcon icon={faBold}/>
                            </button>
                            <button type="button" title="Italic" aria-label="Italic" onClick={() => wrapSelection("*", "*", "italic")}>
                                <FontAwesomeIcon icon={faItalic}/>
                            </button>
                            <button type="button" title="Code" aria-label="Code" onClick={() => wrapSelection("`", "`", "code")}>
                                <FontAwesomeIcon icon={faCode}/>
                            </button>
                            <button type="button" title="Strike" aria-label="Strike" onClick={() => wrapSelection("~~", "~~", "strike")}>
                                <FontAwesomeIcon icon={faStrikethrough}/>
                            </button>
                            <button type="button" title="Link" aria-label="Link" onClick={() => wrapSelection("[", "](https://)", "link")}>
                                <FontAwesomeIcon icon={faLink}/>
                            </button>
                        </div>
                    </section>
                    <section>
                        <h2>
                            <FontAwesomeIcon icon={faQuoteLeft}/>
                            Callout
                        </h2>
                        <div className="admin-tone-grid">
                            {calloutTones.map((tone) => (
                                <button
                                    type="button"
                                    key={tone.value}
                                    className={activeBlock?.type === "callout" && activeBlock.tone === tone.value ? "active" : ""}
                                    style={{"--tone-color": tone.color}}
                                    onClick={() => setActiveCalloutTone(tone.value)}
                                >
                                    <span/>
                                    {tone.label}
                                </button>
                            ))}
                        </div>
                    </section>
                    <section>
                        <h2>
                            <FontAwesomeIcon icon={faImage}/>
                            Image
                        </h2>
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
                            <strong>Drop image</strong>
                            <small>Uploads as an editable block</small>
                        </button>
                    </section>
                    <section>
                        <h2>
                            <FontAwesomeIcon icon={faPenNib}/>
                            Details
                        </h2>
                        <Field label="Slug" hint="auto">
                            <div className="admin-slug-preview">
                                <span>/blog/</span>
                                <input value={derivedSlug} readOnly/>
                            </div>
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
                    </section>
                </aside>
            </div>
        </form>
    );
}
