// import { useDebouncedSave } from "../hooks/useDebouncedSave";
import "./Pop.css";
import { useState, useEffect } from "react";
import { renderLinkButton } from "./linkButtons";
import 'bootstrap/dist/css/bootstrap.min.css';
import SignOffForm from "./SignOffForm";


const LevelPopup = ({ level, onClose, popupId, userToken, onProgressUpdate }) => {
        // Texts for each popup level
        const boxTextsByLevel = {
            1: [
                ["Manages Operator/HME PLODs, confidently queries activities, and completes approvals (sign, scan, save)", 
                    "Understands the PLOD approval workflow and its role in tracking performance and cost allocation. Can link PLOD data to the DDM board", 
                    "Understands EW PLOD work activities, including operator, machine, standby, and non-operating charges", 
                    "Can question PLOD charges and provide accurate guidance. Has working knowledge of the contract and its application", 
                    "Review & Access: Understand the E/Works PLOD signing process flow. Access Matrix and contract summaries. Exposure: Mentoring from SME/Supervisor on thorough PLOD checks. Engage with CM team and escalate charge queries to Cat 3 Supervisor.", 
                    "Procurement"],
                ["Manages daily plods submitted by Drilling and Hydro contractors, with the ability to confidently review, query activities, and approve submissions in line with operational requirements", 
                    "Understands the process flow for plod approval, including its role in tracking contractor performance and assigning costs. Confidently reviews and signs off on daily plods, ensuring accuracy and accountability", 
                    "Understands the various work activities recorded on a drilling plod, including the distinctions between operator charges, machine charges, standby time, and non-operating charges. Applies this knowledge to accurately review and validate contractor submissions", 
                    "Confidently queries and validates charges on contractor plods, providing accurate guidance based on operational understanding. Has working knowledge of the contract and how its terms are applied in daily activities", 
                    "Review: Understands the end-to-end process flow for signing Drilling and Hydro contractor plods, ensuring accuracy and compliance with operational procedures. Access: Has access to contract summaries to support informed decision-making during plod reviews and approvals. Exposure: Mentored by SMEs and Supervisors on conducting thorough plod checks. Engages in communication with the Contract Management (CM) team and escalates queries on charges to the Category 3 Supervisor as required.", 
                    "Procurement"],
                ["Accurately enters contractor plod data into Protrak and confidently approves plods in Coreplan or Matrix, ensuring alignment with operational and contractual requirements", 
                    "Has system access and login credentials to relevant portals, enabling the approval and processing of contractor plods with accuracy and efficiency", 
                    "",
                    "", 
                    "System Access: Has access to both Protrak and Matrix systems, enabling efficient data entry and approval of contractor plods. Exposure: Shadowed by SMEs and Supervisors to learn accurate entry and approval processes for Hydro plods in Matrix, ensuring compliance with operational and contractual standards.", 
                    "Protrack"]
            ],
            2: [
                ["Understands the breakdown of the department budget, including the distinction between Opex and Capex", 
                    "Understands which cost activities align with Opex and Capex expense buckets, and the rationale behind their classification", 
                    "", 
                    "", 
                    "No formal training is available at Supervisor level—stay curious and ask experienced Supervisors or Superintendents for guidance", 
                    ""],
                ["Understands the cost breakdown of activities within their work area and how each contributes to overall budget management", 
                    "Can locate and use the current WBS register to support cost tracking and activity alignment", 
                    "Can identify and apply the correct Cost Code or Cost Centre for activities, services, and purchases within their work area", 
                    "", 
                    "No formal training is available at Supervisor level—stay curious, ask questions, and seek guidance from experienced Supervisors or Superintendents", 
                    "WBS"],
                ["Understanding of Department budget breakdown Opex V Capex", 
                    "Understand what cost activites are associated to which expense buckets and why", 
                    "", 
                    "", 
                    "Tip - No formal training available at Supv level, get curious and ask questions experienced Supv/Supt", 
                    ""],
                ["Understand the cost breakdown of the activities in your relevant work area", 
                    "Locate and utilise the current WBS register", 
                    "Be able to identify the correct Cost Code or Cost Center for work area activities, services and purchases", 
                    "", 
                    "Tip - No formal training available at Supv level, get curious and ask questions experienced Supv/Supt", 
                    "WBS"]
            ],
            3: [
                ["Basic understanding of the ResDev annual budget process, including key timelines, inputs, and approvals", 
                    "Understand the basic process flow of how future work packages are requested, approved, forecasted and then budgeted", 
                    "Understand the process flow for future work packages: request, approval, forecasting, and budgeting", 
                    "", 
                    "No formal training at Supervisor level—stay curious and ask questions of experienced Superintendents and Technical Leads", 
                    "Contractor L3: Box 6"],
                ["Basic understanding of the ResDev annual budget process", 
                    "Understand the basic process flow of how future work packages are requested, approved, forecasted and then budgeted", 
                    "Expand understanding of Opex and Capex into Suscap, Devcap, Central and Opex", 
                    "", 
                    "Tip - No formal training available at Supv level, continue to get curious and ask questions experienced Supt/Technical Leads", 
                    ""]
            ]
        };
        const boxTexts = boxTextsByLevel[level] || boxTextsByLevel[1];
        // Ensure boxTexts has enough rows for rendering (avoid undefined errors)
        let safeBoxTexts = boxTexts;
        if (level === 1 && boxTexts.length < 3) {
            safeBoxTexts = [
                ...boxTexts,
                ...Array(3 - boxTexts.length).fill(null).map(() => Array(6).fill(""))
            ];
        } else if (level === 2) {
            safeBoxTexts = [
                ...boxTexts,
                ...Array(2 + 2 - boxTexts.length).fill(null).map(() => Array(6).fill(""))
            ];
        } else if (level === 3) {
            safeBoxTexts = [
                ...boxTexts,
                ...Array(1 + 1 - boxTexts.length).fill(null).map(() => Array(6).fill(""))
            ];
        }
    // State must be declared before any code that uses it
    // For grid checkboxes: 6 columns x 6 rows = 36 checkboxes
    // Must have 7 rows for rows 1-7 (index 0-6)
    let numRows = safeBoxTexts.length;
    const [gridProgressChecks, setGridProgressChecks] = useState(Array(numRows).fill(null).map(() => Array(6).fill(false)));
    const [comments, setComments] = useState(Array(numRows).fill(""));
    const [signOffs, setSignOffs] = useState(Array(numRows).fill(null).map(() => ({ name: "", date: "", signed: false })));
    // Manual save progress button with success tick
    const [saveStatus, setSaveStatus] = useState('idle'); // idle | success
    const [hasLoaded, setHasLoaded] = useState(false); // Prevent auto-save before initial load

    // Robust percentage calculation: support both 2D and flat arrays
    let flatChecks = Array.isArray(gridProgressChecks[0]) ? gridProgressChecks.flat() : gridProgressChecks;
    const totalGridChecks = 42; // Always 7x6
    const completedGridChecks = flatChecks.filter(Boolean).length;
    const percentage = Math.round((completedGridChecks / totalGridChecks) * 100);

    // Grid headers
    const headers = [
        "Skills/Responsibilities", "Sub Section 1", "Sub Section 2", "Sub Section 3",
        "Training Process", "Training Material", "Reviewer sign off", "Comments"
    ];

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

    // Auto-save effect
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
    // ...existing code...

    // Load progress from backend on mount
    useEffect(() => {
        fetchProgress();
        // eslint-disable-next-line
    }, [popupId, userToken]);

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
    for (let row = 1; row <= numRows; row++) {
        tableRows.push(
            <tr key={row}>
                {/* Progress checkboxes with unique text */}
                {[0,1,2,3,4,5].map(col => {
                    const cellText = safeBoxTexts[row-1][col];
                    let content;
                    if (typeof cellText === "string" && cellText in require('./linkButtons').LINK_DEFS) {
                        content = renderLinkButton(cellText);
                    } else {
                        content = cellText;
                    }
                    return (
                        <td key={col} className="align-middle" style={{ position: 'relative', paddingRight: 0, paddingBottom: 0 }}>
                            <span style={{ display: 'block', marginBottom: 24, fontSize: 14, color: '#333' }}>{content}</span>
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
                    );
                })}
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
                                    width: '100%','border': '1px solid #ced4da',
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
                <h2>Cost Reporting Level {level}</h2>
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


// Wrapper component for LevelPopup, similar to SafetyPop
function CostPop({ popupId, closePopup, userToken, onProgressUpdate }) {
    if (!popupId) return null;
    let openLevel = null;
    if (popupId === "cost1") openLevel = 1;
    else if (popupId === "cost2") openLevel = 2;
    else if (popupId === "cost3") openLevel = 3;

    return (
        openLevel ? (
            <div className="popup-overlay cost-popup-fadein">
                <div className="popup-container cost-popup-centered">
                    <button className="close-btn" onClick={closePopup} style={{ float: 'right' }}>Close</button>
                    <LevelPopup level={openLevel} onClose={closePopup} popupId={popupId} userToken={userToken} onProgressUpdate={onProgressUpdate} />
                </div>
            </div>
        ) : null
    );
}

export default CostPop;