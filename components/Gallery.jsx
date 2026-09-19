"use client";

import { useState, useEffect, useRef } from "react";

const Gallery = ({ images }) => {
  const galleryImages = images && images.length > 0 ? images : [];
  const extendedGallery = [...galleryImages, ...galleryImages, ...galleryImages];

  const [currentIndex, setCurrentIndex] = useState(galleryImages.length);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [visibleSlides, setVisibleSlides] = useState(5);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  const isHoveredRef = useRef(false);

  useEffect(() => {
    const updateVisibleSlides = () => {
      const width = window.innerWidth;
      if (width <= 576) {
        setVisibleSlides(1.5);
      } else if (width <= 991) {
        setVisibleSlides(3);
      } else if (width <= 1200) {
        setVisibleSlides(4);
      } else {
        setVisibleSlides(5);
      }
    };

    updateVisibleSlides();
    window.addEventListener("resize", updateVisibleSlides);
    return () => window.removeEventListener("resize", updateVisibleSlides);
  }, []);

  useEffect(() => {
    if (galleryImages.length === 0) return;
    const timer = setInterval(() => {
      if (!isDragging && !isHoveredRef.current && !document.hidden) {
        setIsTransitioning(true);
        setCurrentIndex((prev) => {
          const next = prev + 1;
          if (next >= galleryImages.length * 2) {
            return next - galleryImages.length;
          }
          return next;
        });
      }
    }, 2800);

    return () => clearInterval(timer);
  }, [isDragging, galleryImages.length]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        setCurrentIndex((prev) => {
          if (prev >= galleryImages.length * 2 || prev < galleryImages.length) {
            setIsTransitioning(false);
            return (prev % galleryImages.length) + galleryImages.length;
          }
          return prev;
        });
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [galleryImages.length]);

  const handleTransitionEnd = () => {
    if (currentIndex >= galleryImages.length * 2) {
      setIsTransitioning(false);
      setCurrentIndex((prev) => prev - galleryImages.length);
    } else if (currentIndex < galleryImages.length) {
      setIsTransitioning(false);
      setCurrentIndex((prev) => prev + galleryImages.length);
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
    if (dragOffset < -40) {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev + 1);
    } else if (dragOffset > 40) {
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
    if (dragOffset < -40) {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev + 1);
    } else if (dragOffset > 40) {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev - 1);
    }
    setDragOffset(0);
  };

  if (galleryImages.length === 0) return null;

  return (
    <section className="gallery-section reveal-zoom">
      <div
        className={`gallery-slider-wrapper ${isDragging ? "dragging" : ""}`}
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
          className="gallery-slider-track"
          style={{
            transform: `translateX(calc(-${currentIndex * (100 / visibleSlides)}% + ${dragOffset}px))`,
            transition: isDragging || !isTransitioning ? "none" : "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)",
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {extendedGallery.map((item, index) => (
            <div className="gallery-slide-card" key={`${item.id}-${index}`}>
              <div className="gallery-image-box">
                <img src={item.image} alt={`Gallery ${item.id}`} draggable="false" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
