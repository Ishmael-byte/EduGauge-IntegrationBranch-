import React, {useState} from 'react';
import { Link } from 'react-router-dom';

//useState is used to add state to functional components to basically 
//track information that can change over time. 
const containerStyles = {
  backgroundColor: '#2e2e2e',
  color: 'white',
  fontFamily: 'Arial, sans-serif',
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minHeight: '100vh',
};

const headerStyles = {
  width: '100%',
  maxWidth: '900px',
  marginBottom: '20px',
  fontSize: '24px',
};

const mainContentStyles = {
  backgroundColor: '#555',
  width: '100%',
  maxWidth: '900px',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  padding: '20px',
  boxSizing: 'border-box',
};

const leftPanelStyles = {
  width: '45%',
  minWidth: '300px',
  marginRight: '20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
};

const logoContainerStyles = {
  backgroundColor: 'grey',
  padding: '10px',
  marginBottom: '20px',
  width: '30%',
  height: 'auto',
  boxSizing: 'border-box',
  border: '2px solid #606568ff',
};

const logoImageStyles = {
  width: '100%',
  height: 'auto',
  display: 'block',
};

const advertsBoxStyles = {
  backgroundColor: '#ccc',
  color: '#555',
  padding: '20px',
  width: '100%',
  height: '200px',
  boxSizing: 'border-box',
};

const rightPanelStyles = {
  width: '45%',
  minWidth: '300px',
  marginLeft: '20px',
};

const welcomeBoxStyles = {
  backgroundColor: '#6a369e',
  color: 'white',
  padding: '30px',
  marginBottom: '20px',
  textAlign: 'center',
};

const welcomeTextStyles = {
  fontSize: '28px',
  fontWeight: 'bold',
  margin: 0,
};

const formStyles = {
  backgroundColor: 'white',
  padding: '20px',
  color: '#555',
};

const inputGroupStyles = {
  marginBottom: '15px',
};

const inputLabelStyles = {
  display: 'block',
  marginBottom: '5px',
};

const inputFieldStyles = {
  width: 'calc(100% - 10px)',
  padding: '8px 5px',
  border: '1px solid #ccc',
  borderRadius: '4px',
};

const buttonRowStyles = {
  display: 'flex',
  alignItems: 'center',
  marginTop: '20px',
};

const loginButtonStyles = {
  backgroundColor: '#6a369e',
  color: 'white',
  border: 'none',
  padding: '10px 20px',
  cursor: 'pointer',
  borderRadius: '5px',
  marginRight: '10px',
};

const clearButtonStyles = {
  backgroundColor: 'transparent',
  color: '#555',
  border: 'none',
  cursor: 'pointer',
  textDecoration: 'underline',
};

const linkStyles = {
  fontSize: '12px',
  color: '#555',
  textDecoration: 'none',
  marginLeft: 'auto',
  textAlign: 'right',
};

const bottomLinkStyles = {
  backgroundColor: '#6a369e',
  color: 'white',
  width: '100%',
  maxWidth: '900px',
  textAlign: 'center',
  padding: '15px',
  marginTop: '20px',
  textDecoration: 'none',
};

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Logging in with:', { username, password });
    // dont forget to add my login logic here
  };

  const handleClear = () => {
    setUsername('');
    setPassword('');
  };

  return (
    <div style={containerStyles}>
      <h1 style={headerStyles}>Login</h1>
      <div style={mainContentStyles}>
        <div style={leftPanelStyles}>
          <div style={logoContainerStyles}>
            <img 
              src="/Eduguage-logo.jpg" 
              alt="EduGauge Logo" 
              style={logoImageStyles} 
            />
          </div>
          <div style={advertsBoxStyles}>
            Adverts for First Year
          </div>
        </div>
        <div style={rightPanelStyles}>
          <div style={welcomeBoxStyles}>
            <h2 style={welcomeTextStyles}>Welcome Text</h2>
          </div>
          <form style={formStyles} onSubmit={handleLogin}>
            <div style={inputGroupStyles}>
              <label htmlFor="username" style={inputLabelStyles}>Username :</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={inputFieldStyles}
              />
            </div>
            <div style={inputGroupStyles}>
              <label htmlFor="password" style={inputLabelStyles}>Password :</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={inputFieldStyles}
              />
            </div>
            <div style={buttonRowStyles}>
              <button type="submit" style={loginButtonStyles}>Login</button>
              <button type="button" onClick={handleClear} style={clearButtonStyles}>clear</button>
              <div style={linkStyles}>
                <p>Forgot Password</p>
                <p>New to EduGauge : <Link to="/SignUp" style={{ color: '#555' }}>Sign Up</Link></p>
              </div>
            </div>
          </form>
        </div>
      </div>
      <a href="#" style={bottomLinkStyles}>&gt; Learn More</a>
    </div>
  );
};

export default LoginPage;