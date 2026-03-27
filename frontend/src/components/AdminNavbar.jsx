import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function AdminNavbar() {

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    alert("Logged out successfully");
    navigate("/admin-login");
  };

  const isActive = (path) =>
    location.pathname === path ? "nav-link active fw-bold" : "nav-link";

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container">

        <Link className="navbar-brand" to="/admin-dashboard">
          Admin Panel
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#adminNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="adminNavbar">
          <ul className="navbar-nav ms-auto">

            <li className="nav-item">
              <Link className={isActive("/admin-dashboard")} to="/admin-dashboard">
                Dashboard
              </Link>
            </li>

            <li className="nav-item">
              <Link className={isActive("/add-event")} to="/add-event">
                Add Event
              </Link>
            </li>

            <li className="nav-item">
              <Link className={isActive("/view-events")} to="/view-events">
                View Events
              </Link>
            </li>

            <li className="nav-item">
  <Link className={isActive("/admin-registrations")} to="/admin-registrations">
    Registrations
  </Link>
</li>

            <li className="nav-item">
              <button
                className="btn btn-danger ms-3"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>

          </ul>
        </div>

      </div>
    </nav>
  );
}

export default AdminNavbar;