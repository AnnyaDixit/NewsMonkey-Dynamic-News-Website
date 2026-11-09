import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  loginUser,
  registerUser,
  saveToken,
  getToken,
  logoutUser
} from "../services/authService";

const Profile = () => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  // Check login status when Profile page opens
  useEffect(() => {
    const token = getToken();

    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // Login
  const handleLogin = async (e) => {
    e.preventDefault();

    setMessage("");

    try {
      const data = await loginUser({
        email,
        password
      });

      saveToken(data.token);

      setIsLoggedIn(true);

      setMessage("Login successful! Welcome to NewsMonkey AI.");
      setMessageType("success");

      setTimeout(() => {
        navigate("/");
      }, 1000);

    } catch (error) {
      setMessage(error.message);
      setMessageType("danger");
    }
  };

  // Register
  const handleRegister = async (e) => {
    e.preventDefault();

    setMessage("");

    try {
      await registerUser({
        name,
        email,
        password
      });

      setMessage(
        "Registration successful! Please login to continue."
      );

      setMessageType("success");

      setName("");
      setPassword("");

      setIsLogin(true);

    } catch (error) {
      setMessage(error.message);
      setMessageType("danger");
    }
  };

  // Logout
  const handleLogout = () => {
    logoutUser();

    setIsLoggedIn(false);

    setMessage("You have been logged out successfully.");
    setMessageType("success");

    setEmail("");
    setPassword("");
  };

  // Logged-in screen
  if (isLoggedIn) {
    return (
      <div className="container mt-5">

        <div className="card shadow p-4">

          <h2 className="text-center mb-3">
            NewsMonkey AI Profile
          </h2>

          <div className="text-center">

            <h4 className="text-success">
              ✓ You are logged in
            </h4>

            <p className="text-muted">
              You can now save news articles and access
              your personalized features.
            </p>

            <button
              className="btn btn-danger"
              onClick={handleLogout}
            >
              Logout
            </button>

          </div>

          {message && (
            <div className="alert alert-success mt-3">
              {message}
            </div>
          )}

        </div>

      </div>
    );
  }

  // Login / Register screen
  return (
    <div className="container mt-5">

      <div
        className="card shadow p-4"
        style={{
          maxWidth: "500px",
          margin: "auto"
        }}
      >

        <h2 className="text-center mb-4">
          NewsMonkey AI
        </h2>

        {/* Login / Register buttons */}
        <div className="text-center mb-3">

          <button
            className={
              isLogin
                ? "btn btn-primary me-2"
                : "btn btn-outline-primary me-2"
            }
            onClick={() => {
              setIsLogin(true);
              setMessage("");
            }}
          >
            Login
          </button>

          <button
            className={
              !isLogin
                ? "btn btn-primary"
                : "btn btn-outline-primary"
            }
            onClick={() => {
              setIsLogin(false);
              setMessage("");
            }}
          >
            Register
          </button>

        </div>

        {/* Login Form */}
        {isLogin ? (

          <form onSubmit={handleLogin}>

            <div className="mb-3">

              <label className="form-label">
                Email
              </label>

              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />

            </div>

            <div className="mb-3">

              <label className="form-label">
                Password
              </label>

              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />

            </div>

            <button
              type="submit"
              className="btn btn-primary w-100"
            >
              Login
            </button>

          </form>

        ) : (

          /* Register Form */
          <form onSubmit={handleRegister}>

            <div className="mb-3">

              <label className="form-label">
                Name
              </label>

              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
              />

            </div>

            <div className="mb-3">

              <label className="form-label">
                Email
              </label>

              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />

            </div>

            <div className="mb-3">

              <label className="form-label">
                Password
              </label>

              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                required
              />

            </div>

            <button
              type="submit"
              className="btn btn-success w-100"
            >
              Create Account
            </button>

          </form>
        )}

        {/* Message */}
        {message && (
          <div className={`alert alert-${messageType} mt-3`}>
            {message}
          </div>
        )}

      </div>

    </div>
  );
};

export default Profile;
