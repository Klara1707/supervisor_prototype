
import React, { useState } from "react";
import HeroBar from "../components/HeroBar";
import "./CreateAccountPage.css";
import { Link } from "react-router-dom";
import SuccesLoginPop from "../components/SuccesLoginPop";
import { registerUser } from "../api";

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

	const handleSubmit = async (e) => {
		e.preventDefault();
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(form.username)) {
			setMessage("Please enter a valid email address.");
			return;
		}
		try {
			await registerUser({
				username: form.username.toLowerCase(),
				password: form.password,
				first_name: form.first_name,
				last_name: form.last_name,
				site: form.site,
			});
			setMessage("Registration successful!");
			setShowPopup(true);
			// Optionally handle more success UI here
		} catch (err) {
			setMessage(err.message || "Registration failed.");
		}
	};

	const handleClosePopup = () => {
		setShowPopup(false);
	};

	return (
		<>
			<HeroBar />
			<SuccesLoginPop show={showPopup} onClose={handleClosePopup} />
			<div className="signup-container">
				<form className="signup-form" onSubmit={handleSubmit} aria-labelledby="signup-form-header">
					<div className="form-header">
						<h1 id="signup-form-header" style={{ fontSize: '2.0rem', fontWeight: 'bold' }}>Create Account</h1>
					</div>
					<div aria-live="polite" aria-atomic="true" style={{ minHeight: '1.5em', color: message === 'Registration successful!' ? '#388e3c' : '#cd2c2c', fontWeight: message === 'Registration successful!' ? 'normal' : 'bold', marginBottom: '0.5rem' }}>
						{message}
					</div>
					<label htmlFor="first_name">First Name</label>
					<input
						type="text"
						id="first_name"
						name="first_name"
						value={form.first_name}
						onChange={handleChange}
						required
						aria-required="true"
						placeholder="First Name"
						autoComplete="given-name"
						style={{border: '1px solid #ccc'}}
					/>
					<label htmlFor="last_name">Last Name</label>
					<input
						type="text"
						id="last_name"
						name="last_name"
						value={form.last_name}
						onChange={handleChange}
						required
						aria-required="true"
						placeholder="Last Name"
						autoComplete="family-name"
						style={{border: '1px solid #ccc'}}
					/>
					<label htmlFor="username">Email address</label>
					<input
						type="email"
						id="username"
						name="username"
						value={form.username}
						onChange={handleChange}
						required
						aria-required="true"
						placeholder="Enter your email address"
						autoComplete="username"
						style={{border: '1px solid #ccc'}}
					/>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						id="password"
						name="password"
						value={form.password}
						onChange={handleChange}
						required
						aria-required="true"
						placeholder="Password"
						autoComplete="new-password"
						style={{border: '1px solid #ccc'}}
					/>
					<label htmlFor="site">Select Site<span style={{color: 'red'}}>*</span></label>
					<select
						id="site"
						name="site"
						value={form.site}
						onChange={handleChange}
						required
						aria-required="true"
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
