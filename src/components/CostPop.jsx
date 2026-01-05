// import { useDebouncedSave } from "../hooks/useDebouncedSave";
import "./Pop.css";
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import SignOffForm from "./SignOffForm";


const LevelPopup = ({ level, onClose, popupId, userToken, onProgressUpdate }) => {
        // Texts for each popup level
        const boxTextsByLevel = {
            1: [
                ["Cost L1: Box 1", "Cost L1: Box 2", "Cost L1: Box 3", "Cost L1: Box 4", "Cost L1: Box 5", "Cost L1: Box 6"],
                ["Cost L1: Box 7", "Cost L1: Box 8", "Cost L1: Box 9", "Cost L1: Box 10", "Cost L1: Box 11", "Cost L1: Box 12"],
                ["Cost L1: Box 13", "Cost L1: Box 14", "Cost L1: Box 15", "Cost L1: Box 16", "Cost L1: Box 17", "Cost L1: Box 18"],
                ["Cost L1: Box 19", "Cost L1: Box 20", "Cost L1: Box 21", "Cost L1: Box 22", "Cost L1: Box 23", "Cost L1: Box 24"],
                ["Cost L1: Box 25", "Cost L1: Box 26", "Cost L1: Box 27", "Cost L1: Box 28", "Cost L1: Box 29", "Cost L1: Box 30"],
                ["Cost L1: Box 31", "Cost L1: Box 32", "Cost L1: Box 33", "Cost L1: Box 34", "Cost L1: Box 35", "Cost L1: Box 36"],
                ["Cost L1: Box 37", "Cost L1: Box 38", "Cost L1: Box 39", "Cost L1: Box 40", "Cost L1: Box 41", "Cost L1: Box 42"]
            ],
            2: [
                ["Cost L2: Box 1", "Cost L2: Box 2", "Cost L2: Box 3", "Cost L2: Box 4", "Cost L2: Box 5", "Cost L2: Box 6"],
                ["Cost L2: Box 7", "Cost L2: Box 8", "Cost L2: Box 9", "Cost L2: Box 10", "Cost L2: Box 11", "Cost L2: Box 12"],
                ["Cost L2: Box 13", "Cost L2: Box 14", "Cost L2: Box 15", "Cost L2: Box 16", "Cost L2: Box 17", "Cost L2: Box 18"],
                ["Cost L2: Box 19", "Cost L2: Box 20", "Cost L2: Box 21", "Cost L2: Box 22", "Cost L2: Box 23", "Cost L2: Box 24"],
                ["Cost L2: Box 25", "Cost L2: Box 26", "Cost L2: Box 27", "Cost L2: Box 28", "Cost L2: Box 29", "Cost L2: Box 30"],
                ["Cost L2: Box 31", "Cost L2: Box 32", "Cost L2: Box 33", "Cost L2: Box 34", "Cost L2: Box 35", "Cost L2: Box 36"],
                ["Cost L2: Box 37", "Cost L2: Box 38", "Cost L2: Box 39", "Cost L2: Box 40", "Cost L2: Box 41", "Cost L2: Box 42"]
            ],
            3: [
                ["Cost L3: Box 1", "Cost L3: Box 2", "Cost L3: Box 3", "Cost L3: Box 4", "Cost L3: Box 5", "Cost L3: Box 6"],
                ["Cost L3: Box 7", "Cost L3: Box 8", "Cost L3: Box 9", "Cost L3: Box 10", "Cost L3: Box 11", "Cost L3: Box 12"],
                ["Cost L3: Box 13", "Cost L3: Box 14", "Cost L3: Box 15", "Cost L3: Box 16", "Cost L3: Box 17", "Cost L3: Box 18"],
                ["Cost L3: Box 19", "Cost L3: Box 20", "Cost L3: Box 21", "Cost L3: Box 22", "Cost L3: Box 23", "Cost L3: Box 24"],
                ["Cost L3: Box 25", "Cost L3: Box 26", "Cost L3: Box 27", "Cost L3: Box 28", "Cost L3: Box 29", "Cost L3: Box 30"],
                ["Cost L3: Box 31", "Cost L3: Box 32", "Cost L3: Box 33", "Cost L3: Box 34", "Cost L3: Box 35", "Cost L3: Box 36"],
                ["Cost L3: Box 37", "Cost L3: Box 38", "Cost L3: Box 39", "Cost L3: Box 40", "Cost L3: Box 41", "Cost L3: Box 42"]
            ]
        };
        const boxTexts = boxTextsByLevel[level] || boxTextsByLevel[1];
    // State must be declared before any code that uses it
    // For grid checkboxes: 6 columns x 6 rows = 36 checkboxes
    // Must have 7 rows for rows 1-7 (index 0-6)
    const [gridProgressChecks, setGridProgressChecks] = useState(Array(7).fill(null).map(() => Array(6).fill(false)));
    const [comments, setComments] = useState(Array(7).fill(""));
    const [signOffs, setSignOffs] = useState(Array(7).fill(null).map(() => ({ name: "", date: "", signed: false })));
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
    for (let row = 1; row <= 7; row++) {
        tableRows.push(
            <tr key={row}>
                {/* Progress checkboxes with unique text */}
                {[0,1,2,3,4,5].map(col => (
                    <td key={col} className="align-middle" style={{ position: 'relative', paddingRight: 0, paddingBottom: 0 }}>
                        <span style={{ display: 'block', marginBottom: 24, fontSize: 14, color: '#333' }}>{boxTexts[row-1][col]}</span>
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