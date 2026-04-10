const db = require("../config/db");
const transporter = require("../utils/mailer");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const generateCertificate = require("../utils/certificate");
const generateWinnerCertificate = require("../utils/winnerCertificate");

// ================= ADMIN LOGIN =================
exports.loginAdmin = (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM admin WHERE email = ? AND password = ?",
    [email, password],
    (err, results) => {

      if (err) return res.status(500).json({ message: "Server Error" });

      if (results.length === 0) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }

      res.json({
        message: "Login Successful",
        admin: results[0]
      });
    }
  );
};




// ================= ADD EVENT =================
exports.addEvent = (req, res) => {
  const {
    name,
    category,
    description,
    event_date,
    register_last_date,
    start_time,
    end_time,
    slot_count
  } = req.body;

  const image = req.file ? req.file.filename : null;

  db.query(
    `INSERT INTO events
     (name, category, description, event_date, register_last_date, start_time, end_time, slot_count, available_slots, image)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      name,
      category,
      description,
      event_date,
      register_last_date,
      start_time,
      end_time,
      slot_count,
      slot_count,
      image
    ],
    (err) => {

      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Error adding event" });
      }

      // 🔥 GET ALL STUDENTS
      db.query("SELECT name, email FROM students", (err, students) => {

        if (err) {
          console.log(err);
          return res.json({ message: "Event Added (Email failed)" });
        }

        // 🔥 SEND EMAIL TO ALL
        students.forEach((student) => {

          const mailOptions = {
            from: "yourgmail@gmail.com",
            to: student.email,
            subject: `🎉 New Event: ${name}`,

            html: `
              <div style="font-family: Arial; padding:10px;">
                <h2>Hello ${student.name},</h2>

                <p>We are excited to announce a new event!</p>

                <h3 style="color:blue;">${name}</h3>

                <img src="cid:eventimage" width="300" style="border-radius:10px;" />

                <p><b>Category:</b> ${category}</p>
                <p><b>Date:</b> ${event_date}</p>
                <p><b>Time:</b> ${start_time} - ${end_time}</p>

                <p>${description}</p>

                <p style="color:green;">Register now in the portal 🚀</p>
              </div>
            `,

            // 🔥 IMAGE ATTACHMENT
            attachments: image ? [
              {
                filename: image,
                path: `uploads/${image}`, // correct path
                cid: "eventimage"
              }
            ] : []
          };

          transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
              console.log("Email Error:", err);
            } else {
              console.log("Email sent:", info.response);
            }
          });

        });

        res.json({ message: "Event Added & Emails Sent ✅" });

      });

    }
  );
};


// ================= GET ALL EVENTS =================
exports.getEvents = (req, res) => {
  db.query(
    `SELECT 
        id,
        name,
        category,
        description,
        DATE_FORMAT(event_date, '%Y-%m-%d') AS event_date,
        DATE_FORMAT(register_last_date, '%Y-%m-%d') AS register_last_date,
        start_time,
        end_time,
        slot_count,
        available_slots,
        status,
        image
     FROM events
     ORDER BY id DESC`,
    (err, results) => {

      if (err) return res.status(500).json({ message: "Error fetching events" });

      res.json(results);
    }
  );
};


// ================= GET SINGLE EVENT =================
exports.getSingleEvent = (req, res) => {
  const { id } = req.params;

  db.query(
    `SELECT 
        id,
        name,
        category,
        description,
        DATE_FORMAT(event_date, '%Y-%m-%d') AS event_date,
        DATE_FORMAT(register_last_date, '%Y-%m-%d') AS register_last_date,
        start_time,
        end_time,
        slot_count,
        available_slots,
        status,
        image
     FROM events
     WHERE id = ?`,
    [id],
    (err, results) => {

      if (err) return res.status(500).json(err);

      res.json(results[0]);
    }
  );
};


// ================= UPDATE EVENT (NO AUTO LOGIC) =================
exports.updateEvent = (req, res) => {
  const { id } = req.params;

  const {
    name,
    category,
    description,
    event_date,
    register_last_date,
    start_time,
    end_time,
    slot_count
  } = req.body;

  const image = req.file ? req.file.filename : null;

  let query = `
    UPDATE events SET
      name=?,
      category=?,
      description=?,
      event_date=?,
      register_last_date=?,
      start_time=?,
      end_time=?,
      slot_count=?,
      available_slots=?`;

  let values = [
    name,
    category,
    description,
    event_date,
    register_last_date,
    start_time,
    end_time,
    slot_count,
    slot_count   // 🔥 Direct same value
  ];

  if (image) {
    query += ", image=?";
    values.push(image);
  }

  query += " WHERE id=?";
  values.push(id);

  db.query(query, values, (err) => {

    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Update failed" });
    }

    res.json({ message: "Event Updated Successfully" });
  });
};


// ================= DELETE EVENT =================
exports.deleteEvent = (req, res) => {
  const { id } = req.params;

  db.query(
    "DELETE FROM events WHERE id = ?",
    [id],
    (err) => {

      if (err) return res.status(500).json({ message: "Error deleting event" });

      res.json({ message: "Event Deleted Successfully" });
    }
  );
};


// ================= EVENT REGISTRATIONS + ATTENDANCE =================
exports.getEventRegistrations = (req, res) => {
  const { event_id } = req.params;

  db.query(
    `SELECT 
        s.id,
        s.name,
        s.email,
        s.mobile,
        s.department,
        r.registered_at,
        IF(a.id IS NULL, 0, 1) AS attendance_status
     FROM registrations r
     JOIN students s ON r.student_id = s.id
     LEFT JOIN attendance a 
       ON a.student_id = s.id AND a.event_id = r.event_id
     WHERE r.event_id = ?`,
    [event_id],
    (err, results) => {

      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Error" });
      }

      const total = results.length;
      const present = results.filter(r => r.attendance_status === 1).length;

      res.json({
        total,
        present,
        students: results
      });
    }
  );
};

// ================= ALL EVENTS REGISTRATION COUNT =================
exports.getAllEventCounts = (req, res) => {
  db.query(
    `SELECT 
        e.id,
        e.name,
        e.category,
        e.available_slots,
        e.event_date,
        e.end_time,
        e.status,
        COUNT(r.id) AS total_registered
     FROM events e
     LEFT JOIN registrations r ON e.id = r.event_id
     GROUP BY e.id
     ORDER BY e.id DESC`,
    (err, results) => {

      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Error" });
      }

      const now = new Date();

      // 🔥 AUTO UPDATE LOGIC
      results.forEach((event) => {

        if (!event.event_date || !event.end_time) return;

        const eventEnd = new Date(event.event_date + " " + event.end_time);

        // ✅ If time over & not already completed
        if (now > eventEnd && event.status !== "Completed") {

          db.query(
            "UPDATE events SET status='Completed' WHERE id=?",
            [event.id],
            (err) => {
              if (err) {
                console.log("Update Error:", err);
              }
            }
          );

          // 🔥 instant UI reflect
          event.status = "Completed";
        }

      });

      res.json(results);
    }
  );
};

// ================= MARK EVENT AS COMPLETED =================
exports.completeEvent = (req, res) => {
  const { id } = req.params;

  db.query(
    "UPDATE events SET status='Completed' WHERE id=?",
    [id],
    (err) => {

      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Error updating status" });
      }

      res.json({ message: "Event marked as Completed ✅" });
    }
  );
};

exports.sendCertificates = (req, res) => {
  const { eventId } = req.params;

  db.query(
    `SELECT s.name, s.email, e.name AS event_name
     FROM registrations r
     JOIN students s ON r.student_id = s.id
     JOIN events e ON r.event_id = e.id
     LEFT JOIN attendance a 
       ON a.student_id = s.id AND a.event_id = r.event_id
     WHERE r.event_id = ? AND a.id IS NOT NULL`,
    [eventId],
    (err, students) => {

      if (err) {
        console.log("DB ERROR:", err);
        return res.status(500).json({ message: "Error" });
      }

      if (students.length === 0) {
        return res.json({ message: "No attended students ❌" });
      }

      students.forEach((student) => {

        const fileName = `certificate_${student.name}.pdf`;
        const filePath = `certificates/${fileName}`;

        // 🔥 generate PDF
        generateCertificate(student, filePath);

        // 🔥 send email
        const mailOptions = {
          from: "yourgmail@gmail.com",
          to: student.email,
          subject: "🎓 Your Certificate",
          text: `Hello ${student.name}, your certificate is attached.`,
          attachments: [
            {
              filename: fileName,
              path: filePath
            }
          ]
        };

        transporter.sendMail(mailOptions, (err) => {
          if (err) {
            console.log("MAIL ERROR:", err);
          } else {
            console.log("✅ Sent to:", student.email);
          }
        });
      });

      res.json({ message: "Certificates Sent ✅" });
    }
  );
};

exports.sendWinnerCertificate = (req, res) => {
  const { student_id, event_id } = req.body;

  db.query(
    `SELECT s.name, s.email, e.name AS event_name
     FROM students s, events e
     WHERE s.id=? AND e.id=?`,
    [student_id, event_id],
    (err, result) => {

      if (err || result.length === 0) {
        return res.status(500).json({ message: "Error" });
      }

      const student = result[0];

      const fileName = `winner_${student.name}.pdf`;
      const filePath = `certificates/${fileName}`;

      // 🏆 GENERATE WINNER CERTIFICATE
      generateWinnerCertificate(student, filePath);

      // 📧 SEND EMAIL
      transporter.sendMail({
        from: "yourgmail@gmail.com",
        to: student.email,
        subject: "🏆 Winner Certificate",
        text: `Congratulations ${student.name}! You are the WINNER 🎉`,
        attachments: [
          {
            filename: fileName,
            path: filePath
          }
        ]
      });

      res.json({ message: "Winner certificate sent 🏆" });
    }
  );
};