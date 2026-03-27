import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function StudentNavbar() {

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    alert("Logged out successfully");
    navigate("/student-login");
  };

  const isActive = (path) =>
    location.pathname === path
      ? "nav-link active fw-bold text-warning"
      : "nav-link";

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top">
      <div className="container">

        <Link className="navbar-brand fw-bold" to="/student-events">
          Student Panel
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#studentNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="studentNavbar">
          <ul className="navbar-nav ms-auto">

            <li className="nav-item">
              <Link className={isActive("/student-events")} to="/student-events">
                View Events
              </Link>
            </li>

            <li className="nav-item">
              <Link className={isActive("/my-events")} to="/my-events">
               My Events
              </Link>
            </li>

            {/* <li className="nav-item">
              <Link className={isActive("/student-profile")} to="/student-profile">
                My Profile
              </Link>
            </li> */}

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

export default StudentNavbar;
