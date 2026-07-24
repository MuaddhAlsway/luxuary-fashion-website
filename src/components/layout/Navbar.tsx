import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { useLocale } from "../../hooks/useLocale";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();
  const { localizePath } = useLocale();

  const navLinks = [
    { label: t("nav.collection"), path: "/collection" },
    { label: t("nav.about"), path: "/about" },
    { label: t("nav.contact"), path: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        ".mobile-nav-link",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.2,
        }
      );
    }
  }, [isOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-700 ${
          scrolled ? "glass-panel py-4" : "bg-transparent py-6"
        }`}
      >
        <div className="flex items-center justify-between px-6 md:px-12">
          <Link to={localizePath("/")} className="relative z-[101]">
            <h1
              className="heading-display text-2xl md:text-3xl tracking-wider"
              style={{ color: "var(--color-text)" }}
            >
              MAISON
            </h1>
          </Link>

          <div className="hidden md:flex items-center gap-12">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={localizePath(link.path)}
                className="text-label relative group"
                style={{ color: "var(--color-text)" }}
              >
                {link.label}
                <span
                  className="absolute -bottom-1 left-0 w-0 h-px group-hover:w-full transition-all duration-500"
                  style={{ backgroundColor: "var(--color-text)" }}
                />
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              className="md:hidden relative z-[101] w-8 h-8 flex flex-col items-end justify-center gap-1.5"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span
                className={`block h-px w-8 transition-all duration-500 ${
                  isOpen ? "rotate-45 translate-y-[3.5px]" : ""
                }`}
                style={{ backgroundColor: "var(--color-text)" }}
              />
              <span
                className={`block h-px transition-all duration-500 ${
                  isOpen ? "w-8 -rotate-45 -translate-y-[3.5px]" : "w-5"
                }`}
                style={{ backgroundColor: "var(--color-text)" }}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-[99] flex flex-col items-center justify-center transition-all duration-700 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        style={{ backgroundColor: "var(--color-bg)" }}
      >
        <div className="flex flex-col items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={localizePath(link.path)}
              className="mobile-nav-link heading-display text-4xl"
              style={{ color: "var(--color-text)" }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
