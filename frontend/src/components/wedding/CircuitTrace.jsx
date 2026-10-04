import React from "react";

// Gold PCB trace layer; paths radiate from the chip and animate when energized.
export const CircuitTrace = ({ energized = false, className = "" }) => {
  return (
    <svg
      className={`wc-trace-svg ${energized ? "is-energized" : ""} ${className}`}
      viewBox="0 0 400 760"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="trace-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8a5a1f" />
          <stop offset="50%" stopColor="#C9923E" />
          <stop offset="100%" stopColor="#E1B96C" />
        </linearGradient>
        <filter id="trace-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="2.2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g
        stroke="url(#trace-gold)"
        strokeWidth="1.4"
        fill="none"
        opacity="0.72"
        filter="url(#trace-glow)"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
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
        <circle className="wc-pad" cx="40" cy="150" r="3" />
        <circle className="wc-pad" cx="30" cy="470" r="3" />
        <circle className="wc-pad" cx="60" cy="560" r="3" />
        <circle className="wc-pad" cx="360" cy="150" r="3" />
        <circle className="wc-pad" cx="370" cy="470" r="3" />
        <circle className="wc-pad" cx="340" cy="560" r="3" />
        <circle className="wc-pad" cx="160" cy="70" r="3" />
        <circle className="wc-pad" cx="240" cy="70" r="3" />
        <circle className="wc-pad" cx="160" cy="690" r="3" />
        <circle className="wc-pad" cx="240" cy="690" r="3" />
      </g>
    </svg>
  );
};

export default CircuitTrace;
