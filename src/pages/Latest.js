import React from "react";
import News from "../components/News";

const Latest = () => {
  return (
    <div className="container py-4">

      <div className="mb-4">
        <h1 className="fw-bold">📰 Latest News</h1>

        <p className="text-muted">
          Get the latest news and updates from India.
        </p>
      </div>

      <News
        key="latest"
        pageSize={12}
        country="in"
        category="general"
      />

    </div>
  );
};

export default Latest;