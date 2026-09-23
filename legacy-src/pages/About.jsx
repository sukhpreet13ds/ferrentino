import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style/style.css';
import aboutHeroBg from '../assets/about-bg.jpg';
import familyImg from '../assets/family.png';
import missionRightImg from '../assets/mission-right.jpg';
import barbaraImg from '../assets/Barbara.jpg';
import edwardImg from '../assets/Edward.webp';
import coreBg from '../assets/core-bg.jpg';
import SplitText from '../components/SplitText';
import ReadyCta from '../components/ReadyCta';

const About = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const codeOfCicc = [
        { num: '01', text: 'Acknowledge and act on all customer concerns.' },
        { num: '02', text: 'Treat all we do business with like they are "in the family."' },
        { num: '03', text: 'Give back to the community.' },
        { num: '04', text: 'Conduct business operations in a manner that is transparent, legal, ethical, & fair.' },
        { num: '05', text: 'Comply both in spirit & letter with rules and regulations prescribed by Federal, State, & community laws.' },
        { num: '06', text: 'Avoid using any statement or implications which may be perceived as deceptive.' },
        { num: '07', text: 'Accurately & honestly describe the price, materials, & standards of craftsmanship and craftsmanship used on our projects—and document, document, document.' },
        { num: '08', text: 'Use only materials equal to or exceeding the quality specified in the contract, and follow all manufacture recommendations.' },
        { num: '09', text: 'Start construction upon award of a contract & proceed diligently to completion without unnecessary delays.' }
    ];

    return (
        <div className="about-page">
            {/* Hero Section */}
            <section
                className="about-hero-section"
                style={{ backgroundImage: `url(${aboutHeroBg})` }}
            >
                <div className="about-hero-overlay"></div>

                <div className="about-hero-container">
                    <div className="about-hero-content">
                        <span className="about-hero-tag">
                            <SplitText
                                text="Our Story"
                                className="about-tag-text"
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

                        <h1 className="about-hero-title">
                            <SplitText
                                text="Family Owned"
                                className="about-title-line"
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
                                text="Since 1920"
                                className="about-title-line"
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

                        <p className="about-hero-desc">
                            In 1920 <a style={{ color: 'inherit' }} href='https://www.ancestry.com/offers/join?dbid=2442&img=1&rtype=1&url=http%3A%2F%2Fwww.ancestry.com%2Fimageviewer%2Fcollections%2F2442%2Fimages%2Fm-t0627-02745-00143%3Fbacklabel%3DReturn%26pId%3D3795720%26ssrc%3D' target='_blank' rel='noopener noreferrer'>Amedeo “Tom” Ferrentino</a> arrived at Ellis Island, NY from Trieste, Italy as a humble brick layer. His passion for craftsmanship and quality construction laid the foundation for over FIVE GENERATIONS! The Ferrentinos have been building dreams ever since.
                        </p>
                    </div>

                    <div className="about-hero-image-wrapper">
                        <img src={familyImg} alt="Ferrentino Family" className="about-hero-image" />
                    </div>
                </div>
            </section>

            {/* Section 1: It's A Legacy */}
            <section className="about-legacy-section">
                <div className="about-legacy-container">
                    <div className="legacy-left reveal-zoom">
                        <span className="section-tag-light">1920 — TODAY</span>
                        <h2 className="legacy-title">It’s A Legacy</h2>
                        <div className="legacy-title-underline"></div>
                    </div>

                    <div className="legacy-right reveal-zoom" data-delay="200">
                        <p>
                            Starting out small in 1984, 3rd Generation Builder Eddie "Pop Pop" and his wife Barbara "Nana" Ferrentino, began Ferrentino &amp; Son. Ferrentino &amp; Son has blossomed into not just a respected contractor but a 'go-to' kitchen and bathroom remodeling company. Ferrentino &amp; Son is in the business of making dreams turn into reality. We started with Pop Pop &amp; Nana's dream of passing the family business down to the next two generations became a reality in 2018 when Barbara handed over the reigns her son Edward "Cicc" Ferrentino &amp; his wife, Shawna Ferrentino. Cicc &amp; Shawna are continuing the dream by teaching the construction business/trades to Barbara's Grandchildren Cody &amp; Caylea Fort. The Ferrentinos are now dreaming of creating a vocational trade school for 9-12 grade youth.
                        </p>
                        <p>
                            When you are looking to invest time and energy into remodeling your home, it pays to know the company that sets the bar for exceptional quality, incomparable design, and outstanding service. You can be absolutely certain Ferrentino &amp; Son fits the bill perfectly.
                        </p>
                    </div>
                </div>
            </section>

            {/* Section 2: Yellow Banner */}
            <section className="about-yellow-banner">
                <div className="banner-container">
                    <h2 className="banner-text reveal-zoom">Working together to build your dream home.</h2>
                    <Link to="/estimator" className="btn-banner-estimate reveal-zoom" data-delay="150">
                        Get an Instant Estimate <i className="fa-solid fa-arrow-right"></i>
                    </Link>
                </div>
            </section>

            {/* Section 3: Our Mission Statement */}
            <section className="about-mission-section">
                <div className="about-mission-container">
                    <div className="mission-left reveal-zoom">
                        <span className="section-tag-light">OUR MISSION STATEMENT</span>
                        <h2 className="mission-title">We listen first. Then we build dreams.</h2>
                        <p className="mission-desc">
                            Our mission is to build dreams, by listening, getting to know our client's needs/wants or DREAMS, and understanding how the project will change their lives through providing high quality remodeling services with honest tradeswomen/tradesmen.
                        </p>
                    </div>

                    <div className="mission-right reveal-zoom" data-delay="200">
                        <div className="mission-img-wrapper">
                            <img src={missionRightImg} alt="Ferrentino craftsmen at work" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 4: Founding Woman (Dark Section) */}
            <section className="about-barbara-section">
                <div className="about-barbara-container">
                    <div className="barbara-left reveal-zoom">
                        <span className="section-tag-gold">FOUNDING WOMAN</span>
                        <h2 className="barbara-title">The benchmark for better building.</h2>
                        <div className="barbara-img-wrapper">
                            <img src={barbaraImg} alt="Barbara Ferrentino" />
                        </div>
                    </div>

                    <div className="barbara-right reveal-zoom" data-delay="200">
                        <p className="barbara-p">
                            Barbara Ferrentino spent decades building more than homes in Ocala. She helped build a family legacy.
                        </p>
                        <p className="barbara-p">
                            As co-founder of Ferrentino &amp; Son and the first woman Certified Master Builder in Ocala, Barbara helped pave the way for women in the construction industry while growing a family business rooted in craft and community.
                        </p>
                        <p className="barbara-p">
                            Since founding Ferrentino &amp; Son with her husband, Eddie "Pop Pop" Ferrentino, in 1984, she has played an important role in shaping the company into what it is today.
                        </p>

                        <div className="barbara-quote-badge">
                            <p>Barbara Ferrentino, 1st Woman Certified Master Builder</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 5: The Code of Cicc */}
            <section className="about-code-section">
                <div className="about-code-container">
                    <div className="code-left reveal-zoom">
                        <span className="section-tag-light">THE STANDARD WE LIVE BY</span>
                        <h2 className="code-title">The Code of Cicc</h2>
                        <div className="edward-img-wrapper">
                            <img src={edwardImg} alt='Edward "Cicc" Ferrentino' />
                        </div>
                        <p className="edward-caption">Edward "Cicc" Ferrentino 4th Generation Builder</p>
                    </div>

                    <div className="code-right reveal-zoom" data-delay="200">
                        <div className="code-list">
                            {codeOfCicc.map((item) => (
                                <div key={item.num} className="code-item">
                                    <span className="code-num">{item.num}</span>
                                    <p className="code-text">{item.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 6: Core Community Values (Yellow BG with core-bg.jpg) */}
            <section
                className="about-core-section"
                style={{ backgroundImage: `url(${coreBg})` }}
            >
                <div className="core-overlay"></div>

                <div className="about-core-container">
                    <h2 className="core-main-title reveal-zoom">Core Community Values</h2>

                    <div className="core-cards-wrapper">
                        <div className="core-card reveal-zoom" data-delay="100">
                            <h3 className="core-card-title">Supporting Our Community</h3>
                            <p className="core-card-desc">
                                Support the company's effort in strengthening the communities in which we live, work, &amp; play. Support the volunteerism of our fellow employees.
                            </p>
                        </div>

                        <div className="core-card reveal-zoom" data-delay="200">
                            <h3 className="core-card-title">Superior Customer Experience</h3>
                            <p className="core-card-desc">
                                Our commitment to delivering excellent customer service by engaging with our homeowners, going beyond primary job completion and satisfying our efforts. We strive to provide a fast response with quality craftsmanship/craftswomenship, genuine concern, &amp; clear communication.
                            </p>
                        </div>

                        <div className="core-card reveal-zoom" data-delay="300">
                            <h3 className="core-card-title">Quality of Service</h3>
                            <p className="core-card-desc">
                                Take time to hire &amp; train the right employees. Continuously offering learning opportunities. Measure performance. Keep an open line of communication.
                            </p>
                        </div>

                        <div className="core-card reveal-zoom" data-delay="400">
                            <h3 className="core-card-title">Respect</h3>
                            <p className="core-card-desc">
                                Take time to understand the perspective of others. Value the contribution of others. Treat everyone with unfailing dignity.
                            </p>
                        </div>

                        <div className="core-card reveal-zoom" data-delay="500">
                            <h3 className="core-card-title">Honesty &amp; Integrity</h3>
                            <p className="core-card-desc">
                                Maintain truth in all interactions. Do not take the easy way out. Take accountability for our actions, without passing blame on others. Follow through on commitments.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <ReadyCta />
        </div>
    );
};

export default About;