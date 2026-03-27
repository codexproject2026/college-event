import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../../components/AdminNavbar";

function AdminRegistrations() {

  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  const isEventCompleted = (event_date, end_time) => {
    if (!event_date || !end_time) return false;

    const eventEnd = new Date(event_date + " " + end_time);
    const now = new Date();

    return now > eventEnd;
  };

  const handleComplete = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/admin/complete-event/${id}`
      );

      alert("Event marked as Completed ✅");
      fetchData();

    } catch (err) {
      console.log(err);
      alert("Error updating ❌");
    }
  };

  const fetchData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/admin/event-counts"
      );
      setEvents(res.data);
    } catch (error) {
      console.log(error);
      alert("Error loading data ❌");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <AdminNavbar />

      {/* 🔥 Gradient Background */}
      <div
        style={{
          minHeight: "100vh",
          backgroundImage:
            "linear-gradient(to top, #fad0c4 0%, #ffd1ff 100%)",
          padding: "40px 0",
        }}
      >
        <div className="container">

          {/* 🔥 Title */}
          <h2
            className="text-center mb-4 fw-bold"
            style={{ color: "#333" }}
          >
            📊 Event Registrations Dashboard
          </h2>

          {/* 🔥 Card */}
          <div
            className="p-4 shadow-lg"
            style={{
              borderRadius: "15px",
              background: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(10px)",
            }}
          >
            <table className="table table-hover text-center align-middle">

              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Event Name</th>
                  <th>Category</th>
                  <th>Total Registered</th>
                  <th>Slots Left</th>
                  <th>Action</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {events.length === 0 ? (
                  <tr>
                    <td colSpan="7">No data 😢</td>
                  </tr>
                ) : (
                  events.map((event, index) => (
                    <tr key={event.id}>
                      <td>{index + 1}</td>

                      <td className="fw-semibold">
                        {event.name}
                      </td>

                      <td>{event.category}</td>

                      <td>
                        <span
                          className="badge bg-success fs-6"
                        >
                          {event.total_registered}
                        </span>
                      </td>

                      <td>
                        <span className="badge bg-info text-dark fs-6">
                          {event.available_slots}
                        </span>
                      </td>

                      {/* VIEW BUTTON */}
                      <td>
                        <button
                          className="btn btn-primary btn-sm px-3"
                          style={{ borderRadius: "20px" }}
                          onClick={() =>
                            navigate(`/admin/event-registrations/${event.id}`)
                          }
                        >
                          View 👁
                        </button>
                      </td>

                      {/* STATUS */}
                      <td>
                        {event.status?.toLowerCase() === "completed" ? (

                          <button
                            className="btn btn-success btn-sm px-3"
                            disabled
                            style={{ borderRadius: "20px" }}
                          >
                            Completed ✅
                          </button>

                        ) : isEventCompleted(event.event_date, event.end_time) ? (

                          <button
                            className="btn btn-warning btn-sm px-3"
                            style={{ borderRadius: "20px" }}
                            onClick={() => handleComplete(event.id)}
                          >
                            Mark Completed
                          </button>

                        ) : (

                          <button
                            className="btn btn-secondary btn-sm px-3"
                            disabled
                            style={{ borderRadius: "20px" }}
                          >
                            Ongoing ⏳
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
    </>
  );
}

export default AdminRegistrations;