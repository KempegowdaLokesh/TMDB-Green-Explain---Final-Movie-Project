import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const LoginPage = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // If already logged in, redirect to home
    if (localStorage.getItem("isLoggedIn") === "true") {
      navigate("/"); // Redirect to home
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "Kempegowda Lokesh" && password === "Lokesh@143") {
      localStorage.setItem("isLoggedIn", "true");
      setIsLoggedIn(true); // Set the login state to true
      navigate("/"); // Redirect to homepage after login
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit} autoComplete="on"> {/* Added autoComplete here */}
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username" // Added the id attribute
              name="username" // Added the name attribute
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
              autoComplete="username" // Added autoComplete for username
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password" // Added the id attribute
              name="password" // Added the name attribute
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              autoComplete="current-password" // Added autoComplete for password
            />
          </div>
          <button type="submit" className="login-btn">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
