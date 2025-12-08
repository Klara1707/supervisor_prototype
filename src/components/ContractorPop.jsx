    import { useDebouncedSave } from "../hooks/useDebouncedSave";

import "./Pop.css";
import { useState } from "react";

const ContractorPop = ({ popupId, closePopup, userToken }) => {
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
        contractor1: {
        title: "Contractor management level 1 ",
            cells: [
                "Skills/Responsibilities", "Sub Section 1", "Sub Section 2", "Sub Section 3",
                "Training Process", "Training Material", "Reviewer sign off", "Comments",
                    {
                    type: "textWithCheckbox",
                    text: "Understands and manages the Non-Inducted Transport Worker process, ensuring compliance with site access protocols and contractor management procedures", 
                    checkboxLabel: "Box 1"
                },
                {
                    type: "textWithCheckbox",
                    text: "Can locate and use the Non-Inducted Transport Worker (NITW) checklist on Safeday, and is capable of safely conducting NITW activities in accordance with site procedures and safety requirements", 
                    checkboxLabel: "Box 2"
                },
                "",
                "",
                "System Access & Usage: Able to download the Non-Inducted Transport Worker (NITW) checklist to a mobile device using the provided link. Familiar with accessing and navigating Safeday to support NITW activities. Exposure: Has familiarised themselves with the rules and requirements of the NITW process through hands-on experience and guidance from site procedures.", 
                <button onClick={() => window.open("https://safeday.app/", "_blank")}>Safeday</button>, 
                "Sign off", 
                "comment section",

                {
                    type: "textWithCheckbox",
                    text: "Understands and manages contractor mobilisation, including PTW, inductions, qualifications, and compliance with mySafety and Everyday Respect standards", 
                    checkboxLabel: "Box 3"
                },
                                {
                    type: "textWithCheckbox",
                    text: "Manages documentation, background checks, and communication required for contractor mobilisation to site",  
                    checkboxLabel: "Box 4"
                },
                                {
                    type: "textWithCheckbox",
                    text: "Understands and manages contractor mobilisation, including PTW, inductions, qualifications, and compliance with mySafety and Everyday Respect standards",  
                    checkboxLabel: "Box 5"
                },
                "",
                "System Access: Has access to CM One, Pegasus, SAP, R3413 for qualifications checks, Protrak for inspections, and Safeday for safety documentation. Exposure: Mentored on-site by SMEs and HSE personnel in conducting documentation reviews, inspections, qualifications checks, and using Safeday and Protrak systems. Also received guidance on the contractor mobilisation process and understanding contract stipulations.", 
                <button onClick={() => window.open("https://app.avetta.com/login?referral=https://app.avetta.com/avt-cli/home", "_blank")}>Avetta</button>, 
                "Sign off", "comment section",
                                                {
                    type: "textWithCheckbox",
                    text: "Trained and competent in managing the Permit to Work (PTW) process, ensuring compliance with site safety and operational procedures", 
                    checkboxLabel: "Box 6"
                },
                                                {
                    type: "textWithCheckbox",
                    text: "Completed CMS qualification and applies its context to daily CMS duties. Understands the difference between general and master PTWs", 
                    checkboxLabel: "Box 7"
                },
                                                {
                    type: "textWithCheckbox",
                    text: "Completed CMS qualification and applies it to daily duties. Understands the distinction between general and master PTWs", 
                    checkboxLabel: "Box 8"
                }, 
                "", 
                "CMS Qualification & System Access: Nominated by Superintendent/Manager and successfully completed the CMS classroom course. Has access to Pegasus and R3413 for qualifications checks.",
                <button onClick={() => window.open("#", "_blank")}>linke not working (LiF) </button>,  
                "Sign off", "comment section",
                                                {
                    type: "textWithCheckbox",
                    text: "Competent in conducting Weekly Contractor Performance Meetings, understanding their purpose, storage requirements, and proactively addressing issues by creating and completing required actions",  
                    checkboxLabel: "Box 9"
                },
                                                {
                    type: "textWithCheckbox",
                    text: "Understands the link between Contractor Performance Meetings and continuous improvement, recognising the importance of engaging with contractors to identify and address opportunities for enhancement", 
                    checkboxLabel: "Box 10"
                },
                                                {
                    type: "textWithCheckbox",
                    text: "Follows up on actions raised during Contractor Performance Meetings and engages with the Contract Management team for support or to escalate issues when needed", 
                    checkboxLabel: "Box 11"
                },
                "",
                "Form Review: Go through the form with an SME/Supervisor. Discuss key data points to present, including: DDM data Enablon actions Protrak inspections Safeday/CRM data Mentoring Session: Attend a meeting with an SME. Understand the meeting’s purpose, take notes, and help assign actions for improvement.", 
                
                    <button
                    onClick={() =>
                        window.open(
                        "mailto:RTIOResDevContractManagement@riotinto.com?subject=Contract Inquiry&body=Hello, I would like to discuss..."
                        )
                    }
                    >
                    Email Contract Management (LiF)
                    </button>,

                "Sign off", "comment section",
                                                                {
                    type: "textWithCheckbox",
                    text: "Monitors contractor compliance with Fatigue Management requirements, including: Roster management practices Understanding and application of the Fatigue Management Policy Note: This is essential for effective nightshift supervision.", 
                    checkboxLabel: "Box 12"
                },
                                                                {
                    type: "textWithCheckbox",
                    text: "Has read and can apply the Fatigue Management Policy, with a strong focus on nightshift operations.",  
                    checkboxLabel: "Box 13"
                },
                "",
                "",                  
                "Education – Fatigue Management Read and understand the Fatigue Management Policy. Apply the policy during nightshift operations. Perform relevant checks to ensure compliance.", 
                <button onClick={() => window.open("https://riotinto.sharepoint.com/sites/IODMSTemporaryPostProcessing3/OT_fnd_hse_BDT_hseq_mana_Managed_2/RTIO-HSE-0228064.pdf", "_blank")}>PERSONAL FATIGUE CHECKLIST</button>, 
                "Sign off", "comment section",
                                                                                {
                    type: "textWithCheckbox",
                    text: "Demonstrates understanding of the Contract Summary relevant to assigned projects, including key terms, deliverables, and contractor obligations.", 
                    checkboxLabel: "Box 14"
                },
                                                                {
                    type: "textWithCheckbox",
                    text: "Has access to and understands the Contract Summaries relevant to assigned projects, including key terms and obligations.",  
                    checkboxLabel: "Box 15"
                },
                                                            {
                    type: "textWithCheckbox",
                    text: "Has access to and understands Contract Summaries relevant to assigned projects. Can review and apply contract terms when required, including: Plod signing Mobilisation Active vs non-active rates Standby provisions",  
                    checkboxLabel: "Box 16"
                },              
                    "",
                "Exposure – Contract Management Team Understand the roles and responsibilities of the Contract Management (CM) team. Engage with CM team members to clarify contract terms when needed. Has access to contract summaries and can extract and apply relevant information to daily tasks. Receives mentoring from an SME or Supervisor to support learning and application.", 
                <button onClick={() => window.open("https://riotinto.sharepoint.com/sites/ResDevCMProcurement/Shared%20Documents/Forms/AllItems.aspx?id=%2Fsites%2FResDevCMProcurement%2FShared%20Documents%2FGeneral%2FContract%20Summary%2FPdf%20format%2FDrilling&viewid=337cff9e%2D0979%2D475e%2Daccb%2D51780618938a&csf=1&web=1&e=A6q104&clickparams=eyAiWC1BcHBOYW1lIiA6ICJNaWNyb3NvZnQgT3V0bG9vayIsICJYLUFwcFZlcnNpb24iIDogIjE2LjAuMTgyMjcuMjAyNDAiLCAiT1MiIDogIldpbmRvd3MiIH0%3D&CID=fca789a1%2D8047%2D8000%2D2c2d%2D829a4a429502&cidOR=SPO&FolderCTID=0x012000B13C0CCE7934D84DA7EFE315D3D96105", "_blank")}> ResDev CM & Procurement </button>, 
                "Sign off", "comment section",
        ]
        },
        contractor2: {
        title: "Contractor management level 2",
            cells: [
                "Skills/Responsibilities", "Sub Section 1", "Sub Section 2", "Sub Section 3",
                "Training Process", "Training Material", "Reviewer sign off", "Comments",
                    {
                    type: "textWithCheckbox",
                    text: "Understands the contractor mechanical inspection process and can perform equipment inspections relevant to site requirements", 
                    checkboxLabel: "Box 1"
                },
                {
                    type: "textWithCheckbox",
                    text: "Understands the 6-monthly inspection process. Can access Protrak Inspections, look up equipment, and is responsible for checking off outstanding items", 
                    checkboxLabel: "Box 2"
                },
                "",
                "",
                "Has access to Protrak Inspections. Receives mentoring from the Mechanical team/Supervisor on the 6-month inspection process, field checks, and data entry into Protrak", 
                <button onClick={() => window.open("#", "_blank")}>link not working </button>,
                "Sign off", 
                "comment section",

                {
                    type: "textWithCheckbox",
                    text: "Contributes to quarterly contractor meetings and leads weekly Sunday contractor performance discussions", 
                    checkboxLabel: "Box 3"
                },
                                {
                    type: "textWithCheckbox",
                    text: "Conducts contractor meetings, records minutes, and stores documentation in the shared drive",  
                    checkboxLabel: "Box 4"
                },
                                {
                    type: "textWithCheckbox",
                    text: "Presents contractor performance data, challenges non-conformance or poor performance, develops meaningful improvement actions, and ensures follow-up and close-out",  
                    checkboxLabel: "Box 5"
                },
                "",
                "Exposure: Receives mentoring on CMS weekly meetings and how they link to monthly meetings. Experience: Provides contractor feedback to the CM team for inclusion in monthly meetings.", 
                    <button
                    onClick={() =>
                        window.open(
                        "mailto:RTIOResDevContractManagement@riotinto.com?subject=Contract Inquiry&body=Hello, I would like to discuss..."
                        )
                    }
                    >
                    Email Contract Management (LiF)
                    </button>,

                "Sign off", "comment section",
        ]
        },
        contractor3: {
        title: "Contractor management level 3",
            cells: [
                "Skills/Responsibilities", "Sub Section 1", "Sub Section 2", "Sub Section 3",
                "Training Process", "Training Material", "Reviewer sign off", "Comments",
                    {
                    type: "textWithCheckbox",
                    text: "Complete Radiation Source Notifications as required", 
                    checkboxLabel: "Box 1"
                },
                {
                    type: "textWithCheckbox",
                    text: "Identify local RSO, request Geophysics contractor to compile documents, submit for assessment and register update", 
                    checkboxLabel: "Box 2"
                },
                {
                    type: "textWithCheckbox",
                    text: "Manage truck movements (remove from register), support in-field verification and assurance with Radiation Source Champion", 
                    checkboxLabel: "Box 3"
                },
                "",
                "Exposure through mentoring by SME/Supervisor on RSO contacts, required documentation, and managing vehicle movements", 
                <button onClick={() => window.open("https://riotinto.sharepoint.com/sites/IODMSTemporaryPostProcessing/OT_fnd_hse_BDT_hseq_contr_1/RTIO-HSE-0135314.docx", "_blank")}>Radiation Management Guidance Note </button>, 
                "Sign off", 
                "comment section",

                {
                    type: "textWithCheckbox",
                    text: "Manage entry of personnel and equipment to site (Equipment Authorisation, Registers, Weed & Seed checks)", 
                    checkboxLabel: "Box 4"
                },
                                {
                    type: "textWithCheckbox",
                    text: "Conduct RTIO checks with Cat 3 contractor supervisor, set realistic timeframes for fixes, enter into Protrak, and close out",  
                    checkboxLabel: "Box 5"
                },
                "",
                "",
                "Education: Know where to find the Weed & Seed form (Safeday). Exposure: SME mentoring on effective and thorough Weed & Seed checks on site", 
                <button onClick={() => window.open("https://safeday.app/", "_blank")}>Safeday</button>, 
                "Sign off", "comment section",

                                    {
                    type: "textWithCheckbox",
                    text: "Understand and manage the ICP inspection process for pressure vessels", 
                    checkboxLabel: "Box 6"
                },
                {
                    type: "textWithCheckbox",
                    text: "Understand inspection requirements for pressure vessels entering mine lease; coordinate with mine or Stat Supervisors to manage process", 
                    checkboxLabel: "Box 7"
                },
                {
                    type: "textWithCheckbox",
                    text: "Manage rig movements and remove from site register as required", 
                    checkboxLabel: "Box 8"
                },
                "",
                "Exposure through SME/Supervisor mentoring on ICP contacts, required documentation, managing pressure vessels onsite, field assurance activities, and CCVS checks", 
                <button onClick={() => window.open("https://id.riotinto.forwoodsafety.com/?redirect_uri=https://verification.riotinto.forwoodsafety.com", "_blank")}>Forwood Safety </button>, 
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

export default ContractorPop;
