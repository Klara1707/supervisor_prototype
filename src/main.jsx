
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import LogInPages from "./pages/LogInPage.jsx";
import './index.css';

const router = createBrowserRouter(
    [
        {
        path: "/",
        children: [
            { path: "/", element: <HomePage /> },
            { path: "/login", element: <LogInPages /> },
        ],
        },
    ],
    {
        basename: "/supervisor_prototype",
    }
    );

    ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
