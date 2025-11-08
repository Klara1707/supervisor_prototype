
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import LogInPages from "./pages/LogInPages.jsx";
import './index.css';

const router = createBrowserRouter([
    {
        path: "/",
        children: [
        { path: "/", element: <HomePage /> },
        { path: "/login", element: <LogInPages /> },
        ],
    },
    ]);

    ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} basename="/supervisor_prototype/" />
    </React.StrictMode>
);
