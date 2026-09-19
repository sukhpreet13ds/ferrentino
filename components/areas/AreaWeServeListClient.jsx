"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import SplitText from "../SplitText";
import ReadyCta from "../ReadyCta";

const AreaWeServeListClient = ({ data }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const items = data.items || [];
  const mapPins = data.mapPins || [];
  const regionalFeatures = data.regionalFeatures || [];

  const [isLocalityVisible, setIsLocalityVisible] = useState(false);
  const localityRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsLocalityVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (localityRef.current) {
      observer.observe(localityRef.current);
    }

    return () => {
      if (localityRef.current) {
        observer.unobserve(localityRef.current);
      }
    };
  }, []);

  return (
    <div className="area-we-serve-page contact-page">
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
                text={data.heroTitle}
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

      <section className={`locality-section ${isLocalityVisible ? "animate-in" : ""}`} ref={localityRef}>
        <div className="locality-bg-map-wrapper">
          <div className="locality-map-box">
            <img src={data.mapImage} alt="Central Florida Map" className="locality-map-img" />
            {mapPins.map((pin) => (
              <div
                key={pin.id}
                className="locality-pin-wrapper"
                style={{
                  top: pin.top,
                  left: pin.left,
                  width: pin.size,
                  height: pin.size,
                  animationDelay: pin.delay,
                }}
                title={pin.name}
              >
                <img src={data.mapPinIcon} alt={pin.name} className="locality-pin-img" />
                <span className="pin-pulse"></span>
              </div>
            ))}
          </div>
        </div>

        <div className="locality-container">
          <div className="locality-content">
            <span className="locality-tag reveal-zoom">{data.localityTag}</span>
            <h2 className="locality-title reveal-zoom" data-delay="150">
              {data.localityTitle}
            </h2>
            <p className="locality-desc reveal-zoom" data-delay="300">
              {data.localityDescription}
            </p>

            <div className="locality-active-label reveal-zoom" data-delay="400">
              {data.localityActiveLabel}
            </div>

            <div className="locality-pills-container reveal-zoom" data-delay="450">
              {items.map((item) => (
                <span
                  key={item.slug}
                  className={`locality-pill ${item.isHq ? "locality-pill-hq" : ""}`}
                >
                  {item.name.replace(" County", "")}
                  {item.isHq ? " (Home Base)" : ""}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="aws-counties-section">
        <div className="aws-counties-container">
          <div className="aws-header-text reveal-zoom">
            <h2 className="aws-main-title">{data.countiesSectionTitle}</h2>
            <p className="aws-sub-desc">{data.countiesSectionDesc}</p>
          </div>

          <div className="aws-cards-grid">
            {items.map((area, idx) => (
              <Link
                key={area.slug}
                href={`/area-we-serve/${area.slug}`}
                className="aws-card reveal-zoom"
                data-delay={(idx % 4) * 100}
                style={{ textDecoration: "none" }}
              >
                <div className="aws-card-img-box">
                  <img src={area.image} alt={area.name} />
                </div>

                <div className="aws-card-body">
                  <h3 className="aws-card-county">{area.name}</h3>
                  <span className="aws-card-hub">{area.hub}</span>
                  <p className="aws-card-desc">{area.description}</p>
                  <div className="aws-card-footer">
                    <span className="aws-inquire-link">
                      INQUIRE IN COUNTY <i className="fa-solid fa-arrow-right"></i>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="aws-authority-section">
        <div className="aws-authority-container">
          <div className="aws-authority-header reveal-zoom">
            <h2 className="aws-auth-title">{data.authorityTitle}</h2>
            <p className="aws-auth-desc">{data.authorityDesc}</p>
          </div>

          <div className="aws-auth-grid">
            {regionalFeatures.map((feat, idx) => (
              <div key={idx} className="aws-auth-card reveal-zoom" data-delay={idx * 150}>
                <div className="aws-auth-icon-badge">
                  <i className={feat.icon}></i>
                </div>
                <h3 className="aws-auth-card-title">{feat.title}</h3>
                <p className="aws-auth-card-desc">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ReadyCta />
    </div>
  );
};

export default AreaWeServeListClient;
