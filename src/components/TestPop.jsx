// import { useDebouncedSave } from "../hooks/useDebouncedSave";
import "./Pop.css";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import SignOffForm from "./SignOffForm";

const LevelPopup = ({ level, onClose }) => {
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
    // Per-row sign-off state
    const [signOffs, setSignOffs] = useState(
        Array(7).fill(null).map(() => ({ name: "", date: "", signed: false }))
    );
    // Calculate progress as percentage of checked boxes in gridProgressChecks
    const totalGridChecks = 7 * 6;
    const completedGridChecks = gridProgressChecks.flat().filter(Boolean).length;
    const percentage = Math.round((completedGridChecks / totalGridChecks) * 100);

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
                {/* Progress checkboxes */}
                {[0,1,2,3,4,5].map(col => (
                    <td key={col} className="text-center align-middle">
                        <input
                            type="checkbox"
                            checked={gridProgressChecks[row-1][col]}
                            onChange={() => {
                                const updated = gridProgressChecks.map(arr => arr.slice());
                                updated[row-1][col] = !updated[row-1][col];
                                setGridProgressChecks(updated);
                            }}
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
                <td className="align-middle">
                    <textarea
                        value={comments[row-1]}
                        onChange={e => {
                            const updated = comments.slice();
                            updated[row-1] = e.target.value;
                            setComments(updated);
                        }}
                        placeholder="Enter your comment"
                        className="form-control"
                        style={{ minHeight: 32 }}
                    />
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
                <h2>Test Level {level}</h2>
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

function TestPop({ popupId, closePopup, userToken }) {
    const [comment, setComment] = useState("");
    const [signOffDate, setSignOffDate] = useState("");
    const [signOffName, setSignOffName] = useState("");
    const [openLevel, setOpenLevel] = useState(null);

    if (!popupId) return null;

    return (
        <div className="popup-container">
            <h2>Test Popup Example</h2>
            {/* Level Buttons */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <button onClick={() => setOpenLevel(1)}>Test Level 1</button>
                <button onClick={() => setOpenLevel(2)}>Test Level 2</button>
                <button onClick={() => setOpenLevel(3)}>Test Level 3</button>
            </div>
            <div className="comment-section">
                <label>Comment:</label>
                <textarea
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    placeholder="Enter your comment" />
            </div>
            <div className="signoff-section">
                <label>Sign off name:</label>
                <input
                    type="text"
                    value={signOffName}
                    onChange={e => setSignOffName(e.target.value)}
                    placeholder="Your name" />
                <button onClick={() => setSignOffDate(new Date().toLocaleDateString())}>Sign Off</button>
                {signOffDate && <div>Date: {signOffDate}</div>}
            </div>
            <button className="close-btn" onClick={closePopup}>Close</button>
            {openLevel && <LevelPopup level={openLevel} onClose={() => setOpenLevel(null)} />}
        </div>
    );
}

export default TestPop;
