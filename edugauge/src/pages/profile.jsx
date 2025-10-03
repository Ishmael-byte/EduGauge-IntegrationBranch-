import React, { useState, useEffect } from 'react'; //Added useState and useEffect (needed for API calls)
import { Link } from 'react-router-dom';
import './profile.css';
import api from '../APIservices/api'; //Fixed import path - removed .js extension

const placeholderStudentData = {
    name: "Name + Surname",
    studentNumber: "Student Number",
    information: "Contact: Edugauge@schoolproject.ac.za | Date Joined: 2025-02-05",
    skills: ["Digital Competency", "Platform Navigation", "Basic Troubleshooting", "Research Skills", "Time Management"],
};
const ProfilePage = () => {
    // State to hold student profile data
    const [studentProfile, setStudentProfile] = useState(null);
  
    // State to track loading status
    const [loading, setLoading] = useState(true);
  
    // State to handle errors
    const [error, setError] = useState('');

    // Fetch student profile data from the backend API
    useEffect(() => {
        const fetchStudentProfile = async () => {
            try {
                // Get student info from localStorage 
                const savedStudent = JSON.parse(localStorage.getItem('student'));
            
                // Check if we have student data
                if (!savedStudent || !savedStudent.student_number) {
                    setError('No student information found. Please login first.');
                    setLoading(false);
                    return;
                }
                
                //Call my backend API
                const response = await api.get(`/profile/${savedStudent.student_number}`);
                
                setStudentProfile(response.data);
                setLoading(false); 
                
            } catch (err) {
                setError('Failed to fetch profile data. Please try again.');
                setLoading(false);
            }
        };
        fetchStudentProfile();
    }, []);

    if (loading) {
        return <div>Loading...</div>; 
    }
    if (error) {
        return <div className="error-message">{error}</div>;
    }

    const displayName = studentProfile 
        ? `${studentProfile.Fname} ${studentProfile.Lname}` //First + Last Name to display on the profile page
        : placeholderStudentData.name;

    const displayStudentNumber = studentProfile 
        ? studentProfile.student_number //Student Number from API
        : placeholderStudentData.studentNumber;

    return (
        <div className="page-container">
            {/* Sidebar */}
            <aside className="sidebar">
                <div className="logo-section">
                    <img src="/Eduguage-logo.jpg" alt="Eduguage Logo" className="logo-img" />
                    <h1 className="logo-text">EDUGUAGE</h1>
                    <h2 className="logo-subtext">System Enhancing LMS Readiness</h2>
                </div>
                <nav>
                    <ul className="sidebar-nav">
                        <li><Link to="/dashboard" className="nav-link">Overview</Link></li>
                        <li><Link to="/DigitalLiteracyTest" className="nav-link">Digital Literacy Test</Link></li>
                        <li><Link to="/eFundiTest" className="nav-link">eFundi Readiness Test</Link></li>
                        <li><Link to="/Resources" className="nav-link">Helpful recourse</Link></li>
                    </ul>
                </nav>
            </aside>
            <main className="main-content">
                <header className="main-header">
                    <Link to="/profile" className="profile-link">
                        <div className="profile-section">
                            <span className="profile-icon">👤</span>
                            <span>Profile</span>
                        </div>
                    </Link>
                </header>
                <div className="profile-layout">
                    <div className="profile-details">
                        <h1 className="profile-title"> My Profile</h1>
                        {/* section for the big profile icon */}
                        <div className="profile-icon-large">
                            👤
                        </div>
                        <div className="profile-name">{displayName}</div> {/*Display actual name instead of a placeholder*/}
                        <div className="student-number">{displayStudentNumber}</div>
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