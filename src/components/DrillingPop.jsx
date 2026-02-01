
import { apiFetch } from "../api";
import "./Pop.css";
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import SignOffForm from "./SignOffForm";
import { renderLinkButton, LINK_DEFS } from "./linkButtons";

const LevelPopup = ({ level, onClose, popupId, userToken, onProgressUpdate }) => {
    // --- State ---
    const numRows = 7;
    const [gridProgressChecks, setGridProgressChecks] = useState(Array(numRows).fill(null).map(() => Array(6).fill(false)));
    const [comments, setComments] = useState(Array(numRows).fill(""));
    const [signOffs, setSignOffs] = useState(Array(numRows).fill(null).map(() => ({ name: "", date: "", signed: false })));
    const [hasLoaded, setHasLoaded] = useState(false); // Prevent auto-save before initial load
    const [saveStatus, setSaveStatus] = useState('idle'); // idle | success

    // --- Progress calculation ---
    let flatChecks = Array.isArray(gridProgressChecks[0]) ? gridProgressChecks.flat() : gridProgressChecks;
    const totalGridChecks = numRows * 6;
    const completedGridChecks = flatChecks.filter(Boolean).length;
    const percentage = Math.round((completedGridChecks / totalGridChecks) * 100);

    // --- Fetch progress from backend ---
    const fetchProgress = async () => {
        if (!popupId || !userToken) return;
        try {
            const data = await apiFetch(`/training-progress/?popupId=${encodeURIComponent(popupId)}`, {
                method: "GET",
                headers: { "Authorization": `Bearer ${userToken}` }
            });
            const entry = data && (data[popupId] || data);
            if (entry) {
                setGridProgressChecks(entry.gridProgressChecks || Array(numRows).fill(null).map(() => Array(6).fill(false)));
                setComments(entry.comments || Array(numRows).fill(""));
                setSignOffs(entry.signOffs || Array(numRows).fill(null).map(() => ({ name: "", date: "", signed: false })));
                setHasLoaded(true); // Mark as loaded so auto-save can start
            }
        } catch (err) {}
    };

    // --- Save progress to backend ---

    // --- Manual save handler (ContractorPop style) ---
    const handleManualSave = async () => {
        if (!popupId || !userToken) return;
        const payload = {
            popupId,
            gridProgressChecks,
            comments,
            signOffs,
            progressPercentage: percentage
        };
        await apiFetch("/training-progress/", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${userToken}`
            },
            body: JSON.stringify(payload)
        });
        setSaveStatus('success');
        if (onProgressUpdate) await onProgressUpdate();
        await fetchProgress();
        setTimeout(() => setSaveStatus('idle'), 1200);
    };

    // --- Auto-save on change (ContractorPop style) ---
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
        apiFetch("/training-progress/", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${userToken}`
            },
            body: JSON.stringify(payload)
        });
        if (onProgressUpdate) onProgressUpdate();
        // Also save on unmount (when popup closes)
        return () => {
            apiFetch("/training-progress/", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${userToken}`
                },
                body: JSON.stringify(payload)
            });
            if (onProgressUpdate) onProgressUpdate();
        };
        // eslint-disable-next-line
    }, [gridProgressChecks, comments, signOffs, percentage, popupId, userToken, hasLoaded]);

    // --- Load progress on mount ---
    useEffect(() => {
        fetchProgress();
        // eslint-disable-next-line
    }, [popupId, userToken]);

    // --- Save on close/unmount (optional, use handleManualSave if needed) ---
    // useEffect(() => {
    //     return () => {
    //         handleManualSave();
    //     };
    //     // eslint-disable-next-line
    // }, []);

    // --- Table headers and content ---
    const headers = [
        "Skills/Responsibilities", "Sub Section 1", "Sub Section 2", "Sub Section 3",
        "Training Process", "Training Material", "Reviewer sign off", "Comments"
    ];
    const colWidths = [180, 140, 140, 140, 180, 140, 160, 180];

    // --- Drilling-specific box texts (restored full instructional content) ---
    const boxTextsByLevel = {
        1: [
            ["Understands the content and purpose of the Hydro Borehole Planning Document within hydrogeological projects. Can apply this knowledge operationally to execute planned activities and ensure alignment with project objectives", 
                "Understands the purpose and level of detail within the Borehole Planning Document (BHPD). Recognises the importance of fully reviewing and comprehending the content before sign-off to ensure accountability and alignment with project requirements", 
                "Understands the purpose and level of detail within the BHPD, Reviews and signs the document daily to ensure alignment with project requirements. Recognises the importance of full comprehension before sign-off to maintain accountability", 
                "", 
                "Education – Borehole Planning Document (BHPD) Hydro team provides context on the purpose, structure, and level of detail in the BHPD. Understands operational responsibilities outlined in the document. Exposure – BHPD Review and Sign-Off. Reviews and signs the BHPD daily under guidance from an SME or Supervisor. Gains practical understanding of how to align field activities with project requirements", 
                "BHPD"],
            ["Possesses in-depth knowledge of the Fibre Monitoring Management Plan (FMMP) and the Guideline for PF and FA drilling, ensuring compliance and effective application in relevant operational contexts", 
                "Has reviewed the procedure and demonstrates confidence in applying it effectively when required", 
                "", 
                "", 
                "Engages in educational activities by reading the FMMP document and attending the Geology presentation to deepen understanding of fibre monitoring practices", 
                "Fibrous, FibrousMineralsManagementPlan"],
            ["Demonstrates a foundational understanding of Reverse Circulation (RC) drilling, including its purpose, process, and application in exploration and production activities", 
                "Able to identify an RC rig, understand the required drill suite, and recognize the roles and responsibilities of personnel involved in the drilling process", 
                "Understands the rig setup requirements on a drill pad necessary to safely and effectively execute a drill hole, ensuring alignment with operational standards and safety protocols", 
                "Familiar with expected sample outputs and adheres to compliant sample management practices, ensuring accuracy, traceability, and alignment with operational standards", 
                "Education: Conducts independent research by utilizing internet resources and reviewing relevant materials to build foundational knowledge. Exposure: Actively engages in field activities with Drillers, Supervisors, and Drill Advisors, asking questions and observing operations to deepen practical understanding.", 
                "Confluence"],
            ["Demonstrates a foundational understanding of diamond drilling, including its purpose, equipment, and application in geological exploration and resource definition", 
                "Able to identify a diamond (DD) rig, understand the required drill suite, and recognize the roles and responsibilities of personnel involved in diamond drilling operations",
                "Understands the rig setup requirements on a drill pad necessary to safely and effectively execute a diamond drill hole, ensuring alignment with operational procedures and safety standards", 
                "Understands the expected sample outputs from diamond drilling and applies appropriate methods for sample handling and management, ensuring accuracy, integrity, and compliance with operational standards", 
                "Education: Builds foundational knowledge through independent research, including internet searches and reviewing relevant materials. Exposure: Gains practical insight by spending time in the field with Drillers, Supervisors, and Drill Advisors—actively engaging in discussions and observing operations to enhance understanding.",
                "Confluence"],
            ["Demonstrates a foundational understanding of hydro drilling, including its purpose, equipment, and application in water exploration and resource development", 
                "Able to identify a diamond (DD) rig, understand the components of the drill suite, and recognize the roles and responsibilities of personnel involved in diamond drilling operations", 
                "Understands the rig setup requirements on a drill pad necessary to safely and effectively execute a diamond drill hole, ensuring compliance with operational procedures and safety standards", 
                "Understands the potential hydrogeological outcomes associated with drilling activities, including impacts on groundwater flow, aquifer integrity, and water quality", 
                "Education: Builds foundational knowledge through independent research, including internet searches and reviewing relevant documentation. Exposure: Enhances practical understanding by spending time in the field with Drillers, Supervisors, and Drill Advisors—actively asking questions and observing operations.", 
                "Hydroo"],
            ["Basic understanding of RC drilling", 
                "Identify an RC rig, the required drill suite and roles of personnel for drilling", 
                "Understand the rig set up on a pad to execute a drill hole", 
                "Understand the expected sample output and management", 
                "Education - internet search and reading. Exposure - time spent in the field with Drillers/Supv/Drill Advisors being curious", 
                ""],
            ["Basic understanding of DD drilling", 
                "Identify an DD rig, the required drill suite and roles of personnel for drilling", 
                "Understand the rig set up on a pad to execute a drill hole", 
                "Understand the expected sample output and management", 
                "Education - internet search and reading. Exposure - time spent in the field with Drillers/Supv/Drill Advisors being curious", 
                ""],
            ["Basic understanding of Hydro drilling", 
                "Identify an DD rig, the required drill suite and roles of personnel for drilling", 
                "Understand the rig set up on a pad to execute a drill hole", 
                "Understand the potential hydro outcomes", 
                "Education - internet search and reading. Exposure - time spent in the field with Drillers/Supv/Drill Advisors being curious", 
                ""],
        ],
        2: [
            ["Understands the requirements and restrictions for discharging fluids off the pad, including environmental and operational controls", 
                "Can access and follow the discharge flowchart to assess feasibility. Able to interpret a DMP and apply its information effectively in the field", 
                "Has comprehensive knowledge of discharge management. Can independently assess and implement a DMP, and provides guidance to others on its application", 
                "", 
                "Reads and applies the discharge flowchart process. Receives SME/Supervisor mentoring and assessment on fluid discharge knowledge", 
                "DischargeManagement"],
            ["Understands the process for receiving Hydro materials to site, including checking deliveries, verifying delivery dockets, reviewing materials plods, and updating the casing register", 
                "Understands the full process for Hydro materials — from ordering and delivery to documentation, laydown checks, Protrak entry, and invoicing", 
                "Can implement the Hydro materials process, enter data into Protrak, and troubleshoot invoice issues as needed", 
                "", 
                "Receives mentoring on Hydro materials handling — checking items on arrival, scanning dockets, entering data into Protrak, and updating the casing register", 
                "Hydroo"],
            ["Accurately validate meters drilled, hole status, and assess cost implications", 
                "Sources data for DDM and reviews hole status in Protrak to ensure accuracy", 
                "Delivers accurate end-of-week reporting with clear comments explaining standby and downtime reasons", 
                "Understands the importance of accurate data and how it impacts project costs and timelines", 
                "Exposure: Receives mentoring from SME or Superintendent on data accuracy and processing. Can enter detailed comments into DDM and report data to the Superintendent with appropriate granularity", 
                "DDMM"],
            ["Manage hydro drilling material stock levels, including casing register, to prevent loss, wastage, and overstocking", 
                "Has strong understanding of hydro drilling materials. Can conduct stocktakes and manages stock levels to avoid shortages", 
                "", 
                "", 
                "Exposure: Is shown how to conduct a stocktake by an experienced team member. Can manage stock levels effectively to prevent shortages.", 
                "CasingRegister"],
            ["Competently conducts SWAT and DWI inspections, identifying hazards and ensuring corrective actions are implemented", 
                "Has comprehensive knowledge of SWAT and DWI processes and can confidently provide guidance to others", 
                "", 
                "", 
                "Education: Reviews the SWAT process chart. Completes SWAT field checks (verified by Superintendent). Completes relevant checks required to issue a SWAT. Exposure: Receives mentoring on DWI from Superintendent, including how to complete the form, assign actions, and close them out.", 
                "Safeday, SWAT"],
            ["Understands procedures and controls for drilling near historic holes. Coordinates with Driller and Rig Geologist to ensure controls are implemented", 
                "Understands the risk and its controls. Accesses and applies the flow chart in the field", 
                "Reviews historical holes before each RC and hydro bore drill. Confirms survey work is complete and verifies field controls are in place", 
                "", 
                "Education Reads and understands the flow chart and supporting documentation. Exposure SME/Supervisor links historical hole checks to the SWAT process during field discussions", 
                "GADNOH"],
            ["Demonstrates ability to complete the full SWAT process: physical verification, data collation, communication, and handover", 
                "Has comprehensive knowledge of the SWAT process and can guide others in conducting it effectively", 
                "", 
                "", 
                "Review: Understand and refer to the SWAT process chart. Field Checks: Conduct SWAT field verifications, confirmed by Supervisor. Issuance: Complete all required checks prior to issuing a SWAT. Mentoring (DWI): Supervisor demonstrates how to complete a DWI, assign actions, and close them out.", 
                "Safeday, SWAT"],
            ["Understands and is competent in processing tyre claims for Drilling Partners", 
                "Can process and sign off tyre claims, with a clear understanding of invoicing procedures", 
                "", 
                "", 
                "Receives mentoring from SME/Supervisor on processing tyre claims, including guidance on procedures and documentation", 
                ""],
            ["Possesses detailed knowledge of the Divisional Drilling Work Practice and applies it effectively in field operations", 
                "Understands the purpose of the DDWP, has read the document, and can reference it to extract relevant information", 
                "", 
                "", 
                "Has read the DDWP and can relate its practices to field work", 
                "DrillingWorkPractice"],
            ["Understands the fundamentals of RC (Reverse Circulation) drilling, including its purpose, process, and field application", 
                "Can identify differences between contractor rigs and understand their respective capabilities", 
                "Understands the technical reasons for different RC drilling styles, including drill angle and azimuth, and how they impact geological targeting and data quality", 
                "Understands the sample collection process, analysis methods, and the basics of the geological model used in RC drilling", 
                "Education Uses internet search and reading to build foundational knowledge. Exposure Engages in industry-based conversations with Supervisors, Drill Advisors, and Technical Leads to deepen understanding.", 
                "DrillingSpecificsRC"],
            ["Understands the principles and process of Diamond (DD) drilling, including its purpose, equipment, and application in geological data collection", 
                "Can identify differences in contractor rigs and understand their specific capabilities, including rig type, depth capacity, mobility, and suitability for various drilling conditions", 
                "Understands the technical reasons for different DD core types, drill angles, and azimuths, and how these choices impact geological interpretation and data quality", 
                "Understands the sample collection process, analysis methods, and the fundamentals of geological, geotechnical, and structural models used in DD drilling", 
                "Exposure Builds understanding through industry-based conversations with Supervisors, Drill Advisors, and Technical Leads.", 
                "DrillingSpecificsDD"],
            ["Builds understanding through industry-based conversations with Supervisors, Drill Advisors, and Technical Leads", 
                "Identify differences in what contractor rigs are capable of", 
                "Understand the technical and operational factors influencing drilling method selection", 
                "Understand the water sampling process and basic hydrological modelling", 
                "Education – Review and understand the Scope of Work (SOW). Exposure – Engage in industry-based conversations with Supervisors, Drill Advisors, and Technical Leads.", 
                "DrillingSpecificsHydro"
            ],
            ["Understanding of RC drilling", 
                "Identify the differences between contractor rigs and the capabilities", 
                "Understand the technical reason for different RC styles, drill angle and azimuth", 
                "Understand the sample process, analysis method and basic geological model", 
                "Education - internet search and reading. Exposure - industry based conversations with Supv/Drill Advisors/Technical Leads", 
                ""],
            ["Understanding of DD drilling", 
                "Identify the differences between contractor rigs and the capabilities", 
                "Understand the technical reason for different DD core, drill angle and azimuth", 
                "Understand the sample process, analysis method and basic geological, geotechnical, structural model", 
                "Exposure - industry based conversations with Supv/Drill Advisors/Technical Leads", 
                ""],
            ["Understanding of Hydro drilling", 
                "Identify the differences between contractor rigs and the capabilities", 
                "Understand the technical and operational reasons for selection of drilling methodology", 
                "Understand the water sampling process and basic hydrological model", 
                "Education - review and understand the SOW. Exposure - industry based conversations with Supv/Drill Advisors/Technical Leads", 
                ""],
        ],
        3: [
            ["Understand bore test pumping water management requirements, including SRT, CRT, and DMP protocols", 
                "Demonstrates strong knowledge of DMPs, including field execution, water testing, wetting front checks, and desktop reviews of exclusion and avoidance zones", 
                "", 
                "", 
                "Builds experience through DMP reviews with SMEs/Supervisors, supported by mentoring during desktop and field checks", 
                "DischargeManagement"],
            ["Supports discharge management plan implementation in hydro programs, ensuring alignment with field practices and environmental standards", 
                "Ground truths discharge designs and advises on best practices for safe environmental discharge; conducts desktop topography assessments to support planning and risk mitigation", 
                "", 
                "", 
                "Builds experience by reviewing DMPs with SMEs/Supervisors, with mentoring support during desktop and field checks", 
                "DischargeManagement"],
            ["Support Technical Leads in determining the most effective drilling sequence to meet technical and planning objectives", 
                "Collaborate with Geology, Geotechnical, and Hydrogeology designers to gather technical requirements and effectively plan and implement them in the field", 
                "", 
                "", 
                "Collaborate with Geology, Geotechnical, and Hydrogeology designers to gather technical requirements and effectively plan and implement them in the field", 
                ""],
            ["Demonstrates knowledge of hydrogeological bore construction and manages materials to support efficient field execution", 
                "Able to receive mentoring from SME/EW Advisor on machine capability, infield direction, and best practice for pad and track construction, with pass-out expected within 12 months", 
                "Able to monitor material orders for timely site delivery, verify items against order lists, and confirm quantities meet project requirements", 
                "", 
                "Education – Able to review materials in Protrak and at the laydown area to understand their purpose and application in hydrogeological programs. Exposure – Able to confirm with SMEs/Supervisors that a materials order can be accurately generated from a hydro design.", 
                "ProTrakHydro"],
            ["Able to understand and manage the impacts of lost circulation and slow penetration rates, identifying key decision points to support continued drilling operations", 
                "Provides timely reporting of slow drilling rates, enters relevant comments into DDM, and informs drilling advisors to support prompt resolution and maintain operational efficiency", 
                "Able to collaborate with drilling advisors and contractors to brainstorm solutions, and take ownership in implementing agreed actions to support drilling continuity and efficiency", 
                "", 
                "Exposure – Able to receive mentoring from SMEs (Drill Advisors) to understand factors contributing to lost circulation and slow penetration rates, with Supervisor guidance to actively support solution identification and implementation", 
                ""],
            ["Able to understand and manage the Lost Drill Equipment process, ensuring accurate cost allocation for proper tracking and reporting", 
                "Able to review the stuck pipe procedure and understand the cost and time implications, supporting informed decision-making during drilling operations", 
                "Able to collaborate with the contractor to agree on effective pipe abstraction methods, request cost estimates for equipment left in-hole, and provide realistic recovery timeframes to support informed decision-making", 
                "Able to fully understand the stuck rods procedure, determine appropriate recovery methods and timeframes, and ensure accurate data entry in Protrak and Enablon", 
                "Education – Able to review the Quick Reference Guide (QRG) to understand its intent and apply the process effectively in the field. Exposure – Able to receive guidance from SMEs/Supervisors on navigating the process, including documentation and reporting steps, and gain insight into decision-making processes and outcomes", 
                "RecoveringDrillPipe"],
            ["Able to demonstrate knowledge of instrument types and installation methods for hydrogeological and geotechnical purposes, including VWPs, ensuring correct application and integration into field programs", 
                "Able to understand the scope of work and ensure correct instruments are identified, ordered, and stored onsite prior to Field Personnel engagement, supporting smooth and timely execution of hydrogeological and geotechnical programs", 
                "", 
                "", 
                "Exposure – Able to receive guidance from Hydrogeology SMEs on instrument types, their functions, and installation methods, supporting practical understanding and field readiness", 
                "VWPMlist"],
            ["Able to understand the full VWP installation process, including grouting techniques and procedural steps, ensuring correct setup and data integrity for hydrogeological and geotechnical monitoring", 
                "Able to fully understand the Fluid Potential work scope, verify tasks in the field, and perform CMS duties to support program execution", 
                "Able to demonstrate full understanding of the Fluid Potential work scope, verify assigned tasks in the field, and execute CMS responsibilities to ensure compliance and data integrity", 
                "", 
                "Exposure – Able to receive guidance from Hydrogeology SMEs on instrument types, their functions, and installation methods, supporting practical understanding and correct field application", 
                ""],
            ["Knowledge of Hydro bore construction and competent in associated materials ordering and management", 
                "Can take a hydro design and produce an materials order for a hydro contractor. ", 
                "Track order, ensure all materials come to site and have been marked off, ensure enough materials have been ordered for the project", 
                "", 
                "Education - Review materials in Protrak and in laydown to understand what they are and how they are used. Exposure - confirmation from SME/Super that a materials order can be generated from a hydro design", 
                ""],
        ]
    };
    // Defensive: pad boxTexts for rendering
    let safeBoxTexts = boxTextsByLevel[level] || boxTextsByLevel[1];
    // Always render 7 rows for the grid (as in your new logic)
    if (safeBoxTexts.length < numRows) {
        safeBoxTexts = [
            ...safeBoxTexts,
            ...Array(numRows - safeBoxTexts.length).fill(null).map(() => Array(6).fill(""))
        ];
    }

    // --- Table rows ---
    const tableRows = [];
    // Header row
    tableRows.push(
        <tr key="header">
            {headers.map((header, idx) => (
                <th
                  key={idx}
                  className="text-center align-middle bg-light"
                  style={idx < colWidths.length ? { width: colWidths[idx] } : {}}
                >
                  {header}
                </th>
            ))}
        </tr>
    );
    // Data rows
    for (let row = 1; row <= numRows; row++) {
        const rowData = safeBoxTexts[row-1] || [];
        tableRows.push(
            <tr key={row}>
                {/* Progress checkboxes with unique text */}
                {[0,1,2,3,4,5].map(col => {
                    const cellText = rowData[col] || "";
                    let content;
                    if (typeof cellText === "string" && cellText.includes(",")) {
                        content = cellText.split(",").map(key => renderLinkButton(key.trim()));
                    } else if (typeof cellText === "string" && cellText in LINK_DEFS) {
                        content = renderLinkButton(cellText);
                    } else {
                        content = cellText;
                    }
                    // Remove checkbox in column 6 (index 5) for all rows
                    const removeCheckbox = (col === 5);
                    return (
                        <td
                          key={col}
                          className="align-middle"
                          style={{
                            position: 'relative',
                            paddingRight: 0,
                            paddingBottom: 0,
                            width: col < 6 ? colWidths[col] : undefined
                          }}
                        >
                          <span style={{
                            display: 'block',
                            marginBottom: 24,
                            fontSize: 14,
                            color: '#333',
                            wordBreak: 'break-word',
                            whiteSpace: 'pre-line',
                            overflowWrap: 'break-word'
                          }}>{content}</span>
                          {!removeCheckbox && !(typeof cellText === "string" && cellText === "") && (
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
                            )}
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
                    />
                </td>
                {/* Comment cell */}
                <td className="align-middle" style={{ padding: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                        <textarea
                            value={comments[row-1] ? comments[row-1] : ""}
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

    // --- Render ---
    return (
        <div className="popup-overlay">
            <div className="popup-content level-popup" style={{ maxWidth: 900 }}>
                <button className="close-button" onClick={onClose} aria-label="Close popup">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="12" fill="#ff4d4d" />
                        <line x1="8" y1="8" x2="16" y2="16" stroke="white" strokeWidth="2" />
                        <line x1="16" y1="8" x2="8" y2="16" stroke="white" strokeWidth="2" />
                    </svg>
                </button>
                <h2>Drilling Level {level}</h2>
                <button
                    className="save-progress-btn"
                    onClick={handleManualSave}
                    style={{ marginBottom: 16 }}
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
            </div>
        </div>
    );
}

// DrillingPop main popup component
// ...existing code...



// DrillingPop main popup component
function DrillingPop({ popupId, closePopup, userToken, onProgressUpdate }) {
    if (!popupId) return null;
    let openLevel = null;
    if (popupId === "drilling1") openLevel = 1;
    else if (popupId === "drilling2") openLevel = 2;
    else if (popupId === "drilling3") openLevel = 3;

    return (
        openLevel ? (
            <div className="popup-overlay contractor-popup-fadein">
                <div className="popup-container contractor-popup-centered" style={{ position: 'relative', paddingTop: 0, paddingBottom: 0 }}>
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

