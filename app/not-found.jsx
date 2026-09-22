import Link from "next/link";
import { getContent } from "../lib/data";

export const dynamic = "force-dynamic";

export default async function NotFound() {
  const data = await getContent("not-found", {
    heroBg: "/images/service-bg.png",
    subtag: "ERROR 404",
    title: "Page Not Found",
    description: "The page you are looking for doesn't exist, has been removed, or is temporarily unavailable.",
    buttonText: "Back to Home",
    buttonHref: "/",
  });

  return (
    <div className="error-page-wrapper">
      <section
        className="error-hero-section"
        style={{ backgroundImage: `url(${data.heroBg})` }}
      >
        <div className="error-hero-overlay"></div>

        <div className="error-hero-container">
          <div className="error-card">
            <span className="error-subtag">{data.subtag}</span>

            <h1 className="error-title">
              <span className="error-title-text">{data.title}</span>
            </h1>

            <p className="error-desc">{data.description}</p>

            <div className="error-btn-group">
              <Link href={data.buttonHref} className="btn-error-primary">
                <i className="fa-solid fa-house"></i> {data.buttonText}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
