"use client";

import React, {useEffect, useState} from "react";
import {NotionRenderer} from "react-notion-x";
import {useRouter} from "next/navigation";
import BlogService from "../../services/BlogService";

const BlogPage = ({pageId}) => {
    const router = useRouter();
    const [recordMap, setRecordMap] = useState(null);

    useEffect(() => {
        const fetchPage = async () => {
            try {
                const data = await BlogService.getPage(pageId);
                setRecordMap(data);
            } catch {
                router.push("/error/500");
            }
        };

        fetchPage();
    }, [pageId, router]);

    return (
        <div>
            {recordMap === null ? <div/> : <NotionRenderer recordMap={recordMap} fullPage darkMode/>}
        </div>
    );
};

export default BlogPage;
