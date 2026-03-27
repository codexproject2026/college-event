import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import "./StudentLogin.css";

function StudentLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Add animation class to card after mount
    const card = document.querySelector('.student-login-card');
    if (card) {
      setTimeout(() => {
        card.classList.add('animate-in');
      }, 100);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setMessage("");

  try {
    const res = await axios.post(
      "http://localhost:5000/api/student/login",
      formData
    );

    // ✅ IMPORTANT LINE
    localStorage.setItem("student", JSON.stringify(res.data.student));

    setMessageType("success");
    setMessage("Login Successful! Redirecting... ✅");

    setTimeout(() => {
      navigate("/student-events");
    }, 1500);

  } catch (error) {
    setMessageType("error");
    setMessage(error.response?.data?.message || "Invalid Credentials ❌");
    setLoading(false);
  }
};

  return (
    <>
      <Navbar />
      
      <div className="student-login-page">
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

        {/* Login Form */}
        <div className="login-container">
          <div className="login-form-wrapper">
            <div className="student-login-card">
              <div className="card-header">
                <div className="header-icon student-icon">
                  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 4L35 12V28L20 36L5 28V12L20 4Z" stroke="url(#studentGradient)" strokeWidth="2"/>
                    <circle cx="20" cy="20" r="6" fill="url(#studentGradient)"/>
                    <path d="M20 16L26 20V26L20 30L14 26V20L20 16Z" stroke="white" strokeWidth="1.5" fill="url(#studentGradient)"/>
                    <defs>
                      <linearGradient id="studentGradient" x1="5" y1="4" x2="35" y2="36" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#4CAF50"/>
                        <stop offset="1" stopColor="#45a049"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <h2 className="student-title">Student Login</h2>
               
              </div>

              {message && (
                <div className={`message-alert ${messageType}`}>
                  <span className="message-icon">
                    {messageType === 'success' ? '✅' : '⚠️'}
                  </span>
                  <span>{message}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                  <label htmlFor="email">
                    <span className="label-icon">📧</span>
                    Email Address
                  </label>
                  <div className="input-wrapper">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="form-input"
                      placeholder="student@college.edu"
                      value={formData.email}
                      onChange={handleChange}
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
                      name="password"
                      id="password"
                      className="form-input"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
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
                  className={`login-button student-button ${loading ? 'loading' : ''}`}
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

              {/* Register Link */}
              <div className="card-footer">
                <p className="register-text">
                  Don't have an account?{" "}
                  <Link to="/student-register" className="register-link">
                    Register here
                  </Link>
                </p>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StudentLogin;