import React from "react";
import News from "../components/News";

const Trending = () => {
  return (
    <div className="container py-4">

      <div className="mb-4">
        <span className="badge bg-danger mb-2">
          🔥 TRENDING
        </span>

        <h1 className="fw-bold">
          Trending News
        </h1>

        <p className="text-muted">
          Explore the latest stories and topics getting attention
          right now.
        </p>
      </div>

      <News
        key="trending"
        pageSize={12}
        country="in"
        category="general"
      />

    </div>
  );
};

export default Trending;