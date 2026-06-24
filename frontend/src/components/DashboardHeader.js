import React from "react";

function DashboardHeader() {
  const userName = localStorage.getItem("userName") || "User";

  return (
    <div style={styles.headerContainer}>
      <div>
        <h1 style={styles.welcomeText}>Dashboard</h1>
        <p style={styles.subText}>Welcome back, <span style={{ fontWeight: "600", color: "#1e3a8a" }}>{userName}</span> 👋</p>
      </div>
      <div style={styles.profileSection}>
        <div style={styles.notificationBell}>🔔</div>
        <div style={styles.avatarBubble}>
          {userName.charAt(0).toUpperCase()}
        </div>
      </div>
    </div>
  );
}

const styles = {
  headerContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
    backgroundColor: "#ffffff",
    padding: "16px 24px",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
    border: "1px solid #f1f5f9",
  },
  welcomeText: {
    margin: 0,
    fontSize: "24px",
    fontWeight: "700",
    color: "#0f172a",
  },
  subText: {
    margin: "4px 0 0 0",
    fontSize: "14px",
    color: "#64748b",
  },
  profileSection: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },
  notificationBell: {
    fontSize: "20px",
    cursor: "pointer",
    color: "#64748b",
  },
  avatarBubble: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: "#eff6ff",
    color: "#1e3a8a",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "700",
    border: "2px solid #dbeafe",
  }
};

export default DashboardHeader;