import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeroBar from "../components/HeroBar";
import NavBar from "../components/NavBar";
import "./AdminDataPage.css";
import TabMenu from "../components/TabMenu";


function AdminDataPage() {
                const navigate = useNavigate();
        const [showButton, setShowButton] = useState(false);
        const robevalley = [
                "test data 1", 
                "test data 2",
                "test data 3",
                "test data 4",           
        ];
        const greaterhopedowns = [
                "test data 1", 
                "test data 2",
                "test data 3",
                "test data 4",           
        ];

        const restofeast = [
                "test data 1", 
                "test data 2",
                "test data 3",
                "test data 4",           
        ];
        
        const restofwest = [
                "test data 1", 
                "test data 2",
                "test data 3",
                "test data 4",           
        ];

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
                                                                                                                                                                                                        >Log Out</button>
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
                                                {robevalley.map((item, idx) => (
                                                        <div key={idx} className="admin-subject-row">
                                                                <span className="admin-subject-label">{item}</span>
                                                                <button className="admin-action-btn">Delete user</button>
                                                        </div>
                                                ))}
                                        </div>
                                        <div className="container3" id="GreaterHopeDowns">
                                                <h3><strong>Greater Hope Downs</strong></h3>
                                                {greaterhopedowns.map((item, idx) => (
                                                        <div key={idx} className="admin-subject-row">
                                                                <span className="admin-subject-label">{item}</span>
                                                                <button className="admin-action-btn">Delete user</button>
                                                        </div>
                                                ))}
                                        </div>
                                        <div className="container3" id="RestOfEast">
                                                <h3><strong>Rest of East</strong></h3>
                                                {restofeast.map((item, idx) => (
                                                        <div key={idx} className="admin-subject-row">
                                                                <span className="admin-subject-label">{item}</span>
                                                                <button className="admin-action-btn">Delete user</button>
                                                        </div>
                                                ))}
                                        </div>
                                        <div className="container3" id="RestOfWest">
                                                <h3><strong>Rest of West</strong></h3>
                                                {restofwest.map((item, idx) => (
                                                        <div key={idx} className="admin-subject-row">
                                                                <span className="admin-subject-label">{item}</span>
                                                                <button className="admin-action-btn">Delete user</button>
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