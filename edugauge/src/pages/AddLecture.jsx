import React, { useState } from "react";
import "./AddLecture.css";

function AddLecture() {
  const [formData, setFormData] = useState({
    lecturerNumber: "",
    firstName: "",
    lastName: "",
    title: "",
    password: "",
    confirmPassword: "",
    email: "",
    confirmEmail: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return; 
    }
    if (formData.email !== formData.confirmEmail) {
      alert("Emails do not match!");
      return;
    }

    console.log("Form Submitted:", formData);
  };

  const handleClear = () => {
    setFormData({
      lecturerNumber: "",
      firstName: "",
      lastName: "",
      title: "",
      password: "",
      confirmPassword: "",
      email: "",
      confirmEmail: ""
    });
  };

  const fields = [
    { id: "lecturerNumber", label: "Lecturer Number:" },
    { id: "firstName", label: "First Name:" },
    { id: "lastName", label: "Last Name:" },
    { id: "title", label: "Title:" },
    { id: "password", label: "Password:", type: "password" },
    { id: "confirmPassword", label: "Confirm Password:", type: "password" },
    { id: "email", label: "Email:", type: "email" },
    { id: "confirmEmail", label: "Confirm Email:", type: "email" }
  ];

  return (
    <div className="admin-page">
      <div className="admin-sidebar">
        <img src="/logo.png" alt="EDUGAUGE" />
        <h2>EDUGAUGE</h2>
        <p>System Enhancing LMS Readiness</p>

        <button>Overview</button>
        <button>Digital Literacy Test</button>
        <button>eFundi Readiness Test</button>
        <button>Helpful Recourse</button>
        <button>Grade Book</button>
        <button>At-risk List</button>
        <button>Stats</button>
        <button>Add Lecturer</button>
      </div>

      <div className="admin-main">
        <form onSubmit={handleSubmit} className="admin-card">
          <h1>Lecturer</h1>

{fields.map((field) => (
  <div className="form-group" key={field.id}>
    <label htmlFor={field.id}>{field.label}</label>
    <input
      id={field.id}
      type={field.type || "text"}
      name={field.id}
      value={formData[field.id]}
      onChange={handleChange}
      required
    />
  </div>
))}

          <div className="actions">
            <button type="submit">Sign up</button>
            <button type="button" className="clear-btn" onClick={handleClear}>
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddLecture;