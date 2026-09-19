"use client";

import ImageField from "./ImageField";

const IMAGE_KEY_RE = /(image|img|photo|logo|avatar|thumbnail|icon|banner|background|bg|video)$/i;
const LONG_TEXT_KEY_RE = /(description|desc|content|body|text|quote|bio|message|paragraph|summary|address)$/i;
const IMAGE_VALUE_RE = /\.(jpe?g|png|webp|gif|svg|mp4)$/i;

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

function isLongTextField(key, value) {
  if (typeof value !== "string") return false;
  return LONG_TEXT_KEY_RE.test(key) || value.length > 80;
}

function emptyLike(sample) {
  if (Array.isArray(sample)) return [];
  if (sample === null) return "";
  switch (typeof sample) {
    case "string":
      return "";
    case "number":
      return 0;
    case "boolean":
      return false;
    case "object":
      return Object.fromEntries(Object.keys(sample).map((k) => [k, emptyLike(sample[k])]));
    default:
      return "";
  }
}

function ArrayField({ label, value, onChange }) {
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
    onChange([...value, emptyLike(sample)]);
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
            />
          </div>
        ))}
        {value.length === 0 && <p className="admin-empty-hint">No entries yet.</p>}
      </div>
    </div>
  );
}

export default function JsonEditor({ value, onChange, labelPrefix }) {
  if (Array.isArray(value)) {
    if (value.length > 0 && typeof value[0] !== "object") {
      return (
        <ArrayField
          label={labelPrefix || "Items"}
          value={value}
          onChange={onChange}
        />
      );
    }
    return <ArrayField label={labelPrefix || "Items"} value={value} onChange={onChange} />;
  }

  if (value !== null && typeof value === "object") {
    const entries = Object.entries(value);
    return (
      <div className="admin-object-fields">
        {entries.map(([key, val]) => {
          const label = humanizeKey(key);
          const update = (next) => onChange({ ...value, [key]: next });

          if (Array.isArray(val)) {
            return <ArrayField key={key} label={label} value={val} onChange={update} />;
          }

          if (val !== null && typeof val === "object") {
            return (
              <fieldset className="admin-field admin-field-group" key={key}>
                <legend>{label}</legend>
                <JsonEditor value={val} onChange={update} labelPrefix={label} />
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
