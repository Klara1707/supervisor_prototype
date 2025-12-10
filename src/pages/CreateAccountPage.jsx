import React, { useState } from "react";
import HeroBar from "../components/HeroBar";
import "./CreateAccountPage.css";
import { Link } from "react-router-dom";
import SuccesLoginPop from "../components/SuccesLoginPop";

function CreateAccountPage() {
	const [form, setForm] = useState({
		username: "",
		first_name: "",
		last_name: "",
		password: "",
		site: ""
	});
	const [message, setMessage] = useState("");
	const [showPopup, setShowPopup] = useState(false);

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// Username must end with @riotinto.com
		if (!form.username.endsWith("@riotinto.com")) {
			setMessage("Username must end with @riotinto.com");
			return;
		}
		// Make username case-insensitive
		const formToSend = { ...form, username: form.username.toLowerCase() };
		fetch("http://127.0.0.1:8000/api/register/", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(formToSend)
		})
			.then(res => res.json())
			.then(data => {
				if (data.id || data.email) {
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
					<label htmlFor="username">Rio Tinto Email</label>
					<input
						type="text"
						id="username"
						name="username"
						value={form.username}
						onChange={handleChange}
						required
						placeholder=".............@riotinto.com"
						autoComplete="username"
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
					<label htmlFor="site">Select Site<span style={{color: 'red'}}>*</span></label>
					<select
						id="site"
						name="site"
						value={form.site}
						onChange={handleChange}
						required
						className="signup-input"
						style={{
							padding: '0.75rem',
							fontSize: '1rem',
							border: '1px solid #ccc',
							borderRadius: '4px',
							marginBottom: '16px'
						}}
					>
						<option value="">-- Choose a Hub --</option>
						<option value="robevalley">Robe Valley</option>
						<option value="greaterhopedowns">Greater Hope Downs</option>
						<option value="restofeast">Rest of East</option>
						<option value="restofwest">Rest of West</option>
					</select>
					<button type="submit">Create Account</button>
					<Link to="/login" className="back-to-login">Back to Login</Link>
				</form>
				{message && <p>{message}</p>}
			</div>
		</>
	);
}

export default CreateAccountPage;
