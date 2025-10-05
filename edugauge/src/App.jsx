import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/login.jsx";
import Dashboard from "./pages/dashboard.jsx";
import SignUpPage from  "./pages/SignUpPage.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import EFundiTest from "./pages/eFundiTest.jsx";
import DigitalLiteracyTest from "./pages/DigitalLiteracyTest.jsx";
import GradeBook from "./pages/gradebook.jsx";
import AddLecture from "./pages/AddLecture.jsx";
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
      

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUpPage" element={<SignUpPage />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/eFundiTest" element={<EFundiTest />} />
        <Route path="/digitalLiteracyTest" element={<DigitalLiteracyTest />} />
        <Route path="/gradebook" element={<GradeBook />} />
        <Route path="/addLecture" element={<AddLecture />} />
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
