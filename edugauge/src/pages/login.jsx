// Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import './login.css'; 
import api from '../APIservices/api'; 

const Login = () => {
  // State for login form data
  const [formData, setFormData] = useState({
    student_number: '', 
    password: '',
    email: '',        //Added for admin login
    userType: 'student' //Track if user is student or admin
  });
  
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); 

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Clear form
  const handleClear = () => { 
    setFormData({ 
      student_number: '', 
      password: '', 
      email: '',
      userType: 'student'
    });
    setMessage('');
  };

  // Handle login submission
  const handleSubmit = async (e) => { 
    e.preventDefault();
    
    try {
      if (formData.userType === 'student') {
        //This is where the student login happens
        const response = await api.post('/login', {
          student_number: formData.student_number,
          password: formData.password
        });
        
        // Save student data to localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('student', JSON.stringify(response.data.student));
        localStorage.setItem('userType', 'student'); 
        
        setMessage('Student login successful!');
        navigate('/profile'); //Redirect to student profile
        
      } else {
        //This is where the admin login happens
        const response = await api.post('/login/admin', {
          email: formData.email,
          password: formData.password
        });
        
        // Save admin data to localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('admin', JSON.stringify(response.data.admin));
        localStorage.setItem('userType', 'admin');
        
        setMessage('Admin login successful!');
        navigate('/admin');
      }
      
    } catch (error) {
      setMessage(error.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="container-styles">
      <h1 className="header-styles">Login</h1>
      <div className="main-content-styles">
        {/* Left Panel */}
        <div className="left-panel-styles">
          <div className="logo-container-styles">
            <img 
              src="/Eduguage-logo.jpg" 
              alt="EduGauge Logo" 
              className="logo-image-styles" 
            />
          </div>
          <div className="adverts-box-styles">
            Adverts for First Year
          </div>
        </div>
        
        {/* Right Panel */}
        <div className="right-panel-styles">
          <div className="welcome-box-styles">
            <h2 className="welcome-text-styles">Welcome Text</h2>
          </div>
          
          {/*Added user type selector */}
          <div className="user-type-selector" style={{ marginBottom: '15px' }}>
            <label style={{ marginRight: '10px' }}>
              <input
                type="radio"
                name="userType"
                value="student"
                checked={formData.userType === 'student'}
                onChange={(e) => setFormData({...formData, userType: e.target.value})}
              />
              Student
            </label>
            <label>
              <input
                type="radio"
                name="userType"
                value="admin"
                checked={formData.userType === 'admin'}
                onChange={(e) => setFormData({...formData, userType: e.target.value})}
              />
              Admin
            </label>
          </div>

          <form className="form-styles" onSubmit={handleSubmit}>
            {formData.userType === 'student' ? (
              <div className="input-group-styles">
                <label htmlFor="student_number" className="input-label-styles">Student Number:</label>
                <input
                  id="student_number"
                  name="student_number"
                  type="text"
                  value={formData.student_number}
                  onChange={handleChange}
                  className="input-field-styles"
                  required
                />
              </div>
            ) : (
              <div className="input-group-styles">
                <label htmlFor="email" className="input-label-styles">Admin Email:</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field-styles"
                  required
                />
              </div>
            )}
            
            <div className="input-group-styles">
              <label htmlFor="password" className="input-label-styles">Password:</label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="input-field-styles"
                required
              />
            </div>
            
            <div className="button-row-styles">
              <button type="submit" className="login-button-styles">Login</button>
              <button type="button" onClick={handleClear} className="clear-button-styles">Clear</button>
              <div className="link-styles">
                <p>Forgot Password</p>
                <p>New to EduGauge: <Link to="/pages/SignUpPage" className="signup-link-styles">Sign Up</Link></p>
              </div>
            </div>
          </form>
        </div>
      </div>
      <a href="#" className="bottom-link-styles"> Learn More</a>
    </div>
  );
};

export default Login;