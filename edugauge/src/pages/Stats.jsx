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

  // Helper functions
  const average = (grades) =>
    grades.length ? (grades.reduce((a, b) => a + b, 0) / grades.length).toFixed(2) : 0;

  const median = (grades) => {
    if (!grades.length) return 0;
    const sorted = [...grades].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 !== 0
      ? sorted[mid]
      : ((sorted[mid - 1] + sorted[mid]) / 2).toFixed(2);
  };

  const stdDev = (grades) => {
    if (!grades.length) return 0;
    const mean = grades.reduce((a, b) => a + b, 0) / grades.length;
    const variance = grades.reduce((acc, g) => acc + (g - mean) ** 2, 0) / grades.length;
    return Math.sqrt(variance).toFixed(2);
  };

  const passThreshold = 50;
  const passRate = (grades) =>
    grades.length
      ? ((grades.filter((g) => g >= passThreshold).length / grades.length) * 100).toFixed(1)
      : 0;

  const gradeDistribution = (grades) => {
    const ranges = [0, 20, 40, 60, 80, 100];
    const counts = ranges.slice(0, -1).map(() => 0);
    grades.forEach((g) => {
      for (let i = 0; i < ranges.length - 1; i++) {
        if (g >= ranges[i] && g < ranges[i + 1]) {
          counts[i]++;
          break;
        }
      }
    });
    return counts.map((count, i) => ({
      range: `${ranges[i]}-${ranges[i + 1]}%`,
      count,
      percent: grades.length ? ((count / grades.length) * 100).toFixed(1) : 0,
    }));
  };

  const correlation = (x, y) => {
    const n = x.length;
    if (n === 0) return 0;
    const meanX = x.reduce((a, b) => a + b, 0) / n;
    const meanY = y.reduce((a, b) => a + b, 0) / n;
    const numerator = x.map((xi, i) => (xi - meanX) * (y[i] - meanY)).reduce((a, b) => a + b, 0);
    const denominator = Math.sqrt(
      x.map((xi) => (xi - meanX) ** 2).reduce((a, b) => a + b, 0) *
      y.map((yi) => (yi - meanY) ** 2).reduce((a, b) => a + b, 0)
    );
    return denominator ? (numerator / denominator).toFixed(2) : 0;
  };

  // Calculations
  const digitalAverage = average(digitalGrades);
  const efundiAverage = average(efundiGrades);

  const digitalMedian = median(digitalGrades);
  const efundiMedian = median(efundiGrades);

  const digitalStdDev = stdDev(digitalGrades);
  const efundiStdDev = stdDev(efundiGrades);

  const digitalPassRate = passRate(digitalGrades);
  const efundiPassRate = passRate(efundiGrades);

  const digitalDistribution = gradeDistribution(digitalGrades);
  const efundiDistribution = gradeDistribution(efundiGrades);

  const headingAverages = headings.map((h) => {
    const total = students.reduce((acc, s) => acc + (s.headings?.[h] || 0), 0);
    const avg = students.length ? (total / students.length).toFixed(2) : 0;
    return { heading: h, average: avg };
  });

  const worstHeadings = [...headingAverages].sort((a, b) => a.average - b.average).slice(0, 3);
  const bestHeadings = [...headingAverages].sort((a, b) => b.average - a.average).slice(0, 3);

  const digitalEfundiCorrelation = correlation(digitalGrades, efundiGrades);

  return (
    <div className="page-container">
      {/* Sidebar */}


      {/* Main content */}
      <main className="main-content">
        <header className="main-header">
          <h1 className="header-title">Student Statistics</h1>
          <div className="profile-section">
            <span className="profile-icon">👤</span>
            <span>Profile</span>
          </div>
        </header>

        {/* KPI Summary Row */}
        <div className="kpi-row">
          <div className="kpi-card">📊 Digital Avg: {digitalAverage}%</div>
          <div className="kpi-card">📊 eFundi Avg: {efundiAverage}%</div>
          <div className="kpi-card">✅ Digital Pass Rate: {digitalPassRate}%</div>
          <div className="kpi-card">✅ eFundi Pass Rate: {efundiPassRate}%</div>
        </div>

        {/* Dashboard Grid */}
        <div className="content-body">

          {/* Grade Distributions */}
          <div className="stat-card">
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
          </div>

          <div className="stat-card">
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
          </div>

          {/* Average per Heading */}
          <div className="stat-card wide">
            <h2>Average Score per Heading (Digital Literacy Test)</h2>
            <table className="stats-table">
              <thead>
                <tr>
                  <th>Heading</th>
                  <th>Average Score</th>
                </tr>
              </thead>
              <tbody>
                {headingAverages.map((h) => (
                  <tr key={h.heading}>
                    <td>{h.heading}</td>
                    <td>{h.average}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Worst Performing Headings */}
          <div className="stat-card">
            <h2>Worst Performing Headings</h2>
            <ul>
              {worstHeadings.map((h) => (
                <li key={h.heading}>{h.heading}: {h.average}%</li>
              ))}
            </ul>
          </div>

          {/* Best Performing Headings */}
          <div className="stat-card">
            <h2>Best Performing Headings</h2>
            <ul>
              {bestHeadings.map((h) => (
                <li key={h.heading}>{h.heading}: {h.average}%</li>
              ))}
            </ul>
          </div>

          {/* Correlation */}
          <div className="stat-card">
            <h2>Correlation</h2>
            <p>
              Correlation between Digital Literacy & eFundi Readiness:{" "}
              <strong>{digitalEfundiCorrelation}</strong>
            </p>
            <small>
              (Closer to 1 = strong positive, closer to -1 = strong negative, 0 = none)
            </small>
          </div>

          {/* Median & Std Dev */}
          <div className="stat-card">
            <h2>Median & Spread</h2>
            <p>Digital Literacy Median: {digitalMedian}% | Std Dev: {digitalStdDev}</p>
            <p>eFundi Median: {efundiMedian}% | Std Dev: {efundiStdDev}</p>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Stats;