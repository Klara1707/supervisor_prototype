import "./HomePage.css";
import HeroBar from "../components/HeroBar";
import TabMenu from "../components/TabMenu";
import NavBar from "../components/NavBar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../utils/auth";
// import TestPop from "../components/TestPop";

function HomePage() {
    const navigate = useNavigate();
    // Production: no debug or test state
    useEffect(() => {
        const token = getToken();
        if (!token) {
            navigate("/login");
        }
    }, [navigate]);

    return (
        <>
            <HeroBar />
            <TabMenu />
            <NavBar />
        </>
    );
}

export default HomePage;

