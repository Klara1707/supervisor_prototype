// import { useDebouncedSave } from "../hooks/useDebouncedSave";
import "./Pop.css";
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import SignOffForm from "./SignOffForm";

const LevelPopup = ({ level, onClose, popupId, userToken, onProgressUpdate }) => {
        // Texts for each popup level
        const boxTextsByLevel = {
            1: [
                ["Safety L1: Box 1", "Safety L1: Box 2", "Safety L1: Box 3", "Safety L1: Box 4", "Safety L1: Box 5", "Safety L1: Box 6"],
                ["Safety L1: Box 7", "Safety L1: Box 8", "Safety L1: Box 9", "Safety L1: Box 10", "Safety L1: Box 11", "Safety L1: Box 12"],
                ["Safety L1: Box 13", "Safety L1: Box 14", "Safety L1: Box 15", "Safety L1: Box 16", "Safety L1: Box 17", "Safety L1: Box 18"],
                ["Safety L1: Box 19", "Safety L1: Box 20", "Safety L1: Box 21", "Safety L1: Box 22", "Safety L1: Box 23", "Safety L1: Box 24"],
                ["Safety L1: Box 25", "Safety L1: Box 26", "Safety L1: Box 27", "Safety L1: Box 28", "Safety L1: Box 29", "Safety L1: Box 30"],
                ["Safety L1: Box 31", "Safety L1: Box 32", "Safety L1: Box 33", "Safety L1: Box 34", "Safety L1: Box 35", "Safety L1: Box 36"],
                ["Safety L1: Box 37", "Safety L1: Box 38", "Safety L1: Box 39", "Safety L1: Box 40", "Safety L1: Box 41", "Safety L1: Box 42"]
            ],
            2: [
                ["Safety L2: Box 1", "Safety L2: Box 2", "Safety L2: Box 3", "Safety L2: Box 4", "Safety L2: Box 5", "Safety L2: Box 6"],
                ["Safety L2: Box 7", "Safety L2: Box 8", "Safety L2: Box 9", "Safety L2: Box 10", "Safety L2: Box 11", "Safety L2: Box 12"],
                ["Safety L2: Box 13", "Safety L2: Box 14", "Safety L2: Box 15", "Safety L2: Box 16", "Safety L2: Box 17", "Safety L2: Box 18"],
                ["Safety L2: Box 19", "Safety L2: Box 20", "Safety L2: Box 21", "Safety L2: Box 22", "Safety L2: Box 23", "Safety L2: Box 24"],
                ["Safety L2: Box 25", "Safety L2: Box 26", "Safety L2: Box 27", "Safety L2: Box 28", "Safety L2: Box 29", "Safety L2: Box 30"],
                ["Safety L2: Box 31", "Safety L2: Box 32", "Safety L2: Box 33", "Safety L2: Box 34", "Safety L2: Box 35", "Safety L2: Box 36"],
                ["Safety L2: Box 37", "Safety L2: Box 38", "Safety L2: Box 39", "Safety L2: Box 40", "Safety L2: Box 41", "Safety L2: Box 42"]
            ],
            3: [
                ["Safety L3: Box 1", "Safety L3: Box 2", "Safety L3: Box 3", "Safety L3: Box 4", "Safety L3: Box 5", "Safety L3: Box 6"],
                ["Safety L3: Box 7", "Safety L3: Box 8", "Safety L3: Box 9", "Safety L3: Box 10", "Safety L3: Box 11", "Safety L3: Box 12"],
                ["Safety L3: Box 13", "Safety L3: Box 14", "Safety L3: Box 15", "Safety L3: Box 16", "Safety L3: Box 17", "Safety L3: Box 18"],
                ["Safety L3: Box 19", "Safety L3: Box 20", "Safety L3: Box 21", "Safety L3: Box 22", "Safety L3: Box 23", "Safety L3: Box 24"],
                ["Safety L3: Box 25", "Safety L3: Box 26", "Safety L3: Box 27", "Safety L3: Box 28", "Safety L3: Box 29", "Safety L3: Box 30"],
                ["Safety L3: Box 31", "Safety L3: Box 32", "Safety L3: Box 33", "Safety L3: Box 34", "Safety L3: Box 35", "Safety L3: Box 36"],
                ["Safety L3: Box 37", "Safety L3: Box 38", "Safety L3: Box 39", "Safety L3: Box 40", "Safety L3: Box 41", "Safety L3: Box 42"]
            ]
        };
        const boxTexts = boxTextsByLevel[level] || boxTextsByLevel[1];
    // Manual save progress button with success tick
    const [saveStatus, setSaveStatus] = useState('idle'); // idle | success
    const [hasLoaded, setHasLoaded] = useState(false); // Prevent auto-save before initial load
    // Extracted fetch logic for re-use
    const fetchProgress = async () => {
        if (!popupId || !userToken) return;
        try {
            const res = await fetch(`/api/training-progress/?popupId=${encodeURIComponent(popupId)}`, {
                method: "GET",
                headers: { "Authorization": `Bearer ${userToken}` }
            });
            if (res.ok) {
                const data = await res.json();
                console.log('[SafetyPop] Backend response:', data);
                let entry = null;
                if (data && data[popupId]) {
                    entry = data[popupId];
                } else if (data && data.gridProgressChecks) {
                    entry = data;
                }
                if (entry) {
                    setGridProgressChecks(entry.gridProgressChecks || Array(7).fill(null).map(() => Array(6).fill(false)));
                    setComments(entry.comments || Array(7).fill(""));
                    setSignOffs(entry.signOffs || Array(7).fill(null).map(() => ({ name: "", date: "", signed: false })));
                    setHasLoaded(true); // Mark as loaded so auto-save can start
                    console.log('[SafetyPop] State set:', {
                        gridProgressChecks: entry.gridProgressChecks,
                        comments: entry.comments,
                        signOffs: entry.signOffs
                    });
                } else {
                    console.warn(`[SafetyPop] No entry found for popupId '${popupId}' in backend response`, data);
                }
            } else if (res.status === 404) {
                alert("No saved progress found for this popup. You can start fresh.");
            } else {
                alert(`Failed to load progress: ${res.status}`);
            }
        } catch (err) {
            alert("Network error while loading progress. Please try again.");
            console.error("GET /api/training-progress/ error:", err);
        }
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
        console.log('[SafetyPop] POST payload:', payload);
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
    const [gridProgressChecks, setGridProgressChecks] = useState(Array(7).fill(null).map(() => Array(6).fill(false)));
    const [comments, setComments] = useState(Array(7).fill(""));
    const [signOffs, setSignOffs] = useState(Array(7).fill(null).map(() => ({ name: "", date: "", signed: false })));

    // Robust percentage calculation: support both 2D and flat arrays
    let flatChecks = Array.isArray(gridProgressChecks[0]) ? gridProgressChecks.flat() : gridProgressChecks;
    const totalGridChecks = 42; // Always 7x6
    const completedGridChecks = flatChecks.filter(Boolean).length;
    const percentage = Math.round((completedGridChecks / totalGridChecks) * 100);

    // Load progress from backend on mount (now with popupId query param)
    useEffect(() => {
        fetchProgress();
        // eslint-disable-next-line
    }, [popupId, userToken]);

    // Save progress to backend on every change and on unmount (close)
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
        console.log('[SafetyPop] Auto-save POST payload:', payload);
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
            console.log('[SafetyPop] Unmount POST payload:', payload);
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
                <h2>Safety Level {level}</h2>
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



function SafetyPop({ popupId, closePopup, userToken, onProgressUpdate }) {
    if (!popupId) return null;
    let openLevel = null;
    if (popupId === "safety1") openLevel = 1;
    else if (popupId === "safety2") openLevel = 2;
    else if (popupId === "safety3") openLevel = 3;

    return (
        openLevel ? (
            <div className="popup-overlay safety-popup-fadein">
                <div className="popup-container safety-popup-centered">
                    <button className="close-btn" onClick={closePopup} style={{ float: 'right' }}>Close</button>
                    <LevelPopup level={openLevel} onClose={closePopup} popupId={popupId} userToken={userToken} onProgressUpdate={onProgressUpdate} />
                </div>
            </div>
        ) : null
    );
}

export default SafetyPop;