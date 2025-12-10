

import { createBrowserRouter } from 'react-router-dom';
import LogInPage from "./pages/LogInPage";
import CreateAccountPage from "./pages/CreateAccountPage";
import AdminDataPage from "./pages/AdminDataPage";
import HomePage from "./pages/HomePage";

const router = createBrowserRouter(
    [
        { path: "/", element: <LogInPage /> },
        { path: "/login", element: <LogInPage /> },
        { path: "/createaccount", element: <CreateAccountPage /> },
        { path: "/admindatapage", element: <AdminDataPage /> },
        { path: "/home", element: <HomePage /> },
        // { path: "/admin", element: <AdminPage /> },
    ],
    { basename: "/supervisor_prototype" }
);

export default router;
