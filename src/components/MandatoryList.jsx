
import React, { useState, useEffect } from "react";
import "./MandatoryList.css";

function MandatoryList() {
    const trainingList = [
        "RTIO RD Earthworks",
        "RTIO RD Drilling",
        "RTIO Driver Safety System (DSS)",
        "RT Cyber Security Awareness",
        "RTIO Functional Safety Awareness",
        "RTIO L1 Basic Incident Investigation",
        "RT MATE Bystander programme",
        "RTIO IHMP Training for Team Members",
        "RTIO Pit Permit Rules V19 Awareness",
        "RTIO Pit Permit Rules V19 Driving",
        "RTIO Pit Permit Rules V19 Engagement",
        "RT Building Everyday Respect for All",
        "RTIO Electrical Hazard Awareness SWBT",
        "RTIO Cultural Awareness Noongar",
        "RT Code of Conduct Online",
        "RTIO MEQ Isolation Officer Theory",
        "RTIO Mobility and Tablet Essentials",
        "RT Code of Conduct Adaptive Learning",
        "RTIO Airborne Contaminant Control",
        "RTIO Introduction to Change Management",
        "RTIO Fibrous Minerals Awareness",
        "RTIO Mobile Equipment Spotter",
        "RTIO Noise Awareness",
        "RTIO Issue Hot Work Permit",
        "RTIO Essentials",
        "RTIO Snr Staff Environment Orientation",
        "RTIO Individual Rail Access Road Permit",
        "RTIO Heritage Awareness",
        "RTIO Manual Handling Awareness",
        "RTIO RD Weed Control",
        "RTIO Geotechnical Awareness Basic",
        "RTIO Geotechnical Awareness Advanced",
        "RTIO Black Shale Awareness",
        "RTIO Heat Stress Prevention Measures",
        "RTIO IVMS Compliancy",
        "RTIO Issue Excavation Permit",
        "RTIO Contractor Management Awareness",
        "RTIO Land Clearing",
        "RTIO Mineral Waste Management Plan",
        "RTIO Res Dev Field Induction",
        "RTIO Cultural Awareness at Rio Tinto",
        "RTIO Safe Transportation of Goods",
        "RTIO Positive Radio Communication",
        "RTIO Geotech Hazards for Natural Slopes",
        "RTIO Contribute WHS Risk Management",
        "RTIO Implement WHS Policies",
        "RTIO Facilitate Effective Prestart",
        "RTIO PM Code",
        "RTIO Leader Psychosocial Risk Mngt",
        "QSI Proficient",
        "RTIO Sleep Health and Fatigue Education",
        "RTIO Contractor Management Company Rep",
        "RTIO Provide First Aid",
        "RTIO Issue Working at Heights Permit",
        "RT Load Distribution and Restraint Full",
        "RTIO HPD Fit Test 2 Yearly",
        "RTIO Operate and Maintain a 4WD",
        "RTIO Essentials For Site",
        "RTIO Lship Ess Injury Management",
        "RTIO IWP Essentials and Lockholder",
        "RTIO MEQ Isolation Officer",
        "RTIO CRM CCC Pass Out",
        "RTIO CRM CCFV",
        "RTIO WHS Legislation Examination SS",
        "RTIO EPSup Understand self to lead teams",
        "RTIO EPSup Exceptional communication",
        "RTIO EPSup Lead continuous improvement",
        "RTIO EPSup Risk & project management",
        "RTIO Supervisor Program Graduation",
        "RTIO Supervisor LB1 Coaching",
        "RTIO Supervisor LB2 Coaching",
        "RTIO Supervisor LB3 Coaching",
        "RTIO Supervisor LB4 Coaching",
        "RTIO Operate 4WD in Steep Terrain VOC",
    ];

    const onlineItems = [/* same as before */];
    const classroomItems = [/* same as before */];
    const onJobItems = [/* same as before */];
    const supervisorItems = [/* same as before */];
    const vocItems = ["RTIO Operate 4WD in Steep Terrain VOC"];

    const [checkedItems, setCheckedItems] = useState(Array(trainingList.length).fill(false));
    const [showButton, setShowButton] = useState(false);

    const handleCheckboxChange = (index) => {
        const updatedItems = [...checkedItems];
        updatedItems[index] = !updatedItems[index];
        setCheckedItems(updatedItems);
    };

    const completedCount = checkedItems.filter(Boolean).length;
    const percentage = Math.round((completedCount / trainingList.length) * 100);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    useEffect(() => {
        const handleScroll = () => {
            setShowButton(window.scrollY > 300);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="container">
            <section className="requirements">
                <h2>Mandatory Training</h2>

                {/* Progress Bar */}
                <section>
                    <div id="myProgress">
                        <div id="myBar" style={{ width: `${percentage}%` }}>
                            <span id="percentage">{percentage}%</span>
                        </div>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="navigation-buttons">
                        <button onClick={() => document.getElementById("online-training").scrollIntoView({ behavior: "smooth" })}>
                            Online Training
                        </button>
                        <button onClick={() => document.getElementById("classroom-training").scrollIntoView({ behavior: "smooth" })}>
                            Classroom Training
                        </button>
                        <button onClick={() => document.getElementById("onjob-training").scrollIntoView({ behavior: "smooth" })}>
                            On-the-Job Training
                        </button>
                        <button onClick={() => document.getElementById("supervisor-training").scrollIntoView({ behavior: "smooth" })}>
                            Supervisor Training
                        </button>
                        <button onClick={() => document.getElementById("voc-training").scrollIntoView({ behavior: "smooth" })}>
                            VOC Sign Off
                        </button>
                    </div>
                </section>

                {/* Training Sections */}
                {[
                    { id: "online-training", title: "Online Training", items: onlineItems },
                    { id: "classroom-training", title: "Classroom Training", items: classroomItems },
                    { id: "onjob-training", title: "On-the-Job Training", items: onJobItems },
                    { id: "supervisor-training", title: "Supervisor Training", items: supervisorItems },
                    { id: "voc-training", title: "VOC Sign Off", items: vocItems },
                ].map(({ id, title, items }) => (
                    <div className="container3" id={id} key={id}>
                        <h3><strong>{title}</strong></h3>
                        {trainingList.map((training, index) =>
                            items.includes(training) ? (
                                <div key={index}>
                                    {training}
                                    <label className="custom-checkbox">
                                        <input
                                            type="checkbox"
                                            checked={checkedItems[index]}
                                            onChange={() => handleCheckboxChange(index)}
                                        />
                                        <span className="checkmark"></span>
                                    </label>
                                </div>
                            ) : null
                        )}
                    </div>
                ))}
            </section>

            {/* Back to Top Button */}
            {showButton && (
                <button className="back-to-top" onClick={scrollToTop}>
                    Back to Top
                </button>
            )}
        </div>
    );
}

export default MandatoryList;
