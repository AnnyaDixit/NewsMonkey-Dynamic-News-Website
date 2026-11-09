import React from "react";
import { Link } from "react-router-dom";
import News from "../components/News";

const ForYou = () => {
  return (
    <div className="container py-4">

      {/* Header */}
      <div className="p-4 mb-4 rounded-4 bg-dark text-white shadow-sm">
        <span className="badge bg-info text-dark mb-2">
          ✨ PERSONALIZED
        </span>

        <h1 className="fw-bold">
          News For You
        </h1>

        <p className="mb-3">
          Discover news based on your interests and reading
          preferences.
        </p>

        <Link to="/profile" className="btn btn-info">
          🎯 Set Your Interests
        </Link>
      </div>

      {/* Recommended News */}
      <div className="mb-4">
        <h2 className="fw-bold">
          Recommended For You
        </h2>

        <p className="text-muted">
          Here are some stories selected for you.
        </p>
      </div>

      <News
        key="for-you"
        pageSize={12}
        country="in"
        category="technology"
      />

    </div>
  );
};

export default ForYou;