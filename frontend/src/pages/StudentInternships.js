import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import DashboardHeader from "../components/DashboardHeader";
import StudentDashboard from "./StudentDashboard"; 

function StudentInternships() {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state for network request
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedDuration, setSelectedDuration] = useState("All Durations");
  const [redirectToApplyWithTrack, setRedirectToApplyWithTrack] = useState(null);

  useEffect(() => {
    // 1. Fetch live records from your backend API linked to MongoDB
    // Replace 'http://localhost:5000' with your actual backend server port if different
    fetch("http://localhost:5000/api/companies") 
      .then((res) => res.json())
      .then((liveAdminCompanies) => {
        if (liveAdminCompanies && liveAdminCompanies.length > 0) {
          const formatted = liveAdminCompanies.map((company) => {
            let skillTags = ["React.js", "JavaScript", "Tailwind CSS"];
            let titleStr = "Frontend Developer Intern";
            
            if (company.industry === "IT Services") {
              skillTags = ["Node.js", "Express", "MongoDB", "REST APIs"];
              titleStr = "Backend Systems Intern";
            } else if (company.industry === "Consulting") {
              skillTags = ["Python", "SQL", "Pandas", "Tableau"];
              titleStr = "Data Analyst Intern";
            }

            return {
              id: company._id, // MongoDB uses '_id' instead of 'id'
              title: titleStr,
              companyName: company.name,
              logo: company.logo || "https://via.placeholder.com/64",
              description: `Join ${company.name} to work on cutting-edge production workflows.`,
              status: company.status === "Active" ? "Open" : "Closed",
              skills: skillTags,
              duration: "3 Months",
              category: company.industry,
              stipend: company.openPositions > 10 ? "₹20,000 / month" : "₹15,000 / month",
              location: "Remote / India",
              postedDate: "Posted recently"
            };
          });
          setInternships(formatted);
        } else {
          setInternships([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error connecting to database endpoint:", err);
        setLoading(false);
      });
  }, []);

  if (redirectToApplyWithTrack) {
    return <StudentDashboard initialTrack={redirectToApplyWithTrack} />;
  }

  const filteredItems = internships.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.companyName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch && item.status === "Open";
  });

  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh", display: "flex" }}>
      <Sidebar isAdmin={false} />
      <div style={{ marginLeft: "260px", flexGrow: 1, padding: "40px", boxSizing: "border-box" }}>
        <DashboardHeader />

        <div style={styles.exploreHeroBanner}>
          <div style={styles.briefcaseCircle}>💼</div>
          <div>
            <h3 style={styles.bannerTitle}>Explore Opportunities</h3>
            <p style={styles.bannerSubtitle}>Browse and apply for internships posted directly by the admin hub.</p>
          </div>
        </div>

        <div style={styles.listContainer}>
          {loading ? (
            <div style={{ textAlign: "center", color: "#64748b", padding: "24px" }}>
              Loading opportunities from database...
            </div>
          ) : filteredItems.length === 0 ? (
            <div style={styles.emptyStateContainer}>
              <div style={{ fontSize: "40px", marginBottom: "12px" }}>📁</div>
              <h4 style={{ margin: "0 0 6px 0", color: "#1e293b", fontSize: "16px" }}>No Internships Available</h4>
              <p style={{ margin: 0, color: "#64748b", fontSize: "14px" }}>
                The administration portal has not published any open tracking pipelines yet.
              </p>
            </div>
          ) : (
            filteredItems.map((item) => (
              <div key={item.id} style={styles.wideRowCard}>
                <div style={styles.cardLeftContent}>
                  <div style={styles.logoSquareContainer}>
                    <img src={item.logo} alt="" style={styles.logoImgResponsive} />
                  </div>
                  <div>
                    <h4 style={styles.jobTitleText}>{item.title}</h4>
                    <div style={{ fontSize: "14px", color: "#475569", fontWeight: "600" }}>{item.companyName}</div>
                    <p style={styles.jobDescriptionParagraph}>{item.description}</p>
                    <div style={{ display: "flex", gap: "6px", marginTop: "8px" }}>
                      {item.skills.map((s, i) => <span key={i} style={styles.skillPillElement}>{s}</span>)}
                    </div>
                  </div>
                </div>

                <div style={styles.cardRightMetaStack}>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "14px", fontWeight: "700", color: "#2563eb" }}>{item.stipend}</div>
                    <div style={{ fontSize: "12px", color: "#94a3b8", marginTop: "4px" }}>{item.duration}</div>
                  </div>
                  <button 
                    onClick={() => setRedirectToApplyWithTrack(`${item.companyName} - ${item.title}`)} 
                    style={styles.primaryBlueActionBtn}
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  exploreHeroBanner: { display: "flex", alignItems: "center", gap: "20px", backgroundColor: "#ffffff", padding: "24px", borderRadius: "16px", border: "1px solid #e2e8f0", marginBottom: "32px" },
  briefcaseCircle: { width: "48px", height: "48px", borderRadius: "50%", backgroundColor: "#eff6ff", color: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" },
  bannerTitle: { margin: "0 0 4px 0", fontSize: "20px", fontWeight: "700", color: "#0f172a" },
  bannerSubtitle: { margin: 0, fontSize: "14px", color: "#64748b" },
  listContainer: { display: "flex", flexDirection: "column", gap: "16px" },
  wideRowCard: { backgroundColor: "#ffffff", borderRadius: "16px", border: "1px solid #e2e8f0", padding: "24px", display: "flex", justifyContent: "space-between", alignItems: "center" },
  cardLeftContent: { display: "flex", gap: "20px", alignItems: "flex-start" },
  logoSquareContainer: { width: "56px", height: "56px", borderRadius: "10px", border: "1px solid #f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", padding: "6px", backgroundColor: "#ffffff" },
  logoImgResponsive: { maxWidth: "100%", maxHeight: "100%", objectFit: "contain" },
  jobTitleText: { margin: "0 0 4px 0", fontSize: "16px", fontWeight: "700", color: "#0f172a" },
  jobDescriptionParagraph: { margin: "6px 0 0 0", fontSize: "13px", color: "#64748b", lineHeight: "1.4" },
  skillPillElement: { backgroundColor: "#eff6ff", color: "#2563eb", padding: "4px 10px", borderRadius: "6px", fontSize: "11px", fontWeight: "600" },
  cardRightMetaStack: { display: "flex", alignItems: "center", gap: "32px" },
  primaryBlueActionBtn: { backgroundColor: "#2563eb", color: "#ffffff", border: "none", padding: "10px 18px", borderRadius: "8px", fontSize: "13px", fontWeight: "600", cursor: "pointer" },
  emptyStateContainer: { backgroundColor: "#ffffff", border: "2px dashed #cbd5e1", borderRadius: "16px", padding: "48px", textAlign: "center", color: "#64748b" }
};

export default StudentInternships;