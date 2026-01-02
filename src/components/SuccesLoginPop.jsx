import React, { useEffect } from "react";
import "./SuccesLoginPop.css";
import { useNavigate } from "react-router-dom";

const SuccesLoginPop = ({ show, onClose }) => {
    const navigate = useNavigate();
    const closeBtnRef = React.useRef(null);
    useEffect(() => {
        if (show) {
            // Focus the close button when dialog opens
            closeBtnRef.current?.focus();
            const timer = setTimeout(() => {
                onClose();
                navigate("/login");
            }, 10000);
            // Trap focus inside dialog
            const handleKeyDown = (e) => {
                if (e.key === 'Tab') {
                    e.preventDefault();
                    closeBtnRef.current?.focus();
                }
                if (e.key === 'Escape') {
                    onClose();
                    navigate("/login");
                }
            };
            document.addEventListener('keydown', handleKeyDown);
            return () => {
                clearTimeout(timer);
                document.removeEventListener('keydown', handleKeyDown);
            };
        }
    }, [show, onClose, navigate]);
    if (!show) return null;
    return (
        <div className="popup-overlay" role="presentation">
        <div className="popup-box" role="dialog" aria-modal="true" aria-labelledby="success-title">
            <h2 id="success-title">Your account has been successfully created</h2>
            <p>Let’s drill past the surface and uncover the good stuff—your learning journey is now in your control!</p>
            <button ref={closeBtnRef} onClick={() => { onClose(); navigate("/login"); }}>Close</button>
        </div>
        </div>
    );
};

export default SuccesLoginPop;
