const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");

router.post("/register", studentController.registerStudent);
router.post("/login", studentController.loginStudent);
router.get("/events", studentController.getAllEvents);

// ✅ ADD THIS 🔥
router.post("/register-event", studentController.registerForEvent);
router.get("/my-events/:student_id", studentController.getMyEvents);
router.post("/attendance", studentController.markAttendance);
router.get("/my-events/:student_id", studentController.getMyEvents);

router.get("/chatbot/:student_id", studentController.chatbotData);

module.exports = router;
