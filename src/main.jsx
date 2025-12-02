
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import LogInPage from "./pages/LogInPage.jsx";
import CreateAccountPage from "./pages/CreateAccountPage.jsx";
import './index.css';

const router = createBrowserRouter(
    [
        {
        path: "/",
        children: [
            { path: "", element: <HomePage /> },
            { path: "login", element: <LogInPage /> },
            { path: "createaccount", element: <CreateAccountPage /> },
            { path: "admindata", element: <AdminDataPage /> },
        ],
        },
    ],
);

    ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
    );

