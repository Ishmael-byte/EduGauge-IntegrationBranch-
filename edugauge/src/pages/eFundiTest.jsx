import React from 'react';
import { NavLink } from "react-router-dom";
import './EFundiTest.css'; // your custom CSS

function EFundiTest() {
  return (
    <div className="layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo-section">
          <img src="/logo.png" alt="Logo" className="logo" />
          <div className="logo-text">eFundi</div>
          <div className="logo-subtext">Test Portal</div>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li>
              <NavLink to="#" className={({ isActive }) => isActive ? "active-link" : ""}>
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="#" className={({ isActive }) => isActive ? "active-link" : ""}>
                Tests
              </NavLink>
            </li>
            <li>
              <NavLink to="#" className={({ isActive }) => isActive ? "active-link" : ""}>
                Profile
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main">
        <header className="main-header">
          <h1 className="header-title">eFundi Readiness Test</h1>
          <div className="profile-section">
            <span className="profile-icon">👤</span>
            <span>Profile</span>
          </div>
        </header>

        <div className="content">
          <div className="page-wrapper">
            <div className="content-body">
              <div className="content-box">
                <h2>Question 1</h2>
                <p>
                  Select the area to which one can access files, videos and etc provided by lecturers
                </p>
              </div>

              <img src="/efundi-calendar.png" alt="eFundi Calendar" className="calendar-image" />

              <div className="button-section">
                <button className="btn save-btn">Save</button>
                <button className="btn submit-btn">Submit</button>
                <button className="btn exit-btn">Exit</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default EFundiTest;