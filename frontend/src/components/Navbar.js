import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName") || "User";
  const userRole = localStorage.getItem("userRole") || "student";

  const handleLogout = () => {
    localStorage.clear(); // Clear token and role
    navigate("/login");
  };

  return (
    <div style={{
      backgroundColor: "#1e56a0", 
      color: "white", 
      padding: "15px 30px", 
      display: "flex", 
      justifyContent: "space-between", 
      alignItems: "center",
      borderRadius: "4px",
      marginBottom: "20px"
    }}>
      <div>
        <h2 style={{ margin: 0 }}>🎓 Internship Management Portal</h2>
        <small>Welcome back, {userName} ({userRole.toUpperCase()})</small>
      </div>
      <button 
        onClick={handleLogout} 
        style={{
          backgroundColor: "#d9534f", 
          color: "white", 
          border: "none", 
          padding: "8px 16px", 
          borderRadius: "4px", 
          cursor: "pointer",
          fontWeight: "bold"
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;