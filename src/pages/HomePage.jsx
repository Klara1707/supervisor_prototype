import "./HomePage.css";
import HeroBar from "../components/HeroBar";
import TabMenu from "../components/TabMenu";
import NavBar from "../components/NavBar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../utils/auth";
// import TestPop from "../components/TestPop";


function HomePage() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = getToken();
        if (!token) {
            navigate("/login");
        }
        // Try to get user info from storage
        let userStr = localStorage.getItem("user") || sessionStorage.getItem("user");
        if (userStr) {
            try {
                setUser(JSON.parse(userStr));
            } catch {
                setUser(null);
            }
        }
    }, [navigate]);

    // Compose welcome message
    let welcomeName = "";
    if (user) {
        if (user.first_name || user.last_name) {
            welcomeName = `${user.first_name || ""} ${user.last_name || ""}`.trim();
        } else if (user.username) {
            welcomeName = user.username;
        } else if (user.email) {
            welcomeName = user.email;
        }
    }

    return (
        <>
            <HeroBar />
            <div style={{ textAlign: "center", margin: "2rem 0 0 0", fontSize: "1.5rem", fontWeight: 500 }}>
                {"Welcome"} {welcomeName && <span>{welcomeName}</span>}
            </div>
            <TabMenu />
            <NavBar />
        </>
    );
}

export default HomePage;

