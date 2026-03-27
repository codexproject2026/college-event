const mysql = require("mysql2");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",   // if you have password, enter here
  database: "event"
});

module.exports = db;
