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
		// Email must be valid format
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(form.username)) {
			setMessage("Please enter a valid email address.");
			return;
		}
		// Make username case-insensitive
		const formToSend = { ...form, username: form.username.toLowerCase() };
		fetch("http://127.0.0.1:8000/api/register/", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(formToSend)
		})
			.then(res => {
				if (!res.ok) {
					return res.json().then(err => { 
						console.log("Registration error:", err); 
						alert("Registration error: " + JSON.stringify(err));
						throw err; 
					});
				}
				return res.json();
			})
			.then(data => {
				if (data.id || data.email) {
					setMessage("Registration successful!");
					setShowPopup(true);
				} else {
					setMessage(data.detail || "Registration failed.");
				}
			})
			.catch((err) => {
				setMessage("Registration failed.");
			});
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
