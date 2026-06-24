import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import DashboardHeader from "../components/DashboardHeader";

function StudentApplications() {
  const [apps, setApps] = useState([]);
  const userEmail = localStorage.getItem("userEmail") || "";

  useEffect(() => {
    const fetchMyApplications = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/registrations", {
          headers: { Authorization: `Bearer ${token}` }
        });
        // Filter records submitted by the current student email
        const filtered = res.data.filter(item => item.email === userEmail);
        setApps(filtered);
      } catch (err) {
        console.error("Error loading application histories", err);
      }
    };
    if (userEmail) fetchMyApplications();
  }, [userEmail]);

  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh" }}>
      <Sidebar isAdmin={false} />
      <div style={{ marginLeft: "260px", padding: "40px" }}>
        <DashboardHeader />
        
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>My Submission Logs</h3>
          {apps.length === 0 ? (
            <p style={{ color: "#64748b", margin: 0 }}>You haven't submitted any internship applications yet.</p>
          ) : (
            apps.map((app, idx) => (
              <div key={idx} style={styles.logItem}>
                <div>
                  <h4 style={{ margin: "0 0 4px 0", color: "#0f172a" }}>{app.technology} Track</h4>
                  <span style={styles.date}>Applied on: {new Date(app.createdAt).toLocaleDateString()}</span>
                </div>
                <div style={styles.statusPill}>{app.status}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  card: { backgroundColor: "#ffffff", padding: "30px", borderRadius: "12px", border: "1px solid #e2e8f0" },
  cardTitle: { margin: "0 0 20px 0", fontSize: "18px", color: "#0f172a" },
  logItem: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px", border: "1px solid #f1f5f9", borderRadius: "8px", marginBottom: "12px", backgroundColor: "#f8fafc" },
  date: { fontSize: "12px", color: "#94a3b8" },
  statusPill: { backgroundColor: "#e8f0fe", color: "#1a73e8", padding: "6px 14px", borderRadius: "20px", fontSize: "13px", fontWeight: "600" }
};

export default StudentApplications;