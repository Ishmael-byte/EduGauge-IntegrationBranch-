import React from 'react';
import { NavLink } from "react-router-dom";

function EFundiTest() {
  const pageContainerStyle = {
    display: 'flex',
    height: '100vh',
    fontFamily: 'Roboto, Arial, sans-serif',
    color: '#E0E0E0',
    backgroundColor: '#2c2c2c',
  };

  const sidebarStyle = {
    width: '250px',
    backgroundColor: '#202020',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
  };

  const logoSectionStyle = {
    textAlign: 'center',
    marginBottom: '30px',
  };

  const logoStyle = {
    maxWidth: '100px',
    height: 'auto',
  };

  const logoTextStyle = {
    color: '#fff',
    margin: '5px 0',
    fontSize: '1.2rem',
  };

  const logoSubTextStyle = {
    color: '#fff',
    margin: '5px 0',
    fontSize: '0.8rem',
  };

  const sidebarNavStyle = {
    listStyle: 'none',
    padding: '0',
  };

  const navLinkStyle = {
    display: 'block',
    padding: '15px 20px',
    marginBottom: '5px',
    backgroundColor: '#383838',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '5px',
    transition: 'background-color 0.3s',
  };

  const mainContentStyle = {
    flexGrow: '1',
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
  };

  const mainHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 30px',
    backgroundColor: '#333',
    borderRadius: '8px',
    marginBottom: '20px',
  };

  const headerTitleStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  };

  const profileSectionStyle = {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#555',
    padding: '5px 15px',
    borderRadius: '20px',
  };

  const profileIconStyle = {
    fontSize: '1.5rem',
    marginRight: '10px',
  };

  const contentBodyStyle = {
    flexGrow: '1',
    backgroundColor: '#383838',
    borderRadius: '8px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  };

  const contentBoxStyle = {
    backgroundColor: '#2c2c2c',
    padding: '20px',
    borderRadius: '8px',
  };
  
  const calendarImageStyle = {
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
    marginTop: '20px',
  };
  
  const buttonSectionStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
    padding: '0 20px',
  };

  const buttonStyle = {
    padding: '10px 30px',
    fontSize: '1rem',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    color: '#fff',
  };

  const saveButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#555',
  };

  const submitButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#7a42b1',
  };

  const exitButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#555',
  };

  return (
    <div style={pageContainerStyle}>
      {/* Sidebar */}
      <aside style={sidebarStyle}>
        <div style={logoSectionStyle}>
          <img src="/Eduguage-logo.jpg" alt="Edugauge Logo" style={logoStyle} />
          <h1 style={logoTextStyle}>EDUGUAGE</h1>
          <h2 style={logoSubTextStyle}>System Enhancing LMS Readiness</h2>
        </div>
      
        <nav className="gb-nav">
          <NavLink 
                                         to="/digitalLiteracyTest" 
                                            className={({ isActive }) => isActive ? "active-link" : ""}
                                            >
                                            Digital Literacy Test
                                            </NavLink>
                    
                                            <NavLink 
                                            to="/dashboard" 
                                            className={({ isActive }) => isActive ? "active-link" : ""}
                                            >
                                            Dashboard
                                            </NavLink>
                    
                                            <NavLink 
                                            to="/resources" 
                                            className={({ isActive }) => isActive ? "active-link" : ""}
                                            >
                                            Helpful Resource
                                            </NavLink>
                    
                                            <NavLink 
                                            to="/gradebook" 
                                            className={({ isActive }) => isActive ? "active-link" : ""}
                                            >
                                            Grade Book
                                            </NavLink>
                    
                                            
                    
                                          
                                            <NavLink 
                                            to="/addLecturer" 
                                           className={({ isActive }) => isActive ? "active-link" : ""}
                                            >
                                            Dashboard
                                            </NavLink>
                              
                               
        </nav>
      </aside>

      {/* Main Content Area */}
      <main style={mainContentStyle}>
        <header style={mainHeaderStyle}>
          <h1 style={headerTitleStyle}>eFundi Readiness Test</h1>
          <div style={profileSectionStyle}>
            <span style={profileIconStyle}>👤</span>
            <span>Profile</span>
          </div>
        </header>

        <section style={contentBodyStyle}>
          <div style={{ flexGrow: 1 }}>
            <div style={contentBoxStyle}>
              <h2>Question 1</h2>
              <p>Select the area to which one can access files, videos and etc provided by lecturers</p>
            </div>
            {/* The image in the wireframe appears to be a calendar. */}
            <img src="/efundi-calendar.png" alt="eFundi Calendar" style={calendarImageStyle} />
          </div>

          <div style={buttonSectionStyle}>
            <button style={saveButtonStyle}>Save</button>
            <button style={submitButtonStyle}>Submit</button>
            <button style={exitButtonStyle}>Exit</button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default EFundiTest;