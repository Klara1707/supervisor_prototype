
import "./Pop.css";
import { useState } from "react";

const FieldPop = ({ popupId, closePopup }) => {
    if (!popupId) return null;

    const [comment, setComment] = useState("");
    const [signOffDate, setSignOffDate] = useState("");
    const [signOffName, setSignOffName] = useState("");
    const checkboxItems = [
        "Box 9", "Box 10", "Box 11", "Box 12", "Box 13", "Box 14",
        "Box 17", "Box 18", "Box 19", "Box 20", "Box 21", "Box 22",
        "Box 23", "Box 24", "Box 25", "Box 26", "Box 27", "Box 28",
    ];
    const [progressChecks, setProgressChecks] = useState(Array(checkboxItems.length).fill(false));

    const contentMap = {
        field1: {
            title: "field Popup 1 Content",
            cells: [
                "Skills/Responsibilities", "Sub Section 1", "Sub Section 2", "Sub Section 3",
                "Training Process", "Training Material", "Reviewer sign off", "Comments",
                "Box 9", "Box 10", "Box 11", "Box 12", "Box 13", "Box 14",
                "Sign off", "comment section",
                "Box 17", "Box 18", "Box 19", "Box 20", "Box 21", "Box 22",
                "Sign off", "comment section",
                "Box 23", "Box 24", "Box 25", "Box 26", "Box 27", "Box 28",
                "Sign off", "comment section"
            ]
        },
        field2: {
            title: "field Popup 2 Content",
            cells: [
                "Skills/Responsibilities", "Sub Section 1", "Sub Section 2", "Sub Section 3",
                "Training Process", "Training Material", "Reviewer sign off", "Comments",
                "Box 9", "Box 10", "Box 11", "Box 12", "Box 13", "Box 14",
                "Sign off", "comment section",
                "Box 17", "Box 18", "Box 19", "Box 20", "Box 21", "Box 22",
                "Sign off", "comment section",
                "Box 23", "Box 24", "Box 25", "Box 26", "Box 27", "Box 28",
                "Sign off", "comment section"
            ]
        },
        field3: {
            title: "field Popup 3 Content",
            cells: [
                "Skills/Responsibilities", "Sub Section 1", "Sub Section 2", "Sub Section 3",
                "Training Process", "Training Material", "Reviewer sign off", "Comments",
                "Box 9", "Box 10", "Box 11", "Box 12", "Box 13", "Box 14",
                "Sign off", "comment section",
                "Box 17", "Box 18", "Box 19", "Box 20", "Box 21", "Box 22",
                "Sign off", "comment section",
                "Box 23", "Box 24", "Box 25", "Box 26", "Box 27", "Box 28",
                "Sign off", "comment section"
            ]
        }
    };

    const { title, cells } = contentMap[popupId];

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <button className="close-button" onClick={closePopup} aria-label="Close popup">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="12" fill="#ff4d4d" />
                        <line x1="8" y1="8" x2="16" y2="16" stroke="white" strokeWidth="2" />
                        <line x1="16" y1="8" x2="8" y2="16" stroke="white" strokeWidth="2" />
                    </svg>
                </button>

                <h2>{title}</h2>

                {/* Progress Bar */}
                <div className="progress-bar-container">
                    <div
                        className="progress-bar"
                        style={{
                            width: `${(progressChecks.filter(Boolean).length / checkboxItems.length) * 100}%`
                        }}
                    >
                        <span className="progress-text">
                            {Math.round((progressChecks.filter(Boolean).length / checkboxItems.length) * 100)}%
                        </span>
                    </div>
                </div>

                {/* Grid Container */}
                <div className="grid-container">
                    {cells.map((cellContent, index) => (
                        <div key={index} className="grid-item">
                            {checkboxItems.includes(cellContent) ? (
                                <label className="custom-checkbox">
                                    {cellContent}
                                    <input
                                        type="checkbox"
                                        checked={progressChecks[checkboxItems.indexOf(cellContent)]}
                                        onChange={() => {
                                            const updatedChecks = [...progressChecks];
                                            updatedChecks[checkboxItems.indexOf(cellContent)] =
                                                !updatedChecks[checkboxItems.indexOf(cellContent)];
                                            setProgressChecks(updatedChecks);
                                        }}
                                    />
                                    <span className="checkmark"></span>
                                </label>
                            ) : cellContent === "comment section" ? (
                                <>
                                    <label htmlFor={`comment-${index}`}>Comment:</label>
                                    <textarea
                                        id={`comment-${index}`}
                                        placeholder="Enter your comment..."
                                        className="comment-box"
                                        rows={3}
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                    />
                                </>
                            ) : cellContent === "Sign off" ? (
                                <>
                                    <label htmlFor={`signoff-date-${index}`}>Sign-off Date:</label>
                                    <input
                                        type="date"
                                        id={`signoff-date-${index}`}
                                        className="signoff-date"
                                        value={signOffDate}
                                        onChange={(e) => setSignOffDate(e.target.value)}
                                    />
                                    <label htmlFor={`signoff-name-${index}`}></label>
                                    <input
                                        type="text"
                                        id={`signoff-name-${index}`}
                                        className="signoff-name"
                                        placeholder="Enter your name"
                                        value={signOffName}
                                        onChange={(e) => setSignOffName(e.target.value)}
                                    />
                                </>
                            ) : (
                                cellContent
                                
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FieldPop;