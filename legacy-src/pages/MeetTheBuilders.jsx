import { useEffect } from 'react';
import './style/style.css';
import serviceHeroBg from '../assets/service-bg.png';
import barbaraImg from '../assets/Barbara.jpg';
import edwardImg from '../assets/Edward.jpg';
import shawnaImg from '../assets/shawna.jpg';
import SplitText from '../components/SplitText';

const MeetTheBuilders = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="meet-builders-page">
            {/* Hero Section */}
            <section
                className="builders-hero-section"
                style={{ backgroundImage: `url(${serviceHeroBg})` }}
            >
                <div className="builders-hero-overlay"></div>

                <div className="builders-hero-container">
                    <div className="builders-hero-content">
                        <span className="builders-hero-tag">
                            <SplitText
                                text="MEET THE BUILDERS"
                                className="builders-tag-text"
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

                        <h1 className="builders-hero-title">
                            <SplitText
                                text="The Masters"
                                className="builders-title-line"
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
                                text="Behind Every Build"
                                className="builders-title-line"
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

                        <p className="builders-hero-desc">
                            Decades of passion, generational expertise, and dedicated leadership driving every custom home and renovation project across Central Florida.
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Alternating Builders Section */}
            <section className="builders-main-section">
                <div className="builders-main-container">

                    {/* Builder 1: Barbara Ferrentino (Content Left, Image Right) */}
                    <div className="builder-row">
                        <div className="builder-content-col reveal-zoom">
                            <span className="builder-role-tag">CO-FOUNDER &amp; 1ST WOMAN CERTIFIED MASTER BUILDER</span>
                            <h2 className="builder-name">Barbara Ferrentino</h2>
                            <div className="builder-accent-line"></div>

                            <p className="builder-bio">
                                Barbara is not only the 1st Woman Certified Master Builder; she is also a leader in and out of the office, and a sweet heart of a mom, Nana, and dog mom. You may see her walking sites, or walking Toby, her poodle, around the neighborhood. She is the reason for the company existing today and the passion behind building dreams.
                            </p>
                            <p className="builder-bio">
                                Barbara recently had an article written about her for the Habitat Ocala Woman Build.
                            </p>

                            <a
                                href="https://www.facebook.com/61575031022080/posts/122122506974834367/?mibextid=wwXIfr&rdid=AhHMfbKRw17tZndR#"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-read-article"
                            >
                                Click here and enjoy the read! <i className="fa-solid fa-arrow-up-right-from-square"></i>
                            </a>
                        </div>

                        <div className="builder-img-col reveal-zoom" data-delay="150">
                            <div className="builder-img-box">
                                <img src={barbaraImg} alt="Barbara Ferrentino" />
                            </div>
                        </div>
                    </div>

                    {/* Builder 2: Edward "Cicc" Ferrentino (Image Left, Content Right) */}
                    <div className="builder-row builder-row-reversed">
                        <div className="builder-img-col reveal-zoom">
                            <div className="builder-img-box">
                                <img src={edwardImg} alt='Edward "Cicc" Ferrentino' />
                            </div>
                        </div>

                        <div className="builder-content-col reveal-zoom" data-delay="150">
                            <span className="builder-role-tag">4TH GENERATION BUILDER &amp; 2ND GENERATION EDWARD</span>
                            <h2 className="builder-name">Edward "Cicc" Ferrentino</h2>
                            <div className="builder-accent-line"></div>

                            <p className="builder-bio">
                                4th generation builder and 2nd generation Edward, Cicc carries his legacy proudly. As son of the founder of Ferrentino &amp; Son and the 1st Woman Certified Master Builder, Cicc was raised with a passion for building.
                            </p>
                            <p className="builder-bio">
                                After the passing of his father, Cicc has made it his life’s mission to carry on the good name and unique quality of all of the great Ferrentinos before him.
                            </p>
                        </div>
                    </div>

                    {/* Builder 3: Shawna Ferrentino (Content Left, Image Right) */}
                    <div className="builder-row">
                        <div className="builder-content-col reveal-zoom">
                            <span className="builder-role-tag">CO-OWNER &amp; EXECUTIVE DIRECTOR OF CONSTRUCTION</span>
                            <h2 className="builder-name">Shawna Ferrentino</h2>
                            <div className="builder-accent-line"></div>
                            <p className="builder-bio">
                              My vision is to build more than just structures. I strive to create lasting value by delivering projects with precision, integrity, and innovation. As a woman in construction, I am committed to empowering others in the industry while giving back through active community involvement. Every project is an opportunity to strengthen connections, uplift people, and leave a positive legacy for future generations.
                            </p>
                        </div>

                        <div className="builder-img-col reveal-zoom" data-delay="150">
                            <div className="builder-img-box">
                                <img src={shawnaImg} alt="Shawna Ferrentino" />
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
};

export default MeetTheBuilders;