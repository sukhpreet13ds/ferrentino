"use client";

import { useRef, useState } from "react";

export default function ImageField({ label, value, onChange }) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      let res;
      if (file.size <= 8 * 1024 * 1024) {
        const formData = new FormData();
        formData.append("file", file);
        res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      } else {
        res = await fetch("/api/admin/upload", {
          method: "POST",
          headers: {
            "x-filename": encodeURIComponent(file.name),
            "content-type": file.type || "application/octet-stream",
          },
          body: file,
        });
      }

      if (!res.ok && file.size <= 8 * 1024 * 1024) {
        res = await fetch("/api/admin/upload", {
          method: "POST",
          headers: {
            "x-filename": encodeURIComponent(file.name),
            "content-type": file.type || "application/octet-stream",
          },
          body: file,
        });
      }

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      onChange(data.url);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const isVideo =
    /\.(mp4|webm|mov|m4v|ogv|avi|mkv)$/i.test(value || "") ||
    (typeof value === "string" && (value.includes("/video/upload/") || value.includes("video")));

  return (
    <div className="admin-field admin-field-image">
      <label className="admin-field-label">{label}</label>
      <div className="admin-image-row">
        <div className="admin-image-preview">
          {value ? (
            isVideo ? (
              <video src={value} muted controls />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={value} alt={label} />
            )
          ) : (
            <span className="admin-image-placeholder">No file</span>
          )}
        </div>
        <div className="admin-image-actions">
          <input
            type="text"
            value={value || ""}
            placeholder="/images/example.jpg or video URL"
            onChange={(e) => onChange(e.target.value)}
            className="admin-input"
          />
          <button
            type="button"
            className="admin-btn admin-btn-secondary"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
          >
            {uploading ? "Uploading…" : "Upload"}
          </button>
          <input
            ref={inputRef}
            type="file"
            accept="image/*,video/*,.mp4,.webm,.mov,.m4v,.ogv,.avi,.mkv"
            hidden
            onChange={handleFile}
          />
        </div>
      </div>
      {error && <p className="admin-error">{error}</p>}
    </div>
  );
}
