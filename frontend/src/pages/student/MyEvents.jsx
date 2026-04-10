import React, { useEffect, useState } from "react";
import axios from "axios";
import StudentNavbar from "../../components/StudentNavbar";
import "./MyEvent.css";

function MyEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatDate = (date) => {
    if (!date) return "";
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  };

  const canMarkAttendance = (event_date, start_time) => {
    if (!event_date || !start_time) return false;

    const eventDateTime = new Date(`${event_date}T${start_time}`);

    const before5Min = new Date(eventDateTime.getTime() - 5 * 60 * 1000);
    const after20Min = new Date(eventDateTime.getTime() + 20 * 60 * 1000);

    const now = new Date();

    return now >= before5Min && now <= after20Min;
  };

  const handleAttendance = async (eventId) => {
    try {
      const student = JSON.parse(localStorage.getItem("student"));

      if (!student) {
        alert("Please login first ❗");
        return;
      }

      await axios.post("http://localhost:5000/api/student/attendance", {
        student_id: student.id,
        event_id: eventId
      });

      alert("Attendance Marked ✅");
      fetchMyEvents();

    } catch (err) {
      alert(err.response?.data?.message || "Already Marked ❌");
    }
  };

  const fetchMyEvents = async () => {
    try {
      setLoading(true);
      const student = JSON.parse(localStorage.getItem("student"));

      if (!student) {
        alert("Please login first ❗");
        return;
      }

      const res = await axios.get(
        `http://localhost:5000/api/student/my-events/${student.id}`
      );

      setEvents(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      alert("Error loading your events ❌");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyEvents();
  }, []);

  // Calculate statistics
  const totalEvents = events.length;
  const completedEvents = events.filter(e => e.attendance_marked).length;
  const upcomingEvents = events.filter(e => !e.attendance_marked && new Date(e.event_date) > new Date()).length;

  return (
    <>
      <StudentNavbar />

      <div className="myevents-page">
        {/* Animated Background */}
        <div className="myevents-background">
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

        <div className="myevents-container">
          <div className="container">
            <div className="myevents-card">
              
              {/* Header Section */}
              <div className="myevents-header">
                
                <h2 className="myevents-title">My Registered Events</h2>
                <p className="myevents-subtitle">Track and manage your event participation</p>
              </div>

              {/* Stats Section */}
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon">
                    <i className="bi bi-calendar-check-fill"></i>
                  </div>
                  <div className="stat-info">
                    <h3>{totalEvents}</h3>
                    <p>Total Events</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">
                    <i className="bi bi-check-circle-fill"></i>
                  </div>
                  <div className="stat-info">
                    <h3>{completedEvents}</h3>
                    <p>Completed</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">
                    <i className="bi bi-clock-fill"></i>
                  </div>
                  <div className="stat-info">
                    <h3>{upcomingEvents}</h3>
                    <p>Upcoming</p>
                  </div>
                </div>
              </div>

              {/* Loading State */}
              {loading && (
                <div className="loading-state">
                  <div className="loading-spinner"></div>
                  <p>Loading your events...</p>
                </div>
              )}

              {/* Events Grid */}
              {!loading && (
                <>
                  {events.length === 0 ? (
                    <div className="no-events">
                      <i className="bi bi-calendar-x-fill"></i>
                      <h3>No Events Registered</h3>
                      <p>You haven't registered for any events yet</p>
                      <button 
                        className="browse-events-btn"
                        onClick={() => window.location.href = "/student-events"}
                      >
                        <i className="bi bi-search me-2"></i>
                        Browse Events
                      </button>
                    </div>
                  ) : (
                    <div className="events-grid">
                      {events.map((event) => (
                        <div className="event-card" key={event.id}>
                          {/* Image Section */}
                          <div className="event-image-wrapper">
                            <img
                              src={`http://localhost:5000/uploads/${event.image}`}
                              alt={event.name}
                              className="event-image"
                            />
                            <div className={`attendance-status ${event.attendance_marked ? 'marked' : 'pending'}`}>
                              {event.attendance_marked ? '✓ Attendance Marked' : '⏳ Pending'}
                            </div>
                          </div>

                          {/* Content Section */}
                          <div className="event-content">
                            <h3 className="event-title">{event.name}</h3>
                            <p className="event-description">{event.description}</p>

                            {/* Event Details */}
                            <div className="event-details">
                              <div className="detail-item">
                                <i className="bi bi-calendar-event"></i>
                                <span>{formatDate(event.event_date)}</span>
                              </div>
                              <div className="detail-item">
                                <i className="bi bi-clock"></i>
                                <span>{event.start_time} - {event.end_time}</span>
                              </div>
                            </div>

                            {/* Attendance Button */}
                            {event.attendance_marked ? (
                              <button className="attendance-btn marked" disabled>
                                <i className="bi bi-check-circle-fill me-2"></i>
                                Attendance Marked
                              </button>
                            ) : canMarkAttendance(event.event_date, event.start_time) ? (
                              <button
                                className="attendance-btn available"
                                onClick={() => handleAttendance(event.id)}
                              >
                                <i className="bi bi-camera-fill me-2"></i>
                                Mark Attendance
                              </button>
                            ) : (
                              <button className="attendance-btn closed" disabled>
                                <i className="bi bi-clock-history me-2"></i>
                                Attendance Window Closed
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyEvents;