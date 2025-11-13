
import "./Pop.css";
import { useState } from "react";

const EarthworksPop = ({ popupId, closePopup }) => {
    const [comment, setComment] = useState("");
    const [signOffDate, setSignOffDate] = useState("");
    const [signOffName, setSignOffName] = useState("");
    const checkboxItems = [
        "Box 1", "Box 2", "Box 3", "Box 4", "Box 5", "Box 6",
        "Box 7", "Box 8", "Box 9", "Box 10", "Box 11", "Box 12",
        "Box 13", "Box 14", "Box 15", "Box 16", "Box 17", "Box 18",
        "Box 19", "Box 20", "Box 21", "Box 22", "Box 23", "Box 24",
        "Box 25", "Box 26", "Box 27", "Box 28", "Box 29", "Box 30",
        "Box 31", "Box 32", "Box 33", "Box 34", "Box 35", "Box 36",
    ];
    const [progressChecks, setProgressChecks] = useState(Array(checkboxItems.length).fill(false));

    if (!popupId) return null;

    const contentMap = {
        earthworks1: {
            title: "Earthworks level 1",
            title: "Operations level 1",
            cells: [
                "Skills/Responsibilities", "Sub Section 1", "Sub Section 2", "Sub Section 3",
                "Training Process", "Training Material", "Reviewer sign off", "Comments",
                    {
                    type: "textWithCheckbox",
                    text: "Maintain accurate Daily Log and Pad Tracking Sheets", 
                    checkboxLabel: "Box 1"
                },
                {
                    type: "textWithCheckbox",
                    text: "Understands the importance of accurate data entry and ensures error-free reporting", 
                    checkboxLabel: "Box 2"
                },
                    {
                    type: "textWithCheckbox",
                    text: "Extracts data from sheets accurately for effective reporting", 
                    checkboxLabel: "Box 3"
                },
                "",
                "Mentoring from Earthworks SME on data entry, State of Play usage, how data links to State of Play, and extracting data for reporting", 
                <button onClick={() => window.open("https://rtio.maps.arcgis.com/sharing/oauth2/authorize?client_id=dashboards&response_type=code&state=%7B%22portalUrl%22%3A%22https%3A%2F%2Frtio.maps.arcgis.com%22%2C%22uid%22%3A%22dsxnQswsXbQzFiBhD5GkOmfhHMtmMDu3kZ1X1iVY_Fs%22%7D&expiration=20160&locale=en&redirect_uri=https%3A%2F%2Frtio.maps.arcgis.com%2Fapps%2Fdashboards%2F3c264ff5b63d4738944ea0d47f2ea2ac&redirectToUserOrgUrl=true&code_challenge=It5IQsTNcZ0_wfgxCf1qRB2qQ4rqjE62FFZT17ERePo&code_challenge_method=S256", "_blank")}>ArcGIS log in</button>,
                "Sign off", 
                "comment section",

                {
                    type: "textWithCheckbox",
                    text: "Understands pad and track construction guidelines, including approved designs", 
                    checkboxLabel: "Box 4"
                },
                                {
                    type: "textWithCheckbox",
                    text: "Understands Earthworks guidelines for pad and track creation. Applies construction methods in the field, verifies compliance, and differentiates pad sizes",  
                    checkboxLabel: "Box 5"
                },
                                {
                    type: "textWithCheckbox",
                    text: "Provides accurate guidance on pad and track construction in the field, demonstrating a strong understanding of clearance mechanisms and the implications of non-compliance with established guidelines",  
                    checkboxLabel: "Box 6"
                },
                "",
                "Gained exposure through mentoring by SMEs, EW Advisors, and Supervisors on pad creation guidelines, including understanding the appropriate pad sizes for various drilling methods. Received guidance from SMEs on clearance levels for ARs and how these are tracked and managed", 
                "", 
                "Sign off", "comment section",
                                                {
                    type: "textWithCheckbox",
                    text: "Demonstrates an understanding of rehabilitation operations, including the verification of completed work to ensure compliance with environmental and operational standards", 
                    checkboxLabel: "Box 7"
                },
                                                {
                    type: "textWithCheckbox",
                    text: "Has read the Earthworks Rehabilitation Manual and is able to apply rehabilitation methods effectively in the field. Verifies that procedures are being followed in accordance with the guidelines", 
                    checkboxLabel: "Box 8"
                },
                                                {
                    type: "textWithCheckbox",
                    text: "Provides accurate guidance on rehabilitation activities in the field, with a solid understanding of clearance mechanisms and the consequences of non-compliance with established guidelines", 
                    checkboxLabel: "Box 9"
                },
                                                {
                    type: "textWithCheckbox",
                    text: "Verifies that rehabilitation is being conducted in accordance with established guidelines, including performing 10% pad verification checks, capturing photographic evidence, and reporting findings to ensure compliance", 
                    checkboxLabel: "Box 10"
                },
                "Education: Has read the Earthworks Rehabilitation Manual and understands how rehabilitation methods are applied in the field. Exposure: Received mentoring from Subject Matter Experts (SMEs) on rehabilitation quality standards. Conducts field checks to assess rehabilitation quality and ensures implementation aligns with established guidelines.",
                <button onClick={() => window.open("https://riotinto.sharepoint.com/sites/IODMSAssetDevelopment/Resource_Development_1/RTIO-0994910.docx", "_blank")}>Operations Rehabilitation Manual</button>,
                "Sign off", "comment section",
            ]
        },
        earthworks2: {
            title: "Earthworks level 2",
            cells: [
                "Skills/Responsibilities", "Sub Section 1", "Sub Section 2", "Sub Section 3",
                "Training Process", "Training Material", "Reviewer sign off", "Comments",
                    {
                    type: "textWithCheckbox",
                    text: "Understands the ResDev Rehabilitation Standard and its application in field activities", 
                    checkboxLabel: "Box 1"
                },
                {
                    type: "textWithCheckbox",
                    text: "Reads and understands the Operations Rehabilitation Manual", 
                    checkboxLabel: "Box 2"
                },
                    {
                    type: "textWithCheckbox",
                    text: "Understands rehabilitation obligations and standards, including relevant guidelines and expectations", 
                    checkboxLabel: "Box 3"
                },
                "",
                "Education & Exposure – Reads the Rehabilitation Manual and understands its field application. Mentored by SME on rehab quality, conducts field checks, and applies guidelines effectively", 
                <button onClick={() => window.open("https://riotinto.sharepoint.com/sites/IODMSAssetDevelopment/Resource_Development_1/RTIO-0994910.docx", "_blank")}>Operations Rehabilitation Manual </button>, 
                "Sign off", 
                "comment section",

                {
                    type: "textWithCheckbox",
                    text: "Competent in requesting and managing HME float movements, understanding the process and stakeholder coordination involved", 
                    checkboxLabel: "Box 4"
                },
                                {
                    type: "textWithCheckbox",
                    text: "Communicates with float driver/company, completes float requests accurately with pickup/drop-off maps, and assesses site suitability for safe turnaround and travel",  
                    checkboxLabel: "Box 5"
                },
                "",
                "",
                "Exposure – Mentored by SME on completing float requests, reviewing maps, and assessing safe drop-off points", 
                "", 
                "Sign off", "comment section",
                                                {
                    type: "textWithCheckbox",
                    text: "Manages pad and track construction according to approved designs and guidelines, ensuring clearing limits are adhered to within the designated work area", 
                    checkboxLabel: "Box 6"
                },
                                                {
                    type: "textWithCheckbox",
                    text: "Assesses pad size and clearance against standards (10% RTIO, 100% Cat 3) and reports any non-compliance with clearing rules", 
                    checkboxLabel: "Box 7"
                },
                                                {
                    type: "textWithCheckbox",
                    text: "Tracks clearing allocations in ARs, engages DPC to confirm clearing levels, and monitors progress until pad construction is complete", 
                    checkboxLabel: "Box 8"
                },
                "", 
                "Exposure Receives mentoring from SME, EW Advisors, or Superintendent on pad creation guidelines. Ensures 10% of pads are checked in the field for size and quality. Learns how to assess clearance levels in ARs and track them using Power BI",
                <button onClick={() => window.open("https://app.powerbi.com/groups/me/reports/4cef7f55-df16-4258-bf36-4042e60cb348/ReportSection888e3990e95dc23e38b9?ctid=4341df80-fbe6-41bf-89b0-e6e2379c9c23&experience=power-bi", "_blank")}>Ground disturbance power BI </button>, 
                "Sign off", "comment section",

                                                                {
                    type: "textWithCheckbox",
                    text: "Competent in operating the Trimble SNS machine guidance system, including uploading data to HME and using all system functionalities", 
                    checkboxLabel: "Box 9"
                },
                                                {
                    type: "textWithCheckbox",
                    text: "Loads files onto USBs and Gen 3 screens, troubleshoots issues, and provides guidance on system usage", 
                    checkboxLabel: "Box 10"
                },
                                                {
                    type: "textWithCheckbox",
                    text: "Uses user guides to perform firmware updates confidently and accurately", 
                    checkboxLabel: "Box 11"
                },
                "", 
                "Exposure Receives mentoring from SME/Superintendent on loading files onto Gen 3 screens through demonstration. Firmware updates should only be performed under instruction from EW Advisors",
                <button onClick={() => window.open("https://riotinto.sharepoint.com/sites/rtioresourcedevelopment/Shared%20Documents/Forms/Technical%20Delivery.aspx?csf=1&e=DsGxoY&CID=a2610c92%2De1d0%2D43f3%2D8254%2Db1106436fdca&FolderCTID=0x01200003ED9D32C1E049409F18A09132200202&id=%2Fsites%2Frtioresourcedevelopment%2FShared%20Documents%2FOperations%20Team%2FTrimble%20SNS%2FSNS%20Training%20Videos", "_blank")}>Trimble </button>, 
                "Sign off", "comment section",
                                                                {
                    type: "textWithCheckbox",
                    text: "Understands when and how to engage the Survey Team and DPC, using the correct request formats and communication channels", 
                    checkboxLabel: "Box 12"
                },
                                                {
                    type: "textWithCheckbox",
                    text: "Understands when and how to engage the Survey Team and DPC, using the correct request formats and communication channels", 
                    checkboxLabel: "Box 13"
                },
                                                {
                    type: "textWithCheckbox",
                    text: "Understands when survey work is required and what it involves — including pad set-out, pad and collar pickups, and boundary flagging", 
                    checkboxLabel: "Box 14"
                },
                "", 
                "Gains exposure through SME mentoring on survey work. Knows how to use the DPC online form to request survey tasks and understands the earthworks checks required before requesting — e.g., confirming pad readiness",
                <button onClick={() => window.open("https://forms.office.com/pages/responsepage.aspx?id=gN9BQ-b7v0GJsObiN5ycIydsMwh41zlPvpcVJiWbXiJUQThVODdCWklPVjY4TzhLTzAwVzRaT0lCVSQlQCN0PWcu&route=shorturl", "_blank")}>Survey work requests</button>,
                "Sign off", "comment section",
            ]
        },
        earthworks3: {
            title: "Earthworks level 3",
            cells: [
                "Skills/Responsibilities", "Sub Section 1", "Sub Section 2", "Sub Section 3",
                "Training Process", "Training Material", "Reviewer sign off", "Comments",
                    {
                    type: "textWithCheckbox",
                    text: "Understand earthwork machinery capabilities and limitations. Plan and manage tasks using SME knowledge", 
                    checkboxLabel: "Box 1"
                },
                {
                    type: "textWithCheckbox",
                    text: "Provide guidance on machine allocation and assess ground conditions to inform planning", 
                    checkboxLabel: "Box 2"
                },
                    {
                    type: "textWithCheckbox",
                    text: "Instruct operators on pad and track building methods. Use machinery effectively to achieve optimal results", 
                    checkboxLabel: "Box 3"
                },
                "",
                "Receive mentoring from SME/EW Advisor on machine capability, infield direction, and best practices for pad and track construction. Pass-out expected within 12 months", 
                "No training material exists. To close out this topic the candidate will have to be mentored and coached by an earthworks SME. ", 
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

export default EarthworksPop;
