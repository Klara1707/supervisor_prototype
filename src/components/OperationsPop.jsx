
import "./Pop.css";
import { useState } from "react";

const OperationsPop = ({ popupId, closePopup }) => {
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
        "Box 37", "Box 38", "Box 39", "Box 40", "Box 41", "Box 42",
        "Box 43", "Box 44", "Box 45", "Box 46", "Box 47", "Box 48",
    ];
    const [progressChecks, setProgressChecks] = useState(Array(checkboxItems.length).fill(false));

    if (!popupId) return null;


    const contentMap = {
        operations1: {
            title: "Operations level 1",
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
                    checkboxLabel: "Box 3"
                },
                {
                    type: "textWithCheckbox",
                    text: "Delivers Monday updates to leader, covering weekly target achievement, current priorities, and the two-week forward plan", 
                    checkboxLabel: "Box 4"
                },
                "Exposure: Mentored by SME/Supervisor in accessing key data sources (plods, tracking sheets, Protrak, State of Play). Developed accuracy in data entry, detailed standby/downtime comments, and confidence in presenting weekly data to Superintendent in Monday review meetings", 
                "", 
                "Sign off", 
                "comment section",

                {
                    type: "textWithCheckbox",
                    text: "Manages own flight and accommodation bookings; supports contractor travel arrangements as needed", 
                    checkboxLabel: "Box 5"
                },
                                {
                    type: "textWithCheckbox",
                    text: "Proficient in PALMS",  
                    checkboxLabel: "Box 6"
                },
                "",
                "",
                "Education – Watch how-to videos and learn what makes a strong PSI", 
                "", 
                "Sign off", "comment section",
                                                {
                    type: "textWithCheckbox",
                    text: "Competent in using State of Play to manage projects and understands how data is captured and reported", 
                    checkboxLabel: "Box 7"
                },
                                                {
                    type: "textWithCheckbox",
                    text: "Uses State of Play data to report on drilling and earthworks progress, and to forecast production rates for work completion", 
                    checkboxLabel: "Box 8"
                },
                "", 
                "", 
                "Exposure: Supported by SME/Supervisor to gain access and receive guidance on using State of Play, including how to interpret and assess data effectively",
                "", 
                "Sign off", "comment section",
                                                {
                    type: "textWithCheckbox",
                    text: "Competent in using Weatherguard to monitor weather events, with a clear understanding of the lightning procedure and associated responsibilities",  
                    checkboxLabel: "Box 9"
                },
                                                {
                    type: "textWithCheckbox",
                    text: "Monitors Weatherguard during lightning activity and promptly reports to the Project Leader for shutdown recommendations", 
                    checkboxLabel: "Box 10"
                },
                "",
                "",
                "Exposure: Shown how to log in and use Weatherguard to track lightning and receive weather alerts", 
                "",
                "Sign off", "comment section",
                                                                {
                    type: "textWithCheckbox",
                    text: "Competent in the SWAT process, including creation, completion, and handover of tasks", 
                    checkboxLabel: "Box 11"
                },
                                                                {
                    type: "textWithCheckbox",
                    text: "Understands the pad approval process: pads are constructed, checked by Cat 3 and Drilling Supervisors, rework is flagged if needed, and once signed off by all parties, the pad is handed over to Geos for Protrak status update",  
                    checkboxLabel: "Box 12"
                },
                                                                {
                    type: "textWithCheckbox",
                    text: "Able to gather all required data for a SWAT, including drill designs, MMPK maps, survey confirmations, water and fuel sources, radio channels, and heritage delineation",  
                    checkboxLabel: "Box 13"
                },
                                                                                {
                    type: "textWithCheckbox",
                    text: "Completes SWAT by ensuring all pads are checked, paperwork is signed, rework is organised, data is verified, and all stakeholders are informed via email",  
                    checkboxLabel: "Box 14"
                },                     
                "Exposure: Mentored by SME/Supervisor on compiling all relevant pad data for SWATs, including field-based guidance on pad checks. Shadowed during stakeholder communications to ensure accuracy of checks and completeness of data before submission", 

                "",
                "Sign off", "comment section",
                                                                                {
                    type: "textWithCheckbox",
                    text: "Has detailed knowledge of the RTIO Fitness for Work Policy and can confidently apply it in day-to-day operations.", 
                    checkboxLabel: "Box 15"
                },
                                                                {
                    type: "textWithCheckbox",
                    text: "Has read and understands the RTIO Fitness for Work Policy, and applies it to ensure their own safety and wellbeing, particularly during high-risk activities such as nightshift work",  
                    checkboxLabel: "Box 16"
                },
                    "",                  
                    "",
                "Has read, understands, and applies the RTIO Fitness for Work Policy.", 

                "",
                "Sign off", "comment section",
                                                                                {
                    type: "textWithCheckbox",
                    text: "Has detailed knowledge of the RTIO AOD Policy and applies it appropriately to ensure personal safety and compliance with site requirements", 
                    checkboxLabel: "Box 17"
                },
                                                                {
                    type: "textWithCheckbox",
                    text: "Has read and understands the RTIO AOD Policy, and applies it to support their own safety and wellbeing",  
                    checkboxLabel: "Box 18"
                },
                                                                {
                    type: "textWithCheckbox",
                    text: "Understands and can apply the correct process for managing a non-negative Alcohol and Other Drugs (AOD) result, including adherence to confidentiality protocols",  
                    checkboxLabel: "Box 19"
                },
                "",
                "Education – AOD Policy Has read, understands, and applies the RTIO Alcohol and Other Drugs (AOD) Policy Applies the policy to support personal safety and wellbeing Exposure – AOD Policy Application Shadowed by an SME or Supervisor to ensure correct application of the policy Understands and follows the process for managing non-negative results Maintains confidentiality in line with policy protocols", 

                "",
                "Sign off", "comment section",
                                                                                {
                    type: "textWithCheckbox",
                    text: "Competent in maintaining the currency of own qualifications, including proactively booking and managing both internal and external training courses", 
                    checkboxLabel: "Box 20"
                },
                                                                {
                    type: "textWithCheckbox",
                    text: "Competent in maintaining the currency of own qualifications Proactively books internal and external training courses Can access and navigate their training and qualification profile in Prospect",  
                    checkboxLabel: "Box 21"
                },
                                                                {
                    type: "textWithCheckbox",
                    text: "Understands the minimum training requirements for their role Recognises the importance of maintaining current qualifications Understands how individual compliance contributes to the department’s collective Licence to Operate",  
                    checkboxLabel: "Box 22"
                },
                "",                     
                "Exposure – My Learning in Prospect Shown how to access My Learning in Prospect Understands the importance of keeping qualifications current Learns how to search for and book internal courses using the My Learning platform Guided by an SME or Supervisor during the process", 

                "",
                "Sign off", "comment section",
                                                                                {
                    type: "textWithCheckbox",
                    text: "Competent in using the Res Dev Roster for scheduling and shift management Able to submit leave requests via Workday or WorkPac as appropriate", 
                    checkboxLabel: "Box 23"
                },
                                                                {
                    type: "textWithCheckbox",
                    text: "Can access the Res Dev Roster and Workday systems Able to enter and manage leave requests independently",  
                    checkboxLabel: "Box 24"
                },
                                                                {
                    type: "textWithCheckbox",
                    text: "Has a good understanding of the different types of leave available and how each is applied in line with company policies and procedures",  
                    checkboxLabel: "Box 25"
                },
                "",
                "Has access to Workday and the Res Dev Roster Shown how to enter leave and navigate the Workday system All leave types and their applications are explained Guided by an SME or Supervisor during the process", 

                "",
                "Sign off", "comment section",
            ]
        },
        operations2: {
            title: "Operations level 2",
            cells: [
                "Skills/Responsibilities", "Sub Section 1", "Sub Section 2", "Sub Section 3",
                "Training Process", "Training Material", "Reviewer sign off", "Comments",
                    {
                    type: "textWithCheckbox",
                    text: "Understand demand forecasting and optimisation requirements specific to your project, including roster patterns and travel lead times. Be aware of accommodation constraints, such as room availability, site capacity, and booking windows. Know how PDA (Project Delivery Allocation) impacts travel and accommodation planning, and ensure alignment with project schedules and personnel movements.", 
                    checkboxLabel: "Box 1"
                },
                {
                    type: "textWithCheckbox",
                    text: "Develop a comprehensive understanding of the Quality Procurement Process (QPP) and its integration with Finance and Operations (F+O) systems. Gain familiarity with accommodation constraints, including policy limitations and operational impacts. Build working knowledge of Project Delivery Agreements (PDAs) and their relevance to contract management and execution", 
                    checkboxLabel: "Box 2"
                },
                    {
                    type: "textWithCheckbox",
                    text: "Able to accurately report personnel presence on site using validated data sources. Proficient in navigating and extracting relevant information from the F+A SharePoint page. Can assist with the coordination of personnel movements between sites, ensuring alignment with operational requirements. Supports the review and assessment of accommodation lists, identifying constraints and ensuring compliance with site capacity and policy guidelines.", 
                    checkboxLabel: "Box 3"
                },
                "", 
                "Has access to the Travel and Logistics web page and understands how to navigate its key features. Receives an overview of the Quality Procurement Process (QPP) and Project Delivery Agreements (PDAs), as explained by a Subject Matter Expert (SME) or Supervisor. Is shown where to locate essential information related to bus schedules, flight details, and accommodation data, supporting informed decision-making and operational coordination.", 
                "", 
                "Sign off", 
                "comment section",

                {
                    type: "textWithCheckbox",
                    text: "Proficient in using ServiceNow to raise, modify, or cancel project-related tickets", 
                    checkboxLabel: "Box 4"
                },
                                {
                    type: "textWithCheckbox",
                    text: "Able to use ServiceNow to request a wide range of services and ticket types",  
                    checkboxLabel: "Box 5"
                },
                "",
                "",
                "Has access to ServiceNow and can use quick links and search functions to locate relevant tickets and service requests.", 
                "", 
                "Sign off", "comment section",
                                                {
                    type: "textWithCheckbox",
                    text: "Competent in using GIS applications including ArcGIS Pro, ArcPortal, MMPK, and Field Maps", 
                    checkboxLabel: "Box 6"
                },
                                                {
                    type: "textWithCheckbox",
                    text: "Has access to ArcPortal and can upload project files and use mapping tools to ground-truth drilling designs from desktop", 
                    checkboxLabel: "Box 7"
                },
                                                                {
                    type: "textWithCheckbox",
                    text: "Proficient in ArcGIS; can create MMPKs for Field Maps and load them onto iPads and Samsung tablets", 
                    checkboxLabel: "Box 8"
                },
                "", 
                "Education Reads and reviews how-to guides for accessing and using ArcGIS tools. Exposure Receives mentoring from experienced ArcGIS users (e.g., Supervisors, Geos, Hydros, Surveyors) on using the Portal, uploading files, and working with map layers.",
                "", 
                "Sign off", "comment section",
                                                {
                    type: "textWithCheckbox",
                    text: "Proficient in using Prospect and Workday to manage personal workflow, reports, qualifications, development, and performance",  
                    checkboxLabel: "Box 9"
                },
                                                {
                    type: "textWithCheckbox",
                    text: "Can initiate check-ins and development plans, view qualifications, raise notifications, update personal information, and manage tasks via the worklist", 
                    checkboxLabel: "Box 10"
                },
                "",
                "",
                "Mentored by a Subject Matter Expert (SME) or Supervisor on using Prospect and Workday. Supervisors provide examples of development plans and check-in templates to support learning", 
                "",
                "Sign off", "comment section",
                                                                {
                    type: "textWithCheckbox",
                    text: "Understands the Operations Request (OR) process, its key components, and the use of the OR Tracking App as managed by the Planning Team", 
                    checkboxLabel: "Box 11"
                },
                                                                {
                    type: "textWithCheckbox",
                    text: "Understands how Operations Requests relate to team activities; can navigate the OR Tracking App to access and interpret relevant data and information",  
                    checkboxLabel: "Box 12"
                },
                                                                {
                    type: "textWithCheckbox",
                    text: "Regularly checks the OR Tracking App each swing for outstanding ground-truthing tasks. Can cross-reference Operations Requests with the two-week plan, Plan-to-Plan, and P6 Gantt to ensure alignment",  
                    checkboxLabel: "Box 13"
                },
                "",                  
                "Mentored by SME or Supervisor to ensure proficient use of the Operations Request App. Understands how to locate drilling designs and extract key information from Operations Request forms. Has access to the P6 Gantt and can filter relevant information", 

                "",
                "Sign off", "comment section",
                                                                                {
                    type: "textWithCheckbox",
                    text: "Able to conduct quality ground-truthing activities and accurately record data relevant to Operations Requests", 
                    checkboxLabel: "Box 14"
                },
                                                                {
                    type: "textWithCheckbox",
                    text: "Mentored by a Subject Matter Expert (SME) to conduct thorough and effective ground-truthing activities, ensuring accurate data collection for Operations Requests",  
                    checkboxLabel: "Box 15"
                },
                                {
                    type: "textWithCheckbox",
                    text: "Know how to use the app to identify GT, initial desk top review on ArcGIS, able to  manage data for field verification, able to identify issues with design (Pads off AR, too close to heritage, access issues, ground conditions, etc). ",  
                    checkboxLabel: "Box 16"
                },                
                                                {
                    type: "textWithCheckbox",
                    text: "Has full knowledge of ground-truthing processes. Can independently gather required tools and data, conduct both desktop and field checks, provide feedback via the Operations Request App, and communicate directly with designers to suggest design changes ",  
                    checkboxLabel: "Box 17"
                },
                "Mentored by SME or Supervisor on conducting ground-truthing activities. Training includes performing desktop reviews in ArcGIS, identifying design issues (e.g. access, heritage, ground conditions), and using Field Maps and ServiceNow to support field checks", 

                "",
                "Sign off", "comment section",
                                                                                {
                    type: "textWithCheckbox",
                    text: "Understands the AR process, including how to search for and locate requests. Can identify package-specific conditions and requirements within the AR system", 
                    checkboxLabel: "Box 18"
                },
                                                                {
                    type: "textWithCheckbox",
                    text: "Understands which stakeholders are involved in approving ARs. Has access to ARCs and knows how to search for ARs. Demonstrates general knowledge of AR conditions and can identify package-specific requirements",  
                    checkboxLabel: "Box 19"
                },
                                                                {
                    type: "textWithCheckbox",
                    text: "Able to assess Approval Request (AR) conditions and implement them effectively. Provides guidance to other stakeholders on condition requirements and ensures compliance through collaboration and communication",  
                    checkboxLabel: "Box 20"
                },
                "",
                "Has access to ARCs and is able to search for Approval Requests (ARs). Can extract relevant information from ARs. Receives mentoring from a SME or Supervisor to build proficiency in navigating and interpreting AR documentation", 

                "",
                "Sign off", "comment section",
                                                                                {
                    type: "textWithCheckbox",
                    text: "Understands the different clearing mechanisms—POW, NVCP, and Part IV—and how their specific conditions impact operational activities and project planning", 
                    checkboxLabel: "Box 21"
                },
                                                                {
                    type: "textWithCheckbox",
                    text: "Understands the differences between clearing mechanisms—POW, NVCP, and Part IV—and the specific conditions associated with each. Recognizes how these conditions influence operational planning and execution",  
                    checkboxLabel: "Box 22"
                },
                                                                {
                    type: "textWithCheckbox",
                    text: "Confidently provides advice and instruction on POW, NVCP, and Part IV clearing mechanisms. Understands their differences, associated conditions, and how they impact operational planning and execution",  
                    checkboxLabel: "Box 23"
                },
                                                                                            {
                    type: "textWithCheckbox",
                    text: "Able to implement required controls in the field and verify clearing methods to ensure compliance with conditions outlined in POW, NVCP, and Part IV mechanisms", 
                    checkboxLabel: "Box 24"
                },                     
                "Education Understands the Land Disturbance Work Practice and its relevance to operational activities. Exposure Has access to ARCs and can search for and extract information from Approval Requests (ARs). Receives mentoring from a SME or Supervisor to build proficiency in interpreting ARs and applying relevant conditions.", 

                "",
                "Sign off", "comment section",
                                                                                {
                    type: "textWithCheckbox",
                    text: "Demonstrates detailed understanding of the Laydown Management Guidelines, including principles, requirements, and practical application in field and planning activities", 
                    checkboxLabel: "Box 25"
                },
                                                                {
                    type: "textWithCheckbox",
                    text: "Has read and understands the Laydown Management Guidelines, including their application in planning and field activities",  
                    checkboxLabel: "Box 26"
                },
                                                                {
                    type: "textWithCheckbox",
                    text: "Able to apply WPI guidelines, identify non-compliances, and address them in Safeday",  
                    checkboxLabel: "Box 27"
                },
                "",
                "Education – Read, understand, and apply WPI guidelines in the field. Exposure – SME or Supervisor to demonstrate effective application.", 

                "",
                "Sign off", "comment section",
                                                                                                {
                    type: "textWithCheckbox",
                    text: "Understand the Weekly Plan and the Operations Team’s role in executing the Plan within the MOS framework", 
                    checkboxLabel: "Box 28"
                },
                                                                {
                    type: "textWithCheckbox",
                    text: "Understand the planning flow, including Monthly and 2-Weekly Plans",  
                    checkboxLabel: "Box 29"
                },
                                                                {
                    type: "textWithCheckbox",
                    text: "Use the P6 Gantt chart to track progress, assess start and finish times, and provide feedback to the planning team",  
                    checkboxLabel: "Box 30"
                },
                                                                                {
                    type: "textWithCheckbox",
                    text: "Attends 2-week planning meetings, negotiates drilling and earthworks targets, provides feedback on the plan, takes ownership of actions, and ensures closure",  
                    checkboxLabel: "Box 31"
                },
                "Mentored by SME/Supervisor in using the P6 Gantt chart Attend 2-week planning meetings Provide feedback to the planning team for Friday meetings Learn to link the 2-week plan to the Gantt chart Guided in assessing targets and delivering effective feedback", 
                "",
                "Sign off", "comment section",
                                                                                                {
                    type: "textWithCheckbox",
                    text: "Has detailed knowledge of the Unisolated Work Process and can perform associated tasks within their area of responsibility", 
                    checkboxLabel: "Box 32"
                },
                                                                {
                    type: "textWithCheckbox",
                    text: "Can access the database to search for procedures. Has a solid understanding of tasks permitted under the Unisolated Work Process (UWP)",  
                    checkboxLabel: "Box 33"
                },
                                                                {
                    type: "textWithCheckbox",
                    text: "Has a comprehensive understanding of tasks permitted under the Unisolated Work Process (UWP), conducts field checks, and integrates UWP into LIF activities",  
                    checkboxLabel: "Box 34"
                },
                                                                                {
                    type: "textWithCheckbox",
                    text: "Performs field verifications on individual Working with Live Equipment procedures to ensure compliance with documented processes",  
                    checkboxLabel: "Box 35"
                },
                "Receives mentoring from SME/Drill Advisor/Supervisor on the Working with Live Equipment (WWLE) process — including its purpose, management, and field application. Observes WWLE being performed and demonstrates capability to conduct field checks under supervision", 

                "",
                "Sign off", "comment section",
                                                                                                {
                    type: "textWithCheckbox",
                    text: "Has detailed knowledge and applies RTIO and ResDev guidelines for protection and clearing near Heritage areas, including adherence to Golden Rules and L2WI requirements", 
                    checkboxLabel: "Box 36"
                },
                                                                {
                    type: "textWithCheckbox",
                    text: "Has read the Golden Rules and understands when Level 2/3 Work Instructions are required. Supports operators in preparing and conducting Level 2/3 instructions",  
                    checkboxLabel: "Box 37"
                },
                                                                {
                    type: "textWithCheckbox",
                    text: "Provides guidance to operators on the Golden Rules. Has comprehensive knowledge of clearing requirements near Heritage and AR boundaries",  
                    checkboxLabel: "Box 38"
                },
                "",
                "Education: Reads the Start-Up QRG and Golden Rules document, and understands their intent. Exposure: Golden Rules are explained; can apply them in the field and instruct survey teams to check flagging around heritage sites", 
                "",
                "Sign off", "comment section",
                                                                                                {
                    type: "textWithCheckbox",
                    text: "Develop and implement Traffic Management Plans specific to project needs", 
                    checkboxLabel: "Box 39"
                },
                                                                {
                    type: "textWithCheckbox",
                    text: "Develop and implement Traffic Management Plans tailored to project requirements",  
                    checkboxLabel: "Box 40"
                },
                                                                {
                    type: "textWithCheckbox",
                    text: "Ensure the Traffic Management Plan is updated whenever field conditions change",  
                    checkboxLabel: "Box 41"
                },
                "",
                "Education: Has read the local Traffic Management Plan and understands its content. Exposure: Is shown by the Superintendent or Coordinator how to update the TMP when permanent field changes occur", 

                "",
                "Sign off", "comment section",
                                                                                                {
                    type: "textWithCheckbox",
                    text: "Prepare and Distribute Site Notifications/Banners", 
                    checkboxLabel: "Box 42"
                },
                                                                {
                    type: "textWithCheckbox",
                    text: "Knows how to prepare a Blue Banner and distribute it to the correct group email",  
                    checkboxLabel: "Box 43"
                },
                "",
                "",
                "Education: Has read and understands the Blue Banner template. Exposure: Can complete relevant information and send it to the correct audience, with mentoring from the Superintendent.", 

                "",
                "Sign off", "comment section",
                                                                                                {
                    type: "textWithCheckbox",
                    text: "Understands pit permit, training, and AHS (Autonomous Haulage System) requirements relevant to site access and operations", 
                    checkboxLabel: "Box 44"
                },
                                                                {
                    type: "textWithCheckbox",
                    text: "Has completed V19 Pit Permit Rules training and understands the requirements for obtaining an AHS pit permit",  
                    checkboxLabel: "Box 45"
                },
                                                                {
                    type: "textWithCheckbox",
                    text: "Can provide guidance on the AHS pass-out process and assist in facilitating the VOC (Verification of Competency) with Mine Operations or Resource Development OJT.",  
                    checkboxLabel: "Box 46"
                },
                "",
                "Reads and understands the Pit Permit Rules and completes the online V19 training.", 

                "",
                "Sign off", "comment section",
            ]
        },
        operations3: {
            title: "Operations level 3",
            cells: [
                "Skills/Responsibilities", "Sub Section 1", "Sub Section 2", "Sub Section 3",
                "Training Process", "Training Material", "Reviewer sign off", "Comments",
                    {
                    type: "textWithCheckbox",
                    text: "Competent in using the GAP platform to manage remote workers via SHOUT or SPOT units", 
                    checkboxLabel: "Box 1"
                },
                {
                    type: "textWithCheckbox",
                    text: "Can track users on the portal, can send messages to shout units. Fully understands the functionality of the shout unit and responds to alerts. ", 
                    checkboxLabel: "Box 2"
                },
                "", 
                "", 
                "Exposure – SME-led survey to demonstrate SHOUT unit functionality, including portal sign-in and movement tracking", 
                "", 
                "Sign off", 
                "comment section",

                {
                    type: "textWithCheckbox",
                    text: "Understand and execute Operations Requests for assigned Drilling, Hydro, and Earthworks projects as per plan", 
                    checkboxLabel: "Box 3"
                },
                                {
                    type: "textWithCheckbox",
                    text: "Full understanding of Operations Requests. Able to use the app to source design info, troubleshoot issues, and verify data from app and design folders",  
                    checkboxLabel: "Box 4"
                },
                "",
                "",
                "Exposure - Has access to app, SME shows how to navigate the app, is shown how to assess information in the request from, is shown how to track ground truthing in the app. ", 
                "", 
                "Sign off", "comment section",
                                                {
                    type: "textWithCheckbox",
                    text: "Detailed knowledge of Water Catchment Guidelines for managing water discharge during drilling, including aquifer protection, permit requirements, and environmental impact controls", 
                    checkboxLabel: "Box 5"
                },
                                                {
                    type: "textWithCheckbox",
                    text: "Understand the difference between DMP for hydro drilling, test pumping, and off-pad discharge. No discharge without AR check, water quality testing, and environmental/biodiversity approval", 
                    checkboxLabel: "Box 6"
                },
                                                                {
                    type: "textWithCheckbox",
                    text: "Enganage communication between Enviro/Bio team and site to coordinate off-pad water discharges", 
                    checkboxLabel: "Box 7"
                },
                "", 
                "Education: Review QRG and process flow. Understand requirements for safe fluid discharge into the environment",
                "", 
                "Sign off", "comment section",
                                                {
                    type: "textWithCheckbox",
                    text: "Compile production data for reporting or to support your Leader as required",  
                    checkboxLabel: "Box 8"
                },
                                                {
                    type: "textWithCheckbox",
                    text: "Full understanding and demonstrated use of data sources: Protrak, DDM, Hydro DDM, State of Play, Earthworks tracking sheets", 
                    checkboxLabel: "Box 9"
                },
                                                {
                    type: "textWithCheckbox",
                    text: "Accurately report weekly drilling, hydro, and earthworks data for Week in Review meetings", 
                    checkboxLabel: "Box 10"
                },
                "",
                "Exposure: SME/Supervisor demonstrates how to access and use data sources, check accuracy, understand data linkages, and view presentation formats", 
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

export default OperationsPop;
