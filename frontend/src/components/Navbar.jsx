import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

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

  return (
    <nav className={`custom-navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Logo with Animation */}
        <Link to="/" className="navbar-logo" onClick={() => setMenuOpen(false)}>
          <div className="logo-wrapper">
            <div className="logo-icon">
              <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 4L35 12V28L20 36L5 28V12L20 4Z" stroke="currentColor" strokeWidth="2"/>
                <circle cx="20" cy="20" r="6" fill="currentColor"/>
              </svg>
            </div>
            <span className="logo-text">
              <span className="logo-event">Event</span>
              <span className="logo-manager">Manager</span>
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="nav-menu">
          <ul className="nav-list">
            <li className="nav-item">
              <Link 
                to="/" 
                className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
              >
                <span className="nav-link-text">Home</span>
                <span className="nav-indicator"></span>
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/about" 
                className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
              >
                <span className="nav-link-text">About</span>
                <span className="nav-indicator"></span>
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/admin-login" 
                className={`nav-link ${location.pathname === '/admin-login' ? 'active' : ''}`}
              >
                <span className="nav-link-text">Admin</span>
                <span className="nav-indicator"></span>
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/student-login" 
                className={`nav-link ${location.pathname === '/student-login' ? 'active' : ''}`}
              >
                <span className="nav-link-text">Student</span>
                <span className="nav-indicator"></span>
              </Link>
            </li>
          </ul>
        </div>

        

        {/* Mobile Menu */}
        <div className={`mobile-menu ${menuOpen ? 'active' : ''}`}>
          <div className="mobile-menu-header">
            <span className="mobile-menu-title">Menu</span>
            <button className="mobile-menu-close" onClick={() => setMenuOpen(false)}>
              ×
            </button>
          </div>
          <ul className="mobile-nav-list">
            <li className="mobile-nav-item">
              <Link to="/" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>
                <span className="mobile-link-icon">🏠</span>
                <span>Home</span>
              </Link>
            </li>
            <li className="mobile-nav-item">
              <Link to="/about" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>
                <span className="mobile-link-icon">ℹ️</span>
                <span>About</span>
              </Link>
            </li>
            <li className="mobile-nav-divider"></li>
            <li className="mobile-nav-item">
              <Link to="/admin-login" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>
                <span className="mobile-link-icon">👑</span>
                <span>Admin Login</span>
              </Link>
            </li>
            <li className="mobile-nav-item">
              <Link to="/student-login" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>
                <span className="mobile-link-icon">🎓</span>
                <span>Student Login</span>
              </Link>
            </li>
            
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;