// import { useDebouncedSave } from "../hooks/useDebouncedSave";
import "./Pop.css";
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import SignOffForm from "./SignOffForm";

const LevelPopup = ({ level, onClose, popupId, userToken, onProgressUpdate }) => {
    // Texts for each popup level
    const boxTextsByLevel = {
        1: [
            ["Possesses detailed knowledge of the roles and responsibilities of Field Assistants, Survey Assistants, and Hydro Technicians, including their contributions to drilling operations, data collection, and site safety", 
                "Possesses comprehensive knowledge of all tasks associated with the role and is capable of providing mentorship and subject matter expertise across all responsibilities", 
                "Demonstrates the ability to effectively plan and schedule daily tasks and movements, ensuring timely follow-up and completion within expected timeframes", 
                "", 
                "Education: Review and understand the role description, including key accountabilities, safety responsibilities, and performance expectations. Gain clarity on role-specific responsibilities through discussion with supervisors and reference to relevant procedures and standards. Exposure: Receive hands-on training from a Subject Matter Expert (SME) or Supervisor with experience in field operations, hydro-tech, or survey. Understand work priorities and field expectations through guided instruction and real-time feedback. Shadow an experienced Field Supervisor to observe best practices in task planning, team coordination, and field execution.", 
                "Field L1: Box 6"]
        ],
        2: [
            ["Understanding High-Risk Work Licence Requirements and Application. Familiar with the requirements and practical application of High-Risk Work Licences relevant to Field Assistants, Survey Assistants, and Hydro Technicians, ensuring compliance with task-specific safety and regulatory standards", 
                "Monitor licence expiry for all personnel under your supervision. Maintain a current register of licence details to ensure compliance. Provide SME guidance on licence requirements, usage protocols, and site-specific VOC (Verification of Competency) processes. Support field readiness by ensuring all high-risk tasks are performed by qualified and verified individuals", 
                "", 
                "", 
                "Training: Receive guidance from SMEs or Superintendents on high-risk licence requirements and site protocols. Document Management: Develop a method for tracking and securely storing licence and VOC documentation. Compliance Monitoring: Learn how to report and monitor VOC completion to ensure ongoing compliance with site standards.", 
                "Field L2: Box 6"],
            ["Sets and reviews development goals with team members to support growth and performance", 
                "Sets SMART objectives aligned with role duties and achievable within a realistic timeframe", 
                "Follows up on development goals during check-ins, encouraging team members to own their growth", 
                "", 
                "Education: Understands role expectations by reviewing the role description. Exposure: Collaborates with Superintendent in meetings to define clear, measurable development actions and check-in plans aligned to the role.", 
                "Field L2: Box 12"],
            ["Regularly assess performance during check-ins, providing constructive feedback", 
                "Sets clear, achievable objectives aligned with business needs and role responsibilities", 
                "Challenges team members to own their development, offers constructive feedback (EBI), and encourages evidence of progress toward objectives", 
                "", 
                "Education:Reads the role description to understand responsibilities and expectations. Exposure: Meets with Superintendent to discuss P6 and define specific, measurable check-in actions aligned to the role description", 
                "Field L2: Box 18"],
            ["Coaches and mentors team members to support growth and success in their role", 
                "Mentors field assistants in task prioritization, use of RTIO safety tools, operational discipline, and reporting compliance issues", 
                "", 
                "", 
                "Education: Reads the role description and relevant SWPs to understand responsibilities and task requirements. Exposure: Shadows a Field Supervisor to learn task prioritization; receives coaching from SME/Superintendent on LIF activities.", 
                "Field L2: Box 24"],
            ["Ensures weekly consumable orders are necessary and reasonable, and manages stock levels to meet operational requirements", 
                "Encourages use of a stocktake template for critical orders, assesses order validity and excess, and approves orders based on operational need", 
                "Mentors field assistants on reconciling and tracking stores orders to ensure accuracy and accountability", 
                "", 
                "Exposure: Shadows an experienced Field Supervisor to learn stocktake, ordering, and reconciliation of stores orders, including how to track orders in SAP", 
                "Field L2: Box 30"]
        ],
        3: [
            ["Manage and reconcile timesheets for Cat1 Field Assistants, Survey Assistants, and Hydro Technicians", 
                "Assess dates and times, and approve timesheets in the WorkPac portal",
                "", 
                "", 
                "Exposure: SME/Supervisor-led session to demonstrate timesheet reconciliation and processing, ensuring correct cost code allocation", 
                "Field L3: Box 6"],
            ["Ensure WHS compliance through testing and tagging, and managing registers for fire extinguishers, lifting gear, and chemical storage", 
                "Performs required monthly and quarterly compliance checks", 
                "Conducts laydown inspections and field verifications to ensure compliance with safety and operational standards", 
                "", 
                "Education – Dogging, Fire Extinguisher Test & Tag, and ChemAlert training (not mandatory but beneficial). Exposure – Mentorship from SME or Field Supervisor during field audits and compliance checks", 
                "Field L3: Box 12"],
            ["Manages team performance and development through quality quarterly Check-Ins and oversight of Development Plans", 
                "Conduct check ins quarterly, suing the correct template, correct detail, in the right app - Workday", "Follow up on Development Plan actions by requesting progress updates, challenging improvements, and actively supporting growth", 
                "", 
                "Superintendent sets expectations for Check-Ins and Development Plans, follows up on actions and challenges, verifies progress, and guides staff in setting purposeful targets to improve performance", 
                "Field L3: Box 18"],
            ["Manages IVMS and DSS reporting, addressing poor behaviours as required; includes DSS line item reviews and corrective actions", 
                "Manages IVMS and DSS reporting, reviews DSS line items, and addresses poor behaviours through corrective actions as required", 
                "Has full knowledge of IVMS and DSS actions and penalties; challenges the team to improve driving behaviours", 
                "", 
                "Education: Has read the IVMS and DSS Leader Guidance Notes. Exposure: Superintendent provides guidance to ensure clear understanding of IVMS and DSS rules, manages inappropriate behaviour, and ensures rules are upheld", 
                "Field L3: Box 24"],
            ["Leads, uses, and mentors team members in RTIO and Department Safety Systems, including PTHA, CRM, and Project Risk Reviews", 
                "Has read and understands the guidance notes on tool use, and completed CCFV online training and videos", 
                "Demonstrates comprehensive understanding of RTIO safety systems and provides mentoring and advice to others on their use", 
                "", 
                "Education: Has reviewed all training videos, understands Rio Tools usage, and holds CCFV VOC qualification. Exposure: Mentored by SME/Supervisor to a level where the Supervisor can provide direct guidance on RTIO safety tool usage.", 
                "Field L3: Box 30"],
            ["Ensures appropriate water source and transfer system are in place for the project and can organise installation as required", 
                "Participates in drilling program planning, including desktop review of bore locations and field verification of access", 
                "Provides SME-level advice on water bore setup using Bore Boss/Bladder systems; manages inspections and maintenance of the water setup", 
                "", 
                "Mentored by SME/Field Supervisor in the safe and effective setup of water sources, including scoping and selecting bores for installation", 
                "Field L3: Box 36"],
            ["Manages chemicals and consumables using the CHEMALERT system", 
                "Access and use ChemAlert proficiently. Maintain chemical inventory on site. Perform chemical compatibility checks", 
                "", 
                "", 
                "Completed all ChemAlert training videos. Understands system functionality and usage", 
                "Field L3: Box 42"],
            ["Is capable of raising Vehicle Maintenance Notifications. Is capable of managing Hub LV fleet operations", 
                "Manages vehicle maintenance scheduling effectively. Ensures zero no-shows for scheduled services", 
                "Capable of training and coaching Field Assistants in raising notifications", 
                "", 
                "SME or Field Supervisor demonstrates how to raise a notification in SAP, including detailed steps and supporting photos", 
                ""],
            ["Schedule electrical testing and tagging of equipment", 
                "Get quote, schedule contractor, raise PO, manage site activities", 
                "", 
                "", 
                "SME/Field Supervisor to demonstrate: request quote, raise PO, engage contractor, provide maps and documentation", 
                ""],
            ["Assist and provide recommendations during the recruitment of new staff",
                "Provide feedback on candidates based on your experience level. Assist in assessing resume quality", 
                "Provide feedback on candidates based on your experience level. Assist in assessing resume quality", 
                "", 
                "Exposure: Request to join interview panel for upcoming vacanciess ", 
                ""],
            ["Oversee sample collection, dispatch, and drill collar rehabilitation", 
                "Use Protrak to identify outstanding items, liaise with Geoscience on available samples, and generate cutting lists", 
                "", 
                "", 
                "Gain SME/Field Supervisor mentoring on sample dispatch and Protrak use. Guide field assistants in generating sample and collar cutting sheet", 
                ""],
            ["Manage rental of required equipment (gensets, telehandler, vehicles, water points, etc.)", 
                "Assess project needs, confirm required equipment, get quotes, raise PO, and arrange delivery to site", 
                "Track costs, approve invoices, and reassess project needs", 
                "", 
                "Gain exposure through SME/Field Supervisor mentoring on project needs, engaging hire companies, quoting, raising POs, and sharing knowledge with others", 
                ""]
        ],
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
        if (!popupId || !userToken) {
            setSaveStatus('error');
            setTimeout(() => setSaveStatus('idle'), 2000);
            alert("Cannot save: missing user session or popup ID.");
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
                    "Authorization": `Bearer ${userToken}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });
            if (!res.ok) {
                setSaveStatus('error');
                setTimeout(() => setSaveStatus('idle'), 2000);
                alert("Save failed: " + res.status);
                return;
            }
            setSaveStatus('success');
            if (onProgressUpdate) await onProgressUpdate();
            // Re-fetch latest progress after save
            await fetchProgress();
            setTimeout(() => setSaveStatus('idle'), 1200);
        } catch (err) {
            setSaveStatus('error');
            setTimeout(() => setSaveStatus('idle'), 2000);
            alert("Save failed: network error");
            console.error("Save Progress error:", err);
        }
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

    // Auto-save progress to backend on every change, and on unmount (close)
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

        // Save on close/unmount
        return () => {
            // Recompute payload in case state changed since last effect
            const latestPayload = {
                popupId,
                gridProgressChecks,
                comments,
                signOffs,
                progressPercentage: Math.round((gridProgressChecks.flat().filter(Boolean).length / (7 * 6)) * 100)
            };
            fetch("/api/training-progress/", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${userToken}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(latestPayload)
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
    // Ensure boxTexts has enough rows for rendering (avoid undefined errors)
    let safeBoxTexts = boxTexts;
    if (level === 1 && boxTexts.length < 1) {
        safeBoxTexts = [
            ...boxTexts,
            ...Array(1 - boxTexts.length).fill(null).map(() => Array(6).fill(""))
        ];
    } else if (level === 2 && boxTexts.length < 5) {
        safeBoxTexts = [
            ...boxTexts,
            ...Array(5 - boxTexts.length).fill(null).map(() => Array(6).fill(""))
        ];
    } else if (level === 3 && boxTexts.length < 12) {
        safeBoxTexts = [
            ...boxTexts,
            ...Array(12 - boxTexts.length).fill(null).map(() => Array(6).fill(""))
        ];
    }

    let numRows = 7;
    if (level === 1) {
        numRows = 1;
    } else if (level === 2) {
        numRows = 5;
    } else if (level === 3) {
        numRows = 12;
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
                {/* Removed debug display for production */}
                <h2>Field Supervisor Level {level}</h2>
                <button
                    className={saveStatus === 'error' ? 'save-progress-btn error' : 'save-progress-btn'}
                    onClick={handleManualSave}
                >
                    {saveStatus === 'success' ? (
                        <span style={{ fontSize: 20, color: 'white' }}>✔️</span>
                    ) : saveStatus === 'error' ? (
                        <span style={{ fontSize: 20, color: 'white' }}>❌</span>
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



function FieldPop({ popupId, closePopup, userToken, onProgressUpdate }) {
    if (!popupId) return null;
    let openLevel = null;
    if (popupId === "field1") openLevel = 1;
    else if (popupId === "field2") openLevel = 2;
    else if (popupId === "field3") openLevel = 3;

    return (
        openLevel ? (
            <div className="popup-overlay field-popup-fadein">
                <div className="popup-container field-popup-centered">
                    <button className="close-btn" onClick={closePopup} style={{ float: 'right' }}>Close</button>
                    <LevelPopup level={openLevel} onClose={closePopup} popupId={popupId} userToken={userToken} onProgressUpdate={onProgressUpdate} />
                </div>
            </div>
        ) : null
    );
}

export default FieldPop;