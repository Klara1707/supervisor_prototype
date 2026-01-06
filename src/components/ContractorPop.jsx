// import { useDebouncedSave } from "../hooks/useDebouncedSave";
import "./Pop.css";
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import SignOffForm from "./SignOffForm";

const LevelPopup = ({ level, onClose, popupId, userToken, onProgressUpdate }) => {
            // Texts for each popup level
            const boxTextsByLevel = {
                1: [
                    // 6 rows for Level 1
                    ["Understands and manages the Non-Inducted Transport Worker process, ensuring compliance with site access protocols and contractor management procedures", 
                        "Can locate and use the Non-Inducted Transport Worker (NITW) checklist on Safeday, and is capable of safely conducting NITW activities in accordance with site procedures and safety requirements", 
                        "", 
                        "", 
                        "System Access & Usage: Able to download the Non-Inducted Transport Worker (NITW) checklist to a mobile device using the provided link. Familiar with accessing and navigating Safeday to support NITW activities. Exposure: Has familiarised themselves with the rules and requirements of the NITW process through hands-on experience and guidance from site procedures.", 
                        "Cost L1: Box 6"],
                    ["Understands and manages contractor mobilisation, including PTW, inductions, qualifications, and compliance with mySafety and Everyday Respect standards", 
                        "Manages documentation, background checks, and communication required for contractor mobilisation to site", 
                        "Understands and manages contractor mobilisation, including PTW, inductions, qualifications, and compliance with mySafety and Everyday Respect standards", 
                        "", 
                        "System Access: Has access to CM One, Pegasus, SAP, R3413 for qualifications checks, Protrak for inspections, and Safeday for safety documentation. Exposure: Mentored on-site by SMEs and HSE personnel in conducting documentation reviews, inspections, qualifications checks, and using Safeday and Protrak systems. Also received guidance on the contractor mobilisation process and understanding contract stipulations.", 
                        "Cost L1: Box 12"],
                    ["Trained and competent in managing the Permit to Work (PTW) process, ensuring compliance with site safety and operational procedures", 
                        "Completed CMS qualification and applies its context to daily CMS duties. Understands the difference between general and master PTWs", 
                        "Completed CMS qualification and applies its context to daily CMS duties. Understands the difference between general and master PTWs", 
                        "", 
                        "CMS Qualification & System Access: Nominated by Superintendent/Manager and successfully completed the CMS classroom course. Has access to Pegasus and R3413 for qualifications checks.", 
                        "Cost L1: Box 18"],
                    ["Competent in conducting Weekly Contractor Performance Meetings, understanding their purpose, storage requirements, and proactively addressing issues by creating and completing required actions", 
                        "Understands the link between Contractor Performance Meetings and continuous improvement, recognising the importance of engaging with contractors to identify and address opportunities for enhancement", 
                        "Follows up on actions raised during Contractor Performance Meetings and engages with the Contract Management team for support or to escalate issues when needed", 
                        "Cost L1: Box 22", 
                        "Form Review: Go through the form with an SME/Supervisor. Discuss key data points to present, including: DDM data, Enablon actions, Protrak inspections, Safeday/CRM data", 
                        "Cost L1: Box 24"],
                    ["Monitors contractor compliance with Fatigue Management requirements, including: Roster management practices. Understanding and application of the Fatigue Management Policy. Note: This is essential for effective nightshift supervision.", 
                        "Has read and can apply the Fatigue Management Policy, with a strong focus on nightshift operations", 
                        "", 
                        "", 
                        "Education – Fatigue Management. Read and understand the Fatigue Management Policy. Apply the policy during nightshift operations. Perform relevant checks to ensure compliance.", 
                        "Cost L1: Box 30"],
                    ["Demonstrates understanding of the Contract Summary relevant to assigned projects, including key terms, deliverables, and contractor obligations", 
                        "Has access to and understands the Contract Summaries relevant to assigned projects, including key terms and obligations", 
                        "Has access to and understands Contract Summaries relevant to assigned projects. Can review and apply contract terms when required, including: Plod signing, Mobilisation, Active vs non-active rates, Standby provisions", 
                        "",
                        "Exposure – Contract Management Team: Understand the roles and responsibilities of the Contract Management (CM) team. Engage with CM team members to clarify contract terms when needed. Has access to contract summaries and can extract and apply relevant information to daily tasks. Receives mentoring from an SME or Supervisor to support learning and application.", 
                        "Cost L1: Box 36"]
                ],
                2: [
                    // 2 rows for Level 2
                    ["Understands the contractor mechanical inspection process and can perform equipment inspections relevant to site requirements", 
                        "Understands the 6-monthly inspection process. Can access Protrak Inspections, look up equipment, and is responsible for checking off outstanding items", 
                        "", 
                        "", 
                        "Has access to Protrak Inspections. Receives mentoring from the Mechanical team/Supervisor on the 6-month inspection process, field checks, and data entry into Protrak", 
                        "Cost L2: Box 6"],
                    ["Contributes to quarterly contractor meetings and leads weekly Sunday contractor performance discussions", 
                        "Conducts contractor meetings, records minutes, and stores documentation in the shared drive", 
                        "Presents contractor performance data, challenges non-conformance or poor performance, develops meaningful improvement actions, and ensures follow-up and close-out", 
                        "", 
                        "Exposure: Receives mentoring on CMS weekly meetings and how they link to monthly meetings. Experience: Provides contractor feedback to the CM team for inclusion in monthly meetings.", 
                        "Cost L2: Box 12"]
                ],
                3: [
                    // 3 rows for Level 3
                    ["Complete Radiation Source Notifications as required", 
                        "Identify local RSO, request Geophysics contractor to compile documents, submit for assessment and register update", 
                        "Identify local RSO, request Geophysics contractor to compile documents, submit for assessment and register update", 
                        "", 
                        "Exposure through mentoring by SME/Supervisor on RSO contacts, required documentation, and managing vehicle movements", 
                        "Cost L3: Box 6"],
                    ["Manage entry of personnel and equipment to site (Equipment Authorisation, Registers, Weed & Seed checks)", 
                        "Conduct RTIO checks with Cat 3 contractor supervisor, set realistic timeframes for fixes, enter into Protrak, and close out", 
                        "", 
                        "", 
                        "Education: Know where to find the Weed & Seed form (Safeday). Exposure: SME mentoring on effective and thorough Weed & Seed checks on site", 
                        "Cost L3: Box 12"],
                    ["Understand and manage the ICP inspection process for pressure vessels", 
                        "Understand inspection requirements for pressure vessels entering mine lease; coordinate with mine or Stat Supervisors to manage process", 
                        "Manage rig movements and remove from site register as required",
                        "", 
                        "Exposure through SME/Supervisor mentoring on ICP contacts, required documentation, managing pressure vessels onsite, field assurance activities, and CCVS checks", 
                        "Cost L3: Box 18"]
                ]
            };
            const boxTexts = boxTextsByLevel[level] || boxTextsByLevel[1];
            // Ensure boxTexts has enough rows for rendering (avoid undefined errors)
            let safeBoxTexts = boxTexts;
            if (level === 1 && boxTexts.length < 6) {
                safeBoxTexts = [
                    ...boxTexts,
                    ...Array(6 - boxTexts.length).fill(null).map(() => Array(6).fill(""))
                ];
            } else if (level === 2 && boxTexts.length < 2) {
                safeBoxTexts = [
                    ...boxTexts,
                    ...Array(2 - boxTexts.length).fill(null).map(() => Array(6).fill(""))
                ];
            } else if (level === 3 && boxTexts.length < 3) {
                safeBoxTexts = [
                    ...boxTexts,
                    ...Array(3 - boxTexts.length).fill(null).map(() => Array(6).fill(""))
                ];
            }
        // Grid headers
        const headers = [
            "Skills/Responsibilities", "Sub Section 1", "Sub Section 2", "Sub Section 3",
            "Training Process", "Training Material", "Reviewer sign off", "Comments"
        ];
        // For grid checkboxes: 6 columns x 6 rows = 36 checkboxes
        // Must have 7 rows for rows 1-7 (index 0-6)
        const [gridProgressChecks, setGridProgressChecks] = useState(Array(7).fill(null).map(() => Array(6).fill(false)));
        const [comments, setComments] = useState(Array(7).fill(""));
        const [signOffs, setSignOffs] = useState(Array(7).fill(null).map(() => ({ name: "", date: "", signed: false })));
        const [hasLoaded, setHasLoaded] = useState(false); // Prevent auto-save before initial load
    // Manual save progress button with success tick
    const [saveStatus, setSaveStatus] = useState('idle'); // idle | success
    // Extracted fetch logic for re-use
    const fetchProgress = async () => {
        if (!popupId || !userToken) return;
        try {
            const res = await fetch(`/api/training-progress/?popupId=${encodeURIComponent(popupId)}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${userToken}`,
                    "Content-Type": "application/json"
                }
            });
            if (res.ok) {
                const data = await res.json();
                // Support both new ({ popupId: {...} }) and legacy ({...}) formats
                const entry = data && (data[popupId] || data);
                if (entry) {
                    setGridProgressChecks(entry.gridProgressChecks || Array(7).fill(null).map(() => Array(6).fill(false)));
                    setComments(entry.comments || Array(7).fill(""));
                    setSignOffs(entry.signOffs || Array(7).fill(null).map(() => ({ name: "", date: "", signed: false })));
                    setHasLoaded(true); // Mark as loaded so auto-save can start
                }
            }
        } catch (err) {}
    };

    const handleManualSave = async () => {
        if (!popupId || !userToken) return;
        const payload = {
            popupId,
            gridProgressChecks,
            comments,
            signOffs,
            progressPercentage: percentage
        };
        await fetch("/api/training-progress/", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${userToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });
        setSaveStatus('success');
        if (onProgressUpdate) await onProgressUpdate();
        // Re-fetch latest progress after save
        await fetchProgress();
        setTimeout(() => setSaveStatus('idle'), 1200);
    };
    // Robust percentage calculation: support both 2D and flat arrays
    let flatChecks = Array.isArray(gridProgressChecks[0]) ? gridProgressChecks.flat() : gridProgressChecks;
    const totalGridChecks = 42; // Always 7x6
    const completedGridChecks = flatChecks.filter(Boolean).length;
    const percentage = Math.round((completedGridChecks / totalGridChecks) * 100);

    // Load progress from backend on mount
    useEffect(() => {
        fetchProgress();
        // eslint-disable-next-line
    }, [popupId, userToken]);

    // Auto-save progress to backend on every change and on unmount (close)
    useEffect(() => {
        if (!hasLoaded) return; // Don't auto-save until data is loaded
        if (!popupId || !userToken) return;
        const payload = {
            popupId,
            gridProgressChecks,
            comments,
            signOffs,
            progressPercentage: percentage
        };
        fetch("/api/training-progress/", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${userToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });
        if (onProgressUpdate) onProgressUpdate();
        // Also save on unmount (when popup closes)
        return () => {
            fetch("/api/training-progress/", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${userToken}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });
            if (onProgressUpdate) onProgressUpdate();
        };
        // eslint-disable-next-line
    }, [gridProgressChecks, comments, signOffs, percentage, popupId, userToken, hasLoaded]);

    // Build table rows for Bootstrap table
    const tableRows = [];
    // Header row
    tableRows.push(
        <tr key="header">
            {headers.map((header, idx) => (
                <th key={idx} className="text-center align-middle bg-light">{header}</th>
            ))}
        </tr>
    );
    // Data rows
    let numRows = 7;
    if (level === 1) {
        numRows = 6;
    } else if (level === 2) {
        numRows = 2;
    } else if (level === 3) {
        numRows = 3;
    }
    for (let row = 1; row <= numRows; row++) {
        tableRows.push(
            <tr key={row}>
                {/* Progress checkboxes with unique text */}
                {[0,1,2,3,4,5].map(col => (
                    <td key={col} className="align-middle" style={{ position: 'relative', paddingRight: 0, paddingBottom: 0 }}>
                        <span style={{ display: 'block', marginBottom: 24, fontSize: 14, color: '#333' }}>{safeBoxTexts[row-1][col]}</span>
                        <input
                            type="checkbox"
                            checked={gridProgressChecks[row-1][col]}
                            onChange={() => {
                                const updated = gridProgressChecks.map(arr => arr.slice());
                                updated[row-1][col] = !updated[row-1][col];
                                setGridProgressChecks(updated);
                            }}
                            style={{ position: 'absolute', bottom: 8, right: 8, margin: 0 }}
                        />
                    </td>
                ))}
                {/* Sign off cell */}
                <td className="align-middle">
                    <SignOffForm
                        name={signOffs[row-1].name}
                        date={signOffs[row-1].date}
                        signed={signOffs[row-1].signed}
                        onChange={(field, value) => {
                            const updated = signOffs.map((s, idx) => idx === row-1 ? { ...s, [field]: value } : s);
                            setSignOffs(updated);
                        }}
                        onSignOff={() => {
                            if (signOffs[row-1].name && signOffs[row-1].date) {
                                const updated = signOffs.map((s, idx) => idx === row-1 ? { ...s, signed: true } : s);
                                setSignOffs(updated);
                            }
                        }}
                    />
                </td>
                {/* Comment cell */}
                <td className="align-middle" style={{ padding: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                            <textarea
                                value={comments[row-1]}
                                onChange={e => {
                                    const updated = comments.slice();
                                    updated[row-1] = e.target.value;
                                    setComments(updated);
                                }}
                                placeholder="Enter your comment"
                                className="form-control"
                                style={{
                                    minHeight: 140,
                                    maxHeight: 140,
                                    width: '100%',
                                    border: '1px solid #ced4da',
                                    borderRadius: 4,
                                    resize: 'none',
                                    boxShadow: 'none',
                                    padding: 8,
                                    margin: 0,
                                    display: 'block',
                                }}
                            />
                        </div>
                </td>
            </tr>
        );
    }

    // Helper component for per-row sign-off form
    // Move outside the loop
    // ...existing code...

    return (
        <div className="popup-overlay">
            <div className="popup-content level-popup" style={{ maxWidth: 900 }}>
                <h2>Contractor Management Level {level}</h2>
                <button
                    className="save-progress-btn"
                    onClick={handleManualSave}
                >
                    {saveStatus === 'success' ? (
                        <span style={{ fontSize: 20, color: 'white' }}>✔️</span>
                    ) : null}
                    Save Progress
                </button>
                <div className="progress-bar-container mb-3">
                    <div
                        className="progress-bar"
                        style={{
                            width: `${percentage}%`,
                            backgroundColor: completedGridChecks > 0 ? '#4caf50' : '#e0e0e0',
                            color: completedGridChecks > 0 ? 'white' : '#333',
                            position: 'relative'
                        }}
                    >
                        {completedGridChecks > 0 && (
                            <span className="progress-text">{percentage}%</span>
                        )}
                    </div>
                </div>
                <div className="table-responsive mb-3">
                    <table className="table table-bordered table-striped table-hover align-middle">
                        <tbody>
                            {tableRows}
                        </tbody>
                    </table>
                </div>
                <button className="close-button" onClick={onClose} aria-label="Close popup">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="12" fill="#ff4d4d" />
                        <line x1="8" y1="8" x2="16" y2="16" stroke="white" strokeWidth="2" />
                        <line x1="16" y1="8" x2="8" y2="16" stroke="white" strokeWidth="2" />
                    </svg>
                </button>
            </div>
        </div>
    );
    
}



function ContractorPop({ popupId, closePopup, userToken, onProgressUpdate }) {
    if (!popupId) return null;
    let openLevel = null;
    if (popupId === "contractor1") openLevel = 1;
    else if (popupId === "contractor2") openLevel = 2;
    else if (popupId === "contractor3") openLevel = 3;

    return (
        openLevel ? (
            <div className="popup-overlay contractor-popup-fadein">
                <div className="popup-container contractor-popup-centered">
                    <button className="close-btn" onClick={closePopup} style={{ float: 'right' }}>Close</button>
                    <LevelPopup level={openLevel} onClose={closePopup} popupId={popupId} userToken={userToken} onProgressUpdate={onProgressUpdate} />
                </div>
            </div>
        ) : null
    );
}

export default ContractorPop;