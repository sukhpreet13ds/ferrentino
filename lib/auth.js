export const ADMIN_COOKIE = "admin_session";

function getSecret() {
  return process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD || "ferrentino-dev-secret";
}

async function sha256Hex(text) {
  const data = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function expectedSessionToken() {
  return sha256Hex(`ferrentino-admin:${getSecret()}`);
}

export function checkPassword(password) {
  const expected = process.env.ADMIN_PASSWORD || "admin";
  return typeof password === "string" && password.length > 0 && password === expected;
}

export async function isValidSessionToken(token) {
  if (!token) return false;
  const expected = await expectedSessionToken();
  return token === expected;
}
