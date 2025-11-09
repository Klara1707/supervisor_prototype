
import "./HeroBar.css";
import benchImage from "../components/res dev bench.jpg"; // Make sure this path is correct

function HeroBar() {
    return (
        <div className="hero-bar">
            <div className="hero-image">
                <img src={benchImage} alt="Resource Development Bench" />
            </div>
            <div className="hero-text">
                <h1>RTIO Resource Development</h1>
                <p>Supervisor Training Portal</p>
            </div>
        </div>
    );
}

export default HeroBar;
