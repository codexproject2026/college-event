const express = require("express");
const cors = require("cors");
const db = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

// DB Connection Test
db.getConnection((err, connection) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("MySQL Connected Successfully");
    connection.release();
  }
});

// Routes
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/uploads", express.static("uploads"));
app.use("/api/student", require("./routes/studentRoutes"));



app.listen(5000, () => {
  console.log("Server running on port 5000");
});
