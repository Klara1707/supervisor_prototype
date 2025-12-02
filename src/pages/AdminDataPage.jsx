import React, { useState, useEffect } from "react";
import HeroBar from "../components/HeroBar";
import "./AdminDataPage.css";

function AdminDataPage() {
        const subjects = [
                "Robe Valley",
                "Greater Hope Downs",
                "Rest of East",
                "Rest of West"
        ];

        const [showButton, setShowButton] = useState(false);

        const scrollToTop = () => {
                window.scrollTo({ top: 0, behavior: "smooth" });
        };

        useEffect(() => {
                const handleScroll = () => {
                        setShowButton(window.scrollY > 300);
                };
                window.addEventListener("scroll", handleScroll);
                return () => window.removeEventListener("scroll", handleScroll);
        }, []);

        return (
                <>
                        <HeroBar />
                        <div className="admin-data-container">
                                <h2>Admin Data Subjects</h2>
                                <ul className="admin-subject-list">
                                        {subjects.map((subject, idx) => (
                                                <li key={idx} className="admin-subject-item">
                                                    <div className="admin-subject-row">
                                                        <span className="admin-subject-label">{subject}</span>
                                                        <button className="admin-action-btn">{subject}</button>
                                                    </div>
                                                </li>
                                        ))}
                                </ul>
                                {showButton && (
                                        <button className="back-to-top" onClick={scrollToTop}>
                                                Back to Top
                                        </button>
                                )}
                        </div>
                </>
        );
}

export default AdminDataPage;