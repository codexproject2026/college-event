const express = require("express");
const cors = require("cors");
const db = require("./config/db");
const cron = require("node-cron");

const app = express();

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());

// ================= DB CONNECTION TEST =================
db.getConnection((err, connection) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
  } else {
    console.log("✅ MySQL Connected Successfully");
    connection.release();
  }
});

// ================= ROUTES =================
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/student", require("./routes/studentRoutes"));
app.use("/uploads", express.static("uploads"));


cron.schedule("* * * * *", () => {
  console.log("⏱ Checking event status...");

  db.query("SELECT * FROM events", (err, events) => {
    if (err) return console.log(err);

    const now = new Date();

    events.forEach(event => {
      if (!event.event_date || !event.end_time) return;

      try {
        const date = new Date(event.event_date)
          .toISOString()
          .split("T")[0];

        const time = event.end_time.toString().split(".")[0];

        const eventEnd = new Date(`${date}T${time}`);

        console.log("NOW:", now);
        console.log("EVENT END:", eventEnd);

        if (now > eventEnd && event.status !== "Completed") {
          db.query(
            "UPDATE events SET status='Completed' WHERE id=?",
            [event.id]
          );
          console.log(`✅ Event ${event.id} updated`);
        }

      } catch (error) {
        console.log("❌ Date Error:", error);
      }
    });
  });
});


// ================= SERVER =================
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});