"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import SplitText from "../SplitText";

const AskToExpertClient = ({ data }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const articles = data.articles || [];

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    question: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setFormData({ firstName: "", lastName: "", email: "", phone: "", question: "" });
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <div className="ask-to-expert-page contact-page">
      {/* Hero Section (Same style as Contact.jsx) */}
      <section className="contact-hero-section" style={{ backgroundImage: `url(${data.heroBg})` }}>
        <div className="contact-hero-overlay"></div>

        <div className="contact-hero-container">
          <div className="contact-hero-content">
            <span className="contact-hero-tag">
              <SplitText
                text={data.heroTag}
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
                text={data.heroTitleLine1}
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
                text={data.heroTitleLine2}
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

            <p className="contact-hero-desc">{data.heroDescription}</p>
          </div>
        </div>
      </section>

      {/* Main Articles Section */}
      <section className="ate-articles-section">
        <div className="ate-articles-container">
          <div className="ate-header-text reveal-zoom">
            <span className="ate-subtag">{data.articlesSubtag}</span>
            <h2 className="ate-main-title">{data.articlesTitle}</h2>
          </div>

          <div className="ate-cards-grid">
            {articles.map((item, index) => (
              <Link
                key={item.id}
                href={data.readMoreLink || "/articles"}
                className="ate-card reveal-zoom"
                data-delay={(index % 3) * 120}
                style={{ textDecoration: "none" }}
              >
                <div className="ate-card-top-meta">
                  <span className="ate-author">{item.author}</span>
                  <span className="ate-date">{item.date}</span>
                </div>

                <div className="ate-card-img-box">
                  <img src={item.image} alt={item.title} />
                </div>

                <div className="ate-card-body">
                  <h3 className="ate-card-title">{item.title}</h3>

                  {item.stats && item.stats.length > 0 ? (
                    <div className="ate-card-stats-list">
                      {item.stats.map((st, i) => (
                        <p key={i} className="ate-stat-row">
                          <span className="ate-stat-label">{st.label}:</span>{" "}
                          <span className="ate-stat-val">{st.value}</span>
                        </p>
                      ))}
                    </div>
                  ) : (
                    <p className="ate-card-desc">{item.description}</p>
                  )}

                  <div className="ate-card-footer">
                    <span className="ate-read-more">
                      {data.readMoreText || "READ MORE"} <i className="fa-solid fa-arrow-right"></i>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Questions Yellow Banner & Submit Form Section */}
      <section className="ate-questions-section">
        <div className="ate-questions-container">
          <div className="ate-questions-grid">
            {/* Left Info Column */}
            <div className="ate-questions-left reveal-zoom">
              <h2 className="ate-q-title">{data.questionsTitle}</h2>
              <p className="ate-q-desc">{data.questionsDescription}</p>
            </div>

            {/* Right Form Card */}
            <div className="ate-questions-right reveal-zoom" data-delay="150">
              <div className="ate-form-card">
                <h3 className="ate-form-title">{data.formTitle}</h3>

                {isSubmitted && <div className="ate-success-msg">{data.successMessage}</div>}

                <form onSubmit={handleSubmit} className="ate-form">
                  <div className="ate-form-row">
                    <div className="ate-form-group">
                      <label>{data.firstNameLabel}</label>
                      <input
                        type="text"
                        name="firstName"
                        placeholder={data.firstNamePlaceholder}
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="ate-form-group">
                      <label>{data.lastNameLabel}</label>
                      <input
                        type="text"
                        name="lastName"
                        placeholder={data.lastNamePlaceholder}
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="ate-form-row">
                    <div className="ate-form-group">
                      <label>{data.emailLabel}</label>
                      <input
                        type="email"
                        name="email"
                        placeholder={data.emailPlaceholder}
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="ate-form-group">
                      <label>{data.phoneLabel}</label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder={data.phonePlaceholder}
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="ate-form-group full-width">
                    <label>{data.questionLabel}</label>
                    <textarea
                      name="question"
                      rows="4"
                      placeholder={data.questionPlaceholder}
                      value={formData.question}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>

                  <button type="submit" className="ate-btn-submit">
                    {data.submitButtonText} <i className="fa-solid fa-arrow-right"></i>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AskToExpertClient;
