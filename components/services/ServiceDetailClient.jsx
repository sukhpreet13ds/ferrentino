"use client";

import { useState, useEffect } from "react";
import SplitText from "../SplitText";

const ServiceDetailClient = ({ service, process, testimonial }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [openFaq, setOpenFaq] = useState(0);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? -1 : index);
  };

  const faqs = service.faqs || [];
  const checklist = service.introChecklist || [];
  const paragraphs = service.introParagraphs || [];

  return (
    <div className="service-view-page">
      <section className="service-view-hero-section" style={{ backgroundImage: `url(${service.detailHeroBg})` }}>
        <div className="service-view-hero-overlay"></div>

        <div className="service-view-hero-container">
          <div className="service-view-hero-content">
            <span className="service-view-hero-tag">
              <SplitText
                text={service.detailHeroTag}
                className="service-view-tag-text"
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

            <h1 className="service-view-hero-title">
              <SplitText
                text={service.detailHeroTitleLine1}
                className="service-view-title-line"
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
                text={service.detailHeroTitleLine2}
                className="service-view-title-line"
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

            <p className="service-view-hero-desc">{service.detailHeroDesc}</p>
          </div>
        </div>
      </section>

      <section className="kitchen-intro-section">
        <div className="kitchen-intro-container">
          <div className="kitchen-intro-left reveal-zoom">
            <h2 className="kitchen-intro-title">{service.introTitle}</h2>
            {paragraphs.map((p, idx) => (
              <p className="kitchen-intro-p" key={idx}>{p}</p>
            ))}

            <ul className="kitchen-check-list">
              {checklist.map((item, idx) => (
                <li key={idx}>
                  <span className="check-icon-gold">✓</span> {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="kitchen-intro-right reveal-zoom" data-delay="150">
            <div className="kitchen-intro-img-box">
              <img src={service.introImage} alt={service.introTitle} />
            </div>
          </div>
        </div>
      </section>

      <section className="kitchen-process-section">
        <div className="kitchen-process-container">
          <div className="process-header reveal-zoom">
            <h2 className="process-title">Our Structural Design &amp; Build Process</h2>
            <p className="process-sub">How we guide you from drafts to completion with absolute precision.</p>
            <div className="process-divider"></div>
          </div>

          <div className="process-steps-grid">
            {(process || []).map((step, index) => (
              <div key={step.num} className="process-card reveal-zoom" data-delay={(index % 4) * 120}>
                <div className="process-card-top">
                  <span className="process-number">{step.num}</span>
                  <div className="process-card-line"></div>
                </div>
                <h3 className="process-card-title">{step.title}</h3>
                <p className="process-card-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {testimonial && (
        <section className="service-testimonial-section">
          <div className="service-testimonial-container reveal-zoom">
            <div className="testimonial-stars-badge">
              <div className="stars-row">★★★★★</div>
              <span className="testimonial-badge-label">CLIENT TESTIMONIAL</span>
            </div>

            <div className="testimonial-quote-mark">“</div>

            <p className="testimonial-quote-body">{testimonial.quote}</p>

            <div className="testimonial-author-line">
              <span className="author-name">— {testimonial.author}</span>
              <span className="author-role">{testimonial.role}</span>
            </div>
          </div>
        </section>
      )}

      <section className="kitchen-faq-section">
        <div className="kitchen-faq-container">
          <div className="faq-header reveal-zoom">
            <h2 className="faq-title">{service.title} FAQs</h2>
            <p className="faq-sub">Clear answers to help you plan your project.</p>
          </div>

          <div className="faq-accordion-list reveal-zoom">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} className={`faq-item ${isOpen ? "active" : ""}`} onClick={() => toggleFaq(index)}>
                  <div className="faq-question-row">
                    <h3 className="faq-question-title">{faq.question}</h3>
                    <span className="faq-toggle-icon">{isOpen ? "−" : "+"}</span>
                  </div>
                  {isOpen && (
                    <div className="faq-answer-body">
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

export default ServiceDetailClient;
