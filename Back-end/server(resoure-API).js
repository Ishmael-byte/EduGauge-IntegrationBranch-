const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());


// GET all resources
app.get("/api/resources", (req, res) => {
  res.json(resources);
});

// GET resource by ID
app.get("/api/resources/:id", (req, res) => {
  const resource = resources.find(r => r.id === parseInt(req.params.id));
  if (!resource) {
    return res.status(404).json({ message: "Resource not found" });
  }
  res.json(resource);
});

// POST - create new resource
app.post("/api/resources", (req, res) => {
  const { title, url } = req.body;
  const newResource = {
    id: resources.length + 1,
    title,
    url
  };
  resources.push(newResource);
  res.status(201).json({ ...newResource, message: "Resource created successfully" });
});

// PUT - update resource
app.put("/api/resources/:id", (req, res) => {
  const resource = resources.find(r => r.id === parseInt(req.params.id));
  if (!resource) {
    return res.status(404).json({ message: "Resource not found" });
  }

  const { title, url } = req.body;
  resource.title = title || resource.title;
  resource.url = url || resource.url;

  res.json({ ...resource, message: "Resource updated successfully" });
});

// DELETE - remove resource
app.delete("/api/resources/:id", (req, res) => {
  const resourceIndex = resources.findIndex(r => r.id === parseInt(req.params.id));
  if (resourceIndex === -1) {
    return res.status(404).json({ message: "Resource not found" });
  }

  resources.splice(resourceIndex, 1);
  res.json({ message: "Resource deleted successfully" });
});

// GET actual file (download) → Everyone
app.get("/api/resources/file/:filename", authenticateToken, (req, res) => {
  const filePath = path.join(uploadDir, req.params.filename);
  if (!fs.existsSync(filePath)) return res.status(404).json({ message: "File not found" });
  res.download(filePath);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
