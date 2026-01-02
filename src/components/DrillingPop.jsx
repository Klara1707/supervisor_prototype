// import { useDebouncedSave } from "../hooks/useDebouncedSave";
import "./Pop.css";
import { useState, useEffect, useCallback } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import SignOffForm from "./SignOffForm";

const LevelPopup = ({ level, onClose, popupId, userToken, onProgressUpdate }) => {
    const [loading, setLoading] = useState(true);
    const [hasLoaded, setHasLoaded] = useState(false); // Prevent auto-save before initial load
    // Manual save progress button with success tick
    const [saveStatus, setSaveStatus] = useState('idle'); // idle | success | error
    const [saveError, setSaveError] = useState("");
    // Robust token retrieval: prefer prop, fallback to storage
    const getToken = useCallback(() => {
        if (userToken) return userToken;
        const local = window.localStorage.getItem('token');
        const session = window.sessionStorage.getItem('token');
        return local || session || null;
    }, [userToken]);
    // Extracted fetch logic for re-use
    const fetchProgress = useCallback(async () => {
        const token = getToken();
        setLoading(true);
        if (!popupId || !token) {
            setLoading(false);
            return;
        }
        try {
            const res = await fetch(`/api/training-progress/?popupId=${encodeURIComponent(popupId)}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
            if (!res.ok) {
                setLoading(false);
                // Debug: log error response
                const errorText = await res.text();
                console.warn(`[DrillingPop] GET failed:`, res.status, errorText);
                return;
            }
            const data = await res.json();
            console.log('[DrillingPop] Backend response:', data); // <-- Debug log
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
                // Debug: log restored state
                console.log('[DrillingPop] State set:', {
                    gridProgressChecks: entry.gridProgressChecks,
                    comments: entry.comments,
                    signOffs: entry.signOffs
                });
            } else {
                console.warn(`[DrillingPop] No entry found for popupId '${popupId}' in backend response`, data);
            }
        } catch (err) {
            // Optionally handle error
            console.error('[DrillingPop] Network or parsing error:', err);
        }
        setLoading(false);
    }, [popupId, getToken]);

    const handleManualSave = async () => {
        const token = getToken();
        if (!popupId || !token) {
            setSaveError("Missing popupId or authentication token. Please log in again.");
            setSaveStatus('error');
            console.warn("[DrillingPop] Save aborted: missing popupId or token", { popupId, token });
            return;
        }
        const payload = {
            popupId,
            gridProgressChecks,
            comments,
            signOffs,
            progressPercentage: percentage
        };
        try {
            const res = await fetch("/api/training-progress/", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });
            if (!res.ok) {
                let msg = "Save failed";
                try {
                    const err = await res.json();
                    msg = err.detail || JSON.stringify(err);
                } catch {}
                setSaveError(msg);
                setSaveStatus('error');
                console.error("[DrillingPop] Save failed:", msg);
            } else {
                setSaveStatus('success');
                setSaveError("");
                if (onProgressUpdate) await onProgressUpdate();
                // Re-fetch latest progress after save
                await fetchProgress();
            }
        } catch (e) {
            setSaveStatus('error');
            setSaveError(e.message || "Save failed");
            console.error("[DrillingPop] Save error:", e);
        }
        setTimeout(() => {
            setSaveStatus('idle');
            setSaveError("");
        }, 3000);
    };
    // ...no manual save button, match EarthworksPop...
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
    }, [popupId, userToken, fetchProgress]);

    // Auto-save progress to backend on every change and on unmount (close)
    useEffect(() => {
        if (!hasLoaded) return; // Don't auto-save until data is loaded
        const token = getToken();
        if (!popupId || !token) {
            console.warn("[DrillingPop] Auto-save aborted: missing popupId or token", { popupId, token });
            return;
        }
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
                "Authorization": `Bearer ${token}`,
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
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });
            if (onProgressUpdate) onProgressUpdate();
        };
        // eslint-disable-next-line
    }, [gridProgressChecks, comments, signOffs, percentage, popupId, userToken, hasLoaded]);

    // Build table rows for Bootstrap table
    let tableRows = null;
    if (!loading) {
        tableRows = [];
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
                    {/* Progress checkboxes */}
                    {[0,1,2,3,4,5].map(col => (
                        <td key={col} className="align-middle" style={{ position: 'relative', paddingRight: 0, paddingBottom: 0 }}>
                            <input
                                type="checkbox"
                                checked={gridProgressChecks[row-1][col]}
                                onChange={() => {
                                    const updated = gridProgressChecks.map(arr => arr.slice());
                                    updated[row-1][col] = !updated[row-1][col];
                                    console.log('[DrillingPop] Checkbox changed:', { row: row-1, col, updated, flat: updated.flat() });
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
    }

    // Helper component for per-row sign-off form
    // Move outside the loop
    // ...existing code...

    return (
        <div className="popup-overlay">
            <div className="popup-content level-popup" style={{ maxWidth: 900 }}>
                <h2>Drilling Level {level}</h2>
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '40px 0', fontSize: 20 }}>
                        Loading...
                    </div>
                ) : (
                    <>
                        <button
                            className="save-progress-btn"
                            onClick={handleManualSave}
                        >
                            {saveStatus === 'success' && (
                                <span style={{ fontSize: 20, color: 'white' }}>✔️</span>
                            )}
                            {saveStatus === 'error' && (
                                <span style={{ fontSize: 20, color: 'red' }}>❌</span>
                            )}
                            Save Progress
                        </button>
                        {saveError && (
                            <div style={{ color: 'red', marginBottom: 8, fontWeight: 500 }}>
                                {saveError}
                            </div>
                        )}
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
                    </>
                )}
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



function DrillingPop({ popupId, closePopup, userToken, onProgressUpdate }) {
    if (!popupId) return null;
    let openLevel = null;
    if (popupId === "drilling1") openLevel = 1;
    else if (popupId === "drilling2") openLevel = 2;
    else if (popupId === "drilling3") openLevel = 3;

    return (
        openLevel ? (
            <div className="popup-overlay drilling-popup-fadein">
                <div className="popup-container drilling-popup-centered">
                    <button className="close-btn" onClick={closePopup} style={{ float: 'right' }}>Close</button>
                    <LevelPopup
                        level={openLevel}
                        onClose={closePopup}
                        popupId={popupId}
                        userToken={userToken}
                        onProgressUpdate={onProgressUpdate}
                    />
                </div>
            </div>
        ) : null
    );
}

export default DrillingPop;