// src/pages/SignUpPage.jsx
import React, { useState } from 'react';
import './SignUpPage.css';
import api from '../APIservices/api'; // Import API service

const SignUpPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [message, setMessage] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Validation
    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }
    if (email !== confirmEmail) {
      setMessage("Emails do not match!");
      return;
    }
    if (!agreedToTerms) {
      setMessage("Please agree to the Terms and Conditions!");
      return;
    }
    if (!firstName || !lastName || !email || !password) {
      setMessage("All fields are required!");
      return;
    }

    try {
      // Call your backend API
      const response = await api.post('/register', {
        Fname: firstName,
        Lname: lastName,
        email: email,
        password: password
      });

      // Success! Show student number
      setMessage(`Registration successful! Your student number is: ${response.data.student_number}`);

      // Clear form
      setFirstName('');
      setLastName('');
      setEmail('');
      setConfirmEmail('');
      setPassword('');
      setConfirmPassword('');
      setAgreedToTerms(false);

    } catch (error) {
      console.error('Registration error:', error);
      setMessage(error.response?.data?.error || 'Registration failed. Please try again.');
    }
  };

  const handleClear = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setConfirmEmail('');
    setPassword('');
    setConfirmPassword('');
    setAgreedToTerms(false);
    setMessage('');
  };

  return (
    <div className="container-styles">
      <h1 className="header-styles">Sign up</h1>
      <div className="main-content-styles">
        <div className="left-panel-styles">
          <div className="logo-container-styles">
            <img
              src="/Eduguage-logo.jpg"
              alt="EduGauge Logo"
              className="logo-image-styles"
            />
          </div>
          <div className="terms-box-styles">
            <div>Terms and conditions</div>
            <div className="checkbox-container-styles">
              <input
                type="checkbox"
                id="agreeTerms"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="checkbox-input"
              />
              <label htmlFor="agreeTerms">I have read the T&C</label>
            </div>
          </div>
        </div>
        <div className="right-panel-styles">
          <form className="form-styles" onSubmit={handleSignUp}>
            <div className="input-group-styles">
              <label htmlFor="firstName" className="input-label-styles">First Name:</label>
              <input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="input-field-styles"
                required
              />
            </div>
            <div className="input-group-styles">
              <label htmlFor="lastName" className="input-label-styles">Last Name:</label>
              <input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="input-field-styles"
                required
              />
            </div>
            <div className="input-group-styles">
              <label htmlFor="email" className="input-label-styles">Email:</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field-styles"
                required
              />
            </div>
            <div className="input-group-styles">
              <label htmlFor="confirmEmail" className="input-label-styles">Confirm Email:</label>
              <input
                id="confirmEmail"
                type="email"
                value={confirmEmail}
                onChange={(e) => setConfirmEmail(e.target.value)}
                className="input-field-styles"
                required
              />
            </div>
            <div className="input-group-styles">
              <label htmlFor="password" className="input-label-styles">Password:</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field-styles"
                required
              />
            </div>
            <div className="input-group-styles">
              <label htmlFor="confirmPassword" className="input-label-styles">Confirm Password:</label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input-field-styles"
                required
              />
            </div>
            <div className="button-row-styles">
              <button type="submit" className="sign-up-button-styles">Sign up</button>
              <button type="button" onClick={handleClear} className="clear-button-styles">Clear</button>
            </div>
            {/* Show success/error messages */}
            {message && (
              <div className="message-styles" style={{ 
                color: message.includes('successful') ? 'green' : 'red',
                marginTop: '10px',
                textAlign: 'center'
              }}>
                {message}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;