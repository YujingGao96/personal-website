import React, { useEffect, useState } from 'react';
import { NotionRenderer } from 'react-notion-x';
import fetchData from '../../api/GetBlog';
import { useRouter } from 'next/router';

const BlogPage = () => {
    const router = useRouter();
    const {pageId} = router.query;

    const [recordMap, setRecordMap] = useState(null);
    useEffect(() => {
        if (!pageId) return;
        const fetchPage = async () => {
            try {
                const data = await fetchData(pageId);
                setRecordMap(data);
            } catch {
                router.push('/error/500');
            }
        };
        fetchPage();
    }, [pageId, router]);

    return (
        <div>
            {recordMap == null ?
            <div/> :
            <NotionRenderer recordMap={recordMap} fullPage={true} darkMode/>}
        </div>
    );
};

export default BlogPage;