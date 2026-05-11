import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";

interface A11ySettings {
  dyslexicFont: boolean;
  highContrast: boolean;
  reducedMotion: boolean;
  fontSize: number; // percentage: 90 | 100 | 110 | 120 | 130
}

interface A11yContextValue extends A11ySettings {
  toggleDyslexicFont: () => void;
  toggleHighContrast: () => void;
  toggleReducedMotion: () => void;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  resetFontSize: () => void;
  resetAll: () => void;
}

const defaultSettings: A11ySettings = {
  dyslexicFont: false,
  highContrast: false,
  reducedMotion: false,
  fontSize: 100,
};

const FONT_STEPS = [90, 100, 110, 120, 130];

const A11yContext = createContext<A11yContextValue | null>(null);

function loadSettings(): A11ySettings {
  try {
    const saved = localStorage.getItem("a11y-settings");
    if (saved) return { ...defaultSettings, ...JSON.parse(saved) };
  } catch {
    // ignore
  }
  return { ...defaultSettings };
}

function applySettings(settings: A11ySettings) {
  const html = document.documentElement;

  // Font size
  html.style.fontSize = `${settings.fontSize}%`;

  // Dyslexic font
  if (settings.dyslexicFont) {
    html.setAttribute("data-font", "dyslexic");
  } else {
    html.removeAttribute("data-font");
  }

  // High contrast
  if (settings.highContrast) {
    html.setAttribute("data-high-contrast", "true");
  } else {
    html.removeAttribute("data-high-contrast");
  }

  // Reduced motion
  if (settings.reducedMotion) {
    html.setAttribute("data-reduce-motion", "true");
  } else {
    html.removeAttribute("data-reduce-motion");
  }
}

export function A11yProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<A11ySettings>(loadSettings);

  // Apply settings to DOM on change
  useEffect(() => {
    applySettings(settings);
    localStorage.setItem("a11y-settings", JSON.stringify(settings));
  }, [settings]);

  // Respect OS prefers-reduced-motion on first load
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches && !localStorage.getItem("a11y-settings")) {
      setSettings(s => ({ ...s, reducedMotion: true }));
    }
  }, []);

  const toggleDyslexicFont = useCallback(() =>
    setSettings(s => ({ ...s, dyslexicFont: !s.dyslexicFont })), []);

  const toggleHighContrast = useCallback(() =>
    setSettings(s => ({ ...s, highContrast: !s.highContrast })), []);

  const toggleReducedMotion = useCallback(() =>
    setSettings(s => ({ ...s, reducedMotion: !s.reducedMotion })), []);

  const increaseFontSize = useCallback(() =>
    setSettings(s => {
      const idx = FONT_STEPS.indexOf(s.fontSize);
      const next = FONT_STEPS[Math.min(idx + 1, FONT_STEPS.length - 1)];
      return { ...s, fontSize: next };
    }), []);

  const decreaseFontSize = useCallback(() =>
    setSettings(s => {
      const idx = FONT_STEPS.indexOf(s.fontSize);
      const prev = FONT_STEPS[Math.max(idx - 1, 0)];
      return { ...s, fontSize: prev };
    }), []);

  const resetFontSize = useCallback(() =>
    setSettings(s => ({ ...s, fontSize: 100 })), []);

  const resetAll = useCallback(() => {
    setSettings({ ...defaultSettings });
  }, []);

  return (
    <A11yContext.Provider value={{
      ...settings,
      toggleDyslexicFont,
      toggleHighContrast,
      toggleReducedMotion,
      increaseFontSize,
      decreaseFontSize,
      resetFontSize,
      resetAll,
    }}>
      {children}
    </A11yContext.Provider>
  );
}

export function useA11y(): A11yContextValue {
  const ctx = useContext(A11yContext);
  if (!ctx) throw new Error("useA11y must be used within A11yProvider");
  return ctx;
}
