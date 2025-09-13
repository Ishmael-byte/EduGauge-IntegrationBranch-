import React, {useState} from 'react';

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
  gap: '40px', // Gap between the two main sections
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

const termsBoxStyles = {
  backgroundColor: '#ccc',
  color: '#555',
  padding: '20px',
  width: '100%',
  height: '250px', 
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
};

const checkboxContainerStyles = {
  display: 'flex',
  alignItems: 'center',
  marginTop: '10px',
  fontSize: '14px',
};

const rightPanelStyles = {
  flex: '1',
  minWidth: '300px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  backgroundColor: '#555', // Consistent with main content background
  padding: '20px 0', // Padding for content inside
};

const formStyles = {
  color: 'white',
};

const inputGroupStyles = {
  marginBottom: '15px',
  display: 'flex',
  alignItems: 'center',
};

const inputLabelStyles = {
  display: 'block',
  width: '150px', // Align labels
  marginRight: '10px',
  textAlign: 'right',
};

const inputFieldStyles = {
  flex: '1', // Take remaining space
  padding: '8px 5px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  backgroundColor: 'white',
  color: '#333',
};

const buttonRowStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end', // Align buttons to the right
  marginTop: '30px',
  paddingRight: '10px', // Small padding to match form alignment
};

const signUpButtonStyles = {
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
  color: 'white',
  border: 'none',
  cursor: 'pointer',
  textDecoration: 'underline',
};

const SignUpPage = () => {
  const [studentNumber, setStudentNumber] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleSignUp = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    if (email !== confirmEmail) {
      alert("Emails do not match!");
      return;
    }
    if (!agreedToTerms) {
      alert("Please agree to the Terms and Conditions!");
      return;
    }
    console.log('Signing up with:', {
      studentNumber,
      username,
      password,
      email,
      agreedToTerms,
    });
    // Add your sign-up logic here
  };

  const handleClear = () => {
    setStudentNumber('');
    setUsername('');
    setPassword('');
    setConfirmPassword('');
    setEmail('');
    setConfirmEmail('');
    setAgreedToTerms(false);
  };

  return (
    <div style={containerStyles}>
      <h1 style={headerStyles}>Sign up</h1>
      <div style={mainContentStyles}>
        <div style={leftPanelStyles}>
          <div style={logoContainerStyles}>
            <img
              src="\Eduguage-logo.jpg"
              alt="EduGauge Logo"
              style={logoImageStyles}
            />
          </div>
          <div style={termsBoxStyles}>
            <div>Tearms and condittions</div>
            <div style={checkboxContainerStyles}>
              <input
                type="checkbox"
                id="agreeTerms"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                style={{ marginRight: '5px' }}
              />
              <label htmlFor="agreeTerms">I have read the T&C</label>
            </div>
          </div>
        </div>
        <div style={rightPanelStyles}>
          <form style={formStyles} onSubmit={handleSignUp}>
            <div style={inputGroupStyles}>
              <label htmlFor="studentNumber" style={inputLabelStyles}>Student number:</label>
              <input
                id="studentNumber"
                type="text"
                value={studentNumber}
                onChange={(e) => setStudentNumber(e.target.value)}
                style={inputFieldStyles}
              />
            </div>
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
            <div style={inputGroupStyles}>
              <label htmlFor="confirmPassword" style={inputLabelStyles}>Confirm Password :</label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={inputFieldStyles}
              />
            </div>
            <div style={inputGroupStyles}>
              <label htmlFor="email" style={inputLabelStyles}>Email :</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={inputFieldStyles}
              />
            </div>
            <div style={inputGroupStyles}>
              <label htmlFor="confirmEmail" style={inputLabelStyles}>Confirm Email:</label>
              <input
                id="confirmEmail"
                type="email"
                value={confirmEmail}
                onChange={(e) => setConfirmEmail(e.target.value)}
                style={inputFieldStyles}
              />
            </div>
            <div style={buttonRowStyles}>
              <button type="submit" style={signUpButtonStyles}>Sign up</button>
              <button type="button" onClick={handleClear} style={clearButtonStyles}>clear</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;