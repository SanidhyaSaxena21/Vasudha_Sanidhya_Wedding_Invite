import React from "react";
import { motion } from "framer-motion";

export const EASE = [0.16, 1, 0.3, 1];

export const FadeUp = ({ children, delay = 0, className = "", ...rest }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 26 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 0.9, ease: EASE, delay }}
    {...rest}
  >
    {children}
  </motion.div>
);

export const SectionHeading = ({ eyebrow, title, sub }) => (
  <div className="text-center px-6">
    <FadeUp>
      <p className="font-cormorant text-champagne/80 text-xs sm:text-sm uppercase" style={{ letterSpacing: "0.38em" }}>
        {eyebrow}
      </p>
    </FadeUp>
    <FadeUp delay={0.12}>
      <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl text-foil mt-4" data-testid="section-heading">
        {title}
      </h2>
    </FadeUp>
    {sub && (
      <FadeUp delay={0.2}>
        <p className="font-cormorant italic text-ivory/70 text-base sm:text-lg mt-4 max-w-xl mx-auto">{sub}</p>
      </FadeUp>
    )}
    <FadeUp delay={0.26} className="flex justify-center mt-6">
      <GoldRule />
    </FadeUp>
  </div>
);

export const GoldRule = ({ className = "" }) => (
  <span className={`flex items-center gap-3 ${className}`}>
    <span className="gold-hairline w-16 sm:w-24" />
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
      <rect x="13" y="3.2" width="13.8" height="13.8" transform="rotate(45 13 3.2)" transform-origin="13 13" stroke="#C99A45" strokeWidth="1" fill="none" />
      <circle cx="13" cy="13" r="2.2" fill="#C99A45" />
      <circle cx="13" cy="4" r="1" fill="#E1BF78" />
      <circle cx="13" cy="22" r="1" fill="#E1BF78" />
      <circle cx="4" cy="13" r="1" fill="#E1BF78" />
      <circle cx="22" cy="13" r="1" fill="#E1BF78" />
    </svg>
    <span className="gold-hairline w-16 sm:w-24" />
  </span>
);

/* Heart-shaped integrated circuit — the S&V mark */
export const HeartCircuit = ({ className = "", stroke = "#C99A45", trace = "#E1BF78" }) => (
  <svg viewBox="0 0 64 60" fill="none" className={className} aria-hidden="true">
    <path
      d="M32 55 C20 46 12.5 37.5 12.5 28.5 C12.5 21.5 17.5 16.5 23.5 16.5 C27.5 16.5 30.6 19 32 22.5 C33.4 19 36.5 16.5 40.5 16.5 C46.5 16.5 51.5 21.5 51.5 28.5 C51.5 37.5 44 46 32 55 Z"
      stroke={stroke}
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <path d="M18 27 H26 L29.5 30.5 H34.5 L38 27 H46" stroke={trace} strokeWidth="1" strokeLinecap="round" />
    <path d="M23 35 H41" stroke={trace} strokeWidth="1" strokeLinecap="round" />
    <circle cx="18" cy="27" r="1.6" fill={trace} />
    <circle cx="46" cy="27" r="1.6" fill={trace} />
    <circle cx="23" cy="35" r="1.3" fill={stroke} />
    <circle cx="41" cy="35" r="1.3" fill={stroke} />
  </svg>
);

/* Fine gold PCB trace corner ornament — VLSI nod, kept delicate */
export const PcbCorner = ({ className = "", style }) => (
  <svg viewBox="0 0 64 64" fill="none" className={className} style={style} aria-hidden="true">
    <path d="M7 30 V13 H24" stroke="#C99A45" strokeWidth="1" />
    <path d="M7 44 H19 L28 35 H40" stroke="#C99A45" strokeWidth="1" />
    <circle cx="7" cy="32.5" r="1.6" fill="#E1BF78" />
    <circle cx="26.5" cy="13" r="1.6" fill="#E1BF78" />
    <circle cx="42.5" cy="35" r="1.6" fill="#E1BF78" />
    <path d="M20 50 H30" stroke="#C99A45" strokeWidth="1" />
    <circle cx="32.5" cy="50" r="1.3" fill="#E1BF78" />
  </svg>
);

/* Corner floral flourish for cards */
export const CornerFlourish = ({ className = "" }) => (
  <svg viewBox="0 0 60 60" fill="none" className={className} aria-hidden="true">
    <path
      d="M3 57 C3 30 8 14 30 8 C43 4.5 53 8 56 14 C58.5 19.5 55 25 49.5 24.5 C45 24 42.5 19.5 45.5 16.5"
      stroke="#C99A45"
      strokeWidth="1.1"
      strokeLinecap="round"
    />
    <path d="M3 57 C10 46 18 40 30 38" stroke="#C99A45" strokeWidth="0.9" strokeLinecap="round" />
    <circle cx="30" cy="38" r="1.8" fill="#E1BF78" />
    <circle cx="22" cy="44" r="1.3" fill="#C99A45" />
    <circle cx="38" cy="34" r="1.3" fill="#C99A45" />
    <circle cx="49.5" cy="14" r="1.5" fill="#E1BF78" />
  </svg>
);
