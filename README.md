# Ferrentino & Son — Website

A Next.js (App Router, JavaScript/JSX) site. All page content and copy is
editable live from a built-in admin panel — no redeploy needed. Saved edits
are stored in MySQL and uploaded images go to Cloudinary, so this works on
serverless hosts like Vercel (not just servers with a persistent disk).

## Getting started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` for the site and `http://localhost:3000/admin` for
the content manager.

## Admin panel

- URL: `/admin`
- Password: set via the `ADMIN_PASSWORD` env var (see `.env.local`, currently
  `ferrentino2026` for local development — change this before deploying).
- Every file in `/data/*.json` is automatically listed and editable — the admin
  form is generated from the shape of the JSON (strings, arrays, image fields,
  nested objects) by `components/admin/JsonEditor.jsx`. Adding a new
  `data/<name>.json` file automatically makes it editable at `/admin/<name>`;
  no extra code required.
- Images are uploaded through the admin UI to Cloudinary (configured via the
  `CLOUDINARY_*` env vars). Without those set, uploads fall back to local
  `/public/uploads` for offline dev. Original/default images live in
  `/public/images`.

## How content is structured

- `data/site.json` — global nav/contact/social/footer settings.
- `data/home.json`, `data/about.json`, `data/contact.json`, etc. — one JSON
  file per simple page.
- `data/services.json`, `data/projects.json`, `data/areas.json` — collections
  with a shared top-level config plus an `items` array; each item renders both
  as a card on the list page (e.g. `/services`) and as its own detail page at
  `/services/[slug]`.
- `data/estimator.json` — all pricing/catalog data for the project estimator
  calculator (the calculation logic itself lives in
  `components/estimator/EstimatorClient.jsx`).

Pages read this data server-side via `lib/data.js`'s `getContent()` and pass it
to client components for interactivity. All `(site)` routes are rendered
per-request (`export const dynamic = "force-dynamic"`) specifically so admin
edits appear immediately without a rebuild.

Each `data/<name>.json` file is the bundled **default** for that section —
it's what renders until an admin saves an edit for that section. From then
on, `getContent()` reads the MySQL row instead (falling back to the bundled
JSON automatically if the database is ever unreachable, so the site degrades
gracefully rather than breaking).

## Storage: MySQL (content) + Cloudinary (images)

Configured via env vars (see `.env.local` for local dev; the same values need
to be added to your hosting platform's environment variables, e.g. the Vercel
project's Settings → Environment Variables):

- `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD` — MySQL connection.
  `lib/db.js` creates a `content_sections` table automatically on first use
  (`section` VARCHAR primary key, `data` LONGTEXT). No manual migration step
  needed — the table seeds itself the first time each section is saved from
  `/admin`.
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`,
  `CLOUDINARY_FOLDER` — image/video uploads from the admin panel.

**Important — MySQL remote access:** the database must accept connections
from wherever the app runs. Vercel serverless functions don't have a fixed
outbound IP (unless you're on a plan with Secure Compute static IPs), so most
managed-MySQL "Remote MySQL" IP allowlists need to be set to allow any host
(`%`) — it's still password-protected. If admin saves fail with a database
connection error, check that setting on your DB host first.

## Legacy source

`/legacy-src` contains the original pre-conversion Vite + React app, kept only
as a reference for copy/design details. It is not part of the build and can be
deleted once you're confident nothing further needs to be cross-checked
against it.
