import { motion } from "framer-motion";
import { EASE, SignalWave, HeartChip } from "./shared";

const BG = "/images/chip/page2_bg.jpg";
const GANESHA = "/images/chip/ganesha.png";

const QUOTE =
  "Two signals locked in phase, integrated on the same silicon, wired together for a lifetime of love.";

/* Ornamental gold circuit frame that draws itself in, then energizes. */
const CircuitFrame = ({ energize }) => (
  <svg className={`inv-frame ${energize ? "is-live" : ""}`} viewBox="0 0 100 150" preserveAspectRatio="none" aria-hidden="true">
    <motion.path
      d="M8 14 H46 M54 14 H92 M92 14 V64 M92 86 V136 H54 M46 136 H8 V86 M8 64 V14"
      fill="none"
      stroke="#c99a45"
      strokeWidth="0.45"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 2.4, ease: EASE, delay: 0.2 }}
    />
    {/* node taps along the frame */}
    <g fill="#e1bf78" className="inv-frame-nodes">
      <circle cx="8" cy="14" r="0.8" /><circle cx="92" cy="14" r="0.8" />
      <circle cx="92" cy="136" r="0.8" /><circle cx="8" cy="136" r="0.8" />
      <circle cx="50" cy="14" r="0.7" /><circle cx="92" cy="75" r="0.7" />
      <circle cx="50" cy="136" r="0.7" /><circle cx="8" cy="75" r="0.7" />
    </g>
  </svg>
);

const Reveal = ({ delay = 0, children, className = "", y = 16, ...rest }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1.1, ease: EASE, delay }}
    {...rest}
  >
    {children}
  </motion.div>
);

export default function InvitationHero() {
  return (
    <section
      id="story"
      className="inv-hero"
      data-testid="invitation-hero"
    >
      <img src={BG} alt="" className="inv-bg" draggable="false" />
      <div className="inv-bg-tint" aria-hidden="true" />
      <div className="inv-center-backdrop" aria-hidden="true" />
      <CircuitFrame energize />

      <div className="inv-content">
        <motion.img
          src={GANESHA}
          alt="Lord Ganesha"
          className="inv-ganesha"
          data-testid="inv-ganesha"
          draggable="false"
          initial={{ opacity: 0, scale: 0.86 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: EASE }}
        />

        <Reveal delay={0.4}>
          <p className="font-cinzel inv-shloka" data-testid="inv-shloka">|| Shree Ganeshaay Namah ||</p>
          <span className="gold-hairline inv-shloka-rule" />
        </Reveal>

        <motion.h1
          className="inv-names"
          data-testid="inv-names"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 1.0 }}
        >
          <span className="font-cormorantsc text-foil inv-names-sweep">Sanidhya</span>
          <span className="font-cinzel inv-amp">&amp;</span>
          <span className="font-cormorantsc text-foil inv-names-sweep">Vasudha</span>
        </motion.h1>

        <Reveal delay={1.7} className="inv-ornament-row">
          <svg width="130" height="16" viewBox="0 0 130 16" fill="none" aria-hidden="true">
            <path d="M2 8 H52" stroke="#c99a45" strokeWidth="0.9" />
            <path d="M78 8 H128" stroke="#c99a45" strokeWidth="0.9" />
            <path d="M65 3 C61 7 61 9 65 13 C69 9 69 7 65 3Z" stroke="#e1bf78" strokeWidth="0.9" />
            <circle cx="52" cy="8" r="1.2" fill="#e1bf78" /><circle cx="78" cy="8" r="1.2" fill="#e1bf78" />
          </svg>
        </Reveal>

        <Reveal delay={1.7}>
          <p className="font-cormorant italic inv-subtitle" data-testid="inv-subtitle">An Integrated Circuit of Love</p>
        </Reveal>

        <motion.div
          className="inv-wave"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.3, delay: 2.2, ease: EASE }}
        >
          <SignalWave className="inv-wave-svg" />
        </motion.div>

        <Reveal delay={2.8}>
          <blockquote className="font-cormorant italic inv-quote" data-testid="inv-quote">
            &ldquo;{QUOTE}&rdquo;
          </blockquote>
        </Reveal>

        <motion.div
          className="inv-heartchip"
          data-testid="inv-heartchip"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 3.6, ease: EASE }}
        >
          <HeartChip className="inv-heartchip-svg" />
        </motion.div>

        <motion.span
          className="inv-scroll-cue"
          data-testid="inv-scroll-cue"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 1, delay: 4.4 }}
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
