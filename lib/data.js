import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

function filePathFor(section) {
  if (!/^[a-z0-9-]+$/i.test(section)) {
    throw new Error(`Invalid section name: ${section}`);
  }
  return path.join(DATA_DIR, `${section}.json`);
}

export function listSections() {
  if (!fs.existsSync(DATA_DIR)) return [];
  return fs
    .readdirSync(DATA_DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => f.replace(/\.json$/, ""))
    .sort();
}

export function getContent(section, fallback = {}) {
  const file = filePathFor(section);
  if (!fs.existsSync(file)) return fallback;
  const raw = fs.readFileSync(file, "utf-8");
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function saveContent(section, data) {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  const file = filePathFor(section);
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n", "utf-8");
  return data;
}
