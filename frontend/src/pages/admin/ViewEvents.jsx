import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "../../components/AdminNavbar";
import { useNavigate } from "react-router-dom";
import "./ViewEvents.css";

function ViewEvents() {

  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  const formatDate = (date) => {
    if (!date) return "";
    const [year, month, day] = date.split("-");
    return `${parseInt(day)}/${parseInt(month)}/${year}`;
  };

  const fetchEvents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/events");
      setEvents(res.data);
    } catch (error) {
      console.log("Error fetching events");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete this event?")) {
      try {
        await axios.delete(
          `http://localhost:5000/api/admin/delete-event/${id}`
        );
        fetchEvents();
      } catch (error) {
        console.log("Error deleting event");
      }
    }
  };

  return (
    <>
      <AdminNavbar />

      <div className="view-container">
        <div className="container">
          <div className="view-card">

            <h2 className="text-center mb-4 view-title">
              📅 All Events
            </h2>

            <div className="table-responsive">
              <table className="table table-hover align-middle text-center custom-table">

                <thead>
                  <tr>
                    <th>S.no</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Event Date</th>
                    <th>Last Date</th>
                    <th>Time</th>
                    <th>Slots</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {events.length > 0 ? (
                    events.map((event, index) => (
                      <tr key={event.id}>

                        <td>{index + 1}</td>

                        <td>
                          {event.image && (
                            <img
                              src={`http://localhost:5000/uploads/${event.image}`}
                              alt="event"
                              className="event-image"
                            />
                          )}
                        </td>

                        <td className="fw-bold">{event.name}</td>

                        <td>
                          <span className="badge bg-info">
                            {event.category}
                          </span>
                        </td>

                        <td>{formatDate(event.event_date)}</td>
                        <td>{formatDate(event.register_last_date)}</td>

                        <td>
                          {event.start_time} - {event.end_time}
                        </td>

                        <td>
                          <span className="badge bg-success">
                            {event.available_slots} / {event.slot_count}
                          </span>
                        </td>

                        <td>
                          <button
                            className="btn btn-sm btn-edit me-2"
                            onClick={() => navigate(`/edit-event/${event.id}`)}
                          >
                            ✏ Edit
                          </button>

                          <button
                            className="btn btn-sm btn-delete"
                            onClick={() => handleDelete(event.id)}
                          >
                            🗑 Delete
                          </button>
                        </td>

                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9">No Events Found</td>
                    </tr>
                  )}
                </tbody>

              </table>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default ViewEvents;