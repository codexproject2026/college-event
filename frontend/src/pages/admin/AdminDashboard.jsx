import React from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../../components/AdminNavbar";
import "./AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();

  // Quick action handlers
  const handleAddEvent = () => navigate("/add-event");
  const handleViewEvents = () => navigate("/view-events");
  const handleViewRegistrations = () => navigate("/admin-registrations");

  return (
    <>
      <AdminNavbar />
      
      <div className="admin-dashboard-page">
        {/* Animated Background */}
        <div className="dashboard-background">
          <div className="gradient-orb orb-1"></div>
          <div className="gradient-orb orb-2"></div>
          <div className="gradient-orb orb-3"></div>
          <div className="grid-pattern"></div>
        </div>

        {/* Floating Particles */}
        <div className="floating-particles">
          {[...Array(20)].map((_, i) => (
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

        {/* Dashboard Content */}
        <div className="dashboard-container">
          {/* Title with Icon */}
          <div className="dashboard-header">
            <div className="header-icon admin-icon">
              <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 4L35 12V28L20 36L5 28V12L20 4Z" stroke="url(#adminGradient)" strokeWidth="2"/>
                <circle cx="20" cy="20" r="6" fill="url(#adminGradient)"/>
                <path d="M20 16L26 20V26L20 30L14 26V20L20 16Z" stroke="white" strokeWidth="1.5" fill="url(#adminGradient)"/>
                <defs>
                  <linearGradient id="adminGradient" x1="5" y1="4" x2="35" y2="36" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#667eea"/>
                    <stop offset="1" stopColor="#764ba2"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <h2 className="dashboard-title">Admin Dashboard</h2>
            <p className="dashboard-subtitle">Manage events, registrations, and more</p>
          </div>

          {/* Main Action Cards Grid */}
          <div className="cards-wrapper">
            {/* Add Event Card */}
            <div className="dashboard-card card-primary">
              <div className="card-icon">
                <i className="bi bi-calendar-plus-fill"></i>
              </div>
              <h5>Create Event</h5>
              <p>Design and launch new college events with custom details, schedules, and venues.</p>
              <button
                className="btn btn-primary-btn"
                onClick={handleAddEvent}
              >
                <span>Create Event</span>
                <span className="button-icon">→</span>
              </button>
            </div>

            {/* View Events Card */}
            <div className="dashboard-card card-success">
              <div className="card-icon">
                <i className="bi bi-calendar-week-fill"></i>
              </div>
              <h5>Manage Events</h5>
              <p>View, edit, or remove existing events. Track participation and update details.</p>
              <button
                className="btn btn-success-btn"
                onClick={handleViewEvents}
              >
                <span>View Events</span>
                <span className="button-icon">→</span>
              </button>
            </div>

            {/* View Registrations Card */}
            <div className="dashboard-card card-warning">
              <div className="card-icon">
                <i className="bi bi-people-fill"></i>
              </div>
              <h5>Student Registrations</h5>
              <p>Monitor all student sign-ups, export data, and manage attendance lists.</p>
              <button
                className="btn btn-warning-btn"
                onClick={handleViewRegistrations}
              >
                <span>View Records</span>
                <span className="button-icon">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;