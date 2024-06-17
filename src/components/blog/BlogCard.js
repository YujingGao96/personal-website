import React from 'react';
import blogImage from "../../images/git-merge-rebase.webp"

const BlogCard = () => {
    return (

        <div className="card dark-bg text-light rounded-all h-100 blur-background">
            <img src={blogImage} className="card-img-top rounded-top" alt={blogImage}/>
            <div className="card-body">
                <h5 className="card-title">Difference Between Git Merge and Git Rebase</h5>
                <p className="card-text font-weight-light">
                    <code>Git merge</code> and <code>git rebase</code> are both commands used to integrate changes from
                    one branch into another in the Git version control system. They are used for similar purposes, but
                    they function differently and can lead to different results.
                </p>
                <p className="card-text font-weight-light">
                    The confusion between <code>Git merge</code> and <code>git rebase</code> often arises because they
                    are used for similar purposes (to integrate changes from one branch into another), but they work
                    differently and can lead to different outcomes. Choosing between them often depends on the specific
                    situation, your project's needs, and your personal or your team's preference.</p>
            </div>
        </div>

    );
};

export default BlogCard;