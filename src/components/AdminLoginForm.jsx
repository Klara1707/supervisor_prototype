
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../api";

export default function AdminLoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    try {
      const data = await adminLogin(username, password);
      // Store user info and tokens
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      localStorage.setItem("user", JSON.stringify(data.user));
      setSuccess(true);
      // Redirect to admin dashboard after short delay
      setTimeout(() => {
        navigate("/admindatapage");
      }, 1000);
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className="admin-login-box" style={{marginTop: '-1.5rem'}}>
      <div className="context-inner-box">
        <h1>Admin Login</h1>
        <p>Please log in with Admin credentials</p>
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="admin-username">Username</label>
        <input
          type="text"
          id="admin-username"
          name="admin-username"
          placeholder="Enter your username"
          autoComplete="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="admin-password">Password</label>
        <input
          type="password"
          id="admin-password"
          name="admin-password"
          placeholder="Enter your password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="form-buttons">
          <button type="submit" className="login-btn">Login</button>
        </div>
        {success && <div>Login successful! Redirecting...</div>}
        {error && <div style={{ color: "red" }}>{error}</div>}
      </form>
    </div>
  );
}
