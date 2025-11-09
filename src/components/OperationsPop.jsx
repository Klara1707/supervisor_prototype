import "./Pop.css";
import { useState } from "react";

const OperationsPop = ({ popupId, closePopup }) => {
    if (!popupId) return null;

    const [comment, setComment] = useState("");
    const [signOffDate, setSignOffDate] = useState("");
    const [signOffName, setSignOffName] = useState("");
    const checkboxItems = [
        "Box 1", "Box 2", "Box 3", "Box 4", "Box 5", "Box 6",
        "Box 7", "Box 8", "Box 9", "Box 10", "Box 11", "Box 12",
        "Box 13", "Box 14", "Box 15", "Box 16", "Box 17", "Box 18", 
        "Box 19", "Box 20", "Box 21", "Box 22", "Box 23", "Box 24", "Box 25", "Box 26",
        "Box 27", "Box 28", "Box 29", "Box 30", "Box 31", "Box 32", 
        "Box 33", "Box 34", "Box 35",
    ];
    const [progressChecks, setProgressChecks] = useState(Array(checkboxItems.length).fill(false));

    const contentMap = {
        operations1: {
            title: "operations Popup 1 Content",
            cells: [
                "Skills/Responsibilities", "Sub Section 1", "Sub Section 2", "Sub Section 3",
                "Training Process", "Training Material", "Reviewer sign off", "Comments",
                    {
                    type: "textWithCheckbox",
                    text: "Monitor production status in your area and update DDM daily with values and relevant comments", 
                    checkboxLabel: "Box 1"
                },
                {
                    type: "textWithCheckbox",
                    text: "Accurately enters data from plods into DDM with detailed comments. Understands weekly targets, including drilling meters, pads completed, rehab hectares, and bores drilled", 
                    checkboxLabel: "Box 2"
                },
                    {
                    type: "textWithCheckbox",
                    text: "Understands the importance of reporting standby and downtime, and actively contributes to identifying solutions to reduce it", 
                    checkboxLabel: "Box 1"
                },
                {
                    type: "textWithCheckbox",
                    text: "Delivers Monday updates to leader, covering weekly target achievement, current priorities, and the two-week forward plan", 
                    checkboxLabel: "Box 2"
                },
                "Exposure: Mentored by SME/Supervisor in accessing key data sources (plods, tracking sheets, Protrak, State of Play). Developed accuracy in data entry, detailed standby/downtime comments, and confidence in presenting weekly data to Superintendent in Monday review meetings", 
                "", 
                "Sign off", 
                "comment section",

                {
                    type: "textWithCheckbox",
                    text: "Manages own flight and accommodation bookings; supports contractor travel arrangements as needed", 
                    checkboxLabel: "Box 3"
                },
                                {
                    type: "textWithCheckbox",
                    text: "Proficient in PALMS",  
                    checkboxLabel: "Box 4"
                },
                "",
                "",
                "Education – Watch how-to videos and learn what makes a strong PSI", 
                "", 
                "Sign off", "comment section",
                                                {
                    type: "textWithCheckbox",
                    text: "Competent in using State of Play to manage projects and understands how data is captured and reported", 
                    checkboxLabel: "Box 6"
                },
                                                {
                    type: "textWithCheckbox",
                    text: "Uses State of Play data to report on drilling and earthworks progress, and to forecast production rates for work completion", 
                    checkboxLabel: "Box 7"
                },
                "", 
                "", 
                "Exposure: Supported by SME/Supervisor to gain access and receive guidance on using State of Play, including how to interpret and assess data effectively",
                "", 
                "Sign off", "comment section",
                                                {
                    type: "textWithCheckbox",
                    text: "Competent in using Weatherguard to monitor weather events, with a clear understanding of the lightning procedure and associated responsibilities",  
                    checkboxLabel: "Box 10"
                },
                                                {
                    type: "textWithCheckbox",
                    text: "Monitors Weatherguard during lightning activity and promptly reports to the Project Leader for shutdown recommendations", 
                    checkboxLabel: "Box 11"
                },
                "",
                "",
                "Exposure: Shown how to log in and use Weatherguard to track lightning and receive weather alerts", 
                "",
                "Sign off", "comment section",
                                                                {
                    type: "textWithCheckbox",
                    text: "Competent in the SWAT process, including creation, completion, and handover of tasks", 
                    checkboxLabel: "Box 13"
                },
                                                                {
                    type: "textWithCheckbox",
                    text: "Understands the pad approval process: pads are constructed, checked by Cat 3 and Drilling Supervisors, rework is flagged if needed, and once signed off by all parties, the pad is handed over to Geos for Protrak status update",  
                    checkboxLabel: "Box 14"
                },
                                                                {
                    type: "textWithCheckbox",
                    text: "Able to gather all required data for a SWAT, including drill designs, MMPK maps, survey confirmations, water and fuel sources, radio channels, and heritage delineation",  
                    checkboxLabel: "Box 15"
                },
                                                                                {
                    type: "textWithCheckbox",
                    text: "Completes SWAT by ensuring all pads are checked, paperwork is signed, rework is organised, data is verified, and all stakeholders are informed via email",  
                    checkboxLabel: "Box 15"
                },                     
                "Exposure: Mentored by SME/Supervisor on compiling all relevant pad data for SWATs, including field-based guidance on pad checks. Shadowed during stakeholder communications to ensure accuracy of checks and completeness of data before submission", 

                "",
                "Sign off", "comment section",
                                                                                {
                    type: "textWithCheckbox",
                    text: "Has detailed knowledge of the RTIO Fitness for Work Policy and can confidently apply it in day-to-day operations.", 
                    checkboxLabel: "Box 13"
                },
                                                                {
                    type: "textWithCheckbox",
                    text: "Has read and understands the RTIO Fitness for Work Policy, and applies it to ensure their own safety and wellbeing, particularly during high-risk activities such as nightshift work",  
                    checkboxLabel: "Box 14"
                },
                    "",                  
                    "",
                "Has read, understands, and applies the RTIO Fitness for Work Policy.", 

                "",
                "Sign off", "comment section",
                                                                                {
                    type: "textWithCheckbox",
                    text: "Has detailed knowledge of the RTIO AOD Policy and applies it appropriately to ensure personal safety and compliance with site requirements", 
                    checkboxLabel: "Box 13"
                },
                                                                {
                    type: "textWithCheckbox",
                    text: "Has read and understands the RTIO AOD Policy, and applies it to support their own safety and wellbeing",  
                    checkboxLabel: "Box 14"
                },
                                                                {
                    type: "textWithCheckbox",
                    text: "Understands and can apply the correct process for managing a non-negative Alcohol and Other Drugs (AOD) result, including adherence to confidentiality protocols",  
                    checkboxLabel: "Box 15"
                },
                "",
                "Education – AOD Policy Has read, understands, and applies the RTIO Alcohol and Other Drugs (AOD) Policy Applies the policy to support personal safety and wellbeing Exposure – AOD Policy Application Shadowed by an SME or Supervisor to ensure correct application of the policy Understands and follows the process for managing non-negative results Maintains confidentiality in line with policy protocols", 

                "",
                "Sign off", "comment section",
                                                                                {
                    type: "textWithCheckbox",
                    text: "Competent in maintaining the currency of own qualifications, including proactively booking and managing both internal and external training courses", 
                    checkboxLabel: "Box 13"
                },
                                                                {
                    type: "textWithCheckbox",
                    text: "Competent in maintaining the currency of own qualifications Proactively books internal and external training courses Can access and navigate their training and qualification profile in Prospect",  
                    checkboxLabel: "Box 14"
                },
                                                                {
                    type: "textWithCheckbox",
                    text: "Understands the minimum training requirements for their role Recognises the importance of maintaining current qualifications Understands how individual compliance contributes to the department’s collective Licence to Operate",  
                    checkboxLabel: "Box 15"
                },
                "",                     
                "Exposure – My Learning in Prospect Shown how to access My Learning in Prospect Understands the importance of keeping qualifications current Learns how to search for and book internal courses using the My Learning platform Guided by an SME or Supervisor during the process", 

                "",
                "Sign off", "comment section",
                                                                                {
                    type: "textWithCheckbox",
                    text: "Competent in using the Res Dev Roster for scheduling and shift management Able to submit leave requests via Workday or WorkPac as appropriate", 
                    checkboxLabel: "Box 13"
                },
                                                                {
                    type: "textWithCheckbox",
                    text: "Can access the Res Dev Roster and Workday systems Able to enter and manage leave requests independently",  
                    checkboxLabel: "Box 14"
                },
                                                                {
                    type: "textWithCheckbox",
                    text: "Has a good understanding of the different types of leave available and how each is applied in line with company policies and procedures",  
                    checkboxLabel: "Box 15"
                },
                "",
                "Has access to Workday and the Res Dev Roster Shown how to enter leave and navigate the Workday system All leave types and their applications are explained Guided by an SME or Supervisor during the process", 

                "",
                "Sign off", "comment section",
            ]
        },
        operations2: {
            title: "operations Popup 2 Content",
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
        operations3: {
            title: "operations Popup 3 Content",
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
                {cells.map((cellContent, index) => {
                    // Handle text with checkbox
                    if (typeof cellContent === "object" && cellContent.type === "textWithCheckbox") {
                        const checkboxIndex = checkboxItems.indexOf(cellContent.checkboxLabel);
                        return (
                            <div key={index} className="grid-item">
                                <p>{cellContent.text}</p>
                                <label className="custom-checkbox">
                                    <span className="sr-only">{cellContent.checkboxLabel}</span>
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

                    // Handle standalone checkbox (no visible label)
                    if (checkboxItems.includes(cellContent)) {
                        const checkboxIndex = checkboxItems.indexOf(cellContent);
                        return (
                            <div key={index} className="grid-item">
                                <label className="custom-checkbox">
                                    <span className="sr-only">{cellContent}</span>
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

                    // Comment section
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

                    // Sign-off section
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

                    // Default: plain text
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

export default OperationsPop;
