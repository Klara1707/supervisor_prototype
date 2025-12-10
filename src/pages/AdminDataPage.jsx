import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeroBar from "../components/HeroBar";
import NavBar from "../components/NavBar";
import "./AdminDataPage.css";

function AdminDataPage() {
        const navigate = useNavigate();
        const [showButton, setShowButton] = useState(false);
        // State for each hub, initially empty
        const [robevalley, setRobeValley] = useState([]);
        const [greaterhopedowns, setGreaterHopeDowns] = useState([]);
        const [restofeast, setRestOfEast] = useState([]);
        const [restofwest, setRestOfWest] = useState([]);

        // Get admin token from localStorage
        const adminToken = localStorage.getItem("token");

        // Fetch users by site on mount
        useEffect(() => {
                fetch("http://127.0.0.1:8000/api/users-by-site/", {
                        headers: {
                                Authorization: "Bearer " + adminToken,
                        },
                })
                        .then(res => res.json())
                        .then(data => {
                                // Data format: { robevalley: [...], greaterhopedowns: [...], restofeast: [...], restofwest: [...] }
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

        // Delete user handler
        const handleDeleteUser = (email, hub) => {
                fetch("http://127.0.0.1:8000/api/delete-user/", {
                        method: "POST",
                        headers: {
                                Authorization: "Bearer " + adminToken,
                                "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ email })
                })
                        .then(res => res.json())
                        .then(data => {
                                if (data.success) {
                                        // Remove user from the correct hub list
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
                                } else {
                                        alert(data.error || "Failed to delete user.");
                                }
                        })
                        .catch(() => alert("Error deleting user."));
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
                                        <h2 style={{margin: 0, textAlign: 'center'}}>Admin</h2>                                                                                                                                          </div>
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
                                                                <button className="admin-action-btn" onClick={() => handleDeleteUser(user.email, "robevalley")}>Delete user</button>
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
                                                                <button className="admin-action-btn" onClick={() => handleDeleteUser(user.email, "greaterhopedowns")}>Delete user</button>
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
                                                                <button className="admin-action-btn" onClick={() => handleDeleteUser(user.email, "restofeast")}>Delete user</button>
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
                                                                <button className="admin-action-btn" onClick={() => handleDeleteUser(user.email, "restofwest")}>Delete user</button>
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