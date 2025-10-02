import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Resources.css";

const ResourcePage = ({ worldBasedOnly = false }) => {
  // Separate state for each resource category
  const [efundiResources, setEfundiResources] = useState([]);
  const [digitalResources, setDigitalResources] = useState([]);

  // File upload
  const [file, setFile] = useState(null);
  const handleFileChange = (e) => setFile(e.target.files[0]);
  const handleUpload = (setCategory) => {
    if (!file) return;
    const newResource = {
      name: file.name,
      type: "file",
      size:
        file.size > 1024 * 1024
          ? `${(file.size / (1024 * 1024)).toFixed(2)} MB`
          : `${(file.size / 1024).toFixed(2)} KB`,
      date: new Date().toLocaleDateString(),
      url: URL.createObjectURL(file),
    };
    setCategory((prev) => [newResource, ...prev]);
    setFile(null);
  };

  // Link upload
  const [linkName, setLinkName] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const handleLinkUpload = (setCategory) => {
    if (!linkName || !linkUrl) return;
    const newResource = {
      name: linkName,
      type: "link",
      url: linkUrl,
      date: new Date().toLocaleDateString(),
    };
    setCategory((prev) => [newResource, ...prev]);
    setLinkName("");
    setLinkUrl("");
  };

  // Delete resource
  const handleDelete = (index, setCategory) => {
    setCategory((prev) => prev.filter((_, i) => i !== index));
  };

  // Table renderer
  const renderTable = (resources, setCategory) => (
    <div className="resource-table-container">
      <table className="resource-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
            <th>Visibility</th>
            <th>Author</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {resources.length === 0 ? (
            <tr>
              <td colSpan="5" className="no-resources">
                No resources available yet
              </td>
            </tr>
          ) : (
            resources.map((res, index) => (
              <tr key={index}>
                <td>{res.name}</td>
                <td>
                  {res.type === "file" ? (
                    <a href={res.url} download={res.name} className="table-btn">
                      Download
                    </a>
                  ) : (
                    <a href={res.url} target="_blank" rel="noopener noreferrer" className="table-btn">
                      Open Link
                    </a>
                  )}
                  <button
                    onClick={() => handleDelete(index, setCategory)}
                    className="table-btn delete-btn"
                  >
                    Delete
                  </button>
                </td>
                <td>Entire site</td>
                <td>Admin</td>
                <td>{res.date}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );

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
            <NavLink to="/digital-literacy" className={({ isActive }) => isActive ? "active-link" : ""}>
              Digital Literacy Test
            </NavLink>
            <NavLink to="/efundi-readiness" className={({ isActive }) => isActive ? "active-link" : ""}>
              eFundi Readiness Test
            </NavLink>
            <NavLink to="/grade-book" className={({ isActive }) => isActive ? "active-link" : ""}>
              Grade Book
            </NavLink>
            <NavLink to="/at-risk-list" className={({ isActive }) => isActive ? "active-link" : ""}>
              At-risk List
            </NavLink>
            <NavLink to="/stats" className={({ isActive }) => isActive ? "active-link" : ""}>
              Stats
            </NavLink>
            <NavLink to="/add-lecturer" className={({ isActive }) => isActive ? "active-link" : ""}>
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
          {/* Efundi Section */}
          <div className="content-box resource-page">
            <h2>eFundi Readiness Test Resources</h2>

            {!worldBasedOnly && (
              <>
                <div className="upload-section">
                  <input type="file" onChange={handleFileChange} className="file-input" />
                  <button onClick={() => handleUpload(setEfundiResources)} className="upload-btn">
                    Upload File
                  </button>
                </div>

                <div className="upload-section">
                  <input
                    type="text"
                    placeholder="Link Title"
                    value={linkName}
                    onChange={(e) => setLinkName(e.target.value)}
                    className="file-input"
                  />
                  <input
                    type="url"
                    placeholder="https://example.com"
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                    className="file-input"
                  />
                  <button onClick={() => handleLinkUpload(setEfundiResources)} className="upload-btn">
                    Add Link
                  </button>
                </div>
              </>
            )}

            {renderTable(efundiResources, setEfundiResources)}
          </div>

          {/* Digital Literacy Section */}
          <div className="content-box resource-page">
            <h2>Digital Literacy Resources</h2>

            {!worldBasedOnly && (
              <>
                <div className="upload-section">
                  <input type="file" onChange={handleFileChange} className="file-input" />
                  <button onClick={() => handleUpload(setDigitalResources)} className="upload-btn">
                    Upload File
                  </button>
                </div>

                <div className="upload-section">
                  <input
                    type="text"
                    placeholder="Link Title"
                    value={linkName}
                    onChange={(e) => setLinkName(e.target.value)}
                    className="file-input"
                  />
                  <input
                    type="url"
                    placeholder="https://example.com"
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                    className="file-input"
                  />
                  <button onClick={() => handleLinkUpload(setDigitalResources)} className="upload-btn">
                    Add Link
                  </button>
                </div>
              </>
            )}

            {renderTable(digitalResources, setDigitalResources)}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResourcePage;