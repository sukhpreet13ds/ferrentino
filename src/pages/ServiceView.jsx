import { useState, useEffect } from 'react';
import './style/style.css';
import kitchenBg from '../assets/kitchen-bg.jpg';
import makingRightImg from '../assets/making-right.jpg';
import feature1Img from '../assets/feature-1.jpg';
import feature2Img from '../assets/feature-2.jpg';
import SplitText from '../components/SplitText';

const ServiceView = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Accordion active state for FAQs
    const [openFaq, setOpenFaq] = useState(0);

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? -1 : index);
    };

    const processSteps = [
        {
            num: '01',
            title: 'In-Home Consult',
            desc: 'We analyze your existing layout, listen closely to your space frustrations, clarify your aesthetic goals, and define initial parameters.'
        },
        {
            num: '02',
            title: 'Design & Selection',
            desc: 'Our design team creates visual space renderings, helping you coordinate cabinetry styles, countertop slabs, hardware, and premium finishes.'
        },
        {
            num: '03',
            title: 'Precision Build',
            desc: 'With continuous partner supervision, our specialized master craftsmen manage framing, plumbing, high-grade carpentry, and surface installations.'
        },
        {
            num: '04',
            title: 'Walkthrough & Delivery',
            desc: 'We meticulously review every single detail with you, validating smooth drawer runners, flawless tile joints, and general space excellence.'
        }
    ];

    const whyUsFeatures = [
        {
            icon: 'fa-solid fa-location-dot',
            title: 'Three Generations of Legacy',
            desc: 'Our family name stands on decades of honest construction experience, reliable business practices, and hard-earned expertise.'
        },
        {
            icon: 'fa-solid fa-key',
            title: 'Cabinet Shop',
            desc: "We do not rely on standard pre-fab flatpacks. Every cabinet is constructed specifically to your home's exact dimension profile."
        },
        {
            icon: 'fa-solid fa-hashtag',
            title: 'True Turnkey Ownership',
            desc: 'No subcontractor scheduling confusion. We handle everything from permits and wiring maps to the final coat of protective paint.'
        }
    ];

    const faqs = [
        {
            question: 'How long does a typical kitchen remodeling project take?',
            answer: 'A comprehensive kitchen remodel generally takes between 4 to 8 weeks depending on structural layout changes, plumbing rerouting, and custom-cabinet requirements.'
        },
        {
            question: 'Can I remain in my home during the kitchen remodel?',
            answer: 'Yes, though the kitchen workspace will be fully isolated to minimize dust. We set up temporary cooking solutions and construct safety dust walls to preserve your daily home comfort.'
        },
        {
            question: 'Do you build the cabinetry in-house?',
            answer: 'Yes. Our team fabricates bespoke hardwood cabinets specifically engineered to your kitchen layout parameters at our local cabinet shop, guaranteeing a perfect fit.'
        },
        {
            question: 'Do you assist in choosing high-end appliances?',
            answer: 'Absolutely. We help coordinate dimensions, custom panel requirements for integrated styles, and electrical configurations with top premium appliance suppliers.'
        }
    ];

    return (
        <div className="service-view-page">
            {/* Hero Section */}
            <section
                className="service-view-hero-section"
                style={{ backgroundImage: `url(${kitchenBg})` }}
            >
                <div className="service-view-hero-overlay"></div>

                <div className="service-view-hero-container">
                    <div className="service-view-hero-content">
                        <span className="service-view-hero-tag">
                            <SplitText
                                text="PREMIER KITCHEN REMODELING"
                                className="service-view-tag-text"
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

                        <h1 className="service-view-hero-title">
                            <SplitText
                                text="Kitchen Remodeling "
                                className="service-view-title-line"
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
                                text="in Ocala, Florida"
                                className="service-view-title-line"
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

                        <p className="service-view-hero-desc">
                            Transform the heart of your home into a culinary sanctuary. Tailored architectural layouts, custom cabinetry fabrication, and high-end finishes.
                        </p>
                    </div>
                </div>
            </section>

            {/* Section 1: Making the Most of Your Kitchen */}
            <section className="kitchen-intro-section">
                <div className="kitchen-intro-container">
                    <div className="kitchen-intro-left reveal-zoom">
                        <h2 className="kitchen-intro-title">Making the Most of Your Kitchen</h2>
                        <p className="kitchen-intro-p">
                            A successful kitchen remodel balances elegant aesthetic presentation with deep functional utility. At Ferrentino &amp; Son, we believe your kitchen should be tailored to your culinary habits, hosting preferences, and storage needs.
                        </p>
                        <p className="kitchen-intro-p">
                            Our team takes complete ownership of your project, from initial structural layout drafts and electrical mapping to bespoke cabinetry fabrication, high-tier appliance integration, and stone countertop installation.
                        </p>

                        <ul className="kitchen-check-list">
                            <li>
                                <span className="check-icon-gold">✓</span> Custom-designed premium hardwood cabinetry
                            </li>
                            <li>
                                <span className="check-icon-gold">✓</span> Luxurious natural stone and quartz countertop slabs
                            </li>
                            <li>
                                <span className="check-icon-gold">✓</span> Professional-grade culinary appliance configurations
                            </li>
                            <li>
                                <span className="check-icon-gold">✓</span> Integrated ambient and task-focused layered lighting designs
                            </li>
                        </ul>
                    </div>

                    <div className="kitchen-intro-right reveal-zoom" data-delay="150">
                        <div className="kitchen-intro-img-box">
                            <img src={makingRightImg} alt="Making the Most of Your Kitchen" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 2: Our Structural Design & Build Process */}
            <section className="kitchen-process-section">
                <div className="kitchen-process-container">
                    <div className="process-header reveal-zoom">
                        <h2 className="process-title">Our Structural Design &amp; Build Process</h2>
                        <p className="process-sub">
                            How we guide you from drafts to completion with absolute precision.
                        </p>
                        <div className="process-divider"></div>
                    </div>

                    <div className="process-steps-grid">
                        {processSteps.map((step, index) => (
                            <div key={step.num} className="process-card reveal-zoom" data-delay={(index % 4) * 120}>
                                <div className="process-card-top">
                                    <span className="process-number">{step.num}</span>
                                    <div className="process-card-line"></div>
                                </div>
                                <h3 className="process-card-title">{step.title}</h3>
                                <p className="process-card-desc">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section 3: Featured Kitchen Remodels */}
            <section className="kitchen-featured-section">
                <div className="kitchen-featured-container">
                    <div className="featured-header reveal-zoom">
                        <h2 className="featured-title">Featured Kitchen Remodels</h2>
                        <p className="featured-sub">
                            Walk through a couple of our latest culinary transformations.
                        </p>
                    </div>

                    <div className="featured-cards-grid">
                        <div className="featured-card reveal-zoom">
                            <div className="featured-img-wrapper">
                                <img src={feature1Img} alt="The Ocala Modern Manor" />
                            </div>
                            <div className="featured-card-body">
                                <span className="featured-tag">MARION COUNTY, FL</span>
                                <h3 className="featured-card-title">The Ocala Modern Manor</h3>
                                <p className="featured-card-desc">
                                    Featuring hand-selected materials, full custom architectural integrations, and custom spatial optimizations. Built to last generations.
                                </p>
                            </div>
                        </div>

                        <div className="featured-card reveal-zoom" data-delay="150">
                            <div className="featured-img-wrapper">
                                <img src={feature2Img} alt="Southern Heritage Estate" />
                            </div>
                            <div className="featured-card-body">
                                <span className="featured-tag">GAINESVILLE, FL</span>
                                <h3 className="featured-card-title">Southern Heritage Estate</h3>
                                <p className="featured-card-desc">
                                    Featuring hand-selected materials, full custom architectural integrations, and custom spatial optimizations. Built to last generations.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 4: Why Choose Ferrentino & Son */}
            <section className="kitchen-why-section">
                <div className="kitchen-why-container">
                    <div className="why-header reveal-zoom">
                        <h2 className="why-title">Why Choose Ferrentino &amp; Son</h2>
                        <p className="why-sub">
                            We build relationships on solid trust, master craftsmanship, and affordable, transparent cost planning.
                        </p>
                    </div>

                    <div className="why-cards-grid">
                        {whyUsFeatures.map((feat, idx) => (
                            <div key={idx} className="why-card reveal-zoom" data-delay={(idx % 3) * 150}>
                                <div className="why-icon-circle">
                                    <i className={feat.icon}></i>
                                </div>
                                <h3 className="why-card-title">{feat.title}</h3>
                                <p className="why-card-desc">{feat.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section 5: Dark Testimonial Block */}
            <section className="service-testimonial-section">
                <div className="service-testimonial-container reveal-zoom">
                    <div className="testimonial-stars-badge">
                        <div className="stars-row">★★★★★</div>
                        <span className="testimonial-badge-label">CLIENT TESTIMONIAL</span>
                    </div>

                    <div className="testimonial-quote-mark">“</div>

                    <p className="testimonial-quote-body">
                        After talking with several designers and remodeling contractors, we decided on Ferrentino &amp; Son. They got what we wanted straight away and had plans done in less than a week. The best part is how the kitchen actually turned out. Amazing, simply amazing!
                    </p>

                    <div className="testimonial-author-line">
                        <span className="author-name">— John &amp; Trisha D.</span>
                        <span className="author-role">Ocala Homeowners</span>
                    </div>
                </div>
            </section>

            {/* Section 6: Kitchen Remodeling FAQs */}
            <section className="kitchen-faq-section">
                <div className="kitchen-faq-container">
                    <div className="faq-header reveal-zoom">
                        <h2 className="faq-title">Kitchen Remodeling FAQs</h2>
                        <p className="faq-sub">
                            Clear answers to help you plan your high-end kitchen transformation.
                        </p>
                    </div>

                    <div className="faq-accordion-list">
                        {faqs.map((faq, index) => {
                            const isOpen = openFaq === index;
                            return (
                                <div
                                    key={index}
                                    className={`faq-item reveal-zoom ${isOpen ? 'active' : ''}`}
                                    data-delay={(index % 4) * 100}
                                    onClick={() => toggleFaq(index)}
                                >
                                    <div className="faq-question-row">
                                        <h3 className="faq-question-title">{faq.question}</h3>
                                        <span className="faq-toggle-icon">{isOpen ? '−' : '+'}</span>
                                    </div>
                                    {isOpen && (
                                        <div className="faq-answer-body">
                                            <p>{faq.answer}</p>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ServiceView;