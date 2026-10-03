import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { EASE, HeartChip, SignalWave } from "./shared";

const BOKEH_IMG =
  "https://images.unsplash.com/photo-1597972090332-bf44fceb6364?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600";

const QUOTE =
  "Two signals locked in phase, integrated on the same silicon, wired together for a lifetime of love.";

const MaskedLine = ({ children, delay }) => (
  <span className="block overflow-hidden pb-[0.22em] -mb-[0.22em]">
    <motion.span
      className="block"
      initial={{ y: "112%" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1.15, ease: EASE, delay }}
    >
      {children}
    </motion.span>
  </span>
);

/* SECTION 2 — THE REVEAL */
const MainInvitation = ({ goToSection }) => {
  const ref = useRef(null);
  const [blooming, setBlooming] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yMark = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const goInvite = () => {
    if (blooming) return;
    setBlooming(true);
    window.setTimeout(() => goToSection("#invitation"), 480);
    window.setTimeout(() => setBlooming(false), 1500);
  };

  return (
    <section
      ref={ref}
      id="story"
      className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden px-6 py-24 scroll-mt-4"
      data-testid="invitation-hero"
    >
      {/* ivory veil — the zoomed invitation card we arrive through */}
      <motion.div
        className="fixed inset-0 z-[70] bg-ivory flex items-center justify-center pointer-events-none"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.85, delay: 0.1, ease: "easeInOut" }}
      >
        <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1.25 }} transition={{ duration: 1.1, delay: 0.1, ease: "easeInOut" }}>
          <HeartChip className="w-32 opacity-[0.08]" stroke="#5d0a1c" trace="#a67527" />
        </motion.div>
      </motion.div>

      {/* faint candlelight bokeh backdrop */}
      <img src={BOKEH_IMG} alt="" draggable="false" className="absolute inset-0 w-full h-full object-cover opacity-[0.13]" />
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(90% 70% at 50% 38%, rgba(74,6,18,0.35) 0%, rgba(21,2,5,0.92) 100%)" }}
      />

      {/* parallax watermark heart-circuit */}
      <motion.div style={{ y: yMark }} className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <HeartChip className="w-[80vw] max-w-[620px] opacity-[0.05]" stroke="#E1BF78" trace="#E1BF78" />
      </motion.div>

      <motion.div style={{ opacity: fade }} className="relative z-10 text-center max-w-3xl mx-auto flex flex-col items-center">
        <motion.p
          className="font-cinzel text-gold/85 text-[11px] sm:text-xs uppercase"
          style={{ letterSpacing: "0.38em" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.9 }}
          data-testid="hero-shloka"
        >
          || Shree Ganeshaay Namah ||
        </motion.p>

        <h1 className="mt-8 leading-[1.05]">
          <MaskedLine delay={1.35}>
            <span className="font-script text-7xl sm:text-8xl lg:text-9xl text-foil">Sanidhya</span>
          </MaskedLine>
          <MaskedLine delay={1.55}>
            <span className="inline-flex items-center gap-5 justify-center py-3">
              <span className="gold-hairline w-14 sm:w-24" />
              <span className="font-cinzel text-2xl sm:text-3xl text-gold">&amp;</span>
              <span className="gold-hairline w-14 sm:w-24" />
            </span>
          </MaskedLine>
          <MaskedLine delay={1.75}>
            <span className="font-script text-7xl sm:text-8xl lg:text-9xl text-foil">Vasudha</span>
          </MaskedLine>
        </h1>

        <motion.p
          className="font-cinzel text-champagne text-xs sm:text-sm uppercase mt-9"
          style={{ letterSpacing: "0.32em" }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 2.15 }}
          data-testid="hero-subtitle"
        >
          An Integrated Circuit of Love
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.5 }}
          className="mt-8 flex flex-col items-center gap-7"
        >
          <SignalWave className="w-52 sm:w-64 opacity-90" />
          <blockquote className="font-cormorant italic text-ivory/85 text-lg sm:text-xl leading-relaxed max-w-lg" data-testid="hero-quote">
            &ldquo;{QUOTE}&rdquo;
          </blockquote>
          <HeartChip className="w-52 max-w-full opacity-90" style={{ filter: "drop-shadow(0 0 10px rgba(201,154,69,0.35))" }} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE, delay: 3 }}>
          <button
            type="button"
            data-testid="open-invitation-btn"
            onClick={goInvite}
            className="mt-12 inline-flex items-center gap-3 font-cinzel text-[11px] sm:text-xs uppercase tracking-[0.3em] text-champagne border border-gold/50 rounded-full px-9 py-4 hover:bg-gold/15 hover:border-gold hover:shadow-[0_0_30px_rgba(201,154,69,0.35)] transition-all duration-300"
          >
            Open the Invitation
          </button>
        </motion.div>
      </motion.div>

      {/* bloom transition into the formal invitation */}
      <AnimatePresence>
        {blooming && (
          <motion.div
            key="bloom"
            className="fixed inset-0 z-[75] bg-ivory pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default MainInvitation;
