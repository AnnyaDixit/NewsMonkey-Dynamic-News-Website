const express = require("express");

const {
  fetchNews
} = require("../controllers/newsController");

const router = express.Router();

// GET /api/news
// Fetch news with category, search and pagination support
router.get("/", fetchNews);

module.exports = router;