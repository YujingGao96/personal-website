import React from "react";
import PreviewCard from "./PreviewCard";

const Blogs = () => {
    return (
        <div id="blogs">
            <h1 className="text-center gradient-text-5 font-weight-bold">Blogs</h1>
            <div className="row mt-5">
                <PreviewCard title="Difference Between Git Merge and Git Rebase"
                             text="Git merge and rebase are both ways to integrate changes from one branch into another. The main difference between the two is that merge creates a new commit, while rebase rewrites history."/>
                <PreviewCard title="Difference Between Git Merge and Git Rebase"
                             text="Git merge and rebase are both ways to integrate changes from one branch into another. The main difference between the two is that merge creates a new commit, while rebase rewrites history."/>
                <PreviewCard title="Difference Between Git Merge and Git Rebase"
                             text="Git merge and rebase are both ways to integrate changes from one branch into another. The main difference between the two is that merge creates a new commit, while rebase rewrites history."/>
            </div>
        </div>

    );
};

export default Blogs;