
import "./Pop.css";
import { useState } from "react";

const DrillingPop = ({ popupId, closePopup }) => {
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
        drilling1: {
            title: "Drilling level 1",
            cells: [
                "Skills/Responsibilities", "Sub Section 1", "Sub Section 2", "Sub Section 3",
                "Training Process", "Training Material", "Reviewer sign off", "Comments",
                    {
                    type: "textWithCheckbox",
                    text: "Understands the content and purpose of the Hydro Borehole Planning Document within hydrogeological projects.Can apply this knowledge operationally to execute planned activities and ensure alignment with project objectives", 
                    checkboxLabel: "Box 1"
                },
                {
                    type: "textWithCheckbox",
                    text: "Understands the purpose and level of detail within the Borehole Planning Document (BHPD). Recognises the importance of fully reviewing and comprehending the content before sign-off to ensure accountability and alignment with project requirements", 
                    checkboxLabel: "Box 2"
                },
                {
                    type: "textWithCheckbox",
                    text:  "Understands the purpose and level of detail within the Borehole Planning Document (BHPD). Recognises the importance of fully reviewing and comprehending the content before sign-off to ensure accountability and alignment with project requirements", 
                    checkboxLabel: "Box 3"
                },
                "", 
                "Education – Borehole Planning Document (BHPD) Hydro team provides context on the purpose, structure, and level of detail in the BHPD Understands operational responsibilities outlined in the documentExposure – BHPD Review and Sign-Off Reviews and signs the BHPD daily under guidance from an SME or Supervisor Gains practical understanding of how to align field activities with project requirements", 
                "", 
                "Sign off", 
                "comment section",

                {
                    type: "textWithCheckbox",
                    text: "Possesses in-depth knowledge of the Fibre Monitoring Management Plan (FMMP) and the Guideline for PF and FA drilling, ensuring compliance and effective application in relevant operational contexts", 
                    checkboxLabel: "Box 4"
                },
                                {
                    type: "textWithCheckbox",
                    text: "Has reviewed the procedure and demonstrates confidence in applying it effectively when required",  
                    checkboxLabel: "Box 5"
                },
                "", 
                "",
                "Engages in educational activities by reading the FMMP document and attending the Geology presentation to deepen understanding of fibre monitoring practices", 
                <button onClick={() => window.open("https://riotinto.sharepoint.com/sites/IODMSHSESCommunities/Controlled_Published/RTIO-HSE-0179525.pdf", "_blank")}>Guideline drilling fibrous </button>,
                "Sign off", "comment section",

                                                {
                    type: "textWithCheckbox",
                    text: "Demonstrates a foundational understanding of Reverse Circulation (RC) drilling, including its purpose, process, and application in exploration and production activities", 
                    checkboxLabel: "Box 6"
                },
                                                {
                    type: "textWithCheckbox",
                    text: "Able to identify an RC rig, understand the required drill suite, and recognize the roles and responsibilities of personnel involved in the drilling process", 
                    checkboxLabel: "Box 7"
                },
                                                {
                    type: "textWithCheckbox",
                    text: "Understands the rig setup requirements on a drill pad necessary to safely and effectively execute a drill hole, ensuring alignment with operational standards and safety protocols", 
                    checkboxLabel: "Box 8"
                },
                                                {
                    type: "textWithCheckbox",
                    text: "Familiar with expected sample outputs and adheres to compliant sample management practices, ensuring accuracy, traceability, and alignment with operational standards", 
                    checkboxLabel: "Box 9"
                },
                "Education: Conducts independent research by utilizing internet resources and reviewing relevant materials to build foundational knowledge. Exposure: Actively engages in field activities with Drillers, Supervisors, and Drill Advisors, asking questions and observing operations to deepen practical understanding.",
                <button onClick={() => window.open("https://riotinto-rtio.atlassian.net/wiki/spaces/KB/pages/98829851/Drilling", "_blank")}>Drilling - RTIO knowledge </button>,
                "Sign off", "comment section",
                                                {
                    type: "textWithCheckbox",
                    text: "Demonstrates a foundational understanding of diamond drilling, including its purpose, equipment, and application in geological exploration and resource definition",  
                    checkboxLabel: "Box 10"
                },
                                                {
                    type: "textWithCheckbox",
                    text: "Able to identify a diamond (DD) rig, understand the required drill suite, and recognize the roles and responsibilities of personnel involved in diamond drilling operations", 
                    checkboxLabel: "Box 11"
                },
                                                {
                    type: "textWithCheckbox",
                    text: "Understands the rig setup requirements on a drill pad necessary to safely and effectively execute a diamond drill hole, ensuring alignment with operational procedures and safety standards", 
                    checkboxLabel: "Box 12"
                },
                                                {
                    type: "textWithCheckbox",
                    text: "Understands the expected sample outputs from diamond drilling and applies appropriate methods for sample handling and management, ensuring accuracy, integrity, and compliance with operational standardst", 
                    checkboxLabel: "Box 13"
                },
                "Education: Builds foundational knowledge through independent research, including internet searches and reviewing relevant materials. Exposure: Gains practical insight by spending time in the field with Drillers, Supervisors, and Drill Advisors—actively engaging in discussions and observing operations to enhance understanding.", 
                <button onClick={() => window.open("https://riotinto-rtio.atlassian.net/wiki/spaces/KB/pages/98829851/Drilling", "_blank")}>Drilling - RTIO knowledge </button>,
                "Sign off", "comment section",
                                                                {
                    type: "textWithCheckbox",
                    text: "Demonstrates a foundational understanding of hydro drilling, including its purpose, equipment, and application in water exploration and resource development", 
                    checkboxLabel: "Box 14"
                },
                                                                {
                    type: "textWithCheckbox",
                    text: "Able to identify a diamond (DD) rig, understand the components of the drill suite, and recognize the roles and responsibilities of personnel involved in diamond drilling operations",  
                    checkboxLabel: "Box 15"
                },
                                                                {
                    type: "textWithCheckbox",
                    text: "Understands the rig setup requirements on a drill pad necessary to safely and effectively execute a diamond drill hole, ensuring compliance with operational procedures and safety standards",  
                    checkboxLabel: "Box 16"
                },
                                                                {
                    type: "textWithCheckbox",
                    text: "Understands the potential hydrogeological outcomes associated with drilling activities, including impacts on groundwater flow, aquifer integrity, and water quality",
                    checkboxLabel: "Box 17"
                },                         
                "Education: Builds foundational knowledge through independent research, including internet searches and reviewing relevant documentation. Exposure: Enhances practical understanding by spending time in the field with Drillers, Supervisors, and Drill Advisors—actively asking questions and observing operations.",
                <button onClick={() => window.open("https://riotinto-rtio.atlassian.net/wiki/spaces/KB/pages/231571457/Hydro+Wiki", "_blank")}>Hydro Wiki - RTIO knowledge </button>,
                "Sign off", "comment section",
            ]
        },
        drilling2: {
            title: "Drilling level 2",
            cells: [
                "Skills/Responsibilities", "Sub Section 1", "Sub Section 2", "Sub Section 3",
                "Training Process", "Training Material", "Reviewer sign off", "Comments",
                                                {
                    type: "textWithCheckbox",
                    text: "Understands the requirements and restrictions for discharging fluids off the pad, including environmental and operational controls",  
                    checkboxLabel: "Box 1"
                },
                                                {
                    type: "textWithCheckbox",
                    text: "Can access and follow the discharge flowchart to assess feasibility. Able to interpret a DMP and apply its information effectively in the field",  
                    checkboxLabel: "Box 2"
                },
                                                {
                    type: "textWithCheckbox",
                    text: "Has comprehensive knowledge of discharge management. Can independently assess and implement a DMP, and provides guidance to others on its application",  
                    checkboxLabel: "Box 3"
                },
                    "",
                "Reads and applies the discharge flowchart process. Receives SME/Supervisor mentoring and assessment on fluid discharge knowledge",   
                <button onClick={() => window.open("https://riotinto.sharepoint.com/sites/6002923/Shared%20Documents/Forms/AllItems.aspx?id=%2Fsites%2F6002923%2FShared%20Documents%2FSpecialist%2FDischarge%20Management%20%2D%20QRG&viewid=5dc9c4e3%2Da8a9%2D43ff%2D8813%2D7c159d78ea59&clickparams=eyAiWC1BcHBOYW1lIiA6ICJNaWNyb3NvZnQgT3V0bG9vayIsICJYLUFwcFZlcnNpb24iIDogIjE2LjAuMTg5MjUuMjAyMTYiLCAiT1MiIDogIldpbmRvd3MiIH0%3D", "_blank")}>Discharge management</button>,
                "Sign off", "comment section",
                                                {
                    type: "textWithCheckbox",
                    text: "Understands the process for receiving Hydro materials to site, including checking deliveries, verifying delivery dockets, reviewing materials plods, and updating the casing register",  
                    checkboxLabel: "Box 4"
                },
                                                {
                    type: "textWithCheckbox",
                    text: "Understands the full process for Hydro materials — from ordering and delivery to documentation, laydown checks, Protrak entry, and invoicing",  
                    checkboxLabel: "Box 5"
                },
                                                {
                    type: "textWithCheckbox",
                    text: "Can implement the Hydro materials process, enter data into Protrak, and troubleshoot invoice issues as needed",  
                    checkboxLabel: "Box 6"
                },
                                "",
                                "Receives mentoring on Hydro materials handling — checking items on arrival, scanning dockets, entering data into Protrak, and updating the casing register",   
                <button onClick={() => window.open("https://riotinto.sharepoint.com/sites/6002923/Shared%20Documents/Forms/AllItems.aspx?csf=1&web=1&e=KhCyR2&CID=d8d841b8%2D5966%2D4f97%2D92b7%2Dc8d4de9781a2&FolderCTID=0x01200090C326DA58F64E4F8996D4464F65ADF6&id=%2Fsites%2F6002923%2FShared%20Documents%2F1%2E%20How%20To%20Project%2FProTrak%2FHydro", "_blank")}>Hydro Share Point</button>,
                "Sign off", "comment section",
                                                                {
                    type: "textWithCheckbox",
                    text: "Accurately validate meters drilled, hole status, and assess cost implications",  
                    checkboxLabel: "Box 7"
                },
                                                {
                    type: "textWithCheckbox",
                    text: "Sources data for DDM and reviews hole status in Protrak to ensure accuracy",  
                    checkboxLabel: "Box 8"
                },
                                                {
                    type: "textWithCheckbox",
                    text: "Delivers accurate end-of-week reporting with clear comments explaining standby and downtime reasons",  
                    checkboxLabel: "Box 9"
                },
                                                                {
                    type: "textWithCheckbox",
                    text: "Understands the importance of accurate data and how it impacts project costs and timelines",  
                    checkboxLabel: "Box 10"
                },
                    "Exposure: Receives mentoring from SME or Superintendent on data accuracy and processing. Can enter detailed comments into DDM and report data to the Superintendent with appropriate granularity",  
                <button onClick={() => window.open("https://riotinto.sharepoint.com/sites/6002923/Shared%20Documents/Forms/AllItems.aspx?id=%2Fsites%2F6002923%2FShared%20Documents%2FSpecialist%2FDischarge%20Management%20%2D%20QRG&viewid=5dc9c4e3%2Da8a9%2D43ff%2D8813%2D7c159d78ea59&clickparams=eyAiWC1BcHBOYW1lIiA6ICJNaWNyb3NvZnQgT3V0bG9vayIsICJYLUFwcFZlcnNpb24iIDogIjE2LjAuMTg5MjUuMjAyMTYiLCAiT1MiIDogIldpbmRvd3MiIH0%3D", "_blank")}>Discharge management Share Point </button>,
                "Sign off", "comment section",
                                                                {
                    type: "textWithCheckbox",
                    text: "Manage hydro drilling material stock levels, including casing register, to prevent loss, wastage, and overstocking",  
                    checkboxLabel: "Box 11"
                },
                                                {
                    type: "textWithCheckbox",
                    text: "Has strong understanding of hydro drilling materials. Can conduct stocktakes and manages stock levels to avoid shortages",  
                    checkboxLabel: "Box 12"
                },
                "",
                "",
                    "Exposure: Is shown how to conduct a stocktake by an experienced team member. Can manage stock levels effectively to prevent shortages.",  

                    "",
                "Sign off", "comment section",
                                                                                {
                    type: "textWithCheckbox",
                    text: "Competently conducts SWAT and DWI inspections, identifying hazards and ensuring corrective actions are implemented",  
                    checkboxLabel: "Box 13"
                },
                                                {
                    type: "textWithCheckbox",
                    text: "Has comprehensive knowledge of SWAT and DWI processes and can confidently provide guidance to others",  
                    checkboxLabel: "Box 14"
                },
                "",
                "",
                    "Education: Reviews the SWAT process chart. Completes SWAT field checks (verified by Superintendent). Completes relevant checks required to issue a SWAT. Exposure: Receives mentoring on DWI from Superintendent, including how to complete the form, assign actions, and close them out",  
                    <button onClick={() => window.open("https://riotinto.sharepoint.com/sites/6002923/Shared%20Documents/Forms/AllItems.aspx?csf=1&web=1&e=XY4hFy&CID=7f3f09b1%2D6eb0%2D4623%2Db299%2D4aca33f7bdf4&FolderCTID=0x01200090C326DA58F64E4F8996D4464F65ADF6&id=%2Fsites%2F6002923%2FShared%20Documents%2F1%2E%20How%20To%20Project%2FHandover%20Process%20SWAT", "_blank")}>Handover Process SWAT</button>,

                "Sign off", "comment section",
                                                                {
                    type: "textWithCheckbox",
                    text:                     "Understands procedures and controls for drilling near historic holes. Coordinates with Driller and Rig Geologist to ensure controls are implemented",  
                    checkboxLabel: "Box 15"
                },


                                                {
                    type: "textWithCheckbox",
                    text: "Understands the risk and its controls. Accesses and applies the flow chart in the field",  
                    checkboxLabel: "Box 16"
                },
                    {
                    type: "textWithCheckbox",
                    text: "Reviews historical holes before each RC and hydro bore drill. Confirms survey work is complete and verifies field controls are in place",  
                    checkboxLabel: "Box 17"
                },
                "",
                "Education Reads and understands the flow chart and supporting documentation. Exposure SME/Supervisor links historical hole checks to the SWAT process during field discussions",  

                <button onClick={() => window.open("https://riotinto.sharepoint.com/sites/IODMSProjectInformationAndTechnology/Controlled_Published/RTIO-HSE-0189925.pdf", "_blank")}>SWP Air drilling </button>,
                "Sign off", "comment section",
                                                                                                                {
                    type: "textWithCheckbox",
                    text: "Demonstrates ability to complete the full SWAT process: physical verification, data collation, communication, and handover",  
                    checkboxLabel: "Box 18"
                },
                                                {
                    type: "textWithCheckbox",
                    text: "Has comprehensive knowledge of the SWAT process and can guide others in conducting it effectively",  
                    checkboxLabel: "Box 19"
                },
                "",
                "",
                    "Review: Understand and refer to the SWAT process chart. Field Checks: Conduct SWAT field verifications, confirmed by Supervisor. Issuance: Complete all required checks prior to issuing a SWAT. Mentoring (DWI): Supervisor demonstrates how to complete a DWI, assign actions, and close them out.",  

                <button onClick={() => window.open("https://safeday.app/", "_blank")}>Safeday app</button>,
                "Sign off", "comment section",

                                                                                                                                {
                    type: "textWithCheckbox",
                    text: "Understands and is competent in processing tyre claims for Drilling Partners",  
                    checkboxLabel: "Box 20"
                },
                                                {
                    type: "textWithCheckbox",
                    text: "Can process and sign off tyre claims, with a clear understanding of invoicing procedures",  
                    checkboxLabel: "Box 21"
                },
                "",
                "",
                "Receives mentoring from SME/Supervisor on processing tyre claims, including guidance on procedures and documentation.",  

                <button onClick={() => window.open("https://riotinto.sharepoint.com/sites/4000233/_layouts/15/AccessDenied.aspx?Source=https%3A%2F%2Friotinto%2Esharepoint%2Ecom%2F%3Aw%3A%2Fr%2Fsites%2F4000233%2F%5Flayouts%2F15%2FDoc%2Easpx%3Fsourcedoc%3D%257B7CCB3956%2D603B%2D40EF%2D9641%2DC4E4ED439519%257D%26file%3DRD%2520Guidelines%2520for%2520Managing%2520Contractor%2520Tyre%2520Claims%2Edoc%26action%3Ddefault%26mobileredirect%3Dtrue%26DefaultItemOpen%3D1&correlation=f233d8a1%2Da05c%2Da000%2D8e8f%2Dfe101a427902&Type=item&name=d6e6c3d4%2D1621%2D41da%2D8255%2D162cebcf4761&listItemId=1743&listItemUniqueId=7ccb3956%2D603b%2D40ef%2D9641%2Dc4e4ed439519", "_blank")}>Contractor tyre claims</button>,
                "Sign off", "comment section",
                                                                                                                                                {
                    type: "textWithCheckbox",
                    text: "Possesses detailed knowledge of the Divisional Drilling Work Practice and applies it effectively in field operations",  
                    checkboxLabel: "Box 22"
                },
                                                {
                    type: "textWithCheckbox",
                    text: "Understands the purpose of the DDWP, has read the document, and can reference it to extract relevant information",  
                    checkboxLabel: "Box 23"
                },
                "",
                "",
                "Has read the DDWP and can relate its practices to field work",  

                <button onClick={() => window.open("https://riotinto.sharepoint.com/sites/IODMSAssetDevelopment/Controlled_Published/RTIO-HSE-0353293.pdf", "_blank")}>Drilling work practice </button>,
                "Sign off", "comment section",
                                                                                                                                                                {
                    type: "textWithCheckbox",
                    text: "Understands the fundamentals of RC (Reverse Circulation) drilling, including its purpose, process, and field application",  
                    checkboxLabel: "Box 24"
                },
                                                {
                    type: "textWithCheckbox",
                    text: "Can identify differences between contractor rigs and understand their respective capabilities",  
                    checkboxLabel: "Box 25"
                },
                                                                {
                    type: "textWithCheckbox",
                    text: "Understands the technical reasons for different RC drilling styles, including drill angle and azimuth, and how they impact geological targeting and data quality",  
                    checkboxLabel: "Box 26"
                },
                                                                                {
                    type: "textWithCheckbox",
                    text: "Understands the sample collection process, analysis methods, and the basics of the geological model used in RC drilling",  
                    checkboxLabel: "Box 27"
                },
                        "Education Uses internet search and reading to build foundational knowledge. Exposure Engages in industry-based conversations with Supervisors, Drill Advisors, and Technical Leads to deepen understanding.",  

                <button onClick={() => window.open("https://riotinto.sharepoint.com/sites/6002923/Shared%20Documents/Forms/AllItems.aspx?csf=1&web=1&e=90ciNS&CID=dffed585%2Db4b3%2D4358%2D8faa%2Dd6ba0461a062&FolderCTID=0x01200090C326DA58F64E4F8996D4464F65ADF6&id=%2Fsites%2F6002923%2FShared%20Documents%2F1%2E%20How%20To%20Project%2FDrilling%20Specifics%2FRC", "_blank")}>RC drilling</button>,
                "Sign off", "comment section",     
                                                                                                                                                    {
                    type: "textWithCheckbox",
                    text: "Understands the principles and process of Diamond (DD) drilling, including its purpose, equipment, and application in geological data collection",  
                    checkboxLabel: "Box 28"
                },
                                                {
                    type: "textWithCheckbox",
                    text: "Can identify differences in contractor rigs and understand their specific capabilities, including rig type, depth capacity, mobility, and suitability for various drilling conditions",  
                    checkboxLabel: "Box 29"
                },
                                                                {
                    type: "textWithCheckbox",
                    text: "Understands the technical reasons for different RC drilling styles, including drill angle and azimuth, and how they impact geological targeting and data quality",  
                    checkboxLabel: "Box 30"
                },
                                                                                {
                    type: "textWithCheckbox",
                    text: "Understands the sample collection process, analysis methods, and the fundamentals of geological, geotechnical, and structural models used in DD drilling",  
                    checkboxLabel: "Box 31"
                },
                "Exposure Builds understanding through industry-based conversations with Supervisors, Drill Advisors, and Technical Leads.",  

                <button onClick={() => window.open("https://riotinto.sharepoint.com/sites/6002923/Shared%20Documents/Forms/AllItems.aspx?csf=1&web=1&e=vjbnaq&CID=c73b714b%2Dbc06%2D45d5%2D89a8%2D71c4bc8e3054&FolderCTID=0x01200090C326DA58F64E4F8996D4464F65ADF6&id=%2Fsites%2F6002923%2FShared%20Documents%2F1%2E%20How%20To%20Project%2FDrilling%20Specifics%2FDD", "_blank")}>Diamond drilling</button>,
                "Sign off", "comment section",
                                                                                                                                                                                {
                    type: "textWithCheckbox",
                    text: "Builds understanding through industry-based conversations with Supervisors, Drill Advisors, and Technical Leads",  
                    checkboxLabel: "Box 32"
                },
                                                {
                    type: "textWithCheckbox",
                    text: "Identify differences in what contractor rigs are capable of",  
                    checkboxLabel: "Box 33"
                },
                                                                {
                    type: "textWithCheckbox",
                    text: "Understand the technical and operational factors influencing drilling method selection",  
                    checkboxLabel: "Box 34"
                },
                                                                                {
                    type: "textWithCheckbox",
                    text: "Understand the water sampling process and basic hydrological modelling",  
                    checkboxLabel: "Box 35"
                },
                "Education – Review and understand the Scope of Work (SOW). Exposure – Engage in industry-based conversations with Supervisors, Drill Advisors, and Technical Leads.",  

                <button onClick={() => window.open("https://riotinto.sharepoint.com/sites/6002923/Shared%20Documents/Forms/AllItems.aspx?csf=1&web=1&e=QbUwyt&CID=0d8b9885%2D40f4%2D4cd4%2D9824%2De35db56edd61&FolderCTID=0x01200090C326DA58F64E4F8996D4464F65ADF6&id=%2Fsites%2F6002923%2FShared%20Documents%2F1%2E%20How%20To%20Project%2FDrilling%20Specifics%2FHYDRO", "_blank")}>Hydro drilling </button>,
                "Sign off", "comment section",
            ]
        },

        drilling3: {
            title: "Drilling level 3 ",
            cells: [
                "Skills/Responsibilities", "Sub Section 1", "Sub Section 2", "Sub Section 3",
                "Training Process", "Training Material", "Reviewer sign off", "Comments",
                    {
                    type: "textWithCheckbox",
                    text: "Understand bore test pumping water management requirements, including SRT, CRT, and DMP protocols", 
                    checkboxLabel: "Box 1"
                },
                {
                    type: "textWithCheckbox",
                    text: "Demonstrates strong knowledge of DMPs, including field execution, water testing, wetting front checks, and desktop reviews of exclusion and avoidance zones", 
                    checkboxLabel: "Box 2"
                },
                "", 
                "", 
                "Builds experience through DMP reviews with SMEs/Supervisors, supported by mentoring during desktop and field checks", 
                <button onClick={() => window.open("https://riotinto.sharepoint.com/sites/IODMSTemporaryPostProcessing/PostProcessingManaged/RTIO-PDE-0122297.docx", "_blank")}>Discharge Management Plan </button>,
                "Sign off", 
                "comment section",

                                {
                    type: "textWithCheckbox",
                    text: "Supports discharge management plan implementation in hydro programs, ensuring alignment with field practices and environmental standards", 
                    checkboxLabel: "Box 1"
                },
                {
                    type: "textWithCheckbox",
                    text: "Ground truths discharge designs and advises on best practices for safe environmental discharge; conducts desktop topography assessments to support planning and risk mitigation", 
                    checkboxLabel: "Box 2"
                },
                "", 
                "", 
                "Builds experience through DMP reviews with SMEs/Supervisors, supported by mentoring during desktop and field checks", 
                <button onClick={() => window.open("https://riotinto.sharepoint.com/sites/IODMSTemporaryPostProcessing/PostProcessingManaged/RTIO-PDE-0122297.docx", "_blank")}>Discharge Management Plan </button>,
                "Sign off", 
                "comment section",

                                    {
                    type: "textWithCheckbox",
                    text: "Support Technical Leads in determining the most effective drilling sequence to meet technical and planning objectives", 
                    checkboxLabel: "Box 3"
                },
                {
                    type: "textWithCheckbox",
                    text: "Collaborate with Geology, Geotechnical, and Hydrogeology designers to gather technical requirements and effectively plan and implement them in the field", 
                    checkboxLabel: "Box 4"
                },
                "", 
                "", 
                "Collaborate with Geology, Geotechnical, and Hydrogeology designers to gather technical requirements and effectively plan and implement them in the field", 
                "", 
                "Sign off", 
                "comment section",

                                                                    {
                    type: "textWithCheckbox",
                    text: "Demonstrates knowledge of hydrogeological bore construction and manages materials to support efficient field execution", 
                    checkboxLabel: "Box 5"
                },
                {
                    type: "textWithCheckbox",
                    text: "Able to receive mentoring from SME/EW Advisor on machine capability, infield direction, and best practice for pad and track construction, with pass-out expected within 12 months", 
                    checkboxLabel: "Box 6"
                },
                            {
                    type: "textWithCheckbox",
                    text: "Able to monitor material orders for timely site delivery, verify items against order lists, and confirm quantities meet project requirements", 
                    checkboxLabel: "Box 7"
                },
                "", 
                "Education – Able to review materials in Protrak and at the laydown area to understand their purpose and application in hydrogeological programs. Exposure – Able to confirm with SMEs/Supervisors that a materials order can be accurately generated from a hydro design.", 
                <button onClick={() => window.open("https://riotinto.sharepoint.com/sites/6002923/Shared%20Documents/Forms/AllItems.aspx?csf=1&web=1&e=KhCyR2&CID=d8d841b8%2D5966%2D4f97%2D92b7%2Dc8d4de9781a2&FolderCTID=0x01200090C326DA58F64E4F8996D4464F65ADF6&id=%2Fsites%2F6002923%2FShared%20Documents%2F1%2E%20How%20To%20Project%2FProTrak%2FHydro", "_blank")}>Hydro Share Point </button>,
                "Sign off", 
                "comment section",

                                                    {
                    type: "textWithCheckbox",
                    text: "Able to understand and manage the impacts of lost circulation and slow penetration rates, identifying key decision points to support continued drilling operations", 
                    checkboxLabel: "Box 5"
                },
                {
                    type: "textWithCheckbox",
                    text: "Provides timely reporting of slow drilling rates, enters relevant comments into DDM, and informs drilling advisors to support prompt resolution and maintain operational efficiency", 
                    checkboxLabel: "Box 6"
                },
                            {
                    type: "textWithCheckbox",
                    text: "Able to collaborate with drilling advisors and contractors to brainstorm solutions, and take ownership in implementing agreed actions to support drilling continuity and efficiency", 
                    checkboxLabel: "Box 7"
                },
                "", 
                "Exposure – Able to receive mentoring from SMEs (Drill Advisors) to understand factors contributing to lost circulation and slow penetration rates, with Supervisor guidance to actively support solution identification and implementation", 
                "", 
                "Sign off", 
                "comment section",

                                                                    {
                    type: "textWithCheckbox",
                    text: "Able to understand and manage the Lost Drill Equipment process, ensuring accurate cost allocation for proper tracking and reporting", 
                    checkboxLabel: "Box 8"
                },
                {
                    type: "textWithCheckbox",
                    text: "Able to review the stuck pipe procedure and understand the cost and time implications, supporting informed decision-making during drilling operations", 
                    checkboxLabel: "Box 9"
                },
                            {
                    type: "textWithCheckbox",
                    text: "Able to collaborate with the contractor to agree on effective pipe abstraction methods, request cost estimates for equipment left in-hole, and provide realistic recovery timeframes to support informed decision-making", 
                    checkboxLabel: "Box 10"
                },
                                            {
                    type: "textWithCheckbox",
                    text: "Able to fully understand the stuck rods procedure, determine appropriate recovery methods and timeframes, and ensure accurate data entry in Protrak and Enablon", 
                    checkboxLabel: "Box 11"
                },
                "Education – Able to review the Quick Reference Guide (QRG) to understand its intent and apply the process effectively in the field. Exposure – Able to receive guidance from SMEs/Supervisors on navigating the process, including documentation and reporting steps, and gain insight into decision-making processes and outcomes", 
                <button onClick={() => window.open("https://riotinto.sharepoint.com/:w:/r/sites/IODMSAssetDevelopment/_layouts/15/Doc.aspx?sourcedoc=%7BAB763650-E8EE-4002-A1D5-B826C837988B%7D&action=View", "_blank")}>Guide drill pipe </button>,
                "Sign off", 
                "comment section",

                
                                                                    {
                    type: "textWithCheckbox",
                    text: "Able to demonstrate knowledge of instrument types and installation methods for hydrogeological and geotechnical purposes, including VWPs, ensuring correct application and integration into field programs", 
                    checkboxLabel: "Box 12"
                },
                {
                    type: "textWithCheckbox",
                    text: "Able to understand the scope of work and ensure correct instruments are identified, ordered, and stored onsite prior to Field Personnel engagement, supporting smooth and timely execution of hydrogeological and geotechnical programs", 
                    checkboxLabel: "Box 13"
                },
                "", 
                "", 
                "Exposure – Able to receive guidance from Hydrogeology SMEs on instrument types, their functions, and installation methods, supporting practical understanding and field readiness", 
                "", 
                "Sign off", 
                "comment section",

                                                    {
                    type: "textWithCheckbox",
                    text: "Able to understand the full VWP installation process, including grouting techniques and procedural steps, ensuring correct setup and data integrity for hydrogeological and geotechnical monitoring", 
                    checkboxLabel: "Box 14"
                },
                {
                    type: "textWithCheckbox",
                    text: "Able to fully understand the Fluid Potential work scope, verify tasks in the field, and perform CMS duties to support program execution", 
                    checkboxLabel: "Box 15"
                },
                            {
                    type: "textWithCheckbox",
                    text: "Able to demonstrate full understanding of the Fluid Potential work scope, verify assigned tasks in the field, and execute CMS responsibilities to ensure compliance and data integrityg", 
                    checkboxLabel: "Box 16"
                },
                "", 
                "Exposure – Able to receive guidance from Hydrogeology SMEs on instrument types, their functions, and installation methods, supporting practical understanding and correct field application", 
                "", 
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

export default DrillingPop;

