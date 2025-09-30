import React, { useState } from 'react';
import './SignUpPage.css'; // Import the CSS file

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
        <div className="container-styles">
            <h1 className="header-styles">Sign up</h1>
            <div className="main-content-styles">
                <div className="left-panel-styles">
                    <div className="logo-container-styles">
                        <img
                            src="\Eduguage-logo.jpg"
                            alt="EduGauge Logo"
                            className="logo-image-styles"
                        />
                    </div>
                    <div className="terms-box-styles">
                        <div>Tearms and condittions</div>
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
                            <label htmlFor="studentNumber" className="input-label-styles">Student number:</label>
                            <input
                                id="studentNumber"
                                type="text"
                                value={studentNumber}
                                onChange={(e) => setStudentNumber(e.target.value)}
                                className="input-field-styles"
                            />
                        </div>
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
                        <div className="input-group-styles">
                            <label htmlFor="confirmPassword" className="input-label-styles">Confirm Password :</label>
                            <input
                                id="confirmPassword"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="input-field-styles"
                            />
                        </div>
                        <div className="input-group-styles">
                            <label htmlFor="email" className="input-label-styles">Email :</label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="input-field-styles"
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
                            />
                        </div>
                        <div className="button-row-styles">
                            <button type="submit" className="sign-up-button-styles">Sign up</button>
                            <button type="button" onClick={handleClear} className="clear-button-styles">clear</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;