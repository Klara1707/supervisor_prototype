
import "./Pop.css";
import { useState } from "react";

const LeadershipPop = ({ popupId, closePopup }) => {
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
        leadership1: {
            title: "leadership Popup 1 Content",
            cells: [
                "Skills/Responsibilities", "Sub Section 1", "Sub Section 2", "Sub Section 3",
                "Training Process", "Training Material", "Reviewer sign off", "Comments",
                    {
                    type: "textWithCheckbox",
                    text: "Proficient in using RTIO Leadership Coaching (PowerApps) to record all LIF interactions", 
                    checkboxLabel: "Box 1"
                },
                {
                    type: "textWithCheckbox",
                    text: "Skilled in completing LIF interaction forms with detailed input, including clear descriptions of WWW (What Went Well) and EBI (Even Better If), along with thoughtful reflection", 
                    checkboxLabel: "Box 2"
                },
                "", 
                "", 
                "Tips: The RTIO Leadership Coaching App contains excellent resources to support QSI, coaching, and more. Exposure: SME: Demonstrates where to access PowerApps. Superintendent: Provides mentoring on how to complete forms, including the level of detail required.", 
                "", 
                "Sign off", 
                "comment section",

                {
                    type: "textWithCheckbox",
                    text: "Facilitates effective PSI meetings, ensuring clear communication, engagement, and follow-up on safety and operational actions", 
                    checkboxLabel: "Box 3"
                },
                                {
                    type: "textWithCheckbox",
                    text: "Can facilitate a PSI by following the PSI board cadence and effectively leading discussions on daily hazards and controls",  
                    checkboxLabel: "Box 4"
                },
                {
                    type: "textWithCheckbox",
                    text: "Can facilitate a PSI by following the PSI board cadence and effectively leading discussions on daily hazards and controls", 
                    checkboxLabel: "Box 5"
                },
                "",
                "Education – Watch how-to videos and learn what makes a strong PSI", 
                "", 
                "Sign off", "comment section",
                                                {
                    type: "textWithCheckbox",
                    text: "Leads effective meetings and communications across all LIF activities (CRM, PTHA, QSI, SPOTLIGHT)", 
                    checkboxLabel: "Box 6"
                },
                                                {
                    type: "textWithCheckbox",
                    text: "Understands each activity’s purpose, the LIF playback intent, and communicates their LIF involvement clearly in meetings", 
                    checkboxLabel: "Box 7"
                },
                                                {
                    type: "textWithCheckbox",
                    text: "Provides effective, positive coaching and feedback during interactions, and confirms controls are in place", 
                    checkboxLabel: "Box 8"
                },
                                            {
                    type: "textWithCheckbox",
                    text: "Can give coaching and feedback in the interaction effectively and positively. Uses - QSI methods and techniques effectively. ", 
                    checkboxLabel: "Box 9"
                },
                "Education Watch how-to videos. Understand effective LIF interactions. Complete QSI training. Exposure: SME/Super/Supt: Provide ongoing coaching on LIF and playback. Verify task controls during LIF activities.",
                "", 
                "Sign off", "comment section",
                                                {
                    type: "textWithCheckbox",
                    text: "Competent in accessing and updating Check-Ins through the relevant platform Able to view and edit personal P6 Objectives to reflect current goals and development focus",  
                    checkboxLabel: "Box 10"
                },
                                                {
                    type: "textWithCheckbox",
                    text: "needs checking", 
                    checkboxLabel: "Box 11"
                },
                                                {
                    type: "textWithCheckbox",
                    text: "Demonstrates the ability to accurately enter objectives and understands the various types and their intended outcomes. Proactively follows up on assigned actions and ensures they are fully completed and closed out.", 
                    checkboxLabel: "Box 12"
                },
                "",
                "Provides mentorship to SMEs and Supervisors on effective objective setting, emphasizing the use of SMART and measurable objectives. Guides others in developing achievable actions and supports them in aligning objectives with desired outcomes", 

                "",
                "Sign off", "comment section",
                                                                {
                    type: "textWithCheckbox",
                    text: "Demonstrates competence in accessing, creating, and editing their Development Plan using the designated platform", 
                    checkboxLabel: "Box 13"
                },
                                                                {
                    type: "textWithCheckbox",
                    text: "Effectively navigates the designated platform to access, create, and update their Development Plan with confidence and accuracy",  
                    checkboxLabel: "Box 14"
                },
                                                                {
                    type: "textWithCheckbox",
                    text: "Takes ownership of personal development by actively driving progress, following up on assigned actions, reporting updates during check-ins, and ensuring objectives are completed ahead of their due dates",  
                    checkboxLabel: "Box 15"
                },
                "",                         
                "Provides guidance and mentorship to SMEs and Supervisors on effective objective setting, with a focus on developing SMART and measurable objectives. Supports others in creating realistic, achievable actions that align with performance and development goals", 

                "",
                "Sign off", "comment section",
            ]
        },
        
            
        leadership2: {
            title: "Leadership Popup 2 Content",
            cells: [
                "Skills/Responsibilities", "Sub Section 1", "Sub Section 2", "Sub Section 3",
                "Training Process", "Training Material", "Reviewer sign off", "Comments",
                    {
                    type: "textWithCheckbox",
                    text: "Builds effective relationships with site stakeholders and actively participates in key meetings (e.g., PMO, MTS, SusCap)", 
                    checkboxLabel: "Box 1"
                },
                {
                    type: "textWithCheckbox",
                    text: "Takes ownership of in-pit programs by building key contacts, presenting drilling designs, negotiating pit windows with MTS and Production, and aligning with the 2-week plan", 
                    checkboxLabel: "Box 2"
                },
                {
                    type: "textWithCheckbox",
                    text: "Can assess the D+B plod, negotiate access with MTS and D+B Supervisor, and review the monthly production plan to forecast pit windows", 
                    checkboxLabel: "Box 3"
                },
                {
                    type: "textWithCheckbox",
                    text: "Fully familiar with all Mine Operations stakeholders; able to present drilling plans and negotiate pit windows months in advance", 
                    checkboxLabel: "Box 4"
                },
                "Tip & Exposure – Request access to MTS 2-week planning meetings and distribution lists. Follow up all MTS discussions with emails to support execution and track agreements. Identify key MTS engineers and their preferred communication style, and commit to regular engagement. Attend meetings prepared, review pre-reads, and align your work with PMO activities. Use the 2-week plan to spot opportunities between production milestones", 
                "", 
                "Sign off", 
                "comment section",

                {
                    type: "textWithCheckbox",
                    text: "Identifies and supports department recognition initiatives, such as Rockstar", 
                    checkboxLabel: "Box 5"
                },
                                {
                    type: "textWithCheckbox",
                    text: "Identifies potential Rockstar nominees using the Rockstar website, provides detailed justification to the approver, and supports recognition with evidence of achievements",  
                    checkboxLabel: "Box 6"
                },
                "",
                "",
                "Reads and understands the Recognition Guidelines and Tips to support effective nominations", 
                "", 
                "Sign off", "comment section",
            ]
        },
        leadership3: {
            title: "Leadership Popup 3 Content",
            cells: [
                "Skills/Responsibilities", "Sub Section 1", "Sub Section 2", "Sub Section 3",
                "Training Process", "Training Material", "Reviewer sign off", "Comments",
                    {
                    type: "textWithCheckbox",
                    text: "Provides LIF coaching to Contract Partner Supervisors to support quality safety interactions", 
                    checkboxLabel: "Box 1"
                },
                {
                    type: "textWithCheckbox",
                    text: "Schedules LIF coaching in meetings, delivers coaching aligned with QSI and LIF training guidelines, and encourages Contract Partners to use LIF prompts when recounting daily activities", 
                    checkboxLabel: "Box 2"
                },
                {
                    type: "textWithCheckbox",
                    text: "Follows up on coaching EBI and actions, maintaining vigilance over the quality of LIF interactions", 
                    checkboxLabel: "Box 3"
                },
                "", 
                "Uses the Go Look See function to pre-arrange coaching with peers. Observes multiple interactions and engages in open discussions to understand intent, observations, and communication style. Once confident, seeks permission to provide feedback and uses open questions to encourage honest reflection. Shares observations to support improvement or celebrate success", 
                "", 
                "Sign off", 
                "comment section",

                {
                    type: "textWithCheckbox",
                    text: "Facilitates effective LiF meetings, ensuring clear communication, issue tracking, and action follow-up", 
                    checkboxLabel: "Box 4"
                },
                                {
                    type: "textWithCheckbox",
                    text: "Full understanding of all DDM/LiF meeting sections. Actively covers each area, drives discussion, takes actions, and follows up on progress",  
                    checkboxLabel: "Box 5"
                },
                "",
                "",
                "Exposure: Facilitate a LiF meeting with your Superintendent. Request feedback to support development", 
                "", 
                "Sign off", "comment section",
                                                {
                    type: "textWithCheckbox",
                    text: "Coach and support other Supervisors within your SME area", 
                    checkboxLabel: "Box 6"
                },
                                                {
                    type: "textWithCheckbox",
                    text: "Earthworks: Mentor other Supervisors on operating conditions and methods. Field Supervisor: Share SME experience and mentor others in high-risk work. Hydro: Mentor others in CMS processes. RC/Diamond: Mentor others in CMS processes", 
                    checkboxLabel: "Box 7"
                },
                "", 
                "", 
                "Offer to buddy a new starter Supervisor. Share a process you're confident with during a 2:1 or Sunday Funday meeting. Demonstrate expertise by providing direct, supportive leadership to a peer. Identify a missing How-To video and create it for team sharing.",
                "", 
                "Sign off", "comment section",
                                                {
                    type: "textWithCheckbox",
                    text: "Participate in developing productivity improvements through observation, feedback, and process enhancement",  
                    checkboxLabel: "Box 8"
                },
                                                {
                    type: "textWithCheckbox",
                    text: "Identify improvement opportunities within your work scope and systems used", 
                    checkboxLabel: "Box 9"
                },
                                                {
                    type: "textWithCheckbox",
                    text: "Assess data to identify improvement opportunities and implement actions to drive results", 
                    checkboxLabel: "Box 10"
                },
                "",
                "", 
                "", 
                "Sign off", "comment section",
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

export default LeadershipPop;