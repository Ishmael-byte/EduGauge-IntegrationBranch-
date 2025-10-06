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
          <h2 className="box-heading">Welcome to Eduguage</h2>
          <p className="box-content">
            This platform is here to help you get ready for university. Test your digital literacy from creating files to navigating eFundi, our university’s platform and see if you’re fully prepared to succeed. Edugauge  will guide you, provide personalized resources, and help you strengthen the skills you need to start university with confidence.
          </p>
        </div>

        {/* Task Message Box */}
        <div className="dashboard-box">
          <h2 className="box-heading">Your Task Messenger</h2>
          <p className="box-content">
            Your first steps in Eduguage:
          </p>
          <ul className="task-list">
            <li><span>1️⃣</span> Navigate to your <strong>eFundi Readiness Test</strong> and <strong>Digital Literacy Test</strong>.</li>
            <li><span>2️⃣</span> Complete both tests.</li>
            <li><span>3️⃣</span> Go to the <strong>Gradebook</strong> to view your results.</li>
            <li><span>✅</span> <strong>If you pass:</strong> Well done! You’re ready for university. 🎉</li>
            <li><span>❌</span> <strong>If you don’t pass:</strong> Edugauge will provide personalized resources to help you improve.</li>
            <li><span>🔁</span> Retake the test after studying.</li>
            <li><span>🌟</span> <strong>If you pass the second time:</strong> Great job!</li>
            <li><span>💡</span> <strong>If you still don’t pass:</strong> Your name will be shared with lecturers for a follow up physical support class.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}