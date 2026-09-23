import { useEffect } from 'react';
import './style/style.css';
import serviceHeroBg from '../assets/service-bg.png';
import SplitText from '../components/SplitText';

const Privacy = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="legal-page">
            {/* Hero Section */}
            <section
                className="legal-hero-section"
                style={{ backgroundImage: `url(${serviceHeroBg})` }}
            >
                <div className="legal-hero-overlay"></div>

                <div className="legal-hero-container">
                    <div className="legal-hero-content">
                        <span className="legal-hero-tag">
                            <SplitText
                                text="LEGAL INFORMATION"
                                className="legal-tag-text"
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

                        <h1 className="legal-hero-title">
                            <SplitText
                                text="Privacy Policy"
                                className="legal-title-line"
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

                        <p className="legal-hero-desc">
                            Effective Date: September 15, 2026
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content Section */}
            <section className="legal-main-section">
                <div className="legal-container">
                    <div className="legal-card">
                        
                        <div className="legal-intro-box reveal-zoom">
                            <p className="legal-paragraph lead">
                                <strong>Ferrentino &amp; Son, LLC</strong> ("Ferrentino &amp; Son," "we," "us," or "our") respects your privacy and is committed to protecting the information you provide when you visit our website, contact us, request information, or inquire about our remodeling and construction services.
                            </p>
                            <p className="legal-paragraph">
                                This Privacy Policy explains what information we may collect, how we use it, how we protect it, and the choices you may have regarding your information.
                            </p>
                        </div>

                        <div className="legal-divider"></div>

                        {/* Section 1 */}
                        <div className="legal-section-block reveal-zoom">
                            <h2 className="legal-section-title">
                                <span className="legal-section-num">1.</span> Information We Collect
                            </h2>
                            <p className="legal-paragraph">
                                We may collect information that you voluntarily provide to us when you use our website or communicate with us, including:
                            </p>
                            <ul className="legal-list">
                                <li>Your name</li>
                                <li>Email address</li>
                                <li>Phone number</li>
                                <li>Mailing or project address</li>
                                <li>Information about your remodeling or construction project</li>
                                <li>Information you provide when requesting a consultation or estimate</li>
                                <li>Messages, questions, comments, or other information submitted through website forms</li>
                                <li>Any other information you choose to provide to us</li>
                            </ul>
                            <p className="legal-paragraph">
                                We may also automatically collect certain technical information when you visit our website, such as your IP address, browser type, device type, pages visited, referring website, and general website usage information.
                            </p>
                        </div>

                        {/* Section 2 */}
                        <div className="legal-section-block reveal-zoom">
                            <h2 className="legal-section-title">
                                <span className="legal-section-num">2.</span> How We Use Your Information
                            </h2>
                            <p className="legal-paragraph">
                                Ferrentino &amp; Son may use the information we collect to:
                            </p>
                            <ul className="legal-list">
                                <li>Respond to your questions and inquiries</li>
                                <li>Contact you regarding a requested consultation, estimate, or project</li>
                                <li>Understand your remodeling or construction needs</li>
                                <li>Provide and improve our services</li>
                                <li>Communicate with you about projects, services, or requests</li>
                                <li>Maintain and improve our website</li>
                                <li>Analyze website usage and performance</li>
                                <li>Protect the security and integrity of our website</li>
                                <li>Comply with applicable laws and legal obligations</li>
                            </ul>
                            <p className="legal-paragraph">
                                We do not use information submitted through our website for purposes unrelated to our business activities unless permitted or required by law.
                            </p>
                        </div>

                        {/* Section 3 */}
                        <div className="legal-section-block reveal-zoom">
                            <h2 className="legal-section-title">
                                <span className="legal-section-num">3.</span> Information Sharing
                            </h2>
                            <p className="legal-paragraph">
                                Ferrentino &amp; Son does not sell your personal information.
                            </p>
                            <p className="legal-paragraph">
                                We may share information when reasonably necessary to operate our business or provide requested services. This may include sharing information with:
                            </p>
                            <ul className="legal-list">
                                <li>Service providers who assist with website hosting, technology, communications, or business operations</li>
                                <li>Contractors, subcontractors, designers, suppliers, or other project-related professionals when necessary to respond to or perform services you have requested</li>
                                <li>Professional advisers, such as attorneys, accountants, or insurers</li>
                                <li>Government authorities or other parties when required by law or when necessary to protect our legal rights</li>
                            </ul>
                            <p className="legal-paragraph">
                                Any information shared for business purposes will be handled in accordance with applicable legal requirements and, where appropriate, contractual obligations.
                            </p>
                        </div>

                        {/* Section 4 */}
                        <div className="legal-section-block reveal-zoom">
                            <h2 className="legal-section-title">
                                <span className="legal-section-num">4.</span> Cookies and Similar Technologies
                            </h2>
                            <p className="legal-paragraph">
                                Our website may use cookies or similar technologies to help the website function properly, understand how visitors use the website, and improve the user experience.
                            </p>
                            <p className="legal-paragraph">
                                Third-party services used on the website may also use cookies or similar technologies for analytics, website functionality, advertising, or other purposes.
                            </p>
                            <p className="legal-paragraph">
                                You may be able to control or disable cookies through your web browser settings. Disabling certain cookies may affect the functionality of portions of the website.
                            </p>
                        </div>

                        {/* Section 5 */}
                        <div className="legal-section-block reveal-zoom">
                            <h2 className="legal-section-title">
                                <span className="legal-section-num">5.</span> Third-Party Services and Links
                            </h2>
                            <p className="legal-paragraph">
                                Our website may contain links to third-party websites, services, social media platforms, review websites, or other external resources.
                            </p>
                            <p className="legal-paragraph">
                                Ferrentino &amp; Son is not responsible for the privacy practices, security, content, or policies of third-party websites. We encourage you to review the privacy policies of any third-party website you visit.
                            </p>
                        </div>

                        {/* Section 6 */}
                        <div className="legal-section-block reveal-zoom">
                            <h2 className="legal-section-title">
                                <span className="legal-section-num">6.</span> Communications
                            </h2>
                            <p className="legal-paragraph">
                                If you provide your contact information through our website, we may use it to respond to your inquiry or communicate with you regarding requested services.
                            </p>
                            <p className="legal-paragraph">
                                If you receive marketing or promotional communications from us, you may request to stop receiving such communications by contacting us using the information provided below.
                            </p>
                            <p className="legal-paragraph">
                                Please note that certain service-related or administrative communications may still be sent when necessary.
                            </p>
                        </div>

                        {/* Section 7 */}
                        <div className="legal-section-block reveal-zoom">
                            <h2 className="legal-section-title">
                                <span className="legal-section-num">7.</span> Data Security
                            </h2>
                            <p className="legal-paragraph">
                                We take reasonable administrative, technical, and organizational measures to protect information submitted through our website.
                            </p>
                            <p className="legal-paragraph">
                                However, no method of transmitting information over the internet or storing information electronically is completely secure. Therefore, we cannot guarantee absolute security.
                            </p>
                        </div>

                        {/* Section 8 */}
                        <div className="legal-section-block reveal-zoom">
                            <h2 className="legal-section-title">
                                <span className="legal-section-num">8.</span> Children's Privacy
                            </h2>
                            <p className="legal-paragraph">
                                Our website and services are intended for adults and homeowners, property owners, and other individuals seeking construction or remodeling services.
                            </p>
                            <p className="legal-paragraph">
                                We do not knowingly collect personal information from children under the age of 13. If you believe that a child has provided personal information to us through the website, please contact us so that we can take appropriate action.
                            </p>
                        </div>

                        {/* Section 9 */}
                        <div className="legal-section-block reveal-zoom">
                            <h2 className="legal-section-title">
                                <span className="legal-section-num">9.</span> Your Privacy Rights
                            </h2>
                            <p className="legal-paragraph">
                                Depending on where you live and applicable law, you may have certain rights regarding your personal information, including the right to request access to, correction of, or deletion of certain information.
                            </p>
                            <p className="legal-paragraph">
                                To make a privacy-related request, please contact us using the information below. We may need to verify your identity before completing certain requests.
                            </p>
                        </div>

                        {/* Section 10 */}
                        <div className="legal-section-block reveal-zoom">
                            <h2 className="legal-section-title">
                                <span className="legal-section-num">10.</span> Changes to This Privacy Policy
                            </h2>
                            <p className="legal-paragraph">
                                We may update this Privacy Policy from time to time to reflect changes to our website, business practices, services, or applicable laws.
                            </p>
                            <p className="legal-paragraph">
                                When we make changes, we will update the "Effective Date" at the top of this policy. Your continued use of the website after an updated Privacy Policy is posted constitutes your acknowledgment of the updated policy.
                            </p>
                        </div>

                        {/* Section 11 */}
                        <div className="legal-section-block reveal-zoom">
                            <h2 className="legal-section-title">
                                <span className="legal-section-num">11.</span> Contact Us
                            </h2>
                            <p className="legal-paragraph">
                                If you have questions about this Privacy Policy or how your information is handled, please contact:
                            </p>

                            <div className="legal-contact-card">
                                <h3 className="legal-contact-name">Ferrentino &amp; Son, LLC</h3>
                                <p className="legal-contact-item">
                                    <i className="fa-solid fa-envelope"></i>
                                    <strong>Email:</strong> <a href="mailto:estimating@ferrentinoandson.com">estimating@ferrentinoandson.com</a>
                                </p>
                                <p className="legal-contact-item">
                                    <i className="fa-solid fa-phone"></i>
                                    <strong>Phone:</strong> <a href="tel:3522373368">352-237-3368</a>
                                </p>
                            </div>

                            <p className="legal-paragraph legal-footnote">
                                Ferrentino &amp; Son proudly serves communities throughout Central Florida, including Marion, Lake, Citrus, Sumter, Levy, Volusia, Putnam, and Alachua counties.
                            </p>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
};

export default Privacy;