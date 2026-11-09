const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Protected user profile route
router.get("/profile", authMiddleware, (req, res) => {
  res.json({
    success: true,
    message: "Protected profile accessed successfully.",
    user: req.user
  });
});

module.exports = router;