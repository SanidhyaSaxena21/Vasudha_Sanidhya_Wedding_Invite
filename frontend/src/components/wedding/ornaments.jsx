import React from "react";

const gold = "#E1B96C";

export const GaneshaMark = ({ size = 56, className = "", stroke = gold }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" className={className} fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M50 10c3 0 5 2 5 5m-10 0c0-3 2-5 5-5" />
    <path d="M44 15c0 4-2 6-5 7m22-7c0 4 2 6 5 7" opacity="0.9" />
    <path d="M33 28c0-9 8-15 17-15s17 6 17 15c0 6-3 10-7 13" />
    <path d="M33 28c-4 3-7 7-7 13 0 11 11 19 24 19s24-8 24-19c0-6-3-10-7-13" />
    <path d="M30 34c-6-1-11 3-11 9s5 10 11 9" />
    <path d="M70 34c6-1 11 3 11 9s-5 10-11 9" />
    <path d="M50 40c0 6-1 11-5 15-3 3-3 8 1 10s8-1 8-6" />
    <path d="M44 52c2 2 4 3 6 3s4-1 6-3" opacity="0.85" />
    <path d="M40 38c1.5-1.5 4-1.5 5.5 0M54.5 38c1.5-1.5 4-1.5 5.5 0" />
    <path d="M50 20v8" opacity="0.85" />
  </svg>
);

export const HeartCircuit = ({ size = 72, className = "", glow = false }) => (
  <svg width={size} height={size * 0.82} viewBox="0 0 120 100" className={`${className} ${glow ? "hc-glow" : ""}`} fill="none" stroke={gold} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path className="hc-heart" d="M60 86C40 70 22 56 22 38a18 18 0 0 1 34-8 18 18 0 0 1 34 8c0 18-18 32-30 48z" />
    <g opacity="0.95">
      <path d="M22 44H6M10 44v-9M10 44v9" />
      <path d="M98 44h16M110 44v-9M110 44v9" />
      <path d="M60 30V14M53 14h14" />
      <path d="M60 86v10" />
    </g>
    <g fill={gold} stroke="none">
      <circle cx="6" cy="44" r="2.4" />
      <circle cx="114" cy="44" r="2.4" />
      <circle cx="60" cy="14" r="2.4" />
    </g>
  </svg>
);

export const LotusDivider = ({ width = 220, className = "" }) => (
  <svg width={width} height="26" viewBox="0 0 220 26" className={className} fill="none" stroke={gold} strokeWidth="1.3" strokeLinecap="round" aria-hidden="true">
    <line x1="4" y1="13" x2="86" y2="13" opacity="0.75" />
    <line x1="134" y1="13" x2="216" y2="13" opacity="0.75" />
    <g>
      <path d="M110 4c-3 4-3 9 0 13 3-4 3-9 0-13z" />
      <path d="M110 17c-4-3-9-3-13 0 4 3 9 3 13 0z" />
      <path d="M110 17c4-3 9-3 13 0-4 3-9 3-13 0z" />
      <path d="M101 8c-1 4 1 7 4 9M119 8c1 4-1 7-4 9" opacity="0.8" />
    </g>
    <circle cx="90" cy="13" r="1.6" fill={gold} stroke="none" />
    <circle cx="130" cy="13" r="1.6" fill={gold} stroke="none" />
  </svg>
);

export const CornerFloral = ({ size = 170, className = "", flip = false }) => (
  <svg width={size} height={size} viewBox="0 0 170 170" className={className} style={flip ? { transform: "scaleX(-1)" } : undefined} fill="none" stroke={gold} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <g opacity="0.85">
      <path d="M10 160c0-40 12-74 44-96 20-14 44-20 68-22" />
      <path d="M40 132c-6-10-4-22 6-30 4 12 2 22-6 30z" />
      <path d="M40 132c-11-3-18-13-18-25 11 4 17 14 18 25z" />
      <path d="M40 132c11-3 18-13 18-25-11 4-17 14-18 25z" />
      <path d="M40 132c-2-12 3-24 13-31 2 12-3 24-13 31z" />
      <path d="M40 132c2-12-3-24-13-31-2 12 3 24 13 31z" />
      <path d="M78 96c6-4 13-4 18 1-6 4-13 4-18-1z" />
      <path d="M104 74c6-4 13-3 18 2-7 3-13 2-18-2z" />
      <path d="M92 110c-5 5-5 12 0 17 4-5 4-12 0-17z" />
      <circle cx="122" cy="52" r="2" fill={gold} stroke="none" />
      <circle cx="98" cy="70" r="1.6" fill={gold} stroke="none" />
    </g>
  </svg>
);

export const SignalWave = ({ width = 300, className = "", draw = false }) => (
  <svg width={width} height="34" viewBox="0 0 300 34" className={`${className} ${draw ? "sw-draw" : ""}`} fill="none" stroke={gold} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path className="sw-line" d="M2 17h96l8-11 9 22 8-15 7 9 9-4h14l6-9 9 22 8-14 7 9 9-4h74" />
    <circle cx="4" cy="17" r="2.6" fill={gold} stroke="none" />
    <circle cx="296" cy="17" r="2.6" fill={gold} stroke="none" />
  </svg>
);

export const HeartChip = ({ width = 150, className = "", energized = false }) => (
  <svg width={width} height={width * 0.62} viewBox="0 0 240 150" className={`${className} ${energized ? "hchip-on" : ""}`} fill="none" stroke={gold} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <g className="hchip-trace" opacity="0.9">
      <path d="M78 55H26l-12-12H2M78 75H10M78 95H26l-12 12H2" />
      <path d="M162 55h52l12-12h12M162 75h68M162 95h52l12 12h12" />
      <circle cx="2" cy="43" r="2.4" fill={gold} stroke="none" />
      <circle cx="2" cy="75" r="2.4" fill={gold} stroke="none" />
      <circle cx="2" cy="107" r="2.4" fill={gold} stroke="none" />
      <circle cx="238" cy="43" r="2.4" fill={gold} stroke="none" />
      <circle cx="238" cy="75" r="2.4" fill={gold} stroke="none" />
      <circle cx="238" cy="107" r="2.4" fill={gold} stroke="none" />
    </g>
    <rect x="78" y="34" width="84" height="82" rx="8" />
    <g strokeWidth="2.4">
      <path d="M92 34v-9M108 34v-9M124 34v-9M140 34v-9M148 34v-9M86 34v-9" />
      <path d="M92 116v9M108 116v9M124 116v9M140 116v9M148 116v9M86 116v9" />
    </g>
    <path className="hchip-heart" d="M120 102c-12-9-22-17-22-28a11 11 0 0 1 22-5 11 11 0 0 1 22 5c0 11-10 19-22 28z" />
  </svg>
);
