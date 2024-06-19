import React, {useEffect, useState} from 'react';
import { NotionRenderer } from "react-notion-x";
import fetchData from "../../api/GetBlog";
import "react-notion-x/src/styles.css";

const BlogPage = ({pageId}) => {

    const [recordMap, setRecordMap] = useState(null);
    useEffect(() => {
        fetchData(pageId).then(r => setRecordMap(r));
    }, []);

    return recordMap == null ?
            <div/> :
            <NotionRenderer recordMap={recordMap} fullPage={true} darkMode/>;
};

export default BlogPage;