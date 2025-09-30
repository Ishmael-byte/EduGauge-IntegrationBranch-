import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/login.jsx";
import Dashboard from "./pages/dashboard.jsx";
import SignUpPage from  "./pages/SignUpPage.jsx";
import EFundiTest from "./pages/eFundiTest.jsx";
import DigitalLiteracyTest from "./pages/DigitalLiteracyTest.jsx";
import GradeBook from "./pages/Gradebook";
import Admin from "./pages/Admin.jsx";
import AddLecture from "./pages/AddLecture.jsx";
import Lecturer from "./pages/Lecturer.jsx";
import Profile from "./pages/profile.jsx";
import Resources from "./pages/Resources.jsx";
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
        <Link to="/DigitalLiteracyTest" style={{ margin: "0 10px", color: "#fff" }}>Digital Literacy Test</Link>
        <Link to="/GradeBook" style={{ margin: "0 10px", color: "#fff" }}>Grade Book</Link>
        <Link to="/Admin" style={{ margin: "0 10px", color: "#fff" }}>Admin</Link>
        <Link to="/AddLecture" style={{ margin: "0 10px", color: "#fff" }}>Add Lecture</Link>
        <Link to="/Lecturer" style={{ margin: "0 10px", color: "#fff" }}>Lecturer</Link>
        <Link to="/Profile" style={{ margin: "0 10px", color: "#fff" }}>Profile</Link>
        <Link to="/Resources" style={{ margin: "0 10px", color: "#fff" }}>Resources</Link>
      </nav>

      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pages/SignUpPage" element={<SignUpPage />} />
        <Route path="/EFundiTest" element={<EFundiTest />} />
        <Route path="/DigitalLiteracyTest" element={<DigitalLiteracyTest />} />
        <Route path="/GradeBook" element={<GradeBook />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/AddLecture" element={<AddLecture />} />
        <Route path="/Lecturer" element={<Lecturer />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/Resources" element={<Resources />} />
      </Routes>
    </>
  );
}

export default App;
