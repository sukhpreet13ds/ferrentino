import { jsPDF } from "jspdf";

/**
 * Generates a clean, professional PDF estimate document for Ferrentino & Son.
 * Returns a Buffer of the generated PDF.
 */
export function generateEstimatePdf({
  customerName = "Valued Client",
  customerEmail = "",
  customerPhone = "",
  customerNotes = "",
  projectAddress = "",
  projectType = "Custom Project",
  squareFootage = "",
  selectedOptions = "",
  estimatedCostRange = "$0",
  breakdown = "",
  breakdownItems = [],
}) {
  const doc = new jsPDF({ unit: "pt", format: "letter" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 40;
  const contentWidth = pageWidth - margin * 2;

  // 1. Header Bar (Dark Navy / Black)
  doc.setFillColor(17, 18, 19);
  doc.rect(0, 0, pageWidth, 90, "F");

  // 2. Gold Accent Strip
  doc.setFillColor(251, 199, 5); // Ferrentino gold
  doc.rect(0, 90, pageWidth, 4, "F");

  // Company Brand
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("FERRENTINO & SON, LLC", margin, 42);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(210, 210, 210);
  doc.text("Certified Building Contractor · Marion County & Central Florida", margin, 60);
  doc.text("Phone: (352) 237-3368   |   Email: estimating@ferrentinoandson.com   |   Web: ferrentinoandson.com", margin, 74);

  // 3. Document Title & Metadata
  let y = 125;
  doc.setTextColor(17, 18, 19);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("PRELIMINARY PROJECT ESTIMATE", margin, y);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(100, 100, 100);
  const now = new Date();
  const dateStr = now.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  doc.text(`Date: ${dateStr}`, pageWidth - margin - 140, y, { align: "left" });

  y += 18;
  doc.setDrawColor(225, 225, 225);
  doc.setLineWidth(1);
  doc.line(margin, y, pageWidth - margin, y);

  // 4. Client Information Box
  y += 20;
  doc.setFillColor(248, 249, 250);
  doc.roundedRect(margin, y, contentWidth, 75, 4, 4, "F");
  doc.setDrawColor(230, 230, 230);
  doc.roundedRect(margin, y, contentWidth, 75, 4, 4, "S");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(17, 18, 19);
  doc.text("PREPARED FOR:", margin + 14, y + 20);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(40, 40, 40);
  doc.text(`Name: ${customerName}`, margin + 14, y + 38);
  doc.text(`Email: ${customerEmail || "Not provided"}`, margin + 14, y + 54);

  const col2X = margin + 270;
  if (customerPhone) {
    doc.text(`Phone: ${customerPhone}`, col2X, y + 38);
  }
  if (projectAddress) {
    doc.text(`Location: ${projectAddress}`, col2X, y + 54);
  }

  // 5. Project Parameters
  y += 95;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(17, 18, 19);
  doc.text("PROJECT SCOPE & SELECTIONS", margin, y);

  y += 14;
  doc.setDrawColor(251, 199, 5);
  doc.setLineWidth(2);
  doc.line(margin, y, margin + 80, y);

  y += 18;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(70, 70, 70);
  doc.text("Project Type:", margin, y);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(17, 18, 19);
  doc.text(projectType, margin + 90, y);

  if (squareFootage) {
    y += 18;
    doc.setFont("helvetica", "bold");
    doc.setTextColor(70, 70, 70);
    doc.text("Scope / Size:", margin, y);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(17, 18, 19);
    doc.text(squareFootage, margin + 90, y);
  }

  if (selectedOptions) {
    y += 18;
    doc.setFont("helvetica", "bold");
    doc.setTextColor(70, 70, 70);
    doc.text("Selections:", margin, y);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(17, 18, 19);
    doc.text(selectedOptions, margin + 90, y);
  }

  // 6. Breakdown Table (if available)
  const items = breakdownItems.length > 0
    ? breakdownItems
    : breakdown
      ? breakdown.split("\n").filter(Boolean).map((line) => {
          const parts = line.split(":");
          return {
            label: parts[0]?.trim() || line,
            rangeDisplay: parts.slice(1).join(":").trim() || "",
          };
        })
      : [];

  if (items.length > 0) {
    y += 24;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(17, 18, 19);
    doc.text("ESTIMATED BREAKDOWN", margin, y);

    y += 8;
    doc.setFillColor(242, 244, 247);
    doc.rect(margin, y, contentWidth, 22, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(60, 60, 60);
    doc.text("ITEM / SCOPE", margin + 10, y + 15);
    doc.text("ESTIMATED RANGE", pageWidth - margin - 130, y + 15);

    y += 22;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);

    items.forEach((item, idx) => {
      if (idx % 2 === 1) {
        doc.setFillColor(250, 250, 252);
        doc.rect(margin, y, contentWidth, 20, "F");
      }
      doc.setTextColor(30, 30, 30);
      doc.text(item.label || "", margin + 10, y + 14);
      doc.setTextColor(17, 18, 19);
      doc.setFont("helvetica", "bold");
      doc.text(item.rangeDisplay || "", pageWidth - margin - 130, y + 14);
      doc.setFont("helvetica", "normal");
      y += 20;
    });
  }

  // 7. Total Highlight Box
  y += 18;
  doc.setFillColor(17, 18, 19);
  doc.roundedRect(margin, y, contentWidth, 54, 4, 4, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(251, 199, 5);
  doc.text("PRELIMINARY ESTIMATED RANGE", margin + 18, y + 22);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(255, 255, 255);
  doc.text(estimatedCostRange, margin + 18, y + 43);

  // 8. Customer Notes (if any)
  if (customerNotes && customerNotes !== "None") {
    y += 70;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(70, 70, 70);
    doc.text("Customer Notes:", margin, y);
    y += 14;
    doc.setFont("helvetica", "italic");
    doc.setFontSize(9);
    doc.setTextColor(60, 60, 60);
    const splitNotes = doc.splitTextToSize(customerNotes, contentWidth);
    doc.text(splitNotes, margin, y);
    y += splitNotes.length * 12;
  } else {
    y += 65;
  }

  // 9. Disclaimer Box
  const disclaimerY = Math.max(y + 10, pageHeight - 120);
  doc.setFillColor(248, 248, 248);
  doc.setDrawColor(230, 230, 230);
  doc.roundedRect(margin, disclaimerY, contentWidth, 52, 3, 3, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(80, 80, 80);
  doc.text("PRELIMINARY PLANNING DISCLAIMER", margin + 10, disclaimerY + 14);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(110, 110, 110);
  const disclaimerText =
    "This calculator provides a preliminary cost estimate for planning purposes only. Actual pricing depends on site conditions, grading, access, material selections, engineering, and municipal permits. Final pricing will be confirmed in a formal project proposal and agreement from Ferrentino & Son, LLC.";
  const splitDisclaimer = doc.splitTextToSize(disclaimerText, contentWidth - 20);
  doc.text(splitDisclaimer, margin + 10, disclaimerY + 26);

  // 10. Footer Line
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(140, 140, 140);
  doc.text("Ferrentino & Son, LLC · 816 NE 31st Ave, Ocala, FL 34470 · (352) 237-3368 · CBC1258682", pageWidth / 2, pageHeight - 20, {
    align: "center",
  });

  return Buffer.from(doc.output("arraybuffer"));
}

