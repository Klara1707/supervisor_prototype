
import "./Pop.css";
import { useState } from "react";

const SafetyPop = ({ popupId, closePopup }) => {
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
        safety1: {
            title: "Safety level 1",
            cells: [
                "Skills/Responsibilities", "Sub Section 1", "Sub Section 2", "Sub Section 3",
                "Training Process", "Training Material", "Reviewer sign off", "Comments",
                    {
                    type: "textWithCheckbox",
                    text: "Consistently demonstrated proficiency in using the SafeDay App to accurately and efficiently complete all required applications, forms, and tools", 
                    checkboxLabel: "Box 1"
                },
                {
                    type: "textWithCheckbox",
                    text: "Able to efficiently locate and complete all commonly used operational forms—including Take 5, JMP, JHA, Shift Handover, DWI, and Prestarts—with accuracy and attention to detail", 
                    checkboxLabel: "Box 2"
                },
                {
                    type: "textWithCheckbox",
                    text:  "Provides guidance to contractors on using SafeDay effectively", 
                    checkboxLabel: "Box 3"
                },
                "", 
                "Download to your mobile device using the provided link. Exposure: Familiarise yourself with how to create an active task, action items through your inbox, and review your team via the dashboard Exposure: familarise yourself how to create an active task, action through your inbox and review your team on the dashboard.", 
                <button onClick={() => window.open("https://safeday.app/", "_blank")}>Safeday app</button>,
                "Sign off", 
                "comment section",

                {
                    type: "textWithCheckbox",
                    text: "Understands the purpose and origin of Critical Risk Management, including key concepts and trending data, and performs high-quality verifications to ensure compliance and effectiveness", 
                    checkboxLabel: "Box 4"
                },
                                {
                    type: "textWithCheckbox",
                    text: "Understands task timelines, can assess credible fatality risks, and demonstrates general proficiency in using the app",  
                    checkboxLabel: "Box 5"
                },
                {
                    type: "textWithCheckbox",
                    text: "Capable of verifying controls for effectiveness and providing constructive feedback during Critical Control Field Verifications (CCFV)", 
                    checkboxLabel: "Box 6"
                },
                                {
                    type: "textWithCheckbox",
                    text: "Knows the appropriate actions to take when a red is identified—capturing photos, recording the issue, resolving it in the field where possible, assigning actions, setting timelines, and ensuring close-out",  
                    checkboxLabel: "Box 7"
                },
                "The RTIO Critical Risk Management Hub provides comprehensive resources explaining the 'why' and 'how' behind critical risk processes", 
                <button onClick={() => window.open("https://riotinto.sharepoint.com/sites/RTIOHSECHUB/SitePages/Critical-Risk-Management-(CRM).aspx", "_blank")}>Critical Risk Management (CRM) </button>,
                "Sign off", "comment section",
                                                {
                    type: "textWithCheckbox",
                    text: "Understands the purpose of Hazard & Risk Assessment—including risk levels, key concepts, and timelines—and performs thorough, high-quality assessments", 
                    checkboxLabel: "Box 8"
                },
                                                {
                    type: "textWithCheckbox",
                    text: "Understands that all activities involving risk must be assessed through a Pre-Task Hazard Assessment (PTHA), with appropriate controls implemented to manage the risk", 
                    checkboxLabel: "Box 9"
                },
                                                {
                    type: "textWithCheckbox",
                    text: "Able to provide guidance to contractors and others on improving the quality of risk assessments", 
                    checkboxLabel: "Box 10"
                },
                "", 
                "The RTIO Pre-Task Hazard Assessment Hub provides comprehensive guidance on the 'why' and 'how' of effective risk assessment and control",
                <button onClick={() => window.open("https://riotinto.sharepoint.com/sites/RTIOHSECHUB/SitePages/Pre-Task-Risk-Assessment-Tools.aspx", "_blank")}>Pre-Task Hazard Assessment</button>, 
                "Sign off", "comment section",
                                                {
                    type: "textWithCheckbox",
                    text: "Able to analyse safety banners and effectively share key information during safety discussions, meetings, and field interactions",  
                    checkboxLabel: "Box 11"
                },
                                                {
                    type: "textWithCheckbox",
                    text: "Able to analyse safety banners and clearly communicate key messages during safety discussions, meetings, and field interactions", 
                    checkboxLabel: "Box 12"
                },
                "",
                "",
                "Exposure Tip: Before another leader presents a safety banner, take time to read it yourself. Consider how you would summarise the content without losing key messages, and identify the most important points to share. Resources: Access all banner templates via the provided link.", 
                <button onClick={() => window.open("https://riotinto.sharepoint.com/sites/RTIOHSECHUB#banners", "_blank")}>HSEC Hub </button>,
                "Sign off", "comment section",
                                                                {
                    type: "textWithCheckbox",
                    text: "Maintains project action tracking to ensure timely completion of safety gaps and improvements identified through SMMs, LIF interactions, and PSIs", 
                    checkboxLabel: "Box 13"
                },
                                                                {
                    type: "textWithCheckbox",
                    text: "Gathers actions from PSI, DWI, and LIF interactions, and accurately captures them in the DDM for effective tracking and follow-up",  
                    checkboxLabel: "Box 14"
                },
                                                                {
                    type: "textWithCheckbox",
                    text: "Follows up on open actions to ensure close-out before the due date, and provides reasoning for any extensions on overdue items",  
                    checkboxLabel: "Box 15"
                },
                "",                         
                "Exposure Tip:Closely follow the action tracking process during your team meetings. Once you're confident in your understanding, volunteer to be the scribe or action taker to help capture and manage meeting outcomes.", 

                "",
                "Sign off", "comment section",

                                                                                {
                    type: "textWithCheckbox",
                    text: "Understands the initial response to an incident - securing the scene, reporting to chain of command, confidentiality in distributing information. ", 
                    checkboxLabel: "Box 16"
                },
                                                                {
                    type: "textWithCheckbox",
                    text: "Understands their responsibility in securing the scene of an incident and is familiar with the initial reporting process",  
                    checkboxLabel: "Box 17"
                },
                                                                {
                    type: "textWithCheckbox",
                    text: "Able to enter initial incident reports in Enablon and distribute a Leader Report to relevant stakeholders",  
                    checkboxLabel: "Box 18"
                },
                                                                                {
                    type: "textWithCheckbox",
                    text: "Able to enter actions into Enablon accurately for tracking and follow-up",  
                    checkboxLabel: "Box 19"
                },                      
                "Exposure Tip: Shadow a peer to understand scene requirements and how to communicate initial expectations for information collection. Once confident, practice entering incident details into Enablon.", 
            
                    <div style={{  display: "flex", flexDirection: "column", gap: "10px", marginTop: "10px"  }}>
                    <button onClick={() => window.open("https://riotinto.sharepoint.com/sites/IODMSHSESCommunities/Controlled_Published/Forms/AllItems.aspx?id=%2Fsites%2FIODMSHSESCommunities%2FControlled%5FPublished%2FRTIO%2DHSE%2D0071439%2Epdf&parent=%2Fsites%2FIODMSHSESCommunities%2FControlled%5FPublished", "_blank")}>Incident Investigation Procedure</button>
                    </div>,

                "Sign off", "comment section",

                                                                                                {
                    type: "textWithCheckbox",
                    text: "Qualified and skilled in issuing and managing Hot Works permits ", 
                    checkboxLabel: "Box 20"
                },
                                                                {
                    type: "textWithCheckbox",
                    text: "Raises, signs, and verifies Hot Works permits with control measures in place",  
                    checkboxLabel: "Box 21"
                },
                                                                {
                    type: "textWithCheckbox",
                    text: "Can conduct LIF activities to verify controls, including PTHA and CCFV",  
                    checkboxLabel: "Box 22"
                },
                                                                                {
                    type: "textWithCheckbox",
                    text: "Able to enter actions into Enablon accurately for tracking and follow-up",  
                    checkboxLabel: "Box 23"
                },

                "Qualification: RTIO Certified – Hot Work Permit Issuer Exposure: Shadowed SMEs/peers, conducted LIF activities, and actively engaged with controls (PTHA, CCFV) during tasks.", 
                "",   
                "Sign off", "comment section",
                                                                                                                {
                    type: "textWithCheckbox",
                    text: "Understands the functionality and purpose of IVMS and DSS systems, including their role in promoting safety, compliance, and operational efficiency", 
                    checkboxLabel: "Box 24"
                },
                                                                {
                    type: "textWithCheckbox",
                    text: "Understands how the system operates, can identify what constitutes a breach, and is aware of the potential consequences associated with non-compliance",  
                    checkboxLabel: "Box 25"
                },
                "",  
                "",  

                "Tip: Speak with your Leader to confirm whether your role requires access to the MiX Telematics and DSSi Portal", 
                    <div style={{  display: "flex", flexDirection: "column", gap: "10px", marginTop: "10px"  }}>
                    <button onClick={() => window.open("https://riotinto.sharepoint.com/sites/IODMSHSESCommunities/Controlled_Published/RTIO-HSE-0156051.pdf", "_blank")}>Vehicle Monitoring System (IVMS) Guidance </button>
                    <button onClick={() => window.open("https://riotinto.sharepoint.com/sites/RTIOHSECHUB/SitePages/Light-Vehicles-and-Driving.aspx", "_blank")}>Light Vehicles and Driving</button>
                    </div>, 
                "Sign off", "comment section",
            ]
        },
        

        safety2: {
            title: "Safety level 2",
            cells: [
                "Skills/Responsibilities", "Sub Section 1", "Sub Section 2", "Sub Section 3",
                "Training Process", "Training Material", "Reviewer sign off", "Comments",
                    {
                    type: "textWithCheckbox",
                    text: "Identify and discuss SMART Safety Focus areas applicable to our project activities — including PSI actions, hazard hunts, and safety spotlights. Focus on specific, measurable, achievable, relevant, and time-bound initiatives that drive continuous improvement and engagement", 
                    checkboxLabel: "Box 1"
                },
                {
                    type: "textWithCheckbox",
                    text: "Track assigned actions to ensure accountability and progress. Engage SMEs for technical input or support where needed. Report field interaction findings to highlight observations and improvements. Close out actions once verified and completed, ensuring proper documentation.", 
                    checkboxLabel: "Box 2"
                },
                "", 
                "", 
                "", 
                <button onClick={() => window.open("https://riotinto.sharepoint.com/sites/5060624/SiteAssets/Forms/AllItems.aspx?id=%2Fsites%2F5060624%2FSiteAssets%2FSitePages%2FResources%2FSMART%2DGoals%2Epdf&parent=%2Fsites%2F5060624%2FSiteAssets%2FSitePages%2FResources", "_blank")}>Setting Goals </button>,
                "Sign off", 
                "comment section",
    
                            {
                    type: "textWithCheckbox",
                    text: "Competent in entering and maintaining incident records in Enablon, ensuring accuracy, completeness, and timely updates in line with reporting requirements.", 
                    checkboxLabel: "Box 3"
                },

                {
                    type: "textWithCheckbox",
                    text: "Proficient in assigning incident ratings, initiating investigations, creating actions, and classifying supporting evidence within Enablon, ensuring compliance and traceability throughout the incident management process.", 
                    checkboxLabel: "Box 4"
                },
                                {
                    type: "textWithCheckbox",
                    text: "Capable of managing incidents end-to-end in Enablon, from initial entry through investigation, action tracking, evidence classification, and final close-out, ensuring compliance and data integrity throughout the process.", 
                    checkboxLabel: "Box 5"
                },
            
                "", 
                "Self-Training: Access provided links for guided learning and familiarisation. On-the-Job Exposure: Shadow an SME during live incident entry to observe best practices. Pro Tip: Superintendents often schedule dedicated times to progress incidents in their hub — request to observe during these sessions for practical insights.", 
                    <div style={{  display: "flex", flexDirection: "column", gap: "10px", marginTop: "10px"  }}>
                    <button onClick={() => window.open("https://riotinto.sharepoint.com/sites/6002923/Shared%20Documents/Forms/AllItems.aspx?csf=1&web=1&e=a0IK9F&CID=c6aed5b4%2Def86%2D49f0%2Db9cc%2D3b4b09cb5d4c&FolderCTID=0x01200090C326DA58F64E4F8996D4464F65ADF6&id=%2Fsites%2F6002923%2FShared%20Documents%2F1%2E%20How%20To%20Project%2FEnablon", "_blank")}>Enablon </button>
                    <button onClick={() => window.open("https://riotinto.sharepoint.com/sites/4000233/Documents/Forms/All%20Documents.aspx?id=%2Fsites%2F4000233%2FDocuments%2F14%2E%20Non%2DConformance%2C%20Incident%2C%20Action%20Management%2FIncident%20Management%20Process%20Templates%5FQRG%5FTraining%2FResDev%20Enablon%20Training%2Epdf&parent=%2Fsites%2F4000233%2FDocuments%2F14%2E%20Non%2DConformance%2C%20Incident%2C%20Action%20Management%2FIncident%20Management%20Process%20Templates%5FQRG%5FTraining", "_blank")}>Enablon training</button>
                    </div>,
                "Sign off", 
                "comment section",

                                            {
                    type: "textWithCheckbox",
                    text: "Trained and competent in raising and managing Working at Heights permits, ensuring compliance with safety protocols and accurate documentation throughout the permit lifecycle.", 
                    checkboxLabel: "Box 6"
                },

                {
                    type: "textWithCheckbox",
                    text: "Successfully completed Working at Heights training and Permit Issuer certification, demonstrating capability to safely raise, manage, and close permits in compliance with site requirements.", 
                    checkboxLabel: "Box 7"
                },
                                {
                    type: "textWithCheckbox",
                    text: "Qualified to issue permits, verify all required controls, and approve permits, ensuring all safety measures are in place and documented in accordance with site procedures.", 
                    checkboxLabel: "Box 8"
                },
                                {
                    type: "textWithCheckbox",
                    text: "Capable of conducting in-field verifications (CCFV) for fall-from-height risks, ensuring all critical controls are present, effective, and properly documented.", 
                    checkboxLabel: "Box 9"
                },
                "Exposure: Shadow an SME or experienced peer during CCFV tasks. Participate in LIF (Life-Intervening Factors) activities and stay curious during task execution to deepen understanding. Tip: During verifications, ensure thorough checks of: Work area housekeeping Harnesses, lanyards, and clips Static lines and poles Personnel recovery plans", 
                "", 
                "Sign off", 
                "comment section",

                                {
                    type: "textWithCheckbox",
                    text: "Trained and competent in raising and managing Excavation Permits, ensuring all safety requirements, controls, and documentation are in place throughout the permit lifecycle.", 
                    checkboxLabel: "Box 10"
                },
                                {
                    type: "textWithCheckbox",
                    text: "Completed Excavation Permit training and understands the process to initiate permits, including where to access the system and how to follow site-specific requirements.", 
                    checkboxLabel: "Box 11"
                },
                                {
                    type: "textWithCheckbox",
                    text: "Proficient in raising, maintaining, executing, transferring, and closing out Excavation Permits, ensuring all safety controls, documentation, and procedural requirements are met throughout the permit lifecycle.", 
                    checkboxLabel: "Box 12"
                },
                "", 
                "Shadow an SME or experienced peer to learn the full permit process, including risk identification and control verification. Focus on service identification within the permit area — including: Utilities (e.g., water, power, gas) Site Communications Fixed Plant infrastructure Site Services", 
                "", 
                "Sign off", 
                "comment section",

                                                {
                    type: "textWithCheckbox",
                    text: "Understands the incident investigation process and flowchart, and can assist with investigations and the close-out of associated actions, ensuring timely and accurate documentation and compliance with site procedures.", 
                    checkboxLabel: "Box 13"
                },
                                {
                    type: "textWithCheckbox",
                    text: "Completed Level 2 Investigation training, including: 5 Whys methodology Credible scenario development ICAM or Essential Factors frameworks", 
                    checkboxLabel: "Box 14"
                },
                                {
                    type: "textWithCheckbox",
                    text: "Understands the responsibilities of the Incident Owner and Final Reviewer, and is capable of supporting investigations and closing out actions in alignment with site procedures and compliance requirements.", 
                    checkboxLabel: "Box 15"
                },
                "", 
                "Pro Tip: Superintendents often block out dedicated times to progress incident investigations within their hub. Request an opportunity to observe these sessions to gain practical exposure to incident workflows, system use, and decision-making processes", 
                <button onClick={() => window.open("https://riotinto.sharepoint.com/sites/RTIOHSECHUB/SitePages/Incident-Investigation-and-Action-Quality.aspx", "_blank")}>Incident Investigation </button>,
                "Sign off", 
                "comment section",

                                                                {
                    type: "textWithCheckbox",
                    text: "Proficient in raising and managing Vicinity Permits, ensuring accurate identification of nearby activities, infrastructure, and personnel that may be impacted, and applying appropriate controls to maintain safety and coordination.", 
                    checkboxLabel: "Box 16"
                },
                                {
                    type: "textWithCheckbox",
                    text: "Understands the clearance thresholds for working under powerlines, knows which department to contact to raise a Vicinity Permit, and is familiar with the required details to initiate the permit process effectively", 
                    checkboxLabel: "Box 17"
                },
                                {
                    type: "textWithCheckbox",
                    text: "Capable of raising, maintaining, and closing out active permits, ensuring all required information, controls, and approvals are accurately managed throughout the permit lifecycle", 
                    checkboxLabel: "Box 18"
                },
                "", 
                "Exposure for Vicinity Permit Management: Shadow an SME or peer to learn how to create a VP, manage handovers on FIFO days, and properly close out permits with all documentation returned. Pro Tip: Be Prepared! Every power pole has a unique ID number — travel to the crossing and record the IDs of poles being crossed beneath. Measure and record the maximum height of the largest equipment using the crossing, including reach. Print a map to verify the area and ensure accuracy. Contact the HV Electrician to request a VP. They will advise whether to meet at their office or directly at the crossing.", 
                "", 
                "Sign off", 
                "comment section",

                
                                                                {
                    type: "textWithCheckbox",
                    text: "Displays strong knowledge of the HSEQ system, including operational controls, Champions platform, and assurance processes", 
                    checkboxLabel: "Box 19"
                },
                                {
                    type: "textWithCheckbox",
                    text: "Familiar with MSMS and HSEQ systems; able to reference and apply relevant information effectively", 
                    checkboxLabel: "Box 20"
                },
                                {
                    type: "textWithCheckbox",
                    text: "Demonstrates strong knowledge of the HSEQ system, including operational controls, Champions platform, and assurance activities", 
                    checkboxLabel: "Box 21"
                },
                "", 
                "HSEQ Competencies – to highlight initiative and system familiarity Development Plan Summary – to show ongoing self-directed learning", 
                                    <div style={{  display: "flex", flexDirection: "column", gap: "10px", marginTop: "10px"  }}>
                    <button onClick={() => window.open("https://riotinto.sharepoint.com/sites/IODMSHSESCommunities/Controlled_Published/Forms/AllItems.aspx?id=%2Fsites%2FIODMSHSESCommunities%2FControlled%5FPublished%2FRTIO%2D1046143%2Epdf&parent=%2Fsites%2FIODMSHSESCommunities%2FControlled%5FPublished", "_blank")}>Mine Safety Management System</button>
                    <button onClick={() => window.open("http://auperweb34:91/HSEQ/Default.aspx?siteid=1", "_blank")}>HSEQ Management System </button>
                    </div>,
                "Sign off", 
                "comment section",

                                                                                {
                    type: "textWithCheckbox",
                    text: "Contributes to the Department Safety Maturity Model plan by providing input, supporting initiatives, and aligning actions with safety improvement goals", 
                    checkboxLabel: "Box 22"
                },
                                {
                    type: "textWithCheckbox",
                    text: "Understands the purpose of the Safety Maturity Model (SMM) plan and participates in audits. Recognizes how actions and focus areas are generated from the SMM process", 
                    checkboxLabel: "Box 23"
                },
                                {
                    type: "textWithCheckbox",
                    text: "Supports implementation of SMM actions and helps provide field evidence to demonstrate progress and compliance", 
                    checkboxLabel: "Box 24"
                },
                "", 
                "", 
                                    <div style={{  display: "flex", flexDirection: "column", gap: "10px", marginTop: "10px"  }}>
                    <button onClick={() => window.open("https://riotinto.sharepoint.com/sites/E0007/_layouts/15/stream.aspx?id=%2Fsites%2FE0007%2FRTTV+videos%2FRio+Tinto+-+Safety+Maturity+Model.mp4&referrer=StreamWebApp.Web&referrerScenario=AddressBarCopied.view.3cb5ed7b-d37e-4e04-a828-e6074196de8d&startedResponseCatch=true", "_blank")}>Safety Maturity Model</button>
                    <button onClick={() => window.open("https://riotinto.sharepoint.com/sites/6003066?e=1%3A7af2a707136e4e16831e1fa3a9690205#safety-maturity-model", "_blank")}>Safety Maturity model Share Point</button>
                    </div>,
                "Sign off", 
                "comment section",

                                                                                                {
                    type: "textWithCheckbox",
                    text: "Support Level 2 Risk Assessments and apply required controls", 
                    checkboxLabel: "Box 25"
                },
                                {
                    type: "textWithCheckbox",
                    text: "Attends site-based Level 2 Risk Assessments, contributes actively, understands their purpose, and uses them as a reference.", 
                    checkboxLabel: "Box 26"
                },
                                {
                    type: "textWithCheckbox",
                    text: "Closes out assigned actions and follows up with HSE and site leadership on improvement updates", 
                    checkboxLabel: "Box 27"
                },
                "", 
                "Tip: Level 2 Risk Assessments (L2RAs) are triggered for specific projects or scenarios that fall outside normal operations and involve risks not captured in the Hub Risk Register. Action: Speak with your Superintendent or HSE Advisor to express your interest in attending the next L2RA.", 
                                    <div style={{  display: "flex", flexDirection: "column", gap: "10px", marginTop: "10px"  }}>
                    <button onClick={() => window.open("https://riotinto.sharepoint.com/sites/RTIOHSECHUB/SitePages/Pre-Task-Risk-Assessment-Tools.aspx#level-2-risk-assessments", "_blank")}>Pre-Task Hazard Assessment Share Point</button>
                    <button onClick={() => window.open("https://riotinto.sharepoint.com/sites/4000233/sitepages/home.aspx?RootFolder=/sites/4000233/Documents/03.%20Hazard%20ID%20%26%20Risk%20Management/07.%20Level%202%20Risk%20Assessments&FolderCTID=0x0120005CC9CFB35F7E404C98B5B47EBB30C496&View=%7bBFD1968E-EBB3-432E-BF69-F4F84CC2924D%7d", "_blank")}>Enablon training</button>
                    </div>,
                "Sign off", 
                "comment section",
            
            ]
        },

        
        safety3: {
            title: "Safety level 3",
            cells: [
                "Skills/Responsibilities", "Sub Section 1", "Sub Section 2", "Sub Section 3",
                "Training Process", "Training Material", "Reviewer sign off", "Comments",
                    {
                    type: "textWithCheckbox",
                    text: "Manage incidents in accordance with the Incident Management Flowchart, including Enablon reporting, 5 Why’s analysis, action creation, assignment, and close-out", 
                    checkboxLabel: "Box 1"
                },
                {
                    type: "textWithCheckbox",
                    text: "Fully understands the end-to-end incident process, including raising, investigating, assigning actions, and ensuring close-out", 
                    checkboxLabel: "Box 2"
                },
                "", 
                "", 
                "Exposure – Request your Superintendent or HSE Advisor to involve you in a 5 Why’s investigation to gain practical experience", 
                <button onClick={() => window.open("https://riotinto.sharepoint.com/sites/6002923/Shared%20Documents/Forms/AllItems.aspx?id=%2Fsites%2F6002923%2FShared%20Documents%2F1%2E%20How%20To%20Project%2FIncident%20and%20Action%20Management%2FBest%2DPractice%2D%2D%2DLearning%2Dfrom%2DEvents%2D%2DInvestigations%2D%2Epdf&parent=%2Fsites%2F6002923%2FShared%20Documents%2F1%2E%20How%20To%20Project%2FIncident%20and%20Action%20Management", "_blank")}>Best practice investigations </button>,
                "Sign off", 
                "comment section",

                                    {
                    type: "textWithCheckbox",
                    text: "Assists in developing and maintaining departmental Safe Work Procedures (SWPs)", 
                    checkboxLabel: "Box 3"
                },
                "",
                "", 
                "", 
                "Uses provided link to identify outdated SWPs and collaborates with the team performing the work to review, update, or remove practices that are no longer best practice", 
                <button onClick={() => window.open("https://app.powerbi.com/groups/me/apps/98bfa01a-c446-46a8-bbea-38d67e2ff15f/reports/be5075e2-eb98-4f8c-95a1-14ca041198e2/ReportSection9a4ee125335b0f30015f?ctid=4341df80-fbe6-41bf-89b0-e6e2379c9c23&experience=power-bi", "_blank")}>ResDev SWP Compliance </button>,
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

export default SafetyPop;