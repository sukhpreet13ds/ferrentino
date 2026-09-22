import mysql from "mysql2/promise";

let pool = null;
let tableReadyPromise = null;

export function isDbConfigured() {
  return Boolean(process.env.DB_HOST && process.env.DB_USER && process.env.DB_NAME);
}

export function getPool() {
  if (!isDbConfigured()) return null;
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 5,
      connectTimeout: 8000,
      ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : undefined,
    });
  }
  return pool;
}

// Lazily creates the content table on first use, once per server instance.
export async function ensureContentTable() {
  const p = getPool();
  if (!p) return;
  if (!tableReadyPromise) {
    tableReadyPromise = p.query(`
      CREATE TABLE IF NOT EXISTS content_sections (
        section VARCHAR(100) NOT NULL PRIMARY KEY,
        data LONGTEXT NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
  }
  await tableReadyPromise;
}
