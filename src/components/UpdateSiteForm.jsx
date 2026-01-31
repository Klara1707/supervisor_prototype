import React, { useState } from "react";
import { updateSite } from "../api";

export default function UpdateSiteForm() {
  const [site, setSite] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      await updateSite({ site });
      setMessage("Site updated successfully!");
    } catch (err) {
      setError(err.message || "Update failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Update Site</h2>
      <input
        type="text"
        placeholder="New Site Name"
        value={site}
        onChange={(e) => setSite(e.target.value)}
        required
      />
      <button type="submit">Update</button>
      {message && <div>{message}</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
    </form>
  );
}
