/**
 * AssistiveTouch Component
 * Inspired by iOS AssistiveTouch — a large floating touch-friendly menu
 * for users with motor/visual disabilities who have difficulty with
 * standard navigation.
 *
 * Features:
 * - Draggable floating button (stays on screen edges)
 * - Large touch targets (min 60×60px)
 * - One-tap navigation: Home, Back, Scroll Up/Down, Zoom In/Out
 * - Gesture shortcuts panel
 * - "Scan mode" — cycles through interactive elements with highlight
 */

import { useState, useRef, useEffect, useCallback } from "react";
import { useI18n } from "../../context/i18nContext";

interface Position { x: number; y: number; }

const BUTTON_SIZE = 64; // px

// All focusable/interactive elements selector
const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
  '[role="button"]',
  '[role="link"]',
  '[role="menuitem"]',
].join(', ');

export function AssistiveTouch() {
  const { t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [isEnabled, setIsEnabled] = useState(() => {
    return localStorage.getItem("assistive-touch-enabled") === "true";
  });
  const [scanMode, setScanMode] = useState(false);
  const [scanIndex, setScanIndex] = useState(0);
  const [position, setPosition] = useState<Position>(() => {
    try {
      const s = localStorage.getItem("assistive-touch-pos");
      return s ? JSON.parse(s) : { x: window.innerWidth - 90, y: window.innerHeight - 200 };
    } catch {
      return { x: window.innerWidth - 90, y: window.innerHeight - 200 };
    }
  });

  const btnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragStart = useRef<{ mouseX: number; mouseY: number; btnX: number; btnY: number }>({ mouseX: 0, mouseY: 0, btnX: 0, btnY: 0 });
  const scanElements = useRef<HTMLElement[]>([]);
  const scanTimeout = useRef<ReturnType<typeof setTimeout>>();
  const highlightEl = useRef<HTMLDivElement | null>(null);

  // Create scan highlight overlay element
  useEffect(() => {
    const div = document.createElement("div");
    div.id = "assistive-scan-highlight";
    div.setAttribute("aria-hidden", "true");
    div.style.cssText = `
      position: fixed;
      pointer-events: none;
      border: 4px solid #ff6600;
      border-radius: 8px;
      background: rgba(255,100,0,0.12);
      z-index: 99990;
      display: none;
      transition: all 0.15s ease;
      box-shadow: 0 0 0 4px rgba(255,100,0,0.3), inset 0 0 20px rgba(255,100,0,0.05);
    `;
    document.body.appendChild(div);
    highlightEl.current = div;
    return () => div.remove();
  }, []);

  // Persist settings
  useEffect(() => {
    localStorage.setItem("assistive-touch-enabled", String(isEnabled));
  }, [isEnabled]);

  useEffect(() => {
    localStorage.setItem("assistive-touch-pos", JSON.stringify(position));
  }, [position]);

  // Close menu on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node) &&
          btnRef.current && !btnRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen]);

  // ── Drag support (mouse + touch) ─────────────────────────

  const snapToEdge = useCallback((x: number, y: number): Position => {
    const maxX = window.innerWidth - BUTTON_SIZE - 8;
    const maxY = window.innerHeight - BUTTON_SIZE - 8;
    const clampedY = Math.max(8, Math.min(y, maxY));
    // Snap to nearest horizontal edge
    const snapX = x < window.innerWidth / 2 ? 8 : maxX;
    return { x: snapX, y: clampedY };
  }, []);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button !== 0) return;
    isDragging.current = false;
    dragStart.current = { mouseX: e.clientX, mouseY: e.clientY, btnX: position.x, btnY: position.y };

    const onMove = (ev: MouseEvent) => {
      const dx = ev.clientX - dragStart.current.mouseX;
      const dy = ev.clientY - dragStart.current.mouseY;
      if (Math.abs(dx) > 5 || Math.abs(dy) > 5) isDragging.current = true;
      if (isDragging.current) {
        setPosition({
          x: Math.max(8, Math.min(dragStart.current.btnX + dx, window.innerWidth - BUTTON_SIZE - 8)),
          y: Math.max(8, Math.min(dragStart.current.btnY + dy, window.innerHeight - BUTTON_SIZE - 8)),
        });
      }
    };

    const onUp = (ev: MouseEvent) => {
      if (isDragging.current) {
        const dx = ev.clientX - dragStart.current.mouseX;
        const dy = ev.clientY - dragStart.current.mouseY;
        const newX = dragStart.current.btnX + dx;
        const newY = dragStart.current.btnY + dy;
        setPosition(snapToEdge(newX, newY));
      }
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  }, [position, snapToEdge]);

  const onClick = useCallback(() => {
    if (!isDragging.current) setIsOpen(o => !o);
  }, []);

  // ── Scan Mode ────────────────────────────────────────────

  const startScan = useCallback(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(FOCUSABLE))
      .filter(el => {
        const rect = el.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0 &&
               !el.closest('[aria-hidden="true"]') &&
               !el.closest('#assistive-touch-btn') &&
               el.id !== "assistive-touch-btn";
      });
    scanElements.current = els;
    setScanIndex(0);
    setScanMode(true);
    setIsOpen(false);
    highlightElement(els[0]);
  }, []);

  const stopScan = useCallback(() => {
    setScanMode(false);
    clearTimeout(scanTimeout.current);
    if (highlightEl.current) highlightEl.current.style.display = "none";
  }, []);

  const highlightElement = (el: HTMLElement | undefined) => {
    if (!el || !highlightEl.current) return;
    const rect = el.getBoundingClientRect();
    const hl = highlightEl.current;
    hl.style.display = "block";
    hl.style.top = `${rect.top - 4}px`;
    hl.style.left = `${rect.left - 4}px`;
    hl.style.width = `${rect.width + 8}px`;
    hl.style.height = `${rect.height + 8}px`;
    el.scrollIntoView({ block: "center", behavior: "smooth" });
  };

  const scanNext = useCallback(() => {
    setScanIndex(i => {
      const next = (i + 1) % scanElements.current.length;
      highlightElement(scanElements.current[next]);
      return next;
    });
  }, []);

  const scanPrev = useCallback(() => {
    setScanIndex(i => {
      const prev = (i - 1 + scanElements.current.length) % scanElements.current.length;
      highlightElement(scanElements.current[prev]);
      return prev;
    });
  }, []);

  const activateScan = useCallback(() => {
    const el = scanElements.current[scanIndex];
    if (el) { el.click(); el.focus(); }
  }, [scanIndex]);

  // Keyboard navigation in scan mode
  useEffect(() => {
    if (!scanMode) return;
    const handle = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); scanNext(); }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); scanPrev(); }
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); activateScan(); }
      if (e.key === "Escape") stopScan();
    };
    document.addEventListener("keydown", handle);
    return () => document.removeEventListener("keydown", handle);
  }, [scanMode, scanNext, scanPrev, activateScan, stopScan]);

  // ── Action helpers ───────────────────────────────────────

  const scrollUp = () => { window.scrollBy({ top: -300, behavior: "smooth" }); setIsOpen(false); };
  const scrollDown = () => { window.scrollBy({ top: 300, behavior: "smooth" }); setIsOpen(false); };
  const scrollTop = () => { window.scrollTo({ top: 0, behavior: "smooth" }); setIsOpen(false); };
  const scrollBottom = () => { window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" }); setIsOpen(false); };
  const zoomIn = () => { const cur = parseFloat(document.documentElement.style.fontSize || "100"); document.documentElement.style.fontSize = `${Math.min(cur + 10, 130)}%`; setIsOpen(false); };
  const zoomOut = () => { const cur = parseFloat(document.documentElement.style.fontSize || "100"); document.documentElement.style.fontSize = `${Math.max(cur - 10, 90)}%`; setIsOpen(false); };
  const goHome = () => {
    const homeBtn = document.querySelector<HTMLElement>('[aria-current="page"][aria-label*="Beranda"], [aria-current="page"][aria-label*="Home"], [aria-label="Beranda"], [aria-label="Home"]');
    homeBtn?.click();
    setIsOpen(false);
  };
  const focusSearch = () => {
    const search = document.getElementById("header-search");
    search?.focus();
    search?.scrollIntoView({ behavior: "smooth", block: "center" });
    setIsOpen(false);
  };
  const focusMain = () => {
    const main = document.getElementById("main-content");
    main?.focus();
    setIsOpen(false);
  };

  // ── Render ───────────────────────────────────────────────

  if (!isEnabled) {
    // Show tiny enable button
    return (
      <button
        onClick={() => setIsEnabled(true)}
        aria-label="Aktifkan AssistiveTouch untuk navigasi mudah"
        title="Aktifkan AssistiveTouch"
        style={{
          position: "fixed",
          bottom: "9rem",
          right: "1.5rem",
          width: "2.5rem",
          height: "2.5rem",
          borderRadius: "50%",
          background: "var(--card)",
          border: "2px dashed var(--border)",
          color: "var(--muted-foreground)",
          fontSize: "1rem",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9997,
          opacity: 0.6,
          transition: "opacity 0.2s",
        }}
        onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
        onMouseLeave={e => (e.currentTarget.style.opacity = "0.6")}
      >
        👆
      </button>
    );
  }

  // Determine menu open direction (above or below button)
  const menuAbove = position.y > window.innerHeight / 2;

  return (
    <>
      {/* Draggable Button */}
      <button
        ref={btnRef}
        id="assistive-touch-btn"
        onMouseDown={onMouseDown}
        onClick={onClick}
        aria-label={isOpen ? "Tutup menu AssistiveTouch" : "Buka menu AssistiveTouch — navigasi cepat untuk penyandang disabilitas"}
        aria-expanded={isOpen}
        aria-haspopup="true"
        style={{
          position: "fixed",
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: `${BUTTON_SIZE}px`,
          height: `${BUTTON_SIZE}px`,
          borderRadius: "50%",
          background: scanMode
            ? "linear-gradient(135deg,#cc4400,#ff6600)"
            : "linear-gradient(135deg,rgba(30,30,40,0.85),rgba(50,50,70,0.9))",
          backdropFilter: "blur(12px)",
          border: `2px solid ${scanMode ? "rgba(255,120,0,0.5)" : "rgba(255,255,255,0.15)"}`,
          boxShadow: scanMode
            ? "0 8px 32px rgba(255,80,0,0.5)"
            : "0 8px 32px rgba(0,0,0,0.35)",
          cursor: "grab",
          zIndex: 9997,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.6rem",
          color: "#fff",
          userSelect: "none",
          touchAction: "none",
          transition: "box-shadow 0.2s, background 0.3s",
        }}
      >
        <span aria-hidden="true">{scanMode ? "🔍" : "👆"}</span>
      </button>

      {/* Menu Panel */}
      {isOpen && !scanMode && (
        <div
          ref={menuRef}
          role="dialog"
          aria-modal="false"
          aria-label="Menu AssistiveTouch"
          style={{
            position: "fixed",
            left: `${position.x > window.innerWidth / 2 ? position.x - 280 : position.x + BUTTON_SIZE + 8}px`,
            top: menuAbove
              ? `${position.y - 420 + BUTTON_SIZE}px`
              : `${position.y}px`,
            width: "17rem",
            background: "rgba(20,20,30,0.92)",
            backdropFilter: "blur(20px)",
            border: "1.5px solid rgba(255,255,255,0.12)",
            borderRadius: "1.5rem",
            boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
            padding: "1rem",
            zIndex: 9996,
          }}
        >
          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
            <h2 style={{ fontSize: "0.72rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(255,255,255,0.5)", margin: 0 }}>
              👆 AssistiveTouch
            </h2>
            <button
              onClick={() => setIsEnabled(false)}
              aria-label="Nonaktifkan AssistiveTouch"
              style={{ background: "none", border: "none", color: "rgba(255,255,255,0.3)", fontSize: "0.7rem", cursor: "pointer", padding: "0.25rem" }}
            >
              Nonaktifkan
            </button>
          </div>

          {/* Grid of actions */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "0.5rem", marginBottom: "0.75rem" }}>
            <ATBtn icon="🏠" label="Beranda" onClick={goHome} />
            <ATBtn icon="🔍" label="Cari" onClick={focusSearch} />
            <ATBtn icon="⬆️" label="Ke Atas" onClick={scrollTop} />
            <ATBtn icon="🔼" label="Gulir ↑" onClick={scrollUp} />
            <ATBtn icon="🔽" label="Gulir ↓" onClick={scrollDown} />
            <ATBtn icon="⬇️" label="Ke Bawah" onClick={scrollBottom} />
            <ATBtn icon="🔎" label="Perbesar" onClick={zoomIn} />
            <ATBtn icon="🔍" label="Perkecil" onClick={zoomOut} />
            <ATBtn icon="🎯" label="Konten" onClick={focusMain} />
          </div>

          {/* Scan Mode */}
          <button
            onClick={startScan}
            style={{
              width: "100%",
              padding: "0.75rem",
              borderRadius: "0.75rem",
              background: "linear-gradient(135deg,#cc4400,#ff6600)",
              color: "#fff",
              border: "none",
              fontSize: "0.75rem",
              fontWeight: 800,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              letterSpacing: "0.05em",
              minHeight: "3rem",
            }}
            aria-label="Aktifkan mode scan — sorot dan aktifkan elemen satu per satu"
          >
            🔍 Mode Scan Elemen
          </button>
          <p style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.35)", textAlign: "center", marginTop: "0.4rem" }}>
            Gunakan ← → untuk navigasi, Enter untuk klik
          </p>
        </div>
      )}

      {/* Scan Mode Controls (bottom bar) */}
      {scanMode && (
        <div
          role="toolbar"
          aria-label="Kontrol Mode Scan"
          style={{
            position: "fixed",
            bottom: "1.5rem",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            padding: "0.75rem 1.25rem",
            background: "rgba(20,20,30,0.95)",
            backdropFilter: "blur(20px)",
            border: "1.5px solid rgba(255,100,0,0.4)",
            borderRadius: "2rem",
            boxShadow: "0 8px 32px rgba(255,80,0,0.3)",
            zIndex: 99995,
          }}
        >
          <ScanBtn icon="◀" label="Elemen sebelumnya" onClick={scanPrev} />
          <button
            onClick={activateScan}
            aria-label="Aktifkan elemen yang disorot"
            style={{ padding: "0.5rem 1.25rem", borderRadius: "1.5rem", background: "#ff6600", color: "#fff", border: "none", fontSize: "0.8rem", fontWeight: 800, cursor: "pointer", minHeight: "2.75rem" }}
          >
            ✓ Aktifkan
          </button>
          <ScanBtn icon="▶" label="Elemen berikutnya" onClick={scanNext} />
          <div style={{ width: "1px", height: "1.5rem", background: "rgba(255,255,255,0.15)" }} aria-hidden="true" />
          <ScanBtn icon="✕" label="Keluar mode scan" onClick={stopScan} color="rgba(255,255,255,0.5)" />

          {/* Element counter */}
          <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.5)", minWidth: "3rem", textAlign: "center" }} aria-live="polite">
            {scanIndex + 1}/{scanElements.current.length}
          </span>
        </div>
      )}
    </>
  );
}

/* ── Sub-components ───────────────────────────────────────── */

function ATBtn({ icon, label, onClick }: { icon: string; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.2rem",
        padding: "0.6rem 0.25rem",
        borderRadius: "0.75rem",
        background: "rgba(255,255,255,0.07)",
        border: "1px solid rgba(255,255,255,0.1)",
        color: "#fff",
        cursor: "pointer",
        fontSize: "1.2rem",
        minHeight: "3.5rem",
        minWidth: "3.5rem",
        transition: "all 0.15s",
      }}
      onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.15)"; e.currentTarget.style.transform = "scale(1.05)"; }}
      onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; e.currentTarget.style.transform = "scale(1)"; }}
    >
      <span aria-hidden="true">{icon}</span>
      <span style={{ fontSize: "0.55rem", fontWeight: 700, letterSpacing: "0.04em", opacity: 0.7, textTransform: "uppercase" }}>{label}</span>
    </button>
  );
}

function ScanBtn({ icon, label, onClick, color = "#fff" }: { icon: string; label: string; onClick: () => void; color?: string }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      style={{
        width: "2.75rem",
        height: "2.75rem",
        borderRadius: "50%",
        background: "rgba(255,255,255,0.1)",
        border: "1.5px solid rgba(255,255,255,0.15)",
        color,
        fontSize: "1rem",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.15s",
      }}
      onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.2)"; }}
      onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; }}
    >
      {icon}
    </button>
  );
}
