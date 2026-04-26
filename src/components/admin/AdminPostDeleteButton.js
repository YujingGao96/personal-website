"use client";

import {useTransition} from "react";
import {useRouter} from "next/navigation";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashCan} from "@fortawesome/free-solid-svg-icons";

export default function AdminPostDeleteButton({slug, title, status}) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const deletePost = () => {
        const confirmed = window.confirm(`Delete "${title || slug}"? This removes the ${status} post from blog storage.`);

        if (!confirmed) {
            return;
        }

        startTransition(async () => {
            const response = await fetch(`/api/admin/blog/posts/${encodeURIComponent(slug)}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                const result = await response.json().catch(() => ({}));
                window.alert(result.error || "Unable to delete post.");
                return;
            }

            router.refresh();
        });
    };

    return (
        <button className="admin-post-delete" type="button" onClick={deletePost} disabled={isPending}>
            <FontAwesomeIcon icon={faTrashCan}/>
            Delete
        </button>
    );
}
