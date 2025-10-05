import React, { useState } from "react";
import "./AtRiskList.css";

const AtRiskList = ({ students = [] }) => {
  const [filter, setFilter] = useState("");

  // Filter logic (search by name, number, email, or any grade)
  const filteredStudents = students.filter((student) => {
    const avg =
      student.digitalGrade && student.eFundiGrade
        ? ((student.digitalGrade + student.eFundiGrade) / 2).toFixed(2)
        : "";
    return [student.name, student.number, student.email, student.digitalGrade, student.eFundiGrade, avg]
      .join(" ")
      .toLowerCase()
      .includes(filter.toLowerCase());
  });

  return (
    <div className="page-container">
      {/* Sidebar */}
      

      {/* Main content */}
      <main className="main-content">
        <header className="main-header">
          <h1 className="header-title">At-risk Student List</h1>
          <div className="profile-section">
            <span className="profile-icon">👤</span>
            <span>Profile</span>
          </div>
        </header>

        <div className="content-body">
          <div className="content-box">
            <h2>Students Identified At-Risk</h2>

            {/* Filter/Search bar */}
            <input
              type="text"
              placeholder="Search by name, student number, email, or grade..."
              className="filter-input"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />

            <table className="student-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Student Number</th>
                  <th>Email</th>
                  <th>Digital Literacy Grade</th>
                  <th>eFundi Readiness Grade</th>
                  <th>Average Grade</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => {
                    const digital = student.digitalGrade || 0;
                    const efundi = student.eFundiGrade || 0;
                    const average = ((digital + efundi) / 2).toFixed(2);
                    return (
                      <tr key={student.id}>
                        <td>{student.name}</td>
                        <td>{student.number}</td>
                        <td>{student.email}</td>
                        <td>{digital}</td>
                        <td>{efundi}</td>
                        <td>{average}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="6" style={{ textAlign: "center", color: "#ccc" }}>
                      No students found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AtRiskList;