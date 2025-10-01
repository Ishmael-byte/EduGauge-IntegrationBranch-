import React from "react";
import "./AddLecture.css";
import { NavLink } from "react-router-dom";

function AddLecture() {
  return (
    <div className="page-container">
      {/* Sidebar */}
      <aside className="gb-sidebar">
        {/* logo */}
        <img src="/Eduguage-logo.jpg" alt="EduGauge Logo" className="gb-logo" />

        <nav className="gb-nav">
          <NavLink 
            to="/digital-literacy" 
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Digital Literacy Test
          </NavLink>

          <NavLink 
            to="/efundi-test" 
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            eFundi Readiness Test
          </NavLink>

          <NavLink 
            to="/resources" 
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Helpful Resource
          </NavLink>

          <NavLink 
            to="/grade-book" 
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Grade Book
          </NavLink>

          <NavLink 
            to="/dashboard" 
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Dashboard
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="main-header">
          <h1 className="header-title">Add Lecturer</h1>
          <div className="profile-section">
            <span className="profile-icon">👤</span>
            <span>Profile</span>
          </div>
        </header>

        <div className="content-body">
          <div className="content-box">
            <form className="admin-card">
              <h2>Lecturer Details</h2>

              {/* Photo */}
              <div className="form-group photo-group">
                <label>Profile Photo:</label>
                <input type="file" accept="image/*" />
                <img
                  src="/default-profile.png"
                  alt="Lecturer"
                  className="lecturer-photo"
                />
              </div>

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
                <button type="button" className="clear-btn">
                  Clear
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AddLecture;
