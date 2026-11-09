import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import NavBar from "./components/NavBar";
import News from "./components/News";

import Home from "./pages/Home";
import Latest from "./pages/Latest";
import Trending from "./pages/Trending";
import ForYou from "./pages/ForYou";
import Search from "./pages/Search";
import Profile from "./pages/Profile";
import SavedNews from "./pages/SavedNews";

function App() {
  return (
    <BrowserRouter>

      <div className="app">

        <NavBar />

        <main className="main-content">

          <Routes>

            {/* Main Pages */}
            <Route
              path="/"
              element={<Home />}
            />

            <Route
              path="/latest"
              element={<Latest />}
            />

            <Route
              path="/trending"
              element={<Trending />}
            />

            <Route
              path="/for-you"
              element={<ForYou />}
            />

            <Route
              path="/search"
              element={<Search />}
            />

            <Route
              path="/profile"
              element={<Profile />}
            />

            {/* Saved News */}
            <Route
              path="/saved-news"
              element={<SavedNews />}
            />

            {/* News Categories */}
            <Route
              path="/business"
              element={
                <News
                  key="business"
                  pageSize={6}
                  country="in"
                  category="business"
                />
              }
            />

            <Route
              path="/entertainment"
              element={
                <News
                  key="entertainment"
                  pageSize={6}
                  country="in"
                  category="entertainment"
                />
              }
            />

            <Route
              path="/general"
              element={
                <News
                  key="general"
                  pageSize={6}
                  country="in"
                  category="general"
                />
              }
            />

            <Route
              path="/health"
              element={
                <News
                  key="health"
                  pageSize={6}
                  country="in"
                  category="health"
                />
              }
            />

            <Route
              path="/science"
              element={
                <News
                  key="science"
                  pageSize={6}
                  country="in"
                  category="science"
                />
              }
            />

            <Route
              path="/sports"
              element={
                <News
                  key="sports"
                  pageSize={6}
                  country="in"
                  category="sports"
                />
              }
            />

            <Route
              path="/technology"
              element={
                <News
                  key="technology"
                  pageSize={6}
                  country="in"
                  category="technology"
                />
              }
            />

            {/* Invalid URL */}
            <Route
              path="*"
              element={
                <Navigate
                  to="/"
                  replace
                />
              }
            />

          </Routes>

        </main>

      </div>

    </BrowserRouter>
  );
}

export default App;
