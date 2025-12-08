import React, { useState } from "react";
import HeroBar from "../components/HeroBar";
import "./CreateAccountPage.css";
import { Link } from "react-router-dom";
import SuccesLoginPop from "../components/SuccesLoginPop";

function CreateAccountPage() {
	const [form, setForm] = useState({
		username: "",
		email: "",
		first_name: "",
		last_name: "",
		password: ""
	});
	const [message, setMessage] = useState("");
	const [showPopup, setShowPopup] = useState(false);

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// Email must end with @riotinto.com
		if (!form.email.endsWith("@riotinto.com")) {
			setMessage("Email must end with @riotinto.com");
			return;
		}
		// Password must be numbers only and at least 5 digits
		if (!/^\d{5,}$/.test(form.password)) {
			setMessage("Password must be numbers only and at least 5 digits.");
			return;
		}
		fetch("http://127.0.0.1:8000/api/register/", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(form)
		})
			.then(res => res.json())
			.then(data => {
				if (data.id || data.username) {
					setMessage("Registration successful!");
					setShowPopup(true);
				} else {
					setMessage(data.detail || "Registration failed.");
				}
			})
			.catch(() => setMessage("Registration failed."));
	};

	const handleClosePopup = () => {
		setShowPopup(false);
	};

	return (
		<>
			<HeroBar />
			<SuccesLoginPop show={showPopup} onClose={handleClosePopup} />
			<div className="signup-container">
				<form className="signup-form" onSubmit={handleSubmit}>
					<div className="form-header">
						<h1>Create Account</h1>
					</div>
					<label htmlFor="username">Username</label>
					<input
						type="text"
						id="username"
						name="username"
						value={form.username}
						onChange={handleChange}
						required
						placeholder="Username"
						autoComplete="username"
					/>
					<label htmlFor="first_name">First Name</label>
					<input
						type="text"
						id="first_name"
						name="first_name"
						value={form.first_name}
						onChange={handleChange}
						required
						placeholder="First Name"
						autoComplete="given-name"
					/>
					<label htmlFor="last_name">Last Name</label>
					<input
						type="text"
						id="last_name"
						name="last_name"
						value={form.last_name}
						onChange={handleChange}
						required
						placeholder="Last Name"
						autoComplete="family-name"
					/>
					<label htmlFor="email">Rio Tinto Email Address</label>
					<input
						type="email"
						id="email"
						name="email"
						value={form.email}
						onChange={handleChange}
						required
						placeholder="Your Rio Tinto Email"
						autoComplete="email"
					/>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						id="password"
						name="password"
						value={form.password}
						onChange={handleChange}
						required
						placeholder="Password"
						autoComplete="new-password"
					/>
					<button type="submit">Create Account</button>
					<Link to="/login" className="back-to-login">Back to Login</Link>
				</form>
				{message && <p>{message}</p>}
			</div>
		</>
	);
}

export default CreateAccountPage;
