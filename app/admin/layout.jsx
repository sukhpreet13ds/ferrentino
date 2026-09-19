"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import "./admin.css";

export default function AdminLayout({ children }) {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="admin-shell">
      <div className="admin-topbar">
        <Link href="/admin">Ferrentino &amp; Son — Admin</Link>
        <div className="admin-topbar-actions">
          <Link href="/" target="_blank" style={{ fontWeight: 400, opacity: 0.8 }}>
            View site ↗
          </Link>
          <button className="admin-btn admin-btn-secondary" onClick={handleLogout}>
            Log out
          </button>
        </div>
      </div>
      <main className="admin-main">{children}</main>
    </div>
  );
}
