import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import MagneticButton from "../components/ui/MagneticButton";

export default function ContactPage() {
  const { t } = useTranslation();
  const pageRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-hero-title",
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.3 }
      );
      gsap.fromTo(
        ".contact-hero-sub",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.6 }
      );
      gsap.fromTo(
        ".contact-form",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.9 }
      );
      gsap.fromTo(
        ".contact-info",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 1.1 }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const inputClasses =
    "w-full bg-transparent border-b py-3 text-body-elegant outline-none transition-colors duration-300 focus:border-[var(--color-text)] placeholder:text-[var(--color-muted)]";
  const inputStyle = {
    color: "var(--color-text)",
    borderColor: "var(--color-accent)",
  };

  return (
    <main ref={pageRef}>
      {/* Hero */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: "var(--color-secondary)",
            backgroundImage:
              "url(https://images.unsplash.com/photo-1541643600914-78b084683601?w=1920&h=1080&fit=crop&q=80)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(168,161,147,0.4)" }}
        />
        <div className="relative z-10 text-center px-6">
          <p
            className="text-label mb-6 tracking-[0.4em]"
            style={{ color: "var(--color-muted)" }}
          >
            {t("contact.label")}
          </p>
          <h1
            className="contact-hero-title heading-display text-6xl md:text-9xl mb-6"
            style={{ color: "var(--color-text)" }}
          >
            {t("contact.title")}
          </h1>
          <p
            className="contact-hero-sub text-body-elegant text-xl max-w-lg mx-auto"
            style={{ color: "var(--color-text)", opacity: 0.7 }}
          >
            {t("contact.subtitle")}
          </p>
        </div>
      </section>

      {/* Form + Info */}
      <section
        className="section-padding"
        style={{ backgroundColor: "var(--color-bg)" }}
      >
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          {/* Form */}
          <form onSubmit={handleSubmit} className="contact-form flex flex-col gap-10">
            <div>
              <label
                className="text-label tracking-[0.2em] mb-2 block"
                style={{ color: "var(--color-muted)" }}
              >
                {t("contact.name")}
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder={t("contact.namePlaceholder")}
                className={inputClasses}
                style={inputStyle}
              />
            </div>
            <div>
              <label
                className="text-label tracking-[0.2em] mb-2 block"
                style={{ color: "var(--color-muted)" }}
              >
                {t("contact.email")}
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder={t("contact.emailPlaceholder")}
                className={inputClasses}
                style={inputStyle}
              />
            </div>
            <div>
              <label
                className="text-label tracking-[0.2em] mb-2 block"
                style={{ color: "var(--color-muted)" }}
              >
                {t("contact.subject")}
              </label>
              <select
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
                className={`${inputClasses} appearance-none cursor-pointer`}
                style={inputStyle}
              >
                <option value="">{t("contact.subjectPlaceholder")}</option>
                <option value="consultation">{t("contact.optConsultation")}</option>
                <option value="bespoke">{t("contact.optBespoke")}</option>
                <option value="gift">{t("contact.optGift")}</option>
                <option value="press">{t("contact.optPress")}</option>
                <option value="other">{t("contact.optOther")}</option>
              </select>
            </div>
            <div>
              <label
                className="text-label tracking-[0.2em] mb-2 block"
                style={{ color: "var(--color-muted)" }}
              >
                {t("contact.message")}
              </label>
              <textarea
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                placeholder={t("contact.messagePlaceholder")}
                rows={5}
                className={`${inputClasses} resize-none`}
                style={inputStyle}
              />
            </div>
            <div>
              <MagneticButton>{t("contact.send")}</MagneticButton>
            </div>
          </form>

          {/* Info */}
          <div className="contact-info flex flex-col gap-12">
            <div>
              <h3
                className="heading-display text-3xl mb-6"
                style={{ color: "var(--color-text)" }}
              >
                {t("contact.visitTitle")}
              </h3>
              <p
                className="text-body-elegant text-lg mb-2"
                style={{ color: "var(--color-text)", opacity: 0.7 }}
              >
                Maison Atelier
              </p>
              <p
                className="text-body-elegant text-lg mb-2"
                style={{ color: "var(--color-text)", opacity: 0.7 }}
              >
                {t("contact.address1")}
              </p>
              <p
                className="text-body-elegant text-lg"
                style={{ color: "var(--color-text)", opacity: 0.7 }}
              >
                {t("contact.address2")}
              </p>
            </div>

            <div className="divider-line" />

            <div>
              <h3
                className="heading-display text-3xl mb-6"
                style={{ color: "var(--color-text)" }}
              >
                {t("contact.hoursTitle")}
              </h3>
              <p
                className="text-body-elegant text-lg mb-2"
                style={{ color: "var(--color-text)", opacity: 0.7 }}
              >
                {t("contact.hoursWeekday")}
              </p>
              <p
                className="text-body-elegant text-lg"
                style={{ color: "var(--color-text)", opacity: 0.7 }}
              >
                {t("contact.hoursWeekend")}
              </p>
            </div>

            <div className="divider-line" />

            <div>
              <h3
                className="heading-display text-3xl mb-6"
                style={{ color: "var(--color-text)" }}
              >
                {t("contact.reachTitle")}
              </h3>
              <p
                className="text-body-elegant text-lg mb-2"
                style={{ color: "var(--color-text)", opacity: 0.7 }}
              >
                {t("contact.phone")}
              </p>
              <p
                className="text-body-elegant text-lg"
                style={{ color: "var(--color-text)", opacity: 0.7 }}
              >
                {t("contact.emailAddress")}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
