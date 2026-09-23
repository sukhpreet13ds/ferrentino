import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style/style.css';

// Assets
import contactHeroBg from '../assets/article-view.jpg';
import projectRoofingImg from '../assets/article-inner.jpg';
import avatar from '../assets/Edward.webp';
import SplitText from '../components/SplitText';

const Article = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const marketMetrics = [
        { label: 'TOTAL EMPLOYED', value: '52,480', sub: 'Total Regional Workforce' },
        { label: 'CONSTRUCTION WAGE', value: '$61,323', sub: 'Annual Average Construction Pay' },
        { label: 'UTILITIES WAGE', value: '$112,971', sub: 'Annual Average Utilities Pay' },
        { label: 'EXPECTED DEMAND', value: '28,442', sub: 'Workforce Needs Next 5 Years' }
    ];

    const pathwayNow = [
        { role: 'Carpenters', pay: '$23.75/hr' },
        { role: 'Construction Equipment Operators', pay: '$23.08/hr' },
        { role: 'Construction Laborers', pay: '$21.11/hr' }
    ];

    const pathwayNext = [
        { role: 'Construction and Building Inspectors', pay: '$28.13/hr' },
        { role: 'Electricians', pay: '$25.24/hr' },
        { role: 'Plumber/Pipefitters', pay: '$24.86/hr' }
    ];

    const pathwayLater = [
        { role: 'Project Management Specialists', pay: '$55.24/hr' },
        { role: 'Construction Managers', pay: '$55.95/hr' },
        { role: 'Electrical Power-Line Installers and Repairers', pay: '$44.38/hr' }
    ];

    const certifications = [
        'HSI Pre-Apprenticeship Certificate',
        'NSERE Engineers and Surveyor\'s License',
        'Certified Construction Manager',
        'Industrial Energy Efficiency Specialist',
        'Registered Roof Consultant',
        'AutoCAD',
        'PLS-CAD',
        'OSHA 30 Certification',
        'NCCER Rigger and Signal Person',
        'NCCER Construction Technology Credential',
        'LEED Green Building',
        'Associate Concrete Transportation Construction',
        'Certified Well Driller',
        'Journeyman Line Technician Certification',
        'Registered Waterproofing Consultant',
        'NCCER Craft Assessment and Certification',
        'NCCER Mobile Crane Operator',
        'NCCER Pipeline Training and Assessment Program',
        'Journeyman Relay Technician Certification',
        'Alternative Energy Systems Specialist'
    ];

    return (
        <div className="article-page contact-page">
            {/* Hero Section (Same style as Contact.jsx) */}
            <section
                className="contact-hero-section"
                style={{ backgroundImage: `url(${contactHeroBg})` }}
            >
                <div className="contact-hero-overlay"></div>

                <div className="contact-hero-container">
                    <div className="contact-hero-content">
                        <span className="contact-hero-tag">
                            <SplitText
                                text="ARTICLE IN DEPTH"
                                className="contact-tag-text"
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

                        <h1 className="contact-hero-title">
                            <SplitText
                                text="Industry Overview"
                                className="contact-title-line"
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
                                text="& Career Pathway"
                                className="contact-title-line"
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

                        <p className="contact-hero-desc">
                            In-depth analysis of regional construction and utilities workforce data, structural career progression tracks, and technical certification standards.
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Article Content Container */}
            <section className="art-content-section">
                <div className="art-container">

                    {/* Article Title & Meta Header */}
                    <div className="art-header-block reveal-zoom">
                        <div className="art-top-tag-line">
                            <span className="art-tag">ARTICLE IN DEPTH</span>
                            <span className="art-pub-date">Published Sep 28</span>
                        </div>

                        <h1 className="art-main-title">
                            Industry Overview and Career Pathway to Construction &amp; Utilities
                        </h1>

                        <div className="art-author-row">
                            <div className="art-author-avatar">
                                <img src={avatar} alt="Edward Cicc Ferrentino" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                            </div>
                            <span className="art-author-name">Written By Edward Cicc Ferrentino</span>
                        </div>
                    </div>

                    {/* Featured Article Banner Image */}
                    <div className="art-banner-box reveal-zoom">
                        <img src={projectRoofingImg} alt="Construction & Utilities Industry Overview" />
                    </div>

                    {/* Key Market Metrics Section */}
                    <div className="art-metrics-block reveal-zoom">
                        <h2 className="art-section-heading">Key Market Metrics</h2>
                        <div className="art-metrics-grid">
                            {marketMetrics.map((met, idx) => (
                                <div key={idx} className="art-metric-card">
                                    <span className="art-metric-label">{met.label}</span>
                                    <h3 className="art-metric-val">{met.value}</h3>
                                    <span className="art-metric-sub">{met.sub}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Main Content 2-Column Grid */}
                    <div className="art-main-grid">

                        {/* Left Column: Career Pathways */}
                        <div className="art-left-column reveal-zoom">
                            <h2 className="art-pathway-title">Career Pathway to Construction &amp; Utilities</h2>
                            <p className="art-pathway-desc">
                                The construction and utilities sectors present multi-tiered progression systems. Pathways range from immediate, low-barrier entry roles with practical training to highly skilled, certified, or degree-required technical fields. Review the targeted structural progression options mapped below.
                            </p>

                            {/* Block 1: NOW */}
                            <div className="art-pathway-block">
                                <span className="art-step-badge">NOW</span>
                                <h3 className="art-block-heading">Requires HS Diploma and On the Job Training</h3>
                                <div className="art-roles-list">
                                    {pathwayNow.map((item, idx) => (
                                        <div key={idx} className="art-role-row">
                                            <span className="art-role-name">{item.role}</span>
                                            <span className="art-pay-pill">{item.pay}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Block 2: NEXT */}
                            <div className="art-pathway-block">
                                <span className="art-step-badge">NEXT</span>
                                <h3 className="art-block-heading">Requires an Apprenticeship and Moderate on the Job Training</h3>
                                <div className="art-roles-list">
                                    {pathwayNext.map((item, idx) => (
                                        <div key={idx} className="art-role-row">
                                            <span className="art-role-name">{item.role}</span>
                                            <span className="art-pay-pill">{item.pay}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Block 3: LATER */}
                            <div className="art-pathway-block">
                                <span className="art-step-badge">LATER</span>
                                <h3 className="art-block-heading">Requires a Bachelor's Degree or Higher and/or Long Term On the Job Training</h3>
                                <div className="art-roles-list">
                                    {pathwayLater.map((item, idx) => (
                                        <div key={idx} className="art-role-row">
                                            <span className="art-role-name">{item.role}</span>
                                            <span className="art-pay-pill">{item.pay}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Sidebar */}
                        <div className="art-sidebar-column reveal-zoom" data-delay="150">

                            {/* Card 1: Have structural queries? */}
                            <div className="art-sidebar-card art-dark-card">
                                <h3 className="art-sidebar-title text-white">Have structural queries?</h3>
                                <p className="art-sidebar-p">
                                    Ask Edward and our engineering crew your direct project development questions anytime.
                                </p>
                                <Link to="/ask-to-expert" className="art-gold-btn">
                                    BACK TO ASK THE EXPERT <i className="fa-solid fa-arrow-right"></i>
                                </Link>
                            </div>

                            {/* Card 2: Industry Certifications */}
                            <div className="art-sidebar-card">
                                <h3 className="art-sidebar-title">Industry Certifications</h3>
                                <div className="art-certs-wrap">
                                    {certifications.map((cert, idx) => (
                                        <span key={idx} className="art-cert-badge">{cert}</span>
                                    ))}
                                </div>
                            </div>

                            {/* Card 3: Next Article */}
                            <div className="art-sidebar-card">
                                <span className="art-next-tag">NEXT ARTICLE</span>
                                <h4 className="art-next-title">
                                    Industry Overview and Career Pathway to Plumbing and HVAC
                                </h4>
                                <Link to="/ask-to-expert" className="art-next-link">
                                    Read Next Article <i className="fa-solid fa-arrow-right"></i>
                                </Link>
                            </div>

                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
};

export default Article;
