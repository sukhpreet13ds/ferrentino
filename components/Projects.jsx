"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Projects = ({ projects }) => {
  const router = useRouter();
  const projectsData = projects || [];
  const extendedProjects = [...projectsData, ...projectsData, ...projectsData];

  const [currentIndex, setCurrentIndex] = useState(projectsData.length);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isCursorVisible, setIsCursorVisible] = useState(false);

  const wrapperRef = useRef(null);
  const isHoveredRef = useRef(false);

  const handleNext = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  useEffect(() => {
    if (projectsData.length === 0) return;
    const timer = setInterval(() => {
      if (!isDragging && !isHoveredRef.current && !document.hidden) {
        handleNext();
      }
    }, 4000);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDragging, projectsData.length]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        setCurrentIndex((prev) => {
          if (prev >= projectsData.length * 2 || prev < projectsData.length) {
            setIsTransitioning(false);
            return (prev % projectsData.length) + projectsData.length;
          }
          return prev;
        });
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [projectsData.length]);

  const handleTransitionEnd = (e) => {
    if (e && e.target !== e.currentTarget) return;

    if (currentIndex >= projectsData.length * 2) {
      setIsTransitioning(false);
      setCurrentIndex((prev) => prev - projectsData.length);
    } else if (currentIndex < projectsData.length) {
      setIsTransitioning(false);
      setCurrentIndex((prev) => prev + projectsData.length);
    }
  };

  useEffect(() => {
    if (!isTransitioning) {
      const frame = requestAnimationFrame(() => {
        setIsTransitioning(true);
      });
      return () => cancelAnimationFrame(frame);
    }
  }, [isTransitioning]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setDragOffset(0);
    setIsCursorVisible(false);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const currentX = e.clientX;
      const diff = currentX - startX;
      setDragOffset(diff);
      return;
    }

    if (wrapperRef.current) {
      const rect = wrapperRef.current.getBoundingClientRect();
      setCursorPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragOffset < -50) {
      handleNext();
    } else if (dragOffset > 50) {
      handlePrev();
    }
    setDragOffset(0);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleMouseUp();
    }
    isHoveredRef.current = false;
    setIsCursorVisible(false);
  };

  const handleMouseEnter = () => {
    isHoveredRef.current = true;
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setDragOffset(0);
    setIsCursorVisible(false);
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
      handleNext();
    } else if (dragOffset > 50) {
      handlePrev();
    }
    setDragOffset(0);
  };

  if (projectsData.length === 0) return null;

  const activeProject = projectsData[((currentIndex % projectsData.length) + projectsData.length) % projectsData.length];

  return (
    <section className="projects-section" id="projects">
      <h2 className="projects-title reveal-zoom">Our Projects</h2>

      <div
        ref={wrapperRef}
        className="projects-slider-wrapper reveal-zoom"
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
          className={`projects-cursor-btn ${isCursorVisible && !isDragging ? "visible" : ""}`}
          style={{
            left: `${cursorPos.x}px`,
            top: `${cursorPos.y}px`,
            cursor: "pointer",
          }}
          onClick={() => router.push(`/projects/${activeProject.slug}`)}
        >
          <span>Explore Project</span>
          <i className="fa-solid fa-arrow-right projects-tilt-icon"></i>
        </div>

        <button className="projects-nav-btn btn-left" onClick={handlePrev} aria-label="Previous Project">
          <svg viewBox="0 0 22 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 2L2 16L20 30" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <button className="projects-nav-btn btn-right" onClick={handleNext} aria-label="Next Project">
          <svg viewBox="0 0 22 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 2L20 16L2 30" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div
          className="projects-slider-track"
          style={{
            transform: `translateX(calc(50% - (${currentIndex} * (var(--projects-card-width) + var(--projects-card-gap))) - (var(--projects-card-width) / 2) + ${dragOffset}px))`,
            transition: isDragging || !isTransitioning ? "none" : "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)",
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {extendedProjects.map((project, index) => {
            const isActive = index === currentIndex;

            return (
              <div
                key={`${project.id}-${index}`}
                className={`projects-card ${isActive ? "active" : ""}`}
                onMouseEnter={() => {
                  if (isActive) {
                    setIsCursorVisible(true);
                  } else {
                    setIsCursorVisible(false);
                  }
                }}
                onMouseLeave={() => {
                  setIsCursorVisible(false);
                }}
                onClick={() => {
                  if (index === currentIndex - 1) handlePrev();
                  else if (index === currentIndex + 1) handleNext();
                  else if (isActive) router.push(`/projects/${project.slug}`);
                }}
              >
                <img src={project.image} alt={project.title} className="projects-card-img" draggable="false" />

                <div className="projects-card-overlay"></div>

                <div className="projects-card-content">
                  <h3 className="projects-card-heading">{project.title}</h3>
                  <Link href={`/projects/${project.slug}`} className="projects-read-more" onClick={(e) => e.stopPropagation()}>
                    Read More <i className="fa-solid fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
