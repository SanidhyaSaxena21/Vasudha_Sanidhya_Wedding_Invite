import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import { ChipCanvas } from "./chip/ChipCanvas";

const BG = "/images/chip/page1_bg.jpg";

/* Gold PCB signal traces that light up from the edges toward the chip. */
const SignalTraces = ({ active }) => (
  <svg className={`chip-traces ${active ? "is-live" : ""}`} viewBox="0 0 100 150" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <g stroke="#d7a856" strokeWidth="0.32" fill="none" strokeLinecap="round">
      <path d="M50 60 V30 H30 V10" />
      <path d="M50 60 H22 V40 H6" />
      <path d="M50 90 V120 H72 V140" />
      <path d="M50 90 H80 V112 H96" />
      <path d="M50 60 H78 V34 H94" />
      <path d="M50 90 V118 H30 V138" />
      <path d="M50 60 V36 H14 V18" />
      <path d="M50 90 H20 V116 H4" />
    </g>
    <g fill="#f0cd7a">
      <circle cx="30" cy="10" r="0.9" /><circle cx="6" cy="40" r="0.9" />
      <circle cx="72" cy="140" r="0.9" /><circle cx="96" cy="112" r="0.9" />
      <circle cx="94" cy="34" r="0.9" /><circle cx="30" cy="138" r="0.9" />
      <circle cx="14" cy="18" r="0.9" /><circle cx="4" cy="116" r="0.9" />
    </g>
  </svg>
);

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

export default function WeddingIntro({ onComplete }) {
  const reducedMotion = useReducedMotion();
  const [phase, setPhase] = useState("closed");
  const timers = useRef([]);

  const after = (ms, fn) => {
    const id = window.setTimeout(fn, reducedMotion ? Math.min(ms, 120) : ms);
    timers.current.push(id);
  };

  useEffect(() => () => timers.current.forEach(window.clearTimeout), []);

  const begin = () => {
    if (phase !== "closed") return;
    setPhase("activating");
    after(1000, () => setPhase("opening"));
  };

  const handleOpened = () => {
    after(600, () => setPhase("morphing"));
  };

  const handleMorphed = () => {
    setPhase("done");
    after(120, () => onComplete && onComplete());
  };

  const replay = () => {
    timers.current.forEach(window.clearTimeout);
    timers.current = [];
    setPhase("closed");
  };

  const busy = phase !== "closed";

  return (
    <motion.section
      className="chip-scene"
      data-testid="wedding-chip-scene"
      data-phase={phase}
      aria-label="Sanidhya and Vasudha — tap the wedding chip to begin"
      exit={{ opacity: 0 }}
      transition={{ duration: reducedMotion ? 0 : 0.7, ease: "easeInOut" }}
    >
      <img src={BG} alt="" className="chip-bg" draggable="false" />
      <div className="chip-bg-tint" aria-hidden="true" />
      <SignalTraces active={phase === "activating" || phase === "opening" || phase === "morphing"} />

      <button
        type="button"
        className="chip-stage"
        data-testid="chip-open-btn"
        onClick={begin}
        disabled={busy}
        aria-label="Open the wedding invitation"
      >
        <span className={`chip-underglow ${busy ? "is-live" : ""}`} aria-hidden="true" />
        <ChipCanvas
          phase={phase === "activating" ? "closed" : phase}
          reducedMotion={!!reducedMotion}
          onOpened={handleOpened}
          onMorphed={handleMorphed}
        />
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
        {(phase === "activating" || phase === "opening") && (
          <p className="font-cormorant chip-status" data-testid="chip-status">Two hearts, coming into phase…</p>
        )}
      </div>

      {(phase === "opening" || phase === "morphing" || phase === "done") && (
        <button type="button" className="chip-replay" data-testid="chip-replay-btn" onClick={replay} title="Replay the opening" aria-label="Replay the opening animation">
          <RotateCcw size={16} aria-hidden="true" />
        </button>
      )}

      {/* Seamless morph veil bridging the die into the invitation */}
      <AnimatePresence>
        {(phase === "morphing" || phase === "done") && (
          <motion.div
            key="morph-veil"
            className="chip-morph-veil"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reducedMotion ? 0 : 1.6, ease: "easeIn" }}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </motion.section>
  );
}
