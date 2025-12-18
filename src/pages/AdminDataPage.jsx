import UserListSection from "../components/UserListSection";
import React, { useState, useEffect } from "react";
import HeroBar from "../components/HeroBar";
import NavBar from "../components/NavBar";
import "./AdminDataPage.css";

function AdminDataPage() {
                // Refs for section navigation
                const robeValleyRef = React.useRef(null);
                const greaterHopeDownsRef = React.useRef(null);
                const restOfEastRef = React.useRef(null);
                const restOfWestRef = React.useRef(null);
        const [showButton, setShowButton] = useState(false);
        const [robevalley, setRobeValley] = useState([]);
        const [greaterhopedowns, setGreaterHopeDowns] = useState([]);
        const [restofeast, setRestOfEast] = useState([]);
        const [restofwest, setRestOfWest] = useState([]);
        const [deleting, setDeleting] = useState({}); // Track which users are being deleted
        const [message, setMessage] = useState("");
        const [messageType, setMessageType] = useState(""); // 'success' or 'error'
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
                        setMessage("");
                        setMessageType("");
        fetch("http://127.0.0.1:8000/api/delete-user/", {
                method: "POST",
                headers: {
                        Authorization: "Bearer " + adminToken,
                        "Content-Type": "application/json"
                },
                body: JSON.stringify({ username: email })
        })
                                .then(async res => {
                                        if (res.status === 204) {
                                                // No content, deletion successful
                                                return { success: true };
                                        }
                                        if (res.status === 404) {
                                                setMessage("User already deleted or not found.");
                                                setMessageType("error");
                                                return { success: false };
                                        }
                                        // Only try to parse JSON if there is content
                                        const text = await res.text();
                                        if (text) {
                                                try {
                                                        return JSON.parse(text);
                                                } catch {
                                                        return { success: false, error: "Unexpected response from server." };
                                                }
                                        }
                                        return { success: false, error: "Unexpected response from server." };
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
                                setMessage("User deleted successfully.");
                                setMessageType("success");
                        } else if (data.success === false) {
                                // Already handled above or failed
                        } else {
                                setMessage(data.error || "Failed to delete user.");
                                setMessageType("error");
                        }
                })
                .catch(() => {
                    setMessage("Error deleting user.");
                    setMessageType("error");
                })
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
                        {message && (
                                <div style={{
                                        background: messageType === "success" ? "#d4edda" : "#f8d7da",
                                        color: messageType === "success" ? "#155724" : "#721c24",
                                        border: `1px solid ${messageType === "success" ? "#c3e6cb" : "#f5c6cb"}`,
                                        padding: "10px",
                                        margin: "10px 0",
                                        borderRadius: "4px",
                                        textAlign: "center"
                                }}>
                                        {message}
                                </div>
                        )}
                        <div className="container">
                                <section className="requirements">
                                        <div style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative'}}>
                                                <h2 style={{margin: 0, textAlign: 'center'}}>Admin</h2>
                                        </div>
                                        <p>Please click the “Delete user” to remove the person from the Supervisor Training Portal</p>
                                        <div className="navigation-buttons">
                                                <button onClick={() => robeValleyRef.current?.scrollIntoView({ behavior: "smooth" })}>
                                                        Robe Valley
                                                </button>
                                                <button onClick={() => greaterHopeDownsRef.current?.scrollIntoView({ behavior: "smooth" })}>
                                                        Greater Hope Downs
                                                </button>
                                                <button onClick={() => restOfEastRef.current?.scrollIntoView({ behavior: "smooth" })}>
                                                        Rest of East
                                                </button>
                                                <button onClick={() => restOfWestRef.current?.scrollIntoView({ behavior: "smooth" })}>
                                                        Rest of West
                                                </button>
                                        </div>
                                </section>

                                <UserListSection
                                        title="Robe Valley"
                                        users={robevalley}
                                        deleting={deleting}
                                        handleDeleteUser={handleDeleteUser}
                                        hub="robevalley"
                                        sectionRef={robeValleyRef}
                                />
                                <UserListSection
                                        title="Greater Hope Downs"
                                        users={greaterhopedowns}
                                        deleting={deleting}
                                        handleDeleteUser={handleDeleteUser}
                                        hub="greaterhopedowns"
                                        sectionRef={greaterHopeDownsRef}
                                />
                                <UserListSection
                                        title="Rest of East"
                                        users={restofeast}
                                        deleting={deleting}
                                        handleDeleteUser={handleDeleteUser}
                                        hub="restofeast"
                                        sectionRef={restOfEastRef}
                                />
                                <UserListSection
                                        title="Rest of West"
                                        users={restofwest}
                                        deleting={deleting}
                                        handleDeleteUser={handleDeleteUser}
                                        hub="restofwest"
                                        sectionRef={restOfWestRef}
                                />

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