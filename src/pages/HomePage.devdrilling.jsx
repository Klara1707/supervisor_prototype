import "./HomePage.css";
import HeroBar from "../components/HeroBar";
import TabMenu from "../components/TabMenu";
import NavBar from "../components/NavBar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../utils/auth";
import DrillingPop from "../components/DrillingPop";

function HomePage() {
    const navigate = useNavigate();
    const [showDrillingPop, setShowDrillingPop] = useState(false);

    useEffect(() => {
        const token = getToken();
        if (!token) {
            navigate("/login");
        }
    }, [navigate]);

    return (
        <>
            <HeroBar />
            <button style={{margin: 20}} onClick={() => setShowDrillingPop(true)}>Show DrillingPop (DEV TEST)</button>
            {showDrillingPop && <DrillingPop closePopup={() => setShowDrillingPop(false)} />}
            <TabMenu />
            <NavBar />
        </>
    );
}

export default HomePage;
