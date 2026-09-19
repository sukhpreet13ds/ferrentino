import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const ALLOWED_EXT = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg", ".mp4"];

export async function POST(request) {
  const formData = await request.formData().catch(() => null);
  const file = formData?.get("file");

  if (!file || typeof file === "string") {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const originalName = file.name || "upload";
  const ext = path.extname(originalName).toLowerCase();
  if (!ALLOWED_EXT.includes(ext)) {
    return NextResponse.json({ error: `Unsupported file type: ${ext}` }, { status: 400 });
  }

  const safeBase = path
    .basename(originalName, ext)
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60) || "file";

  const filename = `${safeBase}-${Date.now()}${ext}`;

  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  }

  const arrayBuffer = await file.arrayBuffer();
  fs.writeFileSync(path.join(UPLOAD_DIR, filename), Buffer.from(arrayBuffer));

  return NextResponse.json({ url: `/uploads/${filename}` });
}
