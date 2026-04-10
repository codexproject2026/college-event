import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "../../components/AdminNavbar";
import { useNavigate } from "react-router-dom";
import "./ViewEvents.css";

function ViewEvents() {

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const formatDate = (date) => {
    if (!date) return "";
    const [year, month, day] = date.split("-");
    return `${parseInt(day)}/${parseInt(month)}/${year}`;
  };

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/admin/events");
      setEvents(res.data);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching events");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await axios.delete(
          `http://localhost:5000/api/admin/delete-event/${id}`
        );
        fetchEvents();
      } catch (error) {
        console.log("Error deleting event");
        alert("Failed to delete event");
      }
    }
  };

  return (
    <>
      <AdminNavbar />

      <div className="view-events-page">
        {/* Animated Background */}
        <div className="events-background">
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

        <div className="view-container">
          <div className="container">
            <div className="view-card">
              
              {/* Header Section */}
              <div className="view-header">
                
                <h2 className="view-title">All Events</h2>
                <p className="view-subtitle">Manage and monitor all your college events</p>
              </div>

              <div className="table-responsive">
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Image</th>
                      <th>Event Name</th>
                      <th>Category</th>
                      <th>Event Date</th>
                      <th>Last Date</th>
                      <th>Time</th>
                      <th>Slots</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan="9" className="loading-row">
                          <div className="no-data-content">
                            <i className="bi bi-hourglass-split"></i>
                            <p>Loading events...</p>
                          </div>
                        </td>
                      </tr>
                    ) : events.length > 0 ? (
                      events.map((event, index) => (
                        <tr key={event.id}>
                          <td className="serial-no">{index + 1}</td>
                          <td>
                            {event.image && (
                              <img
                                src={`http://localhost:5000/uploads/${event.image}`}
                                alt={event.name}
                                className="event-images"
                              />
                            )}
                          </td>
                          <td className="event-name">{event.name}</td>
                          <td>
                            <span className={`category-badges category-${event.category?.toLowerCase()}`}>
                              {event.category}
                            </span>
                          </td>
                          <td>{formatDate(event.event_date)}</td>
                          <td>{formatDate(event.register_last_date)}</td>
                          <td className="event-time">
                            {event.start_time} - {event.end_time}
                          </td>
                          <td>
                            <div className="slot-progress">
                              <div 
                                className="slot-progress-bar" 
                                style={{ 
                                  width: `${(event.available_slots / event.slot_count) * 100}%` 
                                }}
                              ></div>
                              <span className="slot-text">
                                {event.available_slots} / {event.slot_count}
                              </span>
                            </div>
                          </td>
                          <td>
                            <div className="action-buttons">
                              <button
                                className="btn-action btn-edit"
                                onClick={() => navigate(`/edit-event/${event.id}`)}
                                title="Edit Event"
                              >
                                <i className="bi bi-pencil-fill"></i>
                              </button>
                              <button
                                className="btn-action btn-delete"
                                onClick={() => handleDelete(event.id)}
                                title="Delete Event"
                              >
                                <i className="bi bi-trash-fill"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="9" className="no-data">
                          <div className="no-data-content">
                            <i className="bi bi-calendar-x-fill"></i>
                            <p>No Events Found</p>
                            <button 
                              className="btn-create-event"
                              onClick={() => navigate("/add-event")}
                            >
                              <i className="bi bi-plus-circle-fill me-2"></i>
                              Create Your First Event
                            </button>
                          </div>
                        </td>
                      </tr>
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

export default ViewEvents;