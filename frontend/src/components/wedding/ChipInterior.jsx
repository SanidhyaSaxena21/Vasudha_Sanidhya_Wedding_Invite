import React from "react";
import { motion } from "framer-motion";
import { HeartCircuit } from "./ornaments";

// The glowing silicon die revealed inside the chip once the lid lifts.
export const ChipInterior = ({ open = false }) => {
  return (
    <div className={`wc-die ${open ? "is-open" : ""}`} aria-hidden={!open}>
      <div className="wc-die-surface">
        <svg className="wc-bondwires" viewBox="0 0 320 320" fill="none" aria-hidden="true">
          <g stroke="#E1B96C" strokeWidth="1" opacity="0.7" strokeLinecap="round">
            <path d="M70 70 L30 30M110 60 L100 18M160 56 L160 14M210 60 L220 18M250 70 L290 30" />
            <path d="M70 250 L30 290M110 260 L100 302M160 264 L160 306M210 260 L220 302M250 250 L290 290" />
            <path d="M60 110 L18 100M56 160 L14 160M60 210 L18 220" />
            <path d="M260 110 L302 100M264 160 L306 160M260 210 L302 220" />
          </g>
          <g fill="#E1B96C" opacity="0.8">
            {[30, 100, 160, 220, 290].map((x) => (
              <circle key={`t${x}`} cx={x} cy={18} r="2.4" />
            ))}
            {[30, 100, 160, 220, 290].map((x) => (
              <circle key={`b${x}`} cx={x} cy={302} r="2.4" />
            ))}
          </g>
        </svg>

        <div className="wc-die-inner">
          <p className="wc-die-text">
            <span>Two Hearts</span>
            <span>One Journey</span>
          </p>

          <div className="wc-heart-form">
            <motion.span
              className="wc-trace-l"
              initial={{ scaleX: 0 }}
              animate={open ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease: "easeInOut" }}
            />
            <motion.span
              className="wc-trace-r"
              initial={{ scaleX: 0 }}
              animate={open ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease: "easeInOut" }}
            />
            <motion.div
              className="wc-heart-core"
              initial={{ opacity: 0, scale: 0.4 }}
              animate={open ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.4 }}
              transition={{ duration: 0.6, delay: 1.1, ease: "easeOut" }}
            >
              <HeartCircuit size={86} glow />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChipInterior;
