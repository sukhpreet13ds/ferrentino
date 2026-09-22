"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import JsonEditor from "../../../components/admin/JsonEditor";

export default function AdminSectionPage() {
  const { section } = useParams();
  const router = useRouter();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetch(`/api/admin/content/${section}`)
      .then(async (res) => {
        if (res.status === 404) {
          if (!cancelled) {
            setContent(null);
            setLoading(false);
          }
          return;
        }
        const data = await res.json();
        if (!cancelled) {
          setContent(data.content);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [section]);

  const handleSave = async () => {
    setSaving(true);
    setStatus(null);
    try {
      const res = await fetch(`/api/admin/content/${section}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");
      setStatus({ type: "ok", message: "Saved." });
      router.refresh();
    } catch (err) {
      setStatus({ type: "err", message: err.message });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading…</p>;

  if (content === null) {
    return (
      <div className="admin-main-inner">
        <Link href="/admin">← Back to dashboard</Link>
        <p>Section "{section}" not found.</p>
      </div>
    );
  }

  return (
    <div className="admin-main-inner">
      <Link href="/admin">← Back to dashboard</Link>
      <h1 style={{ textTransform: "capitalize" }}>{section.replace(/-/g, " ")}</h1>
      <div className="admin-card">
        <JsonEditor value={content} onChange={setContent} labelPrefix="" />
      </div>
      <div className="admin-save-bar">
        <button className="admin-btn" onClick={handleSave} disabled={saving}>
          {saving ? "Saving…" : "Save changes"}
        </button>
        {status && (
          <span className={`admin-status ${status.type}`}>{status.message}</span>
        )}
      </div>
    </div>
  );
}
