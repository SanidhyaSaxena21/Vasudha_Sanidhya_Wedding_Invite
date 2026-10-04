import { motion, AnimatePresence } from "framer-motion";
import { Timer, ArrowLeft } from "lucide-react";
import { HeartCircuit } from "./shared";

/* Glowing heart the guest taps to move to the next page. */
export const AdvanceHeart = ({ onNext, label = "Tap the heart to continue", delay = 0 }) => (
  <motion.div
    className="page-advance"
    data-testid="page-advance-heart"
    initial={{ opacity: 0, y: 18 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
  >
    <button
      type="button"
      className="advance-heart"
      onClick={onNext}
      data-testid="advance-heart-btn"
      aria-label={label}
    >
      <span className="advance-heart-halo" aria-hidden="true" />
      <HeartCircuit className="advance-heart-svg" stroke="#e1bf78" trace="#f3dcae" />
    </button>
    <span className="advance-label font-cormorant">{label}</span>
  </motion.div>
);

/* Glowing countdown dial the guest taps to reach the countdown. */
export const AdvanceCountdown = ({ onNext, label = "Begin the Countdown", delay = 0 }) => (
  <motion.div
    className="page-advance"
    data-testid="page-advance-countdown"
    initial={{ opacity: 0, y: 18 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
  >
    <button
      type="button"
      className="advance-heart advance-countdown"
      onClick={onNext}
      data-testid="advance-countdown-btn"
      aria-label={label}
    >
      <span className="advance-heart-halo" aria-hidden="true" />
      <Timer className="advance-countdown-icon" strokeWidth={1.3} aria-hidden="true" />
    </button>
    <span className="advance-label font-cormorant">{label}</span>
  </motion.div>
);

/* Subtle back control shown on every page after the first. */
export const BackButton = ({ onBack }) => (
  <button
    type="button"
    className="page-back"
    onClick={onBack}
    data-testid="page-back-btn"
    aria-label="Go back to the previous page"
  >
    <ArrowLeft size={15} aria-hidden="true" />
    <span className="font-cinzel">Back</span>
  </button>
);

/* The "heart coming in between" veil that bridges one page to the next. */
export const HeartTransition = ({ active }) => (
  <AnimatePresence>
    {active && (
      <motion.div
        className="heart-transition"
        data-testid="heart-transition"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <motion.div
          className="heart-transition-heart"
          initial={{ scale: 0.3, opacity: 0 }}
          animate={{ scale: [0.3, 1.08, 1], opacity: [0, 1, 1] }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="heart-transition-halo" aria-hidden="true" />
          <HeartCircuit className="heart-transition-svg" stroke="#e1bf78" trace="#f3dcae" />
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);
