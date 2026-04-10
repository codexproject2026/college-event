import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./StudentNavbar.css";

function StudentNavbar() {

  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  // Close mobile menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    alert("Logged out successfully");
    navigate("/student-login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`student-navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Logo with Animation */}
        <Link to="/student-events" className="navbar-logo" onClick={() => setMenuOpen(false)}>
          <div className="logo-wrapper">
            <div className="logo-icon">
              <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 4L35 12V28L20 36L5 28V12L20 4Z" stroke="currentColor" strokeWidth="2"/>
                <circle cx="20" cy="20" r="6" fill="currentColor"/>
                <path d="M14 20L18 24L26 16" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="logo-text">
              <span className="logo-event">Student</span>
              <span className="logo-manager">Panel</span>
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="nav-menu">
          <ul className="nav-list">
            <li className="nav-item">
              <Link 
                to="/student-events" 
                className={`nav-link ${isActive("/student-events") ? 'active' : ''}`}
              >
                <span className="nav-link-text">
                  <i className="bi bi-calendar-event-fill me-2"></i>View Events
                </span>
                <span className="nav-indicator"></span>
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/my-events" 
                className={`nav-link ${isActive("/my-events") ? 'active' : ''}`}
              >
                <span className="nav-link-text">
                  <i className="bi bi-ticket-fill me-2"></i>My Events
                </span>
                <span className="nav-indicator"></span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Logout Button */}
        <div className="nav-actions">
          <button className="logout-button" onClick={handleLogout}>
            <span className="button-text">Logout</span>
            <span className="button-icon">→</span>
          </button>
        </div>

        {/* Mobile Toggle Button */}
        <button 
          className={`mobile-toggle ${menuOpen ? 'active' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="toggle-line"></span>
          <span className="toggle-line"></span>
          <span className="toggle-line"></span>
        </button>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${menuOpen ? 'active' : ''}`}>
          <div className="mobile-menu-header">
            <span className="mobile-menu-title">Student Menu</span>
            <button className="mobile-menu-close" onClick={() => setMenuOpen(false)}>
              ×
            </button>
          </div>
          <ul className="mobile-nav-list">
            <li className="mobile-nav-item">
              <Link to="/student-events" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>
                <span className="mobile-link-icon">
                  <i className="bi bi-calendar-event-fill"></i>
                </span>
                <span>View Events</span>
              </Link>
            </li>
            <li className="mobile-nav-item">
              <Link to="/my-events" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>
                <span className="mobile-link-icon">
                  <i className="bi bi-ticket-fill"></i>
                </span>
                <span>My Events</span>
              </Link>
            </li>
            <li className="mobile-nav-divider"></li>
            <li className="mobile-nav-item">
              <button className="mobile-nav-link logout-mobile" onClick={handleLogout}>
                <span className="mobile-link-icon">
                  <i className="bi bi-box-arrow-right"></i>
                </span>
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default StudentNavbar;