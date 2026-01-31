import React from "react";
import AdminLoginForm from "../components/AdminLoginForm";
import UpdateSiteForm from "../components/UpdateSiteForm";

export default function AdminPage() {
  return (
    <div style={{ maxWidth: 400, margin: "2rem auto" }}>
      <AdminLoginForm />
      <hr />
      <UpdateSiteForm />
    </div>
  );
}
