// import { useDebouncedSave } from "../hooks/useDebouncedSave";
import "./Pop.css";
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import SignOffForm from "./SignOffForm";
import { renderLinkButton } from "./linkButtons";

const LevelPopup = ({ level, onClose, popupId, userToken, onProgressUpdate }) => {
        // Texts for each popup level
        const boxTextsByLevel = {
            1: [
                ["Consistently demonstrated proficiency in using the SafeDay App to accurately and efficiently complete all required applications, forms, and tools", 
                    "Able to efficiently locate and complete all commonly used operational forms—including Take 5, JMP, JHA, Shift Handover, DWI, and Prestarts—with accuracy and attention to detail", 
                    "Provides guidance to contractors on using SafeDay effectively", 
                    "", 
                    "Download to your mobile device using the provided link. Exposure: Familiarise yourself with how to create an active task, action items through your inbox, and review your team via the dashboard. Exposure: familarise yourself how to create an active task, action through your inbox and review your team on the dashboard.", 
                    "Safeday"],
                ["Understands the purpose and origin of Critical Risk Management, including key concepts and trending data, and performs high-quality verifications to ensure compliance and effectiveness", 
                    "Understands task timelines, can assess credible fatality risks, and demonstrates general proficiency in using the app", 
                    "Capable of verifying controls for effectiveness and providing constructive feedback during Critical Control Field Verifications (CCFV)", 
                    "Knows the appropriate actions to take when a red is identified—capturing photos, recording the issue, resolving it in the field where possible, assigning actions, setting timelines, and ensuring close-out", 
                    "The RTIO Critical Risk Management Hub provides comprehensive resources explaining the 'why' and 'how' behind critical risk processes", 
                    "CRM"],
                ["Understands the purpose of Hazard & Risk Assessment—including risk levels, key concepts, and timelines—and performs thorough, high-quality assessments", 
                    "Understands that all activities involving risk must be assessed through a Pre-Task Hazard Assessment (PTHA), with appropriate controls implemented to manage the risk", 
                    "Able to provide guidance to contractors and others on improving the quality of risk assessments", 
                    "", 
                    "The RTIO Pre-Task Hazard Assessment Hub provides comprehensive guidance on the 'why' and 'how' of effective risk assessment and control", 
                    "PTHA"],
                ["Able to analyse safety banners and effectively share key information during safety discussions, meetings, and field interactions",
                    "Able to analyse safety banners and clearly communicate key messages during safety discussions, meetings, and field interactions", 
                    "", 
                    "", 
                    "Exposure Tip: Before another leader presents a safety banner, take time to read it yourself. Consider how you would summarise the content without losing key messages, and identify the most important points to share. Resources: Access all banner templates via the provided link.", 
                    "HSEC"],
                ["Maintains project action tracking to ensure timely completion of safety gaps and improvements identified through SMMs, LIF interactions, and PSIs", 
                    "Gathers actions from PSI, DWI, and LIF interactions, and accurately captures them in the DDM for effective tracking and follow-up", 
                    "Follows up on open actions to ensure close-out before the due date, and provides reasoning for any extensions on overdue items", 
                    "", 
                    "Exposure Tip: Closely follow the action tracking process during your team meetings. Once you're confident in your understanding, volunteer to be the scribe or action taker to help capture and manage meeting outcomes", 
                    ""],
                ["Understands the initial response to an incident - securing the scene, reporting to chain of command, confidentiality in distributing information", 
                    "Understands their responsibility in securing the scene of an incident and is familiar with the initial reporting process", 
                    "Able to enter initial incident reports in Enablon and distribute a Leader Report to relevant stakeholders", 
                    "Able to enter actions into Enablon accurately for tracking and follow-up", 
                    "Exposure Tip: Shadow a peer to understand scene requirements and how to communicate initial expectations for information collection. Once confident, practice entering incident details into Enablon", 
                    "IncidentInvestigationProcedure"],
                ["Qualified and skilled in issuing and managing Hot Works permits", 
                    "Raises, signs, and verifies Hot Works permits with control measures in place", 
                    "Can conduct LIF activities to verify controls, including PTHA and CCFV", 
                    "", 
                    "Qualification: RTIO Certified – Hot Work Permit Issuer. Exposure: Shadowed SMEs/peers, conducted LIF activities, and actively engaged with controls (PTHA, CCFV) during tasks.", 
                    ""],
                ["Understands the functionality and purpose of IVMS and DSS systems, including their role in promoting safety, compliance, and operational efficiency", 
                    "Understands how the system operates, can identify what constitutes a breach, and is aware of the potential consequences associated with non-compliance", 
                    "", 
                    "", 
                    "Tip: Speak with your Leader to confirm whether your role requires access to the MiX Telematics and DSSi Portal", 
                    ""],
                ["Understands the functionality and purpose of IVMS and DSS systems, including their role in promoting safety, compliance, and operational efficiency", 
                    "Understands how the system operates, can identify what constitutes a breach, and is aware of the potential consequences associated with non-compliance", 
                    "", 
                    "", 
                    "Tip: Speak with your Leader to confirm whether your role requires access to the MiX Telematics and DSSi Portal", 
                    "IVMS, DSS"],
                // Added row for Level 1
                ["WHS Qualified", 
                    "“Eligible” ", 
                    "Understands the role of the Satutory Supervisor as per the Mines Regulations (S26)", 
                    "Completes quality DWI/Handovers as per requirement", 
                    "", 
                    ""]
            ],
            2: [
                ["Identify and discuss SMART Safety Focus areas applicable to our project activities — including PSI actions, hazard hunts, and safety spotlights. Focus on specific, measurable, achievable, relevant, and time-bound initiatives that drive continuous improvement and engagement", 
                    "Track assigned actions to ensure accountability and progress. Engage SMEs for technical input or support where needed. Report field interaction findings to highlight observations and improvements. Close out actions once verified and completed, ensuring proper documentation", 
                    "", 
                    "", 
                    "", 
                    "SettingGoals"],
                ["Competent in entering and maintaining incident (AND HAZARDS) records in Enablon, ensuring accuracy, completeness, and timely updates in line with reporting requirements", 
                    "Proficient in assigning incident ratings, initiating investigations, creating actions, and classifying supporting evidence within Enablon, ensuring compliance and traceability throughout the incident management process", 
                    "Capable of managing incidents end-to-end in Enablon, from initial entry through investigation, action tracking, evidence classification, and final close-out, ensuring compliance and data integrity throughout the process", 
                    "", 
                    "Self-Training: Access provided links for guided learning and familiarisation. On-the-Job Exposure: Shadow an SME during live incident entry to observe best practices. Pro Tip: Superintendents often schedule dedicated times to progress incidents in their hub — request to observe during these sessions for practical insights.", 
                    "Enablon"],
                ["Trained and competent in raising and managing Working at Heights permits, ensuring compliance with safety protocols and accurate documentation throughout the permit lifecycle", 
                    "Successfully completed Working at Heights training and Permit Issuer certification, demonstrating capability to safely raise, manage, and close permits in compliance with site requirements", 
                    "Qualified to issue permits, verify all required controls, and approve permits, ensuring all safety measures are in place and documented in accordance with site procedures",
                    "Capable of conducting in-field verifications (CCFV) for fall-from-height risks, ensuring all critical controls are present, effective, and properly documented", 
                    "Exposure: Shadow an SME or experienced peer during CCFV tasks. Participate in LIF (Life-Intervening Factors) activities and stay curious during task execution to deepen understanding. Tip: During verifications, ensure thorough checks of: Work area housekeeping. Harnesses, lanyards, and clips. Static lines and poles. Personnel recovery plans", 
                    "WorkingAtHeight"],
                ["Trained and competent in raising and managing Excavation Permits, ensuring all safety requirements, controls, and documentation are in place throughout the permit lifecycle", 
                    "Completed Excavation Permit training and understands the process to initiate permits, including where to access the system and how to follow site-specific requirements", 
                    "Proficient in raising, maintaining, executing, transferring, and closing out Excavation Permits, ensuring all safety controls, documentation, and procedural requirements are met throughout the permit lifecycle", 
                    "", 
                    "Shadow an SME or experienced peer to learn the full permit process, including risk identification and control verification. Focus on service identification within the permit area — including: Utilities (e.g., water, power, gas) Site Communications, Fixed Plant infrastructure, Site Services", 
                    "Excavation"],
                ["Understands the incident investigation process and flowchart, and can assist with investigations and the close-out of associated actions, ensuring timely and accurate documentation and compliance with site procedures", 
                    "Completed Level 2 Investigation training, including: 5 Whys methodology, Credible scenario development, ICAM or Essential Factors frameworks", 
                    "Understands the responsibilities of the Incident Owner and Final Reviewer, and is capable of supporting investigations and closing out actions in alignment with site procedures and compliance requirements", 
                    "", 
                    "Pro Tip: Superintendents often block out dedicated times to progress incident investigations within their hub. Request an opportunity to observe these sessions to gain practical exposure to incident workflows, system use, and decision-making processes", 
                    "IncidentInvestigation"],
                ["Proficient in raising and managing Vicinity Permits, ensuring accurate identification of nearby activities, infrastructure, and personnel that may be impacted, and applying appropriate controls to maintain safety and coordination", 
                    "Understands the clearance thresholds for working under powerlines, knows which department to contact to raise a Vicinity Permit, and is familiar with the required details to initiate the permit process effectively", 
                    "Capable of raising, maintaining, and closing out active permits, ensuring all required information, controls, and approvals are accurately managed throughout the permit lifecycle", 
                    "", 
                    "Exposure for Vicinity Permit Management: Shadow an SME or peer to learn how to create a VP, manage handovers on FIFO days, and properly close out permits with all documentation returned. Pro Tip: Be Prepared! Every power pole has a unique ID number — travel to the crossing and record the IDs of poles being crossed beneath. Measure and record the maximum height of the largest equipment using the crossing, including reach. Print a map to verify the area and ensure accuracy. Contact the HV Electrician to request a VP. They will advise whether to meet at their office or directly at the crossing.", 
                    "VicinityPermitProcedure"],
                ["Displays strong knowledge of the HSEQ system, including operational controls, Champions platform, and assurance processes", 
                    "Familiar with MSMS and HSEQ systems; able to reference and apply relevant information effectively", 
                    "Demonstrates strong knowledge of the HSEQ system, including operational controls, Champions platform, and assurance activities", 
                    "", 
                    "HSEQ Competencies – to highlight initiative and system familiarity. Development Plan Summary – to show ongoing self-directed learning", 
                    "SMS, HSEQ"],
                ["Contributes to the Department Safety Maturity Model plan by providing input, supporting initiatives, and aligning actions with safety improvement goals", 
                    "Understands the purpose of the Safety Maturity Model (SMM) plan and participates in audits. Recognizes how actions and focus areas are generated from the SMM process", 
                    "Supports implementation of SMM actions and helps provide field evidence to demonstrate progress and compliance", 
                    "", 
                    "", 
                    "SafetyMaturityModel, SafetyMaturityModelSharepoint"],
                ["Support Level 2 Risk Assessments and apply required controls", 
                    "Attends site-based Level 2 Risk Assessments, contributes actively, understands their purpose, and uses them as a reference",
                    "Closes out assigned actions and follows up with HSE and site leadership on improvement updates", 
                    "", 
                    "Tip: Level 2 Risk Assessments (L2RAs) are triggered for specific projects or scenarios that fall outside normal operations and involve risks not captured in the Hub Risk Register. Action: Speak with your Superintendent or HSE Advisor to express your interest in attending the next L2RA.", 
                    "PreTaskHazardAssessment"],
                // Added row for Level 2
                ["Appointed (via process to Brett or PMO SSE)", 
                    "Understands responsibility of being appointed “to a place” ", 
                    "Demonstrates competence to work with Task Supervisors to achieve that", 
                    "", 
                    "", 
                    ""]
            ],
            3: [
                ["Manage incidents in accordance with the Incident Management Flowchart, including Enablon reporting, 5 Why’s analysis, action creation, assignment, and close-out", 
                    "Fully understands the end-to-end incident process, including raising, investigating, assigning actions, and ensuring close-out", 
                    "", 
                    "", 
                    "Exposure: Request your Superintendent or HSE Advisor to involve you in a 5 Why’s investigation to gain practical experience", 
                    "LearningFromEvents"],
                ["Assists in developing and maintaining departmental Safe Work Procedures (SWPs)", 
                    "", 
                    "", 
                    "", 
                    "Uses provided link to identify outdated SWPs and collaborates with the team performing the work to review, update, or remove practices that are no longer best practice", 
                    "DocumentCompliance"],
                // Added row for Level 3
                ["“on-duty”, is responsible for a place, completes quality DWI/Handovers and ensures task supervisors are doing the same", 
                    "Ensures that it is communicated to the team that they are on duty for the designated place. Works with HSR’s", 
                    "", 
                    "", 
                    "", 
                    ""]
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
    // Data rows: only as many as exist in boxTexts
    for (let row = 0; row < boxTexts.length; row++) {
        tableRows.push(
            <tr key={row}>
                {/* Progress checkboxes with unique text, always 6 columns */}
                {[0,1,2,3,4,5].map(col => {
                    const cellText = (boxTexts[row] && boxTexts[row][col]) ? boxTexts[row][col] : "";
                    let content = cellText;
                    // Render as link button if matches LINK_DEFS key or comma-separated keys
                    if (typeof cellText === "string" && cellText.includes(",")) {
                        content = cellText.split(",").map(key => renderLinkButton(key.trim()));
                    } else if (typeof cellText === "string" && cellText in require('./linkButtons').LINK_DEFS) {
                        content = renderLinkButton(cellText);
                    }
                    // Remove checkbox if cellText is empty string
                    return (
                        <td key={col} className="align-middle" style={{ position: 'relative', paddingRight: 0, paddingBottom: 0 }}>
                            <span style={{ display: 'block', marginBottom: 24, fontSize: 14, color: '#333' }}>{content}</span>
                            {!(typeof cellText === "string" && cellText === "") && (
                                <input
                                    type="checkbox"
                                    checked={gridProgressChecks[row] && gridProgressChecks[row][col] ? gridProgressChecks[row][col] : false}
                                    onChange={() => {
                                        const updated = gridProgressChecks.map(arr => arr.slice());
                                        if (!updated[row]) updated[row] = Array(6).fill(false);
                                        updated[row][col] = !updated[row][col];
                                        setGridProgressChecks(updated);
                                    }}
                                    style={{ position: 'absolute', bottom: 8, right: 8, margin: 0 }}
                                />
                            )}
                        </td>
                    );
                })}
                {/* Sign off cell */}
                <td className="align-middle">
                    <SignOffForm
                        name={signOffs[row] && signOffs[row].name ? signOffs[row].name : ""}
                        date={signOffs[row] && signOffs[row].date ? signOffs[row].date : ""}
                        signed={signOffs[row] && signOffs[row].signed ? signOffs[row].signed : false}
                        onChange={(field, value) => {
                            const updated = signOffs.map((s, idx) => idx === row ? { ...s, [field]: value } : s);
                            setSignOffs(updated);
                        }}
                        onSignOff={() => {
                            if (signOffs[row] && signOffs[row].name && signOffs[row].date) {
                                const updated = signOffs.map((s, idx) => idx === row ? { ...s, signed: true } : s);
                                setSignOffs(updated);
                            }
                        }}
                    />
                </td>
                {/* Comment cell */}
                <td className="align-middle" style={{ padding: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                        <textarea
                            value={comments[row] ? comments[row] : ""}
                            onChange={e => {
                                const updated = comments.slice();
                                updated[row] = e.target.value;
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