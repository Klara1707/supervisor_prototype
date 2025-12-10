import React, { useState } from "react";

function PasswordResetForm() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        try {
        const response = await fetch("/password_reset/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });
        if (response.ok) {
            setMessage(
            "If an account with that email exists, a password reset link has been sent."
            );
        } else {
            setMessage("There was a problem sending the reset email. Please try again.");
        }
        } catch (err) {
        setMessage("Network error. Please try again.");
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
