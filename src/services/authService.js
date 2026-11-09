const API_URL = "http://localhost:5000/api/auth";

// Register user
export const registerUser = async (userData) => {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userData)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Registration failed");
  }

  return data;
};

// Login user
export const loginUser = async (userData) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userData)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
};

// Save JWT token
export const saveToken = (token) => {
  localStorage.setItem("newsmonkey_token", token);
};

// Get JWT token
export const getToken = () => {
  return localStorage.getItem("newsmonkey_token");
};

// Check whether user is logged in
export const isLoggedIn = () => {
  const token = localStorage.getItem("newsmonkey_token");

  return !!token;
};

// Logout user
export const logoutUser = () => {
  localStorage.removeItem("newsmonkey_token");
};
