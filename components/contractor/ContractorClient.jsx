"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SplitText from "../SplitText";

const ContractorClient = ({ data }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const router = useRouter();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formEl = e.currentTarget;
    const fd = new FormData(formEl);

    const payload = {
      type: "contractor",
      companyName: fd.get("companyName") || "",
      yearsInBusiness: fd.get("yearsInBusiness") || "",
      country: fd.get("country") || "USA",
      addressLine1: fd.get("addressLine1") || "",
      addressLine2: fd.get("addressLine2") || "",
      city: fd.get("city") || "",
      state: fd.get("state") || "",
      zip: fd.get("zip") || "",
      firstName: fd.get("firstName") || "",
      lastName: fd.get("lastName") || "",
      contactEmail: fd.get("contactEmail") || "",
      contactPhone: fd.get("contactPhone") || "",
    };

    try {
      await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setIsSubmitted(true);
      formEl.reset();
      router.push("/thank-you");
    } catch (err) {
      console.error(err);
      setIsSubmitted(true);
      router.push("/thank-you");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contractor-page">
      {/* Hero Section */}
      <section className="contractor-hero-section" style={{ backgroundImage: `url(${data.heroBg})` }}>
        <div className="contractor-hero-overlay"></div>

        <div className="contractor-hero-container">
          <div className="contractor-hero-content">
            <span className="contractor-hero-tag">
              <SplitText
                text={data.heroTag}
                className="contractor-tag-text"
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

            <h1 className="contractor-hero-title">
              <SplitText
                text={data.heroTitleLine1}
                className="contractor-title-line"
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
                className="contractor-title-line"
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

            <p className="contractor-hero-desc">{data.heroDescription}</p>
          </div>
        </div>
      </section>

      {/* Main Application Form Section */}
      <section className="contractor-main-section">
        <div className="contractor-main-container">
          <div className="contractor-form-card">
            <h2 className="contractor-form-title">{data.formTitle}</h2>
            <p className="contractor-form-sub">{data.formSubtitle}</p>

            {isSubmitted && (
              <div className="form-success-alert">
                <i className="fa-solid fa-circle-check"></i> {data.successMessage}
              </div>
            )}

            <form className="contractor-app-form" onSubmit={handleSubmit}>
              {/* Section 1: Company Info */}
              <div className="contractor-form-block">
                <h3 className="form-block-heading">{data.companyInfoHeading}</h3>
                <div className="block-divider"></div>

                <div className="form-group">
                  <label>{data.companyNameLabel}</label>
                  <input type="text" name="companyName" placeholder={data.companyNamePlaceholder} required />
                </div>

                <div className="form-group">
                  <label>{data.yearsInBusinessLabel}</label>
                  <input type="text" name="yearsInBusiness" placeholder={data.yearsInBusinessPlaceholder} required />
                </div>
              </div>

              {/* Section 2: Company Address */}
              <div className="contractor-form-block">
                <h3 className="form-block-heading">{data.companyAddressHeading}</h3>
                <div className="block-divider"></div>

                <div className="form-group">
                  <label>{data.countryLabel}</label>
                  <input type="text" name="country" defaultValue={data.countryDefaultValue} />
                </div>

                <div className="form-group">
                  <label>{data.addressLine1Label}</label>
                  <input type="text" name="addressLine1" placeholder={data.addressLine1Placeholder} required />
                </div>

                <div className="form-group">
                  <label>{data.addressLine2Label}</label>
                  <input type="text" name="addressLine2" placeholder={data.addressLine2Placeholder} />
                </div>

                <div className="form-row-three">
                  <div className="form-group">
                    <label>{data.cityLabel}</label>
                    <input type="text" name="city" placeholder={data.cityPlaceholder} required />
                  </div>
                  <div className="form-group">
                    <label>{data.stateLabel}</label>
                    <input type="text" name="state" placeholder={data.statePlaceholder} required />
                  </div>
                  <div className="form-group">
                    <label>{data.zipLabel}</label>
                    <input type="text" name="zip" placeholder={data.zipPlaceholder} required />
                  </div>
                </div>
              </div>

              {/* Section 3: Primary Contact */}
              <div className="contractor-form-block">
                <h3 className="form-block-heading">{data.primaryContactHeading}</h3>
                <div className="block-divider"></div>

                <div className="form-row-two">
                  <div className="form-group">
                    <label>{data.firstNameLabel}</label>
                    <input type="text" name="firstName" placeholder={data.firstNamePlaceholder} required />
                  </div>
                  <div className="form-group">
                    <label>{data.lastNameLabel}</label>
                    <input type="text" name="lastName" placeholder={data.lastNamePlaceholder} required />
                  </div>
                </div>

                <div className="form-group">
                  <label>{data.contactEmailLabel}</label>
                  <input type="email" name="contactEmail" placeholder={data.contactEmailPlaceholder} required />
                </div>

                <div className="form-group">
                  <label>{data.contactPhoneLabel}</label>
                  <input type="tel" name="contactPhone" placeholder={data.contactPhonePlaceholder} required />
                </div>
              </div>

              <button type="submit" className="btn-send-application" disabled={isSubmitting}>
                {isSubmitting ? "Sending Application..." : data.submitButtonText}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContractorClient;
