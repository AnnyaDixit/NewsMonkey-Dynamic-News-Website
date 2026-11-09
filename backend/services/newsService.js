const axios = require("axios");

const getNews = async ({
  country = "in",
  category = "general",
  page = 1,
  pageSize = 12,
  query = ""
}) => {
  const apiKey = process.env.NEWS_API_KEY;

  if (!apiKey) {
    throw new Error("NEWS_API_KEY is missing in .env");
  }

  /*
    Category-specific search configuration.

    We use more specific keywords so that one category
    does not contain too many unrelated articles.
  */
  const categoryQueries = {

    technology:
      '("artificial intelligence" OR AI OR technology OR software OR cybersecurity OR robotics OR smartphone OR computer)',

    business:
      '("stock market" OR finance OR economy OR investment OR banking OR earnings OR revenue OR merger OR acquisition OR "business news")',

    health:
      '(healthcare OR medical OR medicine OR hospital OR disease OR "public health" OR health)',

    science:
      '(science OR scientific OR research OR astronomy OR physics OR biology OR space)',

    sports:
      '(sports OR cricket OR football OR tennis OR basketball OR Olympics)',

    entertainment:
      '(movies OR cinema OR music OR television OR entertainment OR actor OR actress OR celebrity)',

    general:
      '("breaking news" OR "world news" OR "India news" OR "latest news")'
  };

  /*
    If Search page sends a query, use that query.

    Otherwise use the selected category query.
  */
  const cleanedQuery = query
  ? query.trim().replace(/\s+/g, " ")
  : "";

const searchQuery =
  cleanedQuery !== ""
    ? cleanedQuery
    : categoryQueries[category] || categoryQueries.general;

  const url = "https://newsapi.org/v2/everything";

  const params = {
    q: searchQuery,

    /*
      Search title and description instead of the complete
      article content.

      This reduces unrelated matches.
    */
    searchIn: "title,description",

    language: "en",

    /*
      Relevancy gives priority to articles more closely
      related to the search query.
    */
    sortBy: "relevancy",

    page: Number(page),

    /*
      Request a few extra articles from NewsAPI.
      We can then filter them on our backend.
    */
    pageSize: Math.min(Number(pageSize) + 5, 100),

    apiKey
  };

  console.log("\n======================================");
  console.log("🌐 Calling NewsAPI");
  console.log("======================================");

  console.log("Category:", category);
  console.log("Search Query:", query || "Category Search");
  console.log("NewsAPI Query:", searchQuery);

  console.log("Parameters:", {
    ...params,
    apiKey: "HIDDEN"
  });

  try {

    const response = await axios.get(url, {
  params,
  timeout: 10000
});

    console.log("\n📡 NewsAPI status:", response.data.status);

    console.log(
      "📊 NewsAPI totalResults:",
      response.data.totalResults
    );

    let articles = response.data.articles || [];

    console.log(
      `📰 Articles received from NewsAPI: ${articles.length}`
    );

    /*
      ======================================
      BACKEND ARTICLE CLEANING
      ======================================
    */

    // ------------------------------------
    // 1. Remove articles without title
    // ------------------------------------

    articles = articles.filter(
      (article) =>
        article.title &&
        article.title.trim() !== ""
    );


    // ------------------------------------
    // 2. Remove removed/deleted articles
    // ------------------------------------

    articles = articles.filter(
      (article) =>
        !article.title
          .toLowerCase()
          .includes("[removed]")
    );


    // ------------------------------------
    // 3. Remove duplicate URLs
    // ------------------------------------

    const seenUrls = new Set();

    articles = articles.filter((article) => {

      if (!article.url) {
        return true;
      }

      if (seenUrls.has(article.url)) {
        return false;
      }

      seenUrls.add(article.url);

      return true;
    });


    // ------------------------------------
    // 4. Remove duplicate titles
    // ------------------------------------

    const seenTitles = new Set();

    articles = articles.filter((article) => {

      const normalizedTitle = article.title
        .toLowerCase()
        .trim();

      if (seenTitles.has(normalizedTitle)) {
        return false;
      }

      seenTitles.add(normalizedTitle);

      return true;
    });


    /*
      ======================================
      CATEGORY RELEVANCE FILTER
      ======================================
    */

    const categoryKeywords = {

      technology: [
        "technology",
        "artificial intelligence",
        " ai ",
        "software",
        "cybersecurity",
        "robot",
        "robotics",
        "smartphone",
        "computer",
        "chip",
        "processor",
        "app",
        "internet",
        "cloud",
        "digital"
      ],

      business: [
        "business",
        "finance",
        "financial",
        "economy",
        "economic",
        "stock",
        "stocks",
        "market",
        "investment",
        "investor",
        "bank",
        "banking",
        "earnings",
        "revenue",
        "profit",
        "merger",
        "acquisition",
        "ipo",
        "shares",
        "trade"
      ],

      health: [
        "health",
        "healthcare",
        "medical",
        "medicine",
        "hospital",
        "doctor",
        "disease",
        "cancer",
        "drug",
        "treatment",
        "patient",
        "vaccine",
        "mental health"
      ],

      science: [
        "science",
        "scientific",
        "research",
        "researchers",
        "space",
        "astronomy",
        "physics",
        "biology",
        "chemistry",
        "nasa",
        "planet",
        "climate",
        "discovery"
      ],

      sports: [
        "sports",
        "sport",
        "cricket",
        "football",
        "soccer",
        "tennis",
        "basketball",
        "baseball",
        "hockey",
        "olympics",
        "athlete",
        "championship",
        "tournament",
        "league"
      ],

      entertainment: [
        "entertainment",
        "movie",
        "movies",
        "film",
        "cinema",
        "music",
        "song",
        "album",
        "actor",
        "actress",
        "celebrity",
        "television",
        "tv",
        "series",
        "hollywood",
        "bollywood"
      ],

      general: [
        "news",
        "india",
        "world",
        "government",
        "international",
        "breaking"
      ]
    };


    /*
      Search title + description and calculate
      a simple relevance score.

      This is our first backend-level
      news ranking/filtering layer.
    */

    const keywords =
      categoryKeywords[category] ||
      categoryKeywords.general;


    const scoredArticles = articles.map((article) => {

      const text = `
        ${article.title || ""}
        ${article.description || ""}
      `.toLowerCase();

      let score = 0;

      keywords.forEach((keyword) => {

        if (text.includes(keyword.toLowerCase())) {
          score++;
        }

      });

      return {
        ...article,
        relevanceScore: score
      };
    });


    /*
      Keep articles that have at least one
      category-related keyword.

      Search requests are not filtered by category
      because the user may search for anything.
    */

    let filteredArticles;

    if (query && query.trim() !== "") {

      filteredArticles = scoredArticles;

    } else {

      filteredArticles = scoredArticles.filter(
        (article) => article.relevanceScore > 0
      );
    }


    /*
      Sort our backend results by relevance score.
    */

    filteredArticles.sort(
      (a, b) =>
        b.relevanceScore -
        a.relevanceScore
    );


    /*
      Remove our internal relevance score before
      sending data to the frontend.
    */

    filteredArticles = filteredArticles.map(
  ({ relevanceScore, ...article }) => ({
    title: article.title || "No title available",

    description:
      article.description ||
      "No description available.",

    urlToImage:
      article.urlToImage ||
      null,

    url:
      article.url ||
      "#",

    publishedAt:
      article.publishedAt ||
      null,

    author:
      article.author ||
      "Unknown",

    source: {
      id: article.source?.id || null,

      name:
        article.source?.name ||
        "Unknown Source"
    }
  })
);


    /*
      Return only the requested number of articles.
    */

    filteredArticles =
      filteredArticles.slice(
        0,
        Number(pageSize)
      );


    console.log(
      `🔎 Articles after backend filtering: ${filteredArticles.length}`
    );


    console.log(
      "======================================\n"
    );


    return {
      ...response.data,
      articles: filteredArticles
    };

  } catch (error) {

    console.error(
      "❌ NewsAPI Error:",
      error.response?.data ||
      error.message
    );

    throw error;
  }
};


module.exports = {
  getNews
};