// server.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize express app
const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Import routes
const disasterRoutes = require("./routes/disasterRoutes");
const resourceRoutes = require("./routes/resourceRoutes");
const zoneRoutes = require("./routes/zoneRoutes");
const volunteerRoutes = require("./routes/volunteerRoutes");
const requestRoutes = require("./routes/requestRoutes");
const distributionRoutes = require("./routes/distributionRoutes");
const auditLogRoutes = require("./routes/auditLogRoutes");

// Test route
app.get("/", (req, res) => {
  res.send("Disaster Relief API is running successfully!");
});

// API routes
app.use("/api/disasters", disasterRoutes);
app.use("/api/resources", resourceRoutes);
app.use("/api/zones", zoneRoutes);
app.use("/api/volunteers", volunteerRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/distributions", distributionRoutes);
app.use("/api/auditlogs", auditLogRoutes);

// Server listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
