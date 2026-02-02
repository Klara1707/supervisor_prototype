
import React, { useState } from "react";
import "./TabMenu.css";
import MandatoryList from "./MandatoryList";
// import trainingList from "../data/trainingList";
import DrillingPop from "./DrillingPop";
import SafetyPop from "./SafetyPop";
import LeadershipPop from "./LeadershipPop";
import OperationsPop from "./OperationsPop";
import EarthworksPop from "./EarthworksPop";
import CostPop from "./CostPop";
import ContractorPop from "./ContractorPop";
import FieldPop from "./FieldPop";
import { authFetch } from "../utils/auth";
import API_BASE from "../config";
import OverviewTab from "./OverviewTab"; // Ensure we are using the imported OverviewTab


const TrainingTabs = ({ tabContent, activeTab, popupVisible, closePopup, token, onProgressUpdate }) => {
    const showBackToTopTab = ["Home", "Overview", "Mandatory_Training"].includes(activeTab);
    const [showBackToTop, setShowBackToTop] = React.useState(false);
    const contentRef = React.useRef(null);

    React.useEffect(() => {
        if (!showBackToTopTab) {
            setShowBackToTop(false);
            return;
        }
        const container = contentRef.current || window;
        const getScrollTop = () => {
            if (contentRef.current) return contentRef.current.scrollTop;
            return window.scrollY;
        };
        const handleScroll = () => {
            setShowBackToTop(getScrollTop() > 200);
        };
        if (contentRef.current) {
            contentRef.current.addEventListener("scroll", handleScroll);
            handleScroll();
            return () => contentRef.current && contentRef.current.removeEventListener("scroll", handleScroll);
        } else {
            window.addEventListener("scroll", handleScroll);
            handleScroll();
            return () => window.removeEventListener("scroll", handleScroll);
        }
    }, [showBackToTopTab]);

    const handleBackToTop = () => {
        if (contentRef.current) {
            contentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <div ref={contentRef} style={{ height: '100%', overflowY: 'auto' }}>
            <div className="city">{tabContent[activeTab]}</div>

            {popupVisible?.startsWith("drilling") && token && (
                <DrillingPop
                    key={popupVisible}
                    popupId={popupVisible}
                    closePopup={closePopup}
                    userToken={token}
                    onProgressUpdate={onProgressUpdate}
                />
            )}
            {popupVisible?.startsWith("safety") && token && (
                <SafetyPop key={popupVisible} popupId={popupVisible} closePopup={closePopup} userToken={token} onProgressUpdate={onProgressUpdate} />
            )}
            {popupVisible?.startsWith("leadership") && token && (
                <LeadershipPop key={popupVisible} popupId={popupVisible} closePopup={closePopup} userToken={token} onProgressUpdate={onProgressUpdate} />
            )}
            {popupVisible?.startsWith("operations") && token && (
                <OperationsPop key={popupVisible} popupId={popupVisible} closePopup={closePopup} userToken={token} onProgressUpdate={onProgressUpdate} />
            )}
            {popupVisible?.startsWith("earthworks") && token && (
                <EarthworksPop key={popupVisible} popupId={popupVisible} closePopup={closePopup} userToken={token} onProgressUpdate={onProgressUpdate} />
            )}
            {popupVisible?.startsWith("cost") && token && (
                <CostPop key={popupVisible} popupId={popupVisible} closePopup={closePopup} userToken={token} onProgressUpdate={onProgressUpdate} />
            )}
            {popupVisible?.startsWith("contractor") && token && (
                <ContractorPop key={popupVisible} popupId={popupVisible} closePopup={closePopup} userToken={token} onProgressUpdate={onProgressUpdate} />
            )}
            {popupVisible?.startsWith("field") && token && (
                <FieldPop key={popupVisible} popupId={popupVisible} closePopup={closePopup} userToken={token} onProgressUpdate={onProgressUpdate} />
            )}
            {showBackToTopTab && showBackToTop && (
                <button
                    className="back-to-top"
                    style={{ margin: '32px auto 0 auto', display: 'block' }}
                    onClick={handleBackToTop}
                >
                    Back to Top
                </button>
            )}
        </div>
    );
};

const TabMenu = ({ initialTab = "Home" }) => {
    const [progress, setProgress] = useState({});
    const [progressTrigger, setProgressTrigger] = useState(0);
    const [activeTab, setActiveTab] = useState(initialTab);
    const [popupVisible, setPopupVisible] = useState(null);
    // Helper to get the latest user from storage
    const getStoredUser = () => {
        let userStr = localStorage.getItem("user");
        if (!userStr) {
            userStr = sessionStorage.getItem("user");
        }
        return userStr ? JSON.parse(userStr) : null;
    };
    const [user, setUser] = useState(getStoredUser());
    const getTokenFromStorage = () => {
        return localStorage.getItem("access_token") || sessionStorage.getItem("access_token") || "";
    };
    const [token, setToken] = useState(getTokenFromStorage());

    // Always force refresh user from storage on mount and after login
    React.useEffect(() => {
        let lastUserStr = JSON.stringify(getStoredUser());
        const syncUser = () => {
            setUser(getStoredUser());
        };
        window.addEventListener("storage", syncUser);
        // Poll for user changes every 1s (fixes same-tab login update)
        const interval = setInterval(() => {
            const currentUserStr = JSON.stringify(getStoredUser());
            if (currentUserStr !== lastUserStr) {
                lastUserStr = currentUserStr;
                setUser(getStoredUser());
            }
        }, 1000);
        return () => {
            window.removeEventListener("storage", syncUser);
            clearInterval(interval);
        };
    }, []);
    // Fetch progress from backend using authFetch (same as MandatoryList)
    const fetchProgressFromBackend = async () => {
        try {
            const res = await authFetch('/api/training-progress/');
            if (!res.ok) return {};
            const data = await res.json();
            return data || {};
        } catch {
            return {};
        }
    };

    // Handler to update progress state
    const handleProgressUpdate = async () => {
        const latest = await fetchProgressFromBackend();
        // ...existing code...
        if (latest && Object.keys(latest).length > 0) {
            setProgress(latest);
        } else {
            // If fetch fails, do not overwrite with empty object
            setProgress((prev) => ({ ...prev }));
        }
        setProgressTrigger(t => t + 1); // force re-render
    };
    // Logout: clear all auth data and reload
    const handleLogout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user");
        localStorage.removeItem("site");
        sessionStorage.removeItem("access_token");
        sessionStorage.removeItem("refresh_token");
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("site");
        window.location.href = "/login";
    };

    // Refresh token: get a new access token using the refresh token
    const handleRefreshToken = async () => {
        const refresh = localStorage.getItem("refresh_token") || sessionStorage.getItem("refresh_token");
        if (!refresh) {
            alert("No refresh token found. Please log in again.");
            handleLogout();
            return;
        }
        try {
            const res = await fetch(`${API_BASE}/api/token/refresh/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ refresh }),
            });
            if (!res.ok) {
                alert("Session expired. Please log in again.");
                handleLogout();
                return;
            }
            const data = await res.json();
            const token = data.access;
            if (token) {
                // Store new access token in both storages
                localStorage.setItem("access_token", token);
                sessionStorage.setItem("access_token", token);
                setToken(token);
                alert("Session refreshed.");
            } else {
                alert("Failed to refresh session. Please log in again.");
                handleLogout();
            }
        } catch (e) {
            alert("Error refreshing session. Please log in again.");
            handleLogout();
        }
    };


    // Always sync user.site with the latest selected site from storage after login
    const refreshUserFromStorage = React.useCallback(() => {
        const storedUser = getStoredUser();
        let site = localStorage.getItem("site") || sessionStorage.getItem("site");
        if (storedUser && site) {
            storedUser.site = site.toLowerCase();
        }
        setUser(storedUser);
    }, []);

    React.useEffect(() => {
        // Listen for login changes (if setUser/setToken called elsewhere)
        const handleStorage = () => {
            refreshUserFromStorage();
            let tokenStr = localStorage.getItem("access_token");
            if (!tokenStr) {
                tokenStr = sessionStorage.getItem("access_token");
            }
            setToken(tokenStr || "");
        };
        window.addEventListener("storage", handleStorage);
        // Also check on mount in case user was updated in another tab
        handleStorage();
        return () => window.removeEventListener("storage", handleStorage);
    }, [refreshUserFromStorage]);

    React.useEffect(() => {
        // If visitor, do not fetch or show any data
        if (user && user.role === "visitor") {
            setProgress({});
            return;
        }
        // Only fetch progress if logged in (token exists and is not empty string)
        if (!token || token === "") {
            setProgress({});
            return;
        }
        // If token exists but user is not yet loaded, do not force logout
        if (!user) {
            return;
        }
        const fetchAndSetProgress = async () => {
            try {
                const res = await authFetch('/api/training-progress/');
                if (res.status === 401 || res.status === 302) {
                    alert("Session expired or not authenticated. Please log in again.");
                    window.location.href = "/login";
                    return;
                }
                if (res.ok) {
                    const data = await res.json();
                    setProgress(data || {});
                } else {
                    setProgress((prev) => ({ ...prev }));
                }
            } catch (e) {
                setProgress((prev) => ({ ...prev }));
            }
        };
        fetchAndSetProgress();
    }, [token, progressTrigger, user]);

    const openCity = (event, cityName) => {
        setActiveTab(cityName);
    };

    const openPopup = (popupId) => {
        setPopupVisible(popupId);
    };

    const closePopup = () => {
        setPopupVisible(null);
    };



    // If visitor, only show a minimal Home tab, hide all other data
    let tabContent;
    // If visitor, only show Home tab and force Home tab to be active
        if (user && user.role === "visitor") {
            if (activeTab !== "Home") setActiveTab("Home");
            tabContent = {
                Home: (
                    <div id="Home" className="w3-container city">
                        <h2 style={{ color: 'red' }}>Welcome!</h2>
                        <p className="intro">You are viewing the portal as a visitor. No data is shown in this mode.</p>
                    </div>
                )
            };
        } else {
        tabContent = {
            Home: (() => {
                // Use the user state variable so the Home tab updates on login
                const latestUser = user;
                let name = "";
                if (latestUser && latestUser.role === "supervisor") {
                    if (latestUser.first_name || latestUser.last_name) {
                        name = [latestUser.first_name, latestUser.last_name].filter(Boolean).join(" ");
                    } else if (latestUser.username) {
                        name = latestUser.username;
                    } else if (latestUser.email) {
                        name = latestUser.email;
                    }
                }
                return (
                    <div id="Home" className="w3-container city">
                        {console.log('[DEBUG] TabMenu Home user:', latestUser)}
                        <h2 style={{ color: 'red' }}>
                            Welcome{(latestUser && latestUser.role === "supervisor" && name) ? `, ${name}` : ""}!
                        </h2>
                        <p className="intro">
                            Congratulations on stepping into your role as a Supervisor within Res Dev!
                            This portal is your personal guide to becoming the best supervisor you can be — an online training package that covers all the responsibilities of an Operations Supervisor and supports you in building the skills and confidence to thrive in your new role.
                        </p>
                        <h2 style={{ color: 'orange' }}>Our Values</h2>
                        <ul className="values-list">
                            <li><strong>Care</strong> – We care about the physical and psychological safety of ourselves and others, we care about creating an environment of trust, and we care about the impact we have on our colleagues, communities, and the environment.</li>
                            <li><strong>Courage</strong> – We have the courage to show vulnerability, the courage to speak up and challenge when we can do better, and the courage to take ownership of our actions and outcomes to drive performance.</li>
                            <li><strong>Curiosity</strong> – We have curiosity to learn and grow in our fields of expertise, look for opportunities to solve problems with everyday innovation, and be open to different perspectives</li>
                        </ul>
                        <h2 style={{ color: 'orange' }}>Your Learning Journey</h2>
                        <p>This is a self-led training package, guided by the help of mentors with progress reported to your Superintendent. The training package covers...</p>
                        <ul className="training-list">
                            <li>Roles Responsibilities/skills - What work skills and abilities you are required to learn</li>
                            <li>Divides each responsibility into levels (1,2,3). This ensures thorough understanding of the responsibilities and provides candidates the opportunity to learn at a pace suited to their experience and aptitude</li>
                            <li>Training process comments - Exposure/Experience/Education</li>
                            <li>Training Material links - How to guides, QRG's and examples to help give context and clear direction on closing out a Responsibility/Skill</li>
                            <li>Progress reporting - percentage slider for easy tracking</li>
                        </ul>
                        <h2 style={{ color: 'orange' }}>Take Control of Your Development</h2>
                        <p>Grow your skills. Challenge yourself. Become the leader you’re meant to be.</p>
                    </div>
                );
            })(),
            Overview: (
                <OverviewTab
                    progress={progress}
                    progressTrigger={progressTrigger}
                    setActiveTab={setActiveTab}
                    openPopup={openPopup}
                    user={user}
                />
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
                    <h2>Earthworks Supervision</h2> 
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
                    <MandatoryList
                        onProgressUpdate={handleProgressUpdate}
                        progress={progress}
                        setProgress={setProgress}
                    />
                </div>
            ),
        };
    }

    return (
        <div className="page-wrapper">
            <div className="tabbar-bg" style={{ width: '100%', background: '#f1f1f1', height: '48px', display: 'flex', alignItems: 'center', padding: 0, margin: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div className="w3-bar" role="tablist" aria-label="Training sections" style={{ display: 'flex', justifyContent: 'center' }}>
                            {user && user.role === "visitor" ? (
                                <button
                                    key="Home"
                                    id="tab-Home"
                                    className="tablink w3-red"
                                    role="tab"
                                    aria-selected={true}
                                    aria-controls="tabpanel-Home"
                                    tabIndex={0}
                                    disabled
                                >
                                    Home
                                </button>
                            ) : (
                                Object.keys(tabContent).map((tab, idx) => (
                                    <button
                                        key={tab}
                                        id={`tab-${tab}`}
                                        className={`tablink ${activeTab === tab ? "w3-red" : ""}`}
                                        role="tab"
                                        aria-selected={activeTab === tab}
                                        aria-controls={`tabpanel-${tab}`}
                                        tabIndex={activeTab === tab ? 0 : -1}
                                        onClick={(e) => openCity(e, tab)}
                                        onKeyDown={e => {
                                            if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                                                e.preventDefault();
                                                const tabs = Object.keys(tabContent);
                                                const currentIdx = tabs.indexOf(activeTab);
                                                let nextIdx = e.key === 'ArrowRight' ? currentIdx + 1 : currentIdx - 1;
                                                if (nextIdx < 0) nextIdx = tabs.length - 1;
                                                if (nextIdx >= tabs.length) nextIdx = 0;
                                                setActiveTab(tabs[nextIdx]);
                                                document.getElementById(`tab-${tabs[nextIdx]}`)?.focus();
                                            }
                                        }}
                                    >
                                        {tab.replace(/_/g, " ")}
                                    </button>
                                ))
                            )}
                        </div>
                        {/* Logout and Refresh buttons only for logged-in supervisors */}
                        {user && user.role === "supervisor" && (
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <button onClick={handleLogout} style={{ background: '#cd2c2c', color: 'white', border: 'none', borderRadius: 4, padding: '0.4rem 0.8rem', fontWeight: 'bold' }}>Logout</button>
                                <button onClick={handleRefreshToken} style={{ background: '#004b87', color: 'white', border: 'none', borderRadius: 4, padding: '0.4rem 0.8rem', fontWeight: 'bold' }}>Refresh Session</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div>
                <div
                    key={activeTab}
                    id={`tabpanel-${activeTab}`}
                    role="tabpanel"
                    aria-labelledby={`tab-${activeTab}`}
                    tabIndex={0}
                >
                    <TrainingTabs
                        tabContent={tabContent}
                        activeTab={activeTab}
                        popupVisible={popupVisible}
                        closePopup={closePopup}
                        token={localStorage.getItem("access_token") || sessionStorage.getItem("access_token") || ""}
                        onProgressUpdate={handleProgressUpdate}
                    />
                </div>
            </div>
        </div>
    );
};


export default TabMenu;

