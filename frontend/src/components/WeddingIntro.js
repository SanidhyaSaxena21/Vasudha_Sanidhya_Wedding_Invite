import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CircuitTrace } from "./wedding/CircuitTrace";
import { WeddingChip } from "./wedding/WeddingChip";
import { LotusDivider } from "./wedding/ornaments";
import "./wedding/wedding.css";

const BG = "/images/chip/page1_bg.jpg";
const CHIME = "/music/chime.wav";

// phases: idle -> signal -> opening -> transition -> done
const TIMINGS = { signal: 1000, opening: 1300, transition: 2200 };
const REDUCED = { signal: 250, opening: 350, transition: 650 };

export default function WeddingIntro({ onReveal, onComplete }) {
  const reduced = !!useReducedMotion();
  const [phase, setPhase] = useState("idle");
  const timers = useRef([]);
  const audioRef = useRef(null);

  const clearTimers = () => { timers.current.forEach(clearTimeout); timers.current = []; };
  useEffect(() => () => clearTimers(), []);

  const run = () => {
    clearTimers();
    const t = reduced ? REDUCED : TIMINGS;
    setPhase("signal");
    timers.current.push(setTimeout(() => setPhase("opening"), t.signal));
    timers.current.push(setTimeout(() => { setPhase("transition"); onReveal && onReveal(); }, t.signal + t.opening));
    timers.current.push(setTimeout(() => { setPhase("done"); onComplete && onComplete(); }, t.signal + t.opening + t.transition));
  };

  const begin = () => {
    if (phase !== "idle") return;
    if (audioRef.current) {
      try { audioRef.current.currentTime = 0; audioRef.current.play().catch(() => {}); } catch { /* noop */ }
    }
    run();
  };

  const pushingIn = phase === "transition" || phase === "done";
  const energize = phase !== "idle";

  return (
    <motion.section
      className="wc-page1"
      data-testid="wedding-chip-scene"
      style={{ backgroundImage: `url(${BG})`, position: "fixed", zIndex: 50 }}
      initial={{ opacity: 1, scale: 1 }}
      animate={{
        scale: pushingIn ? (reduced ? 1.4 : 7) : 1,
        opacity: pushingIn ? 0 : 1,
        filter: pushingIn ? "brightness(1.4)" : "brightness(1)",
      }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduced ? 0.6 : 2.2, ease: [0.6, 0.0, 0.2, 1] }}
    >
      <div className="wc-page1-vignette" aria-hidden="true" />
      <CircuitTrace energized={energize} className="wc-trace-layer" />

      <audio ref={audioRef} src={CHIME} preload="auto" aria-hidden="true" />

      <div className="wc-chip-stage">
        <WeddingChip phase={phase} reduced={reduced} onTap={begin} />

        <motion.button
          type="button"
          onClick={begin}
          className="wc-tap"
          data-testid="tap-to-begin"
          animate={{ opacity: phase === "idle" ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          aria-hidden={phase !== "idle"}
          aria-label="Open the wedding invitation"
        >
          <LotusDivider width={200} className="wc-tap-divider" />
          <span className="wc-tap-text">Tap to Begin</span>
          <LotusDivider width={200} className="wc-tap-divider" />
        </motion.button>
      </div>
    </motion.section>
  );
}
