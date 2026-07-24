import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import type { Locale } from "../i18n/locale";
import {
  getLocaleFromPath,
  getPathWithoutLocale,
  getLocalizedPath,
} from "../i18n/locale";

export function useLocale() {
  const { i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const currentLocale: Locale = getLocaleFromPath(location.pathname);
  const pathWithoutLocale = getPathWithoutLocale(location.pathname);

  const switchLocale = (newLocale: Locale) => {
    i18n.changeLanguage(newLocale);
    const newPath = getLocalizedPath(location.pathname, newLocale);
    navigate(newPath, { replace: true });
  };

  const localizePath = (path: string) => {
    return getLocalizedPath(path, currentLocale);
  };

  return {
    currentLocale,
    pathWithoutLocale,
    switchLocale,
    localizePath,
  };
}
