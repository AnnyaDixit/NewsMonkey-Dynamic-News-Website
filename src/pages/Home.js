import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const categories = [
    {
      name: "Business",
      icon: "💼",
      description: "Markets, companies and economy",
      path: "/business",
    },
    {
      name: "Technology",
      icon: "💻",
      description: "AI, gadgets and technology",
      path: "/technology",
    },
    {
      name: "Sports",
      icon: "⚽",
      description: "Latest sports updates",
      path: "/sports",
    },
    {
      name: "Science",
      icon: "🔬",
      description: "Science and discoveries",
      path: "/science",
    },
    {
      name: "Health",
      icon: "🏥",
      description: "Health and wellness news",
      path: "/health",
    },
    {
      name: "Entertainment",
      icon: "🎬",
      description: "Movies, celebrities and entertainment",
      path: "/entertainment",
    },
  ];

  return (
    <div className="container-fluid bg-light min-vh-100 py-4">

      {/* Hero Section */}
      <div className="container">
        <div className="p-5 mb-4 rounded-4 bg-dark text-white shadow">
          <div className="row align-items-center">

            <div className="col-lg-8">
              <span className="badge bg-info text-dark mb-3">
                AI POWERED NEWS PLATFORM
              </span>

              <h1 className="display-4 fw-bold">
                Welcome to NewsMonkey AI
              </h1>

              <p className="lead mt-3">
                Discover the latest news, trending stories and
                personalized content — all in one intelligent platform.
              </p>

              <div className="mt-4 d-flex flex-wrap gap-2">
                <Link to="/latest" className="btn btn-info btn-lg">
                  📰 Explore Latest News
                </Link>

                <Link
                  to="/ai-assistant"
                  className="btn btn-outline-light btn-lg"
                >
                  🤖 Ask AI
                </Link>
              </div>
            </div>

            <div className="col-lg-4 text-center mt-4 mt-lg-0">
              <div style={{ fontSize: "100px" }}>
                🤖📰
              </div>

              <h5 className="mt-3">
                Intelligent News Experience
              </h5>
            </div>

          </div>
        </div>

        {/* Quick Features */}
        <div className="row g-4 mb-5">

          <div className="col-md-4">
            <Link
              to="/trending"
              className="text-decoration-none text-dark"
            >
              <div className="card border-0 shadow-sm h-100 rounded-4">
                <div className="card-body p-4">
                  <div className="fs-1">🔥</div>
                  <h4 className="fw-bold mt-3">
                    Trending News
                  </h4>
                  <p className="text-muted">
                    Explore the stories and topics currently
                    attracting attention.
                  </p>
                  <span className="text-primary fw-semibold">
                    Explore Trending →
                  </span>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-md-4">
            <Link
              to="/for-you"
              className="text-decoration-none text-dark"
            >
              <div className="card border-0 shadow-sm h-100 rounded-4">
                <div className="card-body p-4">
                  <div className="fs-1">✨</div>
                  <h4 className="fw-bold mt-3">
                    For You
                  </h4>
                  <p className="text-muted">
                    Get a personalized news feed based on
                    your interests.
                  </p>
                  <span className="text-primary fw-semibold">
                    View Your Feed →
                  </span>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-md-4">
            <Link
              to="/ai-assistant"
              className="text-decoration-none text-dark"
            >
              <div className="card border-0 shadow-sm h-100 rounded-4">
                <div className="card-body p-4">
                  <div className="fs-1">🤖</div>
                  <h4 className="fw-bold mt-3">
                    AI Assistant
                  </h4>
                  <p className="text-muted">
                    Ask questions about news and get intelligent
                    assistance.
                  </p>
                  <span className="text-primary fw-semibold">
                    Open AI Assistant →
                  </span>
                </div>
              </div>
            </Link>
          </div>

        </div>

        {/* Categories */}
        <div className="mb-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="fw-bold mb-1">
                Explore Categories
              </h2>
              <p className="text-muted mb-0">
                Choose a category to explore the latest stories.
              </p>
            </div>

            <Link
              to="/latest"
              className="btn btn-outline-dark"
            >
              View All
            </Link>
          </div>

          <div className="row g-4">

            {categories.map((category) => (
              <div className="col-sm-6 col-lg-4" key={category.name}>
                <Link
                  to={category.path}
                  className="text-decoration-none text-dark"
                >
                  <div className="card border-0 shadow-sm h-100 rounded-4 category-card">
                    <div className="card-body p-4">

                      <div className="d-flex align-items-center">
                        <div
                          className="rounded-circle bg-light d-flex align-items-center justify-content-center"
                          style={{
                            width: "60px",
                            height: "60px",
                            fontSize: "28px",
                          }}
                        >
                          {category.icon}
                        </div>

                        <div className="ms-3">
                          <h5 className="fw-bold mb-1">
                            {category.name}
                          </h5>

                          <p className="text-muted mb-0 small">
                            {category.description}
                          </p>
                        </div>
                      </div>

                    </div>
                  </div>
                </Link>
              </div>
            ))}

          </div>
        </div>

        {/* AI Section */}
        <div className="card border-0 shadow-sm rounded-4 mb-5 overflow-hidden">
          <div className="card-body p-4 p-lg-5">

            <div className="row align-items-center">

              <div className="col-lg-8">
                <span className="badge bg-dark mb-3">
                  COMING WITH AI
                </span>

                <h2 className="fw-bold">
                  Your News, Made Smarter
                </h2>

                <p className="text-muted">
                  NewsMonkey AI will analyse news articles,
                  generate summaries, understand sentiment,
                  identify related stories and provide
                  personalized recommendations.
                </p>

                <div className="row mt-4">

                  <div className="col-sm-6 mb-3">
                    <strong>🤖 AI Summarization</strong>
                    <p className="small text-muted mb-0">
                      Understand long articles quickly.
                    </p>
                  </div>

                  <div className="col-sm-6 mb-3">
                    <strong>🎯 Personalization</strong>
                    <p className="small text-muted mb-0">
                      News based on your interests.
                    </p>
                  </div>

                  <div className="col-sm-6 mb-3">
                    <strong>📊 Sentiment Analysis</strong>
                    <p className="small text-muted mb-0">
                      Analyse the tone of news articles.
                    </p>
                  </div>

                  <div className="col-sm-6 mb-3">
                    <strong>🔗 Related News</strong>
                    <p className="small text-muted mb-0">
                      Discover similar stories automatically.
                    </p>
                  </div>

                </div>
              </div>

              <div className="col-lg-4 text-center mt-4 mt-lg-0">
                <div style={{ fontSize: "90px" }}>
                  🧠
                </div>

                <Link
                  to="/ai-assistant"
                  className="btn btn-dark"
                >
                  Try AI Assistant
                </Link>
              </div>

            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-muted py-4">
          <p className="mb-1">
            © {new Date().getFullYear()} NewsMonkey AI
          </p>

          <small>
            Intelligent News • Personalization • Artificial Intelligence
          </small>
        </div>

      </div>
    </div>
  );
};

export default Home;