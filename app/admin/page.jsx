import Link from "next/link";
import { listSections } from "../../lib/data";
import { SECTION_LABELS, SECTION_GROUPS } from "../../lib/sections";

export const dynamic = "force-dynamic";

export default function AdminDashboard() {
  const sections = listSections();
  const groups = {};
  sections.forEach((id) => {
    const group = SECTION_GROUPS[id] || "Other";
    if (!groups[group]) groups[group] = [];
    groups[group].push(id);
  });

  const groupOrder = ["Global", "Pages", "Collections", "Tools", "Other"];

  return (
    <div>
      <h1>Content Manager</h1>
      <p style={{ color: "#666" }}>
        Every page, section, and image on the site is edited from here. Pick a
        section below.
      </p>

      {groupOrder
        .filter((g) => groups[g])
        .map((group) => (
          <div key={group}>
            <div className="admin-group-title">{group}</div>
            <div className="admin-section-grid">
              {groups[group].map((id) => (
                <Link key={id} href={`/admin/${id}`} className="admin-section-card">
                  <span className="admin-section-card-title">
                    {SECTION_LABELS[id] || id}
                  </span>
                  <span className="admin-section-card-id">{id}.json</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
}
