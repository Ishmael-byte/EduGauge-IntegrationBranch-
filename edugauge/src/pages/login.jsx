import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import './login.css'; 
import api from '../APIservices/api'; 

const Login = () => {
  const [formData, setFormData] = useState({
    student_number: '', 
    password: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleClear = () => { 
    setFormData({ student_number: '', password: '' });
    setMessage('');
  };

  const handleSubmit = async (e) => { 
    e.preventDefault();
    try {
      const response = await api.post('/login', formData);
      
      // Save token and student info
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('student', JSON.stringify(response.data.student));
      
      setMessage('Login successful!');
      navigate('/profile'); // Redirect to profile
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
                    <form className="form-styles" onSubmit={handleSubmit}>
                        <div className="input-group-styles">
                            <label htmlFor="username" className="input-label-styles">Username :</label>
                            <input
                                id="student_number"
                                name="student_number"
                                type="text"
                                value={formData.student_number}
                                onChange={handleChange}
                                className="input-field-styles"
                            />
                        </div>
                        <div className="input-group-styles">
                            <label htmlFor="password" className="input-label-styles">Password :</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="input-field-styles"
                            />
                        </div>
                        <div className="button-row-styles">
                            <button type="submit" className="login-button-styles">Login</button>
                            <button type="button" onClick={handleClear} className="clear-button-styles">clear</button>
                            <div className="link-styles">
                                <p>Forgot Password</p>
                                <p>New to EduGauge : <Link to="/pages/SignUpPage" className="signup-link-styles">Sign Up</Link></p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <a href="#" className="bottom-link-styles">&gt; Learn More</a>
        </div>
    );
};

export default Login;