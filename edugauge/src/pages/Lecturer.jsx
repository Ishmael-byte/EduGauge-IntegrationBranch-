import React, { useEffect, useState } from 'react';
import './Lexturer.css';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function Lecturer() {
  const [lecturer, setLecturer] = useState(null);
  const [error, setError] = useState(null);
  const [grades, setGrades] = useState([]);
  const [atRisk, setAtRisk] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');


  useEffect(() => {
    const token = localStorage.getItem('token');
    const lecturerId = localStorage.getItem('lecturer_id');

    if (!token || !lecturerId) {
      setError('Missing token or lecturer ID');
      return;
    }

    // Fetch profile
    fetch(`http://localhost:5000/lecturer/${lecturerId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.ok ? res.json() : Promise.reject('Failed to fetch profile'))
      .then(data => setLecturer(data.lecturer))
      .catch(err => {
        console.error('Profile error:', err);
        setError('Could not load profile');
      });
/*
    // Fetch grade summary
    fetch(`http://localhost:5000/lecturer/${lecturerId}/grades/summary`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.ok ? res.json() : Promise.reject('Failed to fetch grades'))
      .then(data => setGrades(data.summary))
      .catch(err => console.error('Grade fetch error:', err));

    // Fetch at-risk students
    fetch(`http://localhost:5000/at-risk`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.ok ? res.json() : Promise.reject('Failed to fetch at-risk data'))
      .then(data => setAtRisk(data.modules))
      .catch(err => console.error('At-risk fetch error:', err));

*/
  }, 
[]);


  const gradeChart = {
    labels: grades.map(g => g.module),
    datasets: [
      {
        label: 'Average Grade',
        data: grades.map(g => g.average),
        backgroundColor: '#4caf50'
      }
    ]
  };

  const riskChart = {
    labels: atRisk.map(m => m.module),
    datasets: [
      {
        label: 'At-Risk Students',
        data: atRisk.map(m => m.count),
        backgroundColor: '#f44336'
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true }
    },
    scales: {
      y: { beginAtZero: true }
    }
  };




  return (
    <div className="page-container">
      <aside className="sidebar">
        <div className="logo-section">
          <img src="/Eduguage-logo.jpg" alt="Edugauge Logo" className="logo-img" />
          <h1 className="logo-text">EDUGUAGE</h1>
          <h2 className="logo-subtext">System Enhancing LMS Readiness</h2>
        </div>
        <nav>
          <ul className="sidebar-nav">
            <li><a href="#" className="nav-link">Overview</a></li>
            <li><a href="#" className="nav-link">Digital Literacy Test</a></li>
            <li><a href="#" className="nav-link">eFundi Readiness Test</a></li>
            <li><a href="#" className="nav-link">Helpful resource</a></li>
          </ul>
        </nav>
      </aside>

      

      <main className="main-content">
        <header className="main-header">
          <div className="profile-section">
            <span className="profile-icon">👤</span>
            <span>
              {error
                ? error
                : lecturer
                ? `${lecturer.Fname} (${lecturer.email})`
                : 'Loading profile...'}
            </span>
          </div>
        </header>

        <section className="content-body">
          <div className="content-box">
            <h2>Grade Summary</h2>
            {grades.length > 0 ? (
              <Bar data={gradeChart} options={chartOptions} />
            ) : (
              <p>Loading grade data...</p>
            )}
          </div>

          <div className="content-box">
            <h2>At-Risk Students</h2>
            {atRisk.length > 0 ? (
              <Bar data={riskChart} options={chartOptions} />
            ) : (
              <p>Loading at-risk data...</p>
            )}
          </div>

            <div className="content-box">
    <h2>Post a New Resource</h2>
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const lecturer_id = localStorage.getItem('lecturer_id');

        try {
          const res = await fetch('http://localhost:5000/resources', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({resource_name: name, description, url, lecturer_id })
          });

          const data = await res.json();
          if (res.ok) {
            alert('Resource posted successfully!');
            setName('');
            setDescription('');
            setUrl('');
          } else {
            alert(data.error || 'Failed to post resource');
          }
        } catch (err) {
          console.error('Resource post error:', err);
          alert(`Something went wrong: ${err.message}`);
        }
      }}
      className="resource-form"
    >
      <input
        type="text"
        placeholder="Resource Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="input-field-styles"
       
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="input-field-styles"
        
      />
      <input
        type="url"
        placeholder="Resource URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="input-field-styles"
        
      />
      <button type="submit" className="login-button-styles">Submit Resource</button>
    </form>
  </div>


        </section>
      </main>
    </div>
  );
}

export default Lecturer;
