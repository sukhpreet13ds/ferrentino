import { getContent } from "../../../lib/data";

export default function PrivacyPage() {
  const data = getContent("privacy", {
    heroBg: "/images/service-bg.png",
    heroTag: "LEGAL INFORMATION",
    heroTitle: "Privacy Policy",
    effectiveDate: "",
    introParagraphs: [],
    sections: [],
    contactSection: null,
  });

  const sections = data.sections || [];
  const introParagraphs = data.introParagraphs || [];
  const contact = data.contactSection;

  return (
    <div className="legal-page">
      {/* Hero Section */}
      <section
        className="legal-hero-section"
        style={{ backgroundImage: `url(${data.heroBg})` }}
      >
        <div className="legal-hero-overlay"></div>

        <div className="legal-hero-container">
          <div className="legal-hero-content">
            <span className="legal-hero-tag">{data.heroTag}</span>

            <h1 className="legal-hero-title">
              <span className="legal-title-line">{data.heroTitle}</span>
            </h1>

            <p className="legal-hero-desc">{data.effectiveDate}</p>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="legal-main-section">
        <div className="legal-container">
          <div className="legal-card">
            <div className="legal-intro-box reveal-zoom">
              {introParagraphs.map((p, i) => (
                <p key={i} className={`legal-paragraph${i === 0 ? " lead" : ""}`}>
                  {p}
                </p>
              ))}
            </div>

            <div className="legal-divider"></div>

            {sections.map((section, i) => (
              <div className="legal-section-block reveal-zoom" key={i}>
                <h2 className="legal-section-title">
                  <span className="legal-section-num">{section.num}</span> {section.heading}
                </h2>

                {(section.body || []).map((p, j) => (
                  <p className="legal-paragraph" key={`body-${j}`}>
                    {p}
                  </p>
                ))}

                {section.items && section.items.length > 0 && (
                  <ul className="legal-list">
                    {section.items.map((item, k) => (
                      <li key={k}>{item}</li>
                    ))}
                  </ul>
                )}

                {(section.afterItems || []).map((p, j) => (
                  <p className="legal-paragraph" key={`after-${j}`}>
                    {p}
                  </p>
                ))}
              </div>
            ))}

            {contact && (
              <div className="legal-section-block reveal-zoom">
                <h2 className="legal-section-title">
                  <span className="legal-section-num">{contact.num}</span> {contact.heading}
                </h2>

                <p className="legal-paragraph">{contact.intro}</p>

                <div className="legal-contact-card">
                  <h3 className="legal-contact-name">{contact.name}</h3>
                  <p className="legal-contact-item">
                    <i className="fa-solid fa-envelope"></i>
                    <strong>Email:</strong>{" "}
                    <a href={`mailto:${contact.email}`}>{contact.email}</a>
                  </p>
                  <p className="legal-contact-item">
                    <i className="fa-solid fa-phone"></i>
                    <strong>Phone:</strong> <a href={`tel:${contact.phoneHref}`}>{contact.phone}</a>
                  </p>
                  {contact.website && (
                    <p className="legal-contact-item">
                      <i className="fa-solid fa-globe"></i>
                      <strong>Website:</strong>{" "}
                      <a href={contact.websiteHref} target="_blank" rel="noopener noreferrer">
                        {contact.website}
                      </a>
                    </p>
                  )}
                </div>

                {contact.footnote && (
                  <p className="legal-paragraph legal-footnote">{contact.footnote}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
