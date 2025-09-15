function Dashboard() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard 👋</p>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "20px",
        marginTop: "20px"
      }}>
        <div style={{ padding: "20px", background: "#f5f5f5", borderRadius: "8px" }}>
          <h3>Users</h3>
          <p>120</p>
        </div>
        <div style={{ padding: "20px", background: "#f5f5f5", borderRadius: "8px" }}>
          <h3>Average </h3>
          <p>56</p>
        </div>
        <div style={{ padding: "20px", background: "#f5f5f5", borderRadius: "8px" }}>
          <h3>Revenue</h3>
          <p>Doing greate</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
