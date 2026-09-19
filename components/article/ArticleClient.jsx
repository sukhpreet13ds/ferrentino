"use client";

import { useEffect } from "react";
import Link from "next/link";
import SplitText from "../SplitText";

const ArticleClient = ({ data }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const marketMetrics = data.marketMetrics || [];
  const pathwayBlocks = data.pathwayBlocks || [];
  const certifications = data.certifications || [];

  return (
    <div className="article-page contact-page">
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

      <section className="art-content-section">
        <div className="art-container">
          <div className="art-header-block reveal-zoom">
            <div className="art-top-tag-line">
              <span className="art-tag">{data.articleTag}</span>
              <span className="art-pub-date">{data.pubDate}</span>
            </div>

            <h1 className="art-main-title">{data.title}</h1>

            <div className="art-author-row">
              <div className="art-author-avatar">
                <img
                  src={data.authorAvatar}
                  alt={data.authorAlt}
                  style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }}
                />
              </div>
              <span className="art-author-name">{data.authorName}</span>
            </div>
          </div>

          <div className="art-banner-box reveal-zoom">
            <img src={data.bannerImage} alt={data.bannerAlt} />
          </div>

          <div className="art-metrics-block reveal-zoom">
            <h2 className="art-section-heading">{data.metricsHeading}</h2>
            <div className="art-metrics-grid">
              {marketMetrics.map((met, idx) => (
                <div key={idx} className="art-metric-card">
                  <span className="art-metric-label">{met.label}</span>
                  <h3 className="art-metric-val">{met.value}</h3>
                  <span className="art-metric-sub">{met.sub}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="art-main-grid">
            <div className="art-left-column reveal-zoom">
              <h2 className="art-pathway-title">{data.pathwayTitle}</h2>
              <p className="art-pathway-desc">{data.pathwayDesc}</p>

              {pathwayBlocks.map((block, idx) => (
                <div key={idx} className="art-pathway-block">
                  <span className="art-step-badge">{block.badge}</span>
                  <h3 className="art-block-heading">{block.heading}</h3>
                  <div className="art-roles-list">
                    {(block.roles || []).map((item, rIdx) => (
                      <div key={rIdx} className="art-role-row">
                        <span className="art-role-name">{item.role}</span>
                        <span className="art-pay-pill">{item.pay}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="art-sidebar-column reveal-zoom" data-delay="150">
              <div className="art-sidebar-card art-dark-card">
                <h3 className="art-sidebar-title text-white">{data.sidebarDarkTitle}</h3>
                <p className="art-sidebar-p">{data.sidebarDarkText}</p>
                <Link href={data.sidebarDarkLinkHref} className="art-gold-btn">
                  {data.sidebarDarkLinkText} <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>

              <div className="art-sidebar-card">
                <h3 className="art-sidebar-title">{data.certsTitle}</h3>
                <div className="art-certs-wrap">
                  {certifications.map((cert, idx) => (
                    <span key={idx} className="art-cert-badge">{cert}</span>
                  ))}
                </div>
              </div>

              <div className="art-sidebar-card">
                <span className="art-next-tag">{data.nextArticleTag}</span>
                <h4 className="art-next-title">{data.nextArticleTitle}</h4>
                <Link href={data.nextArticleLinkHref} className="art-next-link">
                  {data.nextArticleLinkText} <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ArticleClient;
