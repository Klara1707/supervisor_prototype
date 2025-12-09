
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LogInPage.css";
import HeroBar from "../components/HeroBar";

function LogInPage() {
    const navigate = useNavigate();
    const [role, setRole] = useState("");
    const [site, setSite] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleCancel = () => {
        navigate('/');
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (role === "visitor") {
            // Do NOT store or send any login data for visitors
            navigate("/"); // or wherever you want to send the visitor
        } else if (role === "contractor-supervisor") {
            // Use controlled state for email and password
            const response = await fetch("http://127.0.0.1:8000/api/token/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (response.ok) {
                // Store token or any other data as needed
                localStorage.setItem("token", data.access);
                // Store site for later use in progress updates
                localStorage.setItem("site", site);
                // Optionally, store user info if returned
                if (data.user) {
                    localStorage.setItem("user", JSON.stringify(data.user));
                }
                navigate("/"); // or to a protected page
            } else {
                alert(data.detail || "Login failed.");
            }
        } else {
            alert("Please select a role.");
        }
    };

    // State for admin login
    const [adminUsername, setAdminUsername] = useState("");
    const [adminPassword, setAdminPassword] = useState("");

    const handleAdminLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://127.0.0.1:8000/api/admin-token/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: adminUsername,
                    password: adminPassword
                }),
            });
            let data = {};
            try {
                data = await response.json();
            } catch (jsonErr) {
                // If response is not JSON, fallback
                data = {};
            }
            if (response.ok) {
                // Check if user is admin
                if (data.user && (data.user.is_staff || data.user.is_superuser)) {
                    localStorage.setItem("token", data.access);
                    localStorage.setItem("user", JSON.stringify(data.user));
                    navigate("/admindatapage");
                } else {
                    alert("You are not an admin.");
                }
            } else {
                // Show backend error message if available
                alert(data.detail || data.error || "Login failed. Please check your username and password.");
            }
        } catch (error) {
            alert("Error logging in. Please check your network or server.");
        }
    };

    return (
        <>
        <HeroBar />
        <div className="login-container">
            <div className="top-row">
                {/* Welcome Back Login Box */}
                <form className="login-form" onSubmit={handleLogin} style={{marginTop: '-1.5rem'}}>
                    <div className="context-inner-box">
                        <h1>Welcome Back</h1>
                        <p>Please log in to continue</p>
                    </div>
                    <label htmlFor="email">Rio Tinto Email</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        placeholder="Enter Rio Tinto email"
                        autoComplete="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        autoComplete="current-password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
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
                    <div className="form-options">
                        <label>
                            <input type="checkbox" name="remember" autoComplete="off" />
                            Remember Me
                        </label>
                        <a
                            href="http://localhost:8000/password_reset/"
                            className="forgot-link"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Forgot Password?
                        </a>
                    </div>
                    <div className="form-buttons">
                        <button type="submit">Login</button>
                        <button type="button" onClick={handleCancel} className="cancel-button">Cancel</button>
                    </div>
                    {/* New User section inside Welcome Back box, styled like original */}
                    <div className="new-user-box" style={{marginTop: '2rem'}}>
                        <div className="context-inner-box" style={{color: '#cd2c2c', fontWeight: 'normal', fontSize: '1.5rem'}}>New user?</div>
                        <Link to="/createaccount">
                            <button className="create-account-btn">Create Account</button>
                        </Link>
                    </div>
                </form>
                {/* Admin Login Box with username and password - now next to login-form */}
                <div className="admin-login-box" style={{marginTop: '-1.5rem'}}>
                    <div className="context-inner-box">
                        <h1>Admin Login</h1>
                        <p>Please log in with Admin credentials</p>
                    </div>
                    <form className="login-form" onSubmit={handleAdminLogin}>
                        <label htmlFor="admin-username">Username</label>
                        <input
                            type="text"
                            id="admin-username"
                            name="admin-username"
                            placeholder="Enter your username"
                            autoComplete="username"
                            value={adminUsername}
                            onChange={(e) => setAdminUsername(e.target.value)}
                        />
                        <label htmlFor="admin-password">Password</label>
                        <input
                            type="password"
                            id="admin-password"
                            name="admin-password"
                            placeholder="Enter your password"
                            autoComplete="current-password"
                            value={adminPassword}
                            onChange={(e) => setAdminPassword(e.target.value)}
                        />
                        <div className="form-buttons">
                            <button type="submit" className="login-btn">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>
    );
}

export default LogInPage;
