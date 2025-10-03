import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import "./Layout.css";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="layout">
      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? "" : "hidden"}`}>
        <h2>EduGauge</h2>
        <nav>
          <ul>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/efunditest">eFundi Test</Link></li>
            <li><Link to="/digitalliteracytest">Digital Literacy Test</Link></li>
            <li><Link to="/gradebook">GradeBook</Link></li>
            <li><Link to="/admin">Admin</Link></li>
            <li><Link to="/addlecture">Add Lecture</Link></li>
            <li><Link to="/lecturer">Lecturer</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/resources">Resources</Link></li>
            <li><Link to="/atrisklist">At Risk List</Link></li>
            <li><Link to="/stats">Stats</Link></li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <div className="main">
        {/* Sidebar toggle */}
        <button
          className="sidebar-toggle"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? "Close" : "Menu"}
        </button>

        {/* Outlet for page content */}
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
