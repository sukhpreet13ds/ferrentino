import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style/style.css';
import contactHeroBg from '../assets/area-view-bg.jpg';
import SplitText from '../components/SplitText';

// Services Assets
import service1Img from '../assets/f&s-service1.png';
import service2Img from '../assets/f&s-service2.png';
import service3Img from '../assets/f&s-service3.png';
import service4Img from '../assets/f&s-service4.png';
import service5Img from '../assets/f&s-service5.png';
import service6Img from '../assets/f&s-service6.png';
import service7Img from '../assets/f&s-service7.png';
import service8Img from '../assets/f&s-service8.png';
import service9Img from '../assets/f&s-service9.png';

// Portfolio Assets
import wholeHomeImg from '../assets/whole-home.jpg';
import bathroomImg from '../assets/bathroom.jpg';

const AreaWeServeView = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Accordion state for FAQs
    const [openFaq, setOpenFaq] = useState(0);

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? -1 : index);
    };

    const stats = [
        {
            value: '1984',
            text: 'Building with core family values in Central Florida for over 40 years.'
        },
        {
            value: '100%',
            text: 'On-budget execution and locally verified materials guarantee.'
        },
        {
            value: '8+',
            text: 'Counties actively supported with dedicated craftsman networks.'
        }
    ];

    const specialtyServices = [
        {
            id: 1,
            title: 'Kitchen Remodeling',
            description: 'Create a kitchen that combines functionality, comfort, and style. We remodel it to make cooking, gathering, storing, and everyday life feel easier, while giving the space a look that feels completely at home.',
            linkText: 'View Kitchen Remodeling',
            img: service1Img,
            linkUrl: '/service-view'
        },
        {
            id: 2,
            title: 'Bathroom Remodeling',
            description: 'Small room, big impact. We rework bathrooms with better layouts, smarter storage, updated finishes, and details that make the space feel noticeably better every day.',
            linkText: 'View Bathroom Remodeling',
            img: service2Img,
            linkUrl: '/service-view'
        },
        {
            id: 3,
            title: 'Home Remodeling',
            description: 'Sometimes a home just needs to work differently. We rethink outdated spaces, awkward layouts, and tired finishes to create a home that fits the way you live now.',
            linkText: 'View Home Remodeling',
            img: service3Img,
            linkUrl: '/service-view'
        },
        {
            id: 4,
            title: 'Home Renovations',
            description: "Keep the character. Change what's not working. Our renovation work brings older or dated spaces forward while respecting the home that was already there.",
            linkText: 'View Home Renovations',
            img: service4Img,
            linkUrl: '/service-view'
        },
        {
            id: 5,
            title: 'Home Additions',
            description: 'Need more room? Expand your living space with a thoughtfully designed addition that complements your existing home.',
            linkText: 'View Home Additions',
            img: service5Img,
            linkUrl: '/service-view'
        },
        {
            id: 6,
            title: 'Interior Remodeling',
            description: 'A few walls, finishes, or layout changes can completely shift how a home feels. We help remodel interiors so each space feels intentional.',
            linkText: 'View Interior Remodeling',
            img: service6Img,
            linkUrl: '/service-view'
        },
        {
            id: 7,
            title: 'Design & Planning',
            description: 'Turn your ideas into a practical project plan. We help guide layout, functionality, materials, finishes, and design decisions before construction begins.',
            linkText: 'View Design Services',
            img: service7Img,
            linkUrl: '/service-view'
        },
        {
            id: 8,
            title: 'Custom Carpentry',
            description: 'Add character and detail to your home with custom carpentry, trim work, built-ins, woodwork, doors, and finishing details.',
            linkText: 'View Custom Carpentry',
            img: service8Img,
            linkUrl: '/service-view'
        },
        {
            id: 9,
            title: 'Exterior Renovations',
            description: 'We update exterior details, finishes, and features to give the home a stronger, more finished presence from the street.',
            linkText: 'View Exterior Renovations',
            img: service9Img,
            linkUrl: '/service-view'
        }
    ];

    const centralFloridaFeatures = [
        {
            icon: 'fa-solid fa-file-contract',
            title: 'Downtown Permitting Fluency',
            desc: 'Historic preservation rules for Ocala’s downtown properties require delicate municipal handling. We manage all historic board submittals and City of Ocala structural compliance seamlessly.'
        },
        {
            icon: 'fa-solid fa-shield-halved',
            title: 'Soil & Limestone Engineering',
            desc: 'Ocala’s famous rolling hills and limestone pockets require rigorous foundation prep. We perform comprehensive soil testing and implement sinkhole-mitigating concrete pouring protocols.'
        },
        {
            icon: 'fa-solid fa-user-group',
            title: 'Generational Local Trades',
            desc: 'Forty years in Marion County means we only deploy the finest vetted craftsmen. Our long-standing network of local masonry, framing, and roofing experts ensures elite performance.'
        }
    ];

    const portfolioProjects = [
        {
            id: 1,
            title: 'F&S – Whole-Home Renovation',
            location: 'Greg + Julia — Ocala, FL',
            img: wholeHomeImg
        },
        {
            id: 2,
            title: 'F&S – Bathroom Remodel #1',
            location: 'Wolfram — Ocala, FL',
            img: bathroomImg
        }
    ];

    const blueprintSteps = [
        {
            num: '01',
            title: 'Initial Consultation',
            desc: 'We sit down in Ocala to map your vision, explore functional design flaws, evaluate necessary code custom, and align with your target budget.'
        },
        {
            num: '02',
            title: '3D Design & Plan',
            desc: 'We bring custom architectural plans to life and provide 3D digital simulation so you can examine every inch of your space before breaking ground.'
        },
        {
            num: '03',
            title: 'Turnkey Management',
            desc: 'Protection barriers, active county communication, schedule synchronization, and oversight overseen by our senior lead master.'
        },
        {
            num: '04',
            title: 'Pristine Handover',
            desc: 'After detailed inspection, structural reviews, and custom paint touching, we hand over your beautiful new space ready for generations to use.'
        }
    ];

    const testimonials = [
        {
            quote: 'Details and craftsmanship made all the difference. Ferrentino and Son completely revitalized our kitchen inside our historic Ocala bungalow on budget. Their designer made it effortless to plan with.',
            name: 'Sarah & Robert K.',
            location: 'Downtown Historic District – Ocala Homeowner'
        },
        {
            quote: 'Top-quality structure/ authority from permitting down to concrete base pour. Down South soils they managed our extensive master wing addition with absolute transparency. Highly recommended local team.',
            name: 'Marcus & Elena G.',
            location: 'Southeast Ocala – Master Wing Addition'
        }
    ];

    const faqs = [
        {
            question: 'Do you handle historic district preservation codes?',
            answer: 'Absolutely. We have over four decades of history working directly with Marion County and City of Ocala historic preservation guidelines. We handle all planning documentation, architectural approvals, and strict compliance measures.'
        },
        {
            question: 'How do you handle Ocala’s karst limestone soils?',
            answer: 'Foundation engineering is our absolute specialty. Before we break ground on any custom build or master wing expansion, we perform comprehensive soil-bearing capacity assessments and engineer reinforced steel-concrete structures designed against shifts.'
        },
        {
            question: 'What is the average timeline for a luxury kitchen remodel?',
            answer: 'Depending on design complexity and structural wall changes, most custom Ocala kitchen remodels are completed within 4 to 8 weeks. We provide a full weekly scheduling blueprint before construction starts.'
        },
        {
            question: 'Are your estimators and trade partners fully certified?',
            answer: 'Yes, Ferrentino & Son is fully licensed, insured, and bonded. We only partner with verified local trade, mechanical professionals, and concrete suppliers who share our standards for safety and structural excellence.'
        }
    ];

    return (
        <div className="area-we-serve-view-page contact-page">
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
                                text="Marion County Builders"
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
                                text="Remodeling & Construction"
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
                                text="in Ocala, FL"
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
                            Proudly building, renovating, and restoring homes across Marion County and Central Florida with generational craftsmanship and reliable family values.
                        </p>
                    </div>
                </div>
            </section>

            {/* Top Stats Banner */}
            <section className="asv-stats-section">
                <div className="asv-stats-container">
                    {stats.map((stat, idx) => (
                        <div key={idx} className={`asv-stat-item reveal-zoom ${idx < stats.length - 1 ? 'has-divider' : ''}`} data-delay={idx * 150}>
                            <div className="asv-stat-number">{stat.value}</div>
                            <div className="asv-stat-text">{stat.text}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Section 1: Specialties / Exceptional Building Services (3x3 Desktop, 2x2 Mobile Grid) */}
            <section className="asv-specialties-section">
                <div className="asv-section-container">
                    <div className="asv-header-block reveal-zoom">
                        <span className="asv-pill-tag">SPECIALTIES</span>
                        <h2 className="asv-main-title">Exceptional Building Services</h2>
                        <p className="asv-sub-desc">
                            From custom-designed luxury kitchen transformations to complex structural additions, we craft spaces built around your routine and designed to last generations.
                        </p>
                    </div>

                    <div className="asv-services-grid">
                        {specialtyServices.map((service, idx) => (
                            <div key={service.id} className="asv-service-card reveal-zoom" data-delay={(idx % 3) * 120}>
                                <div className="asv-card-img-wrapper">
                                    <img src={service.img} alt={service.title} />
                                </div>
                                <div className="asv-card-body">
                                    <h3 className="asv-card-title">{service.title}</h3>
                                    <p className="asv-card-desc">{service.description}</p>
                                    <div className="asv-link-wrapper">
                                        <Link to={service.linkUrl} className="asv-card-link">
                                            {service.linkText}
                                        </Link>
                                        <span className="asv-link-dash">—</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section 2: Ocala Is Home / Designed for Central Florida's Heart */}
            <section className="asv-locality-features-section">
                <div className="asv-section-container">
                    <div className="asv-header-block reveal-zoom">
                        <span className="asv-pill-tag">OCALA IS HOME</span>
                        <h2 className="asv-main-title">Designed for Central Florida's Heart</h2>
                        <p className="asv-sub-desc">
                            Building in Ocala demands deeply specialized regional authority. From historic preservation codes near Ocala's downtown square to specialized expansion soils, we build for longevity.
                        </p>
                    </div>

                    <div className="asv-features-grid">
                        {centralFloridaFeatures.map((feat, idx) => (
                            <div key={idx} className="asv-feature-card reveal-zoom" data-delay={idx * 150}>
                                <div className="asv-feature-icon-box">
                                    <i className={feat.icon}></i>
                                </div>
                                <h3 className="asv-feature-title">{feat.title}</h3>
                                <p className="asv-feature-desc">{feat.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section 3: Portfolio / Recent Work in Marion County */}
            <section className="asv-portfolio-section">
                <div className="asv-section-container">
                    <div className="asv-header-block reveal-zoom">
                        <span className="asv-pill-tag">PORTFOLIO</span>
                        <h2 className="asv-main-title">Recent Work in Marion County</h2>
                        <p className="asv-sub-desc">
                            Take a look at our freshly completed residential designs, luxury master restorations, and pristine commercial projects.
                        </p>
                    </div>

                    <div className="asv-portfolio-grid">
                        {portfolioProjects.map((project, idx) => (
                            <div key={project.id} className="asv-portfolio-card reveal-zoom" data-delay={idx * 150}>
                                <div className="asv-portfolio-img-wrapper">
                                    <img src={project.img} alt={project.title} />
                                </div>
                                <div className="asv-portfolio-content">
                                    <h3 className="asv-portfolio-title">{project.title}</h3>
                                    <div className="asv-portfolio-location">
                                        <i className="fa-solid fa-location-dot"></i> {project.location}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section 4: The Blueprint / Our Customized Process */}
            <section className="asv-process-section">
                <div className="asv-section-container">
                    <div className="asv-header-block reveal-zoom">
                        <span className="asv-pill-tag">THE BLUEPRINT</span>
                        <h2 className="asv-main-title">Our Customized Process</h2>
                        <p className="asv-sub-desc">
                            Building your custom home or managing a complex remodel should be as rewarding as it is exciting. Here is how we ensure pristine transparency from concept to completion.
                        </p>
                    </div>

                    <div className="asv-process-grid">
                        {blueprintSteps.map((step, idx) => (
                            <div key={step.num} className="asv-process-card reveal-zoom" data-delay={idx * 120}>
                                <div className="asv-process-num">{step.num}</div>
                                <h3 className="asv-process-title">{step.title}</h3>
                                <p className="asv-process-desc">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section 5: Client Stories / Renovate With a Team You Trust (Dark Section) */}
            <section className="asv-testimonials-section">
                <div className="asv-testimonials-container">
                    <div className="asv-header-block dark reveal-zoom">
                        <span className="asv-pill-tag yellow">CLIENT STORIES</span>
                        <h2 className="asv-main-title white">Renovate With a Team You Trust</h2>
                        <p className="asv-sub-desc gray">
                            Read why Ocala homeowners and commercial property managers continue to select Ferrentino &amp; Son for their structural milestones.
                        </p>
                    </div>

                    <div className="asv-testimonials-grid">
                        {testimonials.map((test, idx) => (
                            <div key={idx} className="asv-testimonial-card reveal-zoom" data-delay={idx * 150}>
                                <p className="asv-test-quote">“{test.quote}”</p>
                                <div className="asv-test-author-block">
                                    <h4 className="asv-test-author-name">{test.name}</h4>
                                    <p className="asv-test-author-loc">{test.location}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section 6: Questions / Frequently Asked Inquiries (Accordion) */}
            <section className="asv-faq-section">
                <div className="asv-faq-container">
                    <div className="asv-header-block reveal-zoom">
                        <span className="asv-pill-tag">QUESTIONS</span>
                        <h2 className="asv-main-title">Frequently Asked Inquiries</h2>
                        <p className="asv-sub-desc">
                            Have questions about the building codes, timelines, or structural engineering guidelines in Ocala? Read our core FAQs.
                        </p>
                    </div>

                    <div className="asv-faq-list reveal-zoom">
                        {faqs.map((faq, index) => {
                            const isOpen = openFaq === index;
                            return (
                                <div
                                    key={index}
                                    className={`asv-faq-item ${isOpen ? 'active' : ''}`}
                                    onClick={() => toggleFaq(index)}
                                >
                                    <div className="asv-faq-question-row">
                                        <h3 className="asv-faq-question-title">{faq.question}</h3>
                                        <span className="asv-faq-toggle-icon">
                                            <i className={`fa-solid ${isOpen ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                                        </span>
                                    </div>
                                    {isOpen && (
                                        <div className="asv-faq-answer-body">
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

export default AreaWeServeView;