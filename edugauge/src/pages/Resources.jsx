import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Resources.css";

const ResourcePage = ({ worldBasedOnly = false }) => {
  const [resources, setResources] = useState([]);
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) return;
    const newResource = {
      name: file.name,
      size:
        file.size > 1024 * 1024
          ? `${(file.size / (1024 * 1024)).toFixed(2)} MB`
          : `${(file.size / 1024).toFixed(2)} KB`,
      date: new Date().toLocaleDateString(),
      url: URL.createObjectURL(file),
    };
    setResources([newResource, ...resources]);
    setFile(null);
  };

  return (
    <div className="page-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo-section">
          <img src="/path-to-logo.png" alt="EDUGUAGE Logo" className="logo" />
          <h1 className="logo-text">EDUGUAGE</h1>
          <p className="logo-subtext">System Enhancing LMS Readiness</p>
        </div>

        <nav className="sidebar-nav">
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
                    
          <div className="gb-spacer" />
        </nav>
        </nav>
      </aside>

      {/* Main content */}
      <main className="main-content">
        <header className="main-header">
          <h1 className="header-title">Helpful Resources</h1>
          <div className="profile-section">
            <span className="profile-icon">👤</span>
            <span>Profile</span>
          </div>
        </header>

        <div className="content-body">
          <div className="content-box resource-page">
            <h2>Resources</h2>

            {!worldBasedOnly && (
              <div className="upload-section">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="file-input"
                />
                <button onClick={handleUpload} className="upload-btn">
                  Upload
                </button>
              </div>
            )}

            {/* Resource Table */}
            <div className="resource-table-container">
              <table className="resource-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Actions</th>
                    <th>Visibility</th>
                    <th>Author</th>
                    <th>Date</th>
                    <th>Items</th>
                  </tr>
                </thead>
                <tbody>
                  {resources.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="no-resources">
                        No resources available yet
                      </td>
                    </tr>
                  ) : (
                    resources.map((res, index) => (
                      <tr key={index}>
                        <td>{res.name}</td>
                        <td>
                          <a
                            href={res.url}
                            download={res.name}
                            className="table-btn"
                          >
                            Download
                          </a>
                        </td>
                        <td>Entire site</td>
                        <td>Admin</td>
                        <td>{res.date}</td>
                        <td>1 item</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResourcePage;