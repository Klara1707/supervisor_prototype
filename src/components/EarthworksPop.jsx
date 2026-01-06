// import { useDebouncedSave } from "../hooks/useDebouncedSave";
import "./Pop.css";
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import SignOffForm from "./SignOffForm";

const LevelPopup = ({ level, onClose, popupId, userToken, onProgressUpdate }) => {
            // Texts for each popup level
            const boxTextsByLevel = {
                1: [
                    ["Maintain accurate Daily Log and Pad Tracking Sheets", "Understands the importance of accurate data entry and ensures error-free reporting", "Extracts data from sheets accurately for effective reporting", "", "Mentoring from Earthworks SME on data entry, State of Play usage, how data links to State of Play, and extracting data for reporting", "Earthworks L1: Box 6"],
                    ["Understands pad and track construction guidelines, including approved designs", "Understands Earthworks guidelines for pad and track creation. Applies construction methods in the field, verifies compliance, and differentiates pad sizes", "Provides accurate guidance on pad and track construction in the field, demonstrating a strong understanding of clearance mechanisms and the implications of non-compliance with established guidelines", "", "Gained exposure through mentoring by SMEs, EW Advisors, and Supervisors on pad creation guidelines, including understanding the appropriate pad sizes for various drilling methods. Received guidance from SMEs on clearance levels for ARs and how these are tracked and managed", "Earthworks L1: Box 12"],
                    ["Demonstrates an understanding of rehabilitation operations, including the verification of completed work to ensure compliance with environmental and operational standards", "Has read the Earthworks Rehabilitation Manual and is able to apply rehabilitation methods effectively in the field. Verifies that procedures are being followed in accordance with the guidelines", "Provides accurate guidance on rehabilitation activities in the field, with a solid understanding of clearance mechanisms and the consequences of non-compliance with established guidelines", "Verifies that rehabilitation is being conducted in accordance with established guidelines, including performing 10% pad verification checks, capturing photographic evidence, and reporting findings to ensure compliance", "Education: Has read the Earthworks Rehabilitation Manual and understands how rehabilitation methods are applied in the field. Exposure: Received mentoring from Subject Matter Experts (SMEs) on rehabilitation quality standards. Conducts field checks to assess rehabilitation quality and ensures implementation aligns with established guidelines.", "Earthworks L1: Box 18"]
                ],
                2: [
                    ["Understands the ResDev Rehabilitation Standard and its application in field activities", "Reads and understands the Operations Rehabilitation Manual", "Understands rehabilitation obligations and standards, including relevant guidelines and expectations", "", "Education & Exposure – Reads the Rehabilitation Manual and understands its field application. Mentored by SME on rehab quality, conducts field checks, and applies guidelines effectively", "Earthworks L2: Box 6"],
                    ["Competent in requesting and managing HME float movements, understanding the process and stakeholder coordination involved", "Communicates with float driver/company, completes float requests accurately with pickup/drop-off maps, and assesses site suitability for safe turnaround and travel", "", "", "Exposure – Mentored by SME on completing float requests, reviewing maps, and assessing safe drop-off points", "Earthworks L2: Box 12"],
                    ["Manages pad and track construction according to approved designs and guidelines, ensuring clearing limits are adhered to within the designated work area", "Assesses pad size and clearance against standards (10% RTIO, 100% Cat 3) and reports any non-compliance with clearing rules", "Tracks clearing allocations in ARs, engages DPC to confirm clearing levels, and monitors progress until pad construction is complete", "", "Exposure: Receives mentoring from SME, EW Advisors, or Superintendent on pad creation guidelines. Ensures 10% of pads are checked in the field for size and quality. Learns how to assess clearance levels in ARs and track them using Power BI", "Earthworks L2: Box 18"],
                    ["Competent in operating the Trimble SNS machine guidance system, including uploading data to HME and using all system functionalities", "Loads files onto USBs and Gen 3 screens, troubleshoots issues, and provides guidance on system usage", "Uses user guides to perform firmware updates confidently and accurately", "", "Exposure: Receives mentoring from SME/Superintendent on loading files onto Gen 3 screens through demonstration. Firmware updates should only be performed under instruction from EW Advisors", "Earthworks L2: Box 24"],
                    ["Understands when and how to engage the Survey Team and DPC, using the correct request formats and communication channels", "Understands when and how to engage the Survey Team and DPC, using the correct request formats and communication channels", "Understands when survey work is required and what it involves — including pad set-out, pad and collar pickups, and boundary flagging", "", "Gains exposure through SME mentoring on survey work. Knows how to use the DPC online form to request survey tasks and understands the earthworks checks required before requesting — e.g., confirming pad readiness", "Earthworks L2: Box 30"]
                ],
                3: [
                    ["Understand earthwork machinery capabilities and limitations. Plan and manage tasks using SME knowledge", "Provide guidance on machine allocation and assess ground conditions to inform planning", "Instruct operators on pad and track building methods. Use machinery effectively to achieve optimal results", "", "Receive mentoring from SME/EW Advisor on machine capability, infield direction, and best practices for pad and track construction. Pass-out expected within 12 months", "Earthworks L3: Box 6"]
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
            } else if (level === 2 && boxTexts.length < 5) {
                safeBoxTexts = [
                    ...boxTexts,
                    ...Array(5 - boxTexts.length).fill(null).map(() => Array(6).fill(""))
                ];
            } else if (level === 3 && boxTexts.length < 1) {
                safeBoxTexts = [
                    ...boxTexts,
                    ...Array(1 - boxTexts.length).fill(null).map(() => Array(6).fill(""))
                ];
            }
        // Manual save progress button with success tick
        const [saveStatus, setSaveStatus] = useState('idle'); // idle | success
        const [hasLoaded, setHasLoaded] = useState(false); // Prevent auto-save before initial load
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
    // Grid headers
    const headers = [
        "Skills/Responsibilities", "Sub Section 1", "Sub Section 2", "Sub Section 3",
        "Training Process", "Training Material", "Reviewer sign off", "Comments"
    ];
    // For grid checkboxes: 6 columns x 6 rows = 36 checkboxes
    // Must have 7 rows for rows 1-7 (index 0-6)
    const [gridProgressChecks, setGridProgressChecks] = useState(
        Array(7).fill(null).map(() => Array(6).fill(false))
    );
    // Per-row comment state
    const [comments, setComments] = useState(Array(7).fill(""));
    const [signOffs, setSignOffs] = useState(
        Array(7).fill(null).map(() => ({ name: "", date: "", signed: false }))
    );
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
        numRows = 3;
    } else if (level === 2) {
        numRows = 5;
    } else if (level === 3) {
        numRows = 1;
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
                <h2>Earthworks Level {level}</h2>
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



function EarthworksPop({ popupId, closePopup, userToken, onProgressUpdate }) {
    if (!popupId) return null;
    let openLevel = null;
    if (popupId === "earthworks1") openLevel = 1;
    else if (popupId === "earthworks2") openLevel = 2;
    else if (popupId === "earthworks3") openLevel = 3;

    return (
        openLevel ? (
            <div className="popup-overlay earthworks-popup-fadein">
                <div className="popup-container earthworks-popup-centered">
                    <button className="close-btn" onClick={closePopup} style={{ float: 'right' }}>Close</button>
                    <LevelPopup level={openLevel} onClose={closePopup} popupId={popupId} userToken={userToken} onProgressUpdate={onProgressUpdate} />
                </div>
            </div>
        ) : null
    );
}

export default EarthworksPop;
