import React, {useEffect, useState} from 'react';
import {NotionRenderer} from "react-notion-x";
import fetchData from "../../api/GetBlog";
import "react-notion-x/src/styles.css";
import {useRouter} from 'next/router';

const BlogPage = () => {
    const router = useRouter();
    const {pageId} = router.query;

    const [recordMap, setRecordMap] = useState(null);
    useEffect(() => {
        const fetchPage = async (pageId) => {
            try {
                const data = await fetchData(pageId);
                setRecordMap(data);
            } catch (error) {
                router.push('/error/500');
            }
        };
        fetchPage(pageId)
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