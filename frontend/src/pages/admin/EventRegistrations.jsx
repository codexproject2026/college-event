import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import AdminNavbar from "../../components/AdminNavbar";

function EventRegistrations() {
  const { event_id } = useParams();
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [total, setTotal] = useState(0);
  const [present, setPresent] = useState(0);

  const fetchData = async () => {
    try {
      if (!event_id) {
        alert("Invalid Event ❌");
        return;
      }

      const res = await axios.get(
        `http://localhost:5000/api/admin/event-registrations/${event_id}`
      );

      setStudents(res.data.students);
      setTotal(res.data.total);
      setPresent(res.data.present);

    } catch (error) {
      console.log(error);
      alert("Error loading registrations ❌");
    }
  };

  useEffect(() => {
    fetchData();
  }, [event_id]);

  return (
    <>
      <AdminNavbar />

      {/* 🔥 Gradient Background */}
      <div
        style={{
          minHeight: "100vh",
          backgroundImage:
            "linear-gradient(to top, #96fbc4 0%, #f9f586 100%)",
          padding: "40px 0",
        }}
      >
        <div className="container">

          {/* 🔥 Header */}
          <div className="d-flex justify-content-between align-items-center mb-4">

            <button
              className="btn btn-secondary px-3"
              style={{ borderRadius: "20px" }}
              onClick={() => navigate("/admin-registrations")}
            >
              ⬅ Back
            </button>

            <h2 className="text-center flex-grow-1 m-0 fw-bold">
              📊 Event Registrations
            </h2>

          </div>

          {/* 🔥 COUNT CARDS */}
          <div className="row mb-4">

            <div className="col-md-6">
              <div
                className="p-4 text-center shadow"
                style={{
                  borderRadius: "15px",
                  background: "rgba(255,255,255,0.9)",
                }}
              >
                <h5>Total Registered</h5>
                <h2 className="text-primary">{total}</h2>
              </div>
            </div>

            <div className="col-md-6">
              <div
                className="p-4 text-center shadow"
                style={{
                  borderRadius: "15px",
                  background: "rgba(255,255,255,0.9)",
                }}
              >
                <h5>Present Students</h5>
                <h2 className="text-success">{present}</h2>
              </div>
            </div>

          </div>

          {/* 🔥 TABLE CARD */}
          <div
            className="p-4 shadow-lg"
            style={{
              borderRadius: "15px",
              background: "rgba(255,255,255,0.95)",
              backdropFilter: "blur(10px)",
            }}
          >
            <table className="table table-hover align-middle text-center">

              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Department</th>
                  <th>Status</th>
                  <th>Registered Date</th>
                </tr>
              </thead>

              <tbody>
                {students.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center">
                      No registrations 😢
                    </td>
                  </tr>
                ) : (
                  students.map((s, index) => (
                    <tr key={s.id}>
                      <td>{index + 1}</td>
                      <td className="fw-semibold">{s.name}</td>
                      <td>{s.email}</td>
                      <td>{s.mobile}</td>
                      <td>{s.department}</td>

                      {/* 🔥 Attendance Status */}
                      <td>
                        {s.attendance_status ? (
                          <span className="badge bg-success px-3 py-2">
                            Present ✅
                          </span>
                        ) : (
                          <span className="badge bg-danger px-3 py-2">
                            Absent ❌
                          </span>
                        )}
                      </td>

                      <td>
                        {new Date(s.registered_at).toLocaleString()}
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

export default EventRegistrations;