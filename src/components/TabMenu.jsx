
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./TabMenu.css";
import MandatoryList from "./MandatoryList";
import DrillingPop from "./DrillingPop";
import SafetyPop from "./SafetyPop";
import LeadershipPop from "./LeadershipPop";
import OperationsPop from "./OperationsPop";
import EarthworksPop from "./EarthworksPop";
import CostPop from "./CostPop";
import ContractorPop from "./ContractorPop";
import FieldPop from "./FieldPop";


const TrainingTabs = ({ tabContent, activeTab, popupVisible, closePopup }) => {
    return (
        <div>
        <div className="city">{tabContent[activeTab]}</div>

        {popupVisible?.startsWith("drilling") && (
            <DrillingPop popupId={popupVisible} closePopup={closePopup} />
        )}
        {popupVisible?.startsWith("safety") && (
            <SafetyPop popupId={popupVisible} closePopup={closePopup} />
        )}
        {popupVisible?.startsWith("leadership") && (
            <LeadershipPop popupId={popupVisible} closePopup={closePopup} />
        )}
        {popupVisible?.startsWith("operations") && (
            <OperationsPop popupId={popupVisible} closePopup={closePopup} />
        )}
        {popupVisible?.startsWith("earthworks") && (
            <EarthworksPop popupId={popupVisible} closePopup={closePopup} />
        )}
        {popupVisible?.startsWith("cost") && (
            <CostPop popupId={popupVisible} closePopup={closePopup} />
        )}
        {popupVisible?.startsWith("contractor") && (
            <ContractorPop popupId={popupVisible} closePopup={closePopup} />
        )}
        {popupVisible?.startsWith("field") && (
            <FieldPop popupId={popupVisible} closePopup={closePopup} />
        )}
        </div>
    );
    };

    const TabMenu = ({ initialTab = "Home" }) => {
    const [activeTab, setActiveTab] = useState(initialTab);
    const [popupVisible, setPopupVisible] = useState(null);
    const [menuVisible, setMenuVisible] = useState(false);
    const [user, setUser] = useState(() => {
        let userStr = localStorage.getItem("user");
        if (!userStr) {
            userStr = sessionStorage.getItem("user");
        }
        return userStr ? JSON.parse(userStr) : null;
    });
    console.log("User from localStorage:", user);
    const [token, setToken] = useState(() => localStorage.getItem("token") || "");
    const [progress, setProgress] = useState(null);
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.clear();
        sessionStorage.clear();
        setUser(null);
        setToken("");
        navigate("/login");
    };

    React.useEffect(() => {
        // Listen for login changes (if setUser/setToken called elsewhere)
        const handleStorage = () => {
            let userStr = localStorage.getItem("user");
            if (!userStr) {
                userStr = sessionStorage.getItem("user");
            }
            setUser(userStr ? JSON.parse(userStr) : null);
            let tokenStr = localStorage.getItem("token");
            if (!tokenStr) {
                tokenStr = sessionStorage.getItem("token");
            }
            setToken(tokenStr || "");
        };
        window.addEventListener("storage", handleStorage);
        return () => window.removeEventListener("storage", handleStorage);
    }, []);

    React.useEffect(() => {
        if (token) {
            fetch("/api/training-progress/", {
                headers: { Authorization: "Bearer " + token }
            })
                .then(res => res.ok ? res.json() : Promise.reject(res))
                .then(data => {
                    setProgress(data.progress_by_popup || null);
                })
                .catch(() => setProgress(null));
        } else {
            setProgress(null);
        }
    }, [token]);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const openCity = (event, cityName) => {
        setActiveTab(cityName);
    };

    const openPopup = (popupId) => {
        setPopupVisible(popupId);
    };

    const closePopup = () => {
        setPopupVisible(null);
    };

    const tabContent = {
        Home: (
        <div className="welcome-container">
            {console.log("TabMenu Home user:", user)}
            <h1>
                Welcome{user && user.first_name && user.first_name.trim() !== "" ? `, ${user.first_name}` : ""}!
            </h1>
            <p className="intro">
            Congratulations on stepping into your role as a Contractor Supervisor within Res Dev!
            This portal is your personal guide to becoming the best supervisor you can be — an online training package that covers all the responsibilities of an Operations Supervisor and supports you in building the skills and confidence to thrive in your new role.
            </p>

            {progress && (
                <div className="progress-section">
                    <h2>Your Training Progress</h2>
                    <ul>
                        {Object.entries(progress).map(([popup, value]) => (
                            <li key={popup}>{popup.replace(/_/g, " ")}: {value}%</li>
                        ))}
                    </ul>
                </div>
            )}


            <h2>Our Values</h2>
            <ul className="values-list">
            <li><strong>Care</strong> – We care about the physical and psychological safety of ourselves and others, we care about creating an environment of trust, and we care about the impact we have on our colleagues, communities, and the environment.</li>
            <li><strong>Courage</strong> – We have the courage to show vulnerability, the courage to speak up and challenge when we can do better, and the courage to take ownership of our actions and outcomes to drive performance.</li>
            <li><strong>Curiosity</strong> – We have curiosity to learn and grow in our fields of expertise, look for opportunities to solve problems with everyday innovation, and be open to different perspectives</li>
            </ul>

            <h2>Your Learning Journey</h2>
            <p>This is a self-led training package, guided by the help of mentors with progress reported to your Superintendent. The training package covers...</p>
            <ul className="training-list">
            <li>Roles Responsibilities/skills - What work skills and abilities you are required to learn</li>
            <li>Divides each responsibility into levels (1,2,3). This ensures thorough understanding of the responsibilities and provides candidates the opportunity to learn at a pace suited to their experience and aptitude</li>
            <li>Training process comments - Exposure/Experience/Education</li>
            <li>Training Material links - How to guides, QRG's and examples to help give context and clear direction on closing out a Responsibility/Skill</li>
            <li>Progress reporting - percentage slider for easy tracking</li>
            </ul>

            <h2>Take Control of Your Development</h2>
            <p>Grow your skills. Challenge yourself. Become the leader you’re meant to be.</p>
        </div>
        ),

        Drilling: (
        <div id="Drilling" className="w3-container city">
            <h2>Drilling for Success</h2>
            <p className="intro">
            This training will guide you through the essentials of drilling—what it is, how the activities work, and why they matter. You’ll learn how to record daily PLOD data and spot ways to make the job more efficient. By the end, you’ll understand the basics and feel confident to contribute safely and effectively.
            </p>
            <div className="tab-buttons">
                <button className="button1" onClick={() => openPopup("drilling1")}>Drilling Level 1</button>
                <button className="button1" onClick={() => openPopup("drilling2")}>Drilling Level 2</button>
                <button className="button1" onClick={() => openPopup("drilling3")}>Drilling Level 3</button>
            </div>
        </div>
        ),

        Safety: (
        <div id="Safety" className="w3-container city">
            <h2>Lead the Way in Safety</h2>
            <p className="intro">
            At Rio Tinto, safety leadership is the foundation of our success. This training empowers you to go beyond compliance—become a role model who champions safe behaviours, influences others, and drives a culture of zero harm. Learn how to identify hazards, apply critical controls, and lead conversations that make safety a shared responsibility. When leaders set the standard, everyone goes home safe.
            </p>
            <div className="tab-buttons">
                <button className="button1" onClick={() => openPopup("safety1")}>Safety Level 1</button>
                <button className="button1" onClick={() => openPopup("safety2")}>Safety Level 2</button>
                <button className="button1" onClick={() => openPopup("safety3")}>Safety Level 3</button>
            </div>
        </div>
        ),

        Leadership: (
        <div id="Leadership" className="w3-container city">
            <h2>Leadership</h2>
            <p className="intro">
            Develop the skills that matter most in front line, field leadership -  field verifications, stakeholder engagement, and operational discipline. Our training empowers you to drive safety, performance, and collaboration—every day, in every decision.
            </p>
            <div className="tab-buttons">
                <button className="button1" onClick={() => openPopup("leadership1")}>Leadership Level 1</button>
                <button className="button1" onClick={() => openPopup("leadership2")}>Leadership Level 2</button>
                <button className="button1" onClick={() => openPopup("leadership3")}>Leadership Level 3</button>
            </div>
        </div>
        ),

        Operations: (
        <div id="Operations" className="w3-container city">
            <h2>Operational Excellence</h2>
            <p className="intro">
            Welcome to Rio Tinto. This guide is designed to help you build the skills that keep our operations safe, efficient, and reliable. You’ll learn how to manage accommodation and flights, plan rosters, raise tickets to repair breakdowns, and understand workflows for ARs and ORs. These are the foundations of supporting our people and maintaining world-class operations. By the end, you’ll be ready to play your part in delivering excellence every day.
            </p>
            <div className="tab-buttons">
                <button className="button1" onClick={() => openPopup("operations1")}>Operations Level 1</button>
                <button className="button1" onClick={() => openPopup("operations2")}>Operations Level 2</button>
                <button className="button1" onClick={() => openPopup("operations3")}>Operations Level 3</button>
            </div>
        </div>
        ),

        Earthworks: (
        <div id="Earthworks" className="w3-container city">
            <h2>Earthworks Supervision for Safer, Smarter Operations</h2> 
            <p className="intro">
            Our program equips supervisors with the knowledge and practical skills to manage earthworks programs with precision and confidence. Learn best practices in planning, quality control, safety compliance, data collection, package of works and team coordination to ensure projects are delivered efficiently and to the highest standards.
            </p>
            <div className="tab-buttons">
                <button className="button1" onClick={() => openPopup("earthworks1")}>Earthworks Level 1</button>
                <button className="button1" onClick={() => openPopup("earthworks2")}>Earthworks Level 2</button>
                <button className="button1" onClick={() => openPopup("earthworks3")}>Earthworks Level 3</button>
            </div>
        </div>
        ),

        Cost_Reporting: (
        <div id="Cost_Reporting" className="w3-container city">
            <h2>Cost Reporting</h2>
            <p className="intro">
            This training will guide you through your cost capture and reporting responsibilities. You’ll learn how to manage daily plods, enter accurate data, and track the bottom line effectively.
            </p>
            <div className="tab-buttons">
                <button className="button1" onClick={() => openPopup("cost1")}>Cost Reporting Level 1</button>
                <button className="button1" onClick={() => openPopup("cost2")}>Cost Reporting Level 2</button>
                <button className="button1" onClick={() => openPopup("cost3")}>Cost Reporting Level 3</button>
            </div>
        </div>
        ),

        Contractor_Management: (
        <div id="Contractor_Management" className="w3-container city">
            <h2>Contractor Management</h2>
            <p className="intro">
            This training will teach you how to manage contractors safely and efficiently. You’ll learn the full process—from onboarding and compliance checks to using the Permit system for works and ensuring all procedures are followed. By the end, you’ll be confident in keeping contractors aligned with site standards and maintaining smooth, safe operations.
            </p>
            <div className="tab-buttons">
                <button className="button1" onClick={() => openPopup("contractor1")}>Contractor Management Level 1</button>
                <button className="button1" onClick={() => openPopup("contractor2")}>Contractor Management Level 2</button>
                <button className="button1" onClick={() => openPopup("contractor3")}>Contractor Management Level 3</button>
            </div>
        </div>
        ),

        Field_Supervisor: (
        <div id="Field_Supervisor" className="w3-container city">
            <h2>Field Supervisor</h2>
            <p className="intro">
            This training focuses on supporting the people who do the front-line work. You’ll learn how to lead teams on site, ensure safety and compliance, and provide the guidance they need to get the job done right. By the end, you’ll be confident in managing day-to-day operations while looking after your crew.
            </p>
            <div className="tab-buttons">
                <button className="button1" onClick={() => openPopup("field1")}>Field Supervisor Level 1</button>
                <button className="button1" onClick={() => openPopup("field2")}>Field Supervisor Level 2</button>
                <button className="button1" onClick={() => openPopup("field3")}>Field Supervisor Level 3</button>
            </div>
        </div>
        ),

        Mandatory_Training: (
        <div id="Mandatory_Training" className="w3-container city">
            <MandatoryList />
        </div>
        ),


        
    };

    return (
        <div className="page-wrapper">
        <div className={`w3-bar ${menuVisible ? "show" : ""}`}>
            {Object.keys(tabContent).map((tab) => (
            <button
                key={tab}
                className={`tablink ${activeTab === tab ? "w3-red" : ""}`}
                onClick={(e) => openCity(e, tab)}
            >
                {tab.replace(/_/g, " ")}
            </button>
            ))}
        </div>

        <TrainingTabs
            tabContent={tabContent}
            activeTab={activeTab}
            popupVisible={popupVisible}
            closePopup={closePopup}
        />
        </div>
    );
};

export default TabMenu;
