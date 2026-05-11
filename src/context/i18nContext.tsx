import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { id as idTranslations } from "../locales/id";
import { en as enTranslations } from "../locales/en";

type Locale = "id" | "en";
type Translations = typeof idTranslations;

const translationsMap: Record<Locale, Translations> = {
  id: idTranslations,
  en: enTranslations,
};

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: keyof Translations, vars?: Record<string, string | number>) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    const saved = localStorage.getItem("preferred-locale") as Locale | null;
    return saved === "en" ? "en" : "id";
  });

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("preferred-locale", newLocale);
    // Update HTML lang attribute for screen readers
    document.documentElement.setAttribute("lang", newLocale);
    document.documentElement.setAttribute("dir", "ltr"); // Both ID and EN are LTR
  }, []);

  // Set initial lang attribute on mount
  useEffect(() => {
    document.documentElement.setAttribute("lang", locale);
    document.documentElement.setAttribute("dir", "ltr");
  }, [locale]);

  const t = useCallback(
    (key: keyof Translations, vars?: Record<string, string | number>): string => {
      const translations = translationsMap[locale];
      let text = (translations[key] as string) ?? (idTranslations[key] as string) ?? String(key);
      if (vars) {
        Object.entries(vars).forEach(([k, v]) => {
          text = text.replace(`{{${k}}}`, String(v));
        });
      }
      return text;
    },
    [locale]
  );

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
