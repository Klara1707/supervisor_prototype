// import { useDebouncedSave } from "../hooks/useDebouncedSave";
import "./Pop.css";
import { useState, useEffect, useCallback } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import SignOffForm from "./SignOffForm";

const LevelPopup = ({ level, onClose, popupId, userToken, onProgressUpdate }) => {
            // Texts for each popup level
            const boxTextsByLevel = {
                1: [
                    ["Proficient in using RTIO Leadership Coaching (PowerApps) to record all LIF interactions", 
                        "Skilled in completing LIF interaction forms with detailed input, including clear descriptions of WWW (What Went Well) and EBI (Even Better If), along with thoughtful reflection", 
                        "", 
                        "", 
                        "Tips: The RTIO Leadership Coaching App contains excellent resources to support QSI, coaching, and more. Exposure: SME: Demonstrates where to access PowerApps. Superintendent: Provides mentoring on how to complete forms, including the level of detail required.", 
                        "PowerApps"],
                    ["Facilitates effective PSI meetings, ensuring clear communication, engagement, and follow-up on safety and operational actions",
                        "Can facilitate a PSI by following the PSI board cadence and effectively leading discussions on daily hazards and controls", 
                        "Can facilitate a PSI by following the PSI board cadence and effectively leading discussions on daily hazards and controls", 
                        "", 
                        "Education: Watch how-to videos and learn what makes a strong PSI", 
                        "PSI"],
                    ["Leads effective meetings and communications across all LiF activities", 
                        "Understands each activity’s purpose, the LIF playback intent, and communicates their LIF involvement clearly in meetings", 
                        "Provides effective, positive coaching and feedback during interactions, and confirms controls are in place", 
                        "Can give coaching and feedback in the interaction effectively and positively. Uses - QSI methods and techniques effectively", 
                        "Education: Watch how-to videos. Understand effective LIF interactions. Complete QSI training. Exposure: SME/Super/Supt: Provide ongoing coaching on LIF and playback. Verify task controls during LIF activities.", 
                        "LIF"],
                    ["Competent in accessing and updating Check-Ins through the relevant platform. Able to view and edit personal P6 Objectives to reflect current goals and development focus", 
                        "Competent in accessing and updating Check-Ins through the relevant platform. Able to view and edit personal P6 Objectives to reflect current goals and development focus", 
                        "Demonstrates the ability to accurately enter objectives and understands the various types and their intended outcomes. Proactively follows up on assigned actions and ensures they are fully completed and closed out", 
                        "", 
                        "Provides mentorship to SMEs and Supervisors on effective objective setting, emphasizing the use of SMART and measurable objectives. Guides others in developing achievable actions and supports them in aligning objectives with desired outcomes", 
                        "P6"],
                    ["Demonstrates competence in accessing, creating, and editing their Development Plan using the designated platform",
                        "Effectively navigates the designated platform to access, create, and update their Development Plan with confidence and accuracy", 
                        "Takes ownership of personal development by actively driving progress, following up on assigned actions, reporting updates during check-ins, and ensuring objectives are completed ahead of their due dates", 
                        "", 
                        "Provides guidance and mentorship to SMEs and Supervisors on effective objective setting, with a focus on developing SMART and measurable objectives. Supports others in creating realistic, achievable actions that align with performance and development goals", 
                        "Workday"]
                ],
                2: [
                    ["Builds effective relationships with site stakeholders and actively participates in key meetings (e.g., PMO, MTS, SusCap)", 
                        "Takes ownership of in-pit programs by building key contacts, presenting drilling designs, negotiating pit windows with MTS and Production, and aligning with the 2-week plan", 
                        "Can assess the D+B plod, negotiate access with MTS and D+B Supervisor, and review the monthly production plan to forecast pit windows", 
                        "", 
                        "Tip & Exposure – Request access to MTS 2-week planning meetings and distribution lists. Follow up all MTS discussions with emails to support execution and track agreements. Identify key MTS engineers and their preferred communication style, and commit to regular engagement. Attend meetings prepared, review pre-reads, and align your work with PMO activities. Use the 2-week plan to spot opportunities between production milestones", 
                        ""],
                    ["Identifies and supports department recognition initiatives, such as Rockstar", 
                        "Identifies potential Rockstar nominees using the Rockstar website, provides detailed justification to the approver, and supports recognition with evidence of achievements", 
                        "", 
                        "", 
                        "Reads and understands the Recognition Guidelines and Tips to support effective nominations", 
                        "Rockstars"]
                ],
                3: [
                    ["Provides LIF coaching to Contract Partner Supervisors to support quality safety interactions", 
                        "Schedules LIF coaching in meetings, delivers coaching aligned with QSI and LIF training guidelines, and encourages Contract Partners to use LIF prompts when recounting daily activities", 
                        "Follows up on coaching EBI and actions, maintaining vigilance over the quality of LIF interactions", 
                        "", 
                        "Uses the Go Look See function to pre-arrange coaching with peers. Observes multiple interactions and engages in open discussions to understand intent, observations, and communication style. Once confident, seeks permission to provide feedback and uses open questions to encourage honest reflection. Shares observations to support improvement or celebrate success", 
                        "SCM"],
                    ["Facilitates effective LiF meetings, ensuring clear communication, issue tracking, and action follow-up", 
                        "Full understanding of all DDM/LiF meeting sections. Actively covers each area, drives discussion, takes actions, and follows up on progress", 
                        "", 
                        "", 
                        "Exposure: Facilitate a LiF meeting with your Superintendent. Request feedback to support development", 
                        "LIF"],
                    ["Coach and support other Supervisors within your SME area", 
                        "Earthworks: Mentor other Supervisors on operating conditions and methods. Field Supervisor: Share SME experience and mentor others in high-risk work. Hydro: Mentor others in CMS processes. RC/Diamond: Mentor others in CMS processes", 
                        "", 
                        "", 
                        "Offer to buddy a new starter Supervisor. Share a process you're confident with during a 2:1 or Sunday Funday meeting. Demonstrate expertise by providing direct, supportive leadership to a peer. Identify a missing How-To video and create it for team sharing.", 
                        ""],
                    ["Participate in developing productivity improvements through observation, feedback, and process enhancement", 
                        "Identify improvement opportunities within your work scope and systems used", 
                        "Assess data to identify improvement opportunities and implement actions to drive results", 
                        "", 
                        "", 
                        "OperationsEfficiency"]
                ]
            };

    // --- Dynamic row counts per level ---
    let numRows = 7;
    if (level === 1) numRows = 5;
    else if (level === 2) numRows = 2;
    else if (level === 3) numRows = 4;

    // Defensive: pad boxTexts for rendering
    const boxTexts = boxTextsByLevel[level] || boxTextsByLevel[1];
    let safeBoxTexts = boxTexts;
    if (level === 1 && boxTexts.length < 5) {
        safeBoxTexts = [
            ...boxTexts,
            ...Array(5 - boxTexts.length).fill(null).map(() => Array(6).fill(""))
        ];
    } else if (level === 2 && boxTexts.length < 2) {
        safeBoxTexts = [
            ...boxTexts,
            ...Array(2 - boxTexts.length).fill(null).map(() => Array(6).fill(""))
        ];
    } else if (level === 3 && boxTexts.length < 4) {
        safeBoxTexts = [
            ...boxTexts,
            ...Array(4 - boxTexts.length).fill(null).map(() => Array(6).fill(""))
        ];
    }

    // --- State ---
    const [gridProgressChecks, setGridProgressChecks] = useState(Array(numRows).fill(null).map(() => Array(6).fill(false)));
    const [comments, setComments] = useState(Array(numRows).fill(""));
    const [signOffs, setSignOffs] = useState(Array(numRows).fill(null).map(() => ({ name: "", date: "", signed: false })));
    const [hasLoaded, setHasLoaded] = useState(false);

                        // --- Fetch logic ---
                        const fetchProgress = useCallback(async () => {
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
                                    const entry = data && (data[popupId] || data);
                                    if (entry) {
                                        setGridProgressChecks(entry.gridProgressChecks || Array(numRows).fill(null).map(() => Array(6).fill(false)));
                                        setComments(entry.comments || Array(numRows).fill(""));
                                        setSignOffs(entry.signOffs || Array(numRows).fill(null).map(() => ({ name: "", date: "", signed: false })));
                                        setHasLoaded(true);
                                    }
                                }
                            } catch (err) {}
                        }, [popupId, userToken, numRows]);

                        useEffect(() => {
                            fetchProgress();
                            // eslint-disable-next-line
                        }, [popupId, userToken, fetchProgress]);

                        // --- Save logic ---
                        let flatChecks = Array.isArray(gridProgressChecks[0]) ? gridProgressChecks.flat() : gridProgressChecks;
                        const totalGridChecks = numRows * 6;
                        const completedGridChecks = flatChecks.filter(Boolean).length;
                        const percentage = Math.round((completedGridChecks / totalGridChecks) * 100);

                        useEffect(() => {
                            if (!hasLoaded) return;
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

                        // --- Table rendering ---
                        const headers = [
                            "Skills/Responsibilities", "Sub Section 1", "Sub Section 2", "Sub Section 3",
                            "Training Process", "Training Material", "Reviewer sign off", "Comments"
                        ];
                        const tableRows = [];
                        tableRows.push(
                            <tr key="header">
                                {headers.map((header, idx) => (
                                    <th key={idx} className="text-center align-middle bg-light">{header}</th>
                                ))}
                            </tr>
                        );
                        for (let row = 1; row <= numRows; row++) {
                            tableRows.push(
                                <tr key={row}>
                                    {/* Progress checkboxes with unique text */}
                                    {[0,1,2,3,4,5].map(col => {
                                        const cellText = safeBoxTexts[row-1][col];
                                        let content;
                                        if (typeof cellText === "string" && cellText.includes(",")) {
                                            // Multiple keys, render all as buttons
                                            content = cellText.split(",").map(key => require("./linkButtons").renderLinkButton(key.trim()));
                                        } else if (typeof cellText === "string" && cellText in require("./linkButtons").LINK_DEFS) {
                                            content = require("./linkButtons").renderLinkButton(cellText);
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
                                                        width: '180px',
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

                        return (
                            <div className="popup-overlay">
                                <div className="popup-content level-popup" style={{ maxWidth: 900 }}>
                                    <h2>Leadership Level {level}</h2>
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
                    } // End of LevelPopup


function LeadershipPop({ popupId, closePopup, userToken, onProgressUpdate }) {
    if (!popupId) return null;
    let openLevel = null;
    if (popupId === "leadership1") openLevel = 1;
    else if (popupId === "leadership2") openLevel = 2;
    else if (popupId === "leadership3") openLevel = 3;

    return (
        openLevel ? (
            <div className="popup-overlay leadership-popup-fadein">
                <div className="popup-container leadership-popup-centered">
                    <button className="close-btn" onClick={closePopup} style={{ float: 'right' }}>Close</button>
                    <LevelPopup level={openLevel} onClose={closePopup} popupId={popupId} userToken={userToken} onProgressUpdate={onProgressUpdate} />
                </div>
            </div>
        ) : null
    );
}

export default LeadershipPop;