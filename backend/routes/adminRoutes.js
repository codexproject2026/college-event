const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const upload = require("../middleware/upload");

router.post("/login", adminController.loginAdmin);

router.post(
  "/add-event",
  upload.single("image"),
  adminController.addEvent
);

router.get("/events", adminController.getEvents);

router.get("/event/:id", adminController.getSingleEvent);

router.put(
  "/update-event/:id",
  upload.single("image"),
  adminController.updateEvent
);

router.delete("/delete-event/:id", adminController.deleteEvent);

router.get("/event-registrations/:event_id", adminController.getEventRegistrations);
router.get("/event-counts", adminController.getAllEventCounts);
router.put("/complete-event/:id", adminController.completeEvent);
router.post("/send-certificates/:eventId", adminController.sendCertificates);
router.post("/send-winner-certificate", adminController.sendWinnerCertificate);
module.exports = router;
