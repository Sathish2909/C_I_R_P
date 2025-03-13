const express = require("express");
const cors = require("cors");
const domainRoutes = require("./routes/domainRoutes");
const topicRoutes = require("./routes/topicRoutes");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/domains", domainRoutes);
app.use("/api/topics", topicRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
