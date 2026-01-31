import React, { useState } from "react";
import { passwordReset } from "../api";

function PasswordResetForm() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        try {
            await passwordReset(email);
            setMessage("Email sent.");
        } catch (err) {
            setMessage(err.message || "There was a problem sending the reset email. Please try again.");
        }
        setLoading(false);
    };

    return (
        <div className="password-reset-form">
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit}>
            <label htmlFor="reset-email">Email</label>
            <input
            type="email"
            id="reset-email"
            className="login-form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />
            <button type="submit" className="login-form-btn" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
            </button>
        </form>
        {message && <p>{message}</p>}
        </div>
    );
}

export default PasswordResetForm;
