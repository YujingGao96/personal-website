import {LoadingBox, LoadingRegion} from "./LoadingSkeleton";

function Lines({widths = ["100%", "94%", "72%"], height = 14}) {
    return (
        <div className="loading-lines">
            {widths.map((width, index) => (
                <LoadingBox key={index} width={width} height={height} radius={4}/>
            ))}
        </div>
    );
}

function Pills() {
    return (
        <div className="loading-row">
            <LoadingBox width={66} height={26} radius={99}/>
            <LoadingBox width={78} height={26} radius={99}/>
            <LoadingBox width={60} height={26} radius={99}/>
        </div>
    );
}

function SectionHeading() {
    return (
        <div className="loading-section-heading">
            <LoadingBox width={110} height={10} radius={3}/>
            <LoadingBox width="min(290px, 80%)" height={54} radius={6}/>
            <LoadingBox width="min(380px, 90%)" height={14} radius={4}/>
        </div>
    );
}

function HomeBlogCards() {
    return (
        <div className="loading-home-blogs-grid">
            {[0, 1].map((index) => (
                <div className={`loading-panel loading-home-blog-card${index === 0 ? " loading-home-blog-featured" : ""}`} key={index}>
                    <LoadingBox width="100%" height="100%" radius={0} className="loading-home-blog-cover"/>
                    <div className="loading-home-blog-copy">
                        <LoadingBox width={105} height={10} radius={3}/>
                        <Lines widths={["90%", "64%"]} height={25}/>
                        <Lines/>
                        <Pills/>
                    </div>
                </div>
            ))}
        </div>
    );
}

export function HomeBlogsSkeleton() {
    return (
        <LoadingRegion label="Loading posts… / 正在加载文章…" className="loading-home-blogs">
            <SectionHeading/>
            <HomeBlogCards/>
            <div className="loading-centered">
                <LoadingBox width={185} height={56} radius={99}/>
            </div>
        </LoadingRegion>
    );
}

export function HomeSkeleton() {
    return (
        <main className="container loading-home-shell">
            <LoadingRegion label="Loading home… / 正在加载首页…">
                <SectionHeading/>
                <div className="loading-panel loading-home-intro">
                    <div className="loading-home-profile">
                        <LoadingBox width="min(240px, 80%)" height={240} radius={999}/>
                        <LoadingBox width="65%" height={30} radius={5}/>
                        <LoadingBox width="82%" height={14} radius={4}/>
                        <div className="loading-row">
                            <LoadingBox width={40} height={40} radius={99}/>
                            <LoadingBox width={40} height={40} radius={99}/>
                            <LoadingBox width={40} height={40} radius={99}/>
                        </div>
                    </div>
                    <div className="loading-home-code">
                        <div className="loading-row loading-code-toolbar">
                            <LoadingBox width={12} height={12} radius={99}/>
                            <LoadingBox width={12} height={12} radius={99}/>
                            <LoadingBox width={12} height={12} radius={99}/>
                        </div>
                        <Lines widths={["42%", "78%", "63%", "86%", "70%", "58%", "83%", "66%", "38%"]} height={15}/>
                        <LoadingBox width="100%" height={28} radius={5}/>
                    </div>
                </div>
                <div className="loading-home-next">
                    <SectionHeading/>
                    <HomeBlogCards/>
                </div>
            </LoadingRegion>
        </main>
    );
}

export function BlogListSkeleton() {
    return (
        <main className="loading-blog-shell">
            <LoadingRegion label="Loading posts… / 正在加载文章…" className="loading-blog-column">
                <div className="loading-blog-heading">
                    <LoadingBox width={115} height={11} radius={3}/>
                    <LoadingBox width="min(270px, 80%)" height={72} radius={6}/>
                    <LoadingBox width="min(410px, 95%)" height={15} radius={4}/>
                </div>
                <LoadingBox width="100%" height={50} radius={12}/>
                <div className="loading-blog-filters"><Pills/></div>
                <div className="loading-row loading-between">
                    <LoadingBox width={82} height={12} radius={3}/>
                    <LoadingBox width={140} height={30} radius={8}/>
                </div>
                <div className="loading-post-list">
                    {[0, 1, 2, 3].map((index) => (
                        <div className="loading-panel loading-post-card" key={index}>
                            <LoadingBox width={165} height={11} radius={3}/>
                            <LoadingBox width={index % 2 ? "66%" : "85%"} height={25} radius={5}/>
                            <Lines widths={["100%", "76%"]}/>
                        </div>
                    ))}
                </div>
            </LoadingRegion>
        </main>
    );
}

function ArticleContents({editor = false}) {
    return (
        <>
            <LoadingBox width="100%" height={editor ? "clamp(220px, 24vw, 360px)" : "auto"} radius="1.45rem" className="loading-article-cover"/>
            <div className="loading-article-heading">
                <LoadingBox width="55%" height={11} radius={3}/>
                <Lines widths={["94%", "65%"]} height="clamp(35px, 5vw, 54px)"/>
                <LoadingBox width={195} height={12} radius={3}/>
                <Pills/>
                <Lines widths={["100%", "88%"]} height={17}/>
            </div>
            <div className="loading-article-body">
                <Lines widths={["100%", "97%", "100%", "92%", "58%"]} height={16}/>
                <LoadingBox width="48%" height={28} radius={5}/>
                <Lines widths={["100%", "96%", "100%", "74%"]} height={16}/>
            </div>
        </>
    );
}

export function BlogArticleSkeleton() {
    return (
        <main className="loading-blog-shell">
            <LoadingRegion label="Loading article… / 正在加载文章…" className="loading-blog-column">
                <div className="loading-article-topbar">
                    <LoadingBox width={105} height={16} radius={4}/>
                    <LoadingBox width={106} height={38} radius={99}/>
                </div>
                <ArticleContents/>
            </LoadingRegion>
        </main>
    );
}

export function AdminListSkeleton() {
    return (
        <main className="loading-admin-shell">
            <LoadingRegion label="Loading posts… / 正在加载文章…" className="loading-admin-column">
                <div className="loading-admin-heading">
                    <div className="loading-lines">
                        <LoadingBox width={38} height={11} radius={3}/>
                        <LoadingBox width="min(330px, 80vw)" height={64} radius={6}/>
                        <LoadingBox width="min(390px, 80vw)" height={15} radius={4}/>
                    </div>
                    <LoadingBox width={112} height={39} radius={99}/>
                </div>
                <div className="loading-post-list">
                    {[0, 1, 2, 3].map((index) => (
                        <div className="loading-panel loading-admin-post" key={index}>
                            <div className="loading-lines">
                                <LoadingBox width={68} height={18} radius={99}/>
                                <LoadingBox width={index % 2 ? "58%" : "78%"} height={25} radius={5}/>
                                <LoadingBox width="90%" height={14} radius={4}/>
                            </div>
                            <LoadingBox width={72} height={36} radius={99}/>
                        </div>
                    ))}
                </div>
            </LoadingRegion>
        </main>
    );
}

export function BlogEditorSkeleton() {
    return (
        <main className="loading-admin-shell">
            <LoadingRegion label="Loading editor… / 正在加载编辑器…" className="loading-admin-column">
                <div className="loading-panel loading-editor-toolbar loading-row">
                    <LoadingBox width={75} height={36} radius={99}/>
                    <LoadingBox width={82} height={36} radius={99}/>
                    <LoadingBox width={94} height={36} radius={99}/>
                </div>
                <div className="loading-editor-grid">
                    <div className="loading-panel loading-editor-canvas"><ArticleContents editor/></div>
                    <div className="loading-panel loading-editor-settings">
                        <LoadingBox width={100} height={20} radius={4}/>
                        {[0, 1, 2].map((index) => (
                            <div className="loading-lines" key={index}>
                                <LoadingBox width="45%" height={11} radius={3}/>
                                <LoadingBox width="100%" height={40} radius={10}/>
                            </div>
                        ))}
                    </div>
                </div>
            </LoadingRegion>
        </main>
    );
}

export function AuthFormSkeleton() {
    return (
        <LoadingRegion label="Loading account… / 正在加载账户…">
            <div className="loading-auth-form loading-panel">
                <div className="loading-auth-heading">
                    <LoadingBox width="64%" height={25} radius={5}/>
                    <LoadingBox width="88%" height={13} radius={4}/>
                </div>
                <div className="loading-row">
                    <LoadingBox width="100%" height={40} radius={9}/>
                    <LoadingBox width="100%" height={40} radius={9}/>
                </div>
                <div className="loading-auth-divider"/>
                {[0, 1].map((index) => (
                    <div className="loading-lines" key={index}>
                        <LoadingBox width={85} height={12} radius={3}/>
                        <LoadingBox width="100%" height={40} radius={9}/>
                    </div>
                ))}
                <LoadingBox width="100%" height={40} radius={9}/>
                <div className="loading-centered"><LoadingBox width="72%" height={12} radius={3}/></div>
            </div>
        </LoadingRegion>
    );
}
