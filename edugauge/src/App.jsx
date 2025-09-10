import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/login.jsx";
import Dashboard from "./pages/dashboard.jsx";
import "./App.css";

function App() {
  return (
    <Router>
      <nav style={{ padding: "10px", background: "#333" }}>
        <Link to="/" style={{ margin: "0 10px", color: "#fff" }}>Home</Link>
        <Link to="/login" style={{ margin: "0 10px", color: "#fff" }}>Login</Link>
        <Link to="/dashboard" style={{ margin: "0 10px", color: "#fff" }}>Dashboard</Link>
      </nav>

      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
