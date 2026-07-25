import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Newsletter() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section
      className="section-padding text-center"
      style={{ backgroundColor: "var(--color-deep)" }}
    >
      <p
        className="text-label mb-6 tracking-[0.4em]"
        style={{ color: "var(--color-accent)" }}
      >
        {t("newsletter.label")}
      </p>
      <h2
        className="heading-display text-4xl md:text-6xl mb-6"
        style={{ color: "var(--color-secondary)" }}
      >
        {t("newsletter.title")}
      </h2>
      <p
        className="text-body-elegant text-lg max-w-lg mx-auto mb-12"
        style={{ color: "var(--color-muted)" }}
      >
        {t("newsletter.desc")}
      </p>

      {submitted ? (
        <p
          className="heading-editorial text-xl"
          style={{ color: "var(--color-secondary)" }}
        >
          {t("newsletter.thanks")}
        </p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("newsletter.placeholder")}
            required
            className="flex-1 bg-transparent border-b py-3 text-body-elegant outline-none placeholder:text-[var(--color-muted)]"
            style={{
              color: "var(--color-secondary)",
              borderColor: "var(--color-muted)",
            }}
          />
          <button
            type="submit"
            className="magnetic-btn shrink-0"
            style={{
              color: "var(--color-secondary)",
              borderColor: "var(--color-secondary)",
            }}
          >
            <span>{t("newsletter.cta")}</span>
          </button>
        </form>
      )}
    </section>
  );
}
