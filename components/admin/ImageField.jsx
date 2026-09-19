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
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
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

  const isVideo = /\.mp4$/i.test(value || "");

  return (
    <div className="admin-field admin-field-image">
      <label className="admin-field-label">{label}</label>
      <div className="admin-image-row">
        <div className="admin-image-preview">
          {value ? (
            isVideo ? (
              <video src={value} muted />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={value} alt={label} />
            )
          ) : (
            <span className="admin-image-placeholder">No image</span>
          )}
        </div>
        <div className="admin-image-actions">
          <input
            type="text"
            value={value || ""}
            placeholder="/images/example.jpg"
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
            accept="image/*,video/mp4"
            hidden
            onChange={handleFile}
          />
        </div>
      </div>
      {error && <p className="admin-error">{error}</p>}
    </div>
  );
}
