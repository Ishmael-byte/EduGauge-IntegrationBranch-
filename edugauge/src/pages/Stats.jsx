import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import "./Stats.css";

const Stats = ({ students = [] }) => {
  // Digital Literacy Test headings
  const headings = [
    "File & Folder Management",
    "Microsoft Word",
    "Microsoft PowerPoint",
    "Microsoft Excel",
    "Digital Collaboration & Cloud",
    "Academic Practices",
    "Word Referencing & Shortcuts"
  ];

  // Extract grades
  const digitalGrades = students.map(s => s.digitalGrade || 0);
  const efundiGrades = students.map(s => s.eFundiGrade || 0);

  // Overall averages
  const average = (grades) => grades.length ? (grades.reduce((a,b) => a+b,0)/grades.length).toFixed(2) : 0;
  const digitalAverage = average(digitalGrades);
  const efundiAverage = average(efundiGrades);

  // Pass/fail counts
  const passThreshold = 50;
  const passFailStats = (grades) => {
    const pass = grades.filter(g => g >= passThreshold).length;
    const fail = grades.length - pass;
    return { pass, fail };
  };
  const digitalPassFail = passFailStats(digitalGrades);
  const efundiPassFail = passFailStats(efundiGrades);

  // Grade distribution
  const gradeDistribution = (grades) => {
    const ranges = [0, 20, 40, 60, 80, 100];
    const counts = ranges.slice(0, -1).map(_ => 0);
    grades.forEach(g => {
      for (let i=0;i<ranges.length-1;i++){
        if (g >= ranges[i] && g < ranges[i+1]) { counts[i]++; break; }
      }
    });
    return counts.map((count,i)=>({
      range:`${ranges[i]}-${ranges[i+1]}%`,
      count,
      percent: grades.length ? ((count/grades.length)*100).toFixed(1) : 0
    }));
  };

  const digitalDistribution = gradeDistribution(digitalGrades);
  const efundiDistribution = gradeDistribution(efundiGrades);

  // Average per heading
  const headingAverages = headings.map(h => {
    const total = students.reduce((acc,s) => acc + (s.headings?.[h]||0),0);
    const avg = students.length ? (total/students.length).toFixed(2) : 0;
    return { heading: h, average: avg };
  });

  // Worst performing headings
  const worstHeadings = [...headingAverages].sort((a,b)=>a.average-b.average).slice(0,3);

  return (
    <div className="page-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo-section">
          <img src="/Eduguage-logo.jpg" alt="Edugauge Logo" className="logo" />
          <h1 className="logo-text">EDUGUAGE</h1>
          <h2 className="logo-subtext">System Enhancing LMS Readiness</h2>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li><a href="#">Overview</a></li>
            <li><a href="#">Digital Literacy Test</a></li>
            <li><a href="#">eFundi Readiness Test</a></li>
            <li><a href="#">Helpful Recourse</a></li>
            <li><a href="#">Gradebook</a></li>
            <li><a href="#">At-risk List</a></li>
            <li><a href="#" className="active">Stats</a></li>
            <li><a href="#">Add Lecturer</a></li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="main-content">
        <header className="main-header">
          <h1 className="header-title">Student Statistics</h1>
          <div className="profile-section">
            <span className="profile-icon">👤</span>
            <span>Profile</span>
          </div>
        </header>

        <div className="content-body">
          <div className="content-box">
            {/* Overall Averages */}
            <h2>Overall Averages</h2>
            <p>Digital Literacy Test: {digitalAverage}%</p>
            <p>eFundi Readiness Test: {efundiAverage}%</p>

            {/* Pass/Fail Summary */}
            <h2>Pass/Fail Summary</h2>
            <p>Digital Literacy Test: {digitalPassFail.pass} passed, {digitalPassFail.fail} failed</p>
            <p>eFundi Readiness Test: {efundiPassFail.pass} passed, {efundiPassFail.fail} failed</p>

            {/* Grade Distributions */}
            <h2>Grade Distribution - Digital Literacy Test</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={digitalDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="percent" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>

            <h2>Grade Distribution - eFundi Readiness Test</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={efundiDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="percent" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>

            {/* Average per Heading */}
            <h2>Average Score per Heading (Digital Literacy Test)</h2>
            <table className="stats-table">
              <thead>
                <tr>
                  <th>Heading</th>
                  <th>Average Score</th>
                </tr>
              </thead>
              <tbody>
                {headingAverages.map(h => (
                  <tr key={h.heading}>
                    <td>{h.heading}</td>
                    <td>{h.average}%</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Worst performing headings */}
            <h2>Worst Performing Headings</h2>
            <ul>
              {worstHeadings.map(h => (
                <li key={h.heading}>{h.heading}: {h.average}%</li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Stats;