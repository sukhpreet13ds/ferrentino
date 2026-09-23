import Link from "next/link";

const ReadyCta = () => {
  return (
    <section className="ready-cta-section" style={{ backgroundImage: "url(/images/cta-bg.jpg)" }}>
      <div className="ready-cta-overlay"></div>
      <div className="ready-cta-container">
        <h2 className="ready-cta-title reveal-zoom">Ready to Build Your Dream?</h2>
        <p className="ready-cta-desc reveal-zoom" data-delay="150">
          Contact us today for a completely free consultation, detailed project plan, and transparent estimate.
        </p>
        <div className="ready-cta-buttons reveal-zoom" data-delay="300">
          <Link href="/estimator" className="btn-ready-estimate">
            GET AN INSTANT ESTIMATE
          </Link>
          <a href="tel:3522373365" className="btn-ready-call">
            <i className="fa-solid fa-phone"></i> CALL (352) 237-3365
          </a>
        </div>
      </div>
    </section>
  );
};

export default ReadyCta;
