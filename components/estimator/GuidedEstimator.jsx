"use client";

import { useState, useEffect, useRef } from "react";

const fmt = (n) => "$" + Math.round(n).toLocaleString("en-US");

/* ── SVG Icons for each broad category ── */
const ICONS = {
  remodel: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  ),
  demo: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
    </svg>
  ),
  flooring: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="4" rx="1"/>
      <rect x="2" y="10" width="20" height="4" rx="1"/>
      <rect x="2" y="17" width="20" height="4" rx="1"/>
    </svg>
  ),
  concrete: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="1"/>
      <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
      <line x1="12" y1="12" x2="12" y2="16"/>
      <line x1="10" y1="14" x2="14" y2="14"/>
    </svg>
  ),
  roofing: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12L12 3l9 9"/>
      <path d="M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9"/>
    </svg>
  ),
  painting: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 13.5V20a2 2 0 002 2h16a2 2 0 002-2v-2.5"/>
      <path d="M20 9V7a2 2 0 00-2-2H6a2 2 0 00-2 2v2"/>
      <path d="M12 2v10M8 6l4-4 4 4"/>
    </svg>
  ),
  electrical: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  plumbing: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22V12"/>
      <path d="M5 12H2a10 10 0 0020 0h-3"/>
      <path d="M8 12V7c0-1.1.9-2 2-2h4a2 2 0 012 2v5"/>
      <path d="M12 2v3"/>
    </svg>
  ),
  permits: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
      <polyline points="10 9 9 9 8 9"/>
    </svg>
  ),
  windows_doors: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="2" width="18" height="20" rx="1"/>
      <path d="M12 2v20"/>
      <path d="M3 12h18"/>
    </svg>
  ),
  framing: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="8" height="8"/>
      <rect x="14" y="2" width="8" height="8"/>
      <rect x="2" y="14" width="8" height="8"/>
      <rect x="14" y="14" width="8" height="8"/>
    </svg>
  ),
  hvac: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 2v4M16 2v4M3 10h18M5 6h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2z"/>
      <path d="M12 14a2 2 0 100-4 2 2 0 000 4z"/>
    </svg>
  ),
  pressure_wash: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8"/>
      <line x1="10" y1="12" x2="14" y2="12"/>
    </svg>
  ),
};

function findService(catalog, key) {
  for (const cat of catalog) {
    for (const s of cat.services) if (s.key === key) return { service: s, cat };
  }
  return null;
}

function lineCost(catalog, permitFormulas, key, qty) {
  const found = findService(catalog, key);
  if (!found) return null;
  const s = found.service;
  const q = parseFloat(qty) || 0;
  if (s.kind === "flat") return { low: s.low, high: s.high };
  if (s.kind === "per_sqft") return { low: s.low * q, high: s.high * q };
  if (s.kind === "per_unit") return { low: s.low * q, high: s.high * q };
  if (s.kind === "per_hour") return { low: s.low * q, high: s.high * q };
  if (s.kind === "per_linear_ft") return { low: s.low * q, high: s.high * q };
  if (s.kind === "permit_new_sfr") {
    const newSfr = permitFormulas.newSfr || {};
    const rate = (newSfr.ratesBySize || {})[s.size] || 0;
    const v = (newSfr.base || 0) + rate * q;
    return { low: v, high: v };
  }
  if (s.kind === "permit_addition") {
    const addition = permitFormulas.addition || {};
    const v = (addition.base || 0) + (addition.rate || 0) * q;
    return { low: v, high: v };
  }
  if (s.kind === "permit_reroof") {
    const reroof = permitFormulas.reroof || {};
    const v = (reroof.base || 0) + (reroof.ratePerSquare || 0) * q;
    return { low: v, high: v };
  }
  if (s.kind === "custom") return null;
  return null;
}

function serviceNeedsQty(s) {
  return ["per_sqft", "per_unit", "per_hour", "per_linear_ft", "permit_new_sfr", "permit_addition", "permit_reroof"].includes(s.kind);
}

function qtyLabelFor(s) {
  if (s.kind === "per_sqft") return "sq ft";
  if (s.kind === "per_hour") return "hours";
  if (s.kind === "per_linear_ft") return "lin ft";
  if (s.kind === "per_unit") return s.unitLabel || "units";
  if (s.kind === "permit_new_sfr" || s.kind === "permit_addition") return "sq ft";
  if (s.kind === "permit_reroof") return "squares";
  return "";
}

/* ── Guided wizard flow definition ──
   We map catalog categories to wizard "topics".
   Each topic can have sub-questions.
*/
function buildWizardSteps(catalog) {
  // Step 0: "What are you looking for?" — broad project type
  // Then one step per selected broad category
  // Final step: Review + Contact

  const broadOptions = [
    {
      key: "home_additions",
      label: "Home Additions",
      icon: ICONS.framing,
      desc: "Room additions, expansions, and structural builds",
      cats: ["remodel", "roofing", "site_prep", "excavation", "fill_material", "subgrade", "concrete_slab", "ready_mix", "reinforcement", "new_const", "trade_labor", "permits_addition"],
    },
    {
      key: "outdoor_living",
      label: "Outdoor Living",
      icon: ICONS.concrete,
      desc: "Patios, outdoor kitchens, concrete slabs",
      cats: ["concrete_saw", "concrete_break", "fireplace_footing", "subgrade", "concrete_slab", "ready_mix", "reinforcement", "site_prep", "excavation", "fill_material"],
    },
    {
      key: "home_remodel",
      label: "Home Remodel",
      icon: ICONS.remodel,
      desc: "Whole-home renovations and interior updates",
      cats: ["remodel", "demo_scope", "demo_room", "demo_element", "demo_surface", "dust_containment", "doors_windows", "trade_labor", "other"],
    },
    {
      key: "kitchen_remodel",
      label: "Kitchen Remodel",
      icon: ICONS.painting,
      desc: "Cabinetry, countertops, and full kitchen overhauls",
      cats: ["remodel", "demo_room", "demo_element", "demo_surface", "dust_containment", "trade_labor"],
    },
    {
      key: "bath_remodel",
      label: "Bath Remodel",
      icon: ICONS.plumbing,
      desc: "Cosmetic refreshes to high-end bathroom spas",
      cats: ["remodel", "demo_room", "demo_element", "demo_surface", "dust_containment", "trade_labor"],
    },
    {
      key: "design_planning",
      label: "Design & Planning",
      icon: ICONS.permits,
      desc: "Architectural plans, engineering, and permits",
      cats: ["design", "engineering", "mep", "permits_addition", "permits_trade", "permits_misc", "inspection"],
    },
  ];

  // Only include broad options that have at least one matching cat in the catalog
  const catalogKeys = catalog.map((c) => c.key);
  const filtered = broadOptions.filter((b) =>
    b.cats.some((ck) => catalogKeys.includes(ck))
  );

  // If not enough broad options exist from catalog, just include all catalog cats
  // We'll dynamically generate the service steps based on selected broad options
  return filtered;
}

/* ─────────────────────────────────────────────
   Main GuidedEstimator Component
───────────────────────────────────────────── */
export default function GuidedEstimator({ config }) {
  const catalog = config.catalog || [];
  const permitFormulas = config.permitFormulas || {};
  const contingencyConfig = config.contingency || {};
  const contingencyLowRate = contingencyConfig.lowRate ?? 0.1;
  const contingencyHighRate = contingencyConfig.highRate ?? 0.15;
  const modal = config.modal || {};
  const formspreeEndpoint = config.formspreeEndpoint || "";

  const broadOptions = buildWizardSteps(catalog);

  // wizard state
  const [step, setStep] = useState(0); // 0=broad select, 1..N = per-cat steps, final = contact
  const [selectedBroad, setSelectedBroad] = useState([]); // keys of broad options
  const [catSteps, setCatSteps] = useState([]); // ordered list of catalog cats to show
  const [currentCatIdx, setCurrentCatIdx] = useState(0);

  // selections: { serviceKey: { qty: string|null } }
  const [selections, setSelections] = useState({});
  const [qtyValues, setQtyValues] = useState({});

  // contact + submit
  const [contact, setContact] = useState({ name: "", email: "", phone: "", notes: "" });
  const [submitState, setSubmitState] = useState("idle");
  const [showSummary, setShowSummary] = useState(false);

  // progress tracking
  // Steps: 0 = broad, 1..N = per catalog-cat, N+1 = contingency/extras, N+2 = contact
  const STEP_BROAD = 0;
  const STEP_CONTACT = catSteps.length + 2;
  const STEP_EXTRAS = catSteps.length + 1;
  const STEP_REVIEW = catSteps.length + 2;

  const totalSteps = catSteps.length + 3; // broad + cats + extras + contact

  const progress = step === 0 ? 0 : Math.round((step / (totalSteps - 1)) * 100);

  const containerRef = useRef(null);

  // scroll to top of wizard on step change
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [step]);

  // ── derived totals ──
  function calcTotal() {
    let low = 0, high = 0, hasCustom = false;
    const items = [];
    for (const [key, entry] of Object.entries(selections)) {
      const found = findService(catalog, key);
      if (!found) continue;
      const s = found.service;
      if (s.kind === "custom") { hasCustom = true; items.push({ key, name: s.name, custom: true }); continue; }
      const c = lineCost(catalog, permitFormulas, key, entry.qty);
      if (!c) continue;
      items.push({ key, name: s.name, low: c.low, high: c.high, qty: entry.qty, unit: qtyLabelFor(s) });
      low += c.low; high += c.high;
    }
    return { items, low, high, hasCustom };
  }

  const total = calcTotal();
  const itemCount = Object.keys(selections).length;

  // ── navigation ──
  function handleBroadNext() {
    if (selectedBroad.length === 0) return;

    // Build cat steps from selected broad options
    const newCatSteps = [];
    for (const bKey of selectedBroad) {
      const bo = broadOptions.find((b) => b.key === bKey);
      if (!bo) continue;
      for (const catKey of bo.cats) {
        const cat = catalog.find((c) => c.key === catKey);
        if (cat && !newCatSteps.find((cs) => cs.key === catKey)) {
          newCatSteps.push(cat);
        }
      }
    }
    setCatSteps(newCatSteps);
    setCurrentCatIdx(0);
    setStep(1);
  }

  function handleCatNext() {
    if (currentCatIdx < catSteps.length - 1) {
      setCurrentCatIdx((i) => i + 1);
      setStep((s) => s + 1);
    } else {
      // move to extras
      setStep(catSteps.length + 1);
    }
  }

  function handleCatBack() {
    if (currentCatIdx > 0) {
      setCurrentCatIdx((i) => i - 1);
      setStep((s) => s - 1);
    } else {
      setStep(0);
    }
  }

  function handleExtrasNext() {
    setStep(STEP_CONTACT);
  }

  function handleExtrasBack() {
    if (catSteps.length > 0) {
      setCurrentCatIdx(catSteps.length - 1);
      setStep(catSteps.length);
    } else {
      setStep(0);
    }
  }

  // ── service toggle ──
  function toggleService(s, qty) {
    setSelections((prev) => {
      const next = { ...prev };
      if (next[s.key]) {
        delete next[s.key];
      } else {
        next[s.key] = { qty: qty || (serviceNeedsQty(s) ? "" : "1") };
      }
      return next;
    });
  }

  function updateQty(key, val) {
    setQtyValues((prev) => ({ ...prev, [key]: val }));
    setSelections((prev) => {
      if (!prev[key]) return prev;
      return { ...prev, [key]: { ...prev[key], qty: val } };
    });
  }

  // ── contingency ──
  const [useContingency, setUseContingency] = useState(contingencyConfig.default !== false);

  function getTotalWithContingency() {
    const t = calcTotal();
    if (useContingency && !t.hasCustom && t.low > 0) {
      return {
        ...t,
        low: t.low * (1 + contingencyLowRate),
        high: t.high * (1 + contingencyHighRate),
        withContingency: true,
      };
    }
    return t;
  }

  const displayTotal = getTotalWithContingency();

  // ── submit ──
  async function handleSubmit(e) {
    e?.preventDefault();
    if (!contact.name.trim()) { alert("Please enter your name."); return; }
    if (!contact.email.trim()) { alert("Please enter your email."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) { alert("Please enter a valid email."); return; }

    setSubmitState("sending");

    const lineSummary = displayTotal.items
      .map((i) => `${i.name}${i.qty ? ` (${i.qty} ${i.unit || ""})` : ""}: ${i.custom ? "custom" : `${fmt(i.low)}–${fmt(i.high)}`}`)
      .join("\n");

    const payload = {
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      notes: contact.notes,
      estimateLow: displayTotal.hasCustom && displayTotal.low === 0 ? "Custom" : fmt(displayTotal.low),
      estimateHigh: displayTotal.hasCustom && displayTotal.low === 0 ? "Custom" : fmt(displayTotal.high),
      lineItems: lineSummary,
      contingency: useContingency ? "included" : "not included",
      submittedAt: new Date().toISOString(),
    };

    if (!formspreeEndpoint || formspreeEndpoint.includes("YOUR_FORM_ID")) {
      console.log("Guided estimator submission:", payload);
      setTimeout(() => setSubmitState("success"), 600);
      return;
    }

    try {
      const res = await fetch(formspreeEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) setSubmitState("success");
      else throw new Error("bad");
    } catch {
      setSubmitState("error");
    }
  }

  const successMessage = (modal.successMessage || "Check your inbox, {firstName}. We'll follow up within 1 business day.")
    .replace("{firstName}", contact.name.split(" ")[0] || "friend");

  /* ─── RENDER ─── */
  return (
    <div className="ge-root" ref={containerRef}>
      {/* Progress bar */}
      {step > 0 && (
        <div className="ge-progress-wrap">
          <div className="ge-progress-bar" style={{ width: `${progress}%` }} />
        </div>
      )}

      {/* ── STEP 0: Broad selection ── */}
      {step === STEP_BROAD && (
        <div className="ge-step ge-step-broad">
          <div className="ge-step-header">
            <div className="ge-step-eyebrow">Step 1 of {totalSteps > 3 ? totalSteps - 2 : "?"}</div>
            <h2 className="ge-step-title">What can we help you with?</h2>
            <p className="ge-step-subtitle">Select all that apply — we'll walk you through each one.</p>
          </div>

          <div className="ge-broad-grid">
            {broadOptions.map((b) => {
              const isSelected = selectedBroad.includes(b.key);
              return (
                <button
                  key={b.key}
                  type="button"
                  className={`ge-broad-card ${isSelected ? "selected" : ""}`}
                  onClick={() => {
                    setSelectedBroad((prev) =>
                      prev.includes(b.key) ? prev.filter((k) => k !== b.key) : [...prev, b.key]
                    );
                  }}
                >
                  <span className="ge-broad-icon">{b.icon}</span>
                  <span className="ge-broad-label">{b.label}</span>
                  <span className="ge-broad-desc">{b.desc}</span>
                  {isSelected && <span className="ge-broad-check">✓</span>}
                </button>
              );
            })}
          </div>

          <div className="ge-step-actions">
            <button
              type="button"
              className="ge-btn-next"
              disabled={selectedBroad.length === 0}
              onClick={handleBroadNext}
            >
              Continue →
            </button>
          </div>
        </div>
      )}

      {/* ── CATALOG CATEGORY STEPS ── */}
      {step >= 1 && step <= catSteps.length && (() => {
        const cat = catSteps[currentCatIdx];
        if (!cat) return null;
        const stepLabel = `Step ${step + 1} of ${totalSteps - 2}`;

        return (
          <div className="ge-step ge-step-cat">
            <div className="ge-step-header">
              <div className="ge-step-eyebrow">{stepLabel}</div>
              <h2 className="ge-step-title">{cat.name}</h2>
              <p className="ge-step-subtitle">Select any services you need. You can skip this section if it doesn't apply.</p>
            </div>

            <div className="ge-services-list">
              {cat.services.map((s) => {
                const isSelected = !!selections[s.key];
                const needsQty = serviceNeedsQty(s);
                const currentQty = qtyValues[s.key] !== undefined ? qtyValues[s.key] : (selections[s.key]?.qty || "");

                return (
                  <div key={s.key} className={`ge-svc-card ${isSelected ? "selected" : ""}`}>
                    <div className="ge-svc-card-main">
                      <div className="ge-svc-card-info">
                        <div className="ge-svc-name">{s.name}</div>
                        <div className="ge-svc-range">
                          {s.kind === "flat" ? `${fmt(s.low)} – ${fmt(s.high)}` :
                            s.kind === "custom" ? "Custom quote" :
                              `$${s.low}–$${s.high} / ${qtyLabelFor(s)}`}
                        </div>
                      </div>
                      <button
                        type="button"
                        className={`ge-svc-toggle ${isSelected ? "active" : ""}`}
                        onClick={() => toggleService(s, currentQty)}
                      >
                        {isSelected ? (
                          <><span className="ge-toggle-check">✓</span> Added</>
                        ) : (
                          <>+ Add</>
                        )}
                      </button>
                    </div>

                    {needsQty && isSelected && (
                      <div className="ge-qty-row">
                        <label className="ge-qty-label">
                          How many {qtyLabelFor(s)}?
                        </label>
                        <div className="ge-qty-stepper">
                          <button
                            type="button"
                            className="ge-qty-btn"
                            onClick={() => {
                              const cur = parseFloat(currentQty) || 0;
                              const step = s.kind === "per_sqft" ? 50 : 1;
                              const next = Math.max(0, cur - step);
                              updateQty(s.key, next > 0 ? next.toString() : "");
                            }}
                          >–</button>
                          <input
                            type="number"
                            className="ge-qty-input"
                            min="1"
                            step={s.kind === "per_sqft" ? "50" : "1"}
                            placeholder="0"
                            value={currentQty}
                            onChange={(e) => updateQty(s.key, e.target.value)}
                          />
                          <button
                            type="button"
                            className="ge-qty-btn"
                            onClick={() => {
                              const cur = parseFloat(currentQty) || 0;
                              const step = s.kind === "per_sqft" ? 50 : 1;
                              updateQty(s.key, (cur + step).toString());
                            }}
                          >+</button>
                          <span className="ge-qty-unit">{qtyLabelFor(s)}</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Running total chip */}
            {itemCount > 0 && (
              <div className="ge-running-total">
                <span className="ge-rt-label">Running estimate</span>
                <span className="ge-rt-value">
                  {displayTotal.hasCustom && displayTotal.low === 0
                    ? "Custom"
                    : `${fmt(displayTotal.low)} – ${fmt(displayTotal.high)}`}
                </span>
              </div>
            )}

            <div className="ge-step-actions">
              <button type="button" className="ge-btn-back" onClick={handleCatBack}>
                ← Back
              </button>
              <button type="button" className="ge-btn-next" onClick={handleCatNext}>
                {currentCatIdx < catSteps.length - 1 ? "Next →" : "Continue →"}
              </button>
            </div>
          </div>
        );
      })()}

      {/* ── EXTRAS / CONTINGENCY STEP ── */}
      {step === STEP_EXTRAS && (
        <div className="ge-step ge-step-extras">
          <div className="ge-step-header">
            <div className="ge-step-eyebrow">Almost there</div>
            <h2 className="ge-step-title">Any extras to add?</h2>
            <p className="ge-step-subtitle">These optional add-ons help give you a more complete picture.</p>
          </div>

          <div className="ge-extras-box">
            <label className="ge-extra-toggle">
              <input
                type="checkbox"
                checked={useContingency}
                onChange={(e) => setUseContingency(e.target.checked)}
              />
              <div className="ge-extra-content">
                <div className="ge-extra-name">{contingencyConfig.label || "Add 10–15% contingency buffer"}</div>
                <div className="ge-extra-desc">{contingencyConfig.desc || "Recommended buffer for hidden issues"}</div>
              </div>
            </label>
          </div>

          {/* Summary preview */}
          {itemCount > 0 && (
            <div className="ge-summary-preview">
              <div className="ge-summary-head">
                <span>Your selections ({itemCount})</span>
                <button type="button" className="ge-summary-toggle" onClick={() => setShowSummary((s) => !s)}>
                  {showSummary ? "Hide" : "Show"} details
                </button>
              </div>
              {showSummary && (
                <div className="ge-summary-items">
                  {displayTotal.items.map((item) => (
                    <div key={item.key} className="ge-summary-line">
                      <span className="ge-sl-name">{item.name}</span>
                      <span className="ge-sl-cost">
                        {item.custom ? "Custom" : item.low === item.high ? fmt(item.low) : `${fmt(item.low)}–${fmt(item.high)}`}
                      </span>
                    </div>
                  ))}
                </div>
              )}
              <div className="ge-summary-total">
                <span>Estimated range</span>
                <span className="ge-st-value">
                  {displayTotal.hasCustom && displayTotal.low === 0
                    ? "Custom Quote"
                    : `${fmt(displayTotal.low)} – ${fmt(displayTotal.high)}`}
                </span>
              </div>
            </div>
          )}

          {itemCount === 0 && (
            <div className="ge-empty-note">
              No services selected yet — that's okay! You can still submit to get a custom quote.
            </div>
          )}

          <div className="ge-step-actions">
            <button type="button" className="ge-btn-back" onClick={handleExtrasBack}>
              ← Back
            </button>
            <button type="button" className="ge-btn-next" onClick={handleExtrasNext}>
              Get my estimate →
            </button>
          </div>
        </div>
      )}

      {/* ── CONTACT / FINAL STEP ── */}
      {step === STEP_CONTACT && (
        <div className="ge-step ge-step-contact">
          {submitState === "success" ? (
            <div className="ge-success">
              <div className="ge-success-icon">✓</div>
              <h2 className="ge-success-title">{modal.successTitle || "Estimate sent!"}</h2>
              <p className="ge-success-msg">{successMessage}</p>
              <button
                type="button"
                className="ge-btn-next"
                onClick={() => {
                  setStep(0);
                  setSelectedBroad([]);
                  setCatSteps([]);
                  setCurrentCatIdx(0);
                  setSelections({});
                  setQtyValues({});
                  setContact({ name: "", email: "", phone: "", notes: "" });
                  setSubmitState("idle");
                }}
              >
                Start over
              </button>
            </div>
          ) : (
            <>
              <div className="ge-step-header">
                <div className="ge-step-eyebrow">Last step</div>
                <h2 className="ge-step-title">Where should we send it?</h2>
                <p className="ge-step-subtitle">We'll email you a detailed estimate within 1 business day.</p>
              </div>

              {/* Estimate chip */}
              {itemCount > 0 && (
                <div className="ge-contact-summary">
                  <div className="ge-cs-label">Your estimated range</div>
                  <div className="ge-cs-value">
                    {displayTotal.hasCustom && displayTotal.low === 0
                      ? "Custom Quote"
                      : `${fmt(displayTotal.low)} – ${fmt(displayTotal.high)}`}
                  </div>
                  <div className="ge-cs-note">{config.cartTotalNote}</div>
                </div>
              )}

              <form className="ge-contact-form" onSubmit={handleSubmit}>
                <div className="ge-field">
                  <label className="ge-label" htmlFor="ge-name">Full name</label>
                  <input
                    type="text"
                    id="ge-name"
                    className="ge-input"
                    placeholder="John Doe"
                    required
                    value={contact.name}
                    onChange={(e) => setContact((p) => ({ ...p, name: e.target.value }))}
                  />
                </div>
                <div className="ge-field">
                  <label className="ge-label" htmlFor="ge-email">Email</label>
                  <input
                    type="email"
                    id="ge-email"
                    className="ge-input"
                    placeholder="john@example.com"
                    required
                    value={contact.email}
                    onChange={(e) => setContact((p) => ({ ...p, email: e.target.value }))}
                  />
                </div>
                <div className="ge-field">
                  <label className="ge-label" htmlFor="ge-phone">
                    Phone <span className="ge-label-hint">optional</span>
                  </label>
                  <input
                    type="tel"
                    id="ge-phone"
                    className="ge-input"
                    placeholder="(352) 000-0000"
                    value={contact.phone}
                    onChange={(e) => setContact((p) => ({ ...p, phone: e.target.value }))}
                  />
                </div>
                <div className="ge-field">
                  <label className="ge-label" htmlFor="ge-notes">
                    Notes <span className="ge-label-hint">optional</span>
                  </label>
                  <textarea
                    id="ge-notes"
                    className="ge-input"
                    rows="3"
                    placeholder="Timeline, materials, questions…"
                    value={contact.notes}
                    onChange={(e) => setContact((p) => ({ ...p, notes: e.target.value }))}
                  />
                </div>

                {submitState === "error" && (
                  <div className="ge-error">{modal.errorMessage || "Something went wrong. Please try again."}</div>
                )}

                <div className="ge-step-actions">
                  <button
                    type="button"
                    className="ge-btn-back"
                    onClick={() => setStep(STEP_EXTRAS)}
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    className="ge-btn-next"
                    disabled={submitState === "sending"}
                  >
                    {submitState === "sending" ? "Sending…" : "Send estimate →"}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      )}
    </div>
  );
}
