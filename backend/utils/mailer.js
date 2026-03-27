const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "a.kaviyarasu01@gmail.com",      // 🔥 change this
    pass: "ohdcumbqzaxrtinq"         // 🔥 Gmail App Password
  }
});

module.exports = transporter;