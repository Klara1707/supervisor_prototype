
import "./Pop.css";
import { useState } from "react";

const FieldPop = ({ popupId, closePopup }) => {
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
        field1: {
            title: "Field supervisor level 1",
            cells: [
                "Skills/Responsibilities", "Sub Section 1", "Sub Section 2", "Sub Section 3",
                "Training Process", "Training Material", "Reviewer sign off", "Comments",
                    {
                    type: "textWithCheckbox",
                    text: "Possesses detailed knowledge of the roles and responsibilities of Field Assistants, Survey Assistants, and Hydro Technicians, including their contributions to drilling operations, data collection, and site safety", 
                    checkboxLabel: "Box 1"
                },
                {
                    type: "textWithCheckbox",
                    text: "Possesses comprehensive knowledge of all tasks associated with the role and is capable of providing mentorship and subject matter expertise across all responsibilities", 
                    checkboxLabel: "Box 2"
                },
                    {
                    type: "textWithCheckbox",
                    text: "Demonstrates the ability to effectively plan and schedule daily tasks and movements, ensuring timely follow-up and completion within expected timeframes", 
                    checkboxLabel: "Box 3"
                },
                "",
                "Education Review and understand the role description, including key accountabilities, safety responsibilities, and performance expectations. Gain clarity on role-specific responsibilities through discussion with supervisors and reference to relevant procedures and standards. Exposure Receive hands-on training from a Subject Matter Expert (SME) or Supervisor with experience in field operations, hydro-tech, or survey. Understand work priorities and field expectations through guided instruction and real-time feedback. Shadow an experienced Field Supervisor to observe best practices in task planning, team coordination, and field execution.", 
                "", 
                "Sign off", 
                "comment section",
            ]
        },
        field2: {
            title: "Field supervisor level 2",
            cells: [
                "Skills/Responsibilities", "Sub Section 1", "Sub Section 2", "Sub Section 3",
                "Training Process", "Training Material", "Reviewer sign off", "Comments",
                    {
                    type: "textWithCheckbox",
                    text: "Understanding High-Risk Work Licence Requirements and Application Familiar with the requirements and practical application of High-Risk Work Licences relevant to Field Assistants, Survey Assistants, and Hydro Technicians, ensuring compliance with task-specific safety and regulatory standards.", 
                    checkboxLabel: "Box 1"
                },
                {
                    type: "textWithCheckbox",
                    text: "Monitor licence expiry for all personnel under your supervision. Maintain a current register of licence details to ensure compliance. Provide SME guidance on licence requirements, usage protocols, and site-specific VOC (Verification of Competency) processes. Support field readiness by ensuring all high-risk tasks are performed by qualified and verified individuals.", 
                    checkboxLabel: "Box 2"
                },
                "",
                "",
                "Training: Receive guidance from SMEs or Superintendents on high-risk licence requirements and site protocols. Document Management: Develop a method for tracking and securely storing licence and VOC documentation. Compliance Monitoring: Learn how to report and monitor VOC completion to ensure ongoing compliance with site standards.", 
                "", 
                "Sign off", 
                "comment section",


                    {
                    type: "textWithCheckbox",
                    text: "Sets and reviews development goals with team members to support growth and performance", 
                    checkboxLabel: "Box 3"
                },
                {
                    type: "textWithCheckbox",
                    text: "Sets SMART objectives aligned with role duties and achievable within a realistic timeframe", 
                    checkboxLabel: "Box 4"
                },
                    {
                    type: "textWithCheckbox",
                    text: "Follows up on development goals during check-ins, encouraging team members to own their growth", 
                    checkboxLabel: "Box 5"
                },
                "",
                "Education Understands role expectations by reviewing the role description. Exposure: Collaborates with Superintendent in meetings to define clear, measurable development actions and check-in plans aligned to the role.", 
                <button onClick={() => window.open("https://wd3.myworkday.com/riotinto/d/home.htmld", "_blank")}>Workday </button>, 
                "Sign off", 
                "comment section",

                    {
                    type: "textWithCheckbox",
                    text: "Regularly assess performance during check-ins, providing constructive feedback", 
                    checkboxLabel: "Box 6"
                },
                {
                    type: "textWithCheckbox",
                    text: "Sets clear, achievable objectives aligned with business needs and role responsibilities", 
                    checkboxLabel: "Box 7"
                },
                    {
                    type: "textWithCheckbox",
                    text: "Challenges team members to own their development, offers constructive feedback (EBI), and encourages evidence of progress toward objectives", 
                    checkboxLabel: "Box 8"
                },
                "",
                "Education Reads the role description to understand responsibilities and expectations. Exposure Meets with Superintendent to discuss P6 and define specific, measurable check-in actions aligned to the role description", 
                "", 
                "Sign off", 
                "comment section",

                                "Skills/Responsibilities", "Sub Section 1", "Sub Section 2", "Sub Section 3",
                "Training Process", "Training Material", "Reviewer sign off", "Comments",
                    {
                    type: "textWithCheckbox",
                    text: "Coaches and mentors team members to support growth and success in their role", 
                    checkboxLabel: "Box 9"
                },
                {
                    type: "textWithCheckbox",
                    text: "Mentors field assistants in task prioritization, use of RTIO safety tools, operational discipline, and reporting compliance issues", 
                    checkboxLabel: "Box 10"
                },
                "",
                "",
                "Education: Reads the role description and relevant SWPs to understand responsibilities and task requirements. Exposure: Shadows a Field Supervisor to learn task prioritization; receives coaching from SME/Superintendent on LIF activities.", 
                "", 
                "Sign off", 
                "comment section",


                    {
                    type: "textWithCheckbox",
                    text: "Ensures weekly consumable orders are necessary and reasonable, and manages stock levels to meet operational requirements", 
                    checkboxLabel: "Box 11"
                },
                {
                    type: "textWithCheckbox",
                    text: "Encourages use of a stocktake template for critical orders, assesses order validity and excess, and approves orders based on operational need", 
                    checkboxLabel: "Box 12"
                },
                    {
                    type: "textWithCheckbox",
                    text: "Mentors field assistants on reconciling and tracking stores orders to ensure accuracy and accountability", 
                    checkboxLabel: "Box 13"
                },
                "",
                "Exposure Shadows an experienced Field Supervisor to learn stocktake, ordering, and reconciliation of stores orders, including how to track orders in SAP", 
                "", 
                "Sign off", 
                "comment section",
            ]
        },
        field3: {
            title: "Field supervisor level 3",
            cells: [
                "Skills/Responsibilities", "Sub Section 1", "Sub Section 2", "Sub Section 3",
                "Training Process", "Training Material", "Reviewer sign off", "Comments",
                    {
                    type: "textWithCheckbox",
                    text: "Manage and reconcile timesheets for Cat1 Field Assistants, Survey Assistants, and Hydro Technicians", 
                    checkboxLabel: "Box 1"
                },
                {
                    type: "textWithCheckbox",
                    text: "Assess dates and times, and approve timesheets in the WorkPac portal", 
                    checkboxLabel: "Box 2"
                },
                "",
                "",
                "Exposure – SME/Supervisor-led session to demonstrate timesheet reconciliation and processing, ensuring correct cost code allocation",
                <button onClick={() => window.open("https://my.workpac.com/public", "_blank")}>My WorkPac </button>,
                "Sign off", 
                "comment section",

                    {
                    type: "textWithCheckbox",
                    text: "Ensure WHS compliance through testing and tagging, and managing registers for fire extinguishers, lifting gear, and chemical storage", 
                    checkboxLabel: "Box 3"
                },
                {
                    type: "textWithCheckbox",
                    text: "Performs required monthly and quarterly compliance checks", 
                    checkboxLabel: "Box 4"
                },
                    {
                    type: "textWithCheckbox",
                    text: "Conducts laydown inspections and field verifications to ensure compliance with safety and operational standards", 
                    checkboxLabel: "Box 5"
                },
                "",
                "Education – Dogging, Fire Extinguisher Test & Tag, and ChemAlert training (not mandatory but beneficial). Exposure – Mentorship from SME or Field Supervisor during field audits and compliance checks", 
                <button onClick={() => window.open("https://safeday.app/", "_blank")}>Safeday </button>, 
                "Sign off", 
                "comment section",

                    {
                    type: "textWithCheckbox",
                    text: "Manages team performance and development through quality quarterly Check-Ins and oversight of Development Plans", 
                    checkboxLabel: "Box 6"
                },
                {
                    type: "textWithCheckbox",
                    text: "Conduct check ins quarterly, suing the correct template, correct detail, in the right app - Workday. ", 
                    checkboxLabel: "Box 7"
                },
                    {
                    type: "textWithCheckbox",
                    text: "Follow up on Development Plan actions by requesting progress updates, challenging improvements, and actively supporting growth", 
                    checkboxLabel: "Box 8"
                },
                "",
                "Superintendent sets expectations for Check-Ins and Development Plans, follows up on actions and challenges, verifies progress, and guides staff in setting purposeful targets to improve performance", 
                <button onClick={() => window.open("https://wd3.myworkday.com/riotinto/d/home.htmld", "_blank")}>Workday </button>, 
                "Sign off", 
                "comment section",

                    {
                    type: "textWithCheckbox",
                    text: "Manages IVMS and DSS reporting, addressing poor behaviours as required; includes DSS line item reviews and corrective actions", 
                    checkboxLabel: "Box 9"
                },
                {
                    type: "textWithCheckbox",
                    text: "Manages IVMS and DSS reporting, reviews DSS line items, and addresses poor behaviours through corrective actions as required", 
                    checkboxLabel: "Box 10"
                },
                {
                    type: "textWithCheckbox",
                    text: "Has full knowledge of IVMS and DSS actions and penalties; challenges the team to improve driving behaviours", 
                    checkboxLabel: "Box 11"
                },
                "",
                "Education: Has read the IVMS and DSS Leader Guidance Notes. Exposure: Superintendent provides guidance to ensure clear understanding of IVMS and DSS rules, manages inappropriate behaviour, and ensures rules are upheld", 
                                                    <div style={{  display: "flex", flexDirection: "column", gap: "10px", marginTop: "10px"  }}>
                    <button onClick={() => window.open("https://riotinto.sharepoint.com/sites/IODMSHSESCommunities/Controlled_Published/RTIO-HSE-0156051.pdf", "_blank")}> Vehicle Monitoring System (IVMS)
</button>
                    <button onClick={() => window.open("https://riotinto.sharepoint.com/sites/IODMSHSESCommunities/Health_Safety_Environment/RTIO-1054035.pdf", "_blank")}>RTIO DSS Driver Safety System</button>
                    </div>, 
                "Sign off", 
                "comment section",

                    {
                    type: "textWithCheckbox",
                    text: "Leads, uses, and mentors team members in RTIO and Department Safety Systems, including PTHA, CRM, and Project Risk Reviews", 
                    checkboxLabel: "Box 12"
                },
                {
                    type: "textWithCheckbox",
                    text: "Has read and understands the guidance notes on tool use, and completed CCFV online training and videos", 
                    checkboxLabel: "Box 13"
                },
                    {
                    type: "textWithCheckbox",
                    text: "Demonstrates comprehensive understanding of RTIO safety systems and provides mentoring and advice to others on their use", 
                    checkboxLabel: "Box 14"
                },
                "",
                "Education: Has reviewed all training videos, understands Rio Tools usage, and holds CCFV VOC qualification. Exposure: Mentored by SME/Supervisor to a level where the Supervisor can provide direct guidance on RTIO safety tool usage.", 
                                                                <div style={{  display: "flex", flexDirection: "column", gap: "10px", marginTop: "10px"  }}>
                    <button onClick={() => window.open("https://id.riotinto.forwoodsafety.com/", "_blank")}> Forwoodsafety
</button>
                    <button onClick={() => window.open("https://riotinto.sharepoint.com/sites/RTIOHSECHUB/SitePages/Critical-Risk-Management-(CRM).aspx", "_blank")}>Critical Risk Management (CRM)</button>
                    </div>, 
                "Sign off", 
                "comment section",
                                    {
                    type: "textWithCheckbox",
                    text: "Ensures appropriate water source and transfer system are in place for the project and can organise installation as required", 
                    checkboxLabel: "Box 15"
                },
                {
                    type: "textWithCheckbox",
                    text: "Participates in drilling program planning, including desktop review of bore locations and field verification of access", 
                    checkboxLabel: "Box 16"
                },
                    {
                    type: "textWithCheckbox",
                    text: "Provides SME-level advice on water bore setup using Bore Boss/Bladder systems; manages inspections and maintenance of the water setup", 
                    checkboxLabel: "Box 17"
                },
                "",
                "Mentored by SME/Field Supervisor in the safe and effective setup of water sources, including scoping and selecting bores for installation", 
                "No training plan exists for this topic. Candidate will have to be mentored by a SME or superintendent with a field work background. ", 
                "Sign off", 
                "comment section",

                                    {
                    type: "textWithCheckbox",
                    text: "Manages chemicals and consumables using the CHEMALERT system", 
                    checkboxLabel: "Box 18"
                },
                {
                    type: "textWithCheckbox",
                    text: "Access and use ChemAlert proficiently Maintain chemical inventory on site Perform chemical compatibility checks", 
                    checkboxLabel: "Box 19"
                },
                "",
                "",
                "Completed all ChemAlert training videos Understands system functionality and usage", 
                <button onClick={() => window.open("https://chemalert.rmt.com.au/rtio/login/", "_blank")}>ChemAlert </button>,
                "Sign off", 
                "comment section",

                                    {
                    type: "textWithCheckbox",
                    text: "Is capable of raising Vehicle Maintenance Notifications Is capable of managing Hub LV fleet operations", 
                    checkboxLabel: "Box 20"
                },
                {
                    type: "textWithCheckbox",
                    text: "Manages vehicle maintenance scheduling effectively Ensures zero no-shows for scheduled services", 
                    checkboxLabel: "Box 21"
                },
                    {
                    type: "textWithCheckbox",
                    text: "Capable of training and coaching Field Assistants in raising notifications", 
                    checkboxLabel: "Box 22"
                },
                "",
                "SME or Field Supervisor demonstrates how to raise a notification in SAP, including detailed steps and supporting photos", 
                <button onClick={() => window.open("#", "_blank")}>link not working </button>,
                "Sign off", 
                "comment section",

                                    {
                    type: "textWithCheckbox",
                    text: "Schedule electrical testing and tagging of equipment", 
                    checkboxLabel: "Box 23"
                },
                {
                    type: "textWithCheckbox",
                    text: "Get quote, schedule contractor, raise PO, manage site activities", 
                    checkboxLabel: "Box 24"
                },
                "",
                "",
                "SME/Field Supervisor to demonstrate: request quote, raise PO, engage contractor, provide maps and documentation", 
                "No training plan exists for this topic. Candidate will have to be mentored by a SME or superintendent with a field work background. ",
                "Sign off", 
                "comment section",

                                    {
                    type: "textWithCheckbox",
                    text: "Assist and provide recommendations during the recruitment of new staff", 
                    checkboxLabel: "Box 25"
                },
                {
                    type: "textWithCheckbox",
                    text: "Provide feedback on candidates based on your experience level. Assist in assessing resume quality", 
                    checkboxLabel: "Box 26"
                },
                    {
                    type: "textWithCheckbox",
                    text: "Participate in interview process: join panel or provide SME input on interview content and question quality", 
                    checkboxLabel: "Box 27"
                },
                "",
                "Exposure: Request to join interview panel for upcoming vacanciess", 
                "No training plan exists for this topic. Candidate will have to be mentored by a SME or superintendent with a field work background. ", 
                "Sign off", 
                "comment section",

                                                    {
                    type: "textWithCheckbox",
                    text: "Oversee sample collection, dispatch, and drill collar rehabilitation", 
                    checkboxLabel: "Box 28"
                },
                {
                    type: "textWithCheckbox",
                    text: "Use Protrak to identify outstanding items, liaise with Geoscience on available samples, and generate cutting lists", 
                    checkboxLabel: "Box 29"
                },
                "",
                "",
                "Gain SME/Field Supervisor mentoring on sample dispatch and Protrak use. Guide field assistants in generating sample and collar cutting sheet", 
                <button onClick={() => window.open("#", "_blank")}>link not working </button>,
                "Sign off", 
                "comment section",

                                                                    {
                    type: "textWithCheckbox",
                    text: "Manage rental of required equipment (gensets, telehandler, vehicles, water points, etc.)", 
                    checkboxLabel: "Box 30"
                },
                {
                    type: "textWithCheckbox",
                    text: "Assess project needs, confirm required equipment, get quotes, raise PO, and arrange delivery to site", 
                    checkboxLabel: "Box 31"
                },
                {
                    type: "textWithCheckbox",
                    text: "Track costs, approve invoices, and reassess project needs", 
                    checkboxLabel: "Box 32"
                },
                "",
                "Gain exposure through SME/Field Supervisor mentoring on project needs, engaging hire companies, quoting, raising POs, and sharing knowledge with others", 
                "No training plan exists for this topic. Candidate will have to be mentored by a SME or superintendent with a field work background. ", 
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

export default FieldPop;