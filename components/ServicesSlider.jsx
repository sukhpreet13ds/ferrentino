"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const ServicesSlider = ({ services }) => {
  const router = useRouter();
  const servicesData = services || [];
  const extendedServices = [...servicesData, ...servicesData, ...servicesData];

  const [currentIndex, setCurrentIndex] = useState(servicesData.length);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [visibleSlides, setVisibleSlides] = useState(3);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  const isHoveredRef = useRef(false);

  useEffect(() => {
    const updateVisibleSlides = () => {
      const width = window.innerWidth;
      if (width <= 576) {
        setVisibleSlides(1);
      } else if (width <= 991) {
        setVisibleSlides(2);
      } else {
        setVisibleSlides(3);
      }
    };

    updateVisibleSlides();
    window.addEventListener("resize", updateVisibleSlides);
    return () => window.removeEventListener("resize", updateVisibleSlides);
  }, []);

  useEffect(() => {
    if (servicesData.length === 0) return;
    const timer = setInterval(() => {
      if (!isDragging && !isHoveredRef.current && !document.hidden) {
        setIsTransitioning(true);
        setCurrentIndex((prev) => {
          const next = prev + 1;
          if (next >= servicesData.length * 2) {
            return next - servicesData.length;
          }
          return next;
        });
      }
    }, 3500);

    return () => clearInterval(timer);
  }, [isDragging, servicesData.length]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        setCurrentIndex((prev) => {
          if (prev >= servicesData.length * 2 || prev < servicesData.length) {
            setIsTransitioning(false);
            return (prev % servicesData.length) + servicesData.length;
          }
          return prev;
        });
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [servicesData.length]);

  const handleTransitionEnd = () => {
    if (currentIndex >= servicesData.length * 2) {
      setIsTransitioning(false);
      setCurrentIndex((prev) => prev - servicesData.length);
    } else if (currentIndex < servicesData.length) {
      setIsTransitioning(false);
      setCurrentIndex((prev) => prev + servicesData.length);
    }
  };

  useEffect(() => {
    if (!isTransitioning) {
      const animationFrame = requestAnimationFrame(() => {
        setIsTransitioning(true);
      });
      return () => cancelAnimationFrame(animationFrame);
    }
  }, [isTransitioning]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setDragOffset(0);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const currentX = e.clientX;
    const diff = currentX - startX;
    setDragOffset(diff);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragOffset < -50) {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev + 1);
    } else if (dragOffset > 50) {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev - 1);
    }
    setDragOffset(0);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleMouseUp();
    }
    isHoveredRef.current = false;
  };

  const handleMouseEnter = () => {
    isHoveredRef.current = true;
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setDragOffset(0);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - startX;
    setDragOffset(diff);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragOffset < -50) {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev + 1);
    } else if (dragOffset > 50) {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev - 1);
    }
    setDragOffset(0);
  };

  if (servicesData.length === 0) return null;

  return (
    <section className="services-slider-section">
      <div className="services-slider-container">
        <h2 className="services-slider-title reveal-zoom">Our Services</h2>

        <div
          className="services-slider-wrapper reveal-zoom"
          data-delay="200"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={handleMouseEnter}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="services-slider-track"
            style={{
              transform: `translateX(calc(-${currentIndex * (100 / visibleSlides)}% + ${dragOffset}px))`,
              transition: isDragging || !isTransitioning ? "none" : "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)",
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {extendedServices.map((service, index) => (
              <div
                className="services-slide-card"
                key={`${service.id}-${index}`}
                style={{ cursor: "pointer" }}
                onClick={() => router.push(`/services/${service.slug}`)}
              >
                <div className="services-image-box">
                  <img src={service.image} alt={service.title} draggable="false" />
                </div>
                <h3 className="services-card-title">{service.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSlider;
