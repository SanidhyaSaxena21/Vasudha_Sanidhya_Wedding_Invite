import React from "react";

/*
 * Page 1 — an imaginary IC "chip" holding the title + glowing heart, with
 * gold wires radiating OUTWARD from all four sides. Idle: a gentle shimmer
 * runs along the wires ("powered on"). On tap: bright signals flow outward
 * from the chip to every edge.
 */

// Wires authored CHIP-EDGE -> OUTER-PAD so the draw/shimmer travels outward.
const WIRES = [
  // top (6)
  "M120 300 L120 232 L96 196 L96 78",
  "M155 300 L155 250 L146 214 L146 70",
  "M185 300 L185 250 L185 64",
  "M215 300 L215 250 L215 64",
  "M245 300 L245 250 L254 214 L254 70",
  "M280 300 L280 232 L304 196 L304 78",
  // bottom (6)
  "M120 520 L120 588 L96 624 L96 742",
  "M155 520 L155 570 L146 606 L146 750",
  "M185 520 L185 570 L185 756",
  "M215 520 L215 570 L215 756",
  "M245 520 L245 570 L254 606 L254 750",
  "M280 520 L280 588 L304 624 L304 742",
  // left (4)
  "M78 346 L46 346 L24 324 L16 292",
  "M78 392 L34 392 L16 392",
  "M78 438 L34 438 L16 438",
  "M78 474 L46 474 L24 496 L16 528",
  // right (4)
  "M322 346 L354 346 L376 324 L384 292",
  "M322 392 L366 392 L384 392",
  "M322 438 L366 438 L384 438",
  "M322 474 L354 474 L376 496 L384 528",
];

const PINS = [
  // top & bottom legs
  ...[120, 155, 185, 215, 245, 280].flatMap((x) => [
    `M${x} 312 V300`,
    `M${x} 508 V520`,
  ]),
  // left & right legs
  ...[346, 392, 438, 474].flatMap((y) => [
    `M90 ${y} H78`,
    `M310 ${y} H322`,
  ]),
];

const PADS = [
  [96, 78], [146, 70], [185, 64], [215, 64], [254, 70], [304, 78],
  [96, 742], [146, 750], [185, 756], [215, 756], [254, 750], [304, 742],
  [16, 292], [16, 392], [16, 438], [16, 528],
  [384, 292], [384, 392], [384, 438], [384, 528],
];

export const SignalBoard = ({ live = false, className = "" }) => (
  <svg
    className={`sb-svg ${live ? "is-live" : ""} ${className}`}
    viewBox="0 0 400 820"
    preserveAspectRatio="xMidYMid meet"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="sb-gold" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#8a5a1f" />
        <stop offset="55%" stopColor="#c9923e" />
        <stop offset="100%" stopColor="#e9c678" />
      </linearGradient>
      <filter id="sb-glow" x="-60%" y="-60%" width="220%" height="220%">
        <feGaussianBlur stdDeviation="2.2" result="b" />
        <feMerge>
          <feMergeNode in="b" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    {/* chip pins */}
    <g className="sb-pins" stroke="url(#sb-gold)" strokeWidth="2.6" strokeLinecap="round">
      {PINS.map((d, i) => (
        <path key={`pin-${i}`} d={d} />
      ))}
    </g>

    {/* chip box */}
    <rect
      className="sb-box"
      x="90" y="312" width="220" height="196" rx="16"
      fill="none" stroke="url(#sb-gold)" strokeWidth="1.6" filter="url(#sb-glow)"
    />

    {/* dim base wires */}
    <g stroke="url(#sb-gold)" strokeWidth="1.1" fill="none" opacity="0.4" strokeLinecap="round" strokeLinejoin="round">
      {WIRES.map((d, i) => (
        <path key={`base-${i}`} d={d} />
      ))}
    </g>

    {/* idle shimmer travelling outward (hidden once live) */}
    <g stroke="#ffe9b8" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" filter="url(#sb-glow)">
      {WIRES.map((d, i) => (
        <path
          key={`shim-${i}`}
          className="sb-shimmer"
          d={d}
          pathLength="1"
          style={{ animationDelay: `${(i % 10) * 300}ms` }}
        />
      ))}
    </g>

    {/* bright signals flowing outward on tap */}
    <g stroke="#ffe9b8" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" filter="url(#sb-glow)">
      {WIRES.map((d, i) => (
        <path
          key={`pulse-${i}`}
          className="sb-pulse"
          d={d}
          pathLength="1"
          style={{ animationDelay: `${(i % 10) * 55}ms` }}
        />
      ))}
    </g>

    {/* connection pads */}
    <g fill="#e9c678">
      {PADS.map(([cx, cy], i) => (
        <circle key={`pad-${i}`} className="sb-pad" cx={cx} cy={cy} r="3" style={{ animationDelay: `${(i % 10) * 55}ms` }} />
      ))}
    </g>
  </svg>
);

export default SignalBoard;
