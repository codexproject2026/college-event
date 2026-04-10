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
  const [imagePreview, setImagePreview] = useState("");

  // Create particles
  useEffect(() => {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-bg';
    document.querySelector('.add-event-container').appendChild(particleContainer);
    
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${Math.random() * 5}s`;
      particle.style.animationDuration = `${8 + Math.random() * 15}s`;
      particleContainer.appendChild(particle);
    }
  }, []);

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
      const file = files[0];
      setFormData({ ...formData, image: file });
      
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => setImagePreview(reader.result);
        reader.readAsDataURL(file);
      } else {
        setImagePreview("");
      }
    } else {
      setFormData({ ...formData, [name]: value });
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

    if (formData.image && typeof formData.image !== "string") {
      data.append("image", formData.image);
    }

    try {
      if (id) {
        await axios.put(`http://localhost:5000/api/admin/update-event/${id}`, data, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        setMessage("Event Updated Successfully ✅");
      } else {
        await axios.post("http://localhost:5000/api/admin/add-event", data, {
          headers: { "Content-Type": "multipart/form-data" }
        });
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
        {/* Gradient Orbs */}
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        
        <div className="container">
          <div className="add-event-card">
            
            <div className="form-header">
              <div className="header-icon">
                <i className="bi bi-calendar-plus-fill"></i>
              </div>
              <h2 className="form-title">{id ? "Edit Event" : "Create Event"}</h2>
              <p className="form-subtitle">
                {id ? "Update your event details" : "Fill in the details to create a new event"}
              </p>
            </div>

            {message && (
              <div className={`alert-message ${message.includes("✅") ? "success" : "error"}`}>
                <i className={`bi ${message.includes("✅") ? "bi-check-circle-fill" : "bi-exclamation-triangle-fill"} me-2`}></i>
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">
                    <i className="bi bi-tag-fill"></i>Event Name
                  </label>
                  <input
                    type="text"
                    className="custom-input"
                    name="name"
                    placeholder="Enter event name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <i className="bi bi-grid-fill"></i>Category
                  </label>
                  <select
                    className="custom-input"
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

                <div className="form-group full-width">
                  <label className="form-label">
                    <i className="bi bi-file-text-fill"></i>Description
                  </label>
                  <textarea
                    className="custom-input textarea-input"
                    name="description"
                    rows="3"
                    placeholder="Describe your event..."
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <i className="bi bi-calendar-event-fill"></i>Event Date
                  </label>
                  <input
                    type="date"
                    className="custom-input"
                    name="event_date"
                    value={formData.event_date}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <i className="bi bi-calendar-check-fill"></i>Last Date
                  </label>
                  <input
                    type="date"
                    className="custom-input"
                    name="register_last_date"
                    value={formData.register_last_date}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <i className="bi bi-clock-fill"></i>Start Time
                  </label>
                  <input
                    type="time"
                    className="custom-input"
                    name="start_time"
                    value={formData.start_time}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <i className="bi bi-clock-fill"></i>End Time
                  </label>
                  <input
                    type="time"
                    className="custom-input"
                    name="end_time"
                    value={formData.end_time}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <i className="bi bi-people-fill"></i>Slots
                  </label>
                  <input
                    type="number"
                    className="custom-input"
                    name="slot_count"
                    placeholder="Max participants"
                    value={formData.slot_count}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group full-width">
                  <label className="form-label">
                    <i className="bi bi-image-fill"></i>Event Image
                  </label>
                  <div className="image-upload-area">
                    <input
                      type="file"
                      className="image-input"
                      name="image"
                      id="imageUpload"
                      onChange={handleChange}
                      accept="image/*"
                    />
                    <label htmlFor="imageUpload" className="image-upload-label">
                      <i className="bi bi-cloud-upload-fill"></i>
                      <span>Click to upload image</span>
                    </label>
                  </div>
                </div>

                {(imagePreview || (id && formData.image && typeof formData.image === "string")) && (
                  <div className="form-group full-width">
                    <div className="image-preview-wrapper">
                      <img
                        src={imagePreview || `http://localhost:5000/uploads/${formData.image}`}
                        alt="preview"
                        className="preview-image"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={() => navigate("/view-events")}>
                  <i className="bi bi-x-circle"></i>
                  Cancel
                </button>
                <button type="submit" className="btn-submit">
                  <i className={`bi ${id ? "bi-pencil-square" : "bi-plus-circle"}`}></i>
                  {id ? "Update Event" : "Create Event"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddEvent;