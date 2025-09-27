import React from "react";
import "./admin.css";

export default function Admin() {
  return (
    <div className="admin-page">
      <aside className="admin-sidebar">
        {/* Place edugauge.png in the public folder */}
        <img src="/Eduguage-logo.jpg" alt="EduGauge Logo" className="admin-logo" />

        <nav className="admin-nav">
          <button className="admin-nav-item">Overview</button>
          <button className="admin-nav-item">Helpful recourse</button>
          <button className="admin-nav-item">Digital Literacy Test</button>
          <button className="admin-nav-item">eFundi Readiness Test</button>
          <button className="admin-nav-item">Resources</button>
          <button className="admin-nav-item">Uploads</button>
          <button className="admin-nav-item">Changes</button>
          <div className="admin-spacer" />
        </nav>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          {/*<h2 className="admin-small-title">DashBoard</h2>*/}

          {/* Profile bubble using emoji — no external libs */}
          <div className="admin-profile">
            <div className="profile-bubble">👤</div>
            <div className="profile-text">Profile</div>
          </div>
        </header>

        <section className="admin-content">
          <div className="admin-cards">
            <div className="admin-card welcome-card">Welcome Text</div>
            <div className="admin-card tasks-card">Tasks</div>
          </div>
        </section>
      </main>
    </div>
  );
}
