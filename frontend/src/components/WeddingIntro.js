import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { RotateCcw, Volume2, VolumeX } from "lucide-react";
import { CircuitTrace } from "./CircuitTrace";

const BG = "/images/chip/page1_bg.jpg";
const CHIP = "/images/chip/chip_element.png";
const CHIME = "/music/chime.wav";

const TIMINGS = { signal: 1000, opening: 650, transition: 2000 };
const REDUCED = { signal: 250, opening: 250, transition: 650 };

const LotusDivider = () => (
  <svg width="180" height="22" viewBox="0 0 180 22" fill="none" aria-hidden="true" className="chip-lotus-divider">
    <path d="M2 11 H73" stroke="#c99a45" strokeWidth="1" />
    <path d="M107 11 H178" stroke="#c99a45" strokeWidth="1" />
    <path d="M90 4 C85 9 85 13 90 18 C95 13 95 9 90 4 Z" stroke="#e1bf78" strokeWidth="1" />
    <path d="M82 7 C81 11 83 14 90 17 C85 12 85 9 82 7 Z" stroke="#c99a45" strokeWidth="0.9" />
    <path d="M98 7 C99 11 97 14 90 17 C95 12 95 9 98 7 Z" stroke="#c99a45" strokeWidth="0.9" />
    <circle cx="73" cy="11" r="1.4" fill="#e1bf78" />
    <circle cx="107" cy="11" r="1.4" fill="#e1bf78" />
  </svg>
);

export default function WeddingIntro({ onReveal, onComplete }) {
  const reducedMotion = useReducedMotion();
  const reduced = !!reducedMotion;
  const [phase, setPhase] = useState("idle");
  const [muted, setMuted] = useState(() => typeof window !== "undefined" && window.localStorage.getItem("chimeMuted") === "1");
  const timers = useRef([]);
  const audioRef = useRef(null);

  const clearTimers = () => { timers.current.forEach(window.clearTimeout); timers.current = []; };
  useEffect(() => () => clearTimers(), []);

  const run = () => {
    clearTimers();
    const t = reduced ? REDUCED : TIMINGS;
    setPhase("signal");
    timers.current.push(window.setTimeout(() => setPhase("opening"), t.signal));
    timers.current.push(window.setTimeout(() => { setPhase("transition"); onReveal && onReveal(); }, t.signal + t.opening));
    timers.current.push(window.setTimeout(() => { setPhase("done"); onComplete && onComplete(); }, t.signal + t.opening + t.transition));
  };

  const begin = () => {
    if (phase !== "idle") return;
    if (!muted && audioRef.current) {
      try { audioRef.current.currentTime = 0; audioRef.current.play().catch(() => {}); } catch { /* noop */ }
    }
    run();
  };

  const replay = () => { clearTimers(); setPhase("idle"); };

  const toggleMute = (e) => {
    e.stopPropagation();
    setMuted((m) => { const next = !m; window.localStorage.setItem("chimeMuted", next ? "1" : "0"); return next; });
  };

  const busy = phase !== "idle";
  const pushingIn = phase === "transition" || phase === "done";
  const energize = phase !== "idle";

  return (
    <motion.section
      className="chip-scene"
      data-testid="wedding-chip-scene"
      data-phase={phase}
      aria-label="Sanidhya and Vasudha — tap the wedding chip to begin"
      style={{ transformOrigin: "50% 50%" }}
      initial={{ scale: 1, opacity: 1 }}
      animate={{
        scale: pushingIn ? (reduced ? 1.4 : 6) : 1,
        opacity: pushingIn ? 0 : 1,
        filter: pushingIn ? "brightness(1.4)" : "brightness(1)",
      }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduced ? 0.6 : 2.0, ease: [0.6, 0, 0.2, 1] }}
    >
      <img src={BG} alt="" className="chip-bg" draggable="false" />
      <div className="chip-bg-tint" aria-hidden="true" />
      <div className="chip-frame" aria-hidden="true" />
      <CircuitTrace energized={energize} className="chip-trace-layer" />

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
        {phase === "idle" && (
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
        {(phase === "signal" || phase === "opening") && (
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
