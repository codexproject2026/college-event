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

  // ========== CONFIGURATION ==========
  const config = {
    primaryColor: "#d4af37",      // Gold color
    secondaryColor: "#1a237e",    // Navy blue for text
    textColor: "#333333",         // Dark gray for text
    subTextColor: "#666666",      // Light gray
    
    // Certificate Type
    certificateType: "PARTICIPATION",
    mainTitle: "CERTIFICATE",
    
    // Footer Text
    footerText: "This is a system generated certificate",
    
    // Show/Hide Sections
    showLogo: true,
    showDate: true,
    showCertificateId: true,
    showSignature: true,
    
    // ========== NEW CONTROLS ==========
    // Logo Controls
    logoWidth: 400,               // Control logo width (default: 380)
    logoHeight: 130,             // Set specific height (null = auto maintain aspect ratio)
    logoXOffset: 0,               // Adjust horizontal position (positive = right, negative = left)
    logoYOffset: 10,               // Adjust vertical position (positive = down, negative = up)
    
    // Paragraph Controls
    paragraphFontSize: 18,        // Font size for paragraph (default: 16)
    paragraphLetterSpacing: 0.8,  // Letter spacing in points (0 = normal, 1 = more space, -0.5 = tighter)
    paragraphLineHeight: 35,      // Line height for paragraph (default: 28)
    paragraphMaxWidth: 700,       // Maximum width of paragraph (default: 600)
    paragraphAlign: "justify",     // Text alignment: "center", "left", "right", "justify"
    
    // Text Styling
    useBoldForName: true,         // Make student name bold in paragraph
    highlightEventName: true,     // Highlight event name in gold color
    eventNameColor: "#d4af37"     // Color for highlighted event name
  };

  // ========== WHITE BACKGROUND ==========
  doc.rect(0, 0, pageWidth, pageHeight).fill("#ffffff");
  
  // Subtle decorative pattern (very light)
  for(let i = 0; i < 30; i++) {
    doc.opacity(0.02)
      .circle(Math.random() * pageWidth, Math.random() * pageHeight, 40)
      .fill(config.primaryColor);
  }
  doc.opacity(1);

  // ========== GOLD BORDERS ==========
  // Outer border
  doc.rect(15, 15, pageWidth - 30, pageHeight - 30)
    .lineWidth(3)
    .strokeColor(config.primaryColor)
    .stroke();
  
  // Inner border
  doc.rect(22, 22, pageWidth - 44, pageHeight - 44)
    .lineWidth(1.5)
    .strokeColor(config.primaryColor)
    .stroke();
  
  // Double line border
  doc.rect(28, 28, pageWidth - 56, pageHeight - 56)
    .lineWidth(0.5)
    .strokeColor(config.primaryColor)
    .stroke();

  // ========== TOP DECORATIVE LINE ==========
  doc.rect(40, 40, pageWidth - 80, 6).fill(config.primaryColor);
  doc.rect(40, 52, pageWidth - 80, 1.5).fill(config.primaryColor);

  // Bottom decorative line
  doc.rect(40, pageHeight - 52, pageWidth - 80, 6).fill(config.primaryColor);
  doc.rect(40, pageHeight - 46, pageWidth - 80, 1.5).fill(config.primaryColor);

  // ========== CORNER DECORATIONS ==========
  const cornerSize = 50;
  doc.lineWidth(2).strokeColor(config.primaryColor);
  
  // Top-left
  doc.moveTo(30, 30).lineTo(30, 30 + cornerSize).stroke();
  doc.moveTo(30, 30).lineTo(30 + cornerSize, 30).stroke();
  
  // Top-right
  doc.moveTo(pageWidth - 30, 30).lineTo(pageWidth - 30, 30 + cornerSize).stroke();
  doc.moveTo(pageWidth - 30, 30).lineTo(pageWidth - 30 - cornerSize, 30).stroke();
  
  // Bottom-left
  doc.moveTo(30, pageHeight - 30).lineTo(30, pageHeight - 30 - cornerSize).stroke();
  doc.moveTo(30, pageHeight - 30).lineTo(30 + cornerSize, pageHeight - 30).stroke();
  
  // Bottom-right
  doc.moveTo(pageWidth - 30, pageHeight - 30).lineTo(pageWidth - 30, pageHeight - 30 - cornerSize).stroke();
  doc.moveTo(pageWidth - 30, pageHeight - 30).lineTo(pageWidth - 30 - cornerSize, pageHeight - 30).stroke();

  // ========== LOGO WITH HEIGHT CONTROL ==========
  if (config.showLogo) {
    const logoPath = "C:/Users/Akshyi/Documents/event/backend/assets/uit_logo.png";
    
    // Calculate logo dimensions with height control
    let logoOptions = {
      width: config.logoWidth
    };
    
    // If specific height is provided, use it
    if (config.logoHeight) {
      logoOptions.height = config.logoHeight;
    }
    
    // Calculate position with offsets
    const logoX = (pageWidth - config.logoWidth) / 2 + config.logoXOffset;
    const logoY = 45 + config.logoYOffset;
    
    try {
      if (fs.existsSync(logoPath)) {
        doc.image(logoPath, logoX, logoY, logoOptions);
        console.log("Logo loaded successfully with dimensions:", logoOptions);
      } else {
        console.log("Logo not found at:", logoPath);
      }
    } catch (err) {
      console.log("Error loading logo:", err.message);
    }
  }

  // ========== MAIN TITLE ==========
  doc.font("Helvetica-Bold")
    .fontSize(42)
    .fillColor(config.secondaryColor)
    .text(config.mainTitle, 0, 190, { align: "center" });

  doc.fontSize(18)
    .fillColor(config.primaryColor)
    .text(`OF ${config.certificateType}`, 0, 235, { align: "center" });

  // Decorative line under title
  const lineWidth = 250;
  doc.moveTo((pageWidth - lineWidth) / 2, 255)
    .lineTo((pageWidth + lineWidth) / 2, 255)
    .lineWidth(1.5)
    .strokeColor(config.primaryColor)
    .stroke();

  // ========== PARAGRAPH WITH LETTER SPACING CONTROL ==========
  let currentY = 290;
  
  // Helper function to format text with letter spacing
  function formatTextWithSpacing(text, fontSize, letterSpacing) {
    if (!letterSpacing || letterSpacing === 0) return text;
    
    // Add space between each character
    return text.split('').join(' '.repeat(Math.abs(letterSpacing)));
  }
  
  // Function to create styled paragraph with different formatting
  function createStyledParagraph(student, config) {
    const parts = [];
    
    // Part 1: Opening text
    parts.push({ text: "This certificate is proudly presented to ", isBold: false, color: config.textColor });
    
    // Part 2: Student name (bold)
    parts.push({ text: student.name, isBold: true, color: config.secondaryColor });
    
    // Part 3: Middle text
    parts.push({ text: " for outstanding performance and dedication in ", isBold: false, color: config.textColor });
    
    // Part 4: Event name (highlighted)
    parts.push({ text: student.event_name, isBold: true, color: config.eventNameColor });
    
    // Part 5: Closing text
    parts.push({ text: ` organized by ${student.organized_by || "Department of Computer Science"}.`, isBold: false, color: config.textColor });
    
    return parts;
  }
  
  const paragraphParts = createStyledParagraph(student, config);
  
  // Set paragraph font settings
  doc.fontSize(config.paragraphFontSize);
  
  // Apply letter spacing if needed
  if (config.paragraphLetterSpacing !== 0) {
    // Note: PDFKit doesn't directly support letter spacing
    // Alternative: Use character spacing by adding spaces
    doc.font("Helvetica");
  }
  
  // Function to measure text width with letter spacing
  function getTextWidth(text, isBold) {
    if (isBold) {
      doc.font("Helvetica-Bold");
    } else {
      doc.font("Helvetica");
    }
    const width = doc.widthOfString(text);
    
    // Add letter spacing width
    if (config.paragraphLetterSpacing > 0) {
      return width + (text.length * config.paragraphLetterSpacing);
    }
    return width;
  }
  
  // Function to draw text with letter spacing
  function drawTextWithSpacing(text, x, y, isBold, color) {
    doc.fillColor(color);
    
    if (isBold) {
      doc.font("Helvetica-Bold");
    } else {
      doc.font("Helvetica");
    }
    
    if (config.paragraphLetterSpacing === 0) {
      // Normal text without spacing
      doc.text(text, x, y, { continued: true });
    } else {
      // Draw each character with spacing
      let currentX = x;
      for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const charWidth = doc.widthOfString(char);
        doc.text(char, currentX, y, { continued: true, lineBreak: false });
        currentX += charWidth + config.paragraphLetterSpacing;
      }
    }
  }
  
  // Word wrap function with letter spacing consideration
  function wrapTextWithSpacing(parts, maxWidth) {
    const lines = [];
    let currentLine = [];
    let currentWidth = 0;
    
    for (const part of parts) {
      const words = part.text.split(' ');
      
      for (let i = 0; i < words.length; i++) {
        const word = words[i];
        const wordWidth = getTextWidth(word + (i < words.length - 1 ? ' ' : ''), part.isBold);
        
        if (currentWidth + wordWidth <= maxWidth) {
          currentLine.push({ ...part, text: word + (i < words.length - 1 ? ' ' : '') });
          currentWidth += wordWidth;
        } else {
          if (currentLine.length > 0) {
            lines.push(currentLine);
            currentLine = [];
            currentWidth = 0;
          }
          currentLine.push({ ...part, text: word + (i < words.length - 1 ? ' ' : '') });
          currentWidth = wordWidth;
        }
      }
    }
    
    if (currentLine.length > 0) {
      lines.push(currentLine);
    }
    
    return lines;
  }
  
  const maxWidth = config.paragraphMaxWidth;
  const lines = wrapTextWithSpacing(paragraphParts, maxWidth);
  const paragraphX = (pageWidth - maxWidth) / 2;
  
  // Draw the paragraph with letter spacing
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    let currentX = paragraphX;
    
    // Calculate line width for alignment
    let totalLineWidth = 0;
    for (const part of line) {
      totalLineWidth += getTextWidth(part.text, part.isBold);
    }
    
    // Apply alignment
    let startX = paragraphX;
    if (config.paragraphAlign === "center") {
      startX = paragraphX + (maxWidth - totalLineWidth) / 2;
    } else if (config.paragraphAlign === "right") {
      startX = paragraphX + (maxWidth - totalLineWidth);
    }
    
    currentX = startX;
    
    // Draw each part of the line
    for (const part of line) {
      if (part.isBold) {
        doc.font("Helvetica-Bold");
      } else {
        doc.font("Helvetica");
      }
      doc.fillColor(part.color);
      
      if (config.paragraphLetterSpacing === 0) {
        doc.text(part.text, currentX, currentY + (i * config.paragraphLineHeight), { continued: true });
        currentX += doc.widthOfString(part.text);
      } else {
        // Draw with letter spacing
        for (let j = 0; j < part.text.length; j++) {
          const char = part.text[j];
          const charWidth = doc.widthOfString(char);
          doc.text(char, currentX, currentY + (i * config.paragraphLineHeight), { continued: true, lineBreak: false });
          currentX += charWidth + config.paragraphLetterSpacing;
        }
      }
    }
  }
  
  // Calculate Y position after paragraph
  currentY = currentY + (lines.length * config.paragraphLineHeight) + 30;

  // ========== ADDITIONAL INFO (if provided) ==========
  if (student.additional_info) {
    doc.font("Helvetica")
      .fontSize(12)
      .fillColor(config.subTextColor)
      .text(student.additional_info, 0, currentY, { align: "center" });
    currentY += 30;
  }

  // ========== DATES ==========
  if (student.startDate && student.endDate) {
    doc.font("Helvetica")
      .fontSize(12)
      .fillColor(config.subTextColor)
      .text(`Duration: ${student.startDate} to ${student.endDate}`, 0, currentY, { align: "center" });
    currentY += 30;
  }

  // ========== SIGNATURE SECTION ==========
  const signY = 480;
  
  if (config.showSignature) {
    // Signature line
    doc.moveTo(550, signY)
      .lineTo(750, signY)
      .lineWidth(1)
      .strokeColor(config.primaryColor)
      .stroke();
    
    doc.font("Helvetica")
      .fontSize(10)
      .fillColor(config.subTextColor)
      .text("Authorized Signatory", 620, signY + 8);
    
    doc.fontSize(9)
      .fillColor(config.subTextColor)
      .text("(Principal)", 640, signY + 22);
  }

  // ========== DATE ON LEFT SIDE ==========
  if (config.showDate) {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    doc.font("Helvetica")
      .fontSize(10)
      .fillColor(config.subTextColor)
      .text("Date", 80, signY);
    
    doc.font("Helvetica-Bold")
      .fontSize(11)
      .fillColor(config.secondaryColor)
      .text(formattedDate, 80, signY + 15);
  }

  

  // ========== BOTTOM TEXT ==========
  doc.font("Helvetica")
    .fontSize(7)
    .fillColor("#aaaaaa")
    .text(config.footerText, pageWidth / 2 - 100, pageHeight - 25, { align: "center" });

  doc.end();
}

module.exports = generateCertificate; 