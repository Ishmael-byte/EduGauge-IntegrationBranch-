import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './login.css'; // Import the CSS file

const LoginPage = () => {
    //DOUBLE CHECK!! login using your backend logic (email and password)
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

const handleLogin = async (e) => {
  e.preventDefault();
  const email = username;

  try {
    const res = await fetch('http://localhost:5000/login/lecturer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const contentType = res.headers.get('content-type');
    let data;

    if (contentType && contentType.includes('application/json')) {
      data = await res.json();
    } else {
      const text = await res.text();
      console.warn('Unexpected response format:', text);
      throw new Error('Unexpected response format');
    }

    console.log('Response status:', res.status);
    console.log('Response data:', data);

    if (res.ok) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('lecturer_id', data.lecturer.lecturer_id);
      window.location.href = '/lecturer';
      
    } else {
      alert(data.error || 'Login failed');
    }
  } catch (err) {
    console.error('Login error:', err);
    alert(`Something went wrong: ${err.message}`);
  }
};



    const handleClear = () => {
        setUsername('');
        setPassword('');
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
                    <form className="form-styles" onSubmit={handleLogin}>
                        <div className="input-group-styles">
                            <label htmlFor="username" className="input-label-styles">Username :</label>
                            <input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="input-field-styles"
                            />
                        </div>
                        <div className="input-group-styles">
                            <label htmlFor="password" className="input-label-styles">Password :</label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
export default LoginPage;