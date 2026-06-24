import React, { useState } from "react";
import axios from "axios";

function Form() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    technology: "",
    status: "Applied",
  });
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Because we have a file, we use FormData instead of a standard JSON object
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("technology", formData.technology);
      data.append("status", formData.status);
      if (resume) {
        data.append("resume", resume);
      }

      const token = localStorage.getItem("token");

      await axios.post("http://localhost:5000/api/registrations", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Application Submitted Successfully!");
      
      // Reset Form
      setFormData({ name: "", email: "", technology: "", status: "Applied" });
      setResume(null);
      document.getElementById("resumeInput").value = ""; // Clear file selector
    } catch (error) {
      console.error(error);
      alert("Failed to submit application.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.formContainer}>
      <div style={styles.formGrid}>
        
        {/* Full Name */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>Full Name *</label>
          <input
            type="text"
            name="name"
            placeholder="e.g. John Doe"
            value={formData.name}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        {/* Email Address */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>Email Address *</label>
          <input
            type="email"
            name="email"
            placeholder="e.g. johndoe@example.com"
            value={formData.email}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        {/* Domain / Technology */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>Target Track / Technology *</label>
          <input
            type="text"
            name="technology"
            placeholder="e.g. React.js, Node.js, Python"
            value={formData.technology}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        {/* Hidden or read-only status for students */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>Application Status</label>
          <input
            type="text"
            value={formData.status}
            disabled
            style={{ ...styles.input, backgroundColor: "#e9ecef", cursor: "not-allowed" }}
          />
        </div>
      </div>

      {/* Professional Resume Upload Section */}
      <div style={styles.uploadSection}>
        <label style={styles.label}>Upload Resume (PDF, DOCX) *</label>
        <div style={styles.fileDropZone}>
          <input
            id="resumeInput"
            type="file"
            accept=".pdf,.docx,.doc"
            onChange={handleFileChange}
            required
            style={styles.fileInput}
          />
          <div style={styles.uploadPlaceholder}>
            <span>📁 {resume ? `Selected: ${resume.name}` : "Click to choose your resume file"}</span>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div style={{ textAlign: "right", marginTop: "20px" }}>
        <button type="submit" disabled={loading} style={styles.submitBtn}>
          {loading ? "Submitting Application..." : "Submit Application"}
        </button>
      </div>
    </form>
  );
}

// Clean inline styles for a highly professional dashboard design
const styles = {
  formContainer: {
    backgroundColor: "#ffffff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
    border: "1px solid #e0e0e0",
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
    marginBottom: "20px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#495057",
    marginBottom: "8px",
  },
  input: {
    padding: "12px 16px",
    fontSize: "15px",
    borderRadius: "6px",
    border: "1px solid #ced4da",
    outline: "none",
    transition: "border-color 0.2s",
    backgroundColor: "#fff",
  },
  uploadSection: {
    marginTop: "10px",
  },
  fileDropZone: {
    position: "relative",
    border: "2px dashed #b5bcc7",
    borderRadius: "8px",
    padding: "25px",
    textAlign: "center",
    backgroundColor: "#f8f9fa",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
  fileInput: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    opacity: 0,
    cursor: "pointer",
  },
  uploadPlaceholder: {
    fontSize: "14px",
    color: "#6c757d",
    fontWeight: "500",
  },
  submitBtn: {
    backgroundColor: "#1e56a0",
    color: "#fff",
    border: "none",
    padding: "12px 30px",
    borderRadius: "6px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 2px 4px rgba(30, 86, 160, 0.2)",
    transition: "background-color 0.2s",
  },
};

export default Form;