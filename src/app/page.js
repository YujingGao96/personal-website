import Home from "../components/home/home/Home";
import {resolveBlogLanguage} from "../lib/blog/serverLanguage";

export const revalidate = 21600;

export default async function HomeRoute({searchParams}) {
    const blogLanguage = await resolveBlogLanguage(searchParams);

    return <Home blogLanguage={blogLanguage}/>;
}
