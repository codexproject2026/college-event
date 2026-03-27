import React from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../../components/AdminNavbar";
import "./AdminDashboard.css";

function AdminDashboard() {

  const navigate = useNavigate();

  return (
    <>
      <AdminNavbar />

      <div className="dashboard-container">
        <h2 className="dashboard-title">
          <i className="bi bi-speedometer2 me-2"></i>
          Admin Dashboard
        </h2>

        <div className="row mt-4">

          {/* Add Event */}
          <div className="col-md-4 mb-4">
            <div className="dashboard-card bg-primary">
              <div className="card-icon">
                <i className="bi bi-calendar-plus"></i>
              </div>
              <h5>Add Event</h5>
              <p>Create and manage new college events</p>
              <button
                className="btn btn-light mt-2"
                onClick={() => navigate("/add-event")}
              >
                Go
              </button>
            </div>
          </div>

          {/* View Events */}
          <div className="col-md-4 mb-4">
            <div className="dashboard-card bg-success">
              <div className="card-icon">
                <i className="bi bi-calendar-event"></i>
              </div>
              <h5>View Events</h5>
              <p>Check all created events</p>
              <button
                className="btn btn-light mt-2"
                onClick={() => navigate("/view-events")}
              >
                Go
              </button>
            </div>
          </div>

          {/* View Registrations */}
          <div className="col-md-4 mb-4">
            <div className="dashboard-card bg-warning">
              <div className="card-icon">
                <i className="bi bi-people-fill"></i>
              </div>
              <h5>View Registrations</h5>
              <p>Monitor student registrations</p>
              <button
                className="btn btn-dark mt-2"
                onClick={() => navigate("/admin-registrations")}
              >
                Go
              </button>
               
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default AdminDashboard;