import { useEffect } from "react";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Contractor from "./pages/Contractor";
import Navbar from "./components/Navbar";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  useEffect(() => {
    const handleObserve = () => {
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

      const observer = new IntersectionObserver(observerCallback, {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px",
      });

      const elements = document.querySelectorAll(".reveal-zoom");
      elements.forEach((el) => observer.observe(el));
    };

    handleObserve();

    // Re-observe periodically or after render to catch all dynamic components
    const timer = setTimeout(handleObserve, 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/contractor" element={<Contractor />} />
        </Routes>
      </Router>
    </>
  );
}

export default App
