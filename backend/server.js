const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const newsRoutes = require("./routes/newsRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const savedNewsRoutes = require("./routes/savedNewsRoutes");
const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// News API
// News API
app.use("/api/news", newsRoutes);

// Authentication API
app.use("/api/auth", authRoutes);

// Protected user API
app.use("/api/users", userRoutes);
app.use("/api/saved-news", savedNewsRoutes);
// Home route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "NewsMonkey AI Backend is running 🚀"
  });
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    status: "OK",
    message: "Backend is healthy"
  });
});

// Start server
app.listen(PORT, () => {
  console.log(
    `NewsMonkey AI Backend running on http://localhost:${PORT}`
  );
});