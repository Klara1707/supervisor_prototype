
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

    // State for admin login
    const [adminUsername, setAdminUsername] = useState("");
    const [adminPassword, setAdminPassword] = useState("");

    const handleAdminLogin = (e) => {
        e.preventDefault();
        // You can add validation here if needed
        navigate("/admindatapage");
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
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" placeholder="Enter your username" autoComplete="username" />
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" placeholder="Enter your password" autoComplete="current-password" />
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
                            href="mailto:?subject=Login%20Help&body=Dear%20Admin%20team%2C%20I%20cant%20login%20please%20help.%20Thank%20you"
                            className="forgot-link"
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
