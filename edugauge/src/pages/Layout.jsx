import React, { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import "./Layout.css";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [role, setRole] = useState("");

  // Simulate loading user role (replace this with real login logic)
  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");
    setRole(storedRole || "Student"); // Default role: Student
  }, []);

  // Define different menus for each role
  const sidebarLinks = {
    Admin: [
      { path: "/dashboard", label: "Dashboard" },
      { path: "/addlecture", label: "Add Lecture" },
      { path: "/resources", label: "Resources" },
      { path: "/stats", label: "Stats" },
      { path: "/profile", label: "Profile" },
    ],
    Lecture: [
      { path: "/dashboard", label: "Dashboard" },
      { path: "/gradebook", label: "GradeBook" },
      { path: "/atrisklist", label: "At Risk List" },
      { path: "/resources", label: "Resources" },
      { path: "/profile", label: "Profile" },
    ],
    Student: [
      { path: "/dashboard", label: "Dashboard" },
      { path: "/efunditest", label: "eFundi Test" },
      { path: "/digitalliteracytest", label: "Digital Literacy Test" },
      { path: "/gradebook", label: "GradeBook" },
      { path: "/resources", label: "Resources" },
      { path: "/profile", label: "Profile" },
    ],
  };

  // Pick correct links
  const linksToRender = sidebarLinks[role] || sidebarLinks.Student;

  return (
    <div className="layout">
      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? "" : "hidden"}`}>
        <img src="/Eduguage-logo.jpg" alt="EDUGAUGE" />
        <h2>EduGauge</h2>
        <p className="role-tag">{role} Portal</p>

        <nav>
          <ul>
            {linksToRender.map((link) => (
              <li key={link.path}>
                <Link to={link.path}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <div className="main">
        {/* Sidebar toggle button */}
        <button
          className="sidebar-toggle"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? "Close" : "Menu"}
        </button>

        {/* Page content */}
        <main className="content">
          <div className="page-wrapper">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
