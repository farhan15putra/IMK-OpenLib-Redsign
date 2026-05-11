import { useState, useRef, useEffect, useCallback } from "react";
import { useA11y } from "../../context/a11yContext";
import { useI18n } from "../../context/i18nContext";
import { RotateCcw, X } from "lucide-react";
import A11yIconImage from "../../imports/aksesbilitas ikon.png";

export function A11yPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const { t, locale, setLocale } = useI18n();
  const {
    dyslexicFont, highContrast, reducedMotion, fontSize,
    toggleDyslexicFont, toggleHighContrast, toggleReducedMotion,
    increaseFontSize, decreaseFontSize, resetFontSize, resetAll,
  } = useA11y();

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen]);

  // Close on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen]);

  // Focus first element when opened
  useEffect(() => {
    if (isOpen) {
      const firstFocusable = panelRef.current?.querySelector<HTMLElement>(
        "button, [href], input, select, [tabindex]:not([tabindex='-1'])"
      );
      firstFocusable?.focus();
    }
  }, [isOpen]);

  const toggle = useCallback(() => setIsOpen(o => !o), []);

  return (
    <div ref={panelRef} style={{ position: "fixed", bottom: "1.5rem", right: "1.5rem", zIndex: 9999 }}>
      {/* Trigger Button */}
      <button
        ref={triggerRef}
        id="a11y-panel-trigger"
        onClick={toggle}
        aria-expanded={isOpen}
        aria-controls="a11y-panel-content"
        aria-label={isOpen ? t("a11y.close") : t("a11y.open")}
        style={{
          width: "3.5rem",
          height: "3.5rem",
          borderRadius: "50%",
          background: "var(--primary)",
          color: "#fff",
          border: "3px solid rgba(255,255,255,0.3)",
          boxShadow: "0 8px 32px rgba(139,0,0,0.4)",
          cursor: "pointer",
          fontSize: "1.4rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "transform 0.2s, box-shadow 0.2s",
        }}
        onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.1)")}
        onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
      >
        <div
          aria-hidden="true"
          style={{
            width: "36px",
            height: "36px",
            WebkitMaskImage: `url('${A11yIconImage}')`,
            WebkitMaskSize: "contain",
            WebkitMaskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
            maskImage: `url('${A11yIconImage}')`,
            maskSize: "contain",
            maskRepeat: "no-repeat",
            maskPosition: "center",
            backgroundColor: "currentColor"
          }}
        />
      </button>

      {/* Panel */}
      {isOpen && (
        <div
          id="a11y-panel-content"
          role="dialog"
          aria-modal="false"
          aria-label={t("a11y.panel_label")}
          style={{
            position: "absolute",
            bottom: "4.5rem",
            right: 0,
            width: "18rem",
            background: "var(--card)",
            border: "1.5px solid var(--border)",
            borderRadius: "1.5rem",
            boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
            padding: "1.25rem",
            maxHeight: "75vh",
            overflowY: "auto",
            scrollbarWidth: "thin",
            scrollbarColor: "var(--primary) transparent",
            animation: "fadeInUp 0.2s ease",
          }}
        >
          {/* Panel Header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem", paddingBottom: "0.75rem", borderBottom: "1px solid var(--border)" }}>
            <h2 style={{ fontSize: "0.8rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--primary)", margin: 0 }}>
              {t("a11y.title")}
            </h2>
            <button
              onClick={toggle}
              aria-label={t("a11y.close")}
              style={{ background: "none", border: "none", cursor: "pointer", color: "var(--muted-foreground)", fontSize: "1.1rem", padding: "0.25rem", borderRadius: "0.5rem" }}
            >
              <X size={16} />
            </button>
          </div>

          {/* Font Size Control */}
          <div style={{ marginBottom: "1rem" }}>
            <p style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--muted-foreground)", marginBottom: "0.5rem" }}>
              {t("a11y.font_size")}
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <button
                onClick={decreaseFontSize}
                disabled={fontSize <= 90}
                aria-label={t("a11y.font_size_decrease")}
                style={btnStyle(false, fontSize <= 90)}
              >
                A−
              </button>
              <button
                onClick={resetFontSize}
                aria-label={t("a11y.font_size_reset")}
                style={{ ...btnStyle(fontSize === 100, false), flex: 1, fontSize: "0.75rem" }}
              >
                {fontSize}%
              </button>
              <button
                onClick={increaseFontSize}
                disabled={fontSize >= 130}
                aria-label={t("a11y.font_size_increase")}
                style={btnStyle(false, fontSize >= 130)}
              >
                A+
              </button>
            </div>
          </div>

          {/* Toggle: Dyslexic Font */}
          <ToggleRow
            label={t("a11y.dyslexic_font")}
            description={t("a11y.dyslexic_font_desc")}
            checked={dyslexicFont}
            id="a11y-dyslexic"
            onChange={toggleDyslexicFont}
          />

          {/* Toggle: High Contrast */}
          <ToggleRow
            label={t("a11y.high_contrast")}
            description={t("a11y.high_contrast_desc")}
            checked={highContrast}
            id="a11y-contrast"
            onChange={toggleHighContrast}
          />

          {/* Toggle: Reduce Motion */}
          <ToggleRow
            label={t("a11y.reduce_motion")}
            description={t("a11y.reduce_motion_desc")}
            checked={reducedMotion}
            id="a11y-motion"
            onChange={toggleReducedMotion}
          />


          {/* Reset All */}
          <button
            onClick={resetAll}
            style={{
              width: "100%",
              padding: "0.6rem",
              borderRadius: "0.75rem",
              border: "1.5px solid var(--border)",
              background: "transparent",
              color: "var(--muted-foreground)",
              fontSize: "0.7rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              cursor: "pointer",
              transition: "all 0.15s",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--primary)"; e.currentTarget.style.color = "var(--primary)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--muted-foreground)"; }}
          >
            <RotateCcw size={14} style={{ display: "inline", marginRight: "0.4rem" }} /> {t("a11y.reset_all")}
          </button>
        </div>
      )}
    </div>
  );
}

/* ── helpers ─────────────────────────────── */

function btnStyle(active: boolean, disabled: boolean): React.CSSProperties {
  return {
    padding: "0.4rem 0.75rem",
    borderRadius: "0.6rem",
    border: active ? "2px solid var(--primary)" : "1.5px solid var(--border)",
    background: active ? "var(--primary)" : "var(--card)",
    color: active ? "#fff" : "var(--foreground)",
    fontSize: "0.75rem",
    fontWeight: 800,
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.4 : 1,
    transition: "all 0.15s",
    minWidth: "2.5rem",
    minHeight: "2.5rem",
  };
}

interface ToggleRowProps {
  label: string;
  description: string;
  checked: boolean;
  id: string;
  onChange: () => void;
}

function ToggleRow({ label, description, checked, id, onChange }: ToggleRowProps) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem", padding: "0.6rem 0.75rem", borderRadius: "0.75rem", background: checked ? "rgba(139,0,0,0.06)" : "transparent", border: `1.5px solid ${checked ? "rgba(139,0,0,0.2)" : "var(--border)"}`, transition: "all 0.2s" }}>
      <label htmlFor={id} style={{ flex: 1, cursor: "pointer" }}>
        <span style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "var(--foreground)" }}>{label}</span>
        <span style={{ display: "block", fontSize: "0.65rem", color: "var(--muted-foreground)", marginTop: "0.1rem" }}>{description}</span>
      </label>
      {/* Custom toggle switch */}
      <div style={{ position: "relative", marginLeft: "0.75rem" }}>
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={onChange}
          style={{ position: "absolute", opacity: 0, width: "100%", height: "100%", cursor: "pointer", margin: 0, zIndex: 1 }}
        />
        <div
          aria-hidden="true"
          style={{
            width: "2.5rem",
            height: "1.4rem",
            borderRadius: "1rem",
            background: checked ? "var(--primary)" : "var(--border)",
            position: "relative",
            transition: "background 0.2s",
          }}
        >
          <div style={{
            position: "absolute",
            top: "0.2rem",
            left: checked ? "1.3rem" : "0.2rem",
            width: "1rem",
            height: "1rem",
            borderRadius: "50%",
            background: "#fff",
            boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
            transition: "left 0.2s",
          }} />
        </div>
      </div>
    </div>
  );
}
