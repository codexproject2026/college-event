import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./AdminNavbar.css";

function AdminNavbar() {

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
    navigate("/admin-login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`admin-navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Logo with Animation */}
        <Link to="/admin-dashboard" className="navbar-logo" onClick={() => setMenuOpen(false)}>
          <div className="logo-wrapper">
            <div className="logo-icon">
              <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 4L35 12V28L20 36L5 28V12L20 4Z" stroke="currentColor" strokeWidth="2"/>
                <circle cx="20" cy="20" r="6" fill="currentColor"/>
                <path d="M16 20L19 23L24 17" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="logo-text">
              <span className="logo-event">Admin</span>
              <span className="logo-manager">Panel</span>
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="nav-menu">
          <ul className="nav-list">
            <li className="nav-item">
              <Link 
                to="/admin-dashboard" 
                className={`nav-link ${isActive("/admin-dashboard") ? 'active' : ''}`}
              >
                <span className="nav-link-text">
                  <i className="bi bi-speedometer2 me-2"></i>Dashboard
                </span>
                <span className="nav-indicator"></span>
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/add-event" 
                className={`nav-link ${isActive("/add-event") ? 'active' : ''}`}
              >
                <span className="nav-link-text">
                  <i className="bi bi-calendar-plus-fill me-2"></i>Add Event
                </span>
                <span className="nav-indicator"></span>
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/view-events" 
                className={`nav-link ${isActive("/view-events") ? 'active' : ''}`}
              >
                <span className="nav-link-text">
                  <i className="bi bi-calendar-week-fill me-2"></i>View Events
                </span>
                <span className="nav-indicator"></span>
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/admin-registrations" 
                className={`nav-link ${isActive("/admin-registrations") ? 'active' : ''}`}
              >
                <span className="nav-link-text">
                  <i className="bi bi-people-fill me-2"></i>Registrations
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
            <span className="mobile-menu-title">Admin Menu</span>
            <button className="mobile-menu-close" onClick={() => setMenuOpen(false)}>
              ×
            </button>
          </div>
          <ul className="mobile-nav-list">
            <li className="mobile-nav-item">
              <Link to="/admin-dashboard" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>
                <span className="mobile-link-icon">
                  <i className="bi bi-speedometer2"></i>
                </span>
                <span>Dashboard</span>
              </Link>
            </li>
            <li className="mobile-nav-item">
              <Link to="/add-event" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>
                <span className="mobile-link-icon">
                  <i className="bi bi-calendar-plus-fill"></i>
                </span>
                <span>Add Event</span>
              </Link>
            </li>
            <li className="mobile-nav-item">
              <Link to="/view-events" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>
                <span className="mobile-link-icon">
                  <i className="bi bi-calendar-week-fill"></i>
                </span>
                <span>View Events</span>
              </Link>
            </li>
            <li className="mobile-nav-item">
              <Link to="/admin-registrations" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>
                <span className="mobile-link-icon">
                  <i className="bi bi-people-fill"></i>
                </span>
                <span>Registrations</span>
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

export default AdminNavbar;