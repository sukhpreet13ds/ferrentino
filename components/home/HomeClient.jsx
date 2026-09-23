"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import SplitText from "../SplitText";
import FoldText from "../FoldText";
import ServicesSlider from "../ServicesSlider";
import Projects from "../Projects";
import ReadyCta from "../ReadyCta";

const HomeClient = ({ data, services, projects }) => {
  const slides = data.heroSlides || [];
  const [currentSlide, setCurrentSlide] = useState(0);

  const animatedWords = data.animatedWords || ["built"];
  const [wordIndex, setWordIndex] = useState(0);

  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef(null);

  const [isLocalityVisible, setIsLocalityVisible] = useState(false);
  const localityRef = useRef(null);

  const mapPins = data.mapPins || [];
  const counties = data.counties || [];

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

  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  useEffect(() => {
    const wordTimer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % animatedWords.length);
    }, 3000);
    return () => clearInterval(wordTimer);
  }, [animatedWords.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const toggleVideoPlay = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
        setIsVideoPlaying(false);
      } else {
        videoRef.current.play();
        setIsVideoPlaying(true);
      }
    }
  };

  const countyCols = [counties.slice(0, 4), counties.slice(4, 8)];

  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-slider">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`hero-slide ${index === currentSlide ? "active" : ""}`}
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="hero-overlay"></div>
            </div>
          ))}
        </div>

        <div className="hero-content-wrapper">
          <div className="hero-content">
            <h1 className="hero-title">
              <SplitText
                text={data.heroTitleTop}
                className="hero-title-top"
                delay={50}
                duration={1.25}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="center"
                tag="span"
              />
              <SplitText
                text={data.heroTitleBottom}
                className="hero-title-bottom"
                delay={50}
                duration={1.25}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="center"
                tag="span"
              />
            </h1>

            <p className="hero-subtitle">{data.heroSubtitle}</p>

            <div className="hero-btn-container">
              <Link href="/estimator" className="btn-get-estimate">
                Get an Instant Estimate <i className="fa-solid fa-arrow-right btn-icon"></i>
              </Link>
            </div>
          </div>
        </div>

        <div className="hero-dots">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentSlide ? "active" : ""}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <div className="hero-learn-more">
          <a href="#about" className="learn-more-link">
            <div className="arrow-circle">
              <i className="fa-solid fa-arrow-down"></i>
            </div>
            <span>Learn More</span>
          </a>
        </div>
      </section>

      <section className="design-build-section" id="about">
        <div className="design-build-bg-left" style={{ backgroundImage: `url(${data.designBuildBgImage})` }}></div>

        <div className="design-build-container">
          <div className="design-build-top-row">
            <div className="design-build-top-spacer"></div>
            <div className="design-build-right-content">
              <h2 className="design-build-main-title reveal-zoom">{data.designBuildTitle}</h2>
              <h3 className="design-build-subtitle reveal-zoom" data-delay="150">
                {data.designBuildSubtitle}
              </h3>
              <p className="design-build-description reveal-zoom" data-delay="300">
                {data.designBuildDescription}
              </p>
            </div>
          </div>

          <div className="design-build-middle-accent">
            <h2 className="built-around-text reveal-zoom" data-delay="200">
              <span className="built-italic">
                <FoldText
                  key={animatedWords[wordIndex]}
                  text={animatedWords[wordIndex]}
                  splitBy="char"
                  hinge="top"
                  trigger="mount"
                  duration={0.65}
                  stagger={0.045}
                  ease="power3.out"
                  perspective={700}
                  creaseShading={0.55}
                />
              </span>{" "}
              <span>around you</span>
            </h2>
          </div>

          <div className="design-build-bottom-grid">
            <div className="design-build-col col-projects reveal-zoom" data-delay="100">
              <Link href="/projects" className="projects-circle-link">
                <div className="projects-arrow-circle">
                  <i className="fa-solid fa-arrow-right"></i>
                </div>
                <span>Look At Our Projects</span>
              </Link>
            </div>

            <div className="design-build-col col-apart reveal-zoom" data-delay="250">
              <h4 className="col-title">{data.whatSetsUsApartTitle}</h4>
              <p className="col-bold-sub">{data.whatSetsUsApartSubtitle}</p>
              <p className="col-desc">{data.whatSetsUsApartDescription}</p>
              <Link href="/estimator" className="btn-design-estimate">
                Get an Instant Estimate <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>

            <div className="design-build-col col-services reveal-zoom" data-delay="400">
              <h4 className="col-title">Our Services</h4>
              <ul className="services-list">
                {(data.homeServiceLinks || []).map((link) => (
                  <li key={link.id} style={{ cursor: "pointer" }}>
                    <Link
                      href={`/services/${link.slug}`}
                      style={{ color: "inherit", textDecoration: "none", display: "flex", alignItems: "center", gap: "8px" }}
                    >
                      <span className="services-grid-icon">
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="var(--primary-color)">
                          <rect x="0" y="0" width="6.5" height="6.5" rx="1" />
                          <rect x="9.5" y="0" width="6.5" height="6.5" rx="1" />
                          <rect x="0" y="9.5" width="6.5" height="6.5" rx="1" />
                          <rect x="9.5" y="9.5" width="6.5" height="6.5" rx="1" />
                        </svg>
                      </span>
                      <span>{link.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/services" className="view-all-services">
                VIEW ALL
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ServicesSlider services={services} />

      <Projects projects={projects} />

      <section className="video-confidence-section">
        <div className="video-confidence-container">
          <h2 className="video-confidence-title reveal-zoom">{data.videoSectionTitle}</h2>

          <div className="video-player-wrapper reveal-zoom" data-delay="200" onClick={toggleVideoPlay}>
            <video
              ref={videoRef}
              src={data.videoSrc}
              poster={data.videoPoster}
              playsInline
              controls={isVideoPlaying}
              onEnded={() => setIsVideoPlaying(false)}
              onPause={() => setIsVideoPlaying(false)}
              onPlay={() => setIsVideoPlaying(true)}
              className="confidence-video-element"
            />
            {!isVideoPlaying && (
              <div className="video-play-overlay">
                <button className="video-play-circle-btn" aria-label="Play Video">
                  <i className="fa-solid fa-play"></i>
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="reno-banner-section">
        <div className="reno-yellow-banner">
          <div className="reno-banner-container">
            <div className="reno-banner-grid">
              <div className="reno-banner-left reveal-zoom">
                <h2 className="reno-banner-left-title">{data.renoBannerLeftTitle}</h2>
                <Link href="/meet-the-builders" className="reno-learn-link">
                  <div className="reno-arrow-circle">
                    <i className="fa-solid fa-arrow-right"></i>
                  </div>
                  <span>Learn More</span>
                </Link>
              </div>

              <div className="reno-banner-right reveal-zoom" data-delay="200">
                <h3 className="reno-banner-right-title">{data.renoBannerRightTitle}</h3>
                <p className="reno-banner-right-desc">{data.renoBannerRightDescription}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="reno-testimonial-block">
          <div className="reno-testimonial-container">
            <div className="testimonial-stars reveal-zoom">
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
            </div>

            <span className="testimonial-label reveal-zoom" data-delay="100">CLIENT TESTIMONIAL</span>

            <div className="testimonial-quote-icon reveal-zoom" data-delay="150">
              <svg width="34" height="26" viewBox="0 0 34 26" fill="var(--primary-color)">
                <path d="M0 26V14.5C0 6.5 5.5 1 13.5 0L15.5 3.5C10.5 4.5 7.5 7.5 7 11.5H13.5V26H0ZM18.5 26V14.5C18.5 6.5 24 1 32 0L34 3.5C29 4.5 26 7.5 25.5 11.5H32V26H18.5Z" />
              </svg>
            </div>

            <blockquote className="testimonial-quote-text reveal-zoom" data-delay="250">
              {data.homeTestimonial?.quote}
            </blockquote>

            <div className="testimonial-attribution reveal-zoom" data-delay="350">
              <span className="author-name">&mdash; {data.homeTestimonial?.author}</span>
              <span className="author-location">{data.homeTestimonial?.location}</span>
            </div>
          </div>
        </div>
      </section>

      <section className={`locality-section ${isLocalityVisible ? "animate-in" : ""}`} ref={localityRef}>
        <div className="locality-bg-map-wrapper">
          <div className="locality-map-box">
            <img src={data.localityMapImage} alt="Central Florida Map" className="locality-map-img" />
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
                <img src={data.localityPinIcon} alt={pin.name} className="locality-pin-img" />
                <span className="pin-pulse"></span>
              </div>
            ))}
          </div>
        </div>

        <div className="locality-container">
          <div className="locality-content">
            <span className="locality-tag reveal-zoom">{data.localityTag}</span>
            <h2 className="locality-title reveal-zoom" data-delay="150">
              {data.localityTitle}
            </h2>
            <p className="locality-desc reveal-zoom" data-delay="300">
              {data.localityDescription}
            </p>

            <div className="locality-counties-grid reveal-zoom" data-delay="450">
              {countyCols.map((col, idx) => (
                <div className="locality-counties-col" key={idx}>
                  <ul className="locality-list">
                    {col.map((county) => (
                      <li key={county}>
                        <span className="bullet-dot">•</span> {county}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="years-102-section" style={{ backgroundImage: `url(${data.yearsBadgeBg})` }}>
        <div className="years-102-overlay"></div>
        <div className="years-102-container">
          <div className="years-102-left reveal-zoom">
            <h2 className="years-102-number">{data.yearsNumber}</h2>
          </div>
          <div className="years-102-right reveal-zoom" data-delay="200">
            <span className="years-102-subtitle">{data.yearsSubtitle}</span>
            <h3 className="years-102-title">
              {data.yearsTitleLine1}
              <br />
              <em>{data.yearsTitleLine2}</em>
              <br />
              {data.yearsTitleLine3}
              <br />
              {data.yearsTitleLine4}
            </h3>
          </div>
        </div>
      </section>

      <ReadyCta />
    </div>
  );
};

export default HomeClient;
