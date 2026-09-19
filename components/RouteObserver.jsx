"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function RouteObserver() {
  const pathname = usePathname();

  useEffect(() => {
    let activeObserver = null;

    const handleObserve = () => {
      if (activeObserver) {
        activeObserver.disconnect();
      }

      const observerCallback = (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            if (el.dataset.delay) {
              el.style.animationDelay = `${el.dataset.delay}ms`;
            }
            el.classList.add("is-visible", "animate__animated", "animate__zoomIn");
            observer.unobserve(el);
          }
        });
      };

      activeObserver = new IntersectionObserver(observerCallback, {
        threshold: 0.05,
        rootMargin: "0px 0px -20px 0px",
      });

      const elements = document.querySelectorAll(".reveal-zoom");
      elements.forEach((el) => {
        if (!el.classList.contains("is-visible")) {
          activeObserver.observe(el);
        }
      });
    };

    handleObserve();
    const t1 = setTimeout(handleObserve, 150);
    const t2 = setTimeout(handleObserve, 450);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      if (activeObserver) {
        activeObserver.disconnect();
      }
    };
  }, [pathname]);

  return null;
}
