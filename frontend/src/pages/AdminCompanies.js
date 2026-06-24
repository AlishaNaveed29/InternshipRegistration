import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import DashboardHeader from "../components/DashboardHeader";

function AdminCompanies() {
  // 1. State array initialized cleanly for incoming MongoDB payloads
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  // 2. Interactive Filtering States
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("All Industries");
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");

  // 3. Modal Form States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCompany, setNewCompany] = useState({
    name: "",
    industry: "Technology",
    contactPerson: "",
    role: "",
    email: "",
    openPositions: "",
    status: "Active",
    logo: ""
  });

  // Base API endpoint string — explicitly pointing to port 5000 backend architecture
  const API_URL = "http://localhost:5000/api/companies";

  // Fetch corporate documents from MongoDB on component load
  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = () => {
    setLoading(true);
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Server communication fault");
        return res.json();
      })
      .then((data) => {
        setCompanies(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load records from MongoDB:", err);
        setLoading(false);
      });
  };

  // Real-Time Delete Handler executing directly via MongoDB ObjectId
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to remove this partner company record from the database?")) {
      fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (res.ok) {
            // Remove from local UI state layout stack instantly
            setCompanies(companies.filter(c => (c._id || c.id) !== id));
          } else {
            alert("Failed to delete record from database.");
          }
        })
        .catch((err) => console.error("Error deleting document:", err));
    }
  };

  // Safe Fallback for Broken Custom Image Logos
  const handleLogoFallback = (companyName) => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(companyName || "Company")}&background=f0fdf4&color=16a34a&bold=true`;
  };

  // Database Collection Document Insertion Submission Handler
  const handleAddCompanySubmit = (e) => {
    e.preventDefault();
    
    const preparedPayload = {
      name: newCompany.name,
      logo: newCompany.logo.trim() || handleLogoFallback(newCompany.name),
      industry: newCompany.industry,
      contactPerson: newCompany.contactPerson,
      role: newCompany.role,
      email: newCompany.email,
      openPositions: parseInt(newCompany.openPositions) || 0,
      status: newCompany.status
    };

    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(preparedPayload),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Network configuration block or database rejection");
        return res.json();
      })
      .then((savedDocument) => {
        // Safe fallbacks to ensure new local layout render matrix states don't throw split errors
        const normalizedDoc = {
          ...preparedPayload,
          _id: savedDocument._id || savedDocument.id || Date.now().toString(),
          partnerSince: savedDocument.partnerSince || "2026"
        };
        
        // Prepend the new MongoDB server entry into the rendering pool state array
        setCompanies((prev) => [normalizedDoc, ...prev]);
        setIsModalOpen(false); // Close Modal
        setNewCompany({ name: "", industry: "Technology", contactPerson: "", role: "", email: "", openPositions: "", status: "Active", logo: "" }); // Reset Form
      })
      .catch((err) => {
        console.error("Error creating record:", err);
        alert("Failed to save entry to MongoDB. Please check if backend server.js is online on Port 5000.");
      });
  };

  // 4. Computed Dynamic Filter Matrix Evaluation
  const filteredCompanies = companies.filter((company) => {
    if (!company) return false;
    const matchesSearch = 
      (company.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (company.contactPerson || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (company.email || "").toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesIndustry = selectedIndustry === "All Industries" || company.industry === selectedIndustry;
    const matchesStatus = selectedStatus === "All Statuses" || company.status === selectedStatus;

    return matchesSearch && matchesIndustry && matchesStatus;
  });

  // Calculate Dynamic Calculations Matrix Values Safely
  const totalPositions = companies.reduce((acc, curr) => acc + (curr?.openPositions || 0), 0);
  const activeCount = companies.filter(c => c?.status === "Active").length;

  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh", display: "flex" }}>
      <Sidebar isAdmin={true} />

      <div style={{ marginLeft: "260px", flexGrow: 1, padding: "40px", boxSizing: "border-box" }}>
        <DashboardHeader />

        {/* ----------------- FUNCTIONAL DYNAMIC METRICS CARDS ----------------- */}
        <div style={styles.metricsGrid}>
          <div style={styles.metricCard}>
            <div style={{ ...styles.iconWrapper, backgroundColor: "#eff6ff" }}>🏢</div>
            <div>
              <div style={styles.metricValue}>{companies.length}</div>
              <div style={styles.metricLabel}>Partner Companies</div>
              <div style={{ ...styles.trendText, color: "#16a34a" }}>MongoDB Database</div>
            </div>
          </div>

          <div style={styles.metricCard}>
            <div style={{ ...styles.iconWrapper, backgroundColor: "#f0fdf4" }}>💼</div>
            <div>
              <div style={styles.metricValue}>{totalPositions}</div>
              <div style={styles.metricLabel}>Open Positions</div>
              <div style={{ ...styles.trendText, color: "#16a34a" }}>Across All tracks</div>
            </div>
          </div>

          <div style={styles.metricCard}>
            <div style={{ ...styles.iconWrapper, backgroundColor: "#f5f3ff" }}>🟢</div>
            <div>
              <div style={styles.metricValue}>{activeCount}</div>
              <div style={styles.metricLabel}>Active Partners</div>
              <div style={{ ...styles.trendText, color: "#2563eb" }}>Status Validated</div>
            </div>
          </div>

          <div style={styles.metricCard}>
            <div style={{ ...styles.iconWrapper, backgroundColor: "#fff7ed" }}>🔴</div>
            <div>
              <div style={styles.metricValue}>{Math.max(0, companies.length - activeCount)}</div>
              <div style={styles.metricLabel}>Inactive Records</div>
              <div style={{ ...styles.trendText, color: "#dc2626" }}>Pending Review</div>
            </div>
          </div>
        </div>

        {/* ----------------- DATA TABLE LAYOUT CONTAINER ----------------- */}
        <div style={styles.tableCard}>
          <div style={styles.tableHeaderRow}>
            <div>
              <h3 style={styles.tableTitle}>Partner Corporations</h3>
              <p style={styles.tableSubtitle}>
                Manage partnered organizations, update allocations, and view recruiter agreements.
              </p>
            </div>
            <button onClick={() => setIsModalOpen(true)} style={styles.addButton}>
              + Add New Company
            </button>
          </div>

          {/* DYNAMIC FILTERS AND SEARCH COMPONENT CONTROLS */}
          <div style={styles.filterRow}>
            <div style={styles.searchContainer}>
              <span style={styles.searchIcon}>🔍</span>
              <input 
                type="text" 
                placeholder="Search by name, contact, email..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={styles.searchInput} 
              />
            </div>
            <div style={styles.filterDropdowns}>
              <select 
                value={selectedIndustry} 
                onChange={(e) => setSelectedIndustry(e.target.value)} 
                style={styles.selectInput}
              >
                <option value="All Industries">All Industries</option>
                <option value="Technology">Technology</option>
                <option value="IT Services">IT Services</option>
                <option value="Consulting">Consulting</option>
              </select>
              
              <select 
                value={selectedStatus} 
                onChange={(e) => setSelectedStatus(e.target.value)} 
                style={styles.selectInput}
              >
                <option value="All Statuses">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* DYNAMIC RENDER DATAGRID */}
          <table style={styles.table}>
            <thead>
              <tr style={styles.theadRow}>
                <th style={{ ...styles.th, width: "25%" }}>Company</th>
                <th style={styles.th}>Industry</th>
                <th style={styles.th}>Contact Person</th>
                <th style={styles.th}>Email</th>
                <th style={{ ...styles.th, textAlign: "center" }}>Open Positions</th>
                <th style={styles.th}>Status</th>
                <th style={{ ...styles.th, textAlign: "center" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" style={{ ...styles.td, textAlign: "center", padding: "40px", color: "#64748b" }}>
                    Synchronizing cluster documents...
                  </td>
                </tr>
              ) : filteredCompanies.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ ...styles.td, textAlign: "center", padding: "40px", color: "#64748b" }}>
                    No corporate records found. Use "+ Add New Company" to populate data.
                  </td>
                </tr>
              ) : (
                filteredCompanies.map((company) => {
                  const targetId = company._id || company.id; // Support MongoDB fallback mapping cleanly
                  return (
                    <tr key={targetId} style={styles.tr}>
                      <td style={styles.td}>
                        <div style={styles.companyCell}>
                          <div style={styles.logoContainer}>
                            <img 
                              src={company.logo || handleLogoFallback(company.name)} 
                              alt="" 
                              onError={(e) => { e.target.src = handleLogoFallback(company.name); }}
                              style={styles.logoImage} 
                            />
                          </div>
                          <div>
                            <div style={styles.companyName}>{company.name}</div>
                            {company.partnerSince && (
                              <div style={styles.partnerDate}>Partner since {company.partnerSince}</div>
                            )}
                          </div>
                        </div>
                      </td>

                      <td style={styles.td}>{company.industry}</td>

                      <td style={styles.td}>
                        <div style={styles.contactName}>{company.contactPerson}</div>
                        <div style={styles.contactRole}>{company.role}</div>
                      </td>

                      <td style={{ ...styles.td, color: "#64748b" }}>{company.email}</td>

                      <td style={{ ...styles.td, textAlign: "center", fontWeight: "600", color: "#1e3a8a" }}>
                        {company.openPositions}
                      </td>

                      <td style={styles.td}>
                        <span
                          style={{
                            ...styles.statusPill,
                            backgroundColor: company.status === "Active" ? "#dcfce7" : "#fee2e2",
                            color: company.status === "Active" ? "#16a34a" : "#dc2626",
                          }}
                        >
                          {company.status}
                        </span>
                      </td>

                      <td style={{ ...styles.td, textAlign: "center" }}>
                        <div style={styles.actionButtonGroup}>
                          <button type="button" title="View Details" onClick={() => alert(`Details for ${company.name}`)} style={styles.actionBtn}>👁️</button>
                          <button type="button" title="Delete Record" onClick={() => handleDelete(targetId)} style={{ ...styles.actionBtn, color: "#dc2626" }}>🗑️</button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>

          {/* DYNAMIC FOOTER COUNT STATUS INFO */}
          <div style={styles.paginationRow}>
            <div style={styles.paginationInfo}>
              Showing {filteredCompanies.length} of {companies.length} entries
            </div>
          </div>
        </div>
      </div>

      {/* ----------------- FULLY INTERACTIVE MODAL COMPONENT WINDOW ----------------- */}
      {isModalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <div style={styles.modalHeader}>
              <h3 style={{ margin: 0 }}>Add New Corporate Partner</h3>
              <button onClick={() => setIsModalOpen(false)} style={styles.closeModalBtn}>✕</button>
            </div>
            
            <form onSubmit={handleAddCompanySubmit} style={styles.modalForm}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Company Name *</label>
                <input 
                  type="text" required placeholder="e.g. Acme Corp"
                  value={newCompany.name} onChange={e => setNewCompany({...newCompany, name: e.target.value})}
                  style={styles.inputField}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Industry Group</label>
                  <select 
                    value={newCompany.industry} onChange={e => setNewCompany({...newCompany, industry: e.target.value})}
                    style={styles.inputField}
                  >
                    <option value="Technology">Technology</option>
                    <option value="IT Services">IT Services</option>
                    <option value="Consulting">Consulting</option>
                  </select>
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Open Allocations *</label>
                  <input 
                    type="number" required placeholder="e.g. 5" min="0"
                    value={newCompany.openPositions} onChange={e => setNewCompany({...newCompany, openPositions: e.target.value})}
                    style={styles.inputField}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Contact Lead Full Name *</label>
                  <input 
                    type="text" required placeholder="e.g. Robert Vance"
                    value={newCompany.contactPerson} onChange={e => setNewCompany({...newCompany, contactPerson: e.target.value})}
                    style={styles.inputField}
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Corporate Title/Role *</label>
                  <input 
                    type="text" required placeholder="e.g. HR Director"
                    value={newCompany.role} onChange={e => setNewCompany({...newCompany, role: e.target.value})}
                    style={styles.inputField}
                  />
                </div>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>HR Operations Email Address *</label>
                <input 
                  type="email" required placeholder="vance@acme.com"
                  value={newCompany.email} onChange={e => setNewCompany({...newCompany, email: e.target.value})}
                  style={styles.inputField}
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Logo Image URL (Optional)</label>
                <input 
                  type="url" placeholder="https://example.com/logo.png"
                  value={newCompany.logo} onChange={e => setNewCompany({...newCompany, logo: e.target.value})}
                  style={styles.inputField}
                />
              </div>

              <div style={styles.modalFooterActions}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={styles.cancelBtn}>Cancel</button>
                <button type="submit" style={styles.saveBtn}>Save Partner Record</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  metricsGrid: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px", marginBottom: "32px" },
  metricCard: { backgroundColor: "#ffffff", borderRadius: "16px", padding: "24px", display: "flex", alignItems: "center", gap: "20px", border: "1px solid #f1f5f9" },
  iconWrapper: { width: "56px", height: "56px", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px" },
  metricValue: { fontSize: "28px", fontWeight: "700", color: "#0f172a", lineHeight: "1.2" },
  metricLabel: { fontSize: "14px", fontWeight: "500", color: "#64748b", margin: "4px 0" },
  trendText: { fontSize: "12px", fontWeight: "600" },
  tableCard: { backgroundColor: "#ffffff", borderRadius: "16px", border: "1px solid #e2e8f0", padding: "32px" },
  tableHeaderRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" },
  tableTitle: { margin: "0 0 6px 0", fontSize: "20px", fontWeight: "700", color: "#0f172a" },
  tableSubtitle: { margin: 0, fontSize: "14px", color: "#64748b" },
  addButton: { backgroundColor: "#2563eb", color: "#ffffff", border: "none", padding: "12px 20px", borderRadius: "8px", fontSize: "14px", fontWeight: "600", cursor: "pointer" },
  filterRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", gap: "16px" },
  searchContainer: { position: "relative", width: "340px" },
  searchIcon: { position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", fontSize: "14px", color: "#94a3b8" },
  searchInput: { width: "100%", padding: "10px 16px 10px 40px", borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "14px", outline: "none", boxSizing: "border-box", backgroundColor: "#f8fafc" },
  filterDropdowns: { display: "flex", gap: "12px" },
  selectInput: { padding: "10px 16px", borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "14px", color: "#334155", backgroundColor: "#ffffff", outline: "none", cursor: "pointer", minWidth: "150px" },
  table: { width: "100%", borderCollapse: "collapse", textAlign: "left" },
  theadRow: { borderBottom: "1px solid #f1f5f9" },
  th: { padding: "16px 12px", fontSize: "13px", fontWeight: "600", color: "#64748b", backgroundColor: "#f8fafc" },
  tr: { borderBottom: "1px solid #f1f5f9" },
  td: { padding: "18px 12px", fontSize: "14px", color: "#334155", verticalAlign: "middle" },
  companyCell: { display: "flex", alignItems: "center", gap: "14px" },
  logoContainer: { width: "40px", height: "40px", borderRadius: "8px", border: "1px solid #f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", backgroundColor: "#ffffff", padding: "4px", boxSizing: "border-box" },
  logoImage: { maxWidth: "100%", maxHeight: "100%", objectFit: "contain" },
  companyName: { fontWeight: "600", color: "#0f172a", fontSize: "14px" },
  partnerDate: { fontSize: "12px", color: "#94a3b8", marginTop: "2px" },
  contactName: { fontWeight: "500", color: "#334155" },
  contactRole: { fontSize: "12px", color: "#94a3b8", marginTop: "2px" },
  statusPill: { padding: "4px 10px", borderRadius: "6px", fontSize: "12px", fontWeight: "600", display: "inline-block" },
  actionButtonGroup: { display: "flex", gap: "8px" },
  actionBtn: { backgroundColor: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "6px", width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" },
  paginationRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "24px" },
  paginationInfo: { fontSize: "13px", color: "#64748b" },
  
  modalOverlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(15, 23, 42, 0.4)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 },
  modalContent: { backgroundColor: "#ffffff", padding: "32px", borderRadius: "16px", width: "100%", maxWidth: "540px", border: "1px solid #e2e8f0", boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)" },
  modalHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", color: "#0f172a" },
  closeModalBtn: { border: "none", backgroundColor: "transparent", fontSize: "18px", cursor: "pointer", color: "#64748b" },
  modalForm: { display: "flex", flexDirection: "column", gap: "16px" },
  inputGroup: { display: "flex", flexDirection: "column", gap: "6px" },
  label: { fontSize: "13px", fontWeight: "600", color: "#475569" },
  inputField: { padding: "10px 14px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px", outline: "none", backgroundColor: "#f8fafc" },
  modalFooterActions: { display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "12px" },
  cancelBtn: { padding: "10px 18px", borderRadius: "8px", border: "1px solid #cbd5e1", backgroundColor: "#ffffff", fontSize: "14px", fontWeight: "600", cursor: "pointer", color: "#475569" },
  saveBtn: { padding: "10px 18px", borderRadius: "8px", border: "none", backgroundColor: "#2563eb", fontSize: "14px", fontWeight: "600", cursor: "pointer", color: "#ffffff" }
};

export default AdminCompanies;