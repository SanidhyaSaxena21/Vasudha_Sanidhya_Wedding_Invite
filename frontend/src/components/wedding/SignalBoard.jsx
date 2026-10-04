import React from "react";

/*
 * Page 1 — symmetric antique-gold circuit frame that sits in the empty
 * centre of the burgundy velvet background. On tap, bright "signals" draw
 * along the feeder traces and gather UP to the "Two Hearts One Journey" title
 * (from above and below).
 */

// Animated feeders — authored source -> title so the draw travels toward the text.
const FEEDERS = [
  // top feeders (draw downward onto the upper bus, y=300)
  "M200 100 L200 180 L184 300",
  "M200 100 L200 180 L216 300",
  "M165 118 L165 210 L148 240 L130 300",
  "M235 118 L235 210 L252 240 L270 300",
  "M126 138 L126 252 L108 300",
  "M274 138 L274 252 L292 300",
  // bottom feeders (draw upward onto the lower bus, y=560)
  "M200 660 L200 620 L184 560",
  "M200 660 L200 620 L216 560",
  "M165 672 L165 612 L148 588 L130 560",
  "M235 672 L235 612 L252 588 L270 560",
  "M126 660 L126 600 L108 560",
  "M274 660 L274 600 L292 560",
];

// Static hexagon frame + title bus bars.
const FRAME = [
  "M108 300 H292",
  "M108 560 H292",
  "M108 300 L58 352 L58 508 L108 560",
  "M292 300 L342 352 L342 508 L292 560",
];

const HEART =
  "M200 512 C176 490 158 476 158 457 C158 445 169 436 181 436 C190 436 198 442 200 450 C202 442 210 436 219 436 C231 436 242 445 242 457 C242 476 224 490 200 512 Z";

const PADS = [
  [200, 100], [165, 118], [235, 118], [126, 138], [274, 138],
  [200, 660], [165, 672], [235, 672], [126, 660], [274, 660],
];

const NODES = [
  [200, 300], [200, 560],
  [108, 300], [292, 300], [108, 560], [292, 560],
  [58, 352], [342, 352], [58, 508], [342, 508],
  [58, 430], [342, 430],
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

    {/* dim static frame */}
    <g stroke="url(#sb-gold)" strokeWidth="1.3" fill="none" opacity="0.55" strokeLinecap="round" strokeLinejoin="round">
      {FRAME.map((d, i) => (
        <path key={`frame-${i}`} d={d} />
      ))}
    </g>

    {/* dim base of the feeder traces */}
    <g stroke="url(#sb-gold)" strokeWidth="1.1" fill="none" opacity="0.4" strokeLinecap="round" strokeLinejoin="round">
      {FEEDERS.map((d, i) => (
        <path key={`base-${i}`} d={d} />
      ))}
    </g>

    {/* bright travelling signals that gather at the title */}
    <g stroke="#ffe9b8" strokeWidth="2.3" fill="none" strokeLinecap="round" strokeLinejoin="round" filter="url(#sb-glow)">
      {FEEDERS.map((d, i) => (
        <path
          key={`pulse-${i}`}
          className="sb-pulse"
          d={d}
          pathLength="1"
          style={{ animationDelay: `${(i % 6) * 80}ms` }}
        />
      ))}
    </g>

    {/* bus bars glow once the signals arrive */}
    <g stroke="#ffe3a6" strokeWidth="2.3" strokeLinecap="round" filter="url(#sb-glow)">
      <path className="sb-bus" d="M108 300 H292" pathLength="1" />
      <path className="sb-bus" d="M108 560 H292" pathLength="1" />
    </g>

    {/* heart woven into the lower frame */}
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

    {/* decorative nodes along the frame */}
    <g fill="#e9c678" opacity="0.7">
      {NODES.map(([cx, cy], i) => (
        <circle key={`node-${i}`} cx={cx} cy={cy} r="2.6" />
      ))}
    </g>

    {/* connection pads at every signal source */}
    <g fill="#e9c678">
      {PADS.map(([cx, cy], i) => (
        <circle key={`pad-${i}`} className="sb-pad" cx={cx} cy={cy} r="3" style={{ animationDelay: `${(i % 6) * 80}ms` }} />
      ))}
    </g>
  </svg>
);

export default SignalBoard;
