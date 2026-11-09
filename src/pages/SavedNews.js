import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../services/authService";

const SavedNews = () => {
  const navigate = useNavigate();

  const [savedNews, setSavedNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Fetch saved news
  const fetchSavedNews = async () => {
    const token = getToken();

    // User is not logged in
    if (!token) {
      setLoading(false);
      setMessage("Please login first to view your saved news.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/saved-news",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(
          data.message || "Unable to fetch saved news."
        );
        setLoading(false);
        return;
      }

      setSavedNews(data.savedNews || []);
      setLoading(false);

    } catch (error) {
      console.error("Fetch Saved News Error:", error);

      setMessage(
        "Unable to connect to backend."
      );

      setLoading(false);
    }
  };

  // Load saved news when page opens
  useEffect(() => {
    fetchSavedNews();
  }, []);

  // Delete saved news
  const handleDelete = async (id) => {
    const token = getToken();

    if (!token) {
      setMessage("Please login first.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/saved-news/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(
          data.message || "Unable to remove news."
        );
        return;
      }

      // Remove article from screen immediately
      setSavedNews((previousNews) =>
        previousNews.filter((news) => news._id !== id)
      );

      setMessage("News removed successfully.");

    } catch (error) {
      console.error("Delete Saved News Error:", error);

      setMessage(
        "Unable to connect to backend."
      );
    }
  };

  // Loading screen
  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <h3>Loading your saved news...</h3>
      </div>
    );
  }

  // Logged-out screen
  if (!getToken()) {
    return (
      <div className="container mt-5">
        <div className="card shadow p-4 text-center">

          <h3 className="text-danger">
            Login Required
          </h3>

          <p className="text-muted">
            Please login first to view your saved news.
          </p>

          <button
            className="btn btn-primary"
            onClick={() => navigate("/profile")}
          >
            Login
          </button>

        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">

      <h2 className="text-center mb-4">
        📰 My Saved News
      </h2>

      {message && (
        <div className="alert alert-info text-center">
          {message}
        </div>
      )}

      {/* No saved news */}
      {savedNews.length === 0 && !message && (
        <div className="card shadow p-4 text-center">

          <h4>
            No Saved News
          </h4>

          <p className="text-muted">
            You have not saved any news articles yet.
          </p>

          <button
            className="btn btn-primary"
            onClick={() => navigate("/")}
          >
            Explore News
          </button>

        </div>
      )}

      {/* Saved news cards */}
      <div className="row">

        {savedNews.map((news) => (

          <div
            className="col-md-4 mb-4"
            key={news._id}
          >

            <div className="card h-100 shadow-sm">

              {/* News Image */}
              <img
                src={
                  news.urlToImage
                    ? news.urlToImage
                    : "https://c.ndtvimg.com/2023-02/4d7qecfo_tax-generic_625x300_02_February_23.jpg"
                }
                className="card-img-top"
                alt={news.title}
                style={{
                  height: "200px",
                  objectFit: "cover"
                }}
              />

              <div className="card-body d-flex flex-column">

                {/* Source */}
                {news.source && (
                  <span className="badge bg-danger mb-2 align-self-start">
                    {news.source}
                  </span>
                )}

                {/* Title */}
                <h5 className="card-title">
                  {news.title}
                </h5>

                {/* Description */}
                <p className="card-text">
                  {news.description
                    ? `${news.description.substring(0, 150)}...`
                    : "No description available."
                  }
                </p>

                {/* Date */}
                {news.publishedAt && (
                  <p className="text-muted mb-3">
                    <small>
                      Published:{" "}
                      {new Date(
                        news.publishedAt
                      ).toLocaleString()}
                    </small>
                  </p>
                )}

                {/* Buttons */}
                <div className="mt-auto d-flex gap-2">

                  <a
                    href={news.url}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary btn-sm"
                  >
                    Read More
                  </a>

                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() =>
                      handleDelete(news._id)
                    }
                  >
                    Remove
                  </button>

                </div>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default SavedNews;
