import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeroBar from "../components/HeroBar";
import NavBar from "../components/NavBar";
import "./AdminDataPage.css";

function AdminDataPage() {
        const navigate = useNavigate();
        const [showButton, setShowButton] = useState(false);
        const [robevalley, setRobeValley] = useState([]);
        const [greaterhopedowns, setGreaterHopeDowns] = useState([]);
        const [restofeast, setRestOfEast] = useState([]);
        const [restofwest, setRestOfWest] = useState([]);
        const [deleting, setDeleting] = useState({}); // Track which users are being deleted
        const adminToken = localStorage.getItem("token");

        useEffect(() => {
                fetch("http://127.0.0.1:8000/api/users-by-site/", {
                        headers: {
                                Authorization: "Bearer " + adminToken,
                        },
                })
                        .then(res => res.json())
                        .then(data => {
                                setRobeValley(data.robevalley || []);
                                setGreaterHopeDowns(data.greaterhopedowns || []);
                                setRestOfEast(data.restofeast || []);
                                setRestOfWest(data.restofwest || []);
                        })
                        .catch(() => {
                                setRobeValley([]);
                                setGreaterHopeDowns([]);
                                setRestOfEast([]);
                                setRestOfWest([]);
                        });
        }, [adminToken]);

        // Improved delete user handler
        const handleDeleteUser = (email, hub) => {
                                setDeleting(prev => ({ ...prev, [email]: true }));
                                // Find the user object from the correct hub array
                                let userObj = null;
                                if (hub === "robevalley") {
                                        userObj = robevalley.find(u => u.email === email);
                                } else if (hub === "greaterhopedowns") {
                                        userObj = greaterhopedowns.find(u => u.email === email);
                                } else if (hub === "restofeast") {
                                        userObj = restofeast.find(u => u.email === email);
                                } else if (hub === "restofwest") {
                                        userObj = restofwest.find(u => u.email === email);
                                }
                                const username = userObj?.username || "";
                                const first_name = userObj?.first_name || "";
                                fetch("http://127.0.0.1:8000/api/delete-user/", {
                                                method: "POST",
                                                headers: {
                                                                Authorization: "Bearer " + adminToken,
                                                                "Content-Type": "application/json"
                                                },
                                                body: JSON.stringify({ username, first_name })
                                })
                        .then(async res => {
                                if (res.status === 404) {
                                        alert("User already deleted or not found.");
                                        return { success: false };
                                }
                                return res.json();
                        })
                        .then(data => {
                                if (data.success) {
                                        if (hub === "robevalley") {
                                                setRobeValley(prev => prev.filter(u => u.email !== email));
                                        } else if (hub === "greaterhopedowns") {
                                                setGreaterHopeDowns(prev => prev.filter(u => u.email !== email));
                                        } else if (hub === "restofeast") {
                                                setRestOfEast(prev => prev.filter(u => u.email !== email));
                                        } else if (hub === "restofwest") {
                                                setRestOfWest(prev => prev.filter(u => u.email !== email));
                                        }
                                        alert("User deleted successfully.");
                                } else if (data.success === false) {
                                        // Already handled above or failed
                                } else {
                                        alert(data.error || "Failed to delete user.");
                                }
                        })
                        .catch(() => alert("Error deleting user."))
                        .finally(() => setDeleting(prev => ({ ...prev, [email]: false })));
        };

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
                        <NavBar />
                        <div className="container">
                                <section className="requirements">
                                        <div style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative'}}>
                                                <h2 style={{margin: 0, textAlign: 'center'}}>Admin</h2>
                                        </div>
                                        <p>Please click the “Delete user” to remove the person from the Supervisor Training Portal</p>
                                        <div className="navigation-buttons">
                                                <button onClick={() => document.getElementById("RobeValley").scrollIntoView({ behavior: "smooth" })}>
                                                        Robe Valley
                                                </button>
                                                <button onClick={() => document.getElementById("GreaterHopeDowns").scrollIntoView({ behavior: "smooth" })}>
                                                        Greater Hope Downs
                                                </button>
                                                <button onClick={() => document.getElementById("RestOfEast").scrollIntoView({ behavior: "smooth" })}>
                                                        Rest of East
                                                </button>
                                                <button onClick={() => document.getElementById("RestOfWest").scrollIntoView({ behavior: "smooth" })}>
                                                        Rest of West
                                                </button>
                                        </div>
                                </section>

                                <div className="container3" id="RobeValley">
                                        <h3><strong>Robe Valley</strong></h3>
                                        {robevalley.map((user, idx) => (
                                                <div key={user.email || user.full_name || idx} className="admin-subject-row">
                                                        <span className="admin-subject-label">
                                                                {user.full_name}
                                                                {user.email ? ` (${user.email})` : ""}
                                                        </span>
                                                        <button
                                                                className="admin-action-btn"
                                                                onClick={() => handleDeleteUser(user.email, "robevalley")}
                                                                disabled={!!deleting[user.email]}
                                                        >
                                                                {deleting[user.email] ? "Deleting..." : "Delete user"}
                                                        </button>
                                                </div>
                                        ))}
                                </div>
                                <div className="container3" id="GreaterHopeDowns">
                                        <h3><strong>Greater Hope Downs</strong></h3>
                                        {greaterhopedowns.map((user, idx) => (
                                                <div key={user.email || user.full_name || idx} className="admin-subject-row">
                                                        <span className="admin-subject-label">
                                                                {user.full_name}
                                                                {user.email ? ` (${user.email})` : ""}
                                                        </span>
                                                        <button
                                                                className="admin-action-btn"
                                                                onClick={() => handleDeleteUser(user.email, "greaterhopedowns")}
                                                                disabled={!!deleting[user.email]}
                                                        >
                                                                {deleting[user.email] ? "Deleting..." : "Delete user"}
                                                        </button>
                                                </div>
                                        ))}
                                </div>
                                <div className="container3" id="RestOfEast">
                                        <h3><strong>Rest of East</strong></h3>
                                        {restofeast.map((user, idx) => (
                                                <div key={user.email || user.full_name || idx} className="admin-subject-row">
                                                        <span className="admin-subject-label">
                                                                {user.full_name}
                                                                {user.email ? ` (${user.email})` : ""}
                                                        </span>
                                                        <button
                                                                className="admin-action-btn"
                                                                onClick={() => handleDeleteUser(user.email, "restofeast")}
                                                                disabled={!!deleting[user.email]}
                                                        >
                                                                {deleting[user.email] ? "Deleting..." : "Delete user"}
                                                        </button>
                                                </div>
                                        ))}
                                </div>
                                <div className="container3" id="RestOfWest">
                                        <h3><strong>Rest of West</strong></h3>
                                        {restofwest.map((user, idx) => (
                                                <div key={user.email || user.full_name || idx} className="admin-subject-row">
                                                        <span className="admin-subject-label">
                                                                {user.full_name}
                                                                {user.email ? ` (${user.email})` : ""}
                                                        </span>
                                                        <button
                                                                className="admin-action-btn"
                                                                onClick={() => handleDeleteUser(user.email, "restofwest")}
                                                                disabled={!!deleting[user.email]}
                                                        >
                                                                {deleting[user.email] ? "Deleting..." : "Delete user"}
                                                        </button>
                                                </div>
                                        ))}
                                </div>

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