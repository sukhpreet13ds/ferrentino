"use client";

import { useEffect } from "react";
import SplitText from "../SplitText";

const TeamClient = ({ data }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const members = data.members || [];

  return (
    <div className="meet-builders-page">
      {/* Hero Section */}
      <section className="builders-hero-section" style={{ backgroundImage: `url(${data.heroBg})` }}>
        <div className="builders-hero-overlay"></div>

        <div className="builders-hero-container">
          <div className="builders-hero-content">
            <span className="builders-hero-tag">
              <SplitText
                text={data.heroTag}
                className="builders-tag-text"
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

            <h1 className="builders-hero-title">
              <SplitText
                text={data.heroTitleLine1}
                className="builders-title-line"
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
                className="builders-title-line"
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

            <p className="builders-hero-desc">{data.heroDescription}</p>
          </div>
        </div>
      </section>

      {/* Main Alternating Builders Section */}
      <section className="builders-main-section">
        <div className="builders-main-container">
          {members.map((member, idx) => {
            const reversed = idx % 2 === 1;
            return (
              <div key={member.id} className={`builder-row ${reversed ? "builder-row-reversed" : ""}`}>
                {reversed ? (
                  <>
                    <div className="builder-img-col reveal-zoom">
                      <div className="builder-img-box">
                        <img src={member.image} alt={member.name} />
                      </div>
                    </div>

                    <div className="builder-content-col reveal-zoom" data-delay="150">
                      <span className="builder-role-tag">{member.roleTag}</span>
                      <h2 className="builder-name">{member.name}</h2>
                      <div className="builder-accent-line"></div>

                      {(member.bioParagraphs || []).map((p, pIdx) => (
                        <p key={pIdx} className="builder-bio">
                          {p}
                        </p>
                      ))}

                      {member.linkHref && (
                        <a
                          href={member.linkHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-read-article"
                        >
                          {member.linkText} <i className="fa-solid fa-arrow-up-right-from-square"></i>
                        </a>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="builder-content-col reveal-zoom">
                      <span className="builder-role-tag">{member.roleTag}</span>
                      <h2 className="builder-name">{member.name}</h2>
                      <div className="builder-accent-line"></div>

                      {(member.bioParagraphs || []).map((p, pIdx) => (
                        <p key={pIdx} className="builder-bio">
                          {p}
                        </p>
                      ))}

                      {member.linkHref && (
                        <a
                          href={member.linkHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-read-article"
                        >
                          {member.linkText} <i className="fa-solid fa-arrow-up-right-from-square"></i>
                        </a>
                      )}
                    </div>

                    <div className="builder-img-col reveal-zoom" data-delay="150">
                      <div className="builder-img-box">
                        <img src={member.image} alt={member.name} />
                      </div>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default TeamClient;
