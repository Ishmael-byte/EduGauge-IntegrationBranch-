import React, { useState } from "react";
import "./ForgotPassword.css";
import api from "../APIservices/api";

export default function ForgotPassword() {
  const [form, setForm] = useState({
    email: "",
    studentNumber: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (message) setMessage("");
  };

  const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const isValidStudentNumber = (num) => {
    const re = /^\d{8,10}$/;
    return re.test(String(num));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");

    if (!form.email.trim()) {
      setMessage("Email is required.");
      return;
    }
    if (!isValidEmail(form.email)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    if (!form.studentNumber.trim()) {
      setMessage("Student number is required.");
      return;
    }
    if (!isValidStudentNumber(form.studentNumber)) {
      setMessage("Student number must be 8 to 10 digits.");
      return;
    }

    if (!form.newPassword) {
      setMessage("New password is required.");
      return;
    }
    if (form.newPassword.length < 6) {
      setMessage("Password must be at least 6 characters long.");
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      setMessage("New password and confirmation do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/forgotPassword", {
        email: form.email,
        studentNumber: form.studentNumber,
        newPassword: form.newPassword,
      });

      setMessage("Password reset successful! You can now log in with your new password.");
    } catch (error) {
      const errorMsg =
        error.response?.data?.error ||
        error.response?.data?.message ||
        error.message ||
        "Failed to reset password. Please check your details and try again.";
      setMessage(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="forgot-container">
        <div className="forgot-card">
          <h2 className="forgot-title">Forgot Password</h2>
          <p className="forgot-subtitle">
            Enter your email and student number to reset your password.
          </p>

          {message && (
            <div
              className={`message ${
                message.toLowerCase().includes("success") ||
                message.toLowerCase().includes("successful")
                  ? "success"
                  : "error"
              }`}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="forgot-form">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />

            <label>Student Number</label>
            <input
              type="text"
              name="studentNumber"
              value={form.studentNumber}
              onChange={handleChange}
              placeholder="Enter your student number"
            />

            <label>New Password</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="newPassword"
                value={form.newPassword}
                onChange={handleChange}
                placeholder="Enter new password"
                className="password-input"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ color: "#555" }}
                >
                  {showPassword ? (
                    <>
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
                      <circle cx="12" cy="12" r="3" />
                    </>
                  ) : (
                    <>
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <line x1="12" y1="12" x2="12" y2="12" />
                    </>
                  )}
                </svg>
              </button>
            </div>

            <label>Confirm New Password</label>
            <div className="password-input-wrapper">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm new password"
                className="password-input"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ color: "#555" }}
                >
                  {showConfirmPassword ? (
                    <>
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
                      <circle cx="12" cy="12" r="3" />
                    </>
                  ) : (
                    <>
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <line x1="12" y1="12" x2="12" y2="12" />
                    </>
                  )}
                </svg>
              </button>
            </div>

            <button
              type="submit"
              className="forgot-btn"
              disabled={loading}
            >
              {loading ? "Processing..." : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}