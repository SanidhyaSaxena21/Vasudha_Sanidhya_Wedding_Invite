import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { RotateCcw } from "lucide-react";

const BG = "/images/chip/page1_bg.jpg";
const CHIP = "/images/chip/chip_element.png";

/* Electronic signals that burst outward from the chip in every direction. */
const RadialSignals = ({ active }) => {
  const lines = useMemo(() => {
    const cx = 50;
    const cy = 50; // viewBox is 100x100, slice-fit to viewport
    const n = 22;
    const out = [];
    for (let i = 0; i < n; i++) {
      const ang = (i / n) * Math.PI * 2 + (i % 2 ? 0.18 : -0.1);
      const r = 95;
      const ex = cx + Math.cos(ang) * r;
      const ey = cy + Math.sin(ang) * r;
      // orthogonal PCB-style elbow, alternating which axis turns first
      const d =
        i % 2 === 0
          ? `M${cx} ${cy} L${ex} ${cy} L${ex} ${ey}`
          : `M${cx} ${cy} L${cx} ${ey} L${ex} ${ey}`;
      // node sits partway along the run
      const nx = i % 2 === 0 ? ex : cx + (ex - cx) * 0.55;
      const ny = i % 2 === 0 ? cy + (ey - cy) * 0.55 : ey;
      out.push({ d, nx, ny, delay: (i % 6) * 0.08 });
    }
    return out;
  }, []);

  return (
    <svg className={`chip-signals ${active ? "is-live" : ""}`} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <g fill="none" stroke="#e6b45f" strokeWidth="0.28" strokeLinecap="round" strokeLinejoin="round">
        {lines.map((l, i) => (
          <path key={i} d={l.d} style={{ animationDelay: `${l.delay}s` }} />
        ))}
      </g>
      <g fill="#ffe6ac">
        {lines.map((l, i) => (
          <circle key={i} cx={l.nx} cy={l.ny} r="0.6" style={{ animationDelay: `${l.delay + 0.25}s` }} />
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
  const timers = useRef([]);

  useEffect(() => () => timers.current.forEach(window.clearTimeout), []);

  const after = (ms, fn) => {
    const id = window.setTimeout(fn, reducedMotion ? Math.min(ms, 120) : ms);
    timers.current.push(id);
  };

  const begin = () => {
    if (phase !== "closed") return;
    setPhase("activating");
    after(950, () => {
      setPhase("tearing");
      onReveal && onReveal();
    });
    after(950 + 1700, () => {
      setPhase("done");
      onComplete && onComplete();
    });
  };

  const replay = () => {
    timers.current.forEach(window.clearTimeout);
    timers.current = [];
    setPhase("closed");
  };

  const busy = phase !== "closed";
  const torn = phase === "tearing" || phase === "done";

  return (
    <motion.section
      className="chip-scene"
      data-testid="wedding-chip-scene"
      data-phase={phase}
      aria-label="Sanidhya and Vasudha — tap the wedding chip to begin"
      exit={{ opacity: 0 }}
      transition={{ duration: reducedMotion ? 0 : 0.6, ease: "easeInOut" }}
    >
      <img src={BG} alt="" className="chip-bg" draggable="false" />
      <div className="chip-bg-tint" aria-hidden="true" />
      <RadialSignals active={busy} />

      <button
        type="button"
        className="chip-stage"
        data-testid="chip-open-btn"
        onClick={begin}
        disabled={busy}
        aria-label="Open the wedding invitation"
      >
        <span className={`chip-underglow ${busy ? "is-live" : ""}`} aria-hidden="true" />
        <div className={`chip-flat is-ready ${torn ? "is-torn" : ""}`} data-testid="chip-flat">
          <span className="chip-quad tl" style={{ backgroundImage: `url(${CHIP})` }} />
          <span className="chip-quad tr" style={{ backgroundImage: `url(${CHIP})` }} />
          <span className="chip-quad bl" style={{ backgroundImage: `url(${CHIP})` }} />
          <span className="chip-quad br" style={{ backgroundImage: `url(${CHIP})` }} />
          <span className={`chip-crack ${torn ? "is-live" : ""}`} aria-hidden="true" />
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
        {torn && <p data-testid="chip-inner-text">Two Hearts One Journey</p>}
      </div>
    </motion.section>
  );
}
