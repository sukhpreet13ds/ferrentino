import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getCloudinary, isCloudinaryConfigured } from "../../../../lib/cloudinary";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const ALLOWED_EXT = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg", ".mp4"];

function safeFilename(originalName, ext) {
  const base =
    path
      .basename(originalName, ext)
      .toLowerCase()
      .replace(/[^a-z0-9-]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "file";
  return `${base}-${Date.now()}${ext}`;
}

async function uploadToCloudinary(file, ext) {
  const cloudinary = getCloudinary();
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const isVideo = ext === ".mp4";

  const result = await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: process.env.CLOUDINARY_FOLDER || undefined,
        resource_type: isVideo ? "video" : "image",
      },
      (error, uploadResult) => {
        if (error) reject(error);
        else resolve(uploadResult);
      }
    );
    stream.end(buffer);
  });

  return result.secure_url;
}

async function uploadToLocalDisk(file, ext, originalName) {
  const filename = safeFilename(originalName, ext);
  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  }
  const arrayBuffer = await file.arrayBuffer();
  fs.writeFileSync(path.join(UPLOAD_DIR, filename), Buffer.from(arrayBuffer));
  return `/uploads/${filename}`;
}

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

  try {
    const url = isCloudinaryConfigured()
      ? await uploadToCloudinary(file, ext)
      : await uploadToLocalDisk(file, ext, originalName);
    return NextResponse.json({ url });
  } catch (err) {
    return NextResponse.json({ error: err.message || "Upload failed" }, { status: 500 });
  }
}
