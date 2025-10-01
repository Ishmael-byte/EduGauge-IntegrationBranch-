import React from "react";
import "./gradebook.css";
import { NavLink } from "react-router-dom";

const GradeBook = () => {
  return (
    <div className="gb-page">
      {/* Sidebar */}
      <aside className="gb-sidebar">
        <img src="/Eduguage-logo.jpg" alt="Edugauge Logo" className="gb-logo" />
        
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
                                  Add Lecturer
                                  </NavLink>
          
                                  <NavLink 
                                  to="/add-lecturer" 
                                  className={({ isActive }) => isActive ? "active-link" : ""}
                                  >
                                  Dashboard
                                  </NavLink>
          
        </nav>
      </aside>

      {/* Main Content */}
      <main className="gb-main">
        <header className="gb-header">
          <h2 className="gb-small-title">Gradebook</h2>
          <div className="gb-profile">
            <span className="gb-profile-icon">👤</span>
            <span>Profile</span>
          </div>
        </header>

        <section className="gb-content">
          <div className="gb-test-title">Test Results</div>

          <table className="gb-table">
            <thead>
              <tr>
                <th>Test Item</th>
                <th>Marks</th>
                <th>Resources</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className="left">Digital Literacy Test</td>
                <td></td>
                <td>
                  {/* Example button if needed */}
                  {/* <button className="gb-resource-btn">Resources</button> */}
                </td>
              </tr>

              <tr>
                <td className="left">eFundi Readiness Test</td>
                <td></td>
                <td>
                  {/* <button className="gb-resource-btn">Resources</button> */}
                </td>
              </tr>

              <tr>
                <td></td>
                <td></td>
                <td></td>
              </tr>

              <tr>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default GradeBook;