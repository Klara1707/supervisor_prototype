

import { createBrowserRouter } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import LogInPage from "./pages/LogInPage";
import CreateAccountPage from "./pages/CreateAccountPage";
import AdminDataPage from "./pages/AdminDataPage";
import AdminPage from "./components/AdminPage";

const router = createBrowserRouter(
    [
        { path: "/", element: <HomePage /> },
        { path: "/login", element: <LogInPage /> },
        { path: "/createaccount", element: <CreateAccountPage /> },
        { path: "/admindatapage", element: <AdminDataPage /> },
        { path: "/admin", element: <AdminPage /> },
    ],
    { basename: "/supervisor_prototype" }
);

export default router;
