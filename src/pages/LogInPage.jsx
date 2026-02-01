

import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import AdminLoginForm from "../components/AdminLoginForm";
import PasswordResetForm from "../components/PasswordResetForm";
import HeroBar from "../components/HeroBar";

import API_BASE from "../config";




function LogInPage() {
    const handleLogin = async (e) => {
        e.preventDefault();
        // Validate email format for username
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(username)) {
            alert("Please enter a valid email address.");
            return;
        }
        if (role === "visitor") {
            navigate("/");
        } else if (role === "supervisor") {
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
            try {
                try {
                    const res = await fetch(`${API_BASE}/token/`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json", "Accept": "application/json" },
                        body: JSON.stringify({
                            username: username.toLowerCase(),
                            password: password,
                        }),
                    });
                    if (!res.ok) {
                        const text = await res.text().catch(() => "");
                        throw new Error(`Login failed (${res.status}) ${text}`);
                    }
                    const data = await res.json();
                    // Do not clear all storage, just overwrite relevant keys
                    const storage = rememberMe ? localStorage : sessionStorage;
                    const token = data.access || null;
                    console.log("[DEBUG] Access token after login:", token); // Debug output
                    storage.setItem("access_token", token);
                    storage.setItem("site", siteValue);
                    // Store user info if present (always write to both localStorage and sessionStorage)
                    if (data.user) {
                        console.log("[DEBUG] User object received after login:", data.user); // Debug output
                        localStorage.setItem("user", JSON.stringify(data.user));
                        sessionStorage.setItem("user", JSON.stringify(data.user));
                    }
                    // Optionally store refresh token
                    if (data.refresh) {
                        storage.setItem("refresh_token", data.refresh);
                    }
                    navigate("/home");
                } catch (err) {
                    alert(err.message || "Login failed.");
                }
            } catch (error) {
                alert("Error logging in. Please check your network or server.");
            }
        } else {
            alert("Please select a role.");
        }
    };
    const navigate = useNavigate();
    const [role, setRole] = useState("");
    const [site, setSite] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    // Persist rememberMe state in storage
    const [rememberMe, setRememberMe] = useState(() => {
        // Try to restore from storage
        if (localStorage.getItem("rememberMe") === "true") return true;
        if (sessionStorage.getItem("rememberMe") === "true") return false;
        // Fallback to token location
        if (localStorage.getItem("access_token")) return true;
        if (sessionStorage.getItem("access_token")) return false;
        return false;
    });

    // Keep rememberMe in sync with storage
    useEffect(() => {
        if (rememberMe) {
            localStorage.setItem("rememberMe", "true");
            sessionStorage.removeItem("rememberMe");
        } else {
            sessionStorage.setItem("rememberMe", "true");
            localStorage.removeItem("rememberMe");
        }
    }, [rememberMe]);
    const [showAdminLogin, setShowAdminLogin] = useState(false);
    const [showResetPopup, setShowResetPopup] = useState(false);
    // Removed unused loginMessage and loginMessageType state

    const handleCancel = () => {
        setUsername("");
        setPassword("");
        setSite("");
        setRole("");
        setRememberMe(false);
    };
    // ...existing code...
    return (
        <div>
            <HeroBar />
            <div className="signup-container">
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: 0, width: 'auto', padding: 0, margin: 0 }}>
                    <form className="signup-form login-form" onSubmit={handleLogin} style={{ maxWidth: 400, width: '100%', borderRadius: 8, boxShadow: '0 8px 16px rgba(0,0,0,0.1)', border: '1px solid #ccc', background: '#fff', margin: '2rem auto' }}>
                        <div className="new-user-box">
                            <span className="new-user-label" style={{ fontSize: '2.0rem', fontWeight: 'bold', color: '#cd2c2c' }}>New user?</span>
                            <Link to="/createaccount">
                                <button className="create-account-btn" style={{ backgroundColor: '#004b87', color: 'white', fontWeight: 'bold', fontSize: '1rem', padding: '0.5rem 0.8rem', border: 'none', borderRadius: '4px', width: '100%', marginTop: '0.5rem', transition: 'background-color 0.3s ease' }}>Create Account</button>
                            </Link>
                        </div>
                        <div className="context-inner-box">
                            <h1 style={{ fontSize: '2.0rem', fontWeight: 'bold', color: '#cd2c2c' }}>Welcome Back</h1>
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
                            <option value="supervisor">Supervisor</option>
                            <option value="visitor">Visitor</option>
                        </select>
                        {role === "supervisor" && (
                            <>
                            <label htmlFor="site">Select Site<span className="required-asterisk">*</span></label>
                            <select
                                id="site"
                                name="site"
                                className="form-select"
                                value={site}
                                onChange={(e) => setSite(e.target.value)}
                                required
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
                                onClick={() => setShowResetPopup(true)}
                                style={{ background: 'none', border: 'none', color: '#004b87', textDecoration: 'underline', fontSize: '0.95rem', padding: 0, marginLeft: 8, cursor: 'pointer' }}
                            >
                                Reset Password
                            </button>
                        </div>
                        <div className="form-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                            <button type="submit" className="login-form-btn" style={{ backgroundColor: '#004b87', color: 'white', fontWeight: 'bold', fontSize: '1rem', padding: '0.5rem 0.8rem', border: 'none', borderRadius: '4px', width: '100%', marginTop: '1rem', transition: 'background-color 0.3s ease' }}>Login</button>
                            <button type="button" onClick={handleCancel} className="cancel-button" style={{ fontSize: '0.92rem', padding: '0.35rem 0.7rem', borderRadius: '4px', margin: '1rem auto 0 auto', display: 'block', minWidth: 90 }}>Cancel</button>
                        </div>
                    </form>
                    {/* Admin Login Box with username and password - toggled */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', justifyContent: 'flex-start', marginLeft: '1rem', height: 400, padding: 0, marginTop: '2.2rem' }}>
                        <button
                            className="admin-login-toggle"
                            onClick={() => setShowAdminLogin(v => !v)}
                            type="button"
                            style={{ backgroundColor: '#004b87', color: 'white', fontWeight: 'bold', fontSize: '1rem', padding: '0.5rem 0.8rem', border: 'none', borderRadius: '4px', transition: 'background-color 0.3s ease', marginBottom: '1rem', minWidth: 120 }}
                        >
                            {showAdminLogin ? "Hide Admin Login" : "Admin Login"}
                        </button>
                        {/* Admin Login Box with username and password - toggled */}
                        {showAdminLogin && (
                            <div style={{ minWidth: 400, maxWidth: 420, width: '100%' }}>
                                <AdminLoginForm />
                            </div>
                        )}
                    </div>
                </div>
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
    );
}

export default LogInPage;
