"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import SplitText from "../SplitText";

const AreaDetailClient = ({
  area,
  stats,
  specialtyServices,
  specialtyServicesTitle,
  specialtyServicesDesc,
  blueprintTitle,
  blueprintDesc,
  blueprintSteps,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [openFaq, setOpenFaq] = useState(0);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? -1 : index);
  };

  const faqs = area.faqs || [];
  const features = area.centralFloridaFeatures || [];
  const portfolioProjects = area.portfolioProjects || [];
  const testimonials = area.testimonials || [];
  const services = specialtyServices || [];
  const steps = blueprintSteps || [];
  const statItems = stats || [];

  return (
    <div className="area-we-serve-view-page contact-page">
      <section className="contact-hero-section" style={{ backgroundImage: `url(${area.detailHeroBg})` }}>
        <div className="contact-hero-overlay"></div>

        <div className="contact-hero-container">
          <div className="contact-hero-content">
            <span className="contact-hero-tag">
              <SplitText
                text={area.detailHeroTag}
                className="contact-tag-text"
                delay={40}
                duration={0.85}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 20 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.01}
                rootMargin="0px"
                textAlign="left"
                tag="span"
              />
            </span>

            <h1 className="contact-hero-title">
              <SplitText
                text={area.detailHeroTitleLine1}
                className="contact-title-line"
                delay={45}
                duration={1.2}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.01}
                rootMargin="0px"
                textAlign="left"
                tag="span"
              />
              <SplitText
                text={area.detailHeroTitleLine2}
                className="contact-title-line"
                delay={45}
                duration={1.2}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.01}
                rootMargin="0px"
                textAlign="left"
                tag="span"
              />
            </h1>

            <p className="contact-hero-desc">{area.detailHeroDesc}</p>
          </div>
        </div>
      </section>

      <section className="asv-stats-section">
        <div className="asv-stats-container">
          {statItems.map((stat, idx) => (
            <div
              key={idx}
              className={`asv-stat-item reveal-zoom ${idx < statItems.length - 1 ? "has-divider" : ""}`}
              data-delay={idx * 150}
            >
              <div className="asv-stat-number">{stat.value}</div>
              <div className="asv-stat-text">{stat.text}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="asv-specialties-section">
        <div className="asv-section-container">
          <div className="asv-header-block reveal-zoom">
            <span className="asv-pill-tag">SPECIALTIES</span>
            <h2 className="asv-main-title">{specialtyServicesTitle}</h2>
            <p className="asv-sub-desc">{specialtyServicesDesc}</p>
          </div>

          <div className="asv-services-grid">
            {services.map((service, idx) => (
              <div key={service.id} className="asv-service-card reveal-zoom" data-delay={(idx % 3) * 120}>
                <div className="asv-card-img-wrapper">
                  <img src={service.image} alt={service.title} />
                </div>
                <div className="asv-card-body">
                  <h3 className="asv-card-title">{service.title}</h3>
                  <p className="asv-card-desc">{service.description}</p>
                  <div className="asv-link-wrapper">
                    <Link href={service.href} className="asv-card-link">
                      {service.linkText}
                    </Link>
                    <span className="asv-link-dash">—</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="asv-locality-features-section">
        <div className="asv-section-container">
          <div className="asv-header-block reveal-zoom">
            <span className="asv-pill-tag">{area.hubCity.toUpperCase()} IS HOME</span>
            <h2 className="asv-main-title">Designed for Central Florida's Heart</h2>
            <p className="asv-sub-desc">
              Building in {area.name} demands deeply specialized regional authority. From local permitting codes to specialized foundation soils, we build for longevity.
            </p>
          </div>

          <div className="asv-features-grid">
            {features.map((feat, idx) => (
              <div key={idx} className="asv-feature-card reveal-zoom" data-delay={idx * 150}>
                <div className="asv-feature-icon-box">
                  <i className={feat.icon}></i>
                </div>
                <h3 className="asv-feature-title">{feat.title}</h3>
                <p className="asv-feature-desc">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="asv-portfolio-section">
        <div className="asv-section-container">
          <div className="asv-header-block reveal-zoom">
            <span className="asv-pill-tag">PORTFOLIO</span>
            <h2 className="asv-main-title">Recent Work in {area.name}</h2>
            <p className="asv-sub-desc">
              Take a look at our freshly completed residential designs, luxury master restorations, and pristine commercial projects.
            </p>
          </div>

          <div className="asv-portfolio-grid">
            {portfolioProjects.map((project, idx) => (
              <div key={project.id} className="asv-portfolio-card reveal-zoom" data-delay={idx * 150}>
                <div className="asv-portfolio-img-wrapper">
                  <img src={project.image} alt={project.title} />
                </div>
                <div className="asv-portfolio-content">
                  <h3 className="asv-portfolio-title">{project.title}</h3>
                  <div className="asv-portfolio-location">
                    <i className="fa-solid fa-location-dot"></i> {project.location}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="asv-process-section">
        <div className="asv-section-container">
          <div className="asv-header-block reveal-zoom">
            <span className="asv-pill-tag">THE BLUEPRINT</span>
            <h2 className="asv-main-title">{blueprintTitle}</h2>
            <p className="asv-sub-desc">{blueprintDesc}</p>
          </div>

          <div className="asv-process-grid">
            {steps.map((step, idx) => (
              <div key={step.num} className="asv-process-card reveal-zoom" data-delay={idx * 120}>
                <div className="asv-process-num">{step.num}</div>
                <h3 className="asv-process-title">{step.title}</h3>
                <p className="asv-process-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="asv-testimonials-section">
        <div className="asv-testimonials-container">
          <div className="asv-header-block dark reveal-zoom">
            <span className="asv-pill-tag yellow">CLIENT STORIES</span>
            <h2 className="asv-main-title white">Renovate With a Team You Trust</h2>
            <p className="asv-sub-desc gray">
              Read why {area.name} homeowners and commercial property managers continue to select Ferrentino &amp; Son for their structural milestones.
            </p>
          </div>

          <div className="asv-testimonials-grid">
            {testimonials.map((test, idx) => (
              <div key={idx} className="asv-testimonial-card reveal-zoom" data-delay={idx * 150}>
                <p className="asv-test-quote">"{test.quote}"</p>
                <div className="asv-test-author-block">
                  <h4 className="asv-test-author-name">{test.name}</h4>
                  <p className="asv-test-author-loc">{test.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="asv-faq-section">
        <div className="asv-faq-container">
          <div className="asv-header-block reveal-zoom">
            <span className="asv-pill-tag">QUESTIONS</span>
            <h2 className="asv-main-title">Frequently Asked Inquiries</h2>
            <p className="asv-sub-desc">
              Have questions about the building codes, timelines, or structural engineering guidelines in {area.name}? Read our core FAQs.
            </p>
          </div>

          <div className="asv-faq-list reveal-zoom">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className={`asv-faq-item ${isOpen ? "active" : ""}`}
                  onClick={() => toggleFaq(index)}
                >
                  <div className="asv-faq-question-row">
                    <h3 className="asv-faq-question-title">{faq.question}</h3>
                    <span className="asv-faq-toggle-icon">
                      <i className={`fa-solid ${isOpen ? "fa-chevron-up" : "fa-chevron-down"}`}></i>
                    </span>
                  </div>
                  {isOpen && (
                    <div className="asv-faq-answer-body">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AreaDetailClient;
