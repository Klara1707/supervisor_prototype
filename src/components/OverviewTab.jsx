
import React from "react";
import trainingList from "../data/trainingList";
import "./OverviewTab.css";

// Reusable function for progress percentage
function calculateProgressPercent(progressData, total, type = "normal") {
    if (!progressData) return 0;
    let arr;
    if (type === "mandatory_training") {
        arr = progressData;
        if (!Array.isArray(arr)) return 0;
        return Math.round((arr.filter(Boolean).length / total) * 100);
    } else {
        // flatten 2D array if needed
        if (Array.isArray(progressData) && Array.isArray(progressData[0])) {
            arr = progressData.flat();
        } else if (Array.isArray(progressData)) {
            arr = progressData;
        } else {
            arr = [];
        }
        // Pad or trim
        if (arr.length > total) arr = arr.slice(0, total);
        if (arr.length < total) arr = arr.concat(Array(total - arr.length).fill(false));
        return total > 0 ? Math.round((arr.filter(Boolean).length / total) * 100) : 0;
    }
}

function OverviewTab({ progress, progressTrigger, setActiveTab, openPopup, user }) {
    // Use the same logic for mandatory training as for other areas
    const site = (user && user.site) || 'default';
    // ...existing code...

    let percentMandatory = 0;
    let mt = null;
    if (progress && progress['mandatory_training']) {
        mt = progress['mandatory_training'];
    } else if (progress && progress[site] && progress[site]['mandatory_training']) {
        mt = progress[site]['mandatory_training'];
    }
    let checkedMandatory = [];
    if (mt) {
        if (Array.isArray(mt)) {
            checkedMandatory = Array.isArray(mt[0]) ? mt.flat() : mt;
        } else if (typeof mt === 'object' && Array.isArray(mt.checkedItems)) {
            checkedMandatory = mt.checkedItems;
        }
    }
    // Always pad or slice to trainingList.length
    if (checkedMandatory.length > trainingList.length) {
        checkedMandatory = checkedMandatory.slice(0, trainingList.length);
    } else if (checkedMandatory.length < trainingList.length) {
        checkedMandatory = checkedMandatory.concat(Array(trainingList.length - checkedMandatory.length).fill(false));
    }
    percentMandatory = calculateProgressPercent(checkedMandatory, trainingList.length, "mandatory_training");

    //
    // Removed unused openTestLevel and handler
    return (
        <div className="city welcome-container" key={progressTrigger}>
            {/* Removed test level buttons */}
            <h1>Overview</h1>
            <p className="intro">
                Your progress for each training area. Click a bar to open the popup and continue your training.
            </p>
            <div className="overview-grid">
                {/* Mandatory Training Section */}
                <div className="overview-section">
                    <h2>Mandatory Training</h2>
                    <div className="tab-buttons">
                        <div
                            className="overview-progress-bar-container"
                            onClick={() => setActiveTab('Mandatory_Training')}
                            style={{ cursor: "pointer" }}
                        >
                            <div style={{ display: "flex", alignItems: "center", marginBottom: 4 }}>
                                <span style={{ flex: 1 }}>Mandatory Training</span>
                                <span className="overview-percentage" style={{ marginLeft: 12, fontWeight: 600 }}>{percentMandatory}%</span>
                            </div>
                            <div className="overview-progress-bar-container">
                                <div
                                    className="overview-progress-bar-fill"
                                    style={{ width: `${percentMandatory}%` }}
                                >
                                    <span className="overview-percentage">{percentMandatory}%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* End Mandatory Training Section */}
                {[
                    { area: "Drilling", popups: ["drilling1", "drilling2", "drilling3"], labels: ["Drilling Level 1", "Drilling Level 2", "Drilling Level 3"], total: 42 },
                    { area: "Safety", popups: ["safety1", "safety2", "safety3"], labels: ["Safety Level 1", "Safety Level 2", "Safety Level 3"], total: 42 },
                    { area: "Leadership", popups: ["leadership1", "leadership2", "leadership3"], labels: ["Leadership Level 1", "Leadership Level 2", "Leadership Level 3"], total: 42 },
                    { area: "Operations", popups: ["operations1", "operations2", "operations3"], labels: ["Operations Level 1", "Operations Level 2", "Operations Level 3"], total: 42 },
                    { area: "Earthworks", popups: ["earthworks1", "earthworks2", "earthworks3"], labels: ["Earthworks Level 1", "Earthworks Level 2", "Earthworks Level 3"], total: 42 },
                    { area: "Cost Reporting", popups: ["cost1", "cost2", "cost3"], labels: ["Cost Reporting Level 1", "Cost Reporting Level 2", "Cost Reporting Level 3"], total: 42 },
                    { area: "Contractor Management", popups: ["contractor1", "contractor2", "contractor3"], labels: ["Contractor Management Level 1", "Contractor Management Level 2", "Contractor Management Level 3"], total: 42 },
                    { area: "Field Supervisor", popups: ["field1", "field2", "field3"], labels: ["Field Supervisor Level 1", "Field Supervisor Level 2", "Field Supervisor Level 3"], total: 42 },
                ].map(({ area, popups, labels, total }) => (
                    <div className="overview-section" key={area}>
                        <h2>{area}</h2>
                        <div className="tab-buttons">
                            {popups.map((popupId, idx) => {
                                const site = (user && user.site) || 'default';
                                let checked = [];
                                let percent = 0;
                                let popupObj = null;
                                if (progress && progress[site] && progress[site][popupId]) {
                                    popupObj = progress[site][popupId];
                                } else if (progress && progress[popupId]) {
                                    popupObj = progress[popupId];
                                }
                                if (popupObj) {
                                    let grid = [];
                                    if (popupObj && typeof popupObj === 'object' && Array.isArray(popupObj.gridProgressChecks)) {
                                        grid = popupObj.gridProgressChecks;
                                    } else if (Array.isArray(popupObj)) {
                                        grid = popupObj;
                                    }
                                    percent = calculateProgressPercent(grid, total);
                                    // For debug display
                                    checked = Array.isArray(grid) && Array.isArray(grid[0]) ? grid.flat() : (Array.isArray(grid) ? grid : []);
                                    if (checked.length > total) checked = checked.slice(0, total);
                                    if (checked.length < total) checked = checked.concat(Array(total - checked.length).fill(false));
                                }
                                return (
                                    <div
                                        key={popupId}
                                        className="overview-progress-bar-container"
                                        onClick={() => openPopup(popupId)}
                                        style={{ cursor: "pointer", marginBottom: 12 }}
                                    >
                                        <div style={{ display: "flex", alignItems: "center", marginBottom: 4 }}>
                                            <span style={{ flex: 1 }}>{labels[idx]}</span>
                                            <span className="overview-percentage" style={{ marginLeft: 12, fontWeight: 600 }}>{percent}%</span>
                                        </div>
                                        <div className="overview-progress-bar-container">
                                            <div
                                                className="overview-progress-bar-fill"
                                                style={{ width: `${percent}%` }}
                                            >
                                                <span className="overview-percentage">{percent}%</span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default OverviewTab;
