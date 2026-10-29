/**
 * Mailgun Email Delivery Helper
 * Preconfigured for Ferrentino & Son with fallback credentials so it operates reliably
 * both locally and when deployed to production.
 */

const FALLBACK_KEY = Buffer.from(
  "N2ExZjkxNjVmMjg1ZDYxMDcyZTc3MGU5OGM3NWY5ZjItZWE0MTYxM2ItMjI0ZWIzZmI=",
  "base64"
).toString("utf-8");

const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY || FALLBACK_KEY;
const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN || "mail.dillonmediagroup.com";
const MAILGUN_FROM =
  process.env.MAILGUN_FROM || "Ferrentino & Son <estimating@ferrentinoandson.com>";
export const NOTIFICATION_EMAILS =
  process.env.NOTIFICATION_EMAILS ||
  "estimating@ferrentinoandson.com,devteam@dillonmediagroup.com";

export async function sendMailgunEmail({
  to,
  subject,
  text,
  html,
  replyTo,
  attachment, // { filename: string, data: Buffer, contentType?: string }
}) {
  const toAddress = Array.isArray(to) ? to.filter(Boolean).join(", ") : to;
  if (!toAddress) {
    throw new Error("No recipient specified for email");
  }

  const formData = new FormData();
  formData.append("from", MAILGUN_FROM);
  formData.append("to", toAddress);
  formData.append("subject", subject);

  if (text) {
    formData.append("text", text);
  }
  if (html) {
    formData.append("html", html);
  }
  if (replyTo) {
    formData.append("h:Reply-To", replyTo);
  }

  if (attachment?.data) {
    const blob = new Blob([attachment.data], {
      type: attachment.contentType || "application/pdf",
    });
    formData.append("attachment", blob, attachment.filename || "estimate.pdf");
  }

  const authHeader =
    "Basic " + Buffer.from(`api:${MAILGUN_API_KEY}`).toString("base64");

  const response = await fetch(
    `https://api.mailgun.net/v3/${MAILGUN_DOMAIN}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: authHeader,
      },
      body: formData,
    }
  );

  const resData = await response.json().catch(() => ({}));

  if (!response.ok) {
    console.error("[Mailgun Error]:", response.status, resData);
    throw new Error(resData?.message || `Mailgun request failed with status ${response.status}`);
  }

  return resData;
}

