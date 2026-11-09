const SavedNews = require("../models/SavedNews");

// Save news
const saveNews = async (req, res) => {
  try {
    const {
      title,
      description,
      url,
      urlToImage,
      source,
      publishedAt
    } = req.body;

    if (!title || !url) {
      return res.status(400).json({
        success: false,
        message: "Title and URL are required."
      });
    }

    // Check whether user already saved this article
    const existingNews = await SavedNews.findOne({
      userId: req.user.userId,
      url
    });

    if (existingNews) {
      return res.status(400).json({
        success: false,
        message: "News already saved."
      });
    }

    const savedNews = await SavedNews.create({
      userId: req.user.userId,
      title,
      description,
      url,
      urlToImage,
      source,
      publishedAt
    });

    res.status(201).json({
      success: true,
      message: "News saved successfully.",
      savedNews
    });

  } catch (error) {
    console.error("Save News Error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to save news."
    });
  }
};


// Get user's saved news
const getSavedNews = async (req, res) => {
  try {
    const savedNews = await SavedNews.find({
      userId: req.user.userId
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: savedNews.length,
      savedNews
    });

  } catch (error) {
    console.error("Get Saved News Error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch saved news."
    });
  }
};


// Delete saved news
const deleteSavedNews = async (req, res) => {
  try {
    const deletedNews = await SavedNews.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId
    });

    if (!deletedNews) {
      return res.status(404).json({
        success: false,
        message: "Saved news not found."
      });
    }

    res.json({
      success: true,
      message: "Saved news removed successfully."
    });

  } catch (error) {
    console.error("Delete Saved News Error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to remove saved news."
    });
  }
};


module.exports = {
  saveNews,
  getSavedNews,
  deleteSavedNews
};