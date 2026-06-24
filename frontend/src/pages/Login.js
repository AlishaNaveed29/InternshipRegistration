import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState(""); // Needed for registration
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student"); // student or admin
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      if (isSignup) {
        // 1. Handle Registration
        const res = await axios.post("http://localhost:5000/api/auth/register", {
          name,
          email,
          password,
          role,
        });
        alert(res.data.msg || "Registration successful! Please log in.");
        setIsSignup(false); // Switch to login view automatically
      } else {
        // 2. Handle Login
        const res = await axios.post("http://localhost:5000/api/auth/login", {
          email,
          password,
        });

        // Save token and user details to local storage
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userRole", res.data.user.role);
        localStorage.setItem("userName", res.data.user.name);
        localStorage.setItem("userEmail", email);

        // Redirect based on user role
        if (res.data.user.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/student-dashboard");
        }
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.msg || err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginCard}>
        {/* Branding Area */}
        <div style={styles.brandSection}>
          <span style={styles.logoIcon}>🎓</span>
          <h2 style={styles.brandTitle}>IMS Portal</h2>
          <p style={styles.brandSubtitle}>Internship Management System</p>
        </div>

        <h3 style={styles.formTitle}>
          {isSignup ? "Create Student/Admin Account" : "Sign In"}
        </h3>

        {errorMsg && <div style={styles.errorAlert}>⚠️ {errorMsg}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Conditional Registration Full Name Input */}
          {isSignup && (
            <div style={styles.inputGroup}>
              <label style={styles.label}>Full Name</label>
              <input 
                type="text" 
                placeholder="e.g. John Doe" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
                style={styles.input}
              />
            </div>
          )}

          {/* Email Address */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input 
              type="email" 
              placeholder="e.g. johndoe@example.com" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              style={styles.input}
            />
          </div>
          
          {/* Password */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              style={styles.input}
            />
          </div>
          
          {/* Conditional Role Selector Option Group */}
          {isSignup && (
            <div style={styles.inputGroup}>
              <label style={styles.label}>Register Account As</label>
              <select 
                value={role} 
                onChange={(e) => setRole(e.target.value)} 
                style={styles.select}
              >
                <option value="student">🎓 Student Account</option>
                <option value="admin">🏢 Administrator</option>
              </select>
            </div>
          )}

          {/* Premium Form Trigger Button */}
          <button type="submit" style={styles.submitBtn}>
            {isSignup ? "Sign Up" : "Log In"}
          </button>
        </form>

        {/* View State Switch Toggle Link */}
        <div style={styles.footerText}>
          {isSignup ? "Already have an account? " : "Don't have an account? "}
          <span onClick={() => setIsSignup(!isSignup)} style={styles.signUpLink}>
            {isSignup ? "Log In" : "Sign Up"}
          </span>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f8fafc",
    fontFamily: "'Inter', sans-serif",
  },
  loginCard: {
    backgroundColor: "#ffffff",
    padding: "40px",
    borderRadius: "16px",
    width: "100%",
    maxWidth: "420px",
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05)",
    border: "1px solid #e2e8f0",
  },
  brandSection: {
    textAlign: "center",
    marginBottom: "32px",
  },
  logoIcon: {
    fontSize: "36px",
    display: "block",
    marginBottom: "8px",
  },
  brandTitle: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#1e3a8a", 
    margin: "0",
  },
  brandSubtitle: {
    fontSize: "14px",
    color: "#64748b",
    margin: "4px 0 0 0",
    fontWeight: "500",
  },
  formTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#0f172a",
    marginBottom: "20px",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  label: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#475569",
  },
  input: {
    padding: "12px 16px",
    borderRadius: "8px",
    border: "1px solid #cbd5e1",
    fontSize: "15px",
    color: "#334155",
    outline: "none",
    backgroundColor: "#f8fafc",
  },
  select: {
    padding: "12px 16px",
    borderRadius: "8px",
    border: "1px solid #cbd5e1",
    fontSize: "15px",
    color: "#334155",
    outline: "none",
    backgroundColor: "#f8fafc",
    cursor: "pointer",
  },
  submitBtn: {
    backgroundColor: "#1e3a8a", 
    color: "#ffffff",
    border: "none",
    padding: "14px",
    borderRadius: "8px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.2s",
    marginTop: "10px",
  },
  errorAlert: {
    backgroundColor: "#fce8e6",
    color: "#c5221f",
    padding: "12px",
    borderRadius: "8px",
    fontSize: "14px",
    marginBottom: "20px",
    fontWeight: "500",
    border: "1px solid #f9d5d1",
  },
  footerText: {
    textAlign: "center",
    marginTop: "24px",
    fontSize: "14px",
    color: "#64748b",
  },
  signUpLink: {
    color: "#2563eb",
    fontWeight: "600",
    cursor: "pointer",
    textDecoration: "none",
  },
};

export default Login;