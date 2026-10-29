import { NextResponse } from "next/server";
import { sendMailgunEmail, NOTIFICATION_EMAILS } from "../../../lib/mailgun";
import { generateEstimatePdf } from "../../../lib/generateEstimatePdf";

export async function POST(request) {
  try {
    const body = await request.json();
    const { type } = body;

    if (!type) {
      return NextResponse.json({ error: "Missing submission type" }, { status: 400 });
    }

    // ─────────────────────────────────────────────────────────────
    // 1. ESTIMATOR - NEW "Send Me This Estimate" (Sends to admin AND end user with PDF)
    // ─────────────────────────────────────────────────────────────
    if (type === "estimator-send-me") {
      const {
        name,
        email,
        phone,
        notes,
        projectType = "Project",
        squareFootage = "",
        selectedOptions = "",
        estimatedCostRange = "$0",
        breakdown = "",
        breakdownItems = [],
      } = body;

      if (!email) {
        return NextResponse.json({ error: "Email is required" }, { status: 400 });
      }

      // Generate the PDF
      const pdfBuffer = generateEstimatePdf({
        customerName: name || "Valued Client",
        customerEmail: email,
        customerPhone: phone,
        customerNotes: notes,
        projectType,
        squareFootage,
        selectedOptions,
        estimatedCostRange,
        breakdown,
        breakdownItems,
      });

      const safeFilename = `Ferrentino_Estimate_${projectType.replace(/[^a-zA-Z0-9]/g, "_")}.pdf`;

      // A) Send to Admin (estimating@ferrentinoandson.com & devteam@dillonmediagroup.com)
      const adminText = [
        `NEW ESTIMATE REQUESTED (VIA 'SEND ME THIS ESTIMATE')`,
        `======================================================`,
        `Customer Name: ${name || "Not provided"}`,
        `Customer Email: ${email}`,
        `Customer Phone: ${phone || "Not provided"}`,
        `Notes / Comments: ${notes || "None"}`,
        ``,
        `ESTIMATE DETAILS:`,
        `-----------------`,
        `Project Type: ${projectType}`,
        `Scope / Square Footage: ${squareFootage || "N/A"}`,
        `Selections: ${selectedOptions || "Standard"}`,
        `Estimated Range: ${estimatedCostRange}`,
        ``,
        `Breakdown:`,
        breakdown || "N/A",
        ``,
        `A PDF copy has been attached to this email and was also sent to the customer.`,
      ].join("\n");

      const adminHtml = `
        <div style="font-family: Arial, sans-serif; color: #222; max-width: 600px; line-height: 1.5;">
          <h2 style="color: #111; border-bottom: 2px solid #FBC705; padding-bottom: 8px;">
            New Estimate Sent to Customer
          </h2>
          <p>A customer just requested a preliminary estimate copy on the website.</p>
          <table style="width: 100%; border-collapse: collapse; margin-top: 12px; margin-bottom: 20px;">
            <tr style="background: #f7f7f7;"><td style="padding: 8px; font-weight: bold; width: 35%;">Name</td><td style="padding: 8px;">${name || "Not provided"}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Email</td><td style="padding: 8px;"><a href="mailto:${email}">${email}</a></td></tr>
            <tr style="background: #f7f7f7;"><td style="padding: 8px; font-weight: bold;">Phone</td><td style="padding: 8px;">${phone || "Not provided"}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Project Type</td><td style="padding: 8px;"><strong>${projectType}</strong></td></tr>
            <tr style="background: #f7f7f7;"><td style="padding: 8px; font-weight: bold;">Scope / Size</td><td style="padding: 8px;">${squareFootage || "N/A"}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Selections</td><td style="padding: 8px;">${selectedOptions || "Standard"}</td></tr>
            <tr style="background: #f7f7f7;"><td style="padding: 8px; font-weight: bold;">Preliminary Cost</td><td style="padding: 8px; font-weight: bold; color: #b8860b;">${estimatedCostRange}</td></tr>
            ${notes ? `<tr><td style="padding: 8px; font-weight: bold;">Customer Notes</td><td style="padding: 8px;">${notes}</td></tr>` : ""}
          </table>
          <p style="font-size: 13px; color: #777;">A PDF copy of this estimate is attached.</p>
        </div>
      `;

      await sendMailgunEmail({
        to: NOTIFICATION_EMAILS,
        replyTo: email,
        subject: `New Estimate Requested: ${projectType} - ${name || email}`,
        text: adminText,
        html: adminHtml,
        attachment: {
          filename: safeFilename,
          data: pdfBuffer,
          contentType: "application/pdf",
        },
      });

      // B) Send to End User (Little text message + text of estimate + PDF attached)
      const userFirstName = (name || "there").split(" ")[0];
      const userText = [
        `Hi ${userFirstName},`,
        ``,
        `Thank you for using the Ferrentino & Son project estimator!`,
        ``,
        `Here is a summary of your preliminary estimate:`,
        `-----------------------------------------------`,
        `Project: ${projectType}`,
        squareFootage ? `Scope / Size: ${squareFootage}` : "",
        selectedOptions ? `Selections: ${selectedOptions}` : "",
        `Estimated Range: ${estimatedCostRange}`,
        ``,
        breakdown ? `Breakdown:\n${breakdown}\n` : "",
        `We have attached a printable PDF of your estimate to this email for your records.`,
        ``,
        `This preliminary cost estimate is designed for planning purposes. Actual project costs will be confirmed in a formal project proposal and site consultation with our building team.`,
        ``,
        `When you are ready to take the next step or if you have any questions, simply reply directly to this email or call us at (352) 237-3368.`,
        ``,
        `Warm regards,`,
        `The Ferrentino & Son Team`,
        `estimating@ferrentinoandson.com`,
        `(352) 237-3368`,
        `www.ferrentinoandson.com`,
      ]
        .filter(Boolean)
        .join("\n");

      const userHtml = `
        <div style="font-family: Arial, sans-serif; color: #222; max-width: 600px; line-height: 1.6; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
          <div style="background: #111213; padding: 24px; color: #ffffff;">
            <h1 style="margin: 0; font-size: 22px; letter-spacing: 0.05em; color: #FBC705;">FERRENTINO & SON</h1>
            <p style="margin: 4px 0 0 0; font-size: 12px; color: #ccc;">Certified Building Contractor · Marion County & Central Florida</p>
          </div>
          <div style="padding: 24px;">
            <p style="font-size: 16px;">Hi ${userFirstName},</p>
            <p>Thank you for exploring your project with our online estimator! Here is the summary of your preliminary project estimate:</p>
            
            <div style="background: #f8f9fa; border-left: 4px solid #FBC705; padding: 16px; margin: 20px 0; border-radius: 4px;">
              <p style="margin: 0 0 6px 0; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; color: #666; font-weight: bold;">Estimated Project</p>
              <h3 style="margin: 0 0 8px 0; font-size: 18px; color: #111;">${projectType}</h3>
              ${squareFootage ? `<p style="margin: 0 0 4px 0; font-size: 14px;"><strong>Scope / Size:</strong> ${squareFootage}</p>` : ""}
              ${selectedOptions ? `<p style="margin: 0 0 8px 0; font-size: 14px;"><strong>Selections:</strong> ${selectedOptions}</p>` : ""}
              <div style="margin-top: 12px; padding-top: 10px; border-top: 1px solid #e0e0e0;">
                <span style="font-size: 12px; text-transform: uppercase; color: #777; font-weight: bold; display: block;">Estimated Cost Range</span>
                <span style="font-size: 22px; font-weight: bold; color: #111;">${estimatedCostRange}</span>
              </div>
            </div>

            <p><strong>We have attached a PDF copy of your estimate to this email</strong> for your convenience and records.</p>
            
            <p style="font-size: 13px; color: #777; background: #fafafa; padding: 12px; border-radius: 4px; border: 1px solid #eee;">
              <em>Note: This calculator provides preliminary planning figures. Final pricing is confirmed after an on-site consultation where site access, grading, material choices, and permit requirements are reviewed.</em>
            </p>

            <p>When you're ready to discuss your plans or schedule a site visit, simply reply to this email or call our team at <strong>(352) 237-3368</strong>.</p>

            <p style="margin-top: 24px; border-top: 1px solid #eee; padding-top: 16px; font-size: 14px;">
              Warm regards,<br />
              <strong>Ferrentino & Son, LLC</strong><br />
              <a href="mailto:estimating@ferrentinoandson.com" style="color: #111;">estimating@ferrentinoandson.com</a><br />
              (352) 237-3368<br />
              <a href="https://ferrentinoandson.com" style="color: #b8860b;">www.ferrentinoandson.com</a>
            </p>
          </div>
        </div>
      `;

      await sendMailgunEmail({
        to: email,
        replyTo: "estimating@ferrentinoandson.com",
        subject: `Your Project Estimate - Ferrentino & Son`,
        text: userText,
        html: userHtml,
        attachment: {
          filename: safeFilename,
          data: pdfBuffer,
          contentType: "application/pdf",
        },
      });

      return NextResponse.json({ success: true, message: "Estimate sent to customer and estimating team" });
    }

    // ─────────────────────────────────────────────────────────────
    // 2. ESTIMATOR - DETAILED QUOTE REQUEST (Sends to estimating team AND customer with PDF)
    // ─────────────────────────────────────────────────────────────
    if (type === "estimator-quote") {
      const {
        customerName,
        customerEmail,
        customerPhone,
        projectAddress,
        customerNotes,
        projectType = "Project",
        squareFootage = "",
        selectedOptions = "",
        estimatedCostRange = "$0",
        breakdown = "",
        breakdownItems = [],
      } = body;

      // Generate the PDF
      const pdfBuffer = generateEstimatePdf({
        customerName: customerName || "Valued Client",
        customerEmail: customerEmail,
        customerPhone: customerPhone,
        customerNotes,
        projectAddress,
        projectType,
        squareFootage,
        selectedOptions,
        estimatedCostRange,
        breakdown,
        breakdownItems,
      });

      const safeFilename = `Ferrentino_Estimate_${projectType.replace(/[^a-zA-Z0-9]/g, "_")}.pdf`;

      // A) Send to Admin (estimating@ferrentinoandson.com & devteam@dillonmediagroup.com)
      const text = [
        `NEW PROJECT QUOTE INQUIRY (ESTIMATOR)`,
        `======================================`,
        `Name: ${customerName || "Not provided"}`,
        `Email: ${customerEmail || "Not provided"}`,
        `Phone: ${customerPhone || "Not provided"}`,
        `Project Address / City: ${projectAddress || "Not provided"}`,
        `Notes / Ideas: ${customerNotes || "None"}`,
        ``,
        `PROJECT DETAILS:`,
        `----------------`,
        `Project Type: ${projectType || "N/A"}`,
        `Scope / Square Footage: ${squareFootage || "N/A"}`,
        `Selections: ${selectedOptions || "Standard"}`,
        `Estimated Range: ${estimatedCostRange || "N/A"}`,
        ``,
        `Breakdown:`,
        breakdown || "N/A",
        ``,
        `A PDF copy has been attached to this email and was also sent to the customer.`,
      ].join("\n");

      const html = `
        <div style="font-family: Arial, sans-serif; color: #222; max-width: 600px; line-height: 1.5;">
          <h2 style="color: #111; border-bottom: 2px solid #FBC705; padding-bottom: 8px;">
            New Project Proposal Inquiry
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 12px; margin-bottom: 20px;">
            <tr style="background: #f7f7f7;"><td style="padding: 8px; font-weight: bold; width: 35%;">Name</td><td style="padding: 8px;">${customerName || "Not provided"}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Email</td><td style="padding: 8px;"><a href="mailto:${customerEmail}">${customerEmail}</a></td></tr>
            <tr style="background: #f7f7f7;"><td style="padding: 8px; font-weight: bold;">Phone</td><td style="padding: 8px;">${customerPhone || "Not provided"}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Project Location</td><td style="padding: 8px;">${projectAddress || "Not provided"}</td></tr>
            <tr style="background: #f7f7f7;"><td style="padding: 8px; font-weight: bold;">Project Type</td><td style="padding: 8px;"><strong>${projectType}</strong></td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Scope / Size</td><td style="padding: 8px;">${squareFootage || "N/A"}</td></tr>
            <tr style="background: #f7f7f7;"><td style="padding: 8px; font-weight: bold;">Selections</td><td style="padding: 8px;">${selectedOptions || "Standard"}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Calculated Range</td><td style="padding: 8px; font-weight: bold; color: #b8860b;">${estimatedCostRange}</td></tr>
            ${customerNotes ? `<tr style="background: #f7f7f7;"><td style="padding: 8px; font-weight: bold;">Customer Notes</td><td style="padding: 8px;">${customerNotes}</td></tr>` : ""}
          </table>
          <p style="font-size: 13px; color: #777;">A PDF copy of this estimate is attached.</p>
        </div>
      `;

      await sendMailgunEmail({
        to: NOTIFICATION_EMAILS,
        replyTo: customerEmail,
        subject: `Project Proposal Request: ${projectType} - ${customerName}`,
        text,
        html,
        attachment: {
          filename: safeFilename,
          data: pdfBuffer,
          contentType: "application/pdf",
        },
      });

      // B) Send to Customer with PDF & Text message
      if (customerEmail) {
        const userFirstName = (customerName || "there").split(" ")[0];
        const userText = [
          `Hi ${userFirstName},`,
          ``,
          `Thank you for requesting a detailed project proposal from Ferrentino & Son!`,
          ``,
          `Here is a summary of your preliminary project estimate:`,
          `-------------------------------------------------------`,
          `Project: ${projectType}`,
          squareFootage ? `Scope / Size: ${squareFootage}` : "",
          selectedOptions ? `Selections: ${selectedOptions}` : "",
          `Estimated Range: ${estimatedCostRange}`,
          projectAddress ? `Project Location: ${projectAddress}` : "",
          ``,
          breakdown ? `Breakdown:\n${breakdown}\n` : "",
          `We have attached a printable PDF of your estimate to this email for your records.`,
          ``,
          `Our master builder team is reviewing your project parameters and will contact you shortly with next steps.`,
          ``,
          `When you are ready or if you have any questions, feel free to reply directly to this email or call us at (352) 237-3368.`,
          ``,
          `Warm regards,`,
          `The Ferrentino & Son Team`,
          `estimating@ferrentinoandson.com`,
          `(352) 237-3368`,
          `www.ferrentinoandson.com`,
        ]
          .filter(Boolean)
          .join("\n");

        const userHtml = `
          <div style="font-family: Arial, sans-serif; color: #222; max-width: 600px; line-height: 1.6; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
            <div style="background: #111213; padding: 24px; color: #ffffff;">
              <h1 style="margin: 0; font-size: 22px; letter-spacing: 0.05em; color: #FBC705;">FERRENTINO & SON</h1>
              <p style="margin: 4px 0 0 0; font-size: 12px; color: #ccc;">Certified Building Contractor · Marion County & Central Florida</p>
            </div>
            <div style="padding: 24px;">
              <p style="font-size: 16px;">Hi ${userFirstName},</p>
              <p>Thank you for submitting your project quote request! Here is a summary of your preliminary project estimate:</p>
              
              <div style="background: #f8f9fa; border-left: 4px solid #FBC705; padding: 16px; margin: 20px 0; border-radius: 4px;">
                <p style="margin: 0 0 6px 0; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; color: #666; font-weight: bold;">Project Proposal Request</p>
                <h3 style="margin: 0 0 8px 0; font-size: 18px; color: #111;">${projectType}</h3>
                ${squareFootage ? `<p style="margin: 0 0 4px 0; font-size: 14px;"><strong>Scope / Size:</strong> ${squareFootage}</p>` : ""}
                ${selectedOptions ? `<p style="margin: 0 0 4px 0; font-size: 14px;"><strong>Selections:</strong> ${selectedOptions}</p>` : ""}
                ${projectAddress ? `<p style="margin: 0 0 8px 0; font-size: 14px;"><strong>Location:</strong> ${projectAddress}</p>` : ""}
                <div style="margin-top: 12px; padding-top: 10px; border-top: 1px solid #e0e0e0;">
                  <span style="font-size: 12px; text-transform: uppercase; color: #777; font-weight: bold; display: block;">Preliminary Estimated Range</span>
                  <span style="font-size: 22px; font-weight: bold; color: #111;">${estimatedCostRange}</span>
                </div>
              </div>

              <p><strong>We have attached a PDF copy of your estimate to this email</strong> for your convenience and records.</p>
              
              <p style="font-size: 13px; color: #777; background: #fafafa; padding: 12px; border-radius: 4px; border: 1px solid #eee;">
                <em>Our master building team will examine your specifications and contact you shortly with next steps.</em>
              </p>

              <p>When you're ready or if you have any questions, feel free to reply directly to this email or call us at <strong>(352) 237-3368</strong>.</p>

              <p style="margin-top: 24px; border-top: 1px solid #eee; padding-top: 16px; font-size: 14px;">
                Warm regards,<br />
                <strong>Ferrentino & Son, LLC</strong><br />
                <a href="mailto:estimating@ferrentinoandson.com" style="color: #111;">estimating@ferrentinoandson.com</a><br />
                (352) 237-3368<br />
                <a href="https://ferrentinoandson.com" style="color: #b8860b;">www.ferrentinoandson.com</a>
              </p>
            </div>
          </div>
        `;

        await sendMailgunEmail({
          to: customerEmail,
          replyTo: "estimating@ferrentinoandson.com",
          subject: `Your Project Estimate & Quote Request - Ferrentino & Son`,
          text: userText,
          html: userHtml,
          attachment: {
            filename: safeFilename,
            data: pdfBuffer,
            contentType: "application/pdf",
          },
        });
      }

      return NextResponse.json({ success: true, message: "Quote request sent to customer and estimating team" });
    }

    // ─────────────────────────────────────────────────────────────
    // 3. ESTIMATOR - CATALOG CART SUBMISSION (Sends only to estimating team)
    // ─────────────────────────────────────────────────────────────
    if (type === "estimator-catalog") {
      const { name, email, phone, notes, estimateLow, estimateHigh, lineItems, extras, contingency } = body;

      const text = [
        `NEW CATALOG ESTIMATE SUBMISSION`,
        `===============================`,
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone || "Not provided"}`,
        `Notes: ${notes || "None"}`,
        `Estimated Total: ${estimateLow} – ${estimateHigh}`,
        `Contingency: ${contingency || "None"}`,
        ``,
        `Line Items:`,
        lineItems || "None",
        ``,
        `Extras:`,
        extras || "None",
      ].join("\n");

      const html = `
        <div style="font-family: Arial, sans-serif; color: #222; max-width: 600px; line-height: 1.5;">
          <h2 style="color: #111; border-bottom: 2px solid #FBC705; padding-bottom: 8px;">
            New Catalog Estimate Inquiry
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 12px; margin-bottom: 20px;">
            <tr style="background: #f7f7f7;"><td style="padding: 8px; font-weight: bold; width: 35%;">Name</td><td style="padding: 8px;">${name}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Email</td><td style="padding: 8px;"><a href="mailto:${email}">${email}</a></td></tr>
            <tr style="background: #f7f7f7;"><td style="padding: 8px; font-weight: bold;">Phone</td><td style="padding: 8px;">${phone || "Not provided"}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Estimate Range</td><td style="padding: 8px; font-weight: bold; color: #b8860b;">${estimateLow} – ${estimateHigh}</td></tr>
            <tr style="background: #f7f7f7;"><td style="padding: 8px; font-weight: bold;">Contingency</td><td style="padding: 8px;">${contingency || "None"}</td></tr>
            ${notes ? `<tr><td style="padding: 8px; font-weight: bold;">Notes</td><td style="padding: 8px;">${notes}</td></tr>` : ""}
          </table>
          <h4 style="margin-bottom: 6px;">Line Items:</h4>
          <pre style="background: #f7f7f7; padding: 10px; border-radius: 4px; font-size: 13px;">${lineItems || "None"}</pre>
          ${extras && extras !== "none" ? `<h4 style="margin-bottom: 6px;">Add-ons:</h4><pre style="background: #f7f7f7; padding: 10px; border-radius: 4px; font-size: 13px;">${extras}</pre>` : ""}
        </div>
      `;

      await sendMailgunEmail({
        to: NOTIFICATION_EMAILS,
        replyTo: email,
        subject: `New Catalog Estimate: ${name}`,
        text,
        html,
      });

      return NextResponse.json({ success: true });
    }

    // ─────────────────────────────────────────────────────────────
    // 4. CONTACT PAGE (/contact) - Sends only to estimating team
    // ─────────────────────────────────────────────────────────────
    if (type === "contact") {
      const { name, phone, email, location, services = [], budget, details } = body;

      const servicesStr = Array.isArray(services) && services.length > 0 ? services.join(", ") : "None specified";

      const text = [
        `NEW CONTACT INQUIRY (/contact)`,
        `==============================`,
        `Name: ${name || "Not provided"}`,
        `Phone: ${phone || "Not provided"}`,
        `Email: ${email || "Not provided"}`,
        `Project Location / City: ${location || "Not provided"}`,
        `Services of Interest: ${servicesStr}`,
        `Estimated Budget: ${budget || "Not provided"}`,
        ``,
        `Project Details / Message:`,
        details || "None provided",
      ].join("\n");

      const html = `
        <div style="font-family: Arial, sans-serif; color: #222; max-width: 600px; line-height: 1.5;">
          <h2 style="color: #111; border-bottom: 2px solid #FBC705; padding-bottom: 8px;">
            New Contact Page Inquiry
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 12px; margin-bottom: 20px;">
            <tr style="background: #f7f7f7;"><td style="padding: 8px; font-weight: bold; width: 35%;">Name</td><td style="padding: 8px;">${name || "Not provided"}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Phone</td><td style="padding: 8px;">${phone || "Not provided"}</td></tr>
            <tr style="background: #f7f7f7;"><td style="padding: 8px; font-weight: bold;">Email</td><td style="padding: 8px;"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Location</td><td style="padding: 8px;">${location || "Not provided"}</td></tr>
            <tr style="background: #f7f7f7;"><td style="padding: 8px; font-weight: bold;">Services</td><td style="padding: 8px;">${servicesStr}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Budget</td><td style="padding: 8px;">${budget || "Not provided"}</td></tr>
            ${details ? `<tr style="background: #f7f7f7;"><td style="padding: 8px; font-weight: bold;">Project Details</td><td style="padding: 8px;">${details}</td></tr>` : ""}
          </table>
        </div>
      `;

      await sendMailgunEmail({
        to: NOTIFICATION_EMAILS,
        replyTo: email,
        subject: `New Contact Inquiry: ${name || "Website Visitor"}`,
        text,
        html,
      });

      return NextResponse.json({ success: true });
    }

    // ─────────────────────────────────────────────────────────────
    // 5. CONTRACTOR PAGE (/contractor) - Sends only to estimating team
    // ─────────────────────────────────────────────────────────────
    if (type === "contractor") {
      const {
        companyName,
        yearsInBusiness,
        country,
        addressLine1,
        addressLine2,
        city,
        state,
        zip,
        firstName,
        lastName,
        contactEmail,
        contactPhone,
      } = body;

      const fullName = `${firstName || ""} ${lastName || ""}`.trim();

      const text = [
        `NEW SUBCONTRACTOR APPLICATION (/contractor)`,
        `============================================`,
        `Company Name: ${companyName}`,
        `Years in Business: ${yearsInBusiness || "N/A"}`,
        ``,
        `COMPANY ADDRESS:`,
        `----------------`,
        `Country: ${country || "USA"}`,
        `Address Line 1: ${addressLine1}`,
        addressLine2 ? `Address Line 2: ${addressLine2}` : "",
        `City, State Zip: ${city}, ${state} ${zip}`,
        ``,
        `PRIMARY CONTACT:`,
        `----------------`,
        `Contact Name: ${fullName}`,
        `Email: ${contactEmail}`,
        `Phone: ${contactPhone}`,
      ]
        .filter(Boolean)
        .join("\n");

      const html = `
        <div style="font-family: Arial, sans-serif; color: #222; max-width: 600px; line-height: 1.5;">
          <h2 style="color: #111; border-bottom: 2px solid #FBC705; padding-bottom: 8px;">
            New Subcontractor Application
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 12px; margin-bottom: 20px;">
            <tr style="background: #f7f7f7;"><td style="padding: 8px; font-weight: bold; width: 35%;">Company Name</td><td style="padding: 8px;"><strong>${companyName}</strong></td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Years in Business</td><td style="padding: 8px;">${yearsInBusiness || "N/A"}</td></tr>
            <tr style="background: #f7f7f7;"><td style="padding: 8px; font-weight: bold;">Address</td><td style="padding: 8px;">${addressLine1}${addressLine2 ? `, ${addressLine2}` : ""}<br />${city}, ${state} ${zip}<br />${country || "USA"}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Primary Contact</td><td style="padding: 8px;">${fullName}</td></tr>
            <tr style="background: #f7f7f7;"><td style="padding: 8px; font-weight: bold;">Email</td><td style="padding: 8px;"><a href="mailto:${contactEmail}">${contactEmail}</a></td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Phone</td><td style="padding: 8px;">${contactPhone}</td></tr>
          </table>
        </div>
      `;

      await sendMailgunEmail({
        to: NOTIFICATION_EMAILS,
        replyTo: contactEmail,
        subject: `Subcontractor Application: ${companyName} (${fullName})`,
        text,
        html,
      });

      return NextResponse.json({ success: true });
    }

    // ─────────────────────────────────────────────────────────────
    // 6. FOOTER SUBSCRIBE - Sends only to estimating team
    // ─────────────────────────────────────────────────────────────
    if (type === "subscribe") {
      const { email } = body;
      if (!email) {
        return NextResponse.json({ error: "Email is required" }, { status: 400 });
      }

      const text = `NEW NEWSLETTER SUBSCRIPTION\n\nEmail: ${email}\nDate: ${new Date().toLocaleString()}`;
      const html = `
        <div style="font-family: Arial, sans-serif; color: #222; max-width: 500px;">
          <h3 style="color: #111; border-bottom: 2px solid #FBC705; padding-bottom: 6px;">New Newsletter Subscriber</h3>
          <p>A new visitor has subscribed to the newsletter on the Ferrentino & Son website:</p>
          <p style="font-size: 16px; font-weight: bold; background: #f7f7f7; padding: 12px; border-radius: 4px;">
            <a href="mailto:${email}" style="color: #111;">${email}</a>
          </p>
          <p style="font-size: 12px; color: #777;">Received at: ${new Date().toLocaleString()}</p>
        </div>
      `;

      await sendMailgunEmail({
        to: NOTIFICATION_EMAILS,
        replyTo: email,
        subject: `New Newsletter Subscriber: ${email}`,
        text,
        html,
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Unknown submission type" }, { status: 400 });
  } catch (err) {
    console.error("[send-email route error]:", err);
    return NextResponse.json({ error: err.message || "Failed to process email" }, { status: 500 });
  }
}

