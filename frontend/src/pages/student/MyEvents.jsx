import React, { useEffect, useState } from "react";
import axios from "axios";
import StudentNavbar from "../../components/StudentNavbar";

function MyEvents() {
  const [events, setEvents] = useState([]);

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
      const student = JSON.parse(localStorage.getItem("student"));

      if (!student) {
        alert("Please login first ❗");
        return;
      }

      const res = await axios.get(
        `http://localhost:5000/api/student/my-events/${student.id}`
      );

      setEvents(res.data);
    } catch (error) {
      console.log(error);
      alert("Error loading your events ❌");
    }
  };

  useEffect(() => {
    fetchMyEvents();
  }, []);

  return (
    <>
      <StudentNavbar />

      {/* 🔥 Gradient Background */}
      <div
        style={{
          minHeight: "100vh",
          backgroundImage:
            "linear-gradient(-20deg, #e9defa 0%, #fbfcdb 100%)",
            
          padding: "40px 0",
        }}
      >
        <div className="container">

          <h2 className="text-center mb-4 fw-bold">
            🎟 My Registered Events
          </h2>

          <div className="row">
            {events.length === 0 && (
              <h5 className="text-center">No events registered 😢</h5>
            )}

            {events.map((event) => (
              <div className="col-md-4 mb-4" key={event.id}>
                <div
                  className="shadow-lg"
                  style={{
                    borderRadius: "15px",
                    overflow: "hidden",
                    background: "rgba(255,255,255,0.9)",
                    backdropFilter: "blur(10px)",
                    transition: "0.3s",
                  }}
                >
                  {/* 🔥 Image */}
                  <img
                    src={`http://localhost:5000/uploads/${event.image}`}
                    alt="event"
                    style={{
                      height: "200px",
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />

                  {/* 🔥 Content */}
                  <div className="p-3">

                    <h5 className="fw-bold">{event.name}</h5>

                    <p
                      style={{
                        fontSize: "14px",
                        color: "#555",
                        minHeight: "50px",
                      }}
                    >
                      {event.description}
                    </p>

                    <p className="mb-1">📅 {formatDate(event.event_date)}</p>
                    <p className="mb-2">
                      ⏰ {event.start_time} - {event.end_time}
                    </p>

                    {/* 🔥 Button */}
                    {event.attendance_marked ? (
                      <button
                        className="btn btn-success w-100"
                        style={{ borderRadius: "20px" }}
                        disabled
                      >
                        Marked ✅
                      </button>
                    ) : canMarkAttendance(event.event_date, event.start_time) ? (
                      <button
                        className="btn btn-primary w-100"
                        style={{ borderRadius: "20px" }}
                        onClick={() => handleAttendance(event.id)}
                      >
                        Mark Attendance ✅
                      </button>
                    ) : (
                      <button
                        className="btn btn-secondary w-100"
                        style={{ borderRadius: "20px" }}
                        disabled
                      >
                        Attendance Closed ⏳
                      </button>
                    )}

                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}

export default MyEvents;