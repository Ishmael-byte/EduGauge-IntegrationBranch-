require('dotenv').config();
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const sql = require("mssql");
const multer = require('multer');
const crypto = require('crypto'); // also needed for unique filenames

const ex = express(); // ← Your Express app
ex.use(cors());
ex.use(express.json()); // ← Use express.json(), not ex.json() unless you alias it

// Database config
const dbConfig = {
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    server: process.env.DATABASE_SERVER,
    database: process.env.DATABASE_NAME,
    port: parseInt(process.env.Database_port || 1433),
    options: {
        encrypt: true,
        trustServerCertificate: false
    }
};

// Middleware for authentication
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token === 'test123') {
        req.user = { id: 1, username: 'testuser' };
        return next();
    }
    return res.status(401).json({ message: 'Unauthorized: Invalid or missing token' });
}

// === DEFINE ALL ROUTES USING 'ex' ===

const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        // Generate unique filename: <timestamp>-<random>.<ext>
        const ext = path.extname(file.originalname).toLowerCase();
        const uniqueSuffix = Date.now() + '-' + crypto.randomBytes(8).toString('hex');
        cb(null, `resource-${uniqueSuffix}${ext}`);
    }
});

// File filter: allow only safe types (adjust as needed)
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|pdf|doc|docx|txt|mp4|zip/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error('Only images, PDFs, docs, text, MP4, and ZIP files are allowed'));
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 50 * 1024 * 1024 } // 50 MB max
});

// Public: Get all resources
ex.get("/resources", async (req, res) => {
    try {
        const result = await getDbRequest().query('SELECT * FROM Resource');
        res.json(result.recordset);
    } catch (err) {
        console.error("Error fetching resources:", err);
        res.status(500).json({ error: 'Failed to fetch resources' });
    }
});

// Public: Get resource by ID
ex.get("/resources/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });

    try {
        const result = await getDbRequest()
            .input('id', sql.Int, id)
            .query('SELECT * FROM Resource WHERE resource_id = @id');
        if (result.recordset.length === 0) {
            return res.status(404).json({ error: "Resource not found" });
        }
        res.json(result.recordset[0]);
    } catch (err) {
        console.error("Error fetching resource:", err);
        res.status(500).json({ error: 'Failed to fetch resource' });
    }
});

// Protected: Upload a file and create a resource (Admin or Lecturer)
ex.post("/resources/upload", authenticateToken, upload.single('file'), async (req, res) => {
    // Optional: restrict to admin/lecturer
    if (!req.user.admin_id && !req.user.lecturer_id) {
        // Clean up uploaded file if unauthorized
        if (req.file) fs.unlinkSync(req.file.path);
        return res.status(403).json({ error: 'Only admins or lecturers can upload resources' });
    }

    const { resource_name, description } = req.body;
    if (!resource_name) {
        if (req.file) fs.unlinkSync(req.file.path);
        return res.status(400).json({ error: 'resource_name is required' });
    }

    try {
        const filename = req.file?.filename;
        const url = filename ? `/resources/file/${filename}` : null;

        const result = await getDbRequest()
            .input('name', sql.NVarChar, resource_name)
            .input('desc', sql.NVarChar, description || null)
            .input('url', sql.NVarChar, url)
            .input('date', sql.DateTime, new Date())
            .query(`
                INSERT INTO Resource (resource_name, description, url, date)
                OUTPUT INSERTED.*
                VALUES (@name, @desc, @url, @date)
            `);

        res.status(201).json({
            ...result.recordset[0],
            message: "Resource uploaded successfully"
        });

    } catch (err) {
        // Clean up file on DB error
        if (req.file) fs.unlinkSync(req.file.path);
        console.error("Upload error:", err);
        res.status(500).json({ error: 'Failed to save resource' });
    }
});

// Protected: Create resource WITHOUT file (just URL or description)
ex.post("/resources", authenticateToken, async (req, res) => {
    if (!req.user.admin_id && !req.user.lecturer_id) {
        return res.status(403).json({ error: 'Admin or lecturer access required' });
    }

    const { resource_name, description, url } = req.body;
    if (!resource_name) {
        return res.status(400).json({ error: 'resource_name is required' });
    }

    try {
        const result = await getDbRequest()
            .input('name', sql.NVarChar, resource_name)
            .input('desc', sql.NVarChar, description || null)
            .input('url', sql.NVarChar, url || null)
            .input('date', sql.DateTime, new Date())
            .query(`
                INSERT INTO Resource (resource_name, description, url, date)
                OUTPUT INSERTED.*
                VALUES (@name, @desc, @url, @date)
            `);
        res.status(201).json({ ...result.recordset[0], message: "Resource created successfully" });
    } catch (err) {
        console.error("Error creating resource:", err);
        res.status(500).json({ error: 'Failed to create resource' });
    }
});

// Protected: Update resource
ex.put("/resources/:id", authenticateToken, async (req, res) => {
    if (!req.user.admin_id && !req.user.lecturer_id) {
        return res.status(403).json({ error: 'Admin or lecturer access required' });
    }

    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });

    const { resource_name, description, url } = req.body;
    if (!resource_name) return res.status(400).json({ error: 'resource_name is required' });

    try {
        const result = await getDbRequest()
            .input('id', sql.Int, id)
            .input('name', sql.NVarChar, resource_name)
            .input('desc', sql.NVarChar, description || null)
            .input('url', sql.NVarChar, url || null)
            .query(`
                UPDATE Resource
                SET resource_name = @name,
                    description = @desc,
                    url = @url
                WHERE resource_id = @id;

                SELECT * FROM Resource WHERE resource_id = @id;
            `);

        if (result.recordset.length === 0) {
            return res.status(404).json({ error: "Resource not found" });
        }
        res.json({ ...result.recordset[0], message: "Resource updated successfully" });
    } catch (err) {
        console.error("Error updating resource:", err);
        res.status(500).json({ error: 'Failed to update resource' });
    }
});

// Protected: Delete resource (and file if exists)
ex.delete("/resources/:id", authenticateToken, async (req, res) => {
    if (!req.user.admin_id && !req.user.lecturer_id) {
        return res.status(403).json({ error: 'Admin or lecturer access required' });
    }

    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });

    try {
        // First, get the resource to check if it has a file
        const existing = await getDbRequest()
            .input('id', sql.Int, id)
            .query('SELECT url FROM Resource WHERE resource_id = @id');

        if (existing.recordset.length === 0) {
            return res.status(404).json({ error: "Resource not found" });
        }

        const url = existing.recordset[0].url;
        if (url && url.startsWith('/resources/file/')) {
            const filename = path.basename(url);
            const filePath = path.join(uploadDir, filename);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }

        // Now delete from DB
        const result = await getDbRequest()
            .input('id', sql.Int, id)
            .query('DELETE FROM Resource WHERE resource_id = @id');

        res.json({ message: "Resource deleted successfully" });
    } catch (err) {
        console.error("Error deleting resource:", err);
        res.status(500).json({ error: 'Failed to delete resource' });
    }
});

// Protected: Download file
ex.get("/resources/file/:filename", authenticateToken, (req, res) => {
    const filename = req.params.filename;
    // Prevent directory traversal
    if (filename.includes('..') || filename.includes('/')) {
        return res.status(400).json({ error: 'Invalid filename' });
    }

    const filePath = path.join(uploadDir, filename);
    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: "File not found" });
    }
    res.download(filePath);
});

// === START SERVER AFTER ROUTES ARE DEFINED ===
const PORT = process.env.PORT || 5000;

async function startServer() {
    try {
        await sql.connect(dbConfig);
        console.log('Connected to the database');
        ex.listen(PORT, () => { // ← Use 'ex.listen', not 'app.listen'
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error('Database connection failed:', err.message);
        process.exit(1);
    }
}

startServer();