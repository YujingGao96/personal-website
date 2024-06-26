import React from "react";
import Home from "./components/home/home/Home";
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import BlogPage from "./components/blog/BlogPage";
import ErrorPage from "./components/error/ErrorPage";

const router = createBrowserRouter([
    {
        path: "/",
        errorElement: <Navigate to="/error/404"/>,
        children: [
            {index: true, element: <Home/>},
            {path: "blog/:pageId", element: <BlogPage/>},
            {path: "error/:errorCode", element: <ErrorPage/>}
        ]
    }
]);

const App = () => {
    return (
        <RouterProvider router={router}/>
    );
};

export default App;
