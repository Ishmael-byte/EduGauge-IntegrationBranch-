import React from 'react';
import './Lecturer.css';

function Lecturer() {
  return (
    <div className="page-container">
      {/* Sidebar */}
      

      {/* Main Content Area */}
      <main className="main-content">
        <header className="main-header">
          <div className="profile-section">
            <span className="profile-icon">👤</span>
            <span>Profile</span>
          </div>
        </header>

        <section className="content-body">
          <div className="content-box">
            Welcome Text
          </div>
          <div className="content-box">
            Tasks
          </div>
        </section>
      </main>
    </div>
  );
}

export default Lecturer;