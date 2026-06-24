import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import DashboardHeader from "../components/DashboardHeader";
import StatCards from "../components/StatCards";

function StudentDashboard() {
  // Stat profiles structured directly out of the image mockup specifications
  const studentStats = [
    { title: "Applied Internships", count: "1", color: "#3b82f6", icon: "✉️" },
    { title: "Ongoing Internships", count: "0", color: "#8b5cf6", icon: "💼" },
    { title: "Completed Tasks", count: "0", color: "#10b981", icon: "✅" },
    { title: "Pending Reviews", count: "1", color: "#f59e0b", icon: "⏳" },
  ];

  // Form Management Local State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    targetTrack: "",
  });
  const [resumeFile, setResumeFile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setResumeFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!resumeFile) {
      alert("Please upload your official resume to submit the verification.");
      return;
    }
    
    // Ready for Multipart Form backend routing integration 
    console.log("Submitting Payload Details:", formData, resumeFile.name);
  };

  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh" }}>
      {/* 1. Left Fixed Sidebar Navigation */}
      <Sidebar isAdmin={false} />

      {/* 2. Right Workspace Section */}
      <div style={{ marginLeft: "260px", padding: "40px", boxSizing: "border-box" }}>
        <DashboardHeader />
        
        {/* Metric Counters Block */}
        <StatCards stats={studentStats} />

        {/* Form Panel Wrapper Card */}
        <div style={{ backgroundColor: "#ffffff", padding: "32px", borderRadius: "16px", border: "1px solid #e2e8f0" }}>
          <h3 style={{ margin: "0 0 6px 0", fontSize: "18px", fontWeight: "700", color: "#0f172a" }}>
            Submit Internship Application
          </h3>
          <p style={{ margin: "0 0 24px 0", fontSize: "14px", color: "#64748b" }}>
            Provide complete information and your official resume to begin verification.
          </p>

          {/* Redesigned Form Matrix Implementation */}
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            
            {/* Horizontal Row for Text Inputs (Balanced 3-Column Split Layout) */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  required
                  placeholder="e.g. John Doe"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  style={styles.inputField}
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="e.g. johndoe@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  style={styles.inputField}
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Target Track / Technology *</label>
                <input
                  type="text"
                  name="targetTrack"
                  required
                  placeholder="e.g. React.js, Node.js, Python"
                  value={formData.targetTrack}
                  onChange={handleInputChange}
                  style={styles.inputField}
                />
              </div>
            </div>

            {/* Full-width Responsive Resume File Dropzone Container */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>Upload Resume (PDF, DOCX) *</label>
              <label style={{
                ...styles.dropZone,
                borderColor: resumeFile ? "#16a34a" : "#cbd5e1",
                backgroundColor: resumeFile ? "#f0fdf4" : "#f8fafc"
              }}>
                <input
                  type="file"
                  required
                  accept=".pdf,.docx"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <span style={{ fontSize: "24px", marginBottom: "4px" }}>
                    {resumeFile ? "📄" : "📁"}
                  </span>
                  <span style={{ fontSize: "14px", color: "#334155" }}>
                    {resumeFile ? (
                      <strong>{resumeFile.name}</strong>
                    ) : (
                      "Click to choose your resume file"
                    )}
                  </span>
                  <span style={{ fontSize: "12px", color: "#94a3b8", marginTop: "2px" }}>Max file size: 5MB</span>
                </div>
              </label>
            </div>

            {/* Right-Aligned Processing Action Controls */}
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "8px" }}>
              <button type="submit" style={styles.submitBtn}>
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// Clean internal style objects targeting dashboard system requirements
const styles = {
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px"
  },
  label: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#475569"
  },
  inputField: {
    padding: "12px 14px",
    borderRadius: "8px",
    border: "1px solid #cbd5e1",
    fontSize: "14px",
    outline: "none",
    backgroundColor: "#ffffff",
    boxSizing: "border-box"
  },
  dropZone: {
    border: "2px dashed",
    borderRadius: "12px",
    padding: "28px",
    textAlign: "center",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: "all 0.2s ease"
  },
  submitBtn: {
    backgroundColor: "#1e3a8a",
    color: "#ffffff",
    border: "none",
    padding: "12px 24px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.2s ease"
  }
};

export default StudentDashboard;