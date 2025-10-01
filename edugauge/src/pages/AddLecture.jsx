import React from "react";
import "./AddLecture.css";

function AddLecture() {
  return (
    <div className="admin-page">
      {/* Sidebar */}
      <div className="admin-sidebar">
        {/*<img src="/logo.png" alt="EDUGAUGE" />*/}
        {/*<h2>EDUGAUGE</h2>*/}
        {/*<p>System Enhancing LMS Readiness</p>*/}
        <aside className="gb-sidebar">
        {/* image must be in public/edugauge.png */}
        <img src="/Eduguage-logo.jpg" alt="EduGauge Logo" className="gb-logo" />

        <nav className="gb-nav">
          <button className="gb-nav-item">Overview</button>
          <button className="gb-nav-item">Helpful recourse</button>
          <button className="gb-nav-item">Digital Literacy Test</button>
          <button className="gb-nav-item">eFundi Readiness Test</button>
          <button className="gb-nav-item">Helpful Recourse</button>
          <button className="gb-nav-item">At-risk List</button>
          <button className="gb-nav-item">Stats</button>
          <button className="gb-nav-item">Dashboard</button>
          <div className="gb-spacer" />
        </nav>
      </aside>

        
      </div>

      {/* Main Form */}
      <div className="admin-main">
        <form className="admin-card">
          <h1>Lecturer</h1>

          {/* Fields */}
          <div className="form-fields">
            <div className="form-group">
              <label htmlFor="lecturerNumber">Lecturer Number:</label>
              <input type="text" id="lecturerNumber" name="lecturerNumber" />
            </div>

            <div className="form-group">
              <label htmlFor="firstName">First Name:</label>
              <input type="text" id="firstName" name="firstName" />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name:</label>
              <input type="text" id="lastName" name="lastName" />
            </div>

            <div className="form-group">
              <label htmlFor="title">Title:</label>
              <input type="text" id="title" name="title" />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" name="password" />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input type="password" id="confirmPassword" name="confirmPassword" />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" />
            </div>

            <div className="form-group">
              <label htmlFor="confirmEmail">Confirm Email:</label>
              <input type="email" id="confirmEmail" name="confirmEmail" />
            </div>
          </div>

          {/* Actions */}
          <div className="actions">
            <button type="submit">Sign up</button>
            <button type="button" className="clear-btn">Clear</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddLecture;
