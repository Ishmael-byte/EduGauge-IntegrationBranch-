import React from "react";
import "./AddLecture.css";
import { NavLink } from "react-router-dom";

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
                   
          
          <NavLink 
                               to="/digital-literacy" 
                                  className={({ isActive }) => isActive ? "active-link" : ""}
                                  >
                                  Digital Literacy Test
                                  </NavLink>
          
                                  <NavLink 
                                  to="/efundi-readiness" 
                                  className={({ isActive }) => isActive ? "active-link" : ""}
                                  >
                                  eFundi Readiness Test
                                  </NavLink>
          
                                  <NavLink 
                                  to="/helpful-resource" 
                                  className={({ isActive }) => isActive ? "active-link" : ""}
                                  >
                                  Helpful Resource
                                  </NavLink>
          
                                  <NavLink 
                                  to="/grade-book" 
                                  className={({ isActive }) => isActive ? "active-link" : ""}
                                  >
                                  Grade Book
                                  </NavLink>
          
                                  <NavLink 
                                  to="/at-risk-list" 
                                  className={({ isActive }) => isActive ? "active-link" : ""}
                                  >
                                  At-risk List
                                  </NavLink>
          
                                  <NavLink 
                                  to="/stats" 
                                  className={({ isActive }) => isActive ? "active-link" : ""}
                                  >
                                  Stats
                                  </NavLink>
          
                                  <NavLink 
                                  to="/add-lecturer" 
                                 className={({ isActive }) => isActive ? "active-link" : ""}
                                  >
                                  Dashboard
                                  </NavLink>
          
          
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
