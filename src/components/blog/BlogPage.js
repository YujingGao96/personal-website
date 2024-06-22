import React, {useEffect, useState} from 'react';
import {NotionRenderer} from "react-notion-x";
import fetchData from "../../api/GetBlog";
import "react-notion-x/src/styles.css";
import './BlogPage.css';

const BlogPage = ({pageId}) => {

    const [recordMap, setRecordMap] = useState(null);
    useEffect(() => {
        fetchData(pageId).then(r => setRecordMap(r));
    }, [pageId]);

    return (
        <div>
            {recordMap == null ?
            <div/> :
            <NotionRenderer recordMap={recordMap} fullPage={true} darkMode/>}
        </div>
    );
};

export default BlogPage;