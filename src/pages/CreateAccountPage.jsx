import React, { useState } from "react";
import HeroBar from "../components/HeroBar";
import "./CreateAccountPage.css";
import { Link } from "react-router-dom";

function CreateAccountPage() {
	const [fullName, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		// Add submit logic here
	};

	return (
		<>
			<HeroBar />
			<div className="signup-container">
				<form className="signup-form" onSubmit={handleSubmit}>
					<div className="form-header">
						<h1>Create Account</h1>
					</div>
										<label htmlFor="fullName">Full Name</label>
										<input
												type="text"
												id="fullName"
												name="fullName"
												value={fullName}
												onChange={(e) => setFullName(e.target.value)}
												required
												placeholder="Full Name"
										/>

					<label htmlFor="email">Rio Tinto Email Address</label>
					<input
						type="email"
						id="email"
						name="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
                        placeholder="Your Rio Tinto Email"
					/>

					<label htmlFor="password">Password</label>
					<input
						type="password"
						id="password"
						name="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
                        placeholder="Your SAP Number"
					/>

					<button type="submit">Create Account</button>
					<Link to="/login">
						<button type="button" className="back-to-login">Back to Login</button>
					</Link>
				</form>
			</div>
		</>
	);
}

export default CreateAccountPage;
