import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../../components/AdminNavbar";
import "./AdminRegistrations.css";

function AdminRegistrations() {

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const isEventCompleted = (event_date, end_time) => {
    if (!event_date || !end_time) return false;
    const eventEnd = new Date(`${event_date}T${end_time}`);
    const now = new Date();
    return now > eventEnd;
  };

  const handleComplete = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/complete-event/${id}`);
      alert("Event marked as Completed ✅");
      fetchData();
    } catch (err) {
      console.log(err);
      alert("Error updating ❌");
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/admin/event-counts");
      setEvents(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      alert("Error loading data ❌");
      setLoading(false);
    }
  };

  const handleSendCertificate = async (eventId) => {
    try {
      await axios.post(`http://localhost:5000/api/admin/send-certificates/${eventId}`);
      alert("Certificates Sent ✅");
    } catch (err) {
      console.log(err);
      alert("Error sending certificates ❌");
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  // Calculate statistics
  const totalRegistered = events.reduce((sum, event) => sum + (event.total_registered || 0), 0);
  const totalEvents = events.length;
  const completedEvents = events.filter(event => event.status?.toLowerCase() === "completed").length;

  return (
    <>
      <AdminNavbar />

      <div className="registrations-page">
        {/* Animated Background */}
        <div className="registrations-background">
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

        <div className="registrations-container">
          <div className="container">
            <div className="registrations-card">
              
              {/* Header Section */}
              <div className="registrations-header">
                
                <h2 className="registrations-title">Event Registrations Dashboard</h2>
                <p className="registrations-subtitle">Track and manage all event registrations</p>
              </div>

              {/* Stats Section */}
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon">
                    <i className="bi bi-calendar-event-fill"></i>
                  </div>
                  <div className="stat-info">
                    <h3>{totalEvents}</h3>
                    <p>Total Events</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">
                    <i className="bi bi-people-fill"></i>
                  </div>
                  <div className="stat-info">
                    <h3>{totalRegistered}</h3>
                    <p>Total Registrations</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">
                    <i className="bi bi-check-circle-fill"></i>
                  </div>
                  <div className="stat-info">
                    <h3>{completedEvents}</h3>
                    <p>Completed Events</p>
                  </div>
                </div>
              </div>

              <div className="table-responsive">
                <table className="registrations-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Event Name</th>
                      <th>Category</th>
                      <th>Total Registered</th>
                      <th>Slots Left</th>
                      <th>Action</th>
                      <th>Status</th>
                      <th>Certificate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan="8" className="loading-state">
                          <div className="loading-content">
                            <i className="bi bi-hourglass-split"></i>
                            <p>Loading registrations...</p>
                          </div>
                        </td>
                      </tr>
                    ) : events.length === 0 ? (
                      <tr>
                        <td colSpan="8" className="no-data-state">
                          <div className="no-data-content">
                            <i className="bi bi-inbox-fill"></i>
                            <p>No registrations found</p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      events.map((event, index) => (
                        <tr key={event.id}>
                          <td className="serial-no">{index + 1}</td>
                          <td className="event-name">{event.name}</td>
                          <td>
                            <span className={`category-badges category-${event.category?.toLowerCase()}`}>
                              {event.category}
                            </span>
                          </td>
                          <td>
                            <span className="registered-badge">
                              {event.total_registered}
                            </span>
                          </td>
                          <td>
                            <span className="slots-badge">
                              {event.available_slots}
                            </span>
                          </td>
                          <td>
                            <button
                              className="btn-view"
                              onClick={() => navigate(`/admin/event-registrations/${event.id}`)}
                            >
                              <i className="bi bi-eye-fill me-1"></i>
                              View Details
                            </button>
                          </td>
                          <td>
                            {event.status?.toLowerCase() === "completed" ? (
                              <button className="status-badge completed" disabled>
                                <i className="bi bi-check-circle-fill me-1"></i>
                                Completed
                              </button>
                            ) : isEventCompleted(event.event_date, event.end_time) ? (
                              <button
                                className="status-badge pending"
                                onClick={() => handleComplete(event.id)}
                              >
                                <i className="bi bi-clock-history me-1"></i>
                                Mark Completed
                              </button>
                            ) : (
                              <button className="status-badge ongoing" disabled>
                                <i className="bi bi-play-circle-fill me-1"></i>
                                Ongoing
                              </button>
                            )}
                          </td>
                          <td>
                            {event.status?.toLowerCase() === "completed" ? (
                              <button
                                className="certificate-btn"
                                onClick={() => handleSendCertificate(event.id)}
                              >
                                <i className="bi bi-envelope-fill me-1"></i>
                                Send
                              </button>
                            ) : (
                              <button className="certificate-btn disabled" disabled>
                                <i className="bi bi-lock-fill me-1"></i>
                                Not Available
                              </button>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminRegistrations;