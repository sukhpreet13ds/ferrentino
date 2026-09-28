import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getCloudinary, isCloudinaryConfigured } from "../../../../lib/cloudinary";

export const maxDuration = 60;
export const dynamic = "force-dynamic";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const ALLOWED_EXT = [
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".gif",
  ".svg",
  ".mp4",
  ".webm",
  ".mov",
  ".m4v",
  ".ogv",
  ".avi",
  ".mkv",
  ".3gp",
  ".flv",
];

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

async function uploadBufferToCloudinary(buffer, ext, contentType) {
  const cloudinary = getCloudinary();
  const isVideo =
    [".mp4", ".webm", ".mov", ".m4v", ".ogv", ".avi", ".mkv", ".3gp", ".flv"].includes(ext) ||
    contentType.startsWith("video/");

  const result = await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: process.env.CLOUDINARY_FOLDER || undefined,
        resource_type: isVideo ? "video" : "auto",
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

async function uploadBufferToLocalDisk(buffer, ext, originalName) {
  const filename = safeFilename(originalName, ext);
  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  }
  fs.writeFileSync(path.join(UPLOAD_DIR, filename), buffer);
  return `/uploads/${filename}`;
}

export async function POST(request) {
  let fileBuffer = null;
  let originalName = "upload";
  let contentType = "";

  const contentTypeHeader = request.headers.get("content-type") || "";

  if (contentTypeHeader.includes("multipart/form-data")) {
    try {
      const formData = await request.formData();
      const file = formData?.get("file");
      if (file && typeof file !== "string") {
        originalName = file.name || "upload";
        contentType = file.type || "";
        const arrayBuffer = await file.arrayBuffer();
        fileBuffer = Buffer.from(arrayBuffer);
      }
    } catch (err) {
      console.warn("FormData parsing failed, falling back to direct payload stream:", err.message);
    }
  }

  // Fallback for large files or direct binary body streams (bypassing undici's 10MB formData limit)
  if (!fileBuffer) {
    const customFilename = request.headers.get("x-filename");
    if (customFilename) {
      originalName = decodeURIComponent(customFilename);
    }
    contentType = contentTypeHeader;
    try {
      const arrayBuffer = await request.arrayBuffer();
      if (arrayBuffer && arrayBuffer.byteLength > 0) {
        fileBuffer = Buffer.from(arrayBuffer);
      }
    } catch (err) {
      return NextResponse.json(
        { error: `Failed to read file payload: ${err.message}` },
        { status: 400 }
      );
    }
  }

  if (!fileBuffer || fileBuffer.length === 0) {
    return NextResponse.json({ error: "No file content received" }, { status: 400 });
  }

  const ext = path.extname(originalName).toLowerCase();
  if (!ALLOWED_EXT.includes(ext)) {
    return NextResponse.json(
      { error: `Unsupported file type: ${ext}` },
      { status: 400 }
    );
  }

  try {
    const url = isCloudinaryConfigured()
      ? await uploadBufferToCloudinary(fileBuffer, ext, contentType)
      : await uploadBufferToLocalDisk(fileBuffer, ext, originalName);
    return NextResponse.json({ url });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: err.message || "Upload failed" }, { status: 500 });
  }
}
