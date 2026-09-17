import { useEffect } from "react";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Contractor from "./pages/Contractor";
import Projects from "./pages/Projects";
import Services from "./pages/Services";
import ServiceView from "./pages/ServiceView";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Gallery from "./components/Gallery";
import MeetTheBuilders from "./pages/MeetTheBuilders";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import ThankYou from "./pages/ThankYou";
import ErrorPage from "./pages/404";
import Estimator from "./pages/Estimator";
import ProjectView from "./pages/ProjectView";
import AskToExpert from "./pages/AskToExpert";
import Article from "./pages/Article";
import AreaWeServe from "./pages/AreaWeServe";
import AreaWeServeView from "./pages/AreaWeServeView";
import Testimonials from "./pages/Testimonials";

function RouteObserver() {
  const location = useLocation();

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
  }, [location.pathname]);

  return null;
}

function App() {
  return (
    <>
      <Router>
        <RouteObserver />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/contractor" element={<Contractor />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/project-view" element={<ProjectView />} />
          <Route path="/services" element={<Services />} />
          <Route path="/service-view" element={<ServiceView />} />
          <Route path="/estimator" element={<Estimator />} />
          <Route path="/ask-to-expert" element={<AskToExpert />} />
          <Route path="/articles" element={<Article />} />
          <Route path="/area-we-serve" element={<AreaWeServe />} />
          <Route path="/area-we-serve-view" element={<AreaWeServeView />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/meet-the-builders" element={<MeetTheBuilders />} />
          <Route path="/privacy-and-policy" element={<Privacy />} />
          <Route path="/terms-and-conditions" element={<Terms />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/404" element={<ErrorPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Gallery/>
        <Footer/>
      </Router>
    </>
  );
}

export default App;
