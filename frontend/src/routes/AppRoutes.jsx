import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import AdminLogin from "../pages/admin/AdminLogin";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AddEvent from "../pages/admin/AddEvent";
import ViewEvent from "../pages/admin/ViewEvents";
import StudentRegister from "../pages/student/StudentRegister";
import StudentLogin from "../pages/student/StudentLogin";
import EventList from "../pages/student/EventList";
import MyEvents from "../pages/student/MyEvents";
import EventRegistrations from "../pages/admin/EventRegistrations";
import AdminRegistrations from "../pages/admin/AdminRegistrations";




function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />

      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/add-event" element={<AddEvent />} />
      <Route path="/edit-event/:id" element={<AddEvent />} />
      <Route path="/view-events" element={<ViewEvent />} />

      {/* ✅ ONLY THIS */}
      <Route path="/admin/event-registrations/:event_id" element={<EventRegistrations />} />
<Route path="/admin-registrations" element={<AdminRegistrations />} />
      <Route path="/student-login" element={<StudentLogin />} />
      <Route path="/student-register" element={<StudentRegister />} />
      <Route path="/student-events" element={<EventList />} />
      <Route path="/my-events" element={<MyEvents />} />
    </Routes>
  );
}

export default AppRoutes;
