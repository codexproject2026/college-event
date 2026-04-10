import React, { useEffect, useState } from "react";
import axios from "axios";
import StudentNavbar from "../../components/StudentNavbar";
import "./EventList.css";
import Chatbot from "../../components/Chatbot";

function EventList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Format Date
  const formatDate = (date) => {
    if (!date) return "";
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  };

  // ✅ Check Expired
  const isExpired = (date) => {
    const today = new Date().toISOString().split("T")[0];
    return date < today;
  };

  // ✅ Fetch Events
  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "http://localhost:5000/api/student/events"
      );
      setEvents(res.data);
    } catch (error) {
      console.log("Error loading events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // ✅ Register Function (FIXED 🔥)
  const handleRegister = async (eventId) => {
    try {
      const studentData = localStorage.getItem("student");

      if (!studentData) {
        alert("Please login first ❗");
        return;
      }

      const student = JSON.parse(studentData);

      console.log("Student ID:", student.id);
      console.log("Event ID:", eventId);

      await axios.post(
        "http://localhost:5000/api/student/register-event",
        {
          // ✅ force number (important fix)
          student_id: Number(student.id),
          event_id: Number(eventId),
        }
      );

      alert("Registered Successfully ✅");

      fetchEvents(); // refresh UI
    } catch (error) {
      console.log(error);
      alert(
        error.response?.data?.message || "Something went wrong ❌"
      );
    }
  };

  return (
    <>
      <StudentNavbar />

      <div className="event-page">
        <div className="container">

          <div className="header-section text-center">
            <h1>🎉 Discover College Events</h1>
            <p>Join, Participate & Showcase Your Talent</p>
          </div>

          {/* ✅ Loading */}
          {loading && (
            <div className="text-center mt-4">
              <h4>Loading events...</h4>
            </div>
          )}

          <div className="row mt-5">
            {events.length === 0 && !loading && (
              <h5 className="text-center">No events available 😢</h5>
            )}

            {events.map((event) => (
              <div
                className="col-lg-4 col-md-6 mb-4"
                key={event.id}
              >
                <div className="modern-card">

                  {/* Image */}
                  <div className="card-image">
                    <img
                      src={`http://localhost:5000/uploads/${event.image}`}
                      alt="event"
                    />
                    <div className="category-badge">
                      {event.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="card-body-content">
                    <h4>{event.name}</h4>

                    <p className="description">
                      {event.description}
                    </p>

                    {/* Event Info */}
                    <div className="event-info">
                      <span>📅 {formatDate(event.event_date)}</span>
                      <span>
                        🛑 Last Date:{" "}
                        {formatDate(event.register_last_date)}
                      </span>
                      <span>
                        ⏰ {event.start_time} - {event.end_time}
                      </span>
                    </div>

                    {/* Slots */}
                    <p className="slots">
                      🎟 Slots Left:{" "}
                      {event.available_slots ?? "N/A"}
                    </p>

                    {/* Button */}
                    <button
                      className="premium-btn"
                      disabled={
                        isExpired(event.register_last_date) ||
                        event.available_slots === 0
                      }
                      onClick={() =>
                        handleRegister(event.id)
                      }
                    >
                      {isExpired(event.register_last_date)
                        ? "Closed ❌"
                        : event.available_slots === 0
                        ? "Full 🚫"
                        : "Register Now →"}
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      <Chatbot />
    </>
  );
}

export default EventList;