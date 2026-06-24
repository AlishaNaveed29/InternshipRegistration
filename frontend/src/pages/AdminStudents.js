import React from "react";
import Sidebar from "../components/Sidebar";
import DashboardHeader from "../components/DashboardHeader";

function AdminStudents() {
  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh" }}>
      <Sidebar isAdmin={true} />
      <div style={{ marginLeft: "260px", padding: "40px" }}>
        <DashboardHeader />
        <div style={styles.card}>
          <h3 style={styles.title}>Verified Student Profiles</h3>
          <p style={styles.text}>Here you can manage student authentication, documents, and academic records.</p>
          {/* You can map your student arrays here later */}
        </div>
      </div>
    </div>
  );
}

const styles = {
  card: { backgroundColor: "#fff", padding: "30px", borderRadius: "12px", border: "1px solid #e2e8f0" },
  title: { margin: "0 0 10px 0", color: "#0f172a" },
  text: { color: "#64748b", margin: 0 }
};

export default AdminStudents;