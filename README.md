# Ferrentino & Son — Website

A Next.js (App Router, JavaScript/JSX) site. All page content, copy, and images are
stored as JSON under `/data` and editable live from a built-in admin panel — no
redeploy needed to change text or swap an image.

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
- Images are uploaded through the admin UI and saved to `/public/uploads`;
  existing default images live in `/public/images`.

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

## Deployment note

Admin edits and uploaded images are written to the local filesystem
(`/data/*.json`, `/public/uploads`). This works on any host with a persistent
filesystem (a VPS, Docker container, etc. running `npm run build && npm run
start`). It will **not** persist on serverless platforms with ephemeral/
read-only filesystems (e.g. Vercel's default deployment) — writes would be
lost between requests/deploys there. If deploying to Vercel, swap the storage
layer in `lib/data.js` (content) and `app/api/admin/upload/route.js` (images)
for a database + blob storage service first.

## Legacy source

`/legacy-src` contains the original pre-conversion Vite + React app, kept only
as a reference for copy/design details. It is not part of the build and can be
deleted once you're confident nothing further needs to be cross-checked
against it.
