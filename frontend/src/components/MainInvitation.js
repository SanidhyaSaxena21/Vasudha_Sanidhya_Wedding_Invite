import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { EASE, HeartCircuit } from "./shared";

const BOKEH_IMG =
  "https://images.unsplash.com/photo-1597972090332-bf44fceb6364?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600";

/* PLACEHOLDER DATE — replace with the real wedding date */
const WEDDING_DATE = "14 February 2026";
/* PLACEHOLDER CITY — replace with the real city */
const WEDDING_CITY = "Udaipur, Rajasthan";

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

const MainInvitation = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yMark = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden px-6 py-24"
      data-testid="invitation-hero"
    >
      {/* ivory veil — the zoomed invitation card we arrive through */}
      <motion.div
        className="fixed inset-0 z-[70] bg-ivory flex items-center justify-center pointer-events-none"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.85, delay: 0.1, ease: "easeInOut" }}
      >
        <motion.div
          initial={{ scale: 0.9 }} animate={{ scale: 1.25 }} transition={{ duration: 1.1, delay: 0.1, ease: "easeInOut" }}
        >
          <HeartCircuit className="w-24 opacity-[0.08]" stroke="#5d0a1c" trace="#a67527" />
        </motion.div>
      </motion.div>

      {/* faint candlelight bokeh backdrop */}
      <img
        src={BOKEH_IMG}
        alt=""
        draggable="false"
        className="absolute inset-0 w-full h-full object-cover opacity-[0.13]"
      />
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(90% 70% at 50% 38%, rgba(74,6,18,0.35) 0%, rgba(21,2,5,0.92) 100%)" }}
      />

      {/* parallax watermark monogram */}
      <motion.div style={{ y: yMark }} className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <HeartCircuit className="w-[62vw] max-w-[560px] opacity-[0.045]" stroke="#E1BF78" trace="#E1BF78" />
      </motion.div>

      <motion.div style={{ opacity: fade }} className="relative z-10 text-center max-w-3xl mx-auto">
        <motion.p
          className="font-cormorant text-gold/80 text-xs sm:text-sm uppercase"
          style={{ letterSpacing: "0.4em" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.9 }}
        >
          ॥ श्री गणेशाय नमः ॥
        </motion.p>

        <motion.p
          className="font-cormorant italic text-ivory/70 text-base sm:text-lg mt-5"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 1.05 }}
        >
          Together with the blessings of our families
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

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="mt-10 flex flex-col items-center gap-5"
        >
          <p className="font-cormorant italic text-ivory/80 text-lg sm:text-xl max-w-md">
            we joyfully invite you to celebrate our wedding — a union of two hearts, two families, one destiny
          </p>
          <p className="font-cinzel text-champagne text-sm sm:text-base tracking-[0.3em] uppercase" data-testid="hero-date">
            {WEDDING_DATE} · {WEDDING_CITY}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.4 }}
          className="mt-16 flex flex-col items-center gap-2 text-champagne/70"
        >
          <span className="font-cormorant text-xs uppercase tracking-[0.3em]">Scroll</span>
          <ChevronDown className="w-4 h-4 animate-bounce" data-testid="hero-scroll-cue" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default MainInvitation;
