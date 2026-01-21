
import React, { useState } from "react";
import HeroBar from "../components/HeroBar";
import { useNavigate } from "react-router-dom";
import API_BASE from "../config";

const SITE_OPTIONS = [
  { value: "robevalley", label: "Robe Valley" },
  { value: "greaterhopedowns", label: "Greater Hope Downs" },
  { value: "restofeast", label: "Rest of East" },
  { value: "restofwest", label: "Rest of West" }
];

function UserProfilePage() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user") || "{}");
  const token = localStorage.getItem("token") || sessionStorage.getItem("token") || "";
  const [site, setSite] = useState(user.site || "");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSiteChange = async (e) => {
    const newSite = e.target.value;
    setSite(newSite);
    setLoading(true);
    setMessage("");
    // Send PATCH/POST to backend to update site
    const response = await fetch(`${API_BASE}/api/update-site/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ site: newSite })
    });
    const data = await response.json();
    if (response.ok && data.success) {
      setMessage("Site updated successfully.");
      // Update local user object
      const updatedUser = { ...user, site: newSite };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      sessionStorage.setItem("user", JSON.stringify(updatedUser));
    } else {
      setMessage(data.error || "Failed to update site.");
    }
    setLoading(false);
  };

  return (
    <>
      <HeroBar />
      <div className="signup-container" style={{ maxWidth: 400, margin: "2rem auto" }}>
        <h2>User Profile</h2>
        <div style={{ marginBottom: "1rem" }}>
          <strong>Email:</strong> {user.username || user.email}
        </div>
        <label htmlFor="site">Change Site</label>
        <select
          id="site"
          name="site"
          value={site}
          onChange={handleSiteChange}
          style={{ padding: "0.75rem", fontSize: "1rem", border: "1px solid #ccc", borderRadius: "4px", marginBottom: "16px" }}
        >
          <option value="">-- Choose a Hub --</option>
          {SITE_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        {loading && <div>Updating...</div>}
        {message && <div style={{ color: message.includes("success") ? "green" : "red" }}>{message}</div>}
        <button onClick={() => navigate("/")}>Back to Home</button>
      </div>
    </>
  );
}

export default UserProfilePage;
