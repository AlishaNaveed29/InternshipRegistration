import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import DashboardHeader from "../components/DashboardHeader";
import StatCards from "../components/StatCards";
import AdminTable from "../components/AdminTable";

function AdminDashboard() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all applications from your backend route
  const fetchRecords = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/registrations", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRecords(res.data);
    } catch (error) {
      console.error("Error fetching admin metrics:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  // Update Status Event Trigger
  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:5000/api/registrations/${id}`, 
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Refresh local array mapping instantly
      fetchRecords();
    } catch (error) {
      alert("Failed to update registration status.");
    }
  };

  // Delete Action Event Trigger
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to permanently delete this application record?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/registrations/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchRecords();
    } catch (error) {
      alert("Failed to delete record.");
    }
  };

  // Compute live responsive metrics directly out of data array list state
  const totalStudents = records.length;
  const activeSelected = records.filter(r => r.status === "Selected").length;
  const interviewScheduled = records.filter(r => r.status === "Interview Scheduled").length;
  const pendingApplied = records.filter(r => r.status === "Applied").length;

  const adminStats = [
    { title: "Total Applicants", count: totalStudents, color: "#2563eb", icon: "👥" },
    { title: "Active Interns", count: activeSelected, color: "#10b981", icon: "🏢" },
    { title: "Interviews Booked", count: interviewScheduled, color: "#f59e0b", icon: "📅" },
    { title: "Pending Review", count: pendingApplied, color: "#6366f1", icon: "📥" },
  ];

  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh" }}>
      {/* 1. Left Sidebar Navigation Panel marked true for Admin context */}
      <Sidebar isAdmin={true} />

      {/* 2. Right Data Workspace Panel */}
      <div style={{ marginLeft: "260px", padding: "40px", boxSizing: "border-box" }}>
        <DashboardHeader />

        {/* Dynamic Metric Counter Summary Blocks */}
        <StatCards stats={adminStats} />

        {/* Master Active Table Workspace Content */}
        <div style={{ marginBottom: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "600", color: "#0f172a" }}>
              Recent Registration Applications
            </h3>
          </div>

          {loading ? (
            <p style={{ color: "#64748b" }}>Loading management logs...</p>
          ) : (
            <AdminTable 
              records={records} 
              onUpdateStatus={handleUpdateStatus} 
              onDelete={handleDelete} 
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;