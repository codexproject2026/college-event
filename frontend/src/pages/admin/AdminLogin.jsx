import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import "./AdminLogin.css";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Add animation class to card after mount
    const card = document.querySelector('.login-card');
    if (card) {
      setTimeout(() => {
        card.classList.add('animate-in');
      }, 100);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/admin/login",
        {
          email: email,
          password: password
        }
      );

      setMessageType("success");
      setMessage("Login successful! Redirecting... ✅");
      
      // Store token in localStorage
      if (res.data.token) {
        localStorage.setItem("adminToken", res.data.token);
        localStorage.setItem("adminEmail", email);
      }

      // Redirect after delay
      setTimeout(() => {
        window.location.href = "/admin-dashboard";
      }, 1500);

      console.log(res.data);

    } catch (error) {
      setMessageType("error");
      setMessage(error.response?.data?.message || "Invalid Credentials ❌");
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      
      <div className="admin-login-page">
        {/* Animated Background */}
        <div className="login-background">
          <div className="gradient-orb orb-1"></div>
          <div className="gradient-orb orb-2"></div>
          <div className="gradient-orb orb-3"></div>
          <div className="grid-pattern"></div>
        </div>

        {/* Floating Particles */}
        <div className="floating-particles">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${15 + Math.random() * 10}s`,
                width: `${2 + Math.random() * 4}px`,
                height: `${2 + Math.random() * 4}px`
              }}
            />
          ))}
        </div>

        {/* Login Form - Fixed positioning */}
        <div className="login-container">
          <div className="login-form-wrapper">
            <div className="login-card">
              <div className="card-header">
                <div className="header-icon">
                  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 4L35 12V28L20 36L5 28V12L20 4Z" stroke="url(#gradient)" strokeWidth="2"/>
                    <circle cx="20" cy="20" r="6" fill="url(#gradient)"/>
                    <defs>
                      <linearGradient id="gradient" x1="5" y1="4" x2="35" y2="36" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#667eea"/>
                        <stop offset="1" stopColor="#764ba2"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <h2>Admin Login</h2>
                
              </div>

              {message && (
                <div className={`message-alert ${messageType}`}>
                  <span className="message-icon">
                    {messageType === 'success' ? '✅' : '⚠️'}
                  </span>
                  <span>{message}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="login-form">
                <div className="form-group">
                  <label htmlFor="email">
                    <span className="label-icon">📧</span>
                    Email Address
                  </label>
                  <div className="input-wrapper">
                    <input
                      type="email"
                      id="email"
                      className="form-input"
                      placeholder="admin@college.edu"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="password">
                    <span className="label-icon">🔒</span>
                    Password
                  </label>
                  <div className="input-wrapper password-wrapper">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      className="form-input"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? "👁️" : "👁️‍🗨️"}
                    </button>
                  </div>
                </div>

                

                <button 
                  type="submit" 
                  className={`login-button ${loading ? 'loading' : ''}`}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner"></span>
                      <span>Logging in...</span>
                    </>
                  ) : (
                    <>
                      <span>Login to Dashboard</span>
                      <span className="button-icon">→</span>
                    </>
                  )}
                </button>
              </form>

              
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminLogin;