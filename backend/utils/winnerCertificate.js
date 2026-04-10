const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

function generateWinnerCertificate(student, filePath) {
  const doc = new PDFDocument({
    size: "A4",
    layout: "landscape",
    margin: 0
  });

  doc.pipe(fs.createWriteStream(filePath));

  // 📄 Page size
  const pageWidth = 842;
  const pageHeight = 595;

  // 🏆 Background (gold theme)
  doc.rect(0, 0, pageWidth, pageHeight).fill("#fff8dc");

  // 🏫 LOGO (top-left)
  const logoPath = path.join(__dirname, "../assets/logo.png");
  doc.image(logoPath, 50, 40, { width: 90 });

  // 🟫 Border
  doc
    .lineWidth(5)
    .strokeColor("#d4af37")
    .rect(25, 25, pageWidth - 50, pageHeight - 50)
    .stroke();

  // 🏆 TITLE
  doc
    .font("Helvetica-Bold")
    .fontSize(42)
    .fillColor("#d4af37")
    .text("WINNER CERTIFICATE", 0, 130, {
      align: "center"
    });

  // 🔸 Subtitle
  doc
    .font("Helvetica")
    .fontSize(18)
    .fillColor("#444")
    .text("This is proudly presented to", 0, 200, {
      align: "center"
    });

  // 👤 STUDENT NAME (CENTER PERFECT)
  doc
    .font("Helvetica-Bold")
    .fontSize(36)
    .fillColor("#000")
    .text(student.name, 0, 260, {
      align: "center"
    });

  // 🎯 EVENT TEXT
  doc
    .font("Helvetica")
    .fontSize(20)
    .fillColor("#333")
    .text(
      `For securing WINNER position in`,
      0,
      320,
      { align: "center" }
    );

  // 🔥 EVENT NAME HIGHLIGHT
  doc
    .font("Helvetica-Bold")
    .fontSize(24)
    .fillColor("#2e86de")
    .text(student.event_name, 0, 360, {
      align: "center"
    });

  // 📅 DATE (bottom-right)
  const today = new Date().toLocaleDateString();

  doc
    .fontSize(14)
    .fillColor("#000")
    .text(`Date: ${today}`, pageWidth - 200, pageHeight - 80);

  // 🎖 Decorative line (optional premium touch)
  doc
    .moveTo(200, 420)
    .lineTo(640, 420)
    .strokeColor("#d4af37")
    .lineWidth(2)
    .stroke();

  doc.end();
}

module.exports = generateWinnerCertificate;