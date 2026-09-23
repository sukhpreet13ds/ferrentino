import { useEffect } from 'react';
import './style/style.css';
import serviceHeroBg from '../assets/service-bg.png';
import SplitText from '../components/SplitText';

const Terms = () => {
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
                                text="Terms & Conditions"
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
                                Welcome to the website of <strong>Ferrentino &amp; Son, LLC</strong> ("Ferrentino &amp; Son," "we," "us," or "our"). By accessing or using this website, you agree to comply with these Terms &amp; Conditions.
                            </p>
                            <p className="legal-paragraph">
                                If you do not agree with these terms, please do not use the website.
                            </p>
                        </div>

                        <div className="legal-divider"></div>

                        {/* Section 1 */}
                        <div className="legal-section-block reveal-zoom">
                            <h2 className="legal-section-title">
                                <span className="legal-section-num">1.</span> Website Purpose
                            </h2>
                            <p className="legal-paragraph">
                                This website provides general information about Ferrentino &amp; Son, LLC, including our remodeling, construction, design, renovation, and related services.
                            </p>
                            <p className="legal-paragraph">
                                The website may also allow visitors to contact us, request information, ask questions, or inquire about potential projects.
                            </p>
                            <p className="legal-paragraph">
                                Information provided through this website is for general informational purposes and does not, by itself, create a construction contract, service agreement, estimate, warranty, or other contractual relationship between you and Ferrentino &amp; Son.
                            </p>
                        </div>

                        {/* Section 2 */}
                        <div className="legal-section-block reveal-zoom">
                            <h2 className="legal-section-title">
                                <span className="legal-section-num">2.</span> Project Inquiries and Estimates
                            </h2>
                            <p className="legal-paragraph">
                                Submitting an inquiry through this website does not guarantee that Ferrentino &amp; Son will accept or perform a project.
                            </p>
                            <p className="legal-paragraph">
                                Any project scope, pricing, schedule, materials, specifications, warranties, payment terms, and other project requirements will be governed by a separate written agreement or contract when applicable.
                            </p>
                            <p className="legal-paragraph">
                                Information displayed on the website regarding remodeling, construction, design, timelines, costs, materials, or services should not be interpreted as a binding quote or guarantee for a particular project.
                            </p>
                            <p className="legal-paragraph">
                                Actual project costs and schedules may vary depending on factors including project scope, materials, site conditions, permitting, availability, design changes, and other circumstances.
                            </p>
                        </div>

                        {/* Section 3 */}
                        <div className="legal-section-block reveal-zoom">
                            <h2 className="legal-section-title">
                                <span className="legal-section-num">3.</span> No Professional Advice
                            </h2>
                            <p className="legal-paragraph">
                                The information published on this website, including articles, guides, project information, and educational content, is provided for general informational purposes.
                            </p>
                            <p className="legal-paragraph">
                                Website content should not be considered a substitute for professional engineering, architectural, legal, financial, structural, or other professional advice.
                            </p>
                            <p className="legal-paragraph">
                                Project-specific decisions should be made based on the circumstances of the individual project and, where appropriate, advice from qualified professionals.
                            </p>
                        </div>

                        {/* Section 4 */}
                        <div className="legal-section-block reveal-zoom">
                            <h2 className="legal-section-title">
                                <span className="legal-section-num">4.</span> Accuracy of Information
                            </h2>
                            <p className="legal-paragraph">
                                Ferrentino &amp; Son makes reasonable efforts to provide useful and accurate information on the website.
                            </p>
                            <p className="legal-paragraph">
                                However, we do not warrant that all information is complete, current, error-free, or applicable to every situation.
                            </p>
                            <p className="legal-paragraph">
                                Services, descriptions, photographs, examples, materials, availability, project information, and other website content may change without notice.
                            </p>
                        </div>

                        {/* Section 5 */}
                        <div className="legal-section-block reveal-zoom">
                            <h2 className="legal-section-title">
                                <span className="legal-section-num">5.</span> Website Availability
                            </h2>
                            <p className="legal-paragraph">
                                We make reasonable efforts to keep the website available and functioning properly. However, we do not guarantee that the website will always be available, uninterrupted, secure, or free from errors.
                            </p>
                            <p className="legal-paragraph">
                                We may modify, suspend, or discontinue any portion of the website at any time without notice.
                            </p>
                        </div>

                        {/* Section 6 */}
                        <div className="legal-section-block reveal-zoom">
                            <h2 className="legal-section-title">
                                <span className="legal-section-num">6.</span> Intellectual Property
                            </h2>
                            <p className="legal-paragraph">
                                Unless otherwise stated, the content of this website—including text, photographs, graphics, logos, designs, branding, videos, articles, and other materials—is owned by or licensed to Ferrentino &amp; Son, LLC and is protected by applicable intellectual property laws.
                            </p>
                            <p className="legal-paragraph">
                                You may view and use the website for your personal, non-commercial purposes.
                            </p>
                            <p className="legal-paragraph">
                                You may not reproduce, distribute, modify, publish, transmit, sell, create derivative works from, or commercially exploit website content without prior written permission from Ferrentino &amp; Son, except where permitted by law.
                            </p>
                        </div>

                        {/* Section 7 */}
                        <div className="legal-section-block reveal-zoom">
                            <h2 className="legal-section-title">
                                <span className="legal-section-num">7.</span> Project Photographs and Portfolio Content
                            </h2>
                            <p className="legal-paragraph">
                                Photographs and other visual materials displayed on the website may represent completed projects, works in progress, designs, or examples of Ferrentino &amp; Son's work.
                            </p>
                            <p className="legal-paragraph">
                                Project photographs are intended to provide examples of craftsmanship, design, and construction services. Actual project results may vary depending on project conditions, materials, design choices, and other factors.
                            </p>
                        </div>

                        {/* Section 8 */}
                        <div className="legal-section-block reveal-zoom">
                            <h2 className="legal-section-title">
                                <span className="legal-section-num">8.</span> Third-Party Links
                            </h2>
                            <p className="legal-paragraph">
                                The website may contain links to third-party websites or services.
                            </p>
                            <p className="legal-paragraph">
                                These links are provided for convenience or informational purposes. Ferrentino &amp; Son does not necessarily endorse and is not responsible for the content, availability, security, privacy practices, or policies of third-party websites.
                            </p>
                            <p className="legal-paragraph">
                                Your use of third-party websites is subject to their own terms and policies.
                            </p>
                        </div>

                        {/* Section 9 */}
                        <div className="legal-section-block reveal-zoom">
                            <h2 className="legal-section-title">
                                <span className="legal-section-num">9.</span> User Submissions
                            </h2>
                            <p className="legal-paragraph">
                                If you submit information, questions, photographs, comments, project details, or other materials through the website, you represent that you have the right to provide such information.
                            </p>
                            <p className="legal-paragraph">
                                You agree not to submit content that is unlawful, fraudulent, threatening, defamatory, abusive, infringing, or otherwise inappropriate.
                            </p>
                            <p className="legal-paragraph">
                                You remain responsible for the information you submit.
                            </p>
                        </div>

                        {/* Section 10 */}
                        <div className="legal-section-block reveal-zoom">
                            <h2 className="legal-section-title">
                                <span className="legal-section-num">10.</span> Prohibited Use
                            </h2>
                            <p className="legal-paragraph">
                                You agree not to use the website to:
                            </p>
                            <ul className="legal-list">
                                <li>Violate any applicable law or regulation</li>
                                <li>Attempt to gain unauthorized access to the website or its systems</li>
                                <li>Interfere with the operation or security of the website</li>
                                <li>Introduce viruses, malware, or other harmful code</li>
                                <li>Collect information about other users without authorization</li>
                                <li>Submit false, misleading, or fraudulent information</li>
                                <li>Use automated systems to improperly access or scrape the website</li>
                                <li>Engage in activity that could damage Ferrentino &amp; Son, its website, or its users</li>
                            </ul>
                        </div>

                        {/* Section 11 */}
                        <div className="legal-section-block reveal-zoom">
                            <h2 className="legal-section-title">
                                <span className="legal-section-num">11.</span> Disclaimer of Warranties
                            </h2>
                            <p className="legal-paragraph">
                                To the fullest extent permitted by applicable law, this website and its content are provided on an "as is" and "as available" basis.
                            </p>
                            <p className="legal-paragraph">
                                Ferrentino &amp; Son makes no warranties, express or implied, regarding the website or its content, including warranties of accuracy, reliability, availability, merchantability, fitness for a particular purpose, or non-infringement.
                            </p>
                            <p className="legal-paragraph">
                                Nothing in these Terms &amp; Conditions limits any rights or protections that cannot legally be excluded under applicable law.
                            </p>
                        </div>

                        {/* Section 12 */}
                        <div className="legal-section-block reveal-zoom">
                            <h2 className="legal-section-title">
                                <span className="legal-section-num">12.</span> Limitation of Liability
                            </h2>
                            <p className="legal-paragraph">
                                To the fullest extent permitted by applicable law, Ferrentino &amp; Son, LLC and its owners, employees, representatives, contractors, and affiliates will not be liable for damages arising from or related to your use of, or inability to use, the website or information contained on the website.
                            </p>
                            <p className="legal-paragraph">
                                This limitation applies to direct, indirect, incidental, consequential, special, or other damages to the extent permitted by law.
                            </p>
                            <p className="legal-paragraph">
                                These website Terms &amp; Conditions do not replace or modify the terms of any separate written construction, remodeling, design, or service agreement entered into with Ferrentino &amp; Son.
                            </p>
                        </div>

                        {/* Section 13 */}
                        <div className="legal-section-block reveal-zoom">
                            <h2 className="legal-section-title">
                                <span className="legal-section-num">13.</span> Indemnification
                            </h2>
                            <p className="legal-paragraph">
                                To the extent permitted by applicable law, you agree to defend, indemnify, and hold harmless Ferrentino &amp; Son, LLC and its owners, employees, representatives, contractors, and affiliates from claims, liabilities, damages, losses, and expenses arising from your misuse of the website, violation of these Terms &amp; Conditions, or violation of the rights of another party.
                            </p>
                        </div>

                        {/* Section 14 */}
                        <div className="legal-section-block reveal-zoom">
                            <h2 className="legal-section-title">
                                <span className="legal-section-num">14.</span> Governing Law
                            </h2>
                            <p className="legal-paragraph">
                                These Terms &amp; Conditions shall be governed by and interpreted in accordance with the laws applicable in the State of Florida, without regard to conflict-of-law principles, except where applicable law requires otherwise.
                            </p>
                            <p className="legal-paragraph">
                                Any dispute concerning these website Terms &amp; Conditions shall be handled in a court of competent jurisdiction as permitted by applicable law.
                            </p>
                        </div>

                        {/* Section 15 */}
                        <div className="legal-section-block reveal-zoom">
                            <h2 className="legal-section-title">
                                <span className="legal-section-num">15.</span> Changes to These Terms
                            </h2>
                            <p className="legal-paragraph">
                                Ferrentino &amp; Son may update these Terms &amp; Conditions from time to time.
                            </p>
                            <p className="legal-paragraph">
                                When changes are made, the "Effective Date" at the top of this page will be updated. Your continued use of the website after changes are posted constitutes acceptance of the revised Terms &amp; Conditions.
                            </p>
                        </div>

                        {/* Section 16 */}
                        <div className="legal-section-block reveal-zoom">
                            <h2 className="legal-section-title">
                                <span className="legal-section-num">16.</span> Severability
                            </h2>
                            <p className="legal-paragraph">
                                If any provision of these Terms &amp; Conditions is determined to be invalid or unenforceable, the remaining provisions will remain in full force and effect to the extent permitted by law.
                            </p>
                        </div>

                        {/* Section 17 */}
                        <div className="legal-section-block reveal-zoom">
                            <h2 className="legal-section-title">
                                <span className="legal-section-num">17.</span> Entire Agreement
                            </h2>
                            <p className="legal-paragraph">
                                These Terms &amp; Conditions constitute the agreement between you and Ferrentino &amp; Son regarding your use of this website, except where a separate written agreement governs a specific service or project.
                            </p>
                        </div>

                        {/* Section 18 */}
                        <div className="legal-section-block reveal-zoom">
                            <h2 className="legal-section-title">
                                <span className="legal-section-num">18.</span> Contact Us
                            </h2>
                            <p className="legal-paragraph">
                                If you have questions regarding these Terms &amp; Conditions, please contact:
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
                                <p className="legal-contact-item">
                                    <i className="fa-solid fa-globe"></i>
                                    <strong>Website:</strong> <a href="https://ferrentinoandson.com" target="_blank" rel="noopener noreferrer">ferrentinoandson.com</a>
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
};

export default Terms;