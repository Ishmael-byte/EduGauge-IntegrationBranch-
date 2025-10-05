import React from "react";
import "./gradebook.css";
import '../APIservices/api'; //Fixed import path 
import { NavLink } from "react-router-dom";

const GradeBook = () => {
  return (
    <div className="gb-page">
      {/* Sidebar */}
      

      {/* Main Content */}
      <main className="gb-main">
        <header className="gb-header">
          <h2 className="gb-small-title">Gradebook</h2>
          <div className="gb-profile">
            <span className="gb-profile-icon">👤</span>
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
                <th>Due Date</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className="left">Digital Literacy Test</td>
                <td></td>
                <td>
                  {/* Example button if needed */}
                  {/* <button className="gb-resource-btn">Resources</button> */}
                </td>
              </tr>

              <tr>
                <td className="left">eFundi Readiness Test</td>
                <td></td>
                <td>
                  {/* <button className="gb-resource-btn">Resources</button> */}
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