import "./HomePage.css";
import HeroBar from "../components/HeroBar";
import TabMenu from "../components/TabMenu";
import NavBar from "../components/NavBar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../utils/auth";
import TestPop from "../components/TestPop";

function HomePage() {
    const navigate = useNavigate();
    const [openTestLevel, setOpenTestLevel] = useState(null);

    useEffect(() => {
        const token = getToken();
        if (!token) {
            navigate("/login");
        }
    }, [navigate]);

    return (
        <>
            {/* TEMPORARY TESTPOP BUTTONS */}
            <div style={{ display: 'flex', gap: '10px', margin: '20px 0', justifyContent: 'center' }}>
                <button onClick={() => setOpenTestLevel(1)}>Test Level 1</button>
                <button onClick={() => setOpenTestLevel(2)}>Test Level 2</button>
                <button onClick={() => setOpenTestLevel(3)}>Test Level 3</button>
            </div>
            {openTestLevel && (
                <TestPop popupId={`testlevel${openTestLevel}`} closePopup={() => setOpenTestLevel(null)} userToken={null} openLevel={openTestLevel} />
            )}
            <HeroBar />
            <TabMenu />
            <NavBar />
        </>
    );
}

export default HomePage;

