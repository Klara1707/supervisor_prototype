import { useDebouncedSave } from "../hooks/useDebouncedSave";
import "./Pop.css";
import { useState } from "react";

const LevelPopup = ({ level, onClose }) => {
    const checkboxItems = [
        `Level ${level} Box 1`, `Level ${level} Box 2`, `Level ${level} Box 3`, `Level ${level} Box 4`
    ];
    const [progressChecks, setProgressChecks] = useState(Array(checkboxItems.length).fill(false));
    const [comment, setComment] = useState("");
    const [signOffDate, setSignOffDate] = useState("");
    const [signOffName, setSignOffName] = useState("");
    const completedCount = progressChecks.filter(Boolean).length;
    const percentage = Math.round((completedCount / checkboxItems.length) * 100);
    const handleCheckboxChange = (idx) => {
        const updated = [...progressChecks];
        updated[idx] = !updated[idx];
        setProgressChecks(updated);
    };
    const handleSignOff = () => {
        setSignOffDate(new Date().toLocaleDateString());
    };
    // Grid headers
    const headers = [
        "Skills/Responsibilities", "Sub Section 1", "Sub Section 2", "Sub Section 3",
        "Training Process", "Training Material", "Reviewer sign off", "Comments"
    ];
    // 8x8 grid: 8 headers, 7 more rows (empty for now)
    const grid = Array(8).fill(null).map((_, rowIdx) =>
        Array(8).fill("")
    );
    // Fill first row with headers
    grid[0] = headers;
    // Apply row 2 layout to rows 2-7 (rowIdx 1-6):
    for (let row = 1; row <= 7; row++) {
        // Boxes 9-14: col 0-5 empty, and specifically clear boxes 17, 18, 19 (row 2, col 0-2)
        for (let col = 0; col <= 5; col++) {
            // Remove all content from box 17, 18, 19 (row 2, col 0-2)
            if (row === 2 && col >= 0 && col <= 2) {
                grid[row][col] = null;
            } else {
                grid[row][col] = null;
            }
        }
        // Box 15: col 6 sign off for row 2-8 (rowIdx 1-7, col 6)
        if (row >= 1 && row <= 7) {
            grid[row][6] = (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                    {signOffDate && signOffName ? (
                        <>
                            <div><strong>Name:</strong> {signOffName}</div>
                            <div><strong>Date:</strong> {signOffDate}</div>
                        </>
                    ) : (
                        <>
                            <input
                                type="date"
                                value={signOffDate}
                                onChange={e => setSignOffDate(e.target.value)}
                                style={{ width: '100%' }}
                            />
                            <textarea
                                value={signOffName}
                                onChange={e => setSignOffName(e.target.value)}
                                placeholder="Name assessor"
                                style={{ width: '100%', minHeight: 32 }}
                            />
                            <button onClick={() => {
                                if (signOffName && signOffDate) {
                                    setSignOffName(signOffName);
                                    setSignOffDate(signOffDate);
                                }
                            }}>Sign Off</button>
                        </>
                    )}
                </div>
            );
        }
        // Box 16: col 7 (box 8) gets a comment box for rows 2-8 (rowIdx 1-7)
        if (row >= 1 && row <= 7) {
            grid[row][7] = (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                    <textarea
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                        placeholder="Enter your comment"
                        style={{ width: '100%', minHeight: 32 }}
                    />
                </div>
            );
        } else {
            grid[row][7] = null;
        }
    }
    // Only fill grid cells with comment box if you want them to have a comment box. For now, do not add comment boxes to unset cells.
    
    return (
        <div className="popup-overlay">
            <div className="popup-content" style={{ maxWidth: 900 }}>
                <h2>Test Level {level}</h2>
                <div className="progress-bar-container">
                    <div className="progress-bar" style={{ width: `${percentage}%` }}>
                        <span className="progress-text">{percentage}%</span>
                    </div>
                </div>
                <div style={{ overflowX: 'auto', marginBottom: 20 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 4 }}>
                        {grid.flatMap((row, rowIdx) =>
                            row.map((cell, colIdx) => (
                                <div key={rowIdx + '-' + colIdx} style={{
                                    border: '1px solid #ccc',
                                    padding: 8,
                                    background: rowIdx === 0 ? '#f0f0f0' : '#fff',
                                    fontWeight: rowIdx === 0 ? 'bold' : 'normal',
                                    minHeight: 32,
                                    textAlign: 'center'
                                }}>{cell}</div>
                            ))
                        )}
                    </div>
                </div>
                <div className="comment-section">
                    <label>Comment:</label>
                    <textarea
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                        placeholder="Enter your comment"
                    />
                </div>
                <div className="signoff-section">
                    <label>Sign off name:</label>
                    <input
                        type="text"
                        value={signOffName}
                        onChange={e => setSignOffName(e.target.value)}
                        placeholder="Your name"
                    />
                    <button onClick={handleSignOff}>Sign Off</button>
                    {signOffDate && <div>Date: {signOffDate}</div>}
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
    const checkboxItems = [
        "Test Box 1", "Test Box 2", "Test Box 3", "Test Box 4"
    ];
    const [progressChecks, setProgressChecks] = useState(Array(checkboxItems.length).fill(false));
    useDebouncedSave(popupId, progressChecks, userToken);
    const [comment, setComment] = useState("");
    const [signOffDate, setSignOffDate] = useState("");
    const [signOffName, setSignOffName] = useState("");
    const [openLevel, setOpenLevel] = useState(null);

    if (!popupId) return null;

    const handleCheckboxChange = (idx) => {
        const updated = [...progressChecks];
        updated[idx] = !updated[idx];
        setProgressChecks(updated);
    };

    const handleSignOff = () => {
        setSignOffDate(new Date().toLocaleDateString());
    };

    const completedCount = progressChecks.filter(Boolean).length;
    const percentage = Math.round((completedCount / checkboxItems.length) * 100);

    return (
        <div className="popup-container">
            <h2>Test Popup Example</h2>
            {/* Level Buttons */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <button onClick={() => setOpenLevel(1)}>Test Level 1</button>
                <button onClick={() => setOpenLevel(2)}>Test Level 2</button>
                <button onClick={() => setOpenLevel(3)}>Test Level 3</button>
            </div>
            {/* Progress Bar */}
            <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: `${percentage}%` }}>
                    <span className="progress-text">{percentage}%</span>
                </div>
            </div>
            <div className="checkbox-list">
                {checkboxItems.map((label, idx) => (
                    <label key={label} className="custom-checkbox">
                        <input
                            type="checkbox"
                            checked={progressChecks[idx]}
                            onChange={() => handleCheckboxChange(idx)} />
                        <span className="checkmark"></span>
                        {label}
                    </label>
                ))}
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
                <button onClick={handleSignOff}>Sign Off</button>
                {signOffDate && <div>Date: {signOffDate}</div>}
            </div>
            <button className="close-btn" onClick={closePopup}>Close</button>
            {openLevel && <LevelPopup level={openLevel} onClose={() => setOpenLevel(null)} />}
        </div>
    );
}

export default TestPop;
