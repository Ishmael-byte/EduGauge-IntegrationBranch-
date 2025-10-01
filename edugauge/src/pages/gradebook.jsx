import React from "react";
import "./gradebook.css";

const GradeBook = () => {
  return (
    <div className="gb-page">
      <aside className="gb-sidebar">
        {/* image must be in public/edugauge.png */}
        <img src="/Eduguage-logo.jpg" alt="EduGauge Logo" className="gb-logo" />

        <nav className="gb-nav">
          <button className="gb-nav-item">Overview</button>
          <button className="gb-nav-item">Helpful recourse</button>
          <button className="gb-nav-item">Digital Literacy Test</button>
          <button className="gb-nav-item">eFundi Readiness Test</button>
          <button className="gb-nav-item">Helpful Recourse</button>
          <button className="gb-nav-item">At-risk List</button>
          <button className="gb-nav-item">Stats</button>
          <button className="gb-nav-item">Add Lecturer</button>
          <div className="gb-spacer" />
        </nav>
      </aside>

      <main className="gb-main">
        <header className="gb-header">
          <h2 className="gb-small-title">Gradebook</h2>
          <div className="gb-profile">
            <span style={{ fontSize: "28px", color: "#7b2cbf" }}>👤</span>
            <span>Profile</span>
          </div>
        </header>

        <section className="gb-content">
          <div className="gb-test-title">Test Results</div>

          <table className="gb-table">
            <thead>
              <tr>
                <th>Test Item</th>
                <th>Marks</th>
                
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className="left">Digital Literacy Test</td>
                <td></td>
                <td>
                  {/*<button className="gb-resource-btn">Resources</button>*/}
                </td>
              </tr>

              <tr>
                <td className="left">eFundi Readiness Test</td>
                <td></td>
                <td>
                  {/*<button className="gb-resource-btn">Resources</button>*/}
                </td>
              </tr>

              <tr>
                <td></td>
                <td></td>
                <td></td>
              </tr>

              <tr>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default GradeBook;
