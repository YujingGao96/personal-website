import {Suspense} from "react";
import Intro from "../intro/Intro";
import Projects from "../personalproject/Projects";
import Timeline from "../timeline/Timeline";
import Compliments from "../compliment/Compliments";
import Blogs from "../blog/Blogs";
import BottomFrame from "../bottomframe/BottomFrame";
import FluidCursor from "./FluidCursor";
import {DEFAULT_BLOG_LANGUAGE} from "../../../lib/blog/language";
import {HomeBlogsSkeleton} from "../../common/PageSkeletons";

export default function Home({blogLanguage = DEFAULT_BLOG_LANGUAGE}) {
    return (
        <div className="signal-page" lang={blogLanguage === "zh" ? "zh-Hans" : "en"}>
            <FluidCursor/>
            <main className="signal-content">
                <Intro language={blogLanguage}/>
                <section><Projects language={blogLanguage}/></section>
                <section>
                    <Suspense fallback={<HomeBlogsSkeleton/>}>
                        <Blogs language={blogLanguage}/>
                    </Suspense>
                </section>
                <section><Timeline language={blogLanguage}/></section>
                <section><Compliments language={blogLanguage}/></section>
            </main>
            <BottomFrame blogLanguage={blogLanguage}/>
        </div>
    );
}
