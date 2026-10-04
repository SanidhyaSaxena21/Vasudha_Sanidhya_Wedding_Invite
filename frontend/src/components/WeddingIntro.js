import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SignalBoard } from "./wedding/SignalBoard";
import { GaneshaMark, LotusDivider } from "./wedding/ornaments";
import "./wedding/wedding.css";

const BG = "/images/chip/page1_velvet_bg.jpg";
const CHARGE = "/music/chargeup.wav";

// phases: idle -> signal (signals flow outward) -> transition -> done
const TIMINGS = { signal: 1800, transition: 1900 };
const REDUCED = { signal: 500, transition: 650 };

const HeartGlow = () => (
  <svg className="sb-heart-svg" viewBox="0 0 120 108" fill="none" aria-hidden="true">
    <path
      d="M60 98 C30 74 10 56 10 34 C10 19 22 8 37 8 C47 8 56 14 60 23 C64 14 73 8 83 8 C98 8 110 19 110 34 C110 56 90 74 60 98 Z"
      stroke="#f0cf82" strokeWidth="2.4" strokeLinejoin="round"
    />
  </svg>
);

export default function WeddingIntro({ onReveal, onComplete }) {
  const reduced = !!useReducedMotion();
  const [phase, setPhase] = useState("idle");
  const timers = useRef([]);
  const audioRef = useRef(null);

  const clearTimers = () => { timers.current.forEach(clearTimeout); timers.current = []; };
  useEffect(() => () => clearTimers(), []);

  const begin = () => {
    if (phase !== "idle") return;
    if (audioRef.current) {
      try { audioRef.current.currentTime = 0; audioRef.current.play().catch(() => {}); } catch { /* noop */ }
    }
    clearTimers();
    const t = reduced ? REDUCED : TIMINGS;
    setPhase("signal");
    timers.current.push(setTimeout(() => { setPhase("transition"); onReveal && onReveal(); }, t.signal));
    timers.current.push(setTimeout(() => { setPhase("done"); onComplete && onComplete(); }, t.signal + t.transition));
  };

  const live = phase !== "idle";
  const pushingIn = phase === "transition" || phase === "done";

  return (
    <motion.section
      className="wc-page1"
      data-testid="wedding-chip-scene"
      style={{ position: "fixed", zIndex: 50 }}
      initial={{ opacity: 1, scale: 1 }}
      animate={{
        scale: pushingIn ? (reduced ? 1.3 : 4.5) : 1,
        opacity: pushingIn ? 0 : 1,
        filter: pushingIn ? "brightness(1.35)" : "brightness(1)",
      }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduced ? 0.6 : 1.9, ease: [0.6, 0.0, 0.2, 1] }}
    >
      <div className="sb-backdrop" style={{ backgroundImage: `url(${BG})` }} aria-hidden="true" />

      <audio ref={audioRef} src={CHARGE} preload="auto" aria-hidden="true" />

      <div className="sb-stage" style={{ backgroundImage: `url(${BG})` }}>
        <div className="wc-page1-vignette" aria-hidden="true" />
        <SignalBoard live={live} className="sb-layer" />

        <GaneshaMark size={34} className="sb-ganesha" />

        <div className={`sb-chip ${live ? "is-live" : ""}`} data-testid="page1-title">
          <span className="sb-line font-cinzel">Two Hearts</span>
          <div className="sb-heart-badge">
            <HeartGlow />
            <span className="sb-monogram font-cinzel">
              S<em>&amp;</em>V
            </span>
          </div>
          <span className="sb-line font-cinzel">One Journey</span>
        </div>

        <motion.button
          type="button"
          onClick={begin}
          className="sb-tap"
          data-testid="tap-to-begin"
          animate={{ opacity: phase === "idle" ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          aria-hidden={phase !== "idle"}
          aria-label="Open the wedding invitation"
        >
          <LotusDivider width={180} className="sb-tap-divider" />
          <span className="sb-tap-text">Tap to Begin</span>
          <LotusDivider width={180} className="sb-tap-divider" />
        </motion.button>
      </div>
    </motion.section>
  );
}
