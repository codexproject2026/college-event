import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import "./StudentRegister.css";

function StudentRegister() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    department: "",
    interest_event: "",
    password: ""
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Add animation class to card after mount
    const card = document.querySelector('.student-register-card');
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
      await axios.post(
        "http://localhost:5000/api/student/register",
        formData
      );

      setMessageType("success");
      setMessage("Registration Successful! Redirecting to login... ✅");

      // Clear form after successful registration
      setFormData({
        name: "",
        email: "",
        mobile: "",
        department: "",
        interest_event: "",
        password: ""
      });

      // Redirect to login after delay
      setTimeout(() => {
        navigate("/student-login");
      }, 2000);

    } catch (error) {
      setMessageType("error");
      setMessage(error.response?.data?.message || "Email already exists ❌");
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      
      <div className="student-register-page">
        {/* Animated Background */}
        <div className="register-background">
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

        {/* Register Form */}
        <div className="register-container">
          <div className="register-form-wrapper">
            <div className="student-register-card">
              <div className="card-header">
                <div className="header-icon student-icon">
                  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 4L35 12V28L20 36L5 28V12L20 4Z" stroke="url(#studentGradient)" strokeWidth="2"/>
                    <circle cx="20" cy="20" r="6" fill="url(#studentGradient)"/>
                    <path d="M20 16L26 20V26L20 30L14 26V20L20 16Z" stroke="white" strokeWidth="1.5" fill="url(#studentGradient)"/>
                    <path d="M15 10L25 10L28 15L20 20L12 15L15 10Z" fill="url(#studentGradient)" opacity="0.8"/>
                    <defs>
                      <linearGradient id="studentGradient" x1="5" y1="4" x2="35" y2="36" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#4CAF50"/>
                        <stop offset="1" stopColor="#45a049"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <h2 className="student-title">Create Account</h2>
                <p className="register-subtitle">Join our student community and explore amazing events</p>
              </div>

              {message && (
                <div className={`message-alert ${messageType}`}>
                  <span className="message-icon">
                    {messageType === 'success' ? '✅' : '⚠️'}
                  </span>
                  <span>{message}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="register-form">
                {/* Row 1: Name and Email - Two Fields */}
                <div className="form-row two-columns">
                  <div className="form-group half-width">
                    <label htmlFor="name">
                      <span className="label-icon">👤</span>
                      Full Name
                    </label>
                    <div className="input-wrapper">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="form-input"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group half-width">
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
                </div>

                {/* Row 2: Mobile and Department - Two Fields */}
                <div className="form-row two-columns">
                  <div className="form-group half-width">
                    <label htmlFor="mobile">
                      <span className="label-icon">📱</span>
                      Mobile Number
                    </label>
                    <div className="input-wrapper">
                      <input
                        type="text"
                        name="mobile"
                        id="mobile"
                        className="form-input"
                        placeholder="Enter mobile number"
                        value={formData.mobile}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group half-width">
                    <label htmlFor="department">
                      <span className="label-icon">🏛️</span>
                      Department
                    </label>
                    <div className="input-wrapper">
                      <input
                        type="text"
                        name="department"
                        id="department"
                        className="form-input"
                        placeholder="Your department"
                        value={formData.department}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Row 3: Interest Category and Password - Two Fields */}
                <div className="form-row two-columns">
                  <div className="form-group half-width">
                    <label htmlFor="interest_event">
                      <span className="label-icon">🎯</span>
                      Interested Category
                    </label>
                    <div className="input-wrapper">
                      <select
                        name="interest_event"
                        id="interest_event"
                        className="form-select"
                        value={formData.interest_event}
                        onChange={handleChange}
                        required
                      >
                        <option value="" disabled>Select category</option>
                        <option value="Technical">💻 Technical</option>
                        <option value="Cultural">🎭 Cultural</option>
                        <option value="Sports">⚽ Sports</option>
                        <option value="Workshop">🔧 Workshop</option>
                        <option value="Seminar">📚 Seminar</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group half-width">
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
                        placeholder="Create password"
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
                </div>

                {/* Row 4: Password Hint - Full Width (Optional) */}
                <div className="form-row full-width">
                  <small className="input-hint">Password must be at least 6 characters</small>
                </div>

                {/* Row 5: Submit Button - Full Width */}
                <div className="form-row full-width">
                  <button 
                    type="submit" 
                    className={`register-button student-button ${loading ? 'loading' : ''}`}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner"></span>
                        <span>Creating Account...</span>
                      </>
                    ) : (
                      <>
                        <span>Create Account</span>
                        <span className="button-icon">→</span>
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Login Link */}
              <div className="card-footer">
                <p className="login-text">
                  Already have an account?{" "}
                  <Link to="/student-login" className="login-link">
                    Sign in here
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

export default StudentRegister;