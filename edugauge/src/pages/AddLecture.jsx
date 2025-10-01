import React from "react";
import "./AddLecture.css";

function AddLecture() {
  return (
    <div className="page-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo-section">
          <img src="/Eduguage-logo.jpg" alt="Edugauge Logo" className="logo" />
          <h1 className="logo-text">EDUGUAGE</h1>
          <h2 className="logo-subtext">System Enhancing LMS Readiness</h2>
        </div>

        <nav className="sidebar-nav">
          <ul>
            <li><a href="#">Overview</a></li>
            <li><a href="#">Digital Literacy Test</a></li>
            <li><a href="#">eFundi Readiness Test</a></li>
            <li><a href="#">Helpful Recourse</a></li>
            <li><a href="#">Gradebook</a></li>
            <li><a href="#">At-risk List</a></li>
            <li><a href="#">Stats</a></li>
            <li><a href="#" className="active">Add Lecturer</a></li>
          </ul>
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

              <div className="actions">
                <button type="submit">Sign up</button>
                <button type="button" className="clear-btn">Clear</button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AddLecture;