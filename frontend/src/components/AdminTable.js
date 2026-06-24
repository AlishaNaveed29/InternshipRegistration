import React from "react";

function AdminTable({ records, onUpdateStatus, onDelete }) {
  
  // Status color pill mapper matching your premium template mockup style
  const getStatusStyle = (status) => {
    switch (status) {
      case "Selected":
      case "Completed":
        return { bg: "#e6f4ea", text: "#137333" };
      case "Interview Scheduled":
        return { bg: "#fef7e0", text: "#b06000" };
      case "Rejected":
        return { bg: "#fce8e6", text: "#c5221f" };
      default: // Applied
        return { bg: "#e8f0fe", text: "#1a73e8" };
    }
  };

  return (
    <div style={styles.tableWrapper}>
      <table style={styles.table}>
        <thead>
          <tr style={styles.headerRow}>
            <th style={styles.th}>Student Name</th>
            <th style={styles.th}>Email Address</th>
            <th style={styles.th}>Target Track</th>
            <th style={styles.th}>Resume</th>
            <th style={styles.th}>Current Status</th>
            <th style={styles.th} style={{ textAlign: "center" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.length === 0 ? (
            <tr>
              <td colSpan="6" style={styles.emptyTd}>No application records found.</td>
            </tr>
          ) : (
            records.map((student) => {
              const pillStyle = getStatusStyle(student.status);
              return (
                <tr key={student._id} style={styles.bodyRow}>
                  {/* Name */}
                  <td style={styles.td}>
                    <span style={styles.studentName}>{student.name}</span>
                  </td>
                  
                  {/* Email */}
                  <td style={styles.td}>{student.email}</td>
                  
                  {/* Technology */}
                  <td style={styles.td}>
                    <span style={styles.techBadge}>{student.technology}</span>
                  </td>
                  
                  {/* Resume */}
                  <td style={styles.td}>
                    {student.resume ? (
                      <a 
                        href={`http://localhost:5000${student.resume}`} 
                        target="_blank" 
                        rel="noreferrer" 
                        style={styles.downloadLink}
                      >
                        📄 View Document
                      </a>
                    ) : (
                      <span style={{ color: "#94a3b8", fontSize: "13px" }}>Not uploaded</span>
                    )}
                  </td>
                  
                  {/* Dynamic Status Dropdown / Pill */}
                  <td style={styles.td}>
                    <select
                      value={student.status}
                      onChange={(e) => onUpdateStatus(student._id, e.target.value)}
                      style={{
                        ...styles.statusSelect,
                        backgroundColor: pillStyle.bg,
                        color: pillStyle.text,
                      }}
                    >
                      <option value="Applied">Applied</option>
                      <option value="Interview Scheduled">Interview Scheduled</option>
                      <option value="Selected">Selected</option>
                      <option value="Rejected">Rejected</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </td>
                  
                  {/* Actions (Delete button) */}
                  <td style={{ ...styles.td, textAlign: "center" }}>
                    <button 
                      onClick={() => onDelete(student._id)} 
                      style={styles.deleteBtn}
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  tableWrapper: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.02)",
    overflow: "hidden",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "left",
    fontSize: "15px",
  },
  headerRow: {
    backgroundColor: "#f8fafc",
    borderBottom: "1px solid #e2e8f0",
  },
  th: {
    padding: "16px 20px",
    fontWeight: "600",
    color: "#475569",
    fontSize: "14px",
  },
  bodyRow: {
    borderBottom: "1px solid #f1f5f9",
    transition: "background-color 0.2s",
    ":hover": { backgroundColor: "#f8fafc" }
  },
  td: {
    padding: "16px 20px",
    color: "#334155",
    verticalAlign: "middle",
  },
  studentName: {
    fontWeight: "600",
    color: "#0f172a",
  },
  techBadge: {
    backgroundColor: "#f1f5f9",
    padding: "4px 8px",
    borderRadius: "6px",
    fontSize: "13px",
    fontWeight: "500",
    color: "#475569",
  },
  downloadLink: {
    color: "#2563eb",
    textDecoration: "none",
    fontWeight: "500",
    fontSize: "14px",
  },
  statusSelect: {
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "600",
    border: "none",
    outline: "none",
    cursor: "pointer",
  },
  deleteBtn: {
    backgroundColor: "#ef444415",
    color: "#ef4444",
    border: "none",
    padding: "6px 14px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "13px",
  },
  emptyTd: {
    padding: "40px",
    textAlign: "center",
    color: "#64748b",
  }
};

export default AdminTable;