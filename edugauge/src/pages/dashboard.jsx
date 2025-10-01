import React from 'react';
import { NavLink } from "react-router-dom";
function Dashboard() {
  const pageContainerStyle = {
    display: 'flex',
    minHeight: '100vh',
    width: '100vw',
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
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: '10px 0',
    marginBottom: '20px',
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
    justifyContent: 'center',
    alignItems: 'center',
  };
  
  
  const contentBoxStyle = {
    backgroundColor: '#333',
    padding: '40px',
    borderRadius: '8px',
    width: '50%',
    minHeight: '150px',
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '1.5rem',
  };

  return (
    <div style={pageContainerStyle}>
      {/* Sidebar */}
      <aside style={sidebarStyle}>
        <div style={logoSectionStyle}>
          <img src="/Eduguage-logo.jpg" alt="Edugauge Logo" style={{ maxWidth: '100px', height: 'auto' }} />
          <h1 style={logoTextStyle}>EDUGUAGE</h1>
          <h2 style={logoSubTextStyle}>System Enhancing LMS Readiness</h2>
        </div>
        <nav className="gb-nav">

          
                       <NavLink 
                        to="/digital-literacy" 
                        className={({ isActive }) => isActive ? "active-link" : ""}
                        >
                        Digital Literacy Test
                        </NavLink>

                        <NavLink 
                        to="/efundi-readiness" 
                        className={({ isActive }) => isActive ? "active-link" : ""}
                        >
                        eFundi Readiness Test
                        </NavLink>

                        <NavLink 
                        to="/helpful-resource" 
                        className={({ isActive }) => isActive ? "active-link" : ""}
                        >
                        Helpful Resource
                        </NavLink>

                        <NavLink 
                        to="/grade-book" 
                        className={({ isActive }) => isActive ? "active-link" : ""}
                        >
                        Grade Book
                        </NavLink>

                        <NavLink 
                        to="/at-risk-list" 
                        className={({ isActive }) => isActive ? "active-link" : ""}
                        >
                        At-risk List
                        </NavLink>

                        <NavLink 
                        to="/stats" 
                        className={({ isActive }) => isActive ? "active-link" : ""}
                        >
                        Stats
                        </NavLink>

                        <NavLink 
                        to="/add-lecturer" 
                        className={({ isActive }) => isActive ? "active-link" : ""}
                        >
                        Add Lecture
                        </NavLink>

                        

        </nav>
      </aside>

      {/* Main Content Area */}
      <main style={mainContentStyle}>
        <header style={mainHeaderStyle}>
          <div style={profileSectionStyle}>
            <span style={profileIconStyle}>👤</span>
            <span>Profile</span>
          </div>
        </header>

        <section style={contentBodyStyle}>
          <div style={contentBoxStyle}>
            Welcome Text
          </div>
          <div style={contentBoxStyle}>
            Tasks
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;