// import { useDebouncedSave } from "../hooks/useDebouncedSave";
import "./Pop.css";
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import SignOffForm from "./SignOffForm";
import { renderLinkButton } from "./linkButtons";

const LevelPopup = ({ level, onClose, popupId, userToken, onProgressUpdate }) => {
            // Texts for each popup level
            const boxTextsByLevel = {
                1: [
                    ["Monitor production status in your area and update DDM daily with values and relevant comments", 
                        "Accurately enters data from plods into DDM with detailed comments. Understands weekly targets, including drilling meters, pads completed, rehab hectares, and bores drilled", 
                        "Understands the importance of reporting standby and downtime, and actively contributes to identifying solutions to reduce it", 
                        "Delivers Monday updates to leader, covering weekly target achievement, current priorities, and the two-week forward plan", 
                        "Exposure: Mentored by SME/Supervisor in accessing key data sources (plods, tracking sheets, Protrak, State of Play). Developed accuracy in data entry, detailed standby/downtime comments, and confidence in presenting weekly data to Superintendent in Monday review meetings", 
                        "DDMM"],
                    ["Manages own flight and accommodation bookings; supports contractor travel arrangements as needed", 
                        "Proficient in PALMS", 
                        "", 
                        "", 
                        "Exposure: Guided in setting rosters and using the ad hoc change form. Has access to the WBS register for cost codes and PDAs", 
                        "Palms"],
                    ["Competent in using State of Play to manage projects and understands how data is captured and reported", 
                        "Uses State of Play data to report on drilling and earthworks progress, and to forecast production rates for work completion", 
                        "", 
                        "", 
                        "Exposure: Supported by SME/Supervisor to gain access and receive guidance on using State of Play, including how to interpret and assess data effectively", 
                        "ArcGIS"],
                    ["Competent in using Weatherguard to monitor weather events, with a clear understanding of the lightning procedure and associated responsibilities", 
                        "Monitors Weatherguard during lightning activity and promptly reports to the Project Leader for shutdown recommendations",
                        "", 
                        "", 
                        "Exposure: Shown how to log in and use Weatherguard to track lightning and receive weather alerts", 
                        "Weatherzone"],
                    ["Competent in the SWAT process, including creation, completion, and handover of tasks", 
                        "Understands the pad approval process: pads are constructed, checked by Cat 3 and Drilling Supervisors, rework is flagged if needed, and once signed off by all parties, the pad is handed over to Geos for Protrak status update", 
                        "Able to gather all required data for a SWAT, including drill designs, MMPK maps, survey confirmations, water and fuel sources, radio channels, and heritage delineation", 
                        "Completes SWAT by ensuring all pads are checked, paperwork is signed, rework is organised, data is verified, and all stakeholders are informed via email", 
                        "Exposure: Mentored by SME/Supervisor on compiling all relevant pad data for SWATs, including field-based guidance on pad checks. Shadowed during stakeholder communications to ensure accuracy of checks and completeness of data before submission", 
                        "SWAT"],
                    ["Has detailed knowledge of the RTIO Fitness for Work Policy and can confidently apply it in day-to-day operations", 
                        "Has read and understands the RTIO Fitness for Work Policy, and applies it to ensure their own safety and wellbeing, particularly during high-risk activities such as nightshift work", 
                        "", 
                        "", 
                        "Has read, understands, and applies the RTIO Fitness for Work Policy", 
                        "FMWP"],
                    ["Has detailed knowledge of the RTIO AOD Policy and applies it appropriately to ensure personal safety and compliance with site requirements", 
                        "Has read and understands the RTIO AOD Policy, and applies it to support their own safety and wellbeing", 
                        "Understands and can apply the correct process for managing a non-negative Alcohol and Other Drugs (AOD) result, including adherence to confidentiality protocols", 
                        "", 
                        "Education: AOD Policy. Has read, understands, and applies the RTIO Alcohol and Other Drugs (AOD) Policy. Applies the policy to support personal safety and wellbeing. Exposure: AOD Policy Application. Shadowed by an SME or Supervisor to ensure correct application of the policy. Understands and follows the process for managing non-negative results. Maintains confidentiality in line with policy protocols", 
                        "AOD"],
                    ["Competent in maintaining the currency of own qualifications, including proactively booking and managing both internal and external training courses", 
                        "Competent in maintaining the currency of own qualifications. Proactively books internal and external training courses. Can access and navigate their training and qualification profile in Prospect", 
                        "Understands the minimum training requirements for their role. Recognises the importance of maintaining current qualifications. Understands how individual compliance contributes to the department’s collective Licence to Operate", 
                        "", 
                        "Exposure: My Learning in Prospect. Shown how to access My Learning in Prospect. Understands the importance of keeping qualifications current. Learns how to search for and book internal courses using the My Learning platform. Guided by an SME or Supervisor during the process", 
                        "Prospect"],
                    ["Exposure: My Learning in Prospect.Shown how to access My Learning in Prospect. Understands the importance of keeping qualifications current. Learns how to search for and book internal courses using the My Learning platform. Guided by an SME or Supervisor during the process", 
                        "Can access the Res Dev Roster and Workday systems. Able to enter and manage leave requests independently", 
                        "Has a good understanding of the different types of leave available and how each is applied in line with company policies and procedures", 
                        "", 
                        "Has access to Workday and the Res Dev Roster. Shown how to enter leave and navigate the Workday system. All leave types and their applications are explained. Guided by an SME or Supervisor during the process", 
                        "Roster, Workday"],
                ],
                2: [
                    ["Understand demand forecasting and optimisation requirements specific to your project, including roster patterns and travel lead times. Be aware of accommodation constraints, such as room availability, site capacity, and booking windows. Know how PDA (Project Delivery Allocation) impacts travel and accommodation planning, and ensure alignment with project schedules and personnel movements", 
                        "Develop a comprehensive understanding of the Quality Procurement Process (QPP) and its integration with Finance and Operations (F+O) systems. Gain familiarity with accommodation constraints, including policy limitations and operational impacts. Build working knowledge of Project Delivery Agreements (PDAs) and their relevance to contract management and execution", 
                        "Able to accurately report personnel presence on site using validated data sources. Proficient in navigating and extracting relevant information from the F+A SharePoint page. Can assist with the coordination of personnel movements between sites, ensuring alignment with operational requirements. Supports the review and assessment of accommodation lists, identifying constraints and ensuring compliance with site capacity and policy guidelines", 
                        "", 
                        "Has access to the Travel and Logistics web page and understands how to navigate its key features. Receives an overview of the Quality Procurement Process (QPP) and Project Delivery Agreements (PDAs), as explained by a Subject Matter Expert (SME) or Supervisor. Is shown where to locate essential information related to bus schedules, flight details, and accommodation data, supporting informed decision-making and operational coordination.", 
                        "TravelLogistics"],
                    ["Proficient in using ServiceNow to raise, modify, or cancel project-related tickets", 
                        "Able to use ServiceNow to request a wide range of services and ticket types", 
                        "", 
                        "", 
                        "Has access to ServiceNow and can use quick links and search functions to locate relevant tickets and service requests", 
                        "ServiceNow"],
                    ["Competent in using GIS applications including ArcGIS Pro, ArcPortal, MMPK, and Field Maps", 
                        "Has access to ArcPortal and can upload project files and use mapping tools to ground-truth drilling designs from desktop", 
                        "Proficient in ArcGIS; can create MMPKs for Field Maps and load them onto iPads and Samsung tablets", 
                        "Operations L2: Box 16", 
                        "Education: Reads and reviews how-to guides for accessing and using ArcGIS tools. Exposure: Receives mentoring from experienced ArcGIS users (e.g., Supervisors, Geos, Hydros, Surveyors) on using the Portal, uploading files, and working with map layers", 
                        "ArcProInstall"],
                    ["Proficient in using Prospect and Workday to manage personal workflow, reports, qualifications, development, and performance", 
                        "Can initiate check-ins and development plans, view qualifications, raise notifications, update personal information, and manage tasks via the worklist", 
                        "", 
                        "", 
                        "Mentored by a Subject Matter Expert (SME) or Supervisor on using Prospect and Workday. Supervisors provide examples of development plans and check-in templates to support learning", 
                        "Roster, Workday"],
                    ["Understands the Operations Request (OR) process, its key components, and the use of the OR Tracking App as managed by the Planning Team",
                        "Understands how Operations Requests relate to team activities; can navigate the OR Tracking App to access and interpret relevant data and information", 
                        "Regularly checks the OR Tracking App each swing for outstanding ground-truthing tasks. Can cross-reference Operations Requests with the two-week plan, Plan-to-Plan, and P6 Gantt to ensure alignment", 
                        "", 
                        "Mentored by SME or Supervisor to ensure proficient use of the Operations Request App. Understands how to locate drilling designs and extract key information from Operations Request forms. Has access to the P6 Gantt and can filter relevant information", 
                        "PlanningApp, P6Gantt"],
                    ["Able to conduct quality ground-truthing activities and accurately record data relevant to Operations Requests", 
                        "Mentored by a Subject Matter Expert (SME) to conduct thorough and effective ground-truthing activities, ensuring accurate data collection for Operations Requests", 
                        "Know how to use the app to identify GT, initial desk top review on ArcGIS, able to  manage data for field verification, able to identify issues with design (Pads off AR, too close to heritage, access issues, ground conditions, etc)", 
                        "Has full knowledge of ground-truthing processes. Can independently gather required tools and data, conduct both desktop and field checks, provide feedback via the Operations Request App, and communicate directly with designers to suggest design changes", 
                        "Mentored by SME or Supervisor on conducting ground-truthing activities. Training includes performing desktop reviews in ArcGIS, identifying design issues (e.g. access, heritage, ground conditions), and using Field Maps and ServiceNow to support field checks", 
                        ""],
                    ["Understands the AR process, including how to search for and locate requests. Can identify package-specific conditions and requirements within the AR system", 
                        "Understands which stakeholders are involved in approving ARs. Has access to ARCs and knows how to search for ARs. Demonstrates general knowledge of AR conditions and can identify package-specific requirements", 
                        "Able to assess Approval Request (AR) conditions and implement them effectively. Provides guidance to other stakeholders on condition requirements and ensures compliance through collaboration and communication", 
                        "", 
                        "Has access to ARCs and is able to search for Approval Requests (ARs). Can extract relevant information from ARs. Receives mentoring from a SME or Supervisor to build proficiency in navigating and interpreting AR documentation", 
                        "LAMS"],
                    ["Understands the different clearing mechanisms—POW, NVCP, and Part IV—and how their specific conditions impact operational activities and project planning", 
                        "Understands the differences between clearing mechanisms—POW, NVCP, and Part IV—and the specific conditions associated with each. Recognizes how these conditions influence operational planning and execution", 
                        "Confidently provides advice and instruction on POW, NVCP, and Part IV clearing mechanisms. Understands their differences, associated conditions, and how they impact operational planning and execution", 
                        "Able to implement required controls in the field and verify clearing methods to ensure compliance with conditions outlined in POW, NVCP, and Part IV mechanisms", 
                        "Education: Understands the Land Disturbance Work Practice and its relevance to operational activities. Exposure: Has access to ARCs and can search for and extract information from Approval Requests (ARs). Receives mentoring from a SME or Supervisor to build proficiency in interpreting ARs and applying relevant conditions.", 
                        "LDWP"],
                    ["Demonstrates detailed understanding of the Laydown Management Guidelines, including principles, requirements, and practical application in field and planning activities", 
                        "Has read and understands the Laydown Management Guidelines, including their application in planning and field activities", 
                        "Able to apply WPI guidelines, identify non-compliances, and address them in Safeday", 
                        "", 
                        "Education: Read, understand, and apply WPI guidelines in the field. Exposure: SME or Supervisor to demonstrate effective application.", 
                        "LaydownGuidelines"],
                    ["Understand the Weekly Plan and the Operations Team’s role in executing the Plan within the MOS framework",
                        "Understand the planning flow, including Monthly and 2-Weekly Plans", 
                        "Use the P6 Gantt chart to track progress, assess start and finish times, and provide feedback to the planning team", 
                        "Attends 2-week planning meetings, negotiates drilling and earthworks targets, provides feedback on the plan, takes ownership of actions, and ensures closure", 
                        "Mentored by SME/Supervisor in using the P6 Gantt chart. Attend 2-week planning meetings. Provide feedback to the planning team for Friday meetings. Learn to link the 2-week plan to the Gantt chart. Guided in assessing targets and delivering effective feedback", 
                        "ReportDashboard"],
                    ["Has detailed knowledge of the Unisolated Work Process and can perform associated tasks within their area of responsibility", 
                        "Can access the database to search for procedures. Has a solid understanding of tasks permitted under the Unisolated Work Process (UWP)",
                        "Has a comprehensive understanding of tasks permitted under the Unisolated Work Process (UWP), conducts field checks, and integrates UWP into LIF activities", 
                        "Performs field verifications on individual Working with Live Equipment procedures to ensure compliance with documented processes", 
                        "Receives mentoring from SME/Drill Advisor/Supervisor on the Working with Live Equipment (WWLE) process — including its purpose, management, and field application. Observes WWLE being performed and demonstrates capability to conduct field checks under supervision", 
                        ""],
                    ["Has detailed knowledge and applies RTIO and ResDev guidelines for protection and clearing near Heritage areas, including adherence to Golden Rules and L2WI requirements", 
                        "Has read the Golden Rules and understands when Level 2/3 Work Instructions are required. Supports operators in preparing and conducting Level 2/3 instructions", 
                        "Provides guidance to operators on the Golden Rules. Has comprehensive knowledge of clearing requirements near Heritage and AR boundaries", 
                        "", 
                        "Education: Reads the Start-Up QRG and Golden Rules document, and understands their intent. Exposure: Golden Rules are explained; can apply them in the field and instruct survey teams to check flagging around heritage sites", 
                        "ProjectStartUp"],
                    ["Develop and implement Traffic Management Plans specific to project needs", 
                        "Develop and implement Traffic Management Plans tailored to project requirements", 
                        "Ensure the Traffic Management Plan is updated whenever field conditions change", 
                        "", 
                        "Education: Has read the local Traffic Management Plan and understands its content. Exposure: Is shown by the Superintendent or Coordinator how to update the TMP when permanent field changes occur",  
                        ""],
                    ["Prepare and Distribute Site Notifications/Banners", 
                        "Knows how to prepare a Blue Banner and distribute it to the correct group email", 
                        "", 
                        "", 
                        "Education: Has read and understands the Blue Banner template. Exposure: Can complete relevant information and send it to the correct audience, with mentoring from the Superintendent.", 
                        "BannerTemplates"],
                    ["Understands pit permit, training, and AHS (Autonomous Haulage System) requirements relevant to site access and operations", 
                        "Has completed V19 Pit Permit Rules training and understands the requirements for obtaining an AHS pit permit", 
                        "Can provide guidance on the AHS pass-out process and assist in facilitating the VOC (Verification of Competency) with Mine Operations or Resource Development OJT", 
                        "", 
                        "Reads and understands the Pit Permit Rules and completes the online V19 training", 
                        "PitPermitRules"],
                ],
                3: [
                    ["Competent in using the GAP platform to manage remote workers via SHOUT or SPOT units", 
                        "Can track users on the portal, can send messages to shout units. Fully understands the functionality of the shout unit and responds to alerts", 
                        "", 
                        "", 
                        "Exposure – SME-led survey to demonstrate SHOUT unit functionality, including portal sign-in and movement tracking", 
                        "GAP"],
                    ["Understand and execute Operations Requests for assigned Drilling, Hydro, and Earthworks projects as per plan",
                        "Full understanding of Operations Requests. Able to use the app to source design info, troubleshoot issues, and verify data from app and design folders", 
                        "", 
                        "", 
                        "Exposure: Has access to app, SME shows how to navigate the app, is shown how to assess information in the request from, is shown how to track ground truthing in the app", 
                        ""],
                    ["Detailed knowledge of Water Catchment Guidelines for managing water discharge during drilling, including aquifer protection, permit requirements, and environmental impact controls", 
                        "Understand the difference between DMP for hydro drilling, test pumping, and off-pad discharge. No discharge without AR check, water quality testing, and environmental/biodiversity approval", 
                        "Aranage communication between Enviro/Bio team and site to coordinate off-pad water discharge", 
                        "", 
                        "Education: Review QRG and process flow. Understand requirements for safe fluid discharge into the environment", 
                        "SWM"],
                    ["Compile production data for reporting or to support your Leader as required", 
                        "Full understanding and demonstrated use of data sources: Protrak, DDM, Hydro DDM, State of Play, Earthworks tracking sheets", 
                        "Accurately report weekly drilling, hydro, and earthworks data for Week in Review meetings",
                        "", 
                        "Exposure: SME/Supervisor demonstrates how to access and use data sources, check accuracy, understand data linkages, and view presentation formats", 
                        "DDMM"],
                    ]
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
            if (!popupId || !userToken) return;
            const payload = {
                popupId,
                gridProgressChecks,
                comments,
                signOffs,
                progressPercentage: percentage
            };
            await fetch("/api/training-progress/", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${userToken}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });
            setSaveStatus('success');
            if (onProgressUpdate) await onProgressUpdate();
            // Re-fetch latest progress after save
            await fetchProgress();
            setTimeout(() => setSaveStatus('idle'), 1200);
        };
    // Grid headers
    const headers = [
        "Skills/Responsibilities", "Sub Section 1", "Sub Section 2", "Sub Section 3",
        "Training Process", "Training Material", "Reviewer sign off", "Comments"
    ];
    // Defensive: pad boxTexts for rendering
    let safeBoxTexts = boxTexts;
    let numRows = 7;
    if (level === 1) {
        numRows = 9;
        if (boxTexts.length < 9) {
            safeBoxTexts = [
                ...boxTexts,
                ...Array(9 - boxTexts.length).fill(null).map(() => Array(6).fill(""))
            ];
        }
    } else if (level === 2) {
        numRows = 15;
        if (boxTexts.length < 15) {
            safeBoxTexts = [
                ...boxTexts,
                ...Array(15 - boxTexts.length).fill(null).map(() => Array(6).fill(""))
            ];
        }
    } else if (level === 3) {
        numRows = 4;
        if (boxTexts.length < 4) {
            safeBoxTexts = [
                ...boxTexts,
                ...Array(4 - boxTexts.length).fill(null).map(() => Array(6).fill(""))
            ];
        }
    }
    // For grid checkboxes: 6 columns x numRows rows
    const [gridProgressChecks, setGridProgressChecks] = useState(Array(numRows).fill(null).map(() => Array(6).fill(false)));
    // Per-row comment state
    const [comments, setComments] = useState(Array(numRows).fill(""));
    const [signOffs, setSignOffs] = useState(Array(numRows).fill(null).map(() => ({ name: "", date: "", signed: false })));
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

    // Auto-save progress to backend on every change and on unmount (close)
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
        // Also save on unmount (when popup closes)
        return () => {
            fetch("/api/training-progress/", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${userToken}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });
            if (onProgressUpdate) onProgressUpdate();
        };
        // eslint-disable-next-line
    }, [gridProgressChecks, comments, signOffs, percentage, popupId, userToken, hasLoaded]);

    // Build table rows for Bootstrap table
    const tableRows = [];
    // Header row
    // Set consistent width for columns 0-4 to match DrillingPop
    // Set consistent width for columns to match DrillingPop
    // Set 'Skills/Responsibilities' (0) and 'Training Process' (4) to 180, all Sub Sections (1,2,3) to 140
    const colWidths = [180, 140, 140, 140, 180, 140, 160, 180];
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
        tableRows.push(
            <tr key={row}>
                {/* Progress checkboxes with unique text, always 6 columns */}
                {[0,1,2,3,4,5].map(col => {
                    const cellText = safeBoxTexts[row-1][col];
                    let content = cellText;
                    if (typeof cellText === "string" && cellText.includes(",")) {
                        content = cellText.split(",").map(key => renderLinkButton(key.trim()));
                    } else if (typeof cellText === "string" && cellText in require('./linkButtons').LINK_DEFS) {
                        content = renderLinkButton(cellText);
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

    // Helper component for per-row sign-off form
    // Move outside the loop
    // ...existing code...

    return (
        <div className="popup-overlay">
            <div className="popup-content level-popup" style={{ maxWidth: 900 }}>
                <h2>Operations Level {level}</h2>
                <button
                    className="save-progress-btn"
                    onClick={handleManualSave}
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



function OperationsPop({ popupId, closePopup, userToken, onProgressUpdate }) {
    if (!popupId) return null;
    let openLevel = null;
    if (popupId === "operations1") openLevel = 1;
    else if (popupId === "operations2") openLevel = 2;
    else if (popupId === "operations3") openLevel = 3;

    return (
        openLevel ? (
            <div className="popup-overlay operations-popup-fadein">
                <div className="popup-container operations-popup-centered">
                    <button className="close-btn" onClick={closePopup} style={{ float: 'right' }}>Close</button>
                    <LevelPopup level={openLevel} onClose={closePopup} popupId={popupId} userToken={userToken} onProgressUpdate={onProgressUpdate} />
                </div>
            </div>
        ) : null
    );
}

export default OperationsPop;