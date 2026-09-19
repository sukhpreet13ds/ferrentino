import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './style/style.css';

// Assets
import contactHeroBg from '../assets/area-bg.jpg';
import mapImg from '../assets/map.png';
import locationIcon from '../assets/location.png';
import kitchenBgImg from '../assets/area111.png';
import livingImg from '../assets/area222.png';
import ferrentino1Img from '../assets/area333.png';
import bathImg from '../assets/area444.png';    
import feature1Img from '../assets/area555.png';
import interierImg from '../assets/area666.png';
import feature2Img from '../assets/area777.png';
import roomImg from '../assets/area888.png';
import SplitText from '../components/SplitText';
import ReadyCta from '../components/ReadyCta';

const AreaWeServe = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Locality Section Animation Trigger State
    const [isLocalityVisible, setIsLocalityVisible] = useState(false);
    const localityRef = useRef(null);

    const mapPins = [
        { id: 1, name: "Alachua", top: "24%", left: "69%", size: "48px", delay: "0.1s" },
        { id: 2, name: "Putnam", top: "27%", left: "78%", size: "40px", delay: "0.25s" },
        { id: 3, name: "Levy", top: "35%", left: "66%", size: "52px", delay: "0.4s" },
        { id: 4, name: "Marion", top: "36%", left: "73%", size: "58px", delay: "0.55s" },
        { id: 5, name: "Volusia", top: "40%", left: "84%", size: "44px", delay: "0.7s" },
        { id: 6, name: "Citrus", top: "48%", left: "68%", size: "46px", delay: "0.85s" },
        { id: 7, name: "Sumter", top: "52%", left: "73%", size: "52px", delay: "1.0s" },
        { id: 8, name: "Lake", top: "48%", left: "78%", size: "55px", delay: "1.15s" },
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsLocalityVisible(true);
                }
            },
            { threshold: 0.15 }
        );

        if (localityRef.current) {
            observer.observe(localityRef.current);
        }

        return () => {
            if (localityRef.current) {
                observer.unobserve(localityRef.current);
            }
        };
    }, []);

    const countyCards = [
        {
            id: 1,
            isHq: true,
            // hqBadge: 'OPERATIONAL HQ',
            county: 'Marion County',
            hub: 'PRIMARY HUB: OCALA (HOME BASE)',
            desc: 'Our ancestral heartland and operational headquarters. We offer full-scale residential custom builds, massive commercial renovations, and detailed kitchen bath transformations across Marion County.',
            img: kitchenBgImg
        },
        {
            id: 2,
            isHq: false,
            county: 'Lake County',
            hub: 'PRIMARY HUB: TAVARES & CLERMONT',
            desc: 'Providing high-integrity additions, roofing services, and complete waterfront remodeling. Our teams understand the unique construction parameters of Lake County properties.',
            img: livingImg
        },
        {
            id: 3,
            isHq: false,
            county: 'Citrus County',
            hub: 'PRIMARY HUB: CRYSTAL RIVER & INVERNESS',
            desc: 'From coastal-resilient remodels to deep-foundation residential construction, Ferrentino & Son ensures unmatched structural mastery for Citrus County families.',
            img: ferrentino1Img
        },
        {
            id: 4,
            isHq: false,
            county: 'Sumter County',
            hub: 'PRIMARY HUB: THE VILLAGES & WILDWOOD',
            desc: 'Specializing in aging-in-place modifications, pristine bathroom retrofits, and high-efficiency commercial upgrades to meet fast-growing municipal demands.',
            img: bathImg
        },
        {
            id: 5,
            isHq: false,
            county: 'Levy County',
            hub: 'PRIMARY HUB: WILLISTON & BRONSON',
            desc: 'Honoring rural traditions with sturdy custom farmhouses, complete home renovations, and durable agricultural structural assistance built on reliable family values.',
            img: feature1Img
        },
        {
            id: 6,
            isHq: false,
            county: 'Volusia County',
            hub: 'PRIMARY HUB: DAYTONA BEACH & DELAND',
            desc: 'Adapting layouts for coastal homes, high-impact window/door installations, and robust commercial remodels that stand strong against severe Atlantic weather.',
            img: interierImg
        },
        {
            id: 7,
            isHq: false,
            county: 'Putnam County',
            hub: 'PRIMARY HUB: PALATKA',
            desc: 'Dedicated to historic preservation, structural carpentry updates, and generational remodeling that preserves original charm while upgrading vital safety specs.',
            img: feature2Img
        },
        {
            id: 8,
            isHq: false,
            county: 'Alachua County',
            hub: 'PRIMARY HUB: GAINESVILLE',
            desc: 'Serving custom residential designs, modern commercial updates, and detailed multi-room remodeling optimized for architectural elegance and modern utility.',
            img: roomImg
        }
    ];

    const regionalFeatures = [
        {
            icon: 'fa-solid fa-file-contract',
            title: 'Permitting Familiarity',
            desc: 'Each municipal boundary holds specific ordinances. We maintain long-standing operational relationships with building departments across all 8 active counties, ensuring rapid permit approvals with zero unexpected compliance friction.'
        },
        {
            icon: 'fa-solid fa-shield-halved',
            title: 'Shoreline & Wind Engineering',
            desc: 'From beach-facing Volusia lots to high-water Lake County docks, we build with strict structural defenses, implementing specialized storm strapping, storm-rated impact glazings, and advanced moisture-barrier applications.'
        },
        {
            icon: 'fa-solid fa-user-group',
            title: 'Generational Craft Coordination',
            desc: 'Rooted locally since 1984, our family works exclusively with trusted, certified local trade sub-contractors, concrete suppliers, and specialty technicians who share our precise standards for excellence and punctuality.'
        }
    ];

    return (
        <div className="area-we-serve-page contact-page">
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
                                text="Central Florida Coverage"
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
                                text="Areas We Serve"
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
                            Rooted in Ocala, our fleets and project crews cover eight counties, delivering generational masonry, custom carpentry, and architectural finishes right to your property.
                        </p>
                    </div>
                </div>
            </section>

            {/* Interactive Map Locality Section */}
            <section className={`locality-section ${isLocalityVisible ? 'animate-in' : ''}`} ref={localityRef}>
                <div className="locality-bg-map-wrapper">
                    <div className="locality-map-box">
                        <img src={mapImg} alt="Central Florida Map" className="locality-map-img" />
                        {mapPins.map((pin) => (
                            <div
                                key={pin.id}
                                className="locality-pin-wrapper"
                                style={{
                                    top: pin.top,
                                    left: pin.left,
                                    width: pin.size,
                                    height: pin.size,
                                    animationDelay: pin.delay,
                                }}
                                title={pin.name}
                            >
                                <img src={locationIcon} alt={pin.name} className="locality-pin-img" />
                                <span className="pin-pulse"></span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="locality-container">
                    <div className="locality-content">
                        <span className="locality-tag reveal-zoom">LOCALITY</span>
                        <h2 className="locality-title reveal-zoom" data-delay="150">
                            Proudly Serving<br />Central Florida
                        </h2>
                        <p className="locality-desc reveal-zoom" data-delay="300">
                            Generations of masonry, meticulous woodwork, and custom framing define our identity. From our primary operational base in Marion County, Ferrentino &amp; Son deploys seasoned crews, master craftsmen, and advanced equipment to custom build or renovate high-end properties in eight central counties.
                        </p>

                        <div className="locality-active-label reveal-zoom" data-delay="400">
                            CURRENTLY ACTIVE COUNTIES:
                        </div>

                        <div className="locality-pills-container reveal-zoom" data-delay="450">
                            <span className="locality-pill locality-pill-hq">Marion (Home Base)</span>
                            <span className="locality-pill">Lake</span>
                            <span className="locality-pill">Citrus</span>
                            <span className="locality-pill">Sumter</span>
                            <span className="locality-pill">Levy</span>
                            <span className="locality-pill">Volusia</span>
                            <span className="locality-pill">Putnam</span>
                            <span className="locality-pill">Alachua</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 2: Explore Active Counties (8 County Cards) */}
            <section className="aws-counties-section">
                <div className="aws-counties-container">
                    <div className="aws-header-text reveal-zoom">
                        <h2 className="aws-main-title">Explore Active Counties</h2>
                        <p className="aws-sub-desc">
                            Click a county below to understand local guidelines, regional project hubs, and specialized building crews available for your address.
                        </p>
                    </div>

                    <div className="aws-cards-grid">
                        {countyCards.map((card, idx) => (
                            <Link
                                key={card.id}
                                to="/area-we-serve-view"
                                className="aws-card reveal-zoom"
                                data-delay={(idx % 4) * 100}
                                style={{ textDecoration: 'none' }}
                            >
                                <div className="aws-card-img-box">
                                    <img src={card.img} alt={card.county} />
                                    {/* {card.isHq && (
                                        <span className="aws-hq-badge">{card.hqBadge}</span>
                                    )} */}
                                </div>

                                <div className="aws-card-body">
                                    <h3 className="aws-card-county">{card.county}</h3>
                                    <span className="aws-card-hub">{card.hub}</span>
                                    <p className="aws-card-desc">{card.desc}</p>
                                    <div className="aws-card-footer">
                                        <span className="aws-inquire-link">
                                            INQUIRE IN COUNTY <i className="fa-solid fa-arrow-right"></i>
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section 3: Built With Regional Authority */}
            <section className="aws-authority-section">
                <div className="aws-authority-container">
                    <div className="aws-authority-header reveal-zoom">
                        <h2 className="aws-auth-title">Built With Regional Authority</h2>
                        <p className="aws-auth-desc">
                            Building in central Florida demands hyper-local fluency. Here is how Ferrentino &amp; Son delivers uncompromised reliability from city blocks to shoreline communities.
                        </p>
                    </div>

                    <div className="aws-auth-grid">
                        {regionalFeatures.map((feat, idx) => (
                            <div key={idx} className="aws-auth-card reveal-zoom" data-delay={idx * 150}>
                                <div className="aws-auth-icon-badge">
                                    <i className={feat.icon}></i>
                                </div>
                                <h3 className="aws-auth-card-title">{feat.title}</h3>
                                <p className="aws-auth-card-desc">{feat.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <ReadyCta />
        </div>
    );
};

export default AreaWeServe;
