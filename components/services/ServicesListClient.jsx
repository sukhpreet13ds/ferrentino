"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import SplitText from "../SplitText";

const ServicesListClient = ({ data }) => {
  const router = useRouter();
  const items = data.items || [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="services-page">
      <section className="services-hero-section" style={{ backgroundImage: `url(${data.heroBg})` }}>
        <div className="services-hero-overlay"></div>

        <div className="services-hero-container">
          <div className="services-hero-content">
            <span className="services-hero-tag">
              <SplitText
                text={data.heroTag}
                className="services-tag-text"
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

            <h1 className="services-hero-title">
              <SplitText
                text={data.heroTitleLine1}
                className="services-title-line"
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
                className="services-title-line"
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

            <p className="services-hero-desc">{data.heroDescription}</p>
          </div>
        </div>
      </section>

      <section className="services-grid-section">
        <div className="services-grid-container">
          <div className="services-header-block reveal-zoom">
            <h2 className="services-main-title">{data.gridTitle}</h2>
            <p className="services-main-sub">{data.gridSubtitle}</p>
            <div className="services-title-divider"></div>
          </div>

          <div className="services-cards-grid">
            {items.map((service, index) => (
              <div
                key={service.id}
                className="service-item-card reveal-zoom"
                data-delay={(index % 3) * 150}
                onClick={() => router.push(`/services/${service.slug}`)}
                style={{ cursor: "pointer" }}
              >
                <div className="service-card-img-wrapper">
                  <img src={service.image} alt={service.title} className="service-card-img" />
                </div>

                <div className="service-card-body">
                  <h3 className="service-card-title">{service.title}</h3>
                  <p className="service-card-desc">{service.description}</p>
                  <div className="link-wrapper">
                    <Link href={`/services/${service.slug}`} className="service-card-link">
                      {service.linkText}
                    </Link>
                    <span className="arrow-symbol">—</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesListClient;
