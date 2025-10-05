import React, { useState, useEffect } from "react";
import "./Resources.css";
import api from '../APIservices/api';


const ResourcePage = ({ worldBasedOnly = false }) => {
  const [efundiResources, setEfundiResources] = useState([]);
  const [digitalResources, setDigitalResources] = useState([]);

  // File input
  const [file, setFile] = useState(null);
  const handleFileChange = (e) => setFile(e.target.files[0]);

  // Link input
  const [linkName, setLinkName] = useState("");
  const [linkUrl, setLinkUrl] = useState("");

  // Load resources from DB on component mount
  useEffect(() => {
  const fetchResources = async () => {
    try {
      const response = await api.get("/resources");
      const rawData = response.data.resources || response.data; // handle both formats

      const allResources = Array.isArray(rawData) ? rawData : [];

      // Normalize each resource for UI
      const normalized = allResources.map(res => {
        // Infer type: if url points to your /resources/file/ → it's a file
        const isFile = res.url && res.url.startsWith('/resources/file/');
        
        return {
          ...res,
          name: res.name || res.resource_name, // fallback to DB field
          type: isFile ? 'file' : 'link',     // auto-detect
          // Keep other fields: resource_id, url, date, category, etc.
        };
      });

      const efundi = normalized.filter(res => res.category === "efundi" || !res.category);
      const digital = normalized.filter(res => res.category === "digital");

      setEfundiResources(efundi);
      setDigitalResources(digital);

    } catch (err) {
      if (err.response?.status === 403) {
        alert("Access denied. You may not have permission to view these resources.");
      } else {
        alert("Failed to load resources: " + (err.response?.data?.error || err.message));
      }
    }
  };

  fetchResources();
}, []);

  // Upload file to DB
  const handleUpload = async (category) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("resource_name", file.name);
    formData.append("category", category);
    formData.append("date", new Date().toISOString().split("T")[0]);

    try {
      const response = await api.post("/resources/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const newResource = {
  ...response.data,
  name: response.data.resource_name || file.name, // ensure `name` exists
  type: "file",
  size: file.size > 1024 * 1024
    ? `${(file.size / (1024 * 1024)).toFixed(2)} MB`
    : `${(file.size / 1024).toFixed(2)} KB`,
  date: new Date().toLocaleDateString(),
  url: response.data.url || URL.createObjectURL(file),
  category: category,
};

      if (category === "efundi") {
        setEfundiResources(prev => [newResource, ...prev]);
      } else {
        setDigitalResources(prev => [newResource, ...prev]);
      }

      setFile(null);
    } catch (err) {
      alert("Upload failed: " + (err.response?.data?.error || err.message));
    }
  };

  // Add link to DB
  const handleLinkUpload = async (category) => {
    if (!linkName || !linkUrl) return;

    const payload = {
      resource_name: linkName,
      url: linkUrl,
      category,
      date: new Date().toISOString().split("T")[0],
    };

    try {
      const response = await api.post("/resources", payload);

      const newResource = {
        ...response.data,
        name: linkName,
        type: "link",
        url: linkUrl,
        date: new Date().toLocaleDateString(),
      };

      if (category === "efundi") {
        setEfundiResources(prev => [newResource, ...prev]);
      } else {
        setDigitalResources(prev => [newResource, ...prev]);
      }

      setLinkName("");
      setLinkUrl("");
    } catch (err) {
      alert("Failed to add link: " + (err.response?.data?.error || err.message));
    }
  };

  // Delete resource from DB and UI
  const handleDelete = async (id, setCategory) => {
    try {
      await api.delete(`/resources/${id}`);
      setCategory(prev => prev.filter(res => res.resource_id !== id));
    } catch (err) {
      alert("Delete failed: " + (err.response?.data?.error || err.message));
    }
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
              <tr key={res.resource_id || index}>
                <td>{res.name}</td>
                <td>
                  {res.type === "file" ? (
                    <a href={res.url} download={res.name} className="table-btn">
                      Download
                    </a>
                  ) : (
                    <a
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="table-btn"
                    >
                      Open Link
                    </a>
                  )}
                  <button
                    onClick={() => handleDelete(res.resource_id, setCategory)}
                    className="table-btn delete-btn"
                  >
                    Delete
                  </button>
                </td>
                <td>Entire site</td>
                <td>Admin</td>
                <td>{res.date?.split('T')[0] || res.date}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );

  // Upload section renderer
  const renderUploadSection = (category) => (
    <>
      {/* File upload */}
      <div className="upload-section">
        <input type="file" onChange={handleFileChange} className="file-input" />
        <button
          onClick={() => handleUpload(category)}
          className="upload-btn"
        >
          Upload File
        </button>
        <button onClick={() => setFile(null)} className="upload-btn clear-btn">
          Clear
        </button>
      </div>

      {/* Link upload */}
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
        <button
          onClick={() => handleLinkUpload(category)}
          className="upload-btn"
        >
          Add Link
        </button>
        <button
          onClick={() => {
            setLinkName("");
            setLinkUrl("");
          }}
          className="upload-btn clear-btn"
        >
          Clear
        </button>
      </div>
    </>
  );

  return (
    <div className="page-container">
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
            <h2>eFundi Readiness Test Resources</h2>
            {!worldBasedOnly && renderUploadSection("efundi")}
            {renderTable(efundiResources, setEfundiResources)}
          </div>

          <div className="content-box resource-page">
            <h2>Digital Literacy Resources</h2>
            {!worldBasedOnly && renderUploadSection("digital")}
            {renderTable(digitalResources, setDigitalResources)}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResourcePage;