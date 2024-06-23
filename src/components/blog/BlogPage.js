import React, {useEffect, useState} from 'react';
import {NotionRenderer} from "react-notion-x";
import fetchData from "../../api/GetBlog";
import "react-notion-x/src/styles.css";
import './BlogPage.css';
import {useParams, useNavigate} from "react-router-dom";

const BlogPage = () => {
    const {pageId} = useParams();
    const navigate = useNavigate();

    const [recordMap, setRecordMap] = useState(null);
    useEffect(() => {
        const fetchPage = async (pageId) => {
            try {
                const data = await fetchData(pageId);
                setRecordMap(data);
            } catch (error) {
                navigate('/error/500');
            }
        };
        fetchPage(pageId)
    }, [pageId, navigate]);

    return (
        <div>
            {recordMap == null ?
            <div/> :
            <NotionRenderer recordMap={recordMap} fullPage={true} darkMode/>}
        </div>
    );
};

export default BlogPage;