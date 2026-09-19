import { useEffect } from 'react';
import './style/style.css';
import serviceHeroBg from '../assets/service-bg.png';
import SplitText from '../components/SplitText';
import { Link, useNavigate } from 'react-router-dom';
import service1Img from '../assets/f&s-service1.png';
import service2Img from '../assets/f&s-service2.png';
import service3Img from '../assets/f&s-service3.png';
import service4Img from '../assets/f&s-service4.png';
import service5Img from '../assets/f&s-service5.png';
import service6Img from '../assets/f&s-service6.png';
import service7Img from '../assets/f&s-service7.png';
import service8Img from '../assets/f&s-service8.png';
import service9Img from '../assets/f&s-service9.png';

const servicesList = [
    {
        id: 1,
        title: 'Kitchen Remodeling',
        description: 'Create a kitchen that combines functionality, comfort, and style. We remodel it to make cooking, gathering, storing, and everyday life feel easier, while giving the space a look that feels completely at home.',
        linkText: 'View Kitchen Remodeling',
        img: service1Img,
    },
    {
        id: 2,
        title: 'Bathroom Remodeling',
        description: 'Small room, big impact. We rework bathrooms with better layouts, smarter storage, updated finishes, and details that make the space feel noticeably better every day.',
        linkText: 'View Bathroom Remodeling',
        img: service2Img,
    },
    {
        id: 3,
        title: 'Home Remodeling',
        description: 'Sometimes a home just needs to work differently. We rethink outdated spaces, awkward layouts, and tired finishes to create a home that fits the way you live now.',
        linkText: 'View Home Remodeling',
        img: service3Img,
    },
    {
        id: 4,
        title: 'Home Renovations',
        description: "Keep the character. Change what's not working. Our renovation work brings older or dated spaces forward while respecting the home that was already there.",
        linkText: 'View Home Renovations',
        img: service4Img,
    },
    {
        id: 5,
        title: 'Home Additions',
        description: 'Need more room? Expand your living space with a thoughtfully designed addition that complements your existing home.',
        linkText: 'View Home Additions',
        img: service5Img,
    },
    {
        id: 6,
        title: 'Interior Remodeling',
        description: 'A few walls, finishes, or layout changes can completely shift how a home feels. We help remodel interiors so each space feels intentional.',
        linkText: 'View Interior Remodeling',
        img: service6Img,
    },
    {
        id: 7,
        title: 'Design & Planning',
        description: 'Turn your ideas into a practical project plan. We help guide layout, functionality, materials, finishes, and design decisions before construction begins.',
        linkText: 'View Design Services',
        img: service7Img,
    },
    {
        id: 8,
        title: 'Custom Carpentry',
        description: 'Add character and detail to your home with custom carpentry, trim work, built-ins, woodwork, doors, and finishing details.',
        linkText: 'View Custom Carpentry',
        img: service8Img,
    },
    {
        id: 9,
        title: 'Exterior Renovations',
        description: 'We update exterior details, finishes, and features to give the home a stronger, more finished presence from the street.',
        linkText: 'View Exterior Renovations',
        img: service9Img,
    },
];

const Services = () => {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="services-page">
            {/* Hero Section */}
            <section
                className="services-hero-section"
                style={{ backgroundImage: `url(${serviceHeroBg})` }}
            >
                <div className="services-hero-overlay"></div>

                <div className="services-hero-container">
                    <div className="services-hero-content">
                        <span className="services-hero-tag">
                            <SplitText
                                text="OUR SERVICES"
                                className="services-tag-text"
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

                        <h1 className="services-hero-title">
                            <SplitText
                                text="Building, Remodeling"
                                className="services-title-line"
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
                                text="& Renovations"
                                className="services-title-line"
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

                        <p className="services-hero-desc">
                            Explore our services below to learn how we can help improve, update, expand, or transform your space. Guided by three generations of building legacy.
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Craft & Capabilities Grid Section */}
            <section className="services-grid-section">
                <div className="services-grid-container">
                    {/* Header Block */}
                    <div className="services-header-block reveal-zoom">
                        <h2 className="services-main-title">Explore Our Craft &amp; Capabilities</h2>
                        <p className="services-main-sub">
                            Explore our services below to learn how we can help improve, update, expand, or transform your space.
                            <br />
                            Guided by <span>three generations</span> of building legacy.
                        </p>
                        <div className="services-title-divider"></div>
                    </div>

                    {/* 9 Services Cards Grid */}
                    <div className="services-cards-grid">
                        {servicesList.map((service, index) => (
                            <div
                                key={service.id}
                                className="service-item-card reveal-zoom"
                                data-delay={(index % 3) * 150}
                                onClick={() => navigate('/service-view')}
                                style={{ cursor: 'pointer' }}
                            >
                                <div className="service-card-img-wrapper">
                                    <img
                                        src={service.img}
                                        alt={service.title}
                                        className="service-card-img"
                                    />
                                </div>

                                <div className="service-card-body">
                                    <h3 className="service-card-title">{service.title}</h3>
                                    <p className="service-card-desc">{service.description}</p>
                                    <div className="link-wrapper">
                                        <Link to="/service-view" className="service-card-link">
                                            {service.linkText}
                                        </Link><span className="arrow-symbol">—</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Services;