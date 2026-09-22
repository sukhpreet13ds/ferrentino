import Link from "next/link";
import { getContent } from "../../../lib/data";

export default async function ThankYouPage() {
  const data = await getContent("thank-you", {
    heroBg: "/images/service-bg.png",
    subtag: "MESSAGE RECEIVED",
    title: "Thank You!",
    description: "",
    primaryButtonText: "Return To Home",
    primaryButtonHref: "/",
    secondaryButtonText: "View Our Projects",
    secondaryButtonHref: "/projects",
  });

  return (
    <div className="thankyou-page">
      {/* Hero Section */}
      <section
        className="thankyou-hero-section"
        style={{ backgroundImage: `url(${data.heroBg})` }}
      >
        <div className="thankyou-hero-overlay"></div>

        <div className="thankyou-hero-container">
          <div className="thankyou-card">
            {/* Animated SVG Tick Mark */}
            <div className="thankyou-icon-wrapper">
              <svg
                className="thankyou-checkmark-svg"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 52 52"
              >
                <circle
                  className="thankyou-checkmark-circle"
                  cx="26"
                  cy="26"
                  r="25"
                  fill="none"
                />
                <path
                  className="thankyou-checkmark-check"
                  fill="none"
                  d="M14.1 27.2l7.1 7.2 16.7-16.8"
                />
              </svg>
            </div>

            <span className="thankyou-subtag">{data.subtag}</span>

            <h1 className="thankyou-title">
              <span className="thankyou-title-text">{data.title}</span>
            </h1>

            <p className="thankyou-desc">{data.description}</p>

            <div className="thankyou-btn-group">
              <Link href={data.primaryButtonHref} className="btn-thankyou-primary">
                <i className="fa-solid fa-house"></i> {data.primaryButtonText}
              </Link>
              <Link href={data.secondaryButtonHref} className="btn-thankyou-secondary">
                {data.secondaryButtonText} <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
