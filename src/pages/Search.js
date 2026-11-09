import React, { useState } from "react";
import News from "../components/News";

const Search = () => {
  const [query, setQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    if (query.trim() !== "") {
      setSearchQuery(query.trim());
    }
  };

  return (
    <div className="container py-4">

      {/* Header */}
      <div className="text-center mb-4">
        <span className="badge bg-primary mb-2">
          🔍 NEWS SEARCH
        </span>

        <h1 className="fw-bold">
          Search News
        </h1>

        <p className="text-muted">
          Search for news about any topic you're interested in.
        </p>
      </div>

      {/* Search Box */}
      <div className="row justify-content-center mb-5">
        <div className="col-lg-8">

          <form onSubmit={handleSearch}>
            <div className="input-group input-group-lg">

              <input
                type="text"
                className="form-control"
                placeholder="Search news... e.g. Artificial Intelligence"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />

              <button
                className="btn btn-dark"
                type="submit"
              >
                🔍 Search
              </button>

            </div>
          </form>

        </div>
      </div>

      {/* Search Result */}
      {searchQuery && (
        <div>

          <div className="mb-4">
            <h3 className="fw-bold">
              Results for "{searchQuery}"
            </h3>

            <p className="text-muted">
              News related to your search.
            </p>
          </div>

          <News
  key={searchQuery}
  pageSize={12}
  country="in"
  category="general"
  query={searchQuery}
/>

        </div>
      )}

      {/* Initial State */}
      {!searchQuery && (
        <div className="text-center py-5">

          <div style={{ fontSize: "70px" }}>
            🔎
          </div>

          <h3 className="fw-bold mt-3">
            What are you looking for?
          </h3>

          <p className="text-muted">
            Enter a topic above to discover news.
          </p>

        </div>
      )}

    </div>
  );
};

export default Search;