import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import PasswordResetForm from "../components/PasswordResetForm";
import HeroBar from "../components/HeroBar";
import "./LogInPage.css";

// ...existing code...

function AdminLogin({ onSuccess }) {
    // Removed undefined variables from console.log to fix ESLint error
    const [adminUsername, setAdminUsername] = useState("");
    const [adminPassword, setAdminPassword] = useState("");
    const navigate = useNavigate();

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
                data = {};
            }
            if (response.ok) {
                if (data.user && (data.user.is_staff || data.user.is_superuser)) {
                    localStorage.setItem("token", data.access);
                    localStorage.setItem("user", JSON.stringify(data.user));
                    if (onSuccess) onSuccess();
                    navigate("/admindatapage");
                    // Force reload to ensure fresh data
                    window.location.reload();
                } else {
                    alert("You are not an admin.");
                }
            } else {
                alert(data.detail || data.error || "Login failed. Please check your username and password.");
            }
        } catch (error) {
            alert("Error logging in. Please check your network or server.");
        }
    };

    return (
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
    );
}


function LogInPage() {
    const navigate = useNavigate();
    const [role, setRole] = useState("");
    const [site, setSite] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [showAdminLogin, setShowAdminLogin] = useState(false);
    const [showResetPopup, setShowResetPopup] = useState(false);

    const handleCancel = () => {
        setUsername("");
        setPassword("");
        setSite("");
        setRole("");
        setRememberMe(false);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        // Validate email format for username
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(username)) {
            alert("klara.vandenburg@yahoo.com");
            return;
        }
        if (role === "visitor") {
            navigate("/");
        } else if (role === "contractor-supervisor") {
            if (!site || site === "") {
                alert("Please select a site before logging in.");
                return;
            }
            // Make username and site case-insensitive
            const siteValue = site ? site.toLowerCase() : site;
            if (!siteValue) {
                alert("Site value missing. Please select a site.");
                return;
            }
            console.log("Submitting login", { username: username.toLowerCase(), password, site: siteValue });
            const response = await fetch("http://127.0.0.1:8000/api/token/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: username.toLowerCase(), password, site: siteValue }),
            });
            const data = await response.json();
                console.log("LOGIN RESPONSE:", data);
            if (response.ok) {
                // Always clear both storages before saving new login data
                localStorage.clear();
                sessionStorage.clear();
                const storage = rememberMe ? localStorage : sessionStorage;
                    // Always use 'access' property as the token
                    const token = data.access || null;
                storage.setItem("token", token);
                storage.setItem("site", siteValue);
                if (data.user) {
                    // Optionally, ensure user.site is also lowercased for consistency
                    const userObj = { ...data.user, site: data.user.site ? data.user.site.toLowerCase() : data.user.site };
                    storage.setItem("user", JSON.stringify(userObj));
                }
                navigate("/home");
            } else {
                alert(data.detail || "Login failed.");
            }
        } else {
            alert("Please select a role.");
        }
    };


    return (
        <>
        <HeroBar />
        <div className="login-container">
            <div className="top-row">
                {/* New User section at the top of the login form */}
                <form className="login-form" onSubmit={handleLogin} style={{marginTop: '-1.0rem', gap: '0.4rem'}}>
                    <div className="new-user-box" style={{marginBottom: '0.1rem', marginTop: '-1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#f8f9fa', borderRadius: '6px', padding: '0.5rem 1rem', justifyContent: 'flex-start'}}>
                        <span style={{color: '#cd2c2c', fontWeight: 'normal', fontSize: '1.2rem', margin: 0}}>New user?</span>
                        <Link to="/createaccount">
                            <button className="create-account-btn" style={{marginLeft: '0.5rem'}}>Create Account</button>
                        </Link>
                    </div>
                    <div className="context-inner-box" style={{paddingBottom: '0.1rem'}}>
                        <h1>Welcome Back</h1>
                        <p>Please log in to continue</p>
                    </div>
                    <label htmlFor="username">Email address</label>
                    <input
                        type="email"
                        id="username"
                        name="username"
                        placeholder="Enter your email address"
                        autoComplete="username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        className="login-form-input"
                        style={{border: '1px solid #ccc', marginBottom: '0.3rem'}}
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
                        className="login-form-input"
                        style={{border: '1px solid #ccc', marginBottom: '0.3rem'}}
                    />
                    <label htmlFor="role">Select Role</label>
                    <select
                        id="role"
                        name="role"
                        className="form-select"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        style={{marginBottom: '0.3rem'}}
                    >
                        <option value="">-- Please choose an option --</option>
                        <option value="contractor-supervisor">Contractor Supervisor</option>
                        <option value="visitor">Visitor</option>
                    </select>
                    {role === "contractor-supervisor" && (
                        <>
                        <label htmlFor="site">Select Site<span style={{color: 'red'}}>*</span></label>
                        <select
                            id="site"
                            name="site"
                            className="form-select"
                            value={site}
                            onChange={(e) => {
                                console.log("Site dropdown changed to:", e.target.value);
                                setSite(e.target.value);
                            }}
                            required
                            style={{ border: site ? '1px solid #ccc' : '2px solid red', marginBottom: '0.3rem' }}
                        >
                            <option value="">-- Choose a Hub --</option>
                            <option value="robevalley">Robe Valley</option>
                            <option value="greaterhopedowns">Greater Hope Downs</option>
                            <option value="restofeast">Rest of East</option>
                            <option value="restofwest">Rest of West</option>
                        </select>
                        </>
                    )}
                    <div className="form-options">
                        <label>
                            <input
                                type="checkbox"
                                name="remember"
                                autoComplete="off"
                                checked={rememberMe}
                                onChange={e => setRememberMe(e.target.checked)}
                            />
                            Remember Me
                        </label>
                        <button
                            type="button"
                            className="forgot-link"
                            style={{marginLeft: '1rem', background: 'none', border: 'none', color: '#004b87', cursor: 'pointer', textDecoration: 'underline', fontSize: '0.9rem'}}
                            onClick={() => setShowResetPopup(true)}
                        >
                            Reset Password
                        </button>
                    </div>
                    <div className="form-buttons">
                        <button type="submit">Login</button>
                        <button type="button" onClick={handleCancel} className="cancel-button">Cancel</button>
                    </div>
                </form>
                {/* Admin Login Toggle Button below login form */}
                <div style={{marginTop: '2rem', textAlign: 'center'}}>
                    <button
                        className="admin-login-toggle"
                        onClick={() => setShowAdminLogin(v => !v)}
                        type="button"
                    >
                        {showAdminLogin ? "Hide Admin Login" : "Admin Login"}
                    </button>
                </div>
                {/* Admin Login Box with username and password - toggled */}
                {showAdminLogin && <AdminLogin onSuccess={() => setShowAdminLogin(false)} />}
                {/* Password Reset Popup */}
                {showResetPopup && (
                    <div style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        background: 'rgba(0,0,0,0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1000
                    }}>
                        <div className="admin-login-box" style={{position: 'relative', maxWidth: '400px', width: '100%'}}>
                            <div className="context-inner-box" style={{marginBottom: '1rem'}}>
                                <h1 style={{margin: 0}}>Reset Password</h1>
                            </div>
                            <button
                                style={{position: 'absolute', top: 8, right: 8, background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer'}}
                                onClick={() => setShowResetPopup(false)}
                                aria-label="Close"
                            >
                                &times;
                            </button>
                            <PasswordResetForm />
                        </div>
                    </div>
                )}
            </div>
        </div>
        </>
    );
}

export default LogInPage;
