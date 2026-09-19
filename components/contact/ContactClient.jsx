"use client";

import { useState, useEffect } from "react";
import SplitText from "../SplitText";

const ContactClient = ({ data }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const availableServices = data.availableServices || [];
  const details = data.details || [];
  const officeHours = data.officeHours || [];
  const counties = data.counties || [];
  const features = data.features || [];

  const [selectedServices, setSelectedServices] = useState([""]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const toggleService = (service) => {
    if (selectedServices.includes(service)) {
      setSelectedServices(selectedServices.filter((s) => s !== service));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const countyCols = [counties.slice(0, 4), counties.slice(4, 8)];

  return (
    <div className="contact-page">
      {/* Hero Section */}
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

      {/* Main Contact Information & Form Section */}
      <section className="contact-main-section">
        <div className="contact-main-container">
          {/* Left Column: Contact Information */}
          <div className="contact-info-col">
            <h2 className="contact-info-title">{data.infoTitle}</h2>
            <p className="contact-info-sub">{data.infoSubtitle}</p>

            <div className="contact-details-list">
              {details.map((detail, index) => (
                <div className="contact-detail-item" key={index}>
                  <div className="contact-icon-circle">
                    <i className={detail.icon}></i>
                  </div>
                  <div className="contact-detail-text">
                    <span className="detail-label">{detail.label}</span>
                    {detail.link ? (
                      <a href={detail.link} className="detail-value-link">
                        {detail.value}
                      </a>
                    ) : (
                      <span className="detail-value">{detail.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Office Hours Box */}
            <div className="office-hours-card">
              <h3 className="office-hours-title">{data.officeHoursTitle}</h3>
              {officeHours.map((hour, index) => (
                <div className="hours-row" key={index}>
                  <span className="day-label">{hour.day}</span>
                  <span className={`time-value ${hour.closed ? "status-closed" : ""}`}>{hour.time}</span>
                </div>
              ))}
            </div>

            {/* Locality Block */}
            <div className="contact-locality-block">
              <span className="locality-pill">{data.localityPill}</span>
              <h3 className="contact-locality-title">{data.localityTitle}</h3>
              <p className="contact-locality-desc">{data.localityDescription}</p>
              <div className="locality-counties-grid v2">
                {countyCols.map((col, idx) => (
                  <ul key={idx}>
                    {col.map((county) => (
                      <li key={county}>
                        <span className="yellow-dot">•</span> {county}
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Form Card */}
          <div className="contact-form-col">
            <div className="contact-form-card">
              <h2 className="form-card-title">{data.formTitle}</h2>
              <p className="form-card-sub">{data.formSubtitle}</p>

              {isSubmitted && (
                <div className="form-success-alert">
                  <i className="fa-solid fa-circle-check"></i> {data.successMessage}
                </div>
              )}

              <form className="inquiry-form" onSubmit={handleSubmit}>
                <div className="form-row-two">
                  <div className="form-group">
                    <label>{data.nameLabel}</label>
                    <input type="text" placeholder={data.namePlaceholder} required />
                  </div>
                  <div className="form-group">
                    <label>{data.phoneLabel}</label>
                    <input type="tel" placeholder={data.phonePlaceholder} required />
                  </div>
                </div>

                <div className="form-row-two">
                  <div className="form-group">
                    <label>{data.emailLabel}</label>
                    <input type="email" placeholder={data.emailPlaceholder} required />
                  </div>
                  <div className="form-group">
                    <label>{data.locationLabel}</label>
                    <input type="text" placeholder={data.locationPlaceholder} required />
                  </div>
                </div>

                <div className="form-group">
                  <label>{data.servicesLabel}</label>
                  <div className="services-pills-container">
                    {availableServices.map((service) => {
                      const isSelected = selectedServices.includes(service);
                      return (
                        <button
                          key={service}
                          type="button"
                          className={`service-pill-btn ${isSelected ? "active" : ""}`}
                          onClick={() => toggleService(service)}
                        >
                          {isSelected && <i className="fa-solid fa-check check-icon"></i>}
                          {service}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="form-group">
                  <label>{data.budgetLabel}</label>
                  <input type="text" placeholder={data.budgetPlaceholder} />
                </div>

                <div className="form-group">
                  <label>{data.detailsLabel}</label>
                  <textarea rows="4" placeholder={data.detailsPlaceholder}></textarea>
                </div>

                <button type="submit" className="btn-submit-inquiry">
                  <span>{data.submitButtonText}</span>
                  <i className="fa-solid fa-arrow-right"></i>
                </button>

                <p className="privacy-note">{data.privacyNote}</p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Google Map Section */}
      <section className="contact-map-section">
        <iframe
          title={data.mapTitle}
          src={data.mapSrc}
          width="100%"
          height="500"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>

      {/* Bottom 3-Features Strip */}
      <section className="contact-features-strip">
        <div className="features-strip-container">
          {features.map((feature, index) => (
            <div className="feature-strip-item" key={index}>
              <div className="feature-icon-badge">
                <i className={feature.icon}></i>
              </div>
              <div className="feature-text">
                <h4 className="feature-title">{feature.title}</h4>
                <p className="feature-sub">{feature.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ContactClient;
