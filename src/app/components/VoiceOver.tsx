/**
 * VoiceOver Component
 * Implements custom web-based Text-to-Speech using the Web Speech API.
 * Features:
 * - Read current page content aloud
 * - Hover-to-read mode (reads any element the user hovers over)
 * - Read on focus mode (reads focused element)
 * - Pitch, rate, and volume controls
 * - Language-aware (uses document lang attribute)
 */

import { useState, useEffect, useRef, useCallback } from "react";
import { useI18n } from "../../context/i18nContext";
import { Volume2, Volume1, BookOpen, Pause, Play, Square, X } from "lucide-react";

interface VoiceOverState {
  isEnabled: boolean;
  isReading: boolean;
  hoverMode: boolean;       // read element on hover
  focusMode: boolean;       // read element on focus
  rate: number;             // 0.5 – 2
  pitch: number;            // 0 – 2
  volume: number;           // 0 – 1
  currentText: string;
}

const defaultState: VoiceOverState = {
  isEnabled: false,
  isReading: false,
  hoverMode: false,
  focusMode: true,
  rate: 1,
  pitch: 1,
  volume: 1,
  currentText: "",
};

// Helper to extract readable text from an element
function getReadableText(el: Element): string {
  // Priority: aria-label > aria-labelledby > alt > textContent
  const ariaLabel = el.getAttribute("aria-label");
  if (ariaLabel) return ariaLabel;

  const labelledById = el.getAttribute("aria-labelledby");
  if (labelledById) {
    const labelEl = document.getElementById(labelledById);
    if (labelEl) return labelEl.textContent?.trim() || "";
  }

  if (el.tagName === "IMG") {
    return el.getAttribute("alt") || "Gambar";
  }

  if (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.tagName === "SELECT") {
    const id = el.getAttribute("id");
    if (id) {
      const label = document.querySelector(`label[for="${id}"]`);
      if (label) return label.textContent?.trim() || "";
    }
    const placeholder = el.getAttribute("placeholder");
    if (placeholder) return `Input: ${placeholder}`;
    return `Input ${el.tagName.toLowerCase()}`;
  }

  const text = el.textContent?.trim();
  return text?.substring(0, 300) || "";
}

export function VoiceOver() {
  const { t, locale } = useI18n();
  const [state, setState] = useState<VoiceOverState>(() => {
    try {
      const saved = localStorage.getItem("voiceover-settings");
      return saved ? { ...defaultState, ...JSON.parse(saved), isReading: false, currentText: "" } : defaultState;
    } catch {
      return defaultState;
    }
  });
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>("");
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const isSupported = typeof window !== "undefined" && "speechSynthesis" in window;

  // Load available voices
  useEffect(() => {
    if (!isSupported) return;
    const loadVoices = () => {
      const v = window.speechSynthesis.getVoices();
      setVoices(v);
      // Prefer Indonesian or English voice
      const preferredLangs = locale === "id"
        ? ["id-ID", "id", "en-US", "en"]
        : ["en-US", "en-GB", "en", "id-ID"];
      const preferred = preferredLangs
        .map(l => v.find(voice => voice.lang.startsWith(l)))
        .find(Boolean);
      if (preferred) setSelectedVoice(preferred.name);
    };
    loadVoices();
    window.speechSynthesis.addEventListener("voiceschanged", loadVoices);
    return () => window.speechSynthesis.removeEventListener("voiceschanged", loadVoices);
  }, [isSupported, locale]);

  // Persist settings
  useEffect(() => {
    localStorage.setItem("voiceover-settings", JSON.stringify({
      isEnabled: state.isEnabled,
      hoverMode: state.hoverMode,
      focusMode: state.focusMode,
      rate: state.rate,
      pitch: state.pitch,
      volume: state.volume,
    }));
  }, [state.isEnabled, state.hoverMode, state.focusMode, state.rate, state.pitch, state.volume]);

  // Speak function
  const speak = useCallback((text: string, urgent = false) => {
    if (!isSupported || !text.trim()) return;
    if (urgent) window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = state.rate;
    utterance.pitch = state.pitch;
    utterance.volume = state.volume;
    utterance.lang = locale === "id" ? "id-ID" : "en-US";

    if (selectedVoice) {
      const voice = voices.find(v => v.name === selectedVoice);
      if (voice) utterance.voice = voice;
    }

    utterance.onstart = () => setState(s => ({ ...s, isReading: true, currentText: text }));
    utterance.onend = () => setState(s => ({ ...s, isReading: false, currentText: "" }));
    utterance.onerror = () => setState(s => ({ ...s, isReading: false, currentText: "" }));

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [isSupported, state.rate, state.pitch, state.volume, locale, selectedVoice, voices]);

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
    setState(s => ({ ...s, isReading: false, currentText: "" }));
  }, []);

  const pause = useCallback(() => {
    window.speechSynthesis.pause();
    setState(s => ({ ...s, isReading: false }));
  }, []);

  const resume = useCallback(() => {
    window.speechSynthesis.resume();
    setState(s => ({ ...s, isReading: true }));
  }, []);

  // Read full page content
  const readPage = useCallback(() => {
    const main = document.getElementById("main-content") || document.body;
    const walker = document.createTreeWalker(main, NodeFilter.SHOW_TEXT, {
      acceptNode: (node) => {
        const parent = node.parentElement;
        if (!parent) return NodeFilter.FILTER_REJECT;
        if (["SCRIPT", "STYLE", "NOSCRIPT"].includes(parent.tagName)) return NodeFilter.FILTER_REJECT;
        if (parent.getAttribute("aria-hidden") === "true") return NodeFilter.FILTER_REJECT;
        if (parent.classList.contains("sr-only")) return NodeFilter.FILTER_REJECT;
        return node.textContent?.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    const texts: string[] = [];
    let node: Node | null;
    while ((node = walker.nextNode())) {
      const text = node.textContent?.trim();
      if (text && text.length > 1) texts.push(text);
    }
    speak(texts.join(". "), true);
  }, [speak]);

  // Hover-to-read mode
  useEffect(() => {
    if (!state.isEnabled || !state.hoverMode) return;
    let hoverTimeout: ReturnType<typeof setTimeout>;

    const handleMouseEnter = (e: MouseEvent) => {
      const el = e.target as Element;
      if (!el || el === document.body || el === document.documentElement) return;
      clearTimeout(hoverTimeout);
      hoverTimeout = setTimeout(() => {
        const text = getReadableText(el);
        if (text) speak(text, true);
      }, 400);
    };

    const handleMouseLeave = () => {
      clearTimeout(hoverTimeout);
    };

    document.addEventListener("mouseenter", handleMouseEnter, true);
    document.addEventListener("mouseleave", handleMouseLeave, true);
    return () => {
      clearTimeout(hoverTimeout);
      document.removeEventListener("mouseenter", handleMouseEnter, true);
      document.removeEventListener("mouseleave", handleMouseLeave, true);
    };
  }, [state.isEnabled, state.hoverMode, speak]);

  // Focus-to-read mode
  useEffect(() => {
    if (!state.isEnabled || !state.focusMode) return;

    const handleFocus = (e: FocusEvent) => {
      const el = e.target as Element;
      if (!el) return;
      const text = getReadableText(el);
      const role = el.getAttribute("role");
      const tag = el.tagName.toLowerCase();

      let prefix = "";
      if (tag === "button" || role === "button") prefix = "Tombol: ";
      else if (tag === "a") prefix = "Tautan: ";
      else if (tag === "input") prefix = "Input: ";
      else if (role === "dialog") prefix = "Dialog: ";

      if (text) speak(`${prefix}${text}`, true);
    };

    document.addEventListener("focus", handleFocus, true);
    return () => document.removeEventListener("focus", handleFocus, true);
  }, [state.isEnabled, state.focusMode, speak]);

  // Keyboard shortcut: Alt+V to toggle voiceover
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.altKey && e.key.toLowerCase() === "v") {
        e.preventDefault();
        setState(s => {
          const next = !s.isEnabled;
          if (!next) stop();
          speak(next ? "VoiceOver diaktifkan" : "VoiceOver dimatikan", true);
          return { ...s, isEnabled: next };
        });
      }
      if (e.altKey && (e.key === " " || e.code === "Space")) {
        e.preventDefault();
        setState(s => {
          if (!s.isEnabled) return s;
          if (window.speechSynthesis.speaking) {
            if (window.speechSynthesis.paused) {
              window.speechSynthesis.resume();
              return { ...s, isReading: true };
            } else {
              window.speechSynthesis.pause();
              return { ...s, isReading: false };
            }
          }
          return s;
        });
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [speak, stop]);

  // Close panel on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setIsPanelOpen(false);
      }
    };
    if (isPanelOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isPanelOpen]);

  if (!isSupported) return null;

  const update = (patch: Partial<VoiceOverState>) => setState(s => ({ ...s, ...patch }));

  return (
    <div ref={panelRef} style={{ position: "fixed", bottom: "5.5rem", right: "1.5rem", zIndex: 9998 }}>
      {/* Trigger Button */}
      <button
        ref={triggerRef}
        onClick={() => setIsPanelOpen(o => !o)}
        aria-label={state.isEnabled ? "VoiceOver aktif — buka pengaturan" : "Aktifkan VoiceOver (pembaca layar)"}
        aria-expanded={isPanelOpen}
        aria-controls="voiceover-panel"
        style={{
          width: "3.5rem",
          height: "3.5rem",
          borderRadius: "50%",
          background: state.isEnabled
            ? (state.isReading ? "linear-gradient(135deg,#006600,#00aa00)" : "linear-gradient(135deg,#004499,#0066cc)")
            : "var(--card)",
          color: state.isEnabled ? "#fff" : "var(--muted-foreground)",
          border: `3px solid ${state.isEnabled ? "rgba(255,255,255,0.4)" : "var(--border)"}`,
          boxShadow: state.isEnabled
            ? "0 8px 32px rgba(0,100,200,0.45)"
            : "0 4px 16px rgba(0,0,0,0.12)",
          cursor: "pointer",
          fontSize: "1.3rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.2s",
          animation: state.isReading ? "pulse 1.5s infinite" : "none",
        }}
      >
        {state.isReading ? <Volume2 aria-hidden="true" /> : <Volume1 aria-hidden="true" />}
        {/* Reading pulse ring */}
        {state.isReading && (
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              width: "3.5rem",
              height: "3.5rem",
              borderRadius: "50%",
              border: "3px solid rgba(0,200,100,0.6)",
              animation: "ripple 1.5s infinite",
              pointerEvents: "none",
            }}
          />
        )}
      </button>

      {/* VoiceOver Panel */}
      {isPanelOpen && (
        <div
          id="voiceover-panel"
          role="dialog"
          aria-modal="false"
          aria-label="Pengaturan VoiceOver"
          style={{
            position: "absolute",
            bottom: "4.5rem",
            right: 0,
            width: "20rem",
            background: "var(--card)",
            border: "1.5px solid var(--border)",
            borderRadius: "1.5rem",
            boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
            padding: "1.25rem",
            maxHeight: "75vh",
            overflowY: "auto",
            scrollbarWidth: "thin",
            scrollbarColor: "var(--primary) transparent",
          }}
        >
          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem", paddingBottom: "0.75rem", borderBottom: "1px solid var(--border)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Volume2 aria-hidden="true" size={20} />
              <h2 style={{ fontSize: "0.8rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.15em", color: "#0066cc", margin: 0 }}>
                VoiceOver
              </h2>
              {state.isEnabled && (
                <span style={{ fontSize: "0.6rem", fontWeight: 800, background: "#0066cc", color: "#fff", padding: "0.1rem 0.5rem", borderRadius: "1rem", textTransform: "uppercase" }}>
                  AKTIF
                </span>
              )}
            </div>
            <button
              onClick={() => setIsPanelOpen(false)}
              aria-label="Tutup panel VoiceOver"
              style={{ background: "none", border: "none", cursor: "pointer", color: "var(--muted-foreground)", fontSize: "1rem", borderRadius: "0.5rem", padding: "0.25rem" }}
            ><X size={16} /></button>
          </div>

          {/* Enable Toggle */}
          <label htmlFor="vo-enable" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", marginBottom: "1rem", padding: "0.75rem", borderRadius: "0.75rem", background: state.isEnabled ? "rgba(0,100,200,0.08)" : "var(--muted)", border: `1.5px solid ${state.isEnabled ? "rgba(0,100,200,0.3)" : "var(--border)"}` }}>
            <div>
              <span style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "var(--foreground)" }}>Aktifkan VoiceOver</span>
              <span style={{ display: "block", fontSize: "0.65rem", color: "var(--muted-foreground)", marginTop: "0.1rem" }}>Pintasan: Alt + V</span>
            </div>
            <input
              id="vo-enable"
              type="checkbox"
              checked={state.isEnabled}
              onChange={e => {
                const next = e.target.checked;
                update({ isEnabled: next });
                if (!next) stop();
                else speak("VoiceOver diaktifkan. Saya akan membacakan konten untuk Anda.", true);
              }}
              style={{ width: "1.2rem", height: "1.2rem", cursor: "pointer", accentColor: "#0066cc" }}
            />
          </label>

          {/* Playback Controls */}
          {state.isEnabled && (
            <>
              <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
                <button onClick={readPage} aria-label="Baca seluruh konten halaman ini" style={voBtn("#0066cc")}>
                  <BookOpen size={14} style={{ display: "inline", marginRight: "4px", verticalAlign: "text-bottom" }} /> Baca Halaman
                </button>
                {state.isReading ? (
                  <button onClick={pause} aria-label="Jeda pembacaan" style={voBtn("#555")}>
                    <Pause size={14} style={{ display: "inline", marginRight: "4px", verticalAlign: "text-bottom" }} /> Jeda
                  </button>
                ) : (
                  <button onClick={resume} aria-label="Lanjutkan pembacaan" style={voBtn("#006600", !state.currentText)} disabled={!state.currentText}>
                    <Play size={14} style={{ display: "inline", marginRight: "4px", verticalAlign: "text-bottom" }} /> Lanjut
                  </button>
                )}
                <button onClick={stop} aria-label="Hentikan pembacaan" style={voBtn("#c00", !state.isReading)} disabled={!state.isReading}>
                  <Square size={14} style={{ display: "inline", marginRight: "4px", verticalAlign: "text-bottom" }} /> Stop
                </button>
              </div>

              {/* Current Reading Display */}
              {state.currentText && (
                <div aria-live="polite" aria-label="Sedang dibaca" style={{ marginBottom: "1rem", padding: "0.6rem 0.75rem", borderRadius: "0.75rem", background: "rgba(0,100,200,0.05)", border: "1px solid rgba(0,100,200,0.15)", fontSize: "0.7rem", color: "var(--muted-foreground)", lineHeight: 1.5, maxHeight: "3.5rem", overflow: "hidden" }}>
                  <Volume2 size={12} style={{ display: "inline", marginRight: "4px", verticalAlign: "middle" }} /> <em>{state.currentText.substring(0, 120)}{state.currentText.length > 120 ? "..." : ""}</em>
                </div>
              )}

              {/* Mode Toggles */}
              <div style={{ marginBottom: "1rem" }}>
                <p style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--muted-foreground)", marginBottom: "0.5rem" }}>Mode Otomatis</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                  <MiniToggle id="vo-focus" label="Baca saat fokus (Tab)" checked={state.focusMode} onChange={v => update({ focusMode: v })} />
                  <MiniToggle id="vo-hover" label="Baca saat hover (mouse)" checked={state.hoverMode} onChange={v => update({ hoverMode: v })} />
                </div>
              </div>

              {/* Voice Selection */}
              {voices.length > 0 && (
                <div style={{ marginBottom: "1rem" }}>
                  <label htmlFor="vo-voice" style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--muted-foreground)", display: "block", marginBottom: "0.4rem" }}>
                    Suara
                  </label>
                  <select
                    id="vo-voice"
                    value={selectedVoice}
                    onChange={e => setSelectedVoice(e.target.value)}
                    style={{ width: "100%", padding: "0.5rem 0.75rem", borderRadius: "0.6rem", border: "1.5px solid var(--border)", background: "var(--card)", color: "var(--foreground)", fontSize: "0.75rem", cursor: "pointer" }}
                  >
                    {voices
                      .filter(v => v.lang.startsWith("id") || v.lang.startsWith("en"))
                      .map(v => (
                        <option key={v.name} value={v.name}>{v.name} ({v.lang})</option>
                      ))
                    }
                  </select>
                </div>
              )}

              {/* Rate & Pitch Controls */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                <SliderRow
                  id="vo-rate"
                  label={`Kecepatan: ${state.rate.toFixed(1)}×`}
                  value={state.rate}
                  min={0.5} max={2} step={0.1}
                  onChange={v => update({ rate: v })}
                />
                <SliderRow
                  id="vo-pitch"
                  label={`Nada: ${state.pitch.toFixed(1)}`}
                  value={state.pitch}
                  min={0} max={2} step={0.1}
                  onChange={v => update({ pitch: v })}
                />
                <SliderRow
                  id="vo-volume"
                  label={`Volume: ${Math.round(state.volume * 100)}%`}
                  value={state.volume}
                  min={0} max={1} step={0.05}
                  onChange={v => update({ volume: v })}
                />
              </div>
            </>
          )}

          {/* Keyboard shortcuts help */}
          <div style={{ marginTop: "1rem", paddingTop: "0.75rem", borderTop: "1px solid var(--border)" }}>
            <p style={{ fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--muted-foreground)", marginBottom: "0.4rem" }}>Pintasan Keyboard</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
              {[["Alt + V", "Aktif/Nonaktif"], ["Alt + Spasi", "Jeda/Lanjut"], ["Tab", "Elemen berikutnya"]].map(([key, desc]) => (
                <div key={key} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.65rem" }}>
                  <kbd style={{ background: "var(--muted)", padding: "0.1rem 0.4rem", borderRadius: "0.3rem", fontWeight: 800, border: "1px solid var(--border)" }}>{key}</kbd>
                  <span style={{ color: "var(--muted-foreground)" }}>{desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CSS Keyframes */}
      <style>{`
        @keyframes ripple {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(1.8); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

/* ── Mini helpers ─────────────────────────────────────────── */

function MiniToggle({ id, label, checked, onChange }: { id: string; label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label htmlFor={id} style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", padding: "0.4rem 0.6rem", borderRadius: "0.6rem", background: checked ? "rgba(0,100,200,0.06)" : "transparent", border: `1px solid ${checked ? "rgba(0,100,200,0.2)" : "var(--border)"}` }}>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={e => onChange(e.target.checked)}
        style={{ width: "1rem", height: "1rem", accentColor: "#0066cc", cursor: "pointer" }}
      />
      <span style={{ fontSize: "0.72rem", fontWeight: 600, color: "var(--foreground)" }}>{label}</span>
    </label>
  );
}

function SliderRow({ id, label, value, min, max, step, onChange }: {
  id: string; label: string; value: number; min: number; max: number; step: number; onChange: (v: number) => void;
}) {
  return (
    <div>
      <label htmlFor={id} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.68rem", fontWeight: 700, color: "var(--muted-foreground)", marginBottom: "0.25rem" }}>
        <span>{label}</span>
      </label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(parseFloat(e.target.value))}
        style={{ width: "100%", accentColor: "#0066cc", cursor: "pointer", height: "0.4rem" }}
        aria-label={label}
        aria-valuenow={value}
        aria-valuemin={min}
        aria-valuemax={max}
      />
    </div>
  );
}

function voBtn(color: string, disabled = false): React.CSSProperties {
  return {
    flex: 1,
    padding: "0.45rem 0.25rem",
    borderRadius: "0.6rem",
    border: `1.5px solid ${color}20`,
    background: disabled ? "var(--muted)" : `${color}15`,
    color: disabled ? "var(--muted-foreground)" : color,
    fontSize: "0.65rem",
    fontWeight: 800,
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    transition: "all 0.15s",
    textAlign: "center" as const,
    minHeight: "2.5rem",
  };
}
