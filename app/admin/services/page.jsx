"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import JsonEditor from "../../../components/admin/JsonEditor";

// ── Testimonial panel for a single service ──────────────────────────────────
function ServiceTestimonialPanel({ service, onChange }) {
  const t = service.testimonial || { tag: "", quote: "", author: "", location: "" };

  const update = (field, val) => {
    onChange({
      ...service,
      testimonial: { ...t, [field]: val },
    });
  };

  return (
    <div className="admin-card" style={{ marginBottom: "2rem" }}>
      {/* Service header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          marginBottom: "1.5rem",
          paddingBottom: "1rem",
          borderBottom: "1px solid var(--admin-border, #333)",
        }}
      >
        {service.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={service.image}
            alt={service.title}
            style={{
              width: 56,
              height: 56,
              objectFit: "cover",
              borderRadius: 8,
              flexShrink: 0,
            }}
          />
        )}
        <div>
          <h3 style={{ margin: 0, fontSize: "1.1rem" }}>{service.title}</h3>
          <span style={{ fontSize: "0.75rem", opacity: 0.5 }}>
            /services/{service.slug}
          </span>
        </div>
      </div>

      {/* Testimonial fields */}
      <div className="admin-object-fields">
        <div className="admin-field">
          <label className="admin-field-label">Tag Label</label>
          <input
            type="text"
            className="admin-input"
            value={t.tag ?? ""}
            placeholder="e.g. FEATURED KITCHEN CLIENT"
            onChange={(e) => update("tag", e.target.value)}
          />
        </div>

        <div className="admin-field">
          <label className="admin-field-label">Quote</label>
          <textarea
            className="admin-input admin-textarea"
            rows={4}
            value={t.quote ?? ""}
            placeholder="Client testimonial quote…"
            onChange={(e) => update("quote", e.target.value)}
          />
        </div>

        <div className="admin-field">
          <label className="admin-field-label">Author Name</label>
          <input
            type="text"
            className="admin-input"
            value={t.author ?? ""}
            placeholder="e.g. John & Trisha D."
            onChange={(e) => update("author", e.target.value)}
          />
        </div>

        <div className="admin-field">
          <label className="admin-field-label">Location / Role</label>
          <input
            type="text"
            className="admin-input"
            value={t.location ?? ""}
            placeholder="e.g. Ocala Homeowners"
            onChange={(e) => update("location", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

// ── Main Services Admin Page ─────────────────────────────────────────────────
export default function AdminServicesPage() {
  const router = useRouter();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState(null);

  // Which tab is active: "general" or a service slug
  const [activeTab, setActiveTab] = useState("general");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetch("/api/admin/content/services")
      .then(async (res) => {
        const data = await res.json();
        if (!cancelled) {
          setContent(data.content);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setStatus(null);
    try {
      const res = await fetch("/api/admin/content/services", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");
      setStatus({ type: "ok", message: "Saved successfully." });
      router.refresh();
    } catch (err) {
      setStatus({ type: "err", message: err.message });
    } finally {
      setSaving(false);
    }
  };

  const updateItem = (idx, next) => {
    const items = content.items.slice();
    items[idx] = next;
    setContent({ ...content, items });
  };

  // Build a version of content without 'items' for the general settings editor
  const generalContent = content
    ? Object.fromEntries(Object.entries(content).filter(([k]) => k !== "items"))
    : null;

  const updateGeneral = (next) => {
    setContent({ ...next, items: content.items });
  };

  if (loading) return <p style={{ padding: "2rem" }}>Loading…</p>;
  if (!content) return <p style={{ padding: "2rem" }}>Services data not found.</p>;

  const items = content.items || [];

  const tabStyle = (active) => ({
    padding: "0.5rem 1.1rem",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: "0.85rem",
    background: active ? "var(--primary-color, #c9a96e)" : "transparent",
    color: active ? "#000" : "inherit",
    opacity: active ? 1 : 0.6,
    transition: "all 0.15s",
  });

  return (
    <div className="admin-main-inner">
      <Link href="/admin" className="admin-back-link">← Back to dashboard</Link>
      <h1>Services</h1>

      {/* Tab bar */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.4rem",
          marginBottom: "1.75rem",
          padding: "0.5rem",
          background: "rgba(255,255,255,0.04)",
          borderRadius: "10px",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <button
          type="button"
          style={tabStyle(activeTab === "general")}
          onClick={() => setActiveTab("general")}
        >
          General Settings
        </button>
        {items.map((svc) => (
          <button
            key={svc.slug}
            type="button"
            style={tabStyle(activeTab === svc.slug)}
            onClick={() => setActiveTab(svc.slug)}
          >
            {svc.title}
          </button>
        ))}
      </div>

      {/* General Settings tab */}
      {activeTab === "general" && (
        <div className="admin-card">
          <JsonEditor
            value={generalContent}
            onChange={updateGeneral}
            labelPrefix=""
          />
        </div>
      )}

      {/* Per-service Testimonial tabs */}
      {items.map((svc, idx) =>
        activeTab === svc.slug ? (
          <div key={svc.slug}>
            {/* ── Testimonial section ── */}
            <h2
              style={{
                marginTop: 0,
                marginBottom: "1rem",
                fontSize: "1rem",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                opacity: 0.5,
              }}
            >
              Testimonial — {svc.title}
            </h2>
            <ServiceTestimonialPanel
              service={svc}
              onChange={(next) => updateItem(idx, next)}
            />

            {/* ── Full service editor (all other fields) ── */}
            <details style={{ marginBottom: "1.5rem" }}>
              <summary
                style={{
                  cursor: "pointer",
                  padding: "0.75rem 1rem",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 8,
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                  opacity: 0.6,
                  userSelect: "none",
                }}
              >
                ▸ Edit all other fields for {svc.title}
              </summary>
              <div className="admin-card" style={{ marginTop: "0.75rem" }}>
                <JsonEditor
                  value={svc}
                  onChange={(next) => updateItem(idx, next)}
                  labelPrefix=""
                />
              </div>
            </details>
          </div>
        ) : null
      )}

      {/* Save bar */}
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
