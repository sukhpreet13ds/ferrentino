"use client";

import { useState, useRef } from "react";

const fmt = (n) => "$" + Math.round(n).toLocaleString("en-US");

/* ── Professional SVG Icons for Project Types ── */
const ICONS = {
  remodel: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  addition: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="12" height="13" rx="1" />
      <path d="M14 11h8v9a1 1 0 01-1 1h-7" />
      <line x1="18" y1="8" x2="18" y2="14" />
      <line x1="15" y1="11" x2="21" y2="11" />
    </svg>
  ),
  kitchen: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 3h16a1 1 0 011 1v16a1 1 0 01-1 1H4a1 1 0 01-1-1V4a1 1 0 011-1z" />
      <line x1="4" y1="10" x2="20" y2="10" />
      <line x1="12" y1="10" x2="12" y2="21" />
      <circle cx="8" cy="6.5" r="1.5" />
      <circle cx="16" cy="6.5" r="1.5" />
    </svg>
  ),
  bathroom: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12h16v5a4 4 0 01-4 4H8a4 4 0 01-4-4v-5z" />
      <path d="M6 12V5a2 2 0 012-2h1a2 2 0 012 2v1" />
      <circle cx="7" cy="19.5" r="1" />
      <circle cx="17" cy="19.5" r="1" />
    </svg>
  ),
  outdoor: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 19h20L12 2z" />
      <path d="M12 9v6" />
      <path d="M9 15h6" />
    </svg>
  ),
  design: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="9" y1="13" x2="15" y2="13" />
      <line x1="9" y1="17" x2="13" y2="17" />
    </svg>
  ),
};

/* ── Project Types & Pricing Configurations ── */
const PROJECT_TYPES = [
  {
    id: "home_remodeling",    
    name: "Home Remodeling",
    tagline: "Whole-home renovations & layout modernizations",
    rateLabel: "$275 – $350 / sq ft",
    minRate: 275,
    maxRate: 350,
    icon: ICONS.remodel,
    defaultSqft: 1500,
    sqftPlaceholder: "e.g. 1,500",
    description: "Open-concept reconfigurations, structural header modifications, and complete interior transformations.",
    presets: [800, 1200, 1500, 2000, 2500],
  },
  {
    id: "home_additions",
    name: "Home Additions",
    tagline: "Room additions, expansions & second stories",
    rateLabel: "$275 – $350 / sq ft",
    minRate: 275,
    maxRate: 350,
    icon: ICONS.addition,
    defaultSqft: 500,
    sqftPlaceholder: "e.g. 500",
    description: "Seamlessly expand your home with matched architectural rooflines, foundation tie-ins, and interior finishes.",
    presets: [300, 500, 750, 1000, 1500],
  },
  {
    id: "kitchen_remodel",
    name: "Full Kitchen Remodels",
    tagline: "All-inclusive cabinetry, counters & layout build",
    rateLabel: "$325 – $400 / sq ft",
    minRate: 325,
    maxRate: 400,
    icon: ICONS.kitchen,
    defaultSqft: 250,
    sqftPlaceholder: "e.g. 250",
    description: "Complete full kitchen overhaul: layout reconfiguration, bespoke cabinetry fabrication, quartz/stone countertops, and professional fixture integration.",
    allInclusiveNote: "Full kitchen remodel pricing includes all custom cabinetry, countertops, fixtures, and finishes.",
    presets: [150, 200, 250, 350, 500],
  },
  {
    id: "bath_remodel",
    name: "Full Bathroom Remodels",
    tagline: "All-inclusive spa showers, vanities & tile",
    rateLabel: "$400 – $600 / sq ft",
    minRate: 400,
    maxRate: 600,
    icon: ICONS.bathroom,
    defaultSqft: 120,
    sqftPlaceholder: "e.g. 120",
    description: "Full bathroom redesign with curbless rain showers, premium tile masonry, custom vanity storage, and durable plumbing finishes.",
    allInclusiveNote: "Full bathroom remodel pricing includes vanities, countertops, custom shower masonry, plumbing, and fixtures.",
    hasFinishLevels: true,
    finishLevels: [
      { id: "good", name: "Good", rate: 400, badge: "$400 / sq ft", desc: "Quality fixtures, durable porcelain tile, and standard custom vanity" },
      { id: "better", name: "Better", rate: 500, badge: "$500 / sq ft", desc: "Upgraded fixtures, custom vanity millwork, and designer tile layouts" },
      { id: "best", name: "Best", rate: 600, badge: "$600 / sq ft", desc: "Luxury spa-grade fixtures, natural stone slabs, and curbless zero-threshold shower" },
    ],
    presets: [60, 90, 120, 160, 220],
  },
  {
    id: "outdoor_living",
    name: "Outdoor Living",
    tagline: "Patios, summer kitchens & outdoor entertaining",
    rateLabel: "$150 – $250 / sq ft (Base Test Rate)",
    minRate: 150,
    maxRate: 250,
    icon: ICONS.outdoor,
    defaultSqft: 400,
    sqftPlaceholder: "e.g. 400",
    description: "Custom outdoor living spaces designed as seamless extensions of your home.",
    hasOutdoorQuestions: true,
    presets: [200, 350, 500, 750, 1000],
  },
  {
    id: "design_planning",
    name: "Design & Planning",
    tagline: "Engineering & permit-ready construction plans",
    rateLabel: "Tiered flat rate ($2,000 – $10,000)",
    icon: ICONS.design,
    defaultSqft: 1200,
    sqftPlaceholder: "e.g. 1,200",
    description: "Turn your ideas into a buildable project plan before breaking ground.",
    scopeNote: "Pricing is based on the total square footage of the project. Design and planning services include engineering and preparation of plans for permitting.",
    isTieredFlat: true,
    tiers: [
      { minSqft: 1, maxSqft: 100, cost: 2000, label: "1 to 100 sq ft — $2,000" },
      { minSqft: 101, maxSqft: 1000, cost: 5000, label: "101 to 1,000 sq ft — $5,000" },
      { minSqft: 1001, maxSqft: Infinity, cost: 10000, label: "1,001+ sq ft — $10,000" },
    ],
    presets: [80, 450, 1200, 2000, 3500],
  },
];

export default function GuidedEstimator({ config }) {
  const formspreeEndpoint = config?.formspreeEndpoint || "https://formspree.io/f/YOUR_FORM_ID";

  // Calculator State
  const [selectedProjectId, setSelectedProjectId] = useState("home_remodeling");
  const [sqftInput, setSqftInput] = useState("1500");
  const [bathFinishLevel, setBathFinishLevel] = useState("better");
  const [outdoorOptions, setOutdoorOptions] = useState({
    fireplace: false,
    pavers: true,
    retainingWall: false,
  });

  // Quote Form / Lead Inquiry State
  const [isQuoteFormOpen, setIsQuoteFormOpen] = useState(false);
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
  });
  const [submitState, setSubmitState] = useState("idle"); // idle | sending | success | error

  const quoteFormRef = useRef(null);
  const resultRef = useRef(null);

  // Derived current project config
  const currentProject = PROJECT_TYPES.find((p) => p.id === selectedProjectId) || PROJECT_TYPES[0];
  const sqft = parseFloat(sqftInput) || 0;
  const isSqftValid = sqft > 0;

  // Calculation
  let calculatedLow = 0;
  let calculatedHigh = 0;
  let calculationMode = "range"; // 'range' | 'flat' | 'single'
  let breakdownSummary = "";

  if (isSqftValid) {
    if (currentProject.isTieredFlat) {
      calculationMode = "flat";
      if (sqft <= 100) {
        calculatedLow = 2000;
        calculatedHigh = 2000;
        breakdownSummary = "Tier 1 (1–100 sq ft): $2,000 flat-rate (engineering & permitting plans included)";
      } else if (sqft <= 1000) {
        calculatedLow = 5000;
        calculatedHigh = 5000;
        breakdownSummary = "Tier 2 (101–1,000 sq ft): $5,000 flat-rate (engineering & permitting plans included)";
      } else {
        calculatedLow = 10000;
        calculatedHigh = 10000;
        breakdownSummary = "Tier 3 (1,001+ sq ft): $10,000 flat-rate (engineering & permitting plans included)";
      }
    } else if (currentProject.hasFinishLevels) {
      const selectedTier = currentProject.finishLevels.find((f) => f.id === bathFinishLevel) || currentProject.finishLevels[1];
      calculatedLow = sqft * selectedTier.rate;
      calculatedHigh = sqft * selectedTier.rate;
      calculationMode = "single";
      breakdownSummary = `${sqft.toLocaleString()} sq ft @ $${selectedTier.rate}/sq ft (${selectedTier.name} Finish Level · all-inclusive bathroom remodel)`;
    } else {
      calculatedLow = sqft * currentProject.minRate;
      calculatedHigh = sqft * currentProject.maxRate;
      calculationMode = "range";
      breakdownSummary = `${sqft.toLocaleString()} sq ft @ $${currentProject.minRate}–$${currentProject.maxRate}/sq ft`;
    }
  }

  // Handle Project Change
  const handleSelectProject = (project) => {
    setSelectedProjectId(project.id);
    setSqftInput(String(project.defaultSqft));
  };

  // Toggle Outdoor Checkbox
  const handleToggleOutdoorOption = (key) => {
    setOutdoorOptions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Open Quote Form with smooth scroll
  const handleOpenQuoteForm = () => {
    setIsQuoteFormOpen(true);
    setTimeout(() => {
      quoteFormRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  // Submit Quote Inquiry
  const handleSubmitQuote = async (e) => {
    e.preventDefault();
    if (!contact.name.trim()) {
      alert("Please enter your full name.");
      return;
    }
    if (!contact.email.trim()) {
      alert("Please enter your email address.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    setSubmitState("sending");

    const estimateDisplay = calculationMode === "range"
      ? `${fmt(calculatedLow)} – ${fmt(calculatedHigh)}`
      : fmt(calculatedLow);

    let optionsSummary = "Standard";
    if (currentProject.hasFinishLevels) {
      const selectedTier = currentProject.finishLevels.find((f) => f.id === bathFinishLevel);
      optionsSummary = `Finish Level: ${selectedTier?.name} ($${selectedTier?.rate}/sq ft)`;
    } else if (currentProject.hasOutdoorQuestions) {
      const opts = [];
      if (outdoorOptions.fireplace) opts.push("Include Fireplace: Yes");
      if (outdoorOptions.pavers) opts.push("Include Pavers: Yes");
      if (outdoorOptions.retainingWall) opts.push("Include Retaining Wall: Yes");
      optionsSummary = opts.length ? opts.join(", ") : "No special features selected";
    }

    const payload = {
      projectType: currentProject.name,
      squareFootage: `${sqft} sq ft`,
      selectedOptions: optionsSummary,
      estimatedCostRange: estimateDisplay,
      breakdown: breakdownSummary,
      customerName: contact.name,
      customerEmail: contact.email,
      customerPhone: contact.phone || "Not provided",
      projectAddress: contact.address || "Not provided",
      customerNotes: contact.notes || "None",
      submittedAt: new Date().toISOString(),
    };

    if (!formspreeEndpoint || formspreeEndpoint.includes("YOUR_FORM_ID")) {
      console.log("[Ferrentino Estimator Inquiry Payload]:", payload);
      setTimeout(() => {
        setSubmitState("success");
      }, 700);
      return;
    }

    try {
      const res = await fetch(formspreeEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setSubmitState("success");
      } else {
        throw new Error("Submission failed");
      }
    } catch {
      setSubmitState("error");
    }
  };

  return (
    <div className="ge-root" id="project-calculator">
      {/* ── STEP 1: Select Project Type ── */}
      <section className="ge-calc-section">
        <div className="ge-calc-header">
          <div className="ge-step-eyebrow">STEP 1 · SELECT PROJECT TYPE</div>
          <h2 className="ge-step-title">What project are you planning?</h2>
          <p className="ge-step-subtitle">
            Choose your project category below to calculate a preliminary cost range based on Marion County standards.
          </p>
        </div>

        <div className="ge-project-grid" role="radiogroup" aria-label="Select Project Type">
          {PROJECT_TYPES.map((p) => {
            const isSelected = p.id === selectedProjectId;
            return (
              <button
                key={p.id}
                type="button"
                className={`ge-project-card ${isSelected ? "selected" : ""}`}
                onClick={() => handleSelectProject(p)}
                role="radio"
                aria-checked={isSelected}
              >
                {p.badge && <span className="ge-card-badge">{p.badge}</span>}
                <div className="ge-card-top">
                  <div className="ge-project-icon">{p.icon}</div>
                  <div className="ge-card-radio-circle">
                    {isSelected && <span className="ge-card-radio-dot"></span>}
                  </div>
                </div>
                <div className="ge-project-title" style={{marginBottom:"10px"}}>{p.name}</div>
                {/* <div className="ge-project-rate">{p.rateLabel}</div> */}
                <div className="ge-project-tagline">{p.tagline}</div>
              </button>
            );
          })}
        </div>
      </section>

      {/* ── STEP 2: Square Footage & Options ── */}
      <section className="ge-calc-section">
        <div className="ge-calc-header">
          <div className="ge-step-eyebrow">STEP 2 · PROJECT SPECIFICATIONS</div>
          <h3 className="ge-step-title">Enter approximate square footage</h3>
          <p className="ge-step-subtitle">
            {currentProject.description}
          </p>
        </div>

        <div className="ge-spec-box">
          <div className="ge-input-row">
            <div className="ge-input-wrap">
              <label htmlFor="ge-sqft-input" className="ge-input-label">
                Approximate Square Footage (sq ft)
              </label>
              <div className="ge-input-field-group">
                <input
                  id="ge-sqft-input"
                  type="number"
                  min="1"
                  step="1"
                  className={`ge-sqft-input ${!isSqftValid && sqftInput !== "" ? "invalid" : ""}`}
                  placeholder={currentProject.sqftPlaceholder}
                  value={sqftInput}
                  onChange={(e) => setSqftInput(e.target.value)}
                />
                <span className="ge-sqft-unit">sq ft</span>
              </div>
              {!isSqftValid && (
                <p className="ge-validation-error">Please enter a valid square footage greater than 0.</p>
              )}
            </div>

            {/* Quick preset buttons */}
            <div className="ge-presets-wrap">
              <span className="ge-presets-title">Quick Select:</span>
              <div className="ge-presets-list">
                {currentProject.presets.map((val) => (
                  <button
                    key={val}
                    type="button"
                    className={`ge-preset-btn ${sqft === val ? "active" : ""}`}
                    onClick={() => setSqftInput(String(val))}
                  >
                    {val.toLocaleString()} sq ft
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Full Kitchen Remodels Comment/Notice */}
          {currentProject.allInclusiveNote && currentProject.id === "kitchen_remodel" && (
            <div className="ge-scope-banner">
              <div className="ge-scope-banner-icon">✓</div>
              <div className="ge-scope-banner-text">
                <strong>Full Kitchen Remodel Scope:</strong> {currentProject.allInclusiveNote}
              </div>
            </div>
          )}

          {/* Full Bathroom Remodels Finish Level Selection */}
          {currentProject.hasFinishLevels && (
            <div className="ge-extra-scope-section">
              <div className="ge-sub-section-title">
                <span>Select Finish Level</span>
                <span className="ge-sub-section-hint">Pricing is determined by your chosen finish tier</span>
              </div>
              <div className="ge-finish-grid">
                {currentProject.finishLevels.map((lvl) => {
                  const isLvlSelected = bathFinishLevel === lvl.id;
                  return (
                    <button
                      key={lvl.id}
                      type="button"
                      className={`ge-finish-card ${isLvlSelected ? "selected" : ""}`}
                      onClick={() => setBathFinishLevel(lvl.id)}
                    >
                      <div className="ge-finish-card-head">
                        <span className="ge-finish-name">{lvl.name}</span>
                        <span className="ge-finish-rate">{lvl.badge}</span>
                      </div>
                      <p className="ge-finish-desc">{lvl.desc}</p>
                      <div className="ge-finish-select-indicator">
                        {isLvlSelected ? "Selected" : "Select Level"}
                      </div>
                    </button>
                  );
                })}
              </div>
              {currentProject.allInclusiveNote && (
                <div className="ge-scope-banner" style={{ marginTop: "16px" }}>
                  <div className="ge-scope-banner-icon">✓</div>
                  <div className="ge-scope-banner-text">
                    <strong>All-Inclusive Bathroom Remodel:</strong> {currentProject.allInclusiveNote}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Outdoor Living Additional Scope Questions */}
          {currentProject.hasOutdoorQuestions && (
            <div className="ge-extra-scope-section">
              <div className="ge-sub-section-title">
                <span>Outdoor Living Project Features</span>
                <span className="ge-sub-section-hint">Select the features you would like to include</span>
              </div>
              <p className="ge-outdoor-note">
                Select your intended scope below. Pricing for outdoor living projects and individual features will be finalized in your formal proposal.
              </p>
              <div className="ge-checkbox-group">
                <label className="ge-checkbox-item">
                  <input
                    type="checkbox"
                    checked={outdoorOptions.fireplace}
                    onChange={() => handleToggleOutdoorOption("fireplace")}
                  />
                  <div className="ge-checkbox-box">
                    <svg viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ge-checkbox-content">
                    <span className="ge-checkbox-label">Include an Outdoor Fireplace</span>
                    <span className="ge-checkbox-sub">Custom masonry, gas, or wood-burning hearth</span>
                  </div>
                </label>

                <label className="ge-checkbox-item">
                  <input
                    type="checkbox"
                    checked={outdoorOptions.pavers}
                    onChange={() => handleToggleOutdoorOption("pavers")}
                  />
                  <div className="ge-checkbox-box">
                    <svg viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ge-checkbox-content">
                    <span className="ge-checkbox-label">Include Pavers</span>
                    <span className="ge-checkbox-sub">Patios, walkways, pool decks, and decorative borders</span>
                  </div>
                </label>

                <label className="ge-checkbox-item">
                  <input
                    type="checkbox"
                    checked={outdoorOptions.retainingWall}
                    onChange={() => handleToggleOutdoorOption("retainingWall")}
                  />
                  <div className="ge-checkbox-box">
                    <svg viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ge-checkbox-content">
                    <span className="ge-checkbox-label">Include a Retaining Wall</span>
                    <span className="ge-checkbox-sub">Structural grade retention, raised planters & terrace masonry</span>
                  </div>
                </label>
              </div>
            </div>
          )}

          {/* Design & Planning Tier Information */}
          {currentProject.isTieredFlat && (
            <div className="ge-extra-scope-section">
              <div className="ge-scope-banner">
                <div className="ge-scope-banner-icon">ℹ</div>
                <div className="ge-scope-banner-text">
                  <strong>Design & Planning Scope:</strong> {currentProject.scopeNote}
                </div>
              </div>
              <div className="ge-tier-table">
                <div className="ge-tier-row-head">
                  <span>Total Project Size</span>
                  <span>Flat-Rate Investment</span>
                  <span>Status</span>
                </div>
                {currentProject.tiers.map((t, idx) => {
                  const isActive = sqft >= t.minSqft && sqft <= t.maxSqft;
                  return (
                    <div key={idx} className={`ge-tier-row ${isActive ? "active-tier" : ""}`}>
                      <span className="ge-tier-range">{t.label.split(" — ")[0]}</span>
                      <span className="ge-tier-cost">{fmt(t.cost)}</span>
                      <span className="ge-tier-badge">{isActive ? "Applicable Tier" : "—"}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── STEP 3: Real-Time Calculated Estimate Card ── */}
      <section className="ge-result-section" ref={resultRef}>
        <div className="ge-result-card">
          <div className="ge-result-top">
            <span className="ge-preliminary-tag">
              <span className="ge-tag-dot"></span> PRELIMINARY PLANNING ESTIMATE
            </span>
            <span className="ge-subject-review">Subject to review by Ferrentino & Son</span>
          </div>

          <div className="ge-result-main">
            <div className="ge-result-project-info">
              <span className="ge-result-label">Estimated Investment Range:</span>
              <div className="ge-result-price">
                {isSqftValid ? (
                  calculationMode === "range" ? (
                    <>
                      <span>{fmt(calculatedLow)}</span>
                      <span className="ge-price-dash">–</span>
                      <span>{fmt(calculatedHigh)}</span>
                    </>
                  ) : (
                    <span>{fmt(calculatedLow)}</span>
                  )
                ) : (
                  <span className="ge-price-placeholder">Enter square footage</span>
                )}
              </div>
              {isSqftValid && (
                <div className="ge-result-breakdown">
                  <strong>Selected:</strong> {currentProject.name} ({breakdownSummary})
                </div>
              )}
            </div>

            <div className="ge-result-cta-col">
              <button
                type="button"
                className="ge-cta-quote-btn"
                onClick={handleOpenQuoteForm}
              >
                <span>Request a Detailed Project Quote</span>
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>

          {/* Official Client Disclaimer */}
          <div className="ge-disclaimer-box">
            <p className="ge-disclaimer-title">Preliminary Estimate Disclaimer</p>
            <p className="ge-disclaimer-text">
              This calculator provides a preliminary cost estimate for planning purposes only. Actual pricing may vary based on project specifications, materials, site conditions, and other factors. All estimates are subject to review and confirmation by Ferrentino & Son. Final pricing will be provided in a formal project proposal.
            </p>
          </div>
        </div>
      </section>

      {/* ── STEP 4: Detailed Quote Request Inquiry Form ── */}
      {isQuoteFormOpen && (
        <section className="ge-inquiry-section" ref={quoteFormRef}>
          <div className="ge-inquiry-card">
            <div className="ge-inquiry-head">
              <div className="ge-step-eyebrow">FINAL STEP · SUBMIT INQUIRY</div>
              <h3 className="ge-inquiry-title">Request Your Formal Project Proposal</h3>
              <p className="ge-inquiry-desc">
                Your estimated scope and selections have been pre-filled below. Provide your contact info and our master builder team will review your project parameters.
              </p>
            </div>

            {/* Carry-over summary pill */}
            <div className="ge-carried-summary">
              <div className="ge-carried-item">
                <span className="ge-carried-label">Project:</span>
                <span className="ge-carried-val">{currentProject.name}</span>
              </div>
              <div className="ge-carried-item">
                <span className="ge-carried-label">Square Footage:</span>
                <span className="ge-carried-val">{sqft.toLocaleString()} sq ft</span>
              </div>
              <div className="ge-carried-item">
                <span className="ge-carried-label">Preliminary Cost:</span>
                <span className="ge-carried-val highlight">
                  {calculationMode === "range"
                    ? `${fmt(calculatedLow)} – ${fmt(calculatedHigh)}`
                    : fmt(calculatedLow)}
                </span>
              </div>
              {currentProject.hasFinishLevels && (
                <div className="ge-carried-item">
                  <span className="ge-carried-label">Finish Level:</span>
                  <span className="ge-carried-val" style={{ textTransform: "capitalize" }}>{bathFinishLevel}</span>
                </div>
              )}
            </div>

            {submitState === "success" ? (
              <div className="ge-inquiry-success">
                <div className="ge-success-icon">✓</div>
                <h4>Thank You, {contact.name.split(" ")[0] || "Friend"}!</h4>
                <p>
                  Your preliminary project inquiry for <strong>{currentProject.name}</strong> ({sqft.toLocaleString()} sq ft) has been received. Our team will examine your specifications and contact you shortly with next steps.
                </p>
                <button
                  type="button"
                  className="ge-reset-btn"
                  onClick={() => {
                    setSubmitState("idle");
                    setIsQuoteFormOpen(false);
                  }}
                >
                  Start Another Calculation
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitQuote} className="ge-inquiry-form">
                <div className="ge-form-grid">
                  <div className="ge-form-field">
                    <label htmlFor="ge-cust-name">Full Name *</label>
                    <input
                      id="ge-cust-name"
                      type="text"
                      required
                      placeholder="e.g. John Miller"
                      value={contact.name}
                      onChange={(e) => setContact({ ...contact, name: e.target.value })}
                    />
                  </div>

                  <div className="ge-form-field">
                    <label htmlFor="ge-cust-email">Email Address *</label>
                    <input
                      id="ge-cust-email"
                      type="email"
                      required
                      placeholder="e.g. john@example.com"
                      value={contact.email}
                      onChange={(e) => setContact({ ...contact, email: e.target.value })}
                    />
                  </div>

                  <div className="ge-form-field">
                    <label htmlFor="ge-cust-phone">Phone Number</label>
                    <input
                      id="ge-cust-phone"
                      type="tel"
                      placeholder="e.g. (352) 555-0199"
                      value={contact.phone}
                      onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                    />
                  </div>

                  <div className="ge-form-field">
                    <label htmlFor="ge-cust-address">Project City / Address</label>
                    <input
                      id="ge-cust-address"
                      type="text"
                      placeholder="e.g. Ocala, Marion County, FL"
                      value={contact.address}
                      onChange={(e) => setContact({ ...contact, address: e.target.value })}
                    />
                  </div>

                  <div className="ge-form-field full-width">
                    <label htmlFor="ge-cust-notes">Project Notes or Specific Ideas</label>
                    <textarea
                      id="ge-cust-notes"
                      rows="3"
                      placeholder="Tell us about your timeline, design vision, existing conditions, or any custom requests..."
                      value={contact.notes}
                      onChange={(e) => setContact({ ...contact, notes: e.target.value })}
                    ></textarea>
                  </div>
                </div>

                {submitState === "error" && (
                  <div className="ge-submit-error">
                    Something went wrong submitting your quote. Please call us directly at <strong>(352) 237-3368</strong> or email estimating@ferrentinoandson.com.
                  </div>
                )}

                <div className="ge-inquiry-actions">
                  <button
                    type="submit"
                    className="ge-submit-inquiry-btn"
                    disabled={submitState === "sending"}
                  >
                    {submitState === "sending" ? "Submitting Inquiry..." : "Submit Project Quote Request"}
                  </button>
                  <button
                    type="button"
                    className="ge-cancel-inquiry-btn"
                    onClick={() => setIsQuoteFormOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
