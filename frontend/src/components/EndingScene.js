import { motion } from "framer-motion";
import { FadeUp, HeartChip } from "./shared";
import PetalCanvas from "./PetalCanvas";

const BG =
  "https://static.prod-images.emergentagent.com/jobs/6c8a2320-6c63-453a-9c0f-f6c23ee3b38d/images/6ef80005ac673d9f0153d968637b7f5d2f211d9e719e42c4bca57eba55ab4719.jpeg";

const GLOW = { filter: "drop-shadow(0 0 6px rgba(233,195,120,0.85))" };

/* SECTION 10 — FINAL CINEMATIC ENDING */
const EndingScene = () => (
  <section
    id="ending"
    className="relative min-h-[100svh] overflow-hidden flex justify-center"
    data-testid="ending-scene"
  >
    <img src={BG} alt="" draggable="false" className="absolute inset-0 w-full h-full object-cover" />
    <div className="absolute inset-0 bg-gradient-to-b from-wine/40 via-wine/25 to-wine/90" />
    <PetalCanvas density="low" className="absolute inset-0 w-full h-full opacity-70" />

    <div className="relative z-10 w-full max-w-3xl mx-auto text-center px-6 pt-16 pb-14 min-h-[100svh] flex flex-col items-center justify-between">
      {/* names lifted into the clouds for visibility */}
      <FadeUp>
        <p
          className="font-script text-5xl sm:text-6xl md:text-7xl text-foil leading-tight"
          style={{ textShadow: "0 3px 26px rgba(26,3,7,0.9), 0 0 40px rgba(233,195,120,0.35)" }}
          data-testid="ending-names"
        >
          Sanidhya &amp; Vasudha
        </p>
        <p
          className="font-cinzel text-champagne text-sm sm:text-base tracking-[0.4em] uppercase mt-5"
          style={{ textShadow: "0 2px 16px rgba(26,3,7,0.9)" }}
        >
          December 2026
        </p>
      </FadeUp>

      {/* closing — circuit traces on the floor, connecting into a glowing heart */}
      <div className="flex flex-col items-center mt-auto">
        <svg viewBox="0 0 300 170" fill="none" className="w-64 sm:w-80 mb-6" aria-hidden="true">
          <motion.path
            d="M0 138 H92 L112 118 H136"
            stroke="#C99A45" strokeWidth="1.1" style={GLOW}
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0.3 }} transition={{ duration: 1.4, ease: "easeOut" }}
          />
          <motion.path
            d="M300 138 H208 L188 118 H164"
            stroke="#C99A45" strokeWidth="1.1" style={GLOW}
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0.3 }} transition={{ duration: 1.4, delay: 0.3, ease: "easeOut" }}
          />
          <motion.path
            d="M40 170 V150 L62 128"
            stroke="#E1BF78" strokeWidth="0.9" opacity="0.8"
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0.3 }} transition={{ duration: 1, delay: 0.6 }}
          />
          <motion.path
            d="M260 170 V150 L238 128"
            stroke="#E1BF78" strokeWidth="0.9" opacity="0.8"
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0.3 }} transition={{ duration: 1, delay: 0.8 }}
          />
          <motion.path
            d="M150 132 C131 118 118 105 118 90 C118 79 127 70 138 70 C144 70 149 74 150 79 C151 74 156 70 162 70 C173 70 182 79 182 90 C182 105 169 118 150 132 Z"
            stroke="#E1BF78" strokeWidth="1.6" strokeLinejoin="round" style={GLOW}
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0.3 }} transition={{ duration: 2, delay: 1.1, ease: "easeInOut" }}
          />
          <motion.circle
            cx="150" cy="99" r="2.2" fill="#F3D9A0" style={GLOW}
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ delay: 2.6, duration: 0.8 }}
          />
        </svg>

        <FadeUp>
          <p className="font-cormorant italic text-ivory/90 text-xl sm:text-2xl" data-testid="ending-lookforward">
            We look forward to celebrating with you!
          </p>
        </FadeUp>
        <FadeUp delay={0.3}>
          <span className="gold-hairline w-44 mx-auto block my-6" />
          <p className="font-cormorant italic text-ivory/80 text-base sm:text-lg">Two hearts. One journey. One forever.</p>
        </FadeUp>
        <FadeUp delay={0.5}>
          <HeartChip className="w-40 max-w-full mt-7 opacity-85" />
        </FadeUp>
      </div>
    </div>
  </section>
);

export default EndingScene;
