
import React from "react";
import { useNavigate } from "react-router-dom";
import "./AdminPage.css";


function AdminPage() {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/admindatapage');
    };

    return (
        <>
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                {/* Welcome Text at the Top */}
                <div className="form-header">
                    <h1>Welcome Back</h1>
                    <p>Please log in with Admin credentials</p>
                </div>

                {/* Username & Password */}
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" placeholder="Enter your username" autoComplete="username" />

                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" placeholder="Enter your password" autoComplete="current-password" />

            <div className="form-buttons">
                <button type="submit" className="login-btn">Login</button>
            </div>
            </form>

        </div>
        </>
    );
}

export default AdminPage;
