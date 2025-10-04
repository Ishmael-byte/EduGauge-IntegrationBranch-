import React, { useState } from "react";
import "./ForgotPassword.css";

export default function ForgotPassword() {
  const [form, setForm] = useState({
    email: "",
    studentNumber: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (API call, etc.)
    console.log("Forgot password data:", form);
  };

  return (
    <div className="page-wrapper">
      <div className="forgot-container">
        <div className="forgot-card">
          <h2 className="forgot-title">Forgot Password</h2>
          <p className="forgot-subtitle">
            Please enter your details to reset your password.
          </p>
          <form onSubmit={handleSubmit} className="forgot-form">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />

            <label>Student Number</label>
            <input
              type="text"
              name="studentNumber"
              value={form.studentNumber}
              onChange={handleChange}
              required
              placeholder="Enter your student number"
            />

            <label>New Password</label>
            <input
              type="password"
              name="newPassword"
              value={form.newPassword}
              onChange={handleChange}
              required
              placeholder="Enter new password"
            />

            <label>Confirm New Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Confirm new password"
            />

            <button type="submit" className="forgot-btn">
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}