import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SignalBoard } from "./wedding/SignalBoard";
import { GaneshaMark, LotusDivider } from "./wedding/ornaments";
import "./wedding/wedding.css";

const BG = "/images/chip/page1_velvet_bg.jpg";
const CHIME = "/music/chime.wav";

// phases: idle -> signal (signals gather up to the title) -> transition -> done
const TIMINGS = { signal: 1800, transition: 1900 };
const REDUCED = { signal: 500, transition: 650 };

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
      style={{ backgroundImage: `url(${BG})`, position: "fixed", zIndex: 50 }}
      initial={{ opacity: 1, scale: 1 }}
      animate={{
        scale: pushingIn ? (reduced ? 1.3 : 4.5) : 1,
        opacity: pushingIn ? 0 : 1,
        filter: pushingIn ? "brightness(1.35)" : "brightness(1)",
      }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduced ? 0.6 : 1.9, ease: [0.6, 0.0, 0.2, 1] }}
    >
      <div className="wc-page1-vignette" aria-hidden="true" />

      <audio ref={audioRef} src={CHIME} preload="auto" aria-hidden="true" />

      <div className="sb-stage">
        <SignalBoard live={live} className="sb-layer" />

        <div className={`sb-title ${live ? "is-live" : ""}`} data-testid="page1-title">
          <GaneshaMark size={40} className="sb-ganesha" />
          <h1 className="sb-title-text font-cinzel">
            <span>Two Hearts</span>
            <span>One Journey</span>
          </h1>
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
