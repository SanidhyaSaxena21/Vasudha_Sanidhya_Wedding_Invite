# Chip → Invitation "Push-In" Transition — Portable Package

Everything needed to drop this intro transition into another React project (any theme).
The transition: **tap the chip → gold circuit traces energize outward + heart/pins glow → the view pushes INTO the chip (scale-up + fade) while Page 2 emerges from inside (scale 1.12→1)**.

---

## 1. Dependencies
```bash
yarn add framer-motion lucide-react
```
(No other libs. Plain React + CSS.)

## 2. Assets (download these from the live project)
Base URL: `https://diya-lit-vows.preview.emergentagent.com`
| File | Put at | Purpose | Theme-specific? |
|------|--------|---------|-----------------|
| `/images/chip/chip_element.png` | `public/images/chip/chip_element.png` | the flat chip art (transparent PNG; has pins + heart + title baked in) | **YES — replace for new theme** |
| `/images/chip/page1_bg.jpg` | `public/images/chip/page1_bg.jpg` | page-1 background | **YES — replace** |
| `/music/chime.wav` | `public/music/chime.wav` | tap chime (optional) | optional |

Download e.g.:
```bash
curl -o public/images/chip/chip_element.png https://diya-lit-vows.preview.emergentagent.com/images/chip/chip_element.png
curl -o public/images/chip/page1_bg.jpg     https://diya-lit-vows.preview.emergentagent.com/images/chip/page1_bg.jpg
curl -o public/music/chime.wav              https://diya-lit-vows.preview.emergentagent.com/music/chime.wav
```

## 3. How to mount (the 2-phase pattern)
The intro is an overlay (`position:fixed; z-index:50`). When it reaches the `transition` phase it calls `onReveal()` so your real Page 2 mounts *underneath*, then it scales up + fades; `onComplete()` removes the overlay.

```jsx
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import WeddingIntro from "./WeddingIntro";
import YourPage2 from "./YourPage2";   // <-- your themed landing/hero

export default function App() {
  const [revealed, setRevealed] = useState(false);   // Page 2 mounted
  const [introGone, setIntroGone] = useState(false); // overlay removed

  // lock scroll until the intro is gone
  if (typeof document !== "undefined")
    document.body.style.overflow = introGone ? "" : "hidden";

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      <AnimatePresence onExitComplete={() => setIntroGone(true)}>
        {!introGone && (
          <WeddingIntro
            key="intro"
            onReveal={() => setRevealed(true)}
            onComplete={() => setIntroGone(true)}
          />
        )}
      </AnimatePresence>

      {revealed && (
        <motion.div
          initial={{ opacity: 0, scale: 1.12 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2.0, ease: [0.6, 0, 0.2, 1] }}
          style={{ transformOrigin: "50% 45%" }}
        >
          <YourPage2 />
        </motion.div>
      )}
    </div>
  );
}
```

Import the CSS once (section 6) and the two components below.

---

## 4. CircuitTrace.js  (the radiating gold PCB traces)
```jsx
import React from "react";

export const CircuitTrace = ({ energized = false, className = "" }) => (
  <svg
    className={`wc-trace-svg ${energized ? "is-energized" : ""} ${className}`}
    viewBox="0 0 400 760" preserveAspectRatio="xMidYMid slice" aria-hidden="true"
  >
    <defs>
      <linearGradient id="wc-trace-gold" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#8a5a1f" />
        <stop offset="50%" stopColor="#C9923E" />
        <stop offset="100%" stopColor="#E1B96C" />
      </linearGradient>
      <filter id="wc-trace-glow" x="-40%" y="-40%" width="180%" height="180%">
        <feGaussianBlur stdDeviation="2.2" result="b" />
        <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
    </defs>
    <g stroke="url(#wc-trace-gold)" strokeWidth="1.4" fill="none" opacity="0.72"
       filter="url(#wc-trace-glow)" strokeLinecap="round" strokeLinejoin="round">
      <path className="wc-path" d="M150 300 L70 300 L40 270 L40 150" />
      <path className="wc-path" d="M150 340 L50 340 L30 360 L30 470" />
      <path className="wc-path" d="M150 380 L90 380 L60 410 L60 560" />
      <path className="wc-path" d="M160 420 L100 420 L80 450 L80 620" />
      <path className="wc-path" d="M250 300 L330 300 L360 270 L360 150" />
      <path className="wc-path" d="M250 340 L350 340 L370 360 L370 470" />
      <path className="wc-path" d="M250 380 L310 380 L340 410 L340 560" />
      <path className="wc-path" d="M240 420 L300 420 L320 450 L320 620" />
      <path className="wc-path" d="M185 260 L185 180 L160 150 L160 70" />
      <path className="wc-path" d="M215 260 L215 180 L240 150 L240 70" />
      <path className="wc-path" d="M185 460 L185 540 L160 580 L160 690" />
      <path className="wc-path" d="M215 460 L215 540 L240 580 L240 690" />
    </g>
    <g fill="#E1B96C" opacity="0.6">
      <circle className="wc-pad" cx="40" cy="150" r="3" /><circle className="wc-pad" cx="30" cy="470" r="3" />
      <circle className="wc-pad" cx="60" cy="560" r="3" /><circle className="wc-pad" cx="360" cy="150" r="3" />
      <circle className="wc-pad" cx="370" cy="470" r="3" /><circle className="wc-pad" cx="340" cy="560" r="3" />
      <circle className="wc-pad" cx="160" cy="70" r="3" /><circle className="wc-pad" cx="240" cy="70" r="3" />
      <circle className="wc-pad" cx="160" cy="690" r="3" /><circle className="wc-pad" cx="240" cy="690" r="3" />
    </g>
  </svg>
);
export default CircuitTrace;
```

---

## 5. WeddingIntro.js  (orchestrator + push-in)
```jsx
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { RotateCcw, Volume2, VolumeX } from "lucide-react";
import { CircuitTrace } from "./CircuitTrace";

const BG = "/images/chip/page1_bg.jpg";
const CHIP = "/images/chip/chip_element.png";
const CHIME = "/music/chime.wav";

const TIMINGS = { signal: 1000, opening: 650, transition: 2000 };
const REDUCED = { signal: 250, opening: 250, transition: 650 };

export default function WeddingIntro({ onReveal, onComplete }) {
  const reduced = !!useReducedMotion();
  const [phase, setPhase] = useState("idle"); // idle→signal→opening→transition→done
  const [muted, setMuted] = useState(() => typeof window !== "undefined" && localStorage.getItem("chimeMuted") === "1");
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
    if (!muted && audioRef.current) { try { audioRef.current.currentTime = 0; audioRef.current.play().catch(() => {}); } catch {} }
    run();
  };
  const replay = () => { clearTimers(); setPhase("idle"); };
  const toggleMute = (e) => { e.stopPropagation(); setMuted((m) => { const n = !m; localStorage.setItem("chimeMuted", n ? "1" : "0"); return n; }); };

  const busy = phase !== "idle";
  const pushingIn = phase === "transition" || phase === "done";

  return (
    <motion.section
      className="chip-scene" data-phase={phase} style={{ transformOrigin: "50% 50%" }}
      initial={{ scale: 1, opacity: 1 }}
      animate={{ scale: pushingIn ? (reduced ? 1.4 : 6) : 1, opacity: pushingIn ? 0 : 1, filter: pushingIn ? "brightness(1.4)" : "brightness(1)" }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduced ? 0.6 : 2.0, ease: [0.6, 0, 0.2, 1] }}
      aria-label="Tap the chip to begin"
    >
      <img src={BG} alt="" className="chip-bg" draggable="false" />
      <div className="chip-bg-tint" aria-hidden="true" />
      <div className="chip-frame" aria-hidden="true" />
      <CircuitTrace energized={busy} className="chip-trace-layer" />
      <audio ref={audioRef} src={CHIME} preload="auto" />

      <button type="button" className="chip-sound" onClick={toggleMute} aria-pressed={!muted} aria-label="Toggle sound">
        {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
      </button>

      <button type="button" className="chip-stage" onClick={begin} disabled={busy} aria-label="Open">
        <span className={`chip-underglow ${busy ? "is-live" : ""}`} aria-hidden="true" />
        <div className="chip-flat is-ready">
          <img src={CHIP} className="chip-face" alt="chip" draggable="false" />
          <span className="chip-heart-pulse" aria-hidden="true" />
        </div>
      </button>

      <div className="chip-caption">
        {phase === "idle" && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5 }} className="chip-tap">
            <span className="chip-tap-text">Tap to Begin</span>
          </motion.div>
        )}
        {(phase === "signal" || phase === "opening") && <p className="chip-status">Two hearts, coming into phase…</p>}
      </div>

      {busy && (
        <button type="button" className="chip-replay" onClick={replay} aria-label="Replay"><RotateCcw size={16} /></button>
      )}
    </motion.section>
  );
}
```

---

## 6. transition.css  (import once)
```css
.chip-scene {
  position: fixed; inset: 0; z-index: 50; isolation: isolate; overflow: hidden;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  background: transparent; --ease: cubic-bezier(0.22, 1, 0.36, 1);
}
.chip-bg, .chip-bg-tint { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; transition: opacity 1.1s ease; }
.chip-bg { object-fit: cover; z-index: -3; filter: brightness(0.5) saturate(0.82) blur(2px); transform: scale(1.04); }
.chip-bg-tint { z-index: -2; background: radial-gradient(75% 60% at 50% 48%, rgba(46,7,14,0.55) 0%, rgba(32,5,10,0.72) 60%, rgba(20,3,6,0.9) 100%); }
.chip-frame { position: absolute; inset: clamp(14px,4.5vw,42px); z-index: 1; pointer-events: none; border: 1px solid rgba(201,154,69,0.5); border-radius: 3px; }
.chip-frame::after { content: ""; position: absolute; inset: 6px; border: 1px solid rgba(201,154,69,0.22); border-radius: 2px; }

/* circuit traces */
.chip-trace-layer { position: absolute; inset: 0; width: 100%; height: 100%; z-index: -1; pointer-events: none; }
.wc-trace-svg .wc-path { stroke-dasharray: 560; stroke-dashoffset: 560; opacity: 0.22; }
.wc-trace-svg.is-energized .wc-path { animation: trace-fill 1s ease forwards; }
.wc-trace-svg.is-energized .wc-path:nth-child(2n) { animation-delay: 0.08s; }
.wc-trace-svg.is-energized .wc-path:nth-child(3n) { animation-delay: 0.16s; }
.wc-trace-svg.is-energized .wc-path:nth-child(4n) { animation-delay: 0.24s; }
.wc-trace-svg .wc-pad { opacity: 0.2; }
.wc-trace-svg.is-energized .wc-pad { animation: pad-glow 1.2s ease forwards 0.5s; }
.wc-trace-svg:not(.is-energized) .wc-path:first-child { stroke-dashoffset: 0; opacity: 0.16; animation: trace-idle 6s ease-in-out infinite; }
@keyframes trace-fill { from { stroke-dashoffset: 560; opacity: 0.25; } 60% { opacity: 0.95; } to { stroke-dashoffset: 0; opacity: 0.8; } }
@keyframes trace-idle { 0%,100% { opacity: 0.1; } 50% { opacity: 0.4; } }
@keyframes pad-glow { from { opacity: 0.2; } to { opacity: 0.85; filter: drop-shadow(0 0 4px #e1b96c); } }

/* chip button + flat chip */
.chip-stage { position: relative; width: min(86vw, 62svh); aspect-ratio: 1; max-width: 560px; border: 0; background: transparent; cursor: pointer; -webkit-tap-highlight-color: transparent; padding: 0; }
.chip-stage:disabled { cursor: default; }
.chip-flat { position: absolute; left: 50%; top: 50%; width: 100%; height: 100%; transform: translate(-50%,-50%); opacity: 0; transition: transform 1s var(--ease), opacity 1s var(--ease); }
.chip-flat.is-ready { opacity: 1; }
.chip-face { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain; animation: chip-float 5.5s ease-in-out infinite; transition: filter 0.5s ease; }
@keyframes chip-float { 0%,100% { transform: translateY(-4px); } 50% { transform: translateY(4px); } }
.chip-heart-pulse { position: absolute; left: 50%; top: 64%; width: 22%; height: 22%; transform: translate(-50%,-50%); border-radius: 50%; background: radial-gradient(circle, rgba(255,224,160,0.9) 0%, rgba(233,154,58,0.35) 45%, transparent 70%); opacity: 0; pointer-events: none; mix-blend-mode: screen; }

/* phase states */
.chip-scene[data-phase="signal"]  .chip-flat { transform: translate(-50%,-50%) scale(1.03); }
.chip-scene[data-phase="opening"] .chip-flat { transform: translate(-50%,-50%) scale(1.06); }
.chip-scene[data-phase="signal"]  .chip-face,
.chip-scene[data-phase="opening"] .chip-face,
.chip-scene[data-phase="transition"] .chip-face,
.chip-scene[data-phase="done"]    .chip-face { filter: brightness(1.16) drop-shadow(0 0 20px rgba(233,180,100,0.55)); }
.chip-scene[data-phase="signal"]  .chip-heart-pulse,
.chip-scene[data-phase="opening"] .chip-heart-pulse,
.chip-scene[data-phase="transition"] .chip-heart-pulse,
.chip-scene[data-phase="done"]    .chip-heart-pulse { animation: heart-power 1.1s ease-out forwards; }
@keyframes heart-power { 0% { opacity: 0; transform: translate(-50%,-50%) scale(0.5);} 35% { opacity: 1; transform: translate(-50%,-50%) scale(1.05);} 100% { opacity: 0.55; transform: translate(-50%,-50%) scale(1);} }

/* under-glow */
.chip-underglow { position: absolute; left: 50%; top: 58%; width: 78%; height: 48%; transform: translate(-50%,-50%); border-radius: 50%; background: radial-gradient(circle, rgba(233,154,58,0.5) 0%, rgba(201,120,50,0.18) 45%, transparent 70%); filter: blur(14px); opacity: 0.5; animation: chip-breathe 4.2s ease-in-out infinite; pointer-events: none; }
.chip-underglow.is-live { opacity: 1; animation: chip-surge 1.2s ease-out forwards; }
@keyframes chip-breathe { 0%,100% { opacity: 0.4; transform: translate(-50%,-50%) scale(0.96);} 50% { opacity: 0.75; transform: translate(-50%,-50%) scale(1.04);} }
@keyframes chip-surge { from { opacity: 0.6; transform: translate(-50%,-50%) scale(0.96);} to { opacity: 1; transform: translate(-50%,-50%) scale(1.25);} }

/* caption + controls */
.chip-caption { position: absolute; bottom: max(72px, 10svh); display: flex; align-items: center; justify-content: center; min-height: 44px; }
.chip-tap-text { color: #f3dcae; font-size: 20px; letter-spacing: 0.26em; text-transform: uppercase; text-shadow: 0 1px 10px rgba(201,120,50,0.4); }
.chip-status { color: #e7c88f; font-style: italic; font-size: 18px; }
.chip-replay, .chip-sound { position: absolute; width: 42px; height: 42px; display: grid; place-items: center; color: #d8b881; background: rgba(37,4,10,0.5); border: 1px solid rgba(201,154,69,0.4); border-radius: 50%; z-index: 6; cursor: pointer; transition: color 0.2s ease, transform 0.3s ease; }
.chip-replay { bottom: max(24px,3svh); right: max(20px,4vw); }
.chip-sound  { top: max(20px,3svh); left: max(20px,4vw); }
.chip-replay:hover, .chip-sound:hover { color: #fff0d2; }

@media (prefers-reduced-motion: reduce) {
  .chip-scene *, .chip-scene *::before, .chip-scene *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; }
  .wc-trace-svg .wc-path { stroke-dashoffset: 0 !important; }
}
```

---

## 7. Re-theming for a DIFFERENT theme
Change these to match the new project's palette:
1. **Chip art** — replace `chip_element.png` with your own chip/emblem PNG (transparent). This is the biggest visual change.
2. **Background** — replace `page1_bg.jpg`.
3. **Gold colour** — find/replace in `transition.css` + `CircuitTrace.js`:
   `#c9923e / #e1b96c / #C9923E / #8a5a1f / #e7c88f / #f3dcae / #d8b881` → your accent colour.
4. **Dark base** — the burgundy values `rgba(46,7,14,…) rgba(32,5,10,…) rgba(20,3,6,…) rgba(37,4,10,…)` and the `.chip-bg-tint` gradient → your dark base colour.
5. **Heart glow** — `.chip-heart-pulse` and `heart-power` colours (`rgba(255,224,160…) rgba(233,154,58…)`).
6. **Easing / timing** — tweak `TIMINGS` in `WeddingIntro.js` and the two Framer `transition.duration` values (keep the two 2.0s push-in/emerge values equal).
7. The `--ease` and `[0.6,0,0.2,1]` curves can stay; they're theme-neutral.

## 8. Behaviour notes
- `onReveal()` fires when the push-in starts → mount your Page 2 then (so it's visible emerging).
- `onComplete()` fires when the overlay finishes → unmount it & unlock scroll.
- Page 2 "emerge" = the `motion.div` wrapper animating `scale 1.12 → 1` over the same 2.0s with the same easing. Keep both durations identical for a seamless hand-off.
- Everything is GPU-friendly (transform / opacity / SVG stroke only).
