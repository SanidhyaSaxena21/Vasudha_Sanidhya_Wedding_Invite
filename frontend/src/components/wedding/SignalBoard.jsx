import React from "react";

/*
 * Page 1 — flat antique-gold PCB that frames the invitation title.
 * When `live` is true, bright "signals" draw along every trace and gather
 * up toward the "Two Hearts One Journey" title (from below and above).
 */

// Feeder traces authored SOURCE -> TITLE so the draw animation travels toward the text.
const LOWER = [
  "M40 820 L40 600 L72 560 L72 470 L112 420 L132 362",
  "M360 820 L360 600 L328 560 L328 470 L288 420 L268 362",
  "M120 820 L120 630 L150 585 L150 470 L162 408 L166 362",
  "M280 820 L280 630 L250 585 L250 470 L238 408 L234 362",
  "M8 500 L60 500 L100 452 L140 400 L152 362",
  "M392 500 L340 500 L300 452 L260 400 L248 362",
  "M184 460 L184 410 L190 362",
  "M216 460 L216 410 L210 362",
];

const UPPER = [
  "M70 40 L70 150 L108 200 L108 250 L150 300",
  "M330 40 L330 150 L292 200 L292 250 L250 300",
  "M160 46 L160 160 L184 210 L186 300",
  "M240 46 L240 160 L216 210 L214 300",
];

const HEART =
  "M200 540 C174 516 156 502 156 483 C156 470 167 461 179 461 C188 461 196 467 200 475 C204 467 212 461 221 461 C233 461 244 470 244 483 C244 502 226 516 200 540 Z";

const PADS = [
  [40, 818], [360, 818], [120, 818], [280, 818],
  [8, 500], [392, 500],
  [70, 42], [330, 42], [160, 48], [240, 48],
];

const ALL = [...LOWER, ...UPPER];

export const SignalBoard = ({ live = false, className = "" }) => (
  <svg
    className={`sb-svg ${live ? "is-live" : ""} ${className}`}
    viewBox="0 0 400 820"
    preserveAspectRatio="xMidYMid meet"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="sb-gold" x1="0" y1="1" x2="0" y2="0">
        <stop offset="0%" stopColor="#8a5a1f" />
        <stop offset="55%" stopColor="#c9923e" />
        <stop offset="100%" stopColor="#e9c678" />
      </linearGradient>
      <filter id="sb-glow" x="-60%" y="-60%" width="220%" height="220%">
        <feGaussianBlur stdDeviation="2.4" result="b" />
        <feMerge>
          <feMergeNode in="b" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    {/* dim base traces */}
    <g
      stroke="url(#sb-gold)"
      strokeWidth="1.3"
      fill="none"
      opacity="0.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {ALL.map((d, i) => (
        <path key={`base-${i}`} d={d} />
      ))}
      <path d="M118 360 H282" />
      <path d="M150 300 H250" />
    </g>

    {/* bright travelling signals that gather at the title */}
    <g
      stroke="#ffe9b8"
      strokeWidth="2.3"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      filter="url(#sb-glow)"
    >
      {ALL.map((d, i) => (
        <path
          key={`pulse-${i}`}
          className="sb-pulse"
          d={d}
          pathLength="1"
          style={{ animationDelay: `${(i % 8) * 70}ms` }}
        />
      ))}
    </g>

    {/* title bus bars glow once signals arrive */}
    <g stroke="#ffe3a6" strokeWidth="2.4" strokeLinecap="round" filter="url(#sb-glow)">
      <path className="sb-bus" d="M118 360 H282" pathLength="1" />
      <path className="sb-bus" d="M150 300 H250" pathLength="1" />
    </g>

    {/* heart woven into the lower circuit */}
    <path
      className="sb-heart"
      d={HEART}
      fill="none"
      stroke="url(#sb-gold)"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      filter="url(#sb-glow)"
    />

    {/* connection pads at every signal source */}
    <g fill="#e9c678">
      {PADS.map(([cx, cy], i) => (
        <circle key={`pad-${i}`} className="sb-pad" cx={cx} cy={cy} r="3" style={{ animationDelay: `${(i % 8) * 70}ms` }} />
      ))}
    </g>
  </svg>
);

export default SignalBoard;
