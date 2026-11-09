const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");

const {
  saveNews,
  getSavedNews,
  deleteSavedNews
} = require("../controllers/savedNewsController");

const router = express.Router();

// All saved-news routes require login
router.use(authMiddleware);

// Save news
router.post("/", saveNews);

// Get logged-in user's saved news
router.get("/", getSavedNews);

// Delete saved news
router.delete("/:id", deleteSavedNews);

module.exports = router;