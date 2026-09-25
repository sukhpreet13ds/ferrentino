"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import ReadyCta from "../ReadyCta";

const ProjectDetailClient = ({ project, otherProjects }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const slides = project.walkthroughSlides || [];
  const [currentSlide, setCurrentSlide] = useState(0);
  const thumbContainerRef = useRef(null);

  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const scrollThumbnails = (direction) => {
    if (thumbContainerRef.current) {
      const scrollAmount = thumbContainerRef.current.clientWidth * 0.75;
      thumbContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const specs = project.specs || {};
  const active = slides[currentSlide];

  return (
    <div className="project-view-page">
      <header className="pv-header-section">
        <div className="pv-header-container">
          <Link href="/projects" className="pv-back-link">
            ‹ BACK TO ALL PROJECTS
          </Link>

          <div className="pv-meta-bar">
            <div className="pv-meta-left">
              <span className="pv-badge">{project.category}</span>
              <span className="pv-meta-date">{project.year}</span>
            </div>
            <div className="pv-location">
              <i className="fa-solid fa-location-dot"></i> {project.location}
            </div>
          </div>

          <h1 className="pv-main-title">{project.title}</h1>

          <div className="pv-hero-img-box reveal-zoom">
            <img src={project.heroImage} alt={project.title} />
          </div>
        </div>
      </header>

      {slides.length > 0 && (
        <section className="pv-walkthrough-section">
          <div className="pv-walkthrough-container">
            <div className="pv-section-header-row">
              <div className="pv-header-text-group">
                <span className="pv-subtag">PROJECT WALKTHROUGH</span>
                <h2 className="pv-section-title">Explore the Craftsmanship</h2>
              </div>

              <div className="pv-slider-controls">
                <span className="pv-slide-counter">
                  {String(currentSlide + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
                </span>
                <button onClick={handlePrevSlide} className="pv-arrow-btn" aria-label="Previous Slide">
                  ‹
                </button>
                <button onClick={handleNextSlide} className="pv-arrow-btn" aria-label="Next Slide">
                  ›
                </button>
              </div>
            </div>

            <div className="pv-main-slider-card reveal-zoom">
              <img src={active.image} alt={active.title || active.label || "Craftsmanship & Architectural Detail"} className="pv-slider-img" />
              <div className="pv-slider-overlay">
                <div className="pv-overlay-content">
                  <h3 className="pv-overlay-title">{active.title || active.label || "Craftsmanship & Architectural Detail"}</h3>
                  {(active.desc || active.description) && (
                    <p className="pv-overlay-desc">{active.desc || active.description}</p>
                  )}
                </div>
                <div className="pv-slider-dots">
                  {slides.map((_, idx) => (
                    <span
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`pv-dot ${idx === currentSlide ? "active" : ""}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="pv-thumbnails-wrapper">
              <button className="pv-thumb-scroll-btn left" onClick={() => scrollThumbnails("left")} aria-label="Scroll mini images left">
                ‹
              </button>

              <div className="pv-thumbnails-row" ref={thumbContainerRef}>
                {slides.map((slide, idx) => (
                  <div
                    key={`slide-${slide.id ?? idx}-${idx}`}
                    onClick={() => setCurrentSlide(idx)}
                    className={`pv-thumb-item ${idx === currentSlide ? "active" : ""}`}
                  >
                    <div className="pv-thumb-img-wrapper">
                      <img src={slide.image} alt={slide.title || slide.label || "FEATURE DETAIL"} />
                    </div>
                    <span className="pv-thumb-label">{slide.title || slide.label || "FEATURE DETAIL"}</span>
                  </div>
                ))}
              </div>

              <button className="pv-thumb-scroll-btn right" onClick={() => scrollThumbnails("right")} aria-label="Scroll mini images right">
                ›
              </button>
            </div>
          </div>
        </section>
      )}

      <section className="pv-mandate-section">
        <div className="pv-mandate-container">
          <div className="pv-header-text-group reveal-zoom">
            <span className="pv-subtag">THE PROJECT MANDATE</span>
            <h2 className="pv-section-title">Generations of Timber &amp; Stone</h2>
          </div>

          <div className="pv-mandate-grid">
            <div className="pv-specs-card reveal-zoom">
              <h3 className="pv-specs-title">Project Specifics</h3>
              <div className="pv-specs-list">
                <div className="pv-specs-row">
                  <span className="pv-specs-label">Client Scope</span>
                  <span className="pv-specs-value">{specs.clientScope}</span>
                </div>
                <div className="pv-specs-row">
                  <span className="pv-specs-label">Timber Source</span>
                  <span className="pv-specs-value">{specs.timberSource}</span>
                </div>
                <div className="pv-specs-row">
                  <span className="pv-specs-label">Speciality Craft</span>
                  <span className="pv-specs-value">{specs.specialtyCraft}</span>
                </div>
                <div className="pv-specs-row">
                  <span className="pv-specs-label">Square Footage</span>
                  <span className="pv-specs-value">{specs.squareFootage}</span>
                </div>
              </div>
            </div>

            <div className="pv-mandate-right reveal-zoom" data-delay="150">
              <div className="pv-text-block">
                <h4 className="pv-block-subtitle">THE CHALLENGE</h4>
                <p className="pv-block-p">{project.challenge}</p>
              </div>

              <div className="pv-text-block">
                <h4 className="pv-block-subtitle">THE SOLUTION</h4>
                <p className="pv-block-p">{project.solution}</p>
              </div>

              <div className="pv-quote-box">
                <p className="pv-quote-text">“{project.quoteText}”</p>
                <span className="pv-quote-author">— {project.quoteAuthor}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {otherProjects.length > 0 && (
        <section className="pv-portfolios-section">
          <div className="pv-portfolios-container">
            <div className="pv-section-header-row reveal-zoom">
              <div className="pv-header-text-group">
                <span className="pv-subtag">CONTINUE EXPLORING</span>
                <h2 className="pv-section-title">Other Premium Portfolios</h2>
              </div>
              <Link href="/projects" className="pv-view-all-link">
                VIEW ALL CASE STUDIES
              </Link>
            </div>

            <div className="pv-portfolios-grid">
              {otherProjects.map((p, idx) => {
                const projectSlug = p.slug || (p.title ? p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") : p.id);
                return (
                  <Link
                    href={`/projects/${projectSlug}`}
                    className="pv-portfolio-card reveal-zoom"
                    key={`other-${p.id ?? idx}-${idx}`}
                    data-delay={idx === 0 ? "0" : "150"}
                    style={{ textDecoration: "none", color: "inherit", display: "block" }}
                  >
                    <div className="pv-portfolio-img-wrapper">
                      <img src={p.heroImage} alt={p.title} />
                      <div className="pv-card-badge-bar">
                        <span className="pv-card-badge">{p.category}</span>
                        <span className="pv-card-location">{p.location}</span>
                      </div>
                    </div>
                    <div className="pv-portfolio-card-body">
                      <h3 className="pv-card-title">{p.title}</h3>
                      <p className="pv-card-desc">{p.description}</p>
                      <span className="pv-card-link">
                        View Project Case Study →
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <ReadyCta />
    </div>
  );
};

export default ProjectDetailClient;
