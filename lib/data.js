import fs from "fs";
import path from "path";
import { getPool, ensureContentTable } from "./db";

const DATA_DIR = path.join(process.cwd(), "data");

function filePathFor(section) {
  if (!/^[a-z0-9-]+$/i.test(section)) {
    throw new Error(`Invalid section name: ${section}`);
  }
  return path.join(DATA_DIR, `${section}.json`);
}

function readLocalFile(section, fallback) {
  const file = filePathFor(section);
  if (!fs.existsSync(file)) return fallback;
  try {
    return JSON.parse(fs.readFileSync(file, "utf-8"));
  } catch {
    return fallback;
  }
}

// The list of editable sections is defined by which data/*.json files ship
// with the app — this stays a plain file listing (not DB-backed) so the
// admin dashboard always knows what's editable even before anything has
// been saved to the database.
export function listSections() {
  if (!fs.existsSync(DATA_DIR)) return [];
  return fs
    .readdirSync(DATA_DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => f.replace(/\.json$/, ""))
    .sort();
}

// Reads content for a section. Admin-saved edits live in MySQL and take
// precedence; the bundled data/<section>.json file is the default/fallback
// (used until an admin saves that section for the first time, and also
// used automatically if the database is unreachable).
export async function getContent(section, fallback = {}) {
  const pool = getPool();
  if (pool) {
    try {
      await ensureContentTable();
      const [rows] = await pool.query(
        "SELECT data FROM content_sections WHERE section = ? LIMIT 1",
        [section]
      );
      if (rows.length > 0) {
        return JSON.parse(rows[0].data);
      }
    } catch (err) {
      console.error(`[data] DB read failed for "${section}", using bundled default:`, err.message);
    }
  }
  return readLocalFile(section, fallback);
}

// Saves admin edits to MySQL. Requires DB_HOST/DB_USER/DB_NAME to be set.
export async function saveContent(section, data) {
  const file = filePathFor(section);
  try {
    fs.writeFileSync(file, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error(`[data] File write failed for "${section}":`, err.message);
  }

  const pool = getPool();
  if (pool) {
    await ensureContentTable();
    const json = JSON.stringify(data);
    await pool.query(
      "INSERT INTO content_sections (section, data) VALUES (?, ?) ON DUPLICATE KEY UPDATE data = VALUES(data)",
      [section, json]
    );
  }
  return data;
}
