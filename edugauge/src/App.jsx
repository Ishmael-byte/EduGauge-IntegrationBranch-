import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/login.jsx";
import Dashboard from "./pages/dashboard.jsx";
import SignUpPage from  "./pages/SignUpPage.jsx";
import EFundiTest from "./pages/eFundiTest.jsx";
import "./App.css";
import React from "react";

function App() {
  return (
    <>
      <nav style={{ padding: "10px", background: "#333" }}>
        <Link to="/" style={{ margin: "0 10px", color: "#fff" }}>Home</Link>
        <Link to="/login" style={{ margin: "0 10px", color: "#fff" }}>Login</Link>
        <Link to="/dashboard" style={{ margin: "0 10px", color: "#fff" }}>Dashboard</Link>
        {/*<Link to="/pages/SignUpPage" style={{ margin: "0 10px", color: "#fff" }}>Sign Up</Link>*/}
        <Link to="/EFundiTest" style={{ margin: "0 10px", color: "#fff" }}>eFundi Test</Link>
      </nav>

      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pages/SignUpPage" element={<SignUpPage />} />
        <Route path="/EFundiTest" element={<EFundiTest />} />
      </Routes>
    </>
  );
}

export default App;
