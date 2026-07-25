import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLocale } from "../../hooks/useLocale";

export default function Footer() {
  const { t } = useTranslation();
  const { localizePath } = useLocale();

  const footerLinks = [
    {
      title: t("footer.maison"),
      links: [
        { label: t("footer.ourStory"), path: "/about" },
        { label: t("nav.rituals"), path: "/rituals" },
        { label: t("footer.sustainability"), path: "/about" },
      ],
    },
    {
      title: t("footer.collection"),
      links: [
        { label: t("footer.allFragrances"), path: "/collection" },
        { label: t("footer.oudCollection"), path: "/collection" },
        { label: t("footer.limitedEdition"), path: "/collection" },
      ],
    },
    {
      title: t("footer.experience"),
      links: [
        { label: t("footer.privateConsultation"), path: "/contact" },
        { label: t("footer.giftService"), path: "/contact" },
        { label: t("footer.bespokeFragrance"), path: "/contact" },
      ],
    },
  ];

  return (
    <footer
      className="relative px-6 md:px-12 pt-24 pb-12"
      style={{ backgroundColor: "var(--color-deep)" }}
    >
      <div className="divider-line mb-16" />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
        <div>
          <h2
            className="heading-display text-4xl mb-6"
            style={{ color: "var(--color-secondary)" }}
          >
            MAISON
          </h2>
          <p
            className="text-body-elegant text-sm max-w-xs"
            style={{ color: "var(--color-muted)" }}
          >
            {t("footer.desc")}
          </p>
        </div>

        {footerLinks.map((group) => (
          <div key={group.title}>
            <h3
              className="text-label mb-6"
              style={{ color: "var(--color-accent)" }}
            >
              {group.title}
            </h3>
            <ul className="flex flex-col gap-3">
              {group.links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={localizePath(link.path)}
                    className="text-sm transition-colors duration-300 hover:opacity-70"
                    style={{ color: "var(--color-muted)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="divider-line mb-8" />

      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <p
          className="text-xs"
          style={{ color: "var(--color-muted)", opacity: 0.6 }}
        >
          &copy; 2026 Maison. {t("footer.rights")}
        </p>
        <div className="flex gap-6">
          {["Instagram", "Pinterest", "Twitter"].map((social) => (
            <a
              key={social}
              href="#"
              className="text-xs uppercase tracking-widest transition-opacity duration-300 hover:opacity-70"
              style={{ color: "var(--color-muted)" }}
            >
              {social}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
