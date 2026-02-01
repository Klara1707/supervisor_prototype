
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
    <div className="admin-login-box" style={{
      marginTop: '-1.5rem',
      maxWidth: 400,
      width: '100%',
      borderRadius: 8,
      boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
      border: '1px solid #ccc',
      background: '#fff',
      margin: '2rem auto',
      padding: '2rem 2rem 1.5rem 2rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <div className="context-inner-box">
        <h1 style={{ fontSize: '2.0rem', fontWeight: 'bold', color: '#cd2c2c' }}>Admin Login</h1>
        <p>Please log in with Admin credentials</p>
      </div>
      <form className="login-form" onSubmit={handleSubmit} style={{ width: '100%' }}>
        <label htmlFor="admin-username" style={{ fontWeight: 'bold' }}>Username</label>
        <input
          type="text"
          id="admin-username"
          name="admin-username"
          placeholder="Enter your username"
          autoComplete="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            border: '1px solid #ccc',
            borderRadius: '4px',
            padding: '0.75rem',
            fontSize: '1rem',
            marginBottom: '1rem',
            width: '100%'
          }}
        />
        <label htmlFor="admin-password" style={{ fontWeight: 'bold' }}>Password</label>
        <input
          type="password"
          id="admin-password"
          name="admin-password"
          placeholder="Enter your password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            border: '1px solid #ccc',
            borderRadius: '4px',
            padding: '0.75rem',
            fontSize: '1rem',
            marginBottom: '1rem',
            width: '100%'
          }}
        />
        <div className="form-buttons">
          <button type="submit" className="signup-form" style={{ backgroundColor: '#cd2c2c', color: 'white', fontWeight: 'bold', fontSize: '1rem', padding: '0.5rem 0.8rem', border: 'none', borderRadius: '4px', width: '100%', marginTop: '1rem', transition: 'background-color 0.3s ease' }}>Login</button>
        </div>
        {success && <div>Login successful! Redirecting...</div>}
        {error && <div style={{ color: "red" }}>{error}</div>}
      </form>
    </div>
  );
}
