import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { RotateCcw, Volume2, VolumeX } from "lucide-react";

const BG = "/images/chip/page1_bg.jpg";
const CHIP = "/images/chip/chip_element.png";
const CHIME = "/music/chime.wav";

/* A few elegant PCB traces that draw slowly outward from the chip. */
const SimpleSignals = ({ active }) => {
  const lines = useMemo(() => {
    const cx = 50;
    const cy = 50;
    const n = 8;
    const out = [];
    for (let i = 0; i < n; i++) {
      const ang = (i / n) * Math.PI * 2 + Math.PI / 8;
      const r = 92;
      const ex = cx + Math.cos(ang) * r;
      const ey = cy + Math.sin(ang) * r;
      const d =
        i % 2 === 0
          ? `M${cx} ${cy} L${ex} ${cy} L${ex} ${ey}`
          : `M${cx} ${cy} L${cx} ${ey} L${ex} ${ey}`;
      const nx = i % 2 === 0 ? ex : cx + (ex - cx) * 0.6;
      const ny = i % 2 === 0 ? cy + (ey - cy) * 0.6 : ey;
      out.push({ d, nx, ny, delay: i * 0.14 });
    }
    return out;
  }, []);

  return (
    <svg className={`chip-signals chip-signals--slow ${active ? "is-live" : ""}`} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <g className="sig-base" fill="none" stroke="#c9953f" strokeWidth="0.22" strokeLinecap="round" strokeLinejoin="round">
        {lines.map((l, i) => (
          <path key={i} d={l.d} style={{ animationDelay: `${l.delay}s` }} />
        ))}
      </g>
      <g className="sig-pulse" fill="none" stroke="#f4dca2" strokeWidth="0.4" strokeLinecap="round" strokeLinejoin="round">
        {lines.map((l, i) => (
          <path key={i} d={l.d} style={{ animationDelay: `${l.delay + 0.6}s` }} />
        ))}
      </g>
      <g fill="#ffe6ac">
        {lines.map((l, i) => (
          <circle key={i} cx={l.nx} cy={l.ny} r="0.5" style={{ animationDelay: `${l.delay + 0.5}s` }} />
        ))}
      </g>
    </svg>
  );
};

const LotusDivider = () => (
  <svg width="150" height="22" viewBox="0 0 150 22" fill="none" aria-hidden="true" className="chip-lotus-divider">
    <path d="M2 11 H58" stroke="#c99a45" strokeWidth="1" />
    <path d="M92 11 H148" stroke="#c99a45" strokeWidth="1" />
    <path d="M75 4 C70 9 70 13 75 18 C80 13 80 9 75 4 Z" stroke="#e1bf78" strokeWidth="1" />
    <path d="M67 7 C66 11 68 14 75 17 C70 12 70 9 67 7 Z" stroke="#c99a45" strokeWidth="0.9" />
    <path d="M83 7 C84 11 82 14 75 17 C80 12 80 9 83 7 Z" stroke="#c99a45" strokeWidth="0.9" />
    <circle cx="58" cy="11" r="1.4" fill="#e1bf78" />
    <circle cx="92" cy="11" r="1.4" fill="#e1bf78" />
  </svg>
);

export default function WeddingIntro({ onReveal, onComplete }) {
  const reducedMotion = useReducedMotion();
  const [phase, setPhase] = useState("closed");
  const [muted, setMuted] = useState(() => typeof window !== "undefined" && window.localStorage.getItem("chimeMuted") === "1");
  const timers = useRef([]);
  const audioRef = useRef(null);

  useEffect(() => () => timers.current.forEach(window.clearTimeout), []);

  const after = (ms, fn) => {
    const id = window.setTimeout(fn, reducedMotion ? Math.min(ms, 120) : ms);
    timers.current.push(id);
  };

  const begin = () => {
    if (phase !== "closed") return;
    if (!muted && audioRef.current) {
      try { audioRef.current.currentTime = 0; audioRef.current.play().catch(() => {}); } catch { /* noop */ }
    }
    setPhase("activating");
    after(1500, () => { setPhase("transforming"); onReveal && onReveal(); });
    after(3000, () => { setPhase("done"); onComplete && onComplete(); });
  };

  const replay = () => {
    timers.current.forEach(window.clearTimeout);
    timers.current = [];
    setPhase("closed");
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    setMuted((m) => {
      const next = !m;
      window.localStorage.setItem("chimeMuted", next ? "1" : "0");
      return next;
    });
  };

  const busy = phase !== "closed";

  return (
    <motion.section
      className="chip-scene"
      data-testid="wedding-chip-scene"
      data-phase={phase}
      aria-label="Sanidhya and Vasudha — tap the wedding chip to begin"
      exit={{ opacity: 0 }}
      transition={{ duration: reducedMotion ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <img src={BG} alt="" className="chip-bg" draggable="false" />
      <div className="chip-bg-tint" aria-hidden="true" />
      <div className="chip-frame" aria-hidden="true" />
      <SimpleSignals active={busy} />

      <audio ref={audioRef} src={CHIME} preload="auto" aria-hidden="true" />

      <button
        type="button"
        className="chip-sound"
        data-testid="chip-sound-toggle"
        onClick={toggleMute}
        aria-pressed={!muted}
        title={muted ? "Sound off — tap to enable the chime" : "Sound on — tap to mute"}
        aria-label={muted ? "Enable chime sound" : "Mute chime sound"}
      >
        {muted ? <VolumeX size={16} aria-hidden="true" /> : <Volume2 size={16} aria-hidden="true" />}
      </button>

      <button
        type="button"
        className="chip-stage"
        data-testid="chip-open-btn"
        onClick={begin}
        disabled={busy}
        aria-label="Open the wedding invitation"
      >
        <span className={`chip-underglow ${busy ? "is-live" : ""}`} aria-hidden="true" />
        <div className="chip-flat is-ready" data-testid="chip-flat">
          <img src={CHIP} className="chip-face" alt="Two Hearts One Journey wedding chip" draggable="false" />
          <span className="chip-heart-pulse" aria-hidden="true" />
        </div>
      </button>

      <div className="chip-caption" aria-live="polite">
        {phase === "closed" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="chip-tap"
            data-testid="tap-to-begin"
          >
            <LotusDivider />
            <span className="font-cormorant chip-tap-text">Tap to Begin</span>
            <LotusDivider />
          </motion.div>
        )}
        {phase === "activating" && (
          <p className="font-cormorant chip-status" data-testid="chip-status">Two hearts, coming into phase…</p>
        )}
      </div>

      {busy && (
        <button type="button" className="chip-replay" data-testid="chip-replay-btn" onClick={replay} title="Replay the opening" aria-label="Replay the opening animation">
          <RotateCcw size={16} aria-hidden="true" />
        </button>
      )}

      <div className="sr-only" aria-live="polite">
        {busy && <p data-testid="chip-inner-text">Two Hearts One Journey</p>}
      </div>
    </motion.section>
  );
}
