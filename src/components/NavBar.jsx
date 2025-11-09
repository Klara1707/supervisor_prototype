import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom"; // Add this at the top
import "./NavBar.css";

function NavBar() {

    return (
        <>
            <nav className="nav-bar">
                <h3>Find Your Way to</h3>
                <div className="nav-links">
                <a href ="https://prospect.riotinto.org/irj/portal" className="nav-button">Prospect</a>
                <a href="https://riotinto.csod.com/ui/lms-learner-home/home" className="nav-button">LMS Learning</a>
                <a href="https://riotinto.sharepoint.com/sites/ResourceDevelopmentIronOreHub" className="nav-button">Res Dev Hub (Share Point)</a>
                <a href="https://riotinto.sharepoint.com/sites/5062437/SitePages/Home.aspx" className="nav-button">Contractor Portal</a>
                <a href="https://element.riotinto.com/#/sitepages/acronyms.aspx" className="nav-button">Acronym Finder</a>
                <a href="https://element.riotinto.com/sites/e0003#/sitepages/peer-support.aspx" className="nav-button">Peer Support</a>
                <a href="https://cloud.workhuman.com/microsites/t/home?client=6317&setCAG=false" className="nav-button">RockStar</a>
                <Link to="/login" className="nav-button">Login</Link>
                </div>
            </nav>
            <Outlet />
        </>
    );
}

export default NavBar;
