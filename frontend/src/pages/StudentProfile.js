import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import DashboardHeader from "../components/DashboardHeader";

function StudentProfile() {
  // Mock Data mimicking your active session schema
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: "Alisha",
    email: "alishanaveed042@gmail.com",
    phone: "+92 300 1234567",
    universityId: "IMS-2026-8941",
    department: "Computer Science",
    currentSemester: "6th Semester"
  });

  // State fallback to roll-back edits on Cancel
  const [tempData, setTempData] = useState({ ...profileData });

  const handleEditToggle = () => {
    setTempData({ ...profileData });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setProfileData({ ...tempData });
    setIsEditing(false);
    // integrate fetch() PUT/PATCH endpoint handler here as needed
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempData({ ...tempData, [name]: value });
  };

  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh", display: "flex" }}>
      {/* Navigation Drawer */}
      <Sidebar isAdmin={false} />

      {/* Main Panel Content Workspace */}
      <div style={{ marginLeft: "260px", flexGrow: 1, padding: "40px", boxSizing: "border-box" }}>
        <DashboardHeader />

        <div style={styles.profileCard}>
          {/* Header Banner Identity Component Group */}
          <div style={styles.bannerSection}>
            <div style={styles.avatarRow}>
              <div style={styles.gradientAvatar}>
                {profileData.fullName.charAt(0).toUpperCase()}
                <label style={styles.cameraOverlay} title="Change Profile Photo">
                  📷
                  <input type="file" accept="image/*" style={{ display: "none" }} />
                </label>
              </div>
              <div>
                <h2 style={styles.profileName}>{profileData.fullName}</h2>
                <div style={styles.pillGroup}>
                  <span style={styles.rolePill}>Student Account</span>
                  <span style={styles.statusPill}>Verified Record</span>
                </div>
              </div>
            </div>

            {!isEditing ? (
              <button onClick={handleEditToggle} style={styles.editBtn}>
                ✏️ Edit Profile
              </button>
            ) : (
              <div style={{ display: "flex", gap: "10px" }}>
                <button onClick={handleCancel} style={styles.cancelBtn}>Cancel</button>
                <button onClick={handleSave} style={styles.saveBtn}>Save Changes</button>
              </div>
            )}
          </div>

          <hr style={styles.divider} />

          {/* Structured Information Grid View */}
          <form onSubmit={handleSave}>
            <h4 style={styles.sectionHeader}>Personal Account Details</h4>
            <div style={styles.fieldGrid}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  disabled={!isEditing}
                  value={isEditing ? tempData.fullName : profileData.fullName}
                  onChange={handleChange}
                  style={isEditing ? styles.activeInput : styles.disabledInput}
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Email Address</label>
                <input
                  type="email"
                  name="email"
                  disabled={!isEditing}
                  value={isEditing ? tempData.email : profileData.email}
                  onChange={handleChange}
                  style={isEditing ? styles.activeInput : styles.disabledInput}
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Contact Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  disabled={!isEditing}
                  placeholder="Not provided"
                  value={isEditing ? tempData.phone : profileData.phone}
                  onChange={handleChange}
                  style={isEditing ? styles.activeInput : styles.disabledInput}
                />
              </div>
            </div>

            <h4 style={{ ...styles.sectionHeader, marginTop: "32px" }}>Academic Track Info</h4>
            <div style={styles.fieldGrid}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Student Registration ID</label>
                <input
                  type="text"
                  name="universityId"
                  disabled={!isEditing}
                  value={isEditing ? tempData.universityId : profileData.universityId}
                  onChange={handleChange}
                  style={isEditing ? styles.activeInput : styles.disabledInput}
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Enrolled Department</label>
                <input
                  type="text"
                  name="department"
                  disabled={!isEditing}
                  value={isEditing ? tempData.department : profileData.department}
                  onChange={handleChange}
                  style={isEditing ? styles.activeInput : styles.disabledInput}
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Current Academic Semester</label>
                <input
                  type="text"
                  name="currentSemester"
                  disabled={!isEditing}
                  value={isEditing ? tempData.currentSemester : profileData.currentSemester}
                  onChange={handleChange}
                  style={isEditing ? styles.activeInput : styles.disabledInput}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// Sleek Professional CSS-in-JS Architecture Stylesheet matrix
const styles = {
  profileCard: {
    backgroundColor: "#ffffff",
    borderRadius: "20px",
    border: "1px solid #e2e8f0",
    padding: "40px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)"
  },
  bannerSection: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  avatarRow: {
    display: "flex",
    alignItems: "center",
    gap: "24px"
  },
  gradientAvatar: {
    position: "relative",
    width: "84px",
    height: "84px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
    color: "#ffffff",
    fontSize: "32px",
    fontWeight: "700",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 10px 15px -3px rgba(37, 99, 235, 0.25)",
    overflow: "hidden"
  },
  cameraOverlay: {
    position: "absolute",
    bottom: 0, right: 0, left: 0,
    height: "30%",
    backgroundColor: "rgba(15, 23, 42, 0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "12px",
    cursor: "pointer",
    transition: "all 0.2s ease"
  },
  profileName: {
    margin: "0 0 8px 0",
    fontSize: "24px",
    fontWeight: "700",
    color: "#0f172a"
  },
  pillGroup: {
    display: "flex",
    gap: "8px"
  },
  rolePill: {
    padding: "4px 12px",
    borderRadius: "9999px",
    fontSize: "12px",
    fontWeight: "600",
    backgroundColor: "#eff6ff",
    color: "#2563eb"
  },
  statusPill: {
    padding: "4px 12px",
    borderRadius: "9999px",
    fontSize: "12px",
    fontWeight: "600",
    backgroundColor: "#f0fdf4",
    color: "#16a34a"
  },
  editBtn: {
    backgroundColor: "#ffffff",
    border: "1px solid #cbd5e1",
    color: "#334155",
    padding: "10px 20px",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease"
  },
  cancelBtn: {
    backgroundColor: "#ffffff",
    border: "1px solid #cbd5e1",
    color: "#475569",
    padding: "10px 20px",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer"
  },
  saveBtn: {
    backgroundColor: "#2563eb",
    border: "none",
    color: "#ffffff",
    padding: "10px 20px",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer"
  },
  divider: {
    border: "none",
    borderTop: "1px solid #f1f5f9",
    margin: "32px 0"
  },
  sectionHeader: {
    margin: "0 0 20px 0",
    fontSize: "15px",
    fontWeight: "700",
    color: "#475569",
    textTransform: "uppercase",
    letterSpacing: "0.05em"
  },
  fieldGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "24px"
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  },
  label: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#64748b"
  },
  disabledInput: {
    padding: "12px 16px",
    borderRadius: "10px",
    border: "1px solid #f1f5f9",
    fontSize: "14px",
    color: "#1e293b",
    backgroundColor: "#f8fafc",
    outline: "none",
    fontWeight: "500"
  },
  activeInput: {
    padding: "12px 16px",
    borderRadius: "10px",
    border: "1px solid #3b82f6",
    fontSize: "14px",
    color: "#0f172a",
    backgroundColor: "#ffffff",
    outline: "none",
    boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)",
    transition: "all 0.2s ease",
    fontWeight: "500"
  }
};

export default StudentProfile;