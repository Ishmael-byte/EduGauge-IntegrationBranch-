import React, { useState } from "react";
import "./AddLecture.css";
import { NavLink } from "react-router-dom";

function AddLecture({ initialLecturers = [], onSubmit, onDelete }) {
  const [lecturers, setLecturers] = useState(initialLecturers);
  const [formData, setFormData] = useState({
    lecturerNumber: "",
    name: "",
    title: "",
    email: "",
    password: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.lecturerNumber) return;

    if (editId) {
      // Update lecturer
      const updatedLecturers = lecturers.map((lec) =>
        lec.id === editId
          ? {
              ...lec,
              ...formData,
              password: formData.password ? formData.password : lec.password,
            }
          : lec
      );
      setLecturers(updatedLecturers);
      if (onSubmit) onSubmit(updatedLecturers);
      setEditId(null);
    } else {
      // Add new lecturer
      const newLecturer = {
        id: Date.now(),
        ...formData,
      };
      const updatedLecturers = [...lecturers, newLecturer];
      setLecturers(updatedLecturers);
      if (onSubmit) onSubmit(updatedLecturers);
    }

    setFormData({ lecturerNumber: "", name: "", title: "", email: "", password: "" });
  };

  const handleRowClick = (lec) => {
    setFormData({
      lecturerNumber: lec.lecturerNumber || lec.number || "",
      name: lec.name || "",
      title: lec.title || "",
      email: lec.email || "",
      password: "",
    });
    setEditId(lec.id);
  };

  const handleCancelEdit = () => {
    setFormData({ lecturerNumber: "", name: "", title: "", email: "", password: "" });
    setEditId(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this lecturer?")) {
      const updatedLecturers = lecturers.filter((lec) => lec.id !== id);
      setLecturers(updatedLecturers);
      if (onDelete) onDelete(id);
      if (editId === id) handleCancelEdit();
    }
  };

  const filteredLecturers = lecturers.filter(
    (lec) =>
      (lec.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lec.number || lec.lecturerNumber || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lec.email || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-container">

      {/* Sidebar */}
     

      <main className="main-content">
        <header className="main-header">
          <h1 className="header-title">{editId ? "Edit Lecturer" : "Add Lecturer"}</h1>
          <div className="profile-section">
            <span className="profile-icon">👤</span>
            <span>Profile</span>
          </div>
        </header>

        <div className="content-body">
          <div className="content-box">
            <form className="admin-card" onSubmit={handleSubmit}>
              <div className="form-fields">
                <div className="form-group">
                  <label htmlFor="lecturerNumber">Lecturer Number:</label>
                  <input
                    type="text"
                    id="lecturerNumber"
                    name="lecturerNumber"
                    value={formData.lecturerNumber}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="name">Full Name:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="title">Title:</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">
                    {editId ? "New Password (leave blank to keep current)" : "Password:"}
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required={!editId}
                  />
                </div>
              </div>

              <div className="actions">
                <button type="submit">{editId ? "Update" : "Add"}</button>
                {editId && (
                  <button type="button" className="cancel-btn" onClick={handleCancelEdit}>
                    Cancel Edit
                  </button>
                )}
              </div>
            </form>
          </div>

          <div className="lecturer-list">
            <h2>Existing Lecturers</h2>
            <input
              type="text"
              placeholder="Search lecturers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-bar"
            />
            <ul>
              {filteredLecturers.map((lec) => (
                <li
                  key={lec.id}
                  className={`lecturer-item ${editId === lec.id ? "editing" : ""}`}
                  onClick={() => handleRowClick(lec)}
                >
                  <span>
                    {lec.title} {lec.name} ({lec.lecturerNumber || lec.number}) - {lec.email}
                  </span>
                  <button
                    className="delete-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(lec.id);
                    }}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
    
  );
}

export default AddLecture;