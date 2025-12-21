import React from "react";
import { trainingList } from "./MandatoryList";

function OverviewTab({ progress, progressTrigger, setActiveTab, openPopup, user }) {
    // DEBUG: Log progress and checkedMandatory to diagnose issues
    console.log('[OverviewTab] progress:', progress);
    if (progress && progress['mandatory_training']) {
        console.log('[OverviewTab] progress[mandatory_training]:', progress['mandatory_training']);
    }
    let checkedMandatory = [];
    if (progress && Array.isArray(progress['mandatory_training'])) {
        checkedMandatory = progress['mandatory_training'];
    }
    console.log('[OverviewTab] checkedMandatory:', checkedMandatory);
    // Only count truthy (checked) values, not just array length
    const completedMandatory = checkedMandatory.filter(Boolean).length;
    const totalMandatory = trainingList.length;
    const percentMandatory = totalMandatory > 0 ? Math.round((completedMandatory / totalMandatory) * 100) : 0;

    return (
        <div className="city welcome-container" key={progressTrigger}>
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
                            className="progress-bar-container"
                            onClick={() => setActiveTab('Mandatory_Training')}
                            style={{ cursor: "pointer", marginBottom: 12 }}
                        >
                            <div style={{ display: "flex", alignItems: "center", marginBottom: 4 }}>
                                <span style={{ flex: 1 }}>Mandatory Training</span>
                                <span style={{ marginLeft: 12, fontWeight: 600 }}>{percentMandatory}%</span>
                            </div>
                            <div id="myProgress" style={{ background: '#e0e0e0', borderRadius: 8, height: 24, overflow: 'hidden', width: '100%' }}>
                                <div
                                    id="myBar"
                                    style={{
                                        width: `${percentMandatory}%`,
                                        minWidth: percentMandatory > 0 ? undefined : 32,
                                        background: 'linear-gradient(90deg, #4caf50 0%, #43e97b 100%)',
                                        height: '100%',
                                        borderRadius: 8,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white',
                                        fontWeight: 700,
                                        fontSize: 16,
                                        transition: 'width 0.5s',
                                    }}
                                >
                                    <span id="percentage">{percentMandatory}%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* End Mandatory Training Section */}
                {[
                    { area: "Drilling", popups: ["drilling1", "drilling2", "drilling3"], labels: ["Drilling Level 1", "Drilling Level 2", "Drilling Level 3"], total: 36 },
                    { area: "Safety", popups: ["safety1", "safety2", "safety3"], labels: ["Safety Level 1", "Safety Level 2", "Safety Level 3"], total: 36 },
                    { area: "Leadership", popups: ["leadership1", "leadership2", "leadership3"], labels: ["Leadership Level 1", "Leadership Level 2", "Leadership Level 3"], total: 15 },
                    { area: "Operations", popups: ["operations1", "operations2", "operations3"], labels: ["Operations Level 1", "Operations Level 2", "Operations Level 3"], total: 36 },
                    { area: "Earthworks", popups: ["earthworks1", "earthworks2", "earthworks3"], labels: ["Earthworks Level 1", "Earthworks Level 2", "Earthworks Level 3"], total: 36 },
                    { area: "Cost Reporting", popups: ["cost1", "cost2", "cost3"], labels: ["Cost Reporting Level 1", "Cost Reporting Level 2", "Cost Reporting Level 3"], total: 36 },
                    { area: "Contractor Management", popups: ["contractor1", "contractor2", "contractor3"], labels: ["Contractor Management Level 1", "Contractor Management Level 2", "Contractor Management Level 3"], total: 36 },
                    { area: "Field Supervisor", popups: ["field1", "field2", "field3"], labels: ["Field Supervisor Level 1", "Field Supervisor Level 2", "Field Supervisor Level 3"], total: 36 },
                ].map(({ area, popups, labels, total }) => (
                    <div className="overview-section" key={area}>
                        <h2>{area}</h2>
                        <div className="tab-buttons">
                            {popups.map((popupId, idx) => {
                                const site = (user && user.site) || 'default';
                                let checked = [];
                                if (progress && progress[site] && progress[site][popupId]) {
                                    checked = progress[site][popupId];
                                }
                                if (!Array.isArray(checked)) checked = [];
                                const percent = total > 0 ? Math.round((checked.length / total) * 100) : 0;
                                return (
                                    <div
                                        key={popupId}
                                        className="progress-bar-container"
                                        onClick={() => openPopup(popupId)}
                                        style={{ cursor: "pointer", marginBottom: 12 }}
                                    >
                                        <div style={{ display: "flex", alignItems: "center", marginBottom: 4 }}>
                                            <span style={{ flex: 1 }}>{labels[idx]}</span>
                                            <span style={{ marginLeft: 12, fontWeight: 600 }}>{percent}%</span>
                                        </div>
                                        <div className="progress-bar-bg">
                                            <div
                                                className="progress-bar-fill"
                                                style={{ width: `${percent}%`, minWidth: percent > 0 ? undefined : 32 }}
                                            >
                                                {percent}%
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
