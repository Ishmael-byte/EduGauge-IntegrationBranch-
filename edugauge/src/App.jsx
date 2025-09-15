import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/login.jsx";
import Dashboard from "./pages/dashboard.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import eFundiTest from "./pages/eFundiTest.jsx";
import "./App.css";


function App() {
  return (
    <Router>
      <nav style={{ padding: "10px", background: "#333" }}>
        <Link to="/" style={{ margin: "0 10px", color: "#590570ff" }}>Home</Link>
        <Link to="/login" style={{ margin: "0 10px", color: "#320336ff" }}>Login</Link>
        <Link to="/dashboard" style={{ margin: "0 10px", color: "#b192beff" }}>Dashboard</Link>
        <Link to="/SignUpPage" style={{ margin: "0 10px", color: "#fff" }}>SignUpPage</Link>
      </nav>

      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/SignUpPage" element={<SignUpPage />} />
      </Routes>
    </Router>
  );
}

export default App;
