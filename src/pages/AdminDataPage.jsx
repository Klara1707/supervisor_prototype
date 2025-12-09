import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeroBar from "../components/HeroBar";
import NavBar from "../components/NavBar";
import "./AdminDataPage.css";
import TabMenu from "../components/TabMenu";


function AdminDataPage() {
                const navigate = useNavigate();
        const [showButton, setShowButton] = useState(false);
        // Example user data structure for each hub
        const [robevalley, setRobeValley] = useState([
                { email: "user1", first_name: "Alice" },
                { email: "user2", first_name: "Bob" }
        ]);
        const [greaterhopedowns, setGreaterHopeDowns] = useState([
                { email: "user3", first_name: "Charlie" }
        ]);
        const [restofeast, setRestOfEast] = useState([
                { email: "user4", first_name: "Dana" }
        ]);
        const [restofwest, setRestOfWest] = useState([
                { email: "user5", first_name: "Eve" }
        ]);

        // Get admin token from localStorage
        const adminToken = localStorage.getItem("token");

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
                                                                                                                                                                                                        <h2 style={{margin: 0, textAlign: 'center'}}>Admin</h2>
                                                                                                                                                                                                        <button 
                                                                                                                                                                                                                style={{position: 'absolute', right: 0, padding: '0.5rem 1rem', fontSize: '1rem', borderRadius: '4px', border: 'none', background: '#004b87', color: 'white', cursor: 'pointer'}} 
                                                                                                                                                                                                                onClick={() => navigate('/login')}
                                                                                                                                                                                                        >Log Out</button>                                                                                                                                          </div>
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
                                                        <div key={user.email} className="admin-subject-row">
                                                                <span className="admin-subject-label">{user.first_name} ({user.email})</span>
                                                                <button className="admin-action-btn" onClick={() => handleDeleteUser(user.email, "robevalley")}>Delete user</button>
                                                        </div>
                                                ))}
                                        </div>
                                        <div className="container3" id="GreaterHopeDowns">
                                                <h3><strong>Greater Hope Downs</strong></h3>
                                                {greaterhopedowns.map((user, idx) => (
                                                        <div key={user.email} className="admin-subject-row">
                                                                <span className="admin-subject-label">{user.first_name} ({user.email})</span>
                                                                <button className="admin-action-btn" onClick={() => handleDeleteUser(user.email, "greaterhopedowns")}>Delete user</button>
                                                        </div>
                                                ))}
                                        </div>
                                        <div className="container3" id="RestOfEast">
                                                <h3><strong>Rest of East</strong></h3>
                                                {restofeast.map((user, idx) => (
                                                        <div key={user.email} className="admin-subject-row">
                                                                <span className="admin-subject-label">{user.first_name} ({user.email})</span>
                                                                <button className="admin-action-btn" onClick={() => handleDeleteUser(user.email, "restofeast")}>Delete user</button>
                                                        </div>
                                                ))}
                                        </div>
                                        <div className="container3" id="RestOfWest">
                                                <h3><strong>Rest of West</strong></h3>
                                                {restofwest.map((user, idx) => (
                                                        <div key={user.email} className="admin-subject-row">
                                                                <span className="admin-subject-label">{user.first_name} ({user.email})</span>
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