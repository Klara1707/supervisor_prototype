import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogInPage from "./pages/LogInPage";
import PasswordResetForm from "./components/PasswordResetForm";
import CreateAccountPage from "./pages/CreateAccountPage";
import AdminDataPage from "./pages/AdminDataPage";
import HomePage from "./pages/HomePage";

function AppRouter() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<LogInPage />} />
				<Route path="/login" element={<LogInPage />} />
				<Route path="/createaccount" element={<CreateAccountPage />} />
				<Route path="/admindatapage" element={<AdminDataPage />} />
				<Route path="/home" element={<HomePage />} />
				<Route path="/reset-password" element={<PasswordResetForm />} />
				{/* <Route path="/admin" element={<AdminPage />} /> */}
			</Routes>
		</BrowserRouter>
	);
}

export default AppRouter;
