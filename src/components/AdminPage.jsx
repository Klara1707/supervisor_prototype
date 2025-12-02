
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


function AdminPage() {
    const navigate = useNavigate();
    const [role, setRole] = useState("");
    const [site, setSite] = useState("");

    const handleCancel = () => {
        navigate('/');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/admindata');
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
                <input type="text" id="username" name="username" placeholder="Enter your username" />

                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" placeholder="Enter your password" />

                {/* Buttons */}
                <div className="form-buttons">
                    <button type="submit">Log In</button>
                </div>
            </form>
        </div>
        </>
    );
}

export default AdminPage;
