import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import StudentProfile from "./pages/StudentProfile";
import StudentInternships from "./pages/StudentInternships";
import StudentApplications from "./pages/StudentApplications";
import AdminDashboard from "./pages/AdminDashboard";
import AdminStudents from "./pages/AdminStudents";
import AdminCompanies from "./pages/AdminCompanies";

// Security Wrapper Component
const ProtectedRoute = ({ children, allowedRole }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && userRole !== allowedRole) {
    return <Navigate to={userRole === "admin" ? "/admin-dashboard" : "/student-dashboard"} replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <div style={{ minHeight: "100vh", backgroundColor: "#f8fafc" }}>
        <Routes>
          {/* Default Route */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          {/* Public Authentication Route */}
          <Route path="/login" element={<Login />} />
          
          {/* ---------------------------------------------------- */}
          {/* PROTECTED STUDENT ROUTES                             */}
          {/* ---------------------------------------------------- */}
          <Route 
            path="/student-dashboard" 
            element={
              <ProtectedRoute allowedRole="student">
                <StudentDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/student/profile" 
            element={
              <ProtectedRoute allowedRole="student">
                <StudentProfile />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/student/internships" 
            element={
              <ProtectedRoute allowedRole="student">
                <StudentInternships />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/student/applications" 
            element={
              <ProtectedRoute allowedRole="student">
                <StudentApplications />
              </ProtectedRoute>
            } 
          />
          
          {/* ---------------------------------------------------- */}
          {/* PROTECTED ADMIN ROUTES                               */}
          {/* ---------------------------------------------------- */}
          <Route 
            path="/admin-dashboard" 
            element={
              <ProtectedRoute allowedRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/admin/students" 
            element={
              <ProtectedRoute allowedRole="admin">
                <AdminStudents />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/admin/companies" 
            element={
              <ProtectedRoute allowedRole="admin">
                <AdminCompanies />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/admin/applications" 
            element={
              <ProtectedRoute allowedRole="admin">
                <AdminDashboard /> 
              </ProtectedRoute>
            } 
          />
          
          {/* Fallback Catch-all */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;