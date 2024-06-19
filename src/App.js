import React from "react";
import Home from "./components/home/home/Home";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import BlogPage from "./components/blog/BlogPage";
import {blogsInHomePage} from "./resolvers/blogPicker";

const blogRoutes = blogsInHomePage.map(pageId => ({
    path: `/blog/${pageId}`,
    element: <BlogPage pageId={pageId}/>
}));

const router = createBrowserRouter([
    {path: "/", element: <Home/>},
    ...blogRoutes
]);

const App = () => {
    return (
        <RouterProvider router={router}/>
    );
};

export default App;
