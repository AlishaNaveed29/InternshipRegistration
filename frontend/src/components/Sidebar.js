import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Sidebar({ isAdmin }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // Base links matching the visual mockup items
const studentLinks = [
    { name: "Dashboard", path: "/student-dashboard", icon: "📊" },
    { name: "My Profile", path: "/student/profile", icon: "👤" },
    { name: "Internships", path: "/student/internships", icon: "💼" },
    { name: "My Applications", path: "/student/applications", icon: "📝" },
  ];

  const adminLinks = [
    { name: "Dashboard", path: "/admin-dashboard", icon: "🏢" },
    { name: "Companies", path: "/admin/companies", icon: "🏭" },
  ];

  const currentLinks = isAdmin ? adminLinks : studentLinks;

  return (
    <div style={styles.sidebar}>
      <div>
        <div style={styles.logoSection}>
          <span style={styles.logoIcon}>🎓</span>
          <h2 style={styles.logoText}>{isAdmin ? "IMS Admin" : "IMS"}</h2>
        </div>
        
        <nav style={styles.navMenu}>
          {currentLinks.map((link, idx) => {
            const isActive = location.pathname === link.path;
            return (
              <div
                key={idx}
                onClick={() => link.path !== "#" && navigate(link.path)}
                style={{
                  ...styles.navItem,
                  backgroundColor: isActive ? "rgba(255,255,255,0.15)" : "transparent",
                  cursor: link.path === "#" ? "not-allowed" : "pointer",
                  opacity: link.path === "#" ? 0.6 : 1
                }}
              >
                <span style={{ marginRight: "12px" }}>{link.icon}</span>
                <span>{link.name}</span>
              </div>
            );
          })}
        </nav>
      </div>

      <button onClick={handleLogout} style={styles.logoutBtn}>
        🚪 Logout
      </button>
    </div>
  );
}

const styles = {
  sidebar: {
    width: "260px",
    backgroundColor: "#1e3a8a", // Clean deep professional blue
    color: "#fff",
    height: "100vh",
    position: "fixed",
    top: 0,
    left: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "24px 16px",
    boxSizing: "border-box",
    zIndex: 100,
  },
  logoSection: {
    display: "flex",
    alignItems: "center",
    marginBottom: "40px",
    paddingLeft: "8px",
  },
  logoIcon: {
    fontSize: "24px",
    marginRight: "10px",
  },
  logoText: {
    fontSize: "20px",
    fontWeight: "700",
    margin: 0,
    letterSpacing: "0.5px",
  },
  navMenu: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  navItem: {
    display: "flex",
    alignItems: "center",
    padding: "12px 16px",
    borderRadius: "8px",
    fontSize: "15px",
    fontWeight: "500",
    transition: "background 0.2s",
  },
  logoutBtn: {
    backgroundColor: "transparent",
    border: "1px solid rgba(255,255,255,0.3)",
    color: "#fff",
    padding: "12px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    transition: "background 0.2s",
  }
};

export default Sidebar;