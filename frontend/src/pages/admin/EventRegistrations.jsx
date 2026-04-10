import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import AdminNavbar from "../../components/AdminNavbar";
import "./EventRegistrations.css";

// 📊 Chart
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function EventRegistrations() {
  const { event_id } = useParams();
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [total, setTotal] = useState(0);
  const [present, setPresent] = useState(0);
  const [eventName, setEventName] = useState("");
  const [loading, setLoading] = useState(true);

  // ✅ Fetch Data
  const fetchData = useCallback(async () => {
  try {
    setLoading(true);
    const res = await axios.get(
      `http://localhost:5000/api/admin/event-registrations/${event_id}`
    );

    setStudents(res.data.students);
    setTotal(res.data.total);
    setPresent(res.data.present);
    setEventName(res.data.event_name || "Event");
    setLoading(false);

  } catch (error) {
    console.log(error);
    alert("Error loading registrations ❌");
    setLoading(false);
  }
}, [event_id]);

  useEffect(() => {
  fetchData();
}, [fetchData]);

  // ✅ Graph Data
  const absent = total - present;

  const chartData = {
    labels: ["Registered", "Present", "Absent"],
    datasets: [
      {
        label: "Students",
        data: [total, present, absent],
        backgroundColor: ["#3b82f6", "#10b981", "#ef4444"],
        borderRadius: 10,
        barPercentage: 0.6,
        categoryPercentage: 0.8,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#fff',
          font: {
            size: 12,
            weight: '500'
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        titleColor: '#fff',
        bodyColor: '#ccc',
        borderColor: '#667eea',
        borderWidth: 1
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255,255,255,0.1)'
        },
        ticks: {
          color: '#fff',
          stepSize: 1
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#fff',
          font: {
            weight: '500'
          }
        }
      }
    }
  };

  // 🏆 Winner Button
  const handleWinner = async (studentId) => {
    try {
      await axios.post(
        "http://localhost:5000/api/admin/send-winner-certificate",
        {
          student_id: studentId,
          event_id: event_id
        }
      );

      alert("Winner Certificate Sent 🏆");

    } catch (err) {
      console.log(err);
      alert("Error sending winner certificate ❌");
    }
  };

  const attendancePercentage = total > 0 ? ((present / total) * 100).toFixed(1) : 0;

  return (
    <>
      <AdminNavbar />

      <div className="event-registrations-page">
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
                <button
                  className="back-button"
                  onClick={() => navigate("/admin-registrations")}
                >
                  <i className="bi bi-arrow-left"></i>
                  Back
                </button>
                <div className="header-content">
                 
                  <h2 className="registrations-title">
                    {eventName || "Event"} Registrations
                  </h2>
                  <p className="registrations-subtitle">
                    Track attendance and manage student participation
                  </p>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="stats-cards">
                <div className="stat-card total-card">
                  <div className="stat-icon">
                    <i className="bi bi-people-fill"></i>
                  </div>
                  <div className="stat-details">
                    <h3>{total}</h3>
                    <p>Total Registered</p>
                  </div>
                </div>
                <div className="stat-card present-card">
                  <div className="stat-icon">
                    <i className="bi bi-check-circle-fill"></i>
                  </div>
                  <div className="stat-details">
                    <h3>{present}</h3>
                    <p>Present</p>
                  </div>
                </div>
                <div className="stat-card absent-card">
                  <div className="stat-icon">
                    <i className="bi bi-x-circle-fill"></i>
                  </div>
                  <div className="stat-details">
                    <h3>{absent}</h3>
                    <p>Absent</p>
                  </div>
                </div>
                <div className="stat-card percentage-card">
                  <div className="stat-icon">
                    <i className="bi bi-graph-up"></i>
                  </div>
                  <div className="stat-details">
                    <h3>{attendancePercentage}%</h3>
                    <p>Attendance Rate</p>
                  </div>
                </div>
              </div>

              {/* Chart Section */}
              <div className="chart-section">
                <div className="chart-header">
                  <h5>
                    <i className="bi bi-bar-chart-steps me-2"></i>
                    Attendance Analytics
                  </h5>
                </div>
                <div className="chart-container">
                  <Bar data={chartData} options={chartOptions} />
                </div>
              </div>

              {/* Students Table */}
              <div className="table-section">
                <div className="table-header">
                  <h5>
                    <i className="bi bi-table me-2"></i>
                    Student List
                  </h5>
                  <div className="table-stats">
                    <span className="total-badge">
                      <i className="bi bi-people-fill me-1"></i>
                      {students.length} Students
                    </span>
                  </div>
                </div>

                <div className="table-responsive">
                  <table className="registrations-table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Student Name</th>
                        <th>Email</th>
                        <th>Department</th>
                        <th>Status</th>
                        <th>Winner Certificate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <tr>
                          <td colSpan="6" className="loading-state">
                            <div className="loading-content">
                              <i className="bi bi-hourglass-split"></i>
                              <p>Loading students...</p>
                            </div>
                          </td>
                        </tr>
                      ) : students.length === 0 ? (
                        <tr>
                          <td colSpan="6" className="no-data-state">
                            <div className="no-data-content">
                              <i className="bi bi-inbox-fill"></i>
                              <p>No students registered yet</p>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        students.map((s, index) => (
                          <tr key={s.id}>
                            <td className="serial-no">{index + 1}</td>
                            <td className="student-name">{s.name}</td>
                            <td className="student-email">{s.email}</td>
                            <td>
                              <span className="department-badge">{s.department}</span>
                            </td>
                            <td>
                              {s.attendance_status ? (
                                <span className="status-badge present">
                                  <i className="bi bi-check-circle-fill me-1"></i>
                                  Present
                                </span>
                              ) : (
                                <span className="status-badge absent">
                                  <i className="bi bi-x-circle-fill me-1"></i>
                                  Absent
                                </span>
                              )}
                            </td>
                            <td>
                              <button
                                className={`winner-btn ${!s.attendance_status ? 'disabled' : ''}`}
                                disabled={!s.attendance_status}
                                onClick={() => handleWinner(s.id)}
                              >
                                <i className="bi bi-trophy-fill me-1"></i>
                                Winner
                              </button>
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
      </div>
    </>
  );
}

export default EventRegistrations;