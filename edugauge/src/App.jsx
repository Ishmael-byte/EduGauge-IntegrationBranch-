import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/login.jsx";
import Dashboard from "./pages/dashboard.jsx";
import SignUpPage from  "./pages/SignUpPage.jsx";
import EFundiTest from "./pages/eFundiTest.jsx";
import DigitalLiteracyTest from "./pages/DigitalLiteracyTest.jsx";
import GradeBook from "./pages/gradebook.jsx";
import Admin from "./pages/Admin.jsx";
import AddLecture from "./pages/AddLecture.jsx";
import Lecturer from "./pages/Lecturer.jsx";
import Profile from "./pages/profile.jsx";
import Resources from "./pages/Resources.jsx";
import AtRiskList from "./pages/AtRiskList.jsx";
import Stats from "./pages/Stats.jsx";
import Layout from "./pages/Layout.jsx";
import "./App.css";
import React from "react";

function App() { 
  return (
    <>
      <nav style={{ padding: "10px", background: "#333" }}>
        <Link to="/" style={{ margin: "0 10px", color: "#fff" }}>Login</Link>
        {/*<Link to="/login" style={{ margin: "0 10px", color: "#fff" }}>Login</Link>*/}
        <Link to="/dashboard" style={{ margin: "0 10px", color: "#fff" }}>Dashboard</Link>
        {/*<Link to="/pages/SignUpPage" style={{ margin: "0 10px", color: "#fff" }}>Sign Up</Link>*/}
        <Link to="/EfundiTest" style={{ margin: "0 10px", color: "#fff" }}>eFundi Test</Link>
        <Link to="/DigitalLiteracyTest" style={{ margin: "0 10px", color: "#fff" }}>Digital Literacy Test</Link>
        <Link to="/gradeBook" style={{ margin: "0 10px", color: "#fff" }}>Grade Book</Link>
        <Link to="/Admin" style={{ margin: "0 10px", color: "#fff" }}>Admin</Link>
        <Link to="/AddLecture" style={{ margin: "0 10px", color: "#fff" }}>Add Lecture</Link>
        <Link to="/Lecturer" style={{ margin: "0 10px", color: "#fff" }}>Lecturer</Link>
        <Link to="/profile" style={{ margin: "0 10px", color: "#fff" }}>Profile</Link>
        <Link to="/Resources" style={{ margin: "0 10px", color: "#fff" }}>Resources</Link>
        <Link to="/AtRiskList" style={{ margin: "0 10px", color: "#fff" }}>At-Risk List</Link>
        <Link to="/Stats" style={{ margin: "0 10px", color: "#fff" }}>Stats</Link>
        <Link to="/Layout" state={{ margin: "0 10px", color: "#fff"}}>Layout</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signUpPage" element={<SignUpPage />} />
        <Route path="/eFundiTest" element={<EFundiTest />} />
        <Route path="/digitalLiteracyTest" element={<DigitalLiteracyTest />} />
        <Route path="/gradebook" element={<GradeBook />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/addLecture" element={<AddLecture />} />
        <Route path="/lecturer" element={<Lecturer />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/Resources" element={<Resources />} />
        <Route path="/AtRiskList" element={<AtRiskList />} />
        <Route path="/Stats" element={<Stats />} />
        <Route path="/Layout" element={<Layout/>} />
        </Route>

      </Routes>
    </>
  );
}

export default App;
