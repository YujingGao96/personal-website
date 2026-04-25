import BlogPage from "../../../components/blog/BlogPage";

export default async function BlogRoute({params}) {
    const {pageId} = await params;

    return <BlogPage pageId={pageId}/>;
}
