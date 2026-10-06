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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isLoginPage = pathname === "/admin/login";

  // Auto-close sidebar on page navigation on mobile
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

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

  // Prevent background scrolling when mobile sidebar is open
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

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
      {/* Mobile Top Navigation Bar */}
      <header className="admin-mobile-header">
        <button
          type="button"
          className="admin-menu-btn"
          onClick={() => setSidebarOpen((prev) => !prev)}
          aria-label={sidebarOpen ? "Close sidebar menu" : "Open sidebar menu"}
          aria-expanded={sidebarOpen}
        >
          <span className="admin-menu-icon" aria-hidden="true">
            <span className="admin-menu-bar"></span>
            <span className="admin-menu-bar"></span>
            <span className="admin-menu-bar"></span>
          </span>
          <span className="admin-menu-text">Menu</span>
        </button>

        <Link href="/admin" className="admin-mobile-brand">
          Ferrentino <span>Admin</span>
        </Link>

        <Link href="/" target="_blank" className="admin-mobile-view-site" title="View live site">
          Site ↗
        </Link>
      </header>

      {/* Backdrop overlay for mobile drawer */}
      <div
        className={`admin-sidebar-overlay ${sidebarOpen ? "open" : ""}`}
        onClick={() => setSidebarOpen(false)}
        aria-hidden="true"
      />

      {/* Sidebar navigation drawer */}
      <aside className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="admin-sidebar-header">
          <Link href="/admin" className="admin-sidebar-brand" onClick={() => setSidebarOpen(false)}>
            Ferrentino &amp; Son
            <span>Admin</span>
          </Link>
          <button
            type="button"
            className="admin-sidebar-close"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            ✕
          </button>
        </div>

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
                    onClick={() => setSidebarOpen(false)}
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
