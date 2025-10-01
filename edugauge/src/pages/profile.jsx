import React from 'react';
import { Link } from 'react-router-dom';
import './profile.css';

// PlaceHolder Data
const placeholderStudentData = {
    name: "Name + Surname",
    studentNumber: "Student Number",
    information: "Contact: Edugauge@schoolproject.ac.za | Date Joined: 2025-02-05",
    skills: ["Digital Competency", "Platform Navigation", "Basic Troubleshooting", "Research Skills", "Time Management"],
};

const ProfilePage = () => {


    return (
        <div className="page-container">
            {/* Sidebar */}
            <aside className="sidebar">
                <div className="logo-section">
                    <img src="/Eduguage-logo.jpg" alt="Eduguage Logo" className="logo-img" />
                    <h1 className="logo-text">EDUGUAGE</h1>
                    <h2 className="logo-subtext">System Enhancing LMS Readiness</h2>
                </div>
                <nav className="gb-nav">
                    <button className="gb-nav-item">Overview</button>
                    <button className="gb-nav-item">Helpful recourse</button>
                    <button className="gb-nav-item">Digital Literacy Test</button>
                    <button className="gb-nav-item">eFundi Readiness Test</button>
                    <button className="gb-nav-item">Helpful Recourse</button>
                    <button className="gb-nav-item">At-risk List</button>
                    <button className="gb-nav-item">Stats</button>
                    <button className="gb-nav-item">Dashboard</button>
                    <button className="gb-nav-item">Add Lecture</button>
                <div className="gb-spacer" />
                </nav>
            </aside>

            {/* Main Content Area */}
            <main className="main-content">
                <header className="main-header">
                    {/* Header Profile Icon */}
                    <Link to="/profile" className="profile-link">
                        <div className="profile-section">
                            <span className="profile-icon">👤</span>
                            <span>Profile</span>
                        </div>
                    </Link>
                </header>

                <div className="profile-layout">
                    {/* Profile Details */}
                    <div className="profile-details">
                        <h1 className="profile-title"> My Profile</h1>
                        {/* section for the big profile icon */}
                        <div className="profile-icon-large">
                            👤
                        </div>
                        <div className="profile-name">{placeholderStudentData.name}</div>
                        <div className="student-number">{placeholderStudentData.studentNumber}</div>
                        <button className="edit-button">Edit Profile</button>
                    </div>

                    {/* My Information */}
                    <div className="data-box info-box-1">
                        <h2 className="data-box-header">My Information</h2>
                        <p className="info-content">{placeholderStudentData.information}</p>
                    </div>

                    {/* Skills Earned */}
                    <div className="data-box info-box-2">
                        <h2 className="data-box-header">Skills Earned</h2>
                        <div className="info-content skill-content">
                            {placeholderStudentData.skills.map((skill, index) => (
                                <span key={index} className="skill-tag">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ProfilePage;