import React from "react";
import "./dashboard.css";

export default function Dashboard() {
  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Dashboard</h1>
        <div className="profile-section">
          <span className="profile-icon">👤</span>
          <span>Profile</span>
        </div>
      </div>

      <div className="dashboard-widgets">
        {/* Welcome Box */}
        <div className="dashboard-box">
          <h2 className="box-heading">Welcome to Educate</h2>
          <p className="box-content">
            This platform is here to help you get ready for university. Test your digital literacy—from creating files to navigating eFundi, our university’s platform—and see if you’re fully prepared to succeed. Educate will guide you, provide personalized resources, and help you strengthen the skills you need to start university with confidence.
          </p>
        </div>

        {/* Task Message Box */}
        <div className="dashboard-box">
          <h2 className="box-heading">Your Task Messenger</h2>
          <p className="box-content">
            Your first steps in Educate:
          </p>
          <ul className="task-list">
            <li>Navigate to your eFundi Readiness Test and the Digital Literacy Test.</li>
            <li>Complete both tests.</li>
            <li>Go to the Gradebook to view your results.</li>
            <li>✅ If you pass: Well done! You’re ready for university.</li>
            <li>❌ If you don’t pass: Educate will provide personalized resources to help you improve.</li>
            <li>Retake the test after studying.</li>
            <li>✅ If you pass the second time: Great job!</li>
            <li>❌ If you still don’t pass: Your name will be shared with lecturers, who will contact you for a physical class to get you ready for university.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}