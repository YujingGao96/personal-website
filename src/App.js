import React from "react";
import Home from "./components/home/home/Home";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import BlogPage from "./components/blog/BlogPage";

const router = createBrowserRouter([
    {path: "/", element: <Home/>},
    {path: "/blog", element: <BlogPage/>}
]);

const App = () => {
    return (
        <RouterProvider router={router}/>
    );
};

export default App;