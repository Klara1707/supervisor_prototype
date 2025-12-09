import React, { useEffect } from "react";
import "./SuccesLoginPop.css";
import { useNavigate } from "react-router-dom";

const SuccesLoginPop = ({ show, onClose }) => {
    const navigate = useNavigate();
    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                onClose();
                navigate("/login");
            }, 10000);
            return () => clearTimeout(timer);
        }
    }, [show, onClose, navigate]);
    if (!show) return null;
    return (
        <div className="popup-overlay">
        <div className="popup-box">
            <h2>Your account has been successfully created</h2>
            <p>Let’s drill past the surface and uncover the good stuff—your learning journey is now in your control!</p>
            <button onClick={() => { onClose(); navigate("/login"); }}>Close</button>
        </div>
        </div>
    );
};

export default SuccesLoginPop;
