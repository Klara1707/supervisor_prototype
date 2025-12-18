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
            const response = await fetch("/api/password_reset/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: email, email }),
            });
            if (response.ok) {
                setMessage("Email sent.");
            } else {
                let errorMsg = "There was a problem sending the reset email. Please try again.";
                try {
                    const errorData = await response.json();
                    if (errorData && (errorData.detail === "User not found." || errorData.error === "User not found.")) {
                        errorMsg = "User not found.";
                    } else if (errorData && errorData.detail) {
                        errorMsg = errorData.detail;
                    } else if (errorData && errorData.error) {
                        errorMsg = errorData.error;
                    }
                } catch {}
                setMessage(errorMsg);
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
