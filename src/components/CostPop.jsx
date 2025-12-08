    import { useDebouncedSave } from "../hooks/useDebouncedSave";

import "./Pop.css";
import { useState } from "react";

const CostPop = ({ popupId, closePopup, userToken }) => {
    // ...existing code...
    const checkboxItems = [
        "Box 1", "Box 2", "Box 3", "Box 4", "Box 5", "Box 6",
        "Box 7", "Box 8", "Box 9", "Box 10", "Box 11", "Box 12",
        "Box 13", "Box 14", "Box 15", "Box 16", "Box 17", "Box 18",
        "Box 19", "Box 20", "Box 21", "Box 22", "Box 23", "Box 24",
        "Box 25", "Box 26", "Box 27", "Box 28", "Box 29", "Box 30",
        "Box 31", "Box 32", "Box 33", "Box 34", "Box 35", "Box 36",
    ];
    const [progressChecks, setProgressChecks] = useState(Array(checkboxItems.length).fill(false));
    useDebouncedSave(popupId, progressChecks, userToken);
    const [comment, setComment] = useState("");
    const [signOffDate, setSignOffDate] = useState("");
    const [signOffName, setSignOffName] = useState("");

    if (!popupId) return null;


    const contentMap = {
        cost1: {
            title: "Cost reporting level 1",
            cells: [
                "Skills/Responsibilities", "Sub Section 1", "Sub Section 2", "Sub Section 3",
                "Training Process", "Training Material", "Reviewer sign off", "Comments",
                    {
                    type: "textWithCheckbox",
                    text: "Manages Operator/HME PLODs, confidently queries activities, and completes approvals (sign, scan, save)", 
                    checkboxLabel: "Box 1"
                },
                {
                    type: "textWithCheckbox",
                    text: "Understands the PLOD approval workflow and its role in tracking performance and cost allocation. Can link PLOD data to the DDM board", 
                    checkboxLabel: "Box 2"
                },
                {
                    type: "textWithCheckbox",
                    text:  "Understands EW PLOD work activities, including operator, machine, standby, and non-operating charges", 
                    checkboxLabel: "Box 3"
                },
                {
                    type: "textWithCheckbox",
                    text:  "Can question PLOD charges and provide accurate guidance. Has working knowledge of the contract and its application", 
                    checkboxLabel: "Box 4"
                },
                "Review & Access Understand the E/Works PLOD signing process flow. Access Matrix and contract summaries. Exposure Mentoring from SME/Supervisor on thorough PLOD checks. Engage with CM team and escalate charge queries to Cat 3 Supervisor.", 
                                    <div style={{  display: "flex", flexDirection: "column", gap: "10px", marginTop: "10px"  }}>
                    <button onClick={() => window.open("https://riotinto.sharepoint.com/:f:/r/sites/ResDevCMProcurement/Shared%20Documents/General/Contract%20Summary/Pdf%20format/Earthworks?csf=1&web=1&e=jmebKR", "_blank")}>Earthworks pdf format</button>
                    <button onClick={() => window.open("#", "_blank")}>Should this be corplan now we moving over?(not matrix)</button>
                    </div>, 
                "Sign off", 
                "comment section",

                {
                    type: "textWithCheckbox",
                    text: "Manages daily plods submitted by Drilling and Hydro contractors, with the ability to confidently review, query activities, and approve submissions in line with operational requirements", 
                    checkboxLabel: "Box 5"
                },
                                {
                    type: "textWithCheckbox",
                    text: "Understands the process flow for plod approval, including its role in tracking contractor performance and assigning costs. Confidently reviews and signs off on daily plods, ensuring accuracy and accountability",  
                    checkboxLabel: "Box 6"
                },
                                                {
                    type: "textWithCheckbox",
                    text: "Understands the various work activities recorded on a drilling plod, including the distinctions between operator charges, machine charges, standby time, and non-operating charges. Applies this knowledge to accurately review and validate contractor submissions", 
                    checkboxLabel: "Box 7"
                },
                                                {
                    type: "textWithCheckbox",
                    text: "Confidently queries and validates charges on contractor plods, providing accurate guidance based on operational understanding. Has working knowledge of the contract and how its terms are applied in daily activities", 
                    checkboxLabel: "Box 8"
                },
                "Review: Understands the end-to-end process flow for signing Drilling and Hydro contractor plods, ensuring accuracy and compliance with operational procedures. Access: Has access to contract summaries to support informed decision-making during plod reviews and approvals.Exposure: Mentored by SMEs and Supervisors on conducting thorough plod checks. Engages in communication with the Contract Management (CM) team and escalates queries on charges to the Category 3 Supervisor as required.", 
                                    <div style={{  display: "flex", flexDirection: "column", gap: "10px", marginTop: "10px"  }}>
                    <button onClick={() => window.open("#", "_blank")}>Earthworks pdf format</button>
                    <button onClick={() => window.open("#", "_blank")}>Should this be corplan now we moving over?(not matrix)</button>
                    </div>, 
                "Sign off", "comment section",
                                                {
                    type: "textWithCheckbox",
                    text: "Accurately enters contractor plod data into Protrak and confidently approves plods in Coreplan or Matrix, ensuring alignment with operational and contractual requirements", 
                    checkboxLabel: "Box 9"
                },
                                                {
                    type: "textWithCheckbox",
                    text: "Has system access and login credentials to relevant portals, enabling the approval and processing of contractor plods with accuracy and efficiency", 
                    checkboxLabel: "Box 10"
                },
                "", 
                "", 
                "System Access: Has access to both Protrak and Matrix systems, enabling efficient data entry and approval of contractor plods. Exposure: Shadowed by SMEs and Supervisors to learn accurate entry and approval processes for Hydro plods in Matrix, ensuring compliance with operational and contractual standards.",
                                    <div style={{  display: "flex", flexDirection: "column", gap: "10px", marginTop: "10px"  }}>
                    <button onClick={() => window.open("#", "_blank")}>link not working</button>
                    <button onClick={() => window.open("", "_blank")}>coreplan ??</button>
                    </div>, 
                "Sign off", "comment section",
            ]
        },
        cost2: {
            title: "Cost reporting level 2",
            cells: [
                "Skills/Responsibilities", "Sub Section 1", "Sub Section 2", "Sub Section 3",
                "Training Process", "Training Material", "Reviewer sign off", "Comments",
                    {
                    type: "textWithCheckbox",
                    text: "Understands the breakdown of the department budget, including the distinction between Opex and Capex", 
                    checkboxLabel: "Box 1"
                },
                {
                    type: "textWithCheckbox",
                    text: "Understands which cost activities align with Opex and Capex expense buckets, and the rationale behind their classification", 
                    checkboxLabel: "Box 2"
                },
                "", 
                "", 
                "No formal training is available at Supervisor level—stay curious and ask experienced Supervisors or Superintendents for guidance", 
                "", 
                "Sign off", 
                "comment section",

                {
                    type: "textWithCheckbox",
                    text: "Understands the cost breakdown of activities within their work area and how each contributes to overall budget management", 
                    checkboxLabel: "Box 3"
                },
                                {
                    type: "textWithCheckbox",
                    text: "Can locate and use the current WBS register to support cost tracking and activity alignment",  
                    checkboxLabel: "Box 4"
                },
                                                {
                    type: "textWithCheckbox",
                    text: "Can identify and apply the correct Cost Code or Cost Centre for activities, services, and purchases within their work area", 
                    checkboxLabel: "Box 5"
                },
                "", 
                "No formal training is available at Supervisor level—stay curious, ask questions, and seek guidance from experienced Supervisors or Superintendents", 
                <button onClick={() => window.open("https://app.powerbi.com/groups/me/reports/4f3d49d8-5f37-4727-bb06-25ea221f7399/ReportSection?experience=power-bi", "_blank")}>2025 WBS Register </button>,
                "Sign off", "comment section",
            ]
        },
        cost3: {
            title: "Cost reporting level 3",
            cells: [
                "Skills/Responsibilities", "Sub Section 1", "Sub Section 2", "Sub Section 3",
                "Training Process", "Training Material", "Reviewer sign off", "Comments",
                    {
                    type: "textWithCheckbox",
                    text: "Basic understanding of the ResDev annual budget process, including key timelines, inputs, and approvals", 
                    checkboxLabel: "Box 1"
                },
                {
                    type: "textWithCheckbox",
                    text: "Understand the basic process flow of how future work packages are requested, approved, forecasted and then budgeted.", 
                    checkboxLabel: "Box 2"
                },
                {
                    type: "textWithCheckbox",
                    text: "Understand the process flow for future work packages: request, approval, forecasting, and budgeting", 
                    checkboxLabel: "Box 3"
                },
                "", 
                "No formal training at Supervisor level—stay curious and ask questions of experienced Superintendents and Technical Leads", 
                "No training plan exists for this topic. Candidate will have to be mentored by a SME or superintendent.", 
                "Sign off", 
                "comment section",
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

        {/* Progress Bar for current popup only */}
        {(() => {
            // Get all checkbox labels for the current popup
            const popupCheckboxLabels = cells
                .filter(cell => typeof cell === "object" && cell.type === "textWithCheckbox")
                .map(cell => cell.checkboxLabel);

            // Get indexes for those labels
            const popupCheckboxIndexes = popupCheckboxLabels.map(label => checkboxItems.indexOf(label));

            // Count checked boxes for this popup
            const checkedCount = popupCheckboxIndexes.filter(i => progressChecks[i]).length;
            const totalCount = popupCheckboxIndexes.length;
            const percent = totalCount > 0 ? Math.round((checkedCount / totalCount) * 100) : 0;

            return (
                <div className="progress-bar-container">
                    <div
                        className="progress-bar"
                        style={{ width: `${percent}%` }}
                    >
                        <span className="progress-text">
                            {percent}%
                        </span>
                    </div>
                </div>
            );
        })()}

        {/* Grid Container */}
        <div className="grid-container">
            {cells.map((cellContent, index) => {
            if (typeof cellContent === "object" && cellContent.type === "textWithCheckbox") {
                const checkboxIndex = checkboxItems.indexOf(cellContent.checkboxLabel);
                return (
                <div key={index} className="grid-item">
                    <p>{cellContent.text}</p>
                    <label className="custom-checkbox">
                    <span className="sr-only"></span>
                    <input
                        type="checkbox"
                        checked={progressChecks[checkboxIndex]}
                        onChange={() => {
                        const updatedChecks = [...progressChecks];
                        updatedChecks[checkboxIndex] = !updatedChecks[checkboxIndex];
                        setProgressChecks(updatedChecks);
                        }}
                    />
                    <span className="checkmark"></span>
                    </label>
                </div>
                );
            }


            if (checkboxItems.includes(cellContent)) {
                const checkboxIndex = checkboxItems.indexOf(cellContent);
                return (
                    <div key={index} className="grid-item">
                        <label className="custom-checkbox">
                            {/* Optional: keep for screen readers */}
                            <span className="sr-only">Checkbox {checkboxIndex + 1}</span>
                            <input
                                type="checkbox"
                                checked={progressChecks[checkboxIndex]}
                                onChange={() => {
                                    const updatedChecks = [...progressChecks];
                                    updatedChecks[checkboxIndex] = !updatedChecks[checkboxIndex];
                                    setProgressChecks(updatedChecks);
                                }}
                            />
                            <span className="checkmark"></span>
                        </label>
                    </div>
                );
            }


            if (cellContent === "comment section") {
                return (
                <div key={index} className="grid-item">
                    <label htmlFor={`comment-${index}`}>Comment:</label>
                    <textarea
                    id={`comment-${index}`}
                    placeholder="Enter your comment..."
                    className="comment-box"
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    />
                </div>
                );
            }

            if (cellContent === "Sign off") {
                return (
                <div key={index} className="grid-item">
                    <label htmlFor={`signoff-date-${index}`}>Sign-off Date:</label>
                    <input
                    type="date"
                    id={`signoff-date-${index}`}
                    className="signoff-date"
                    value={signOffDate}
                    onChange={(e) => setSignOffDate(e.target.value)}
                    />
                    <label htmlFor={`signoff-name-${index}`}>Sign-off Name:</label>
                    <input
                    type="text"
                    id={`signoff-name-${index}`}
                    className="signoff-name"
                    placeholder="Enter your name"
                    value={signOffName}
                    onChange={(e) => setSignOffName(e.target.value)}
                    />
                </div>
                );
            }

            return (
                <div key={index} className="grid-item">
                {cellContent}
                </div>
            );
            })}
        </div>
        </div>
    </div>
    );


};

export default CostPop;