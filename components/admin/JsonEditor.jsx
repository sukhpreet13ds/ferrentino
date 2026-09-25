"use client";

import { useState } from "react";
import ImageField from "./ImageField";

const IMAGE_KEY_RE = /(image|img|photo|logo|avatar|thumbnail|icon|banner|background|bg|video)$/i;
const LONG_TEXT_KEY_RE = /(description|desc|content|body|text|quote|bio|message|paragraph|summary|address)$/i;
const IMAGE_VALUE_RE = /\.(jpe?g|png|webp|gif|svg|mp4)$/i;
const TITLE_KEY_RE = /(title|name|question|heading|label)$/i;

const KNOWN_SCHEMAS = {
  walkthroughSlides: {
    id: 0,
    label: "FEATURE DETAIL",
    image: "/images/ferrentino1.jpg",
    title: "Craftsmanship & Architectural Detail",
    desc: "Precision joinery and custom architectural finish work designed to endure.",
  },
  slides: {
    id: 0,
    label: "FEATURE DETAIL",
    image: "/images/ferrentino1.jpg",
    title: "Craftsmanship & Architectural Detail",
    desc: "Precision joinery and custom architectural finish work designed to endure.",
  },
  items: {
    id: 1,
    slug: "new-custom-project",
    category: "LiveWell Residential",
    year: "Completed 2025",
    title: "Custom Residence Estate",
    location: "Ocala, FL",
    description: "Generations-strength custom home build featuring high-end architectural finishings.",
    heroImage: "/images/ferrentino1.jpg",
    walkthroughSlides: [
      {
        id: 0,
        label: "EXTERIOR FACADE",
        image: "/images/ferrentino1.jpg",
        title: "Generations-Strength Timber & Masonry Detail",
        desc: "Precision joinery showcase designed for enduring structural beauty.",
      },
    ],
    specs: {
      clientScope: "Custom Residential",
      timberSource: "Central Florida Oak",
      specialtyCraft: "Custom Joinery",
      squareFootage: "3,500 sq ft",
    },
    challenge: "Creating a timeless custom build that unifies luxury finishes with structural strength.",
    solution: "We engineered custom timber and masonry detailing wrapped in energy-efficient architectural design.",
    quoteText: "The level of detail and craftsmanship exceeded all our expectations.",
    quoteAuthor: "HOMETOWN RESIDENT",
  },
};

function humanizeKey(key) {
  return key
    .replace(/[_-]+/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^./, (c) => c.toUpperCase());
}

function isImageField(key, value) {
  if (typeof value !== "string") return false;
  if (IMAGE_KEY_RE.test(key)) return true;
  if (IMAGE_VALUE_RE.test(value)) return true;
  return false;
}

// Stricter than isImageField: used to decide whether a value is safe to
// actually render as a card thumbnail. A key like "icon" matches
// IMAGE_KEY_RE but its value can be a Font Awesome class ("fa-solid
// fa-star"), not a path — only trust it if the value itself looks like a
// URL or file path.
function looksLikeImagePath(value) {
  if (typeof value !== "string" || !value) return false;
  return IMAGE_VALUE_RE.test(value) || /^(\/|https?:\/\/|data:)/.test(value);
}

function isLongTextField(key, value) {
  if (typeof value !== "string") return false;
  return LONG_TEXT_KEY_RE.test(key) || value.length > 80;
}

function findSampleForArray(root, targetKey) {
  if (!root || typeof root !== "object" || !targetKey) return null;

  if (Array.isArray(root[targetKey]) && root[targetKey].length > 0) {
    const first = root[targetKey][0];
    if (first !== null && first !== undefined) return first;
  }

  if (Array.isArray(root)) {
    for (const item of root) {
      const found = findSampleForArray(item, targetKey);
      if (found !== null && found !== undefined) return found;
    }
    return null;
  }

  for (const [k, val] of Object.entries(root)) {
    if (val && typeof val === "object") {
      const found = findSampleForArray(val, targetKey);
      if (found !== null && found !== undefined) return found;
    }
  }

  return null;
}

function emptyLike(sample, rootValue, fieldKey) {
  if (Array.isArray(sample)) return [];
  if (sample === null || sample === undefined) return "";
  switch (typeof sample) {
    case "string":
      return "";
    case "number":
      return 0;
    case "boolean":
      return false;
    case "object":
      return Object.fromEntries(
        Object.keys(sample).map((k) => [k, emptyLike(sample[k], rootValue, k)])
      );
    default:
      return "";
  }
}

// Picks a representative thumbnail/title/excerpt out of an item object so a
// collapsed card can show something meaningful without the caller having to
// declare a schema.
function pickCardFields(item) {
  let thumbnail = null;
  let title = null;
  let excerpt = null;

  for (const [key, val] of Object.entries(item)) {
    if (typeof val !== "string" || !val) continue;
    if (!thumbnail && isImageField(key, val) && looksLikeImagePath(val)) thumbnail = val;
    if (!title && TITLE_KEY_RE.test(key)) title = val;
  }
  if (!title) {
    const firstShortString = Object.values(item).find(
      (v) => typeof v === "string" && v && v.length <= 80
    );
    title = firstShortString || "Untitled entry";
  }
  for (const [key, val] of Object.entries(item)) {
    if (typeof val !== "string" || !val || val === title) continue;
    if (LONG_TEXT_KEY_RE.test(key) || val.length > 80) {
      excerpt = val;
      break;
    }
  }

  return { thumbnail, title, excerpt };
}

function CardArrayField({ label, fieldKey, value, onChange, rootValue, sample: externalSample }) {
  let sample = value.length > 0 ? value[0] : externalSample;
  if (!sample && fieldKey && rootValue) {
    sample = findSampleForArray(rootValue, fieldKey);
  }
  if (!sample && fieldKey && KNOWN_SCHEMAS[fieldKey]) {
    sample = KNOWN_SCHEMAS[fieldKey];
  }
  if (!sample) {
    sample = {};
  }

  const [expanded, setExpanded] = useState(() => new Set());

  const toggleExpanded = (idx) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  const updateItem = (idx, next) => {
    const copy = value.slice();
    copy[idx] = next;
    onChange(copy);
  };

  const removeItem = (idx) => {
    if (!window.confirm("Delete this entry? This can't be undone until you save.")) return;
    onChange(value.filter((_, i) => i !== idx));
  };

  const moveItem = (idx, dir) => {
    const target = idx + dir;
    if (target < 0 || target >= value.length) return;
    const copy = value.slice();
    [copy[idx], copy[target]] = [copy[target], copy[idx]];
    onChange(copy);
  };

  const addItem = () => {
    const newIdx = value.length;
    let newItem = emptyLike(sample, rootValue, fieldKey);
    if (fieldKey === "walkthroughSlides" || fieldKey === "slides") {
      newItem = {
        id: newIdx,
        label: (sample && sample.label) ? sample.label : "FEATURE DETAIL",
        image: (sample && sample.image) ? sample.image : "/images/ferrentino1.jpg",
        title: (sample && sample.title) ? sample.title : "Craftsmanship & Architectural Detail",
        desc: (sample && sample.desc) ? sample.desc : "Precision joinery and custom architectural finish work designed to endure.",
      };
    }
    onChange([...value, newItem]);
    setExpanded((prev) => new Set(prev).add(newIdx));
  };

  return (
    <div className="admin-field admin-collection">
      <div className="admin-collection-header">
        <label className="admin-field-label">{label}</label>
        <button type="button" className="admin-btn admin-btn-small" onClick={addItem}>
          + Add new
        </button>
      </div>

      {value.length === 0 && <p className="admin-empty-hint">Nothing here yet — add the first one.</p>}

      <div className="admin-card-grid">
        {value.map((item, idx) => {
          const isOpen = expanded.has(idx);

          const effectiveItem =
            typeof item === "object" && item !== null && sample && typeof sample === "object"
              ? { ...emptyLike(sample, rootValue, fieldKey), ...item }
              : item;

          const { thumbnail, title, excerpt } = pickCardFields(effectiveItem);

          return (
            <div className={`admin-content-card ${isOpen ? "is-editing" : ""}`} key={idx}>
              <div className="admin-content-card-thumb">
                {thumbnail ? (
                  /\.mp4$/i.test(thumbnail) ? (
                    <video src={thumbnail} muted />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={thumbnail} alt={title} />
                  )
                ) : (
                  <span className="admin-content-card-noimg">No image</span>
                )}
              </div>

              <div className="admin-content-card-body">
                <h4 className="admin-content-card-title">{title}</h4>
                {excerpt && <p className="admin-content-card-excerpt">{excerpt}</p>}
              </div>

              <div className="admin-content-card-actions">
                <button
                  type="button"
                  className="admin-btn admin-btn-small admin-btn-secondary"
                  onClick={() => moveItem(idx, -1)}
                  disabled={idx === 0}
                  title="Move up"
                >
                  ↑
                </button>
                <button
                  type="button"
                  className="admin-btn admin-btn-small admin-btn-secondary"
                  onClick={() => moveItem(idx, 1)}
                  disabled={idx === value.length - 1}
                  title="Move down"
                >
                  ↓
                </button>
                <button
                  type="button"
                  className="admin-btn admin-btn-small admin-btn-edit"
                  onClick={() => toggleExpanded(idx)}
                >
                  {isOpen ? "Close" : "Edit"}
                </button>
                <button
                  type="button"
                  className="admin-btn admin-btn-small admin-btn-danger-solid"
                  onClick={() => removeItem(idx)}
                >
                  Delete
                </button>
              </div>

              {isOpen && (
                <div className="admin-content-card-editor">
                  <JsonEditor
                    value={effectiveItem}
                    onChange={(next) => updateItem(idx, next)}
                    labelPrefix=""
                    rootValue={rootValue}
                    fieldKey={fieldKey}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SimpleArrayField({ label, fieldKey, value, onChange, rootValue }) {
  const sample = value.length > 0 ? value[0] : "";

  const updateItem = (idx, next) => {
    const copy = value.slice();
    copy[idx] = next;
    onChange(copy);
  };

  const removeItem = (idx) => {
    onChange(value.filter((_, i) => i !== idx));
  };

  const moveItem = (idx, dir) => {
    const target = idx + dir;
    if (target < 0 || target >= value.length) return;
    const copy = value.slice();
    [copy[idx], copy[target]] = [copy[target], copy[idx]];
    onChange(copy);
  };

  const addItem = () => {
    onChange([...value, emptyLike(sample, rootValue, fieldKey)]);
  };

  return (
    <div className="admin-field admin-field-array">
      <div className="admin-array-header">
        <label className="admin-field-label">{label}</label>
        <button type="button" className="admin-btn admin-btn-small" onClick={addItem}>
          + Add {value.length > 0 ? "item" : "entry"}
        </button>
      </div>
      <div className="admin-array-items">
        {value.map((item, idx) => (
          <div className="admin-array-item" key={idx}>
            <div className="admin-array-item-toolbar">
              <span className="admin-array-index">#{idx + 1}</span>
              <div className="admin-array-item-actions">
                <button type="button" onClick={() => moveItem(idx, -1)} disabled={idx === 0}>↑</button>
                <button type="button" onClick={() => moveItem(idx, 1)} disabled={idx === value.length - 1}>↓</button>
                <button type="button" className="admin-btn-danger" onClick={() => removeItem(idx)}>Remove</button>
              </div>
            </div>
            <JsonEditor
              value={item}
              onChange={(next) => updateItem(idx, next)}
              labelPrefix=""
              rootValue={rootValue}
              fieldKey={fieldKey}
            />
          </div>
        ))}
        {value.length === 0 && <p className="admin-empty-hint">No entries yet.</p>}
      </div>
    </div>
  );
}

function ArrayField({ label, fieldKey, value, onChange, rootValue }) {
  let sample = value.length > 0 ? value[0] : null;

  if (!sample && fieldKey && rootValue) {
    sample = findSampleForArray(rootValue, fieldKey);
  }
  if (!sample && fieldKey && KNOWN_SCHEMAS[fieldKey]) {
    sample = KNOWN_SCHEMAS[fieldKey];
  }

  const looksLikeObjectCollection =
    (value.length > 0 && typeof value[0] === "object" && value[0] !== null) ||
    (value.length === 0 && sample !== null && typeof sample === "object");

  if (looksLikeObjectCollection) {
    return (
      <CardArrayField
        label={label}
        fieldKey={fieldKey}
        value={value}
        onChange={onChange}
        rootValue={rootValue}
        sample={sample}
      />
    );
  }
  return (
    <SimpleArrayField
      label={label}
      fieldKey={fieldKey}
      value={value}
      onChange={onChange}
      rootValue={rootValue}
    />
  );
}

export default function JsonEditor({ value, onChange, labelPrefix, rootValue, fieldKey }) {
  const root = rootValue !== undefined ? rootValue : value;

  if (Array.isArray(value)) {
    return (
      <ArrayField
        label={labelPrefix || "Items"}
        fieldKey={fieldKey}
        value={value}
        onChange={onChange}
        rootValue={root}
      />
    );
  }

  if (value !== null && typeof value === "object") {
    const entries = Object.entries(value);
    return (
      <div className="admin-object-fields">
        {entries.map(([key, val]) => {
          const label = humanizeKey(key);
          const update = (next) => onChange({ ...value, [key]: next });

          if (Array.isArray(val)) {
            return (
              <ArrayField
                key={key}
                label={label}
                fieldKey={key}
                value={val}
                onChange={update}
                rootValue={root}
              />
            );
          }

          if (val !== null && typeof val === "object") {
            return (
              <fieldset className="admin-field admin-field-group" key={key}>
                <legend>{label}</legend>
                <JsonEditor
                  value={val}
                  onChange={update}
                  labelPrefix={label}
                  rootValue={root}
                  fieldKey={key}
                />
              </fieldset>
            );
          }

          if (isImageField(key, val)) {
            return <ImageField key={key} label={label} value={val} onChange={update} />;
          }

          if (typeof val === "boolean") {
            return (
              <div className="admin-field admin-field-checkbox" key={key}>
                <label>
                  <input
                    type="checkbox"
                    checked={val}
                    onChange={(e) => update(e.target.checked)}
                  />
                  {label}
                </label>
              </div>
            );
          }

          if (typeof val === "number") {
            return (
              <div className="admin-field" key={key}>
                <label className="admin-field-label">{label}</label>
                <input
                  type="number"
                  className="admin-input"
                  value={val}
                  onChange={(e) => update(Number(e.target.value))}
                />
              </div>
            );
          }

          if (isLongTextField(key, val)) {
            return (
              <div className="admin-field" key={key}>
                <label className="admin-field-label">{label}</label>
                <textarea
                  className="admin-input admin-textarea"
                  value={val ?? ""}
                  onChange={(e) => update(e.target.value)}
                  rows={4}
                />
              </div>
            );
          }

          return (
            <div className="admin-field" key={key}>
              <label className="admin-field-label">{label}</label>
              <input
                type="text"
                className="admin-input"
                value={val ?? ""}
                onChange={(e) => update(e.target.value)}
              />
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <input
      type="text"
      className="admin-input"
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

