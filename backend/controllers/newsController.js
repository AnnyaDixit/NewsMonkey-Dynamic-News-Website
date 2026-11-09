const { getNews } = require("../services/newsService");

const fetchNews = async (req, res) => {
  try {
    const {
      country = "in",
      category = "general",
      page = 1,
      pageSize = 12,
      query = ""
    } = req.query;

    // Validate page
    const currentPage = Number(page);

    if (!Number.isInteger(currentPage) || currentPage < 1) {
      return res.status(400).json({
        success: false,
        error: "INVALID_PAGE",
        message: "Page must be a positive integer."
      });
    }

    // Validate page size
    const currentPageSize = Number(pageSize);

    if (
      !Number.isInteger(currentPageSize) ||
      currentPageSize < 1 ||
      currentPageSize > 100
    ) {
      return res.status(400).json({
        success: false,
        error: "INVALID_PAGE_SIZE",
        message: "Page size must be an integer between 1 and 100."
      });
    }

    console.log("\n======================================");
    console.log("📰 News Request Received");
    console.log("======================================");

    console.log("Category:", category);
    console.log("Country:", country);
    console.log("Page:", currentPage);
    console.log("Page Size:", currentPageSize);
    console.log("Search Query:", query || "None");

    const news = await getNews({
      country,
      category,
      page: currentPage,
      pageSize: currentPageSize,
      query
    });

    const totalResults = Number(news.totalResults) || 0;

    const totalPages = Math.ceil(
      totalResults / currentPageSize
    );

    console.log("\n📦 NewsAPI Response:");
    console.log("Total Results:", totalResults);
    console.log("Current Page:", currentPage);
    console.log("Page Size:", currentPageSize);
    console.log("Total Pages:", totalPages);

    console.log(
      `✅ ${news.articles?.length || 0} articles fetched successfully`
    );

    return res.status(200).json({
      success: true,
      status: news.status,

      totalResults,

      page: currentPage,

      pageSize: currentPageSize,

      totalPages,

      hasNextPage:
        currentPage < totalPages,

      hasPreviousPage:
        currentPage > 1,

      articles: news.articles || []
    });

  } catch (error) {

    console.error("\n======================================");
    console.error("❌ NEWS CONTROLLER ERROR");
    console.error("======================================");

    console.error(
      "Error:",
      error.response?.data || error.message
    );

    // NewsAPI returned an error
    if (error.response) {

      const statusCode = error.response.status;

      const apiMessage =
        error.response.data?.message ||
        "News API request failed.";

      // API key / authentication error
      if (statusCode === 401) {
        return res.status(401).json({
          success: false,
          error: "NEWS_API_AUTH_ERROR",
          message: "News API authentication failed."
        });
      }

      // Rate limit
      if (statusCode === 429) {
        return res.status(429).json({
          success: false,
          error: "NEWS_API_RATE_LIMIT",
          message:
            "News API request limit reached. Please try again later."
        });
      }

      // Other NewsAPI errors
      return res.status(502).json({
        success: false,
        error: "NEWS_API_ERROR",
        message: apiMessage
      });
    }

    // Network / DNS / connection error
    if (
      error.code === "ENOTFOUND" ||
      error.code === "ECONNREFUSED" ||
      error.code === "ETIMEDOUT" ||
      error.code === "ECONNRESET"
    ) {
      return res.status(503).json({
        success: false,
        error: "NEWS_API_CONNECTION_ERROR",
        message:
          "Unable to connect to the news service. Please try again later."
      });
    }

    // Missing API key
    if (
      error.message &&
      error.message.includes("NEWS_API_KEY")
    ) {
      return res.status(500).json({
        success: false,
        error: "NEWS_API_KEY_MISSING",
        message:
          "News API configuration is missing on the server."
      });
    }

    // Unexpected server error
    return res.status(500).json({
      success: false,
      error: "INTERNAL_SERVER_ERROR",
      message:
        "An unexpected error occurred while fetching news."
    });
  }
};

module.exports = {
  fetchNews
};