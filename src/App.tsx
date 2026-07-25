import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import "./i18n";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import SmoothCursor from "./components/ui/SmoothCursor";
import CursorTrail from "./components/ui/CursorTrail";
import LoadingScreen from "./components/ui/LoadingScreen";
import { useLenis } from "./hooks/useLenis";
import { getLocaleFromPath } from "./i18n/locale";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ProductListPage from "./pages/ProductListPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ContactPage from "./pages/ContactPage";
import RitualsPage from "./pages/RitualsPage";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    const lenis = (window as any).__lenis;
    if (lenis) lenis.scrollTo(0, { immediate: true });
  }, [pathname]);
  return null;
}

function DirectionHandler() {
  const { i18n } = useTranslation();
  const location = useLocation();
  const locale = getLocaleFromPath(location.pathname);

  useEffect(() => {
    i18n.changeLanguage(locale);
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = locale;
  }, [locale, i18n]);

  return null;
}

function PageTransition() {
  const { pathname } = useLocation();
  const prevPath = useRef(pathname);

  useEffect(() => {
    if (prevPath.current !== pathname) {
      gsap.fromTo(
        "#page-transition-overlay",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.25,
          ease: "power2.in",
          onComplete: () => {
            gsap.to("#page-transition-overlay", {
              opacity: 0,
              duration: 0.6,
              ease: "power2.out",
              delay: 0.15,
            });
          },
        }
      );
      prevPath.current = pathname;
    }
  }, [pathname]);

  return (
    <div
      id="page-transition-overlay"
      className="fixed inset-0 z-[200] pointer-events-none"
      style={{ backgroundColor: "#1A1A1A", opacity: 0 }}
    />
  );
}

function LocalizedRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/en" replace />} />

      {/* English */}
      <Route path="/en" element={<HomePage />} />
      <Route path="/en/about" element={<AboutPage />} />
      <Route path="/en/rituals" element={<RitualsPage />} />
      <Route path="/en/collection" element={<ProductListPage />} />
      <Route path="/en/product/:id" element={<ProductDetailPage />} />
      <Route path="/en/contact" element={<ContactPage />} />

      {/* Arabic */}
      <Route path="/ar" element={<HomePage />} />
      <Route path="/ar/about" element={<AboutPage />} />
      <Route path="/ar/rituals" element={<RitualsPage />} />
      <Route path="/ar/collection" element={<ProductListPage />} />
      <Route path="/ar/product/:id" element={<ProductDetailPage />} />
      <Route path="/ar/contact" element={<ContactPage />} />

      <Route path="*" element={<Navigate to="/en" replace />} />
    </Routes>
  );
}

function AppContent() {
  useLenis();

  return (
    <>
      <ScrollToTop />
      <DirectionHandler />
      <PageTransition />
      <SmoothCursor />
      <CursorTrail />
      <LoadingScreen />
      <Navbar />
      <LocalizedRoutes />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
