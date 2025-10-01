import React from 'react';
import './Lecturer.css';

function Lecturer() {
  return (
    <div className="page-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo-section">
          <img src="/Eduguage-logo.jpg" alt="Edugauge Logo" className="logo-img" />
          <h1 className="logo-text">EDUGUAGE</h1>
          <h2 className="logo-subtext">System Enhancing LMS Readiness</h2>
        </div>
        <nav>
          <ul className="sidebar-nav">
            <li><a href="#" className="nav-link">Overview</a></li>
            <li><a href="#" className="nav-link">Digital Literacy Test</a></li>
            <li><a href="#" className="nav-link">eFundi Readiness Test</a></li>
            <li><a href="#" className="nav-link">Helpful recourse</a></li>
          </ul>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        <header className="main-header">
          <div className="profile-section">
            <span className="profile-icon">👤</span>
            <span>Profile</span>
          </div>
        </header>

        <section className="content-body">
          <div className="content-box">
            Welcome Text
          </div>
          <div className="content-box">
            Tasks
          </div>
        </section>
      </main>
    </div>
  );
}

export default Lecturer;