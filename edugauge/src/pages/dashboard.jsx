import React from "react";
import "./dashboard.css";
import { Route } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="dashboard-page">
      <h1 className="dashboard-title">Dashboard</h1>
      <div className="dashboard-widgets">
        <div className="dashboard-box">Welcome Text</div>
        <div className="dashboard-box">Tasks</div>
      </div>
    </div>

   
  );
  
}

