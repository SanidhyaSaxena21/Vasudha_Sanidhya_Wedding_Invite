import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { RotateCcw } from "lucide-react";

const BG = "/images/chip/page1_bg.jpg";
const FACE = "/images/chip/chip_face.jpg";

/* Build the flat chip art (engraved face + gold pins + crisp names) once. */
const buildChip = (faceImg) => {
  const S = 1024;
  const margin = 74;
  const inner = S - margin * 2;
  const c = document.createElement("canvas");
  c.width = S;
  c.height = S;
  const x = c.getContext("2d");

  // engraved face
  x.drawImage(faceImg, margin, margin, inner, inner);

  // gold pins around the perimeter
  const pinGrad = (a, b) => {
    const g = x.createLinearGradient(a.x, a.y, b.x, b.y);
    g.addColorStop(0, "#8a5c22");
    g.addColorStop(0.5, "#f3dca0");
    g.addColorStop(1, "#c99a45");
    return g;
  };
  const count = 13;
  const barT = 16;
  const barL = 40;
  const gap = inner / count;
  x.save();
  x.shadowColor = "rgba(255,210,130,0.5)";
  x.shadowBlur = 6;
  for (let i = 0; i < count; i++) {
    const p = margin + gap * (i + 0.5) - barT / 2;
    x.fillStyle = pinGrad({ x: 0, y: margin - barL }, { x: 0, y: margin });
    x.fillRect(p, margin - barL + 4, barT, barL);
    x.fillStyle = pinGrad({ x: 0, y: S - margin }, { x: 0, y: S - margin + barL });
    x.fillRect(p, S - margin - 4, barT, barL);
    x.fillStyle = pinGrad({ x: margin - barL, y: 0 }, { x: margin, y: 0 });
    x.fillRect(margin - barL + 4, p, barL, barT);
    x.fillStyle = pinGrad({ x: S - margin, y: 0 }, { x: S - margin + barL, y: 0 });
    x.fillRect(S - margin - 4, p, barL, barT);
  }
  x.restore();

  // names
  x.textAlign = "center";
  x.textBaseline = "middle";
  const tg = x.createLinearGradient(300, 0, 724, 0);
  tg.addColorStop(0, "#a9742b");
  tg.addColorStop(0.45, "#f6e0a6");
  tg.addColorStop(0.7, "#e1bf78");
  tg.addColorStop(1, "#c99a45");
  x.fillStyle = tg;
  x.shadowColor = "rgba(50,8,14,0.85)";
  x.shadowBlur = 7;
  x.shadowOffsetY = 3;
  x.font = '600 96px "Cinzel", serif';
  x.fillText("Two Hearts", 512, 470);
  x.fillText("One Journey", 512, 580);
  return c.toDataURL("image/png");
};

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

export default function WeddingIntro({ onReveal, onComplete }) {
  const reducedMotion = useReducedMotion();
  const [phase, setPhase] = useState("closed");
  const [chipSrc, setChipSrc] = useState(null);
  const timers = useRef([]);

  useEffect(() => {
    let alive = true;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = async () => {
      await document.fonts.load('600 96px "Cinzel"').catch(() => {});
      if (!alive) return;
      try {
        setChipSrc(buildChip(img));
      } catch {
        setChipSrc(FACE);
      }
    };
    img.onerror = () => alive && setChipSrc(FACE);
    img.src = FACE;
    return () => { alive = false; };
  }, []);

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
      <SignalTraces active={busy} />

      <button
        type="button"
        className="chip-stage"
        data-testid="chip-open-btn"
        onClick={begin}
        disabled={busy}
        aria-label="Open the wedding invitation"
      >
        <span className={`chip-underglow ${busy ? "is-live" : ""}`} aria-hidden="true" />
        <div className={`chip-flat ${chipSrc ? "is-ready" : ""} ${torn ? "is-torn" : ""}`} data-testid="chip-flat">
          {chipSrc && (
            <>
              <span className="chip-quad tl" style={{ backgroundImage: `url(${chipSrc})` }} />
              <span className="chip-quad tr" style={{ backgroundImage: `url(${chipSrc})` }} />
              <span className="chip-quad bl" style={{ backgroundImage: `url(${chipSrc})` }} />
              <span className="chip-quad br" style={{ backgroundImage: `url(${chipSrc})` }} />
              <span className={`chip-crack ${torn ? "is-live" : ""}`} aria-hidden="true" />
            </>
          )}
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
