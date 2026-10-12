"use client"; 

import { useState, useEffect } from "react";
import Link from "next/link";
import ReadyCta from "../ReadyCta";

const ProjectDetailClient = ({ project, otherProjects }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const slides = project.walkthroughSlides || [];

  const rawGridImages = project.gridImages || [];
  const collageImages = rawGridImages.length > 0
    ? rawGridImages.map((v) => (typeof v === "string" ? v : v?.image || v?.url || v?.src || "")).filter(Boolean)
    : slides.map(s => s.image).filter(Boolean);


  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const lightboxNext = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev + 1) % collageImages.length);
  };

  const lightboxPrev = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev - 1 + collageImages.length) % collageImages.length);
  };




  const specs = project.specs || {};

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

          {/* <div className="pv-hero-img-box reveal-zoom">
            <img src={project.heroImage} alt={project.title} />
          </div> */}
        </div>
      </header>


      {collageImages.length > 0 && (
        <section className="pv-collage-section">
          <div className="pv-collage-container reveal-zoom">
            <div className="project-collage-grid">
              {collageImages.map((imgUrl, idx) => (
                <div key={`collage-${idx}`} className="project-collage-item" onClick={() => openLightbox(idx)} style={{ cursor: "pointer" }}>
                  <img src={imgUrl} alt={`${project.title} detail ${idx + 1}`} loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}



      {/* <section className="pv-mandate-section">
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
      </section> */}

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
                      {/* <span className="pv-card-link">
                        View Project Case Study →
                      </span> */}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {lightboxOpen && collageImages.length > 0 && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.9)",
          zIndex: 9999,
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }} onClick={closeLightbox}>
          <button style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            background: "none",
            border: "none",
            color: "white",
            fontSize: "40px",
            cursor: "pointer",
            zIndex: 10000,
            padding: "10px"
          }} onClick={closeLightbox} aria-label="Close">
            &times;
          </button>
          
          <button style={{
            position: "absolute",
            left: "20px",
            background: "none",
            border: "none",
            color: "white",
            fontSize: "50px",
            cursor: "pointer",
            zIndex: 10000,
            padding: "10px"
          }} onClick={lightboxPrev} aria-label="Previous">
            &#10094;
          </button>

          <img 
            src={collageImages[lightboxIndex]} 
            alt="Expanded view" 
            style={{
              maxWidth: "90%",
              maxHeight: "90vh",
              objectFit: "contain"
            }} 
            onClick={(e) => e.stopPropagation()}
          />

          <button style={{
            position: "absolute",
            right: "20px",
            background: "none",
            border: "none",
            color: "white",
            fontSize: "50px",
            cursor: "pointer",
            zIndex: 10000,
            padding: "10px"
          }} onClick={lightboxNext} aria-label="Next">
            &#10095;
          </button>
        </div>
      )}

      <ReadyCta />
    </div>
  );
};

export default ProjectDetailClient;
