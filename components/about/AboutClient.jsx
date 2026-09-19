"use client";

import { useEffect } from "react";
import Link from "next/link";
import SplitText from "../SplitText";
import ReadyCta from "../ReadyCta";

const AboutClient = ({ data }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const legacyParagraphs = data.legacyParagraphs || [];
  const barbaraParagraphs = data.barbaraParagraphs || [];
  const codeItems = data.codeItems || [];
  const coreCards = data.coreCards || [];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero-section" style={{ backgroundImage: `url(${data.heroBg})` }}>
        <div className="about-hero-overlay"></div>

        <div className="about-hero-container">
          <div className="about-hero-content">
            <span className="about-hero-tag">
              <SplitText
                text={data.heroTag}
                className="about-tag-text"
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

            <h1 className="about-hero-title">
              <SplitText
                text={data.heroTitleLine1}
                className="about-title-line"
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
                className="about-title-line"
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

            <p className="about-hero-desc">
              {data.heroDescBefore}
              <a style={{ color: "inherit" }} href={data.heroDescLinkHref} target="_blank" rel="noopener noreferrer">
                {data.heroDescLinkText}
              </a>
              {data.heroDescAfter}
            </p>
          </div>

          <div className="about-hero-image-wrapper">
            <img src={data.heroImage} alt="Ferrentino Family" className="about-hero-image" />
          </div>
        </div>
      </section>

      {/* Section 1: It's A Legacy */}
      <section className="about-legacy-section">
        <div className="about-legacy-container">
          <div className="legacy-left reveal-zoom">
            <span className="section-tag-light">{data.legacyTag}</span>
            <h2 className="legacy-title">{data.legacyTitle}</h2>
            <div className="legacy-title-underline"></div>
          </div>

          <div className="legacy-right reveal-zoom" data-delay="200">
            {legacyParagraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: Yellow Banner */}
      <section className="about-yellow-banner">
        <div className="banner-container">
          <h2 className="banner-text reveal-zoom">{data.bannerText}</h2>
          <Link href={data.bannerBtnHref} className="btn-banner-estimate reveal-zoom" data-delay="150">
            {data.bannerBtnText} <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </div>
      </section>

      {/* Section 3: Our Mission Statement */}
      <section className="about-mission-section">
        <div className="about-mission-container">
          <div className="mission-left reveal-zoom">
            <span className="section-tag-light">{data.missionTag}</span>
            <h2 className="mission-title">{data.missionTitle}</h2>
            <p className="mission-desc">{data.missionDesc}</p>
          </div>

          <div className="mission-right reveal-zoom" data-delay="200">
            <div className="mission-img-wrapper">
              <img src={data.missionImage} alt="Ferrentino craftsmen at work" />
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Founding Woman (Dark Section) */}
      <section className="about-barbara-section">
        <div className="about-barbara-container">
          <div className="barbara-left reveal-zoom">
            <span className="section-tag-gold">{data.barbaraTag}</span>
            <h2 className="barbara-title">{data.barbaraTitle}</h2>
            <div className="barbara-img-wrapper">
              <img src={data.barbaraImage} alt="Barbara Ferrentino" />
            </div>
          </div>

          <div className="barbara-right reveal-zoom" data-delay="200">
            {barbaraParagraphs.map((p, idx) => (
              <p key={idx} className="barbara-p">
                {p}
              </p>
            ))}

            <div className="barbara-quote-badge">
              <p>{data.barbaraQuoteBadge}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: The Code of Cicc */}
      <section className="about-code-section">
        <div className="about-code-container">
          <div className="code-left reveal-zoom">
            <span className="section-tag-light">{data.codeTag}</span>
            <h2 className="code-title">{data.codeTitle}</h2>
            <div className="edward-img-wrapper">
              <img src={data.codeImage} alt={data.codeImageAlt} />
            </div>
            <p className="edward-caption">{data.codeCaption}</p>
          </div>

          <div className="code-right reveal-zoom" data-delay="200">
            <div className="code-list">
              {codeItems.map((item) => (
                <div key={item.num} className="code-item">
                  <span className="code-num">{item.num}</span>
                  <p className="code-text">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Core Community Values (Yellow BG with core-bg.jpg) */}
      <section className="about-core-section" style={{ backgroundImage: `url(${data.coreBg})` }}>
        <div className="core-overlay"></div>

        <div className="about-core-container">
          <h2 className="core-main-title reveal-zoom">{data.coreTitle}</h2>

          <div className="core-cards-wrapper">
            {coreCards.map((card, idx) => (
              <div key={idx} className="core-card reveal-zoom" data-delay={(idx + 1) * 100}>
                <h3 className="core-card-title">{card.title}</h3>
                <p className="core-card-desc">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ReadyCta />
    </div>
  );
};

export default AboutClient;
