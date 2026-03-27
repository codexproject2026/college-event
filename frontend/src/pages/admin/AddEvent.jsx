import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import AdminNavbar from "../../components/AdminNavbar";
import "./AddEvent.css";

function AddEvent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    event_date: "",
    register_last_date: "",
    start_time: "",
    end_time: "",
    slot_count: "",
    image: null
  });

  const [message, setMessage] = useState("");

  // ================= LOAD EVENT FOR EDIT =================
  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5000/api/admin/event/${id}`)
        .then((res) => {
          const event = res.data;

          setFormData({
            name: event.name || "",
            category: event.category || "",
            description: event.description || "",
            event_date: event.event_date || "",
            register_last_date: event.register_last_date || "",
            start_time: event.start_time || "",
            end_time: event.end_time || "",
            slot_count: event.slot_count || "",
            image: event.image || null
          });
        })
        .catch((err) => {
          console.log("Error fetching event", err);
        });
    }
  }, [id]);

  // ================= HANDLE INPUT CHANGE =================
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setFormData({
        ...formData,
        image: files[0]
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  // ================= HANDLE SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("name", formData.name);
    data.append("category", formData.category);
    data.append("description", formData.description);
    data.append("event_date", formData.event_date);
    data.append("register_last_date", formData.register_last_date);
    data.append("start_time", formData.start_time);
    data.append("end_time", formData.end_time);
    data.append("slot_count", formData.slot_count);

    // only append image if new file selected
    if (formData.image && typeof formData.image !== "string") {
      data.append("image", formData.image);
    }

    try {
      if (id) {
        await axios.put(
          `http://localhost:5000/api/admin/update-event/${id}`,
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        setMessage("Event Updated Successfully ✅");
      } else {
        await axios.post(
          "http://localhost:5000/api/admin/add-event",
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        setMessage("Event Added Successfully ✅");
      }

      setTimeout(() => navigate("/view-events"), 1000);

    } catch (error) {
      console.log(error);
      setMessage(error.response?.data?.message || "Error ❌");
    }
  };

  return (
    <>
      <AdminNavbar />

      <div className="add-event-container">
        <div className="container">
          <div className="add-event-card">

            <h2 className="text-center mb-4 form-title">
              {id ? "Edit Event" : "Add New Event"}
            </h2>

            {message && (
              <div className="alert alert-info text-center">
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="row">

                {/* Event Name */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">Event Name</label>
                  <input
                    type="text"
                    className="form-control custom-input"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Category */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">Category</label>
                  <select
                    className="form-control custom-input"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Technical">Technical</option>
                    <option value="Cultural">Cultural</option>
                    <option value="Sports">Sports</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Seminar">Seminar</option>
                  </select>
                </div>

                {/* Description */}
                <div className="col-12 mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control custom-input"
                    name="description"
                    rows="3"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Event Date */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">Event Date</label>
                  <input
                    type="date"
                    className="form-control custom-input"
                    name="event_date"
                    value={formData.event_date}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Register Last Date */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">Register Last Date</label>
                  <input
                    type="date"
                    className="form-control custom-input"
                    name="register_last_date"
                    value={formData.register_last_date}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Start Time */}
                <div className="col-md-4 mb-3">
                  <label className="form-label">Start Time</label>
                  <input
                    type="time"
                    className="form-control custom-input"
                    name="start_time"
                    value={formData.start_time}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* End Time */}
                <div className="col-md-4 mb-3">
                  <label className="form-label">End Time</label>
                  <input
                    type="time"
                    className="form-control custom-input"
                    name="end_time"
                    value={formData.end_time}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Slot Count */}
                <div className="col-md-4 mb-3">
                  <label className="form-label">Slot Count</label>
                  <input
                    type="number"
                    className="form-control custom-input"
                    name="slot_count"
                    value={formData.slot_count}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Image Upload */}
                <div className="col-12 mb-3">
                  <label className="form-label">Event Image</label>
                  <input
                    type="file"
                    className="form-control custom-input"
                    name="image"
                    onChange={handleChange}
                  />
                </div>

                {/* Existing Image */}
                {id && formData.image && typeof formData.image === "string" && (
                  <div className="col-12 mb-3 text-center">
                    <img
                      src={`http://localhost:5000/uploads/${formData.image}`}
                      alt="event"
                      width="150"
                      className="preview-image"
                    />
                  </div>
                )}

              </div>

              <button className="btn btn-gradient w-100 mt-3">
                {id ? "Update Event" : "Create Event"}
              </button>

            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddEvent;