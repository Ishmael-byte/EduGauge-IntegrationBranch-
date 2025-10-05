const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const sql = require("mssql");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Database config for Microsoft SQL Server
const dbConfig = {
     user: process.env.DB_USER,
     password: process.env.DB_PASS,
     server: process.env.DB_SERVER,
     database: process.env.DB_NAME,
   options: {
    encrypt: true,
     trustServerCertificate: false,
   },
 };

// Folder for uploaded files
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Middleware for authentication
function authenticateToken(req, res, next) {
  const token = req.headers["authorization"];
  if (!token || token !== "Bearer test-token") {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
}

// GET all resources
app.get("/api/resources", async (req, res) => {
  try {
    let pool = await sql.connect(dbConfig);
    let result = await pool.request().query("SELECT * FROM Resource");
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET resource by ID
app.get("/api/resources/:id", async (req, res) => {
  try {
    let pool = await sql.connect(dbConfig);
    let result = await pool.request()
      .input("id", sql.Int, req.params.id)
      .query("SELECT * FROM Resource WHERE resource_id = @id");

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: "Resource not found" });
    }
    res.json(result.recordset[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST - create new resource
app.post("/api/resources", async (req, res) => {
  try {
    const { resource_name, description, url, date } = req.body;
    let pool = await sql.connect(dbConfig);
    let result = await pool.request()
      .input("resource_name", sql.NVarChar(255), resource_name)
      .input("description", sql.NVarChar(500), description)
      .input("url", sql.NVarChar(500), url)
      .input("date", sql.DateTime, date || new Date())
      .query(`
        INSERT INTO Resource (resource_name, description, url, date) 
        OUTPUT INSERTED.* 
        VALUES (@resource_name, @description, @url, @date)
      `);

    res.status(201).json({ ...result.recordset[0], message: "Resource created successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT - update resource
app.put("/api/resources/:id", async (req, res) => {
  try {
    const { resource_name, description, url, date } = req.body;
    let pool = await sql.connect(dbConfig);
    let result = await pool.request()
      .input("id", sql.Int, req.params.id)
      .input("resource_name", sql.NVarChar(255), resource_name)
      .input("description", sql.NVarChar(500), description)
      .input("url", sql.NVarChar(500), url)
      .input("date", sql.DateTime, date || new Date())
      .query(`
        UPDATE Resource 
        SET resource_name = @resource_name, 
            description = @description, 
            url = @url, 
            date = @date 
        WHERE resource_id = @id;
        SELECT * FROM Resource WHERE resource_id = @id
      `);

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: "Resource not found" });
    }

    res.json({ ...result.recordset[0], message: "Resource updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE - remove resource
app.delete("/api/resources/:id", async (req, res) => {
  try {
    let pool = await sql.connect(dbConfig);
    let result = await pool.request()
      .input("id", sql.Int, req.params.id)
      .query("DELETE FROM Resource WHERE resource_id = @id");

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: "Resource not found" });
    }

    res.json({ message: "Resource deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET actual file (download)
app.get("/api/resources/file/:filename", authenticateToken, (req, res) => {
  const filePath = path.join(uploadDir, req.params.filename);
  if (!fs.existsSync(filePath)) return res.status(404).json({ message: "File not found" });
  res.download(filePath);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
