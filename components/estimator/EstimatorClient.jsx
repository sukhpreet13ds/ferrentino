"use client";

import { useState, useEffect, useRef } from "react";

const fmt = (n) => "$" + Math.round(n).toLocaleString("en-US");

function findService(catalog, key) {
  for (const cat of catalog) {
    for (const s of cat.services) if (s.key === key) return { service: s, cat };
  }
  return null;
}

function serviceRateLabel(s, permitFormulas) {
  if (s.kind === "flat") return s.low === s.high ? fmt(s.low) : `${fmt(s.low)} – ${fmt(s.high)}`;
  if (s.kind === "per_sqft") return `$${s.low} – $${s.high} / sq ft`;
  if (s.kind === "per_unit") return `${fmt(s.low)} – ${fmt(s.high)} / ${s.unitLabel}`;
  if (s.kind === "per_hour") return s.low === s.high ? `${fmt(s.low)} / hr` : `${fmt(s.low)} – ${fmt(s.high)} / hr`;
  if (s.kind === "per_linear_ft") return `$${s.low} – $${s.high} / linear ft`;
  if (s.kind === "permit_new_sfr") {
    const newSfr = permitFormulas.newSfr || {};
    const base = newSfr.base;
    const rate = (newSfr.ratesBySize || {})[s.size];
    return `$${base} base + $${rate}/sq ft`;
  }
  if (s.kind === "permit_addition") {
    const addition = permitFormulas.addition || {};
    return `$${addition.base} base + $${addition.rate}/sq ft`;
  }
  if (s.kind === "permit_reroof") {
    const reroof = permitFormulas.reroof || {};
    return `$${reroof.base} base + $${reroof.ratePerSquare}/squares`;
  }
  if (s.kind === "custom") return "Custom quote";
  return "";
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

function lineCost(catalog, permitFormulas, key, entry) {
  const found = findService(catalog, key);
  if (!found) return null;
  const s = found.service;
  const q = parseFloat(entry.qty) || 0;
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

const EstimatorClient = ({ config }) => {
  const catalog = config.catalog || [];
  const globalAddons = config.globalAddons || [];
  const permitFormulas = config.permitFormulas || {};
  const contingencyConfig = config.contingency || {};
  const contingencyLowRate = contingencyConfig.lowRate ?? 0.1;
  const contingencyHighRate = contingencyConfig.highRate ?? 0.15;
  const modal = config.modal || {};
  const hero = config.hero || {};
  const formspreeEndpoint = config.formspreeEndpoint || "";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [openCategories, setOpenCategories] = useState(() =>
    catalog.length > 0 ? { [catalog[0].key]: true } : {}
  );
  const [cart, setCart] = useState({});
  const [qtyInputs, setQtyInputs] = useState({});
  const [invalidInputKeys, setInvalidInputKeys] = useState({});
  const [addons, setAddons] = useState({});
  const [contingency, setContingency] = useState(contingencyConfig.default !== false);
  const [contact, setContact] = useState({ name: "", email: "", phone: "", notes: "" });
  const [modalOpen, setModalOpen] = useState(false);
  const [submitState, setSubmitState] = useState("idle");

  const cartRef = useRef(null);
  const pillsRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [hasDragged, setHasDragged] = useState(false);

  const scrollPills = (offset) => {
    if (pillsRef.current) {
      pillsRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  const handlePillsMouseDown = (e) => {
    if (!pillsRef.current) return;
    setIsDragging(true);
    setHasDragged(false);
    setStartX(e.pageX - pillsRef.current.offsetLeft);
    setScrollLeft(pillsRef.current.scrollLeft);
  };

  const handlePillsMouseLeave = () => {
    setIsDragging(false);
  };

  const handlePillsMouseUp = () => {
    setIsDragging(false);
  };

  const handlePillsMouseMove = (e) => {
    if (!isDragging || !pillsRef.current) return;
    e.preventDefault();
    const x = e.pageX - pillsRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    if (Math.abs(walk) > 4) {
      setHasDragged(true);
    }
    pillsRef.current.scrollLeft = scrollLeft - walk;
  };

  const toggleCategory = (catKey) => {
    setOpenCategories((prev) => ({ ...prev, [catKey]: !prev[catKey] }));
  };

  const expandAll = () => {
    const all = {};
    catalog.forEach((c) => { all[c.key] = true; });
    setOpenCategories(all);
  };

  const collapseAll = () => {
    setOpenCategories({});
  };

  const areAllOpen = catalog.every((c) => !!openCategories[c.key]);

  const scrollToCart = () => {
    if (cartRef.current) {
      cartRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleQtyChange = (key, val) => {
    setQtyInputs((prev) => ({ ...prev, [key]: val }));
    if (cart[key]) {
      setCart((prev) => ({
        ...prev,
        [key]: { ...prev[key], qty: val }
      }));
    }
  };

  const toggleService = (s) => {
    if (cart[s.key]) {
      setCart((prev) => {
        const next = { ...prev };
        delete next[s.key];
        return next;
      });
    } else {
      const needsQty = serviceNeedsQty(s);
      if (needsQty) {
        const val = qtyInputs[s.key];
        if (!val || parseFloat(val) <= 0) {
          setInvalidInputKeys((prev) => ({ ...prev, [s.key]: true }));
          setTimeout(() => {
            setInvalidInputKeys((prev) => ({ ...prev, [s.key]: false }));
          }, 1200);
          return;
        }
        setCart((prev) => ({
          ...prev,
          [s.key]: { qty: val }
        }));
      } else {
        setCart((prev) => ({
          ...prev,
          [s.key]: { qty: 1 }
        }));
      }
    }
  };

  const removeFromCart = (key) => {
    setCart((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const totalEstimate = () => {
    const items = [];
    let low = 0, high = 0, hasCustom = false, demoSqft = 0;

    for (const [key, entry] of Object.entries(cart)) {
      const found = findService(catalog, key);
      if (!found) continue;
      const s = found.service;
      if (s.kind === "custom") {
        hasCustom = true;
        items.push({ key, name: s.name, custom: true });
        continue;
      }
      const c = lineCost(catalog, permitFormulas, key, entry);
      if (!c) continue;
      if (found.cat.key.startsWith("demo_") && s.kind === "per_sqft") {
        demoSqft += (parseFloat(entry.qty) || 0);
      }
      items.push({ key, name: s.name, low: c.low, high: c.high, qty: entry.qty, unit: qtyLabelFor(s) });
      low += c.low;
      high += c.high;
    }

    for (const a of globalAddons) {
      if (!addons[a.key]) continue;
      if (a.perSqftOfDemo) {
        if (demoSqft > 0) {
          const l = a.low * demoSqft, h = a.high * demoSqft;
          items.push({ key: a.key, name: `${a.name.split(" (")[0]} — ${demoSqft} sq ft`, low: l, high: h, addon: true });
          low += l;
          high += h;
        }
      } else {
        items.push({ key: a.key, name: a.name, low: a.low, high: a.high, addon: true });
        low += a.low;
        high += a.high;
      }
    }

    if (contingency && !hasCustom && low > 0) {
      const cl = low * contingencyLowRate, ch = high * contingencyHighRate;
      const lowPct = Math.round(contingencyLowRate * 100);
      const highPct = Math.round(contingencyHighRate * 100);
      items.push({ key: "contingency", name: `Contingency (${lowPct}–${highPct}% buffer)`, low: cl, high: ch, addon: true });
      low += cl;
      high += ch;
    }

    return { items, low, high, hasCustom, demoSqft };
  };

  const total = totalEstimate();
  const itemCount = Object.keys(cart).length;

  const openModal = () => {
    setModalOpen(true);
    setSubmitState("idle");
  };

  const closeModal = () => {
    setModalOpen(false);
    setSubmitState("idle");
  };

  const submitForm = async (e) => {
    e?.preventDefault();
    if (!contact.name.trim()) {
      alert("Please enter your name.");
      return;
    }
    if (!contact.email.trim()) {
      alert("Please enter your email.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) {
      alert("Please enter a valid email.");
      return;
    }

    setSubmitState("sending");

    const lineSummary = total.items.filter((i) => !i.addon)
      .map((i) => `${i.name}${i.qty ? ` (${i.qty} ${i.unit || ""})` : ""}: ${i.custom ? "custom" : `${fmt(i.low)}–${fmt(i.high)}`}`)
      .join("\n");
    const addonSummary = total.items.filter((i) => i.addon)
      .map((i) => `${i.name}: ${fmt(i.low)}–${fmt(i.high)}`).join("\n");

    const lowPct = Math.round(contingencyLowRate * 100);
    const highPct = Math.round(contingencyHighRate * 100);

    const payload = {
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      notes: contact.notes,
      estimateLow: total.hasCustom && total.low === 0 ? "Custom" : fmt(total.low),
      estimateHigh: total.hasCustom && total.low === 0 ? "Custom" : fmt(total.high),
      lineItems: lineSummary,
      extras: addonSummary || "none",
      contingency: contingency ? `included (${lowPct}–${highPct}%)` : "not included",
      submittedAt: new Date().toISOString()
    };

    if (!formspreeEndpoint || formspreeEndpoint.includes("YOUR_FORM_ID")) {
      console.log("Estimator submission (endpoint not configured):", payload);
      setTimeout(() => {
        setSubmitState("success");
      }, 600);
      return;
    }

    try {
      const res = await fetch(formspreeEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setSubmitState("success");
      } else {
        throw new Error("bad response");
      }
    } catch (err) {
      setSubmitState("error");
    }
  };

  const successMessage = (modal.successMessage || "Check your inbox, {firstName}. We'll follow up within 1 business day.")
    .replace("{firstName}", contact.name.split(" ")[0] || "friend");

  return (
    <div className="estimator-page">
      <div id="est-root">
        {/* Header Section */}
        <div className="est-header">
          <div className="est-eyebrow">
            <span className="est-dot"></span>{hero.eyebrow}
          </div>
          <h1 className="est-title">{hero.title}</h1>
          <p className="est-subtitle">{hero.subtitle}</p>
        </div>

        {/* Layout */}
        <div className="est-layout">
          {/* Services Catalog */}
          <div className="est-panel reveal-zoom">
            <div className="est-panel-head">
              <div>
                <h2>Services catalog</h2>
                <span className="est-hint">{config.catalogHint}</span>
              </div>
              <button
                type="button"
                className="est-head-action-btn"
                onClick={areAllOpen ? collapseAll : expandAll}
              >
                {areAllOpen ? "Collapse All" : "Expand All"}
              </button>
            </div>

            {/* Quick Horizontal Jump Pills for Categories with Arrows & Drag-to-Scroll */}
            <div className="est-pills-nav-wrapper">
              <button
                type="button"
                className="est-pills-arrow-btn left"
                onClick={() => scrollPills(-220)}
                aria-label="Scroll categories left"
                title="Scroll left"
              >
                ‹
              </button>

              <div
                className={`est-category-pills-bar ${isDragging ? "is-dragging" : ""}`}
                ref={pillsRef}
                onMouseDown={handlePillsMouseDown}
                onMouseLeave={handlePillsMouseLeave}
                onMouseUp={handlePillsMouseUp}
                onMouseMove={handlePillsMouseMove}
              >
                {catalog.map((cat) => {
                  const inCartCount = cat.services.filter((s) => cart[s.key]).length;
                  const isOpen = !!openCategories[cat.key];

                  return (
                    <button
                      key={cat.key}
                      type="button"
                      className={`est-pill-btn ${isOpen ? "active" : ""} ${inCartCount > 0 ? "has-items" : ""}`}
                      onClick={(e) => {
                        if (hasDragged) {
                          e.preventDefault();
                          return;
                        }
                        setOpenCategories((prev) => ({ ...prev, [cat.key]: true }));
                        const el = document.getElementById(`cat-${cat.key}`);
                        if (el) {
                          el.scrollIntoView({ behavior: "smooth", block: "nearest" });
                        }
                      }}
                    >
                      <span>{cat.name.split(" (")[0]}</span>
                      {inCartCount > 0 && <span className="est-pill-badge">{inCartCount}</span>}
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                className="est-pills-arrow-btn right"
                onClick={() => scrollPills(220)}
                aria-label="Scroll categories right"
                title="Scroll right"
              >
                ›
              </button>
            </div>

            <div id="est-catalog">
              {catalog.map((cat) => {
                const inCartCount = cat.services.filter((s) => cart[s.key]).length;
                const isOpen = !!openCategories[cat.key];

                return (
                  <div key={cat.key} id={`cat-${cat.key}`} className={`est-cat${isOpen ? " est-open" : ""}`}>
                    <button
                      type="button"
                      className="est-cat-head"
                      onClick={() => toggleCategory(cat.key)}
                      aria-expanded={isOpen}
                    >
                      <span className="est-cat-name-wrap">
                        <span className="est-cat-title-text">{cat.name}</span>
                        {inCartCount > 0 && (
                          <span className="est-cat-count est-has">{inCartCount} added</span>
                        )}
                      </span>
                      <span className="est-caret">›</span>
                    </button>

                    <div className="est-cat-body">
                      {cat.services.map((s) => {
                        const inCart = !!cart[s.key];
                        const needsQty = serviceNeedsQty(s);
                        const currentQty = qtyInputs[s.key] !== undefined ? qtyInputs[s.key] : (cart[s.key]?.qty ?? "");
                        const isInvalid = !!invalidInputKeys[s.key];

                        return (
                          <div key={s.key} className={`est-svc ${inCart ? "est-svc-selected" : ""}`}>
                            <div className="est-svc-info">
                              <div className="est-svc-name">{s.name}</div>
                              <div className="est-svc-rate">{serviceRateLabel(s, permitFormulas)}</div>
                            </div>

                            <div className="est-svc-controls">
                              {needsQty && (
                                <div className="est-qty-group">
                                  <div className="est-qty-stepper">
                                    <button
                                      type="button"
                                      className="est-qty-step-btn"
                                      aria-label="Decrease quantity"
                                      onClick={() => {
                                        const cur = parseFloat(currentQty) || 0;
                                        const step = s.kind === "per_sqft" ? 50 : 1;
                                        const next = Math.max(0, cur - step);
                                        handleQtyChange(s.key, next > 0 ? next.toString() : "");
                                      }}
                                    >
                                      –
                                    </button>
                                    <input
                                      type="number"
                                      min="1"
                                      step="any"
                                      className="est-qty-input"
                                      style={{ borderColor: isInvalid ? "var(--est-danger)" : undefined }}
                                      placeholder="0"
                                      value={currentQty}
                                      onChange={(e) => handleQtyChange(s.key, e.target.value)}
                                    />
                                    <button
                                      type="button"
                                      className="est-qty-step-btn"
                                      aria-label="Increase quantity"
                                      onClick={() => {
                                        const cur = parseFloat(currentQty) || 0;
                                        const step = s.kind === "per_sqft" ? 50 : 1;
                                        const next = cur + step;
                                        handleQtyChange(s.key, next.toString());
                                      }}
                                    >
                                      +
                                    </button>
                                  </div>
                                  <span className="est-qty-unit">{qtyLabelFor(s)}</span>
                                </div>
                              )}
                              <button
                                type="button"
                                className={`est-add-btn${inCart ? " est-in-cart" : ""}`}
                                onClick={() => toggleService(s)}
                              >
                                {inCart ? "✓ Added" : "+ Add"}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Your Estimate Cart Panel */}
          <div className="est-cart-panel reveal-zoom" data-delay="150" ref={cartRef}>
            <div className="est-panel">
              <div className="est-panel-head">
                <h2>Your estimate</h2>
                <span className="est-hint" id="est-cart-count">
                  {itemCount === 1 ? "1 item" : `${itemCount} items`}
                </span>
              </div>

              <div id="est-cart-body">
                {itemCount === 0 ? (
                  <div className="est-cart-empty">
                    <p>{config.cartEmptyMessage}</p>
                  </div>
                ) : (
                  <>
                    <div className="est-line-items">
                      {total.items
                        .filter((i) => !i.addon)
                        .map((item) => {
                          const meta = item.qty && item.unit ? `${item.qty} ${item.unit}` : "";
                          return (
                            <div key={item.key} className="est-line">
                              <div>
                                <div className="est-line-name">{item.name}</div>
                                {meta && <div className="est-line-meta">{meta}</div>}
                              </div>
                              <div className="est-line-cost">
                                {item.custom ? (
                                  <span>Custom</span>
                                ) : item.low === item.high ? (
                                  <span>{fmt(item.low)}</span>
                                ) : (
                                  <span>{`${fmt(item.low)}–${fmt(item.high)}`}</span>
                                )}
                              </div>
                              <button
                                type="button"
                                className="est-line-remove"
                                title="Remove"
                                onClick={() => removeFromCart(item.key)}
                              >
                                ✕
                              </button>
                            </div>
                          );
                        })}
                    </div>

                    <div className="est-cart-addons">
                      <div
                        style={{
                          fontSize: "12px",
                          fontFamily: "ui-monospace,SFMono-Regular,Menlo,Consolas,monospace",
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          color: "var(--est-ink-soft)",
                          marginBottom: "6px",
                          fontWeight: "700"
                        }}
                      >
                        {config.extrasHeading}
                      </div>
                      {globalAddons.map((a) => {
                        if (a.perSqftOfDemo && total.demoSqft === 0) return null;
                        const isOn = !!addons[a.key];
                        return (
                          <label key={a.key} className="est-addon-toggle">
                            <input
                              type="checkbox"
                              checked={isOn}
                              onChange={(e) => setAddons((prev) => ({ ...prev, [a.key]: e.target.checked }))}
                            />
                            <div>
                              <div>{a.name}</div>
                              <div className="est-addon-desc">{a.desc}</div>
                            </div>
                          </label>
                        );
                      })}
                      <label className="est-addon-toggle">
                        <input
                          type="checkbox"
                          checked={contingency}
                          onChange={(e) => setContingency(e.target.checked)}
                        />
                        <div>
                          <div>{contingencyConfig.label}</div>
                          <div className="est-addon-desc">{contingencyConfig.desc}</div>
                        </div>
                      </label>
                    </div>

                    <div className="est-cart-total">
                      <div className="est-total-label">
                        {total.hasCustom ? "Estimated range + custom" : "Estimated range"}
                      </div>
                      {total.hasCustom && total.low === 0 ? (
                        <div className="est-total-range">Custom quote</div>
                      ) : (
                        <div className="est-total-range est-mono">
                          {fmt(total.low)}
                          <span className="est-dash">–</span>
                          {fmt(total.high)}
                        </div>
                      )}
                      <div className="est-total-note">{config.cartTotalNote}</div>
                    </div>

                    <button type="button" className="est-cta-btn" onClick={openModal}>
                      Send me this estimate →
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Floating Sticky Bar when items are selected */}
        {itemCount > 0 && (
          <div className="est-mobile-floating-bar">
            <div className="est-mobile-bar-summary" onClick={scrollToCart}>
              <div className="est-mobile-bar-count">
                <span className="est-mobile-count-badge">{itemCount}</span>
                <span>{itemCount === 1 ? "Item selected" : "Items selected"}</span>
              </div>
              <div className="est-mobile-bar-price est-mono">
                {total.hasCustom && total.low === 0 ? "Custom Quote" : `${fmt(total.low)} – ${fmt(total.high)}`}
              </div>
            </div>
            <button type="button" className="est-mobile-bar-cta" onClick={openModal}>
              Get Quote →
            </button>
          </div>
        )}

        {/* Footer info */}
        <div className="est-footer">{config.footerNote}</div>

        {/* Modal */}
        {modalOpen && (
          <div
            className="est-modal-backdrop"
            onClick={(e) => {
              if (e.target === e.currentTarget) closeModal();
            }}
          >
            <div className="est-modal">
              {submitState === "success" ? (
                <div className="est-success-body">
                  <div className="est-success-icon">✓</div>
                  <h2 className="est-success-title">{modal.successTitle}</h2>
                  <p className="est-success-msg">{successMessage}</p>
                  <button type="button" className="est-cta-btn" onClick={closeModal}>
                    {modal.doneLabel}
                  </button>
                </div>
              ) : (
                <>
                  <div className="est-modal-head">
                    <h2 className="est-modal-title">{modal.title}</h2>
                    <button type="button" className="est-modal-close" onClick={closeModal}>
                      ×
                    </button>
                  </div>
                  <div className="est-modal-body">
                    <div className="est-modal-summary">
                      <span className="est-modal-summary-label">{modal.summaryLabel}</span>
                      <span className="est-modal-summary-value est-mono">
                        {total.hasCustom && total.low === 0
                          ? "Custom"
                          : `${fmt(total.low)} – ${fmt(total.high)}`}
                      </span>
                    </div>

                    <div className="est-field">
                      <label className="est-label" htmlFor="est-c-name">
                        Full name
                      </label>
                      <input
                        type="text"
                        className="est-input"
                        id="est-c-name"
                        required
                        placeholder="John Doe"
                        value={contact.name}
                        onChange={(e) => setContact((prev) => ({ ...prev, name: e.target.value }))}
                      />
                    </div>

                    <div className="est-field">
                      <label className="est-label" htmlFor="est-c-email">
                        Email
                      </label>
                      <input
                        type="email"
                        className="est-input"
                        id="est-c-email"
                        required
                        placeholder="john@example.com"
                        value={contact.email}
                        onChange={(e) => setContact((prev) => ({ ...prev, email: e.target.value }))}
                      />
                    </div>

                    <div className="est-field">
                      <label className="est-label" htmlFor="est-c-phone">
                        Phone <span className="est-label-hint">optional</span>
                      </label>
                      <input
                        type="tel"
                        className="est-input"
                        id="est-c-phone"
                        placeholder="(352) 000-0000"
                        value={contact.phone}
                        onChange={(e) => setContact((prev) => ({ ...prev, phone: e.target.value }))}
                      />
                    </div>

                    <div className="est-field">
                      <label className="est-label" htmlFor="est-c-notes">
                        Notes <span className="est-label-hint">optional</span>
                      </label>
                      <textarea
                        className="est-input"
                        id="est-c-notes"
                        rows="3"
                        placeholder="Timeline, materials, questions…"
                        value={contact.notes}
                        onChange={(e) => setContact((prev) => ({ ...prev, notes: e.target.value }))}
                      />
                    </div>

                    {submitState === "error" && (
                      <div className="est-error-msg">{modal.errorMessage}</div>
                    )}
                  </div>

                  <div className="est-modal-actions">
                    <button type="button" className="est-btn-ghost" onClick={closeModal}>
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="est-cta-btn"
                      onClick={submitForm}
                      disabled={submitState === "sending"}
                    >
                      {submitState === "sending" ? "Sending…" : "Send estimate"}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EstimatorClient;
