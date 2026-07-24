import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./i18n";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import SmoothCursor from "./components/ui/SmoothCursor";
import LoadingScreen from "./components/ui/LoadingScreen";
import { useLenis } from "./hooks/useLenis";
import { getLocaleFromPath } from "./i18n/locale";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ProductListPage from "./pages/ProductListPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ContactPage from "./pages/ContactPage";

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

function LocalizedRoutes() {
  return (
    <Routes>
      {/* Unlocalized routes - redirect to /en */}
      <Route path="/" element={<Navigate to="/en" replace />} />

      {/* English routes */}
      <Route path="/en" element={<HomePage />} />
      <Route path="/en/about" element={<AboutPage />} />
      <Route path="/en/collection" element={<ProductListPage />} />
      <Route path="/en/product/:id" element={<ProductDetailPage />} />
      <Route path="/en/contact" element={<ContactPage />} />

      {/* Arabic routes */}
      <Route path="/ar" element={<HomePage />} />
      <Route path="/ar/about" element={<AboutPage />} />
      <Route path="/ar/collection" element={<ProductListPage />} />
      <Route path="/ar/product/:id" element={<ProductDetailPage />} />
      <Route path="/ar/contact" element={<ContactPage />} />

      {/* Catch-all redirect */}
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
      <SmoothCursor />
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
