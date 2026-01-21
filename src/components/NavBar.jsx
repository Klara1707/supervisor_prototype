import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom"; // Add this at the top
import "./NavBar.css";


import React, { useState } from "react";

function NavBar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleHamburgerClick = () => {
        setMenuOpen((prev) => !prev);
    };

    const handleLinkClick = () => {
        setMenuOpen(false);
    };

    return (
        <>
            <nav className="nav-bar">
                <button
                    className="hamburger"
                    aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
                    aria-expanded={menuOpen}
                    aria-controls="nav-links"
                    onClick={handleHamburgerClick}
                >
                    <span className="hamburger-bar"></span>
                    <span className="hamburger-bar"></span>
                    <span className="hamburger-bar"></span>
                </button>
                <h3 className="nav-title" style={{position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden'}}>Navigation</h3>
                <div
                    className={`nav-links${menuOpen ? " open" : ""}`}
                    id="nav-links"
                >
                    <a href ="https://riotinto.service-now.com/esc" className="nav-button" target="_blank" rel="noopener noreferrer" onClick={handleLinkClick}>ServiceNow</a>
                    <a href="https://wd3.myworkday.com/riotinto/d/home.htmld" className="nav-button" target="_blank" rel="noopener noreferrer" onClick={handleLinkClick}>Workday</a>
                    <a href="https://riotinto.sharepoint.com/sites/ResourceDevelopmentIronOreHub" className="nav-button" target="_blank" rel="noopener noreferrer" onClick={handleLinkClick}>Res Dev Hub (Share Point)</a>
                    <a href="https://riotinto.sharepoint.com/sites/5062437/SitePages/Home.aspx" className="nav-button" target="_blank" rel="noopener noreferrer" onClick={handleLinkClick}>Contractor Portal</a>
                    <a href="https://element.riotinto.com/#/sitepages/acronyms.aspx" className="nav-button" target="_blank" rel="noopener noreferrer" onClick={handleLinkClick}>Acronym Finder</a>
                    <a href="https://element.riotinto.com/sites/e0003#/sitepages/peer-support.aspx" className="nav-button" target="_blank" rel="noopener noreferrer" onClick={handleLinkClick}>Peer Support</a>
                    <a href="https://cloud.workhuman.com/microsites/t/home?client=6317&setCAG=false" className="nav-button" target="_blank" rel="noopener noreferrer" onClick={handleLinkClick}>RockStar</a>
                    <Link to="/login" className="nav-button" onClick={handleLinkClick}>Logout</Link>
                    <p>&copy; Klara van den Burg</p>
                </div>
            </nav>
            <Outlet />
        </>
    );
}

export default NavBar;
