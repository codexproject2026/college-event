const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

function generateCertificate(student, filePath) {
  const doc = new PDFDocument({
    size: "A4",
    layout: "landscape",
    margin: 0
  });

  doc.pipe(fs.createWriteStream(filePath));

  const pageWidth = 842;
  const pageHeight = 595;

  // ========== BACKGROUND WITH GRADIENT EFFECT ==========
  
  // Main background
  doc.rect(0, 0, pageWidth, pageHeight).fill("#0a0a2a");
  
  // Decorative gradient orbs
  doc.circle(200, 150, 150)
    .fill("rgba(100, 100, 255, 0.05)");
  doc.circle(600, 400, 180)
    .fill("rgba(255, 215, 0, 0.03)");
  doc.circle(700, 100, 120)
    .fill("rgba(100, 100, 255, 0.04)");
  
  // Golden border
  doc.rect(15, 15, pageWidth - 30, pageHeight - 30)
    .lineWidth(3)
    .strokeColor("#ffd700")
    .stroke();
  
  doc.rect(20, 20, pageWidth - 40, pageHeight - 40)
    .lineWidth(1)
    .strokeColor("#ffd700")
    .stroke();

  // ========== TOP DECORATIVE BORDER ==========
  doc.rect(40, 40, pageWidth - 80, 8)
    .fill("#ffd700");
  doc.rect(40, 55, pageWidth - 80, 2)
    .fill("#ffd700");

  // Bottom decorative border
  doc.rect(40, pageHeight - 55, pageWidth - 80, 8)
    .fill("#ffd700");
  doc.rect(40, pageHeight - 48, pageWidth - 80, 2)
    .fill("#ffd700");

  // ========== CORNER DECORATIONS ==========
  const cornerSize = 60;
  
  // Top-left corner
  doc.lineWidth(2)
    .strokeColor("#ffd700")
    .moveTo(35, 35)
    .lineTo(35, 35 + cornerSize)
    .stroke();
  doc.moveTo(35, 35)
    .lineTo(35 + cornerSize, 35)
    .stroke();
  
  // Top-right corner
  doc.moveTo(pageWidth - 35, 35)
    .lineTo(pageWidth - 35, 35 + cornerSize)
    .stroke();
  doc.moveTo(pageWidth - 35, 35)
    .lineTo(pageWidth - 35 - cornerSize, 35)
    .stroke();
  
  // Bottom-left corner
  doc.moveTo(35, pageHeight - 35)
    .lineTo(35, pageHeight - 35 - cornerSize)
    .stroke();
  doc.moveTo(35, pageHeight - 35)
    .lineTo(35 + cornerSize, pageHeight - 35)
    .stroke();
  
  // Bottom-right corner
  doc.moveTo(pageWidth - 35, pageHeight - 35)
    .lineTo(pageWidth - 35, pageHeight - 35 - cornerSize)
    .stroke();
  doc.moveTo(pageWidth - 35, pageHeight - 35)
    .lineTo(pageWidth - 35 - cornerSize, pageHeight - 35)
    .stroke();

  // ========== LOGO (Left Side) ==========
  // Try multiple possible logo paths
  const logoPaths = [
    path.join(__dirname, "../assets/logo.png"),
    path.join(__dirname, "../assets/logo.jpg"),
    path.join(__dirname, "../assets/logo.jpeg"),
    path.join(__dirname, "../../assets/logo.png"),
    path.join(__dirname, "../../public/logo.png"),
    path.join(process.cwd(), "assets/logo.png"),
    path.join(process.cwd(), "public/logo.png")
  ];
  
  let logoLoaded = false;
  
  // Try to load logo from various paths
  for (const logoPath of logoPaths) {
    try {
      if (fs.existsSync(logoPath)) {
        doc.image(logoPath, 36, 35, { width: 90, height: 90 });
        logoLoaded = true;
        console.log("Logo loaded from:", logoPath);
        break;
      }
    } catch (err) {
      // Continue to next path
    }
  }
  
  // If no logo found, draw a decorative emblem instead
  if (!logoLoaded) {
    // Draw a beautiful emblem/crest as fallback
    const emblemX = 50;
    const emblemY = 35;
    const emblemSize = 65;
    
    // Star in center
    const centerX = emblemX + emblemSize/2;
    const centerY = emblemY + emblemSize/2;
    
    for (let i = 0; i < 5; i++) {
      const angle = (i * 72 - 90) * Math.PI / 180;
      const x1 = centerX + Math.cos(angle) * 15;
      const y1 = centerY + Math.sin(angle) * 15;
      const x2 = centerX + Math.cos(angle + 36 * Math.PI / 180) * 8;
      const y2 = centerY + Math.sin(angle + 36 * Math.PI / 180) * 8;
      
      doc.polygon([x1, y1, x2, y2])
        .fill("#ffd700");
    }
  }

  // ========== RIGHT SIDE DECORATION ==========
  // Draw a decorative pattern on right side
  for (let i = 0; i < 3; i++) {
    doc.circle(pageWidth - 60, 60 + i * 80, 15)
      .lineWidth(1)
      .strokeColor("#ffd700")
      .stroke();
  }

  // ========== INSTITUTION NAME ==========
  doc.font("Helvetica-Bold")
    .fontSize(22)
    .fillColor("#ffd700")
    .text("COLLEGE OF ENGINEERING", 0, 80, {
      align: "center"
    });

  doc.fontSize(12)
    .fillColor("#aaa")
    .text("(Affiliated to Anna University)", 0, 108, {
      align: "center"
    });

  // ========== MAIN TITLE ==========
  doc.font("Helvetica-Bold")
    .fontSize(48)
    .fillColor("#ffffff")
    .text("CERTIFICATE", 0, 160, {
      align: "center"
    });

  doc.fontSize(18)
    .fillColor("#ffd700")
    .text("OF PARTICIPATION", 0, 210, {
      align: "center"
    });

  // ========== DECORATIVE LINE ==========
  const lineWidth = 200;
  doc.moveTo((pageWidth - lineWidth) / 2, 230)
    .lineTo((pageWidth + lineWidth) / 2, 230)
    .lineWidth(1)
    .strokeColor("#ffd700")
    .stroke();

  // ========== STUDENT NAME ==========
  doc.font("Helvetica-Bold")
    .fontSize(36)
    .fillColor("#ffffff")
    .text(student.name, 0, 260, {
      align: "center"
    });

  // ========== DECORATIVE LINE UNDER NAME ==========
  const nameWidth = doc.widthOfString(student.name);
  doc.moveTo((pageWidth - nameWidth) / 2 - 20, 298)
    .lineTo((pageWidth + nameWidth) / 2 + 20, 298)
    .lineWidth(1)
    .strokeColor("#ffd700")
    .stroke();

  // ========== CERTIFICATE TEXT ==========
  doc.font("Helvetica")
    .fontSize(14)
    .fillColor("#ddd")
    .text(
      "This certificate is proudly presented to",
      (pageWidth - 400) / 2,
      320,
      { width: 400, align: "center" }
    );

  doc.font("Helvetica-Bold")
    .fontSize(16)
    .fillColor("#ffd700")
    .text(student.name, (pageWidth - 400) / 2, 345, {
      width: 400,
      align: "center"
    });

  doc.font("Helvetica")
    .fontSize(14)
    .fillColor("#ddd")
    .text(
      "for outstanding participation and contribution in",
      (pageWidth - 450) / 2,
      375,
      { width: 450, align: "center" }
    );

  // ========== EVENT NAME HIGHLIGHT ==========
  doc.font("Helvetica-Bold")
    .fontSize(20)
    .fillColor("#ffd700")
    .text(student.event_name, 0, 405, {
      align: "center"
    });

  // ========== ADDITIONAL INFO ==========
  doc.font("Helvetica")
    .fontSize(12)
    .fillColor("#aaa")
    .text(
      "organized by the Department of Student Affairs",
      0,
      440,
      { align: "center" }
    );

  // ========== DATES AND SIGNATURES ==========
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Left side - Date
  doc.font("Helvetica")
    .fontSize(10)
    .fillColor("#aaa")
    .text("Date", 80, 500);
  doc.font("Helvetica-Bold")
    .fontSize(12)
    .fillColor("#ffd700")
    .text(formattedDate, 80, 515);

  // Right side - Signature
  doc.font("Helvetica")
    .fontSize(10)
    .fillColor("#aaa")
    .text("Authorized Signature", pageWidth - 180, 500);
  
  // Signature line
  doc.moveTo(pageWidth - 180, 535)
    .lineTo(pageWidth - 80, 535)
    .lineWidth(1)
    .strokeColor("#ffd700")
    .stroke();
  
  doc.font("Helvetica")
    .fontSize(10)
    .fillColor("#aaa")
    .text("Principal", pageWidth - 150, 540, { align: "center" });

  // ========== CERTIFICATE ID ==========
  const certId = `EVT-${student.event_id || '000'}-${student.student_id || '000'}`;
  doc.font("Helvetica")
    .fontSize(8)
    .fillColor("#666")
    .text(`Certificate ID: ${certId}`, pageWidth - 160, pageHeight - 30);

  // ========== BOTTOM DECORATION ==========
  doc.font("Helvetica")
    .fontSize(7)
    .fillColor("#555")
    .text("This is a system generated certificate", pageWidth / 2 - 100, pageHeight - 25, {
      align: "center"
    });

  doc.end();
}

module.exports = generateCertificate;