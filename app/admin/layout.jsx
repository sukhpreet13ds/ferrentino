"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import "./admin.css";

const GROUP_ORDER = ["Global", "Pages", "Collections", "Legal", "Tools", "Other"];

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [groups, setGroups] = useState(null);

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) return;
    fetch("/api/admin/sections")
      .then((res) => (res.ok ? res.json() : { sections: [] }))
      .then((data) => {
        const grouped = {};
        (data.sections || []).forEach((s) => {
          if (!grouped[s.group]) grouped[s.group] = [];
          grouped[s.group].push(s);
        });
        setGroups(grouped);
      })
      .catch(() => setGroups({}));
  }, [isLoginPage]);

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  if (isLoginPage) {
    return <div className="admin-shell admin-shell-bare">{children}</div>;
  }

  return (
    <div className="admin-shell admin-shell-sidebar">
      <aside className="admin-sidebar">
        <Link href="/admin" className="admin-sidebar-brand">
          Ferrentino &amp; Son
          <span>Admin</span>
        </Link>

        <nav className="admin-sidebar-nav">
          {groups === null && <p className="admin-sidebar-loading">Loading…</p>}
          {groups &&
            GROUP_ORDER.filter((g) => groups[g]?.length).map((group) => (
              <div className="admin-sidebar-group" key={group}>
                <div className="admin-sidebar-group-title">{group}</div>
                {groups[group].map((s) => (
                  <Link
                    key={s.id}
                    href={`/admin/${s.id}`}
                    className={`admin-sidebar-link ${pathname === `/admin/${s.id}` ? "active" : ""}`}
                  >
                    {s.label}
                  </Link>
                ))}
              </div>
            ))}
        </nav>

        <div className="admin-sidebar-footer">
          <Link href="/" target="_blank" className="admin-sidebar-view-site">
            View site ↗
          </Link>
          <button className="admin-btn admin-btn-secondary admin-btn-block" onClick={handleLogout}>
            Log out
          </button>
        </div>
      </aside>

      <main className="admin-main">{children}</main>
    </div>
  );
}
