
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LogInPage.css";
import HeroBar from "../components/HeroBar";

function LogInPage() {
    const navigate = useNavigate();
    const [role, setRole] = useState("");
    const [site, setSite] = useState("");

    const handleCancel = () => {
        navigate('/');
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (role === "contractor-supervisor" || role === "visitor") {
            navigate("/");
        } else {
            // No role selected, stay on page or show error
            alert("Please select a role.");
        }
    };

    return (
        <>
        <HeroBar />
        <div className="login-container">
            {/* New User Box */}
            <div className="new-user-box">
                <div>New user?</div>
                    <Link to="/createaccount">
                <button className="create-account-btn">Create Account</button>
                </Link>
            </div>
            <form className="login-form" onSubmit={handleLogin}>
            {/* Welcome Text at the Top */}
            <div className="form-header">
                <h1>Welcome Back</h1>
                <p>Please log in to continue</p>
            </div>

            {/* Username & Password */}
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" placeholder="Enter your username" autoComplete="username" />

            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" placeholder="Enter your password" autoComplete="current-password" />

            {/* Role Selection */}
            <label htmlFor="role">Select Role</label>
            <select
                id="role"
                name="role"
                className="form-select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
            >
                <option value="">-- Please choose an option --</option>
                <option value="contractor-supervisor">Contractor Supervisor</option>
                <option value="visitor">Visitor</option>
            </select>

            {/* Conditional Site Dropdown */}
            {role === "contractor-supervisor" && (
                <>
                <label htmlFor="site">Select Site</label>
                <select
                    id="site"
                    name="site"
                    className="form-select"
                    value={site}
                    onChange={(e) => setSite(e.target.value)}
                >
                    <option value="">-- Choose a Hub --</option>
                    <option value="robe-valley">Robe Valley</option>
                    <option value="greater-hope-downs">Greater Hope Downs</option>
                    <option value="rest-of-east">Rest of East</option>
                    <option value="rest-of-west">Rest of West</option>
                </select>
                </>
            )}

            {/* Options */}
            <div className="form-options">
                <label>
                <input type="checkbox" name="remember" autoComplete="off" />
                Remember Me
                </label>
                                <a
                                    href="mailto:?subject=Login%20Help&body=Dear%20Admin%20team%2C%20I%20cant%20login%20please%20help.%20Thank%20you"
                                    className="forgot-link"
                                >
                                    Forgot Password?
                                </a>
            </div>

            {/* Buttons */}
            <div className="form-buttons">
                <button type="submit">Login</button>
                <button type="button" onClick={handleCancel} className="cancel-button">Cancel</button>
            </div>
            </form>
        </div>
        </>
    );
}

export default LogInPage;
