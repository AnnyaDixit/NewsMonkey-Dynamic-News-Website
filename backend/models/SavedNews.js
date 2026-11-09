const mongoose = require("mongoose");

const savedNewsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    title: {
      type: String,
      required: true
    },

    description: {
      type: String,
      default: ""
    },

    url: {
      type: String,
      required: true
    },

    urlToImage: {
      type: String,
      default: ""
    },

    source: {
      type: String,
      default: ""
    },

    publishedAt: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("SavedNews", savedNewsSchema);