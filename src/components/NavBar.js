import React from "react";
import { NavLink, Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-sm">
      <div className="container-fluid px-4">

       

        {/* Brand */}
        <Link className="navbar-brand fw-bold fs-4" to="/">
          📰 NewsMonkey <span className="text-info">AI</span>
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#newsNavbar"
          aria-controls="newsNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation */}
        <div className="collapse navbar-collapse" id="newsNavbar">

          <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                🏠 Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/latest">
                🆕 Latest
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/trending">
                🔥 Trending
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/for-you">
                ✨ For You
              </NavLink>
            </li>

            {/* Categories */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="/"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                onClick={(e) => e.preventDefault()}
              >
                📂 Categories
              </a>

              <ul className="dropdown-menu shadow">

                <li>
                  <Link className="dropdown-item" to="/business">
                    💼 Business
                  </Link>
                </li>

                <li>
                  <Link className="dropdown-item" to="/entertainment">
                    🎬 Entertainment
                  </Link>
                </li>

                <li>
                  <Link className="dropdown-item" to="/health">
                    🏥 Health
                  </Link>
                </li>

                <li>
                  <Link className="dropdown-item" to="/science">
                    🔬 Science
                  </Link>
                </li>

                <li>
                  <Link className="dropdown-item" to="/sports">
                    ⚽ Sports
                  </Link>
                </li>

                <li>
                  <Link className="dropdown-item" to="/technology">
                    💻 Technology
                  </Link>
                </li>

                <li>
                  <Link className="dropdown-item" to="/general">
                    🌎 General
                  </Link>
                </li>

              </ul>
            </li>

            {/* AI */}
            <li className="nav-item">
              <NavLink className="nav-link text-info fw-semibold" to="/ai-assistant">
                🤖 AI Assistant
              </NavLink>
            </li>

          </ul>

          {/* Right Side */}
          <div className="d-flex align-items-center gap-2">

            <Link
              to="/search"
              className="btn btn-outline-light btn-sm"
            >
             🔍Search
            </Link>
<Link
  to="/saved-news"
  className="btn btn-outline-warning btn-sm"
>
  🔖 Saved
</Link>
            <Link
              to="/profile"
              className="btn btn-info btn-sm"
            >
              👤 Profile
            </Link>

          </div>

        </div>
      </div>
    </nav>
  );
};

export default NavBar;