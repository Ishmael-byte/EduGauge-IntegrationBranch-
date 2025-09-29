import React from 'react';
import { Link } from 'react-router-dom';

// PlaceHolder Data
const placeholderStudentData = {
  name: "Name + Surname",
  studentNumber: "Student Number",
  information: "Contact: Edugauge@schoolproject.ac.za | Date Joined: 2025-02-05",
  skills: ["Digital Competency", "Platform Navigation", "Basic Troubleshooting", "Research Skills", "Time Management"],
};


const themeColors = {
    background: '#3d3d3d', 
    sidebar: '#202020',
    navBg: '#383838',
    card: '#4f4f4f', 
    text: '#E0E0E0',
    primary: '#58b6e2', 
    secondary: '#6a369e', 
};

// Overall layout styles
const styles = {
    pageContainer: {
      display: 'flex',
      minHeight: '100vh',
      width: '100vw',
      fontFamily: 'Roboto, Arial, sans-serif',
      color: themeColors.text,
      backgroundColor: themeColors.background,
    },
    sidebar: {
      width: '250px',
      backgroundColor: themeColors.sidebar,
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
    },
    logoSection: {
      textAlign: 'center',
      marginBottom: '30px',
    },
    logoImg: {
      maxWidth: '100px',
      height: 'auto',
    },
    logoText: {
      color: '#fff',
      margin: '5px 0',
      fontSize: '1.2rem',
    },
    logoSubtext: {
      color: '#fff',
      margin: '5px 0',
      fontSize: '0.8rem',
    },
    sidebarNav: {
      listStyle: 'none',
      padding: '0',
    },
    navLink: {
      display: 'block',
      padding: '15px 20px',
      marginBottom: '5px',
      backgroundColor: themeColors.navBg,
      color: '#fff',
      textDecoration: 'none',
      borderRadius: '5px',
      transition: 'background-color 0.3s',
    },
    mainContent: {
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
      padding: '20px 40px', 
    },
    mainHeader: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      padding: '10px 0',
      marginBottom: '30px',
    },
    // Header Profile styles
    profileSection: { 
      display: 'flex',
      alignItems: 'center',
      backgroundColor: '#555', 
      padding: '5px 15px',
      borderRadius: '20px',
      cursor: 'pointer', 
    },
    profileIcon: { 
        fontSize: '1.5rem',
        marginRight: '10px',
        color: themeColors.text,
    },
   

    
    profileLayout: {
        display: 'grid',
        gridTemplateColumns: '300px 1fr', 
        gridTemplateRows: 'auto 1fr',     
        gap: '30px',
        flexGrow: 1,
    },
    profileDetails: {
        gridColumn: '1 / 2',
        gridRow: '1 / 3', 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px 0',
    },
    profileTitle: {
        fontSize: '28px', 
        color: themeColors.text, 
        alignSelf: 'flex-start', 
        margin: '0 0 20px 0',
        fontWeight: 'bold',
    },
    //  Profile icon styles
    profileIconLarge: {
      width: '150px', 
      height: '150px',
      borderRadius: '50%',
      backgroundColor: themeColors.card, 
      border: `4px solid ${themeColors.secondary}`,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: '20px',
      fontSize: '70px', // Size for the emoji
    },
    
    profileName: {
      fontSize: '24px',
      fontWeight: '600',
      marginBottom: '5px',
    },
    studentNumber: {
      fontSize: '16px',
      color: '#aaa',
      marginBottom: '30px',
    },
    editButton: {
      backgroundColor: themeColors.navBg, 
      color: themeColors.text,
      border: 'none',
      padding: '10px 30px',
      cursor: 'pointer',
      borderRadius: '5px',
      fontSize: '14px',
      transition: 'background-color 0.2s',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    
    // Data box styles
    dataBox: {
      backgroundColor: themeColors.card,
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      minHeight: '180px',
    },
    dataBoxHeader: {
      fontSize: '18px',
      fontWeight: '600',
      marginBottom: '15px',
      borderBottom: '1px solid #666',
      paddingBottom: '5px',
    },
    infoContent: {
        fontSize: '14px',
        lineHeight: '1.6',
    },
};

const ProfilePage = () => {

    return (
        <div style={styles.pageContainer}>
            {/* Sidebar */}
            <aside style={styles.sidebar}>
                <div style={styles.logoSection}>
                    <img src="/Eduguage-logo.jpg" alt="Eduguage Logo" style={styles.logoImg} />
                    <h1 style={styles.logoText}>EDUGUAGE</h1>
                    <h2 style={styles.logoSubtext}>System Enhancing LMS Readiness</h2>
                </div>
                <nav>
                    <ul style={styles.sidebarNav}>
                        <li><Link to="/dashboard" style={styles.navLink}>Overview</Link></li>
                        <li><a href="#" style={styles.navLink}>Digital Literacy Test</a></li>
                        <li><a href="#" style={styles.navLink}>eFundi Readiness Test</a></li>
                        <li><a href="#" style={styles.navLink}>Helpful recourse</a></li>
                    </ul>
                </nav>
            </aside>

            {/* Main Content Area */}
            <main style={styles.mainContent}>
                <header style={styles.mainHeader}>
                    {/* Header Profile Icon */}
                    <Link to="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div style={styles.profileSection}>
                            <span style={styles.profileIcon}>👤</span>
                            <span>Profile</span>
                        </div>
                    </Link>
                </header>

                <div style={styles.profileLayout}>
                    {/*  Profile Details */}
                    <div style={styles.profileDetails}>
                        <h1 style={styles.profileTitle}> My Profile</h1>
                        {/* section for the big profile icon */}
                        <div style={styles.profileIconLarge}>
                            👤
                        </div>
                        <div style={styles.profileName}>{placeholderStudentData.name}</div>
                        <div style={styles.studentNumber}>{placeholderStudentData.studentNumber}</div>
                        <button style={styles.editButton}>Edit Profile</button>
                    </div>

                    {/*  My Information  */}
                    <div style={{...styles.dataBox, gridColumn: '2 / 3', gridRow: '1 / 2'}}>
                        <h2 style={styles.dataBoxHeader}>My Information</h2>
                        <p style={styles.infoContent}>{placeholderStudentData.information}</p>
                    </div>

                    {/*  Skills Earned  */}
                    <div style={{...styles.dataBox, gridColumn: '2 / 3', gridRow: '2 / 3'}}>
                        <h2 style={styles.dataBoxHeader}>Skills Earned</h2>
                        <div style={styles.infoContent}>
                            {placeholderStudentData.skills.map((skill, index) => (
                                <span key={index} style={{
                                    display: 'inline-block',
                                    backgroundColor: themeColors.secondary,
                                    color: themeColors.text,
                                    padding: '5px 10px',
                                    borderRadius: '5px',
                                    marginRight: '8px',
                                    marginBottom: '8px',
                                    fontSize: '12px',
                                }}>
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
