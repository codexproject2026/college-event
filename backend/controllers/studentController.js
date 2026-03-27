const db = require("../config/db");


// ================= STUDENT REGISTER =================
exports.registerStudent = (req, res) => {
  const {
    name,
    email,
    mobile,
    department,
    interest_event,
    password
  } = req.body;

  db.query(
    `INSERT INTO students 
     (name, email, mobile, department, interest_event, password)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [name, email, mobile, department, interest_event, password],
    (err) => {

      if (err) {
        console.log(err);
        return res.status(400).json({ message: "Email already exists" });
      }

      res.json({ message: "Registration Successful" });
    }
  );
};


// ================= STUDENT LOGIN =================
exports.loginStudent = (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM students WHERE email = ? AND password = ?",
    [email, password],
    (err, results) => {

      if (err) return res.status(500).json({ message: "Server Error" });

      if (results.length === 0) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }

      res.json({
        message: "Login Successful",
        student: results[0]
      });
    }
  );
};


// ================= VIEW EVENTS =================
exports.getAllEvents = (req, res) => {
  db.query(
    `SELECT 
      e.id,
      e.name,
      e.category,
      e.description,
      DATE_FORMAT(e.event_date, '%Y-%m-%d') AS event_date,
      DATE_FORMAT(e.register_last_date, '%Y-%m-%d') AS register_last_date,
      e.start_time,
      e.end_time,
      e.slot_count,
      e.available_slots,
      e.image
     FROM events e
     WHERE e.status='Open'
     ORDER BY e.event_date ASC`,
    (err, results) => {
      res.json(results);
    }
  );
};


// ================= REGISTER FOR EVENT =================
exports.registerForEvent = (req, res) => {
  const { student_id, event_id } = req.body;

  db.query(
    "SELECT * FROM registrations WHERE student_id=? AND event_id=?",
    [student_id, event_id],
    (err, result) => {

      if (err) {
        console.log(err);
        return res.status(500).json({ message: "DB Error" });
      }

      if (result.length > 0) {
        return res.status(400).json({ message: "Already Registered ❌" });
      }

      // ✅ check slot before insert
      db.query(
        "SELECT available_slots FROM events WHERE id=?",
        [event_id],
        (err, eventResult) => {

          if (err) return res.status(500).json({ message: "Error" });

          if (eventResult[0].available_slots <= 0) {
            return res.status(400).json({ message: "Slots Full 🚫" });
          }

          // ✅ insert registration
          db.query(
            "INSERT INTO registrations (student_id, event_id) VALUES (?, ?)",
            [student_id, event_id],
            (err) => {

              if (err) {
                console.log(err);
                return res.status(500).json({ message: "Insert Error" });
              }

              // ✅ reduce slot 🔥🔥
              db.query(
                "UPDATE events SET available_slots = available_slots - 1 WHERE id=?",
                [event_id],
                (err) => {
                  if (err) console.log("Slot update error:", err);
                }
              );

              res.json({ message: "Registered Successfully ✅" });
            }
          );

        }
      );
    }
  );
};


exports.getMyEvents = (req, res) => {
  const { student_id } = req.params;

  db.query(
    `SELECT 
        e.id,
        e.name,
        e.category,
        e.description,
        DATE_FORMAT(e.event_date, '%Y-%m-%d') AS event_date,
        e.start_time,
        e.end_time,
        e.image,
        IF(a.id IS NULL, 0, 1) AS attendance_marked
     FROM registrations r
     JOIN events e ON r.event_id = e.id
     LEFT JOIN attendance a 
       ON a.event_id = e.id AND a.student_id = ?
     WHERE r.student_id = ?`,
    [student_id, student_id],
    (err, results) => {

      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Error" });
      }

      res.json(results);
    }
  );
};


exports.markAttendance = (req, res) => {
  const { student_id, event_id } = req.body;

  db.query(
    "INSERT INTO attendance (student_id, event_id) VALUES (?, ?)",
    [student_id, event_id],
    (err) => {
      if (err) {
        return res.status(400).json({ message: "Already Marked ❌" });
      }

      res.json({ message: "Attendance Marked ✅" });
    }
  );
};