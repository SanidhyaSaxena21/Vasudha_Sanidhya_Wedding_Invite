import { motion } from "framer-motion";
import { FadeUp } from "./shared";
import PetalCanvas from "./PetalCanvas";

const BG =
  "https://static.prod-images.emergentagent.com/jobs/6c8a2320-6c63-453a-9c0f-f6c23ee3b38d/images/6ef80005ac673d9f0153d968637b7f5d2f211d9e719e42c4bca57eba55ab4719.jpeg";

const GLOW = { filter: "drop-shadow(0 0 6px rgba(240,205,122,0.95))" };

/* bright-golden metallic text */
const goldText = {
  backgroundImage: "linear-gradient(180deg,#fdeec0 0%,#f0cf82 45%,#d9a94e 75%,#f3d98a 100%)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  WebkitTextFillColor: "transparent",
  filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.55)) drop-shadow(0 0 16px rgba(240,205,122,0.75))",
};

const Lotus = () => (
  <svg width="120" height="18" viewBox="0 0 120 18" fill="none" aria-hidden="true" className="opacity-90">
    <line x1="4" y1="9" x2="46" y2="9" stroke="#e3b85f" strokeWidth="1" />
    <line x1="74" y1="9" x2="116" y2="9" stroke="#e3b85f" strokeWidth="1" />
    <path d="M60 2c-2.4 3-2.4 7 0 10 2.4-3 2.4-7 0-10z" stroke="#f0cf82" strokeWidth="1" />
    <path d="M60 12c-3-2-7-2-10 0 3 2 7 2 10 0z" stroke="#e3b85f" strokeWidth="1" />
    <path d="M60 12c3-2 7-2 10 0-3 2-7 2-10 0z" stroke="#e3b85f" strokeWidth="1" />
    <circle cx="48" cy="9" r="1.3" fill="#f0cf82" />
    <circle cx="72" cy="9" r="1.3" fill="#f0cf82" />
  </svg>
);

/* SECTION 10 — FINAL CINEMATIC ENDING */
const EndingScene = () => (
  <section
    id="ending"
    className="relative min-h-[100svh] overflow-hidden flex justify-center"
    data-testid="ending-scene"
  >
    <img src={BG} alt="" draggable="false" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
    <div className="absolute inset-0 bg-gradient-to-b from-wine/35 via-wine/20 to-wine/85" />
    <PetalCanvas density="low" className="absolute inset-0 w-full h-full opacity-70" />

    <div className="relative z-10 w-full max-w-xl mx-auto text-center px-6 pt-10 pb-14 flex flex-col items-center gap-5">
      <Lotus />

      <FadeUp mount>
        <h2
          className="font-script text-6xl sm:text-7xl md:text-8xl leading-[1.15] pt-3 flex flex-col items-center"
          style={goldText}
          data-testid="ending-names"
        >
          <span>Sanidhya</span>
          <span className="text-5xl sm:text-6xl md:text-7xl my-1">&amp;</span>
          <span>Vasudha</span>
        </h2>
      </FadeUp>

      <Lotus />

      <FadeUp mount delay={0.15}>
        <p
          className="font-cinzel font-bold text-2xl sm:text-3xl tracking-[0.18em] uppercase leading-snug"
          style={goldText}
          data-testid="ending-date"
        >
          9th &amp; 10th<br />December<br />2026
        </p>
      </FadeUp>

      {/* glowing heart with gold circuit traces */}
      <svg viewBox="0 0 300 150" fill="none" className="w-72 sm:w-80 mt-2" aria-hidden="true">
        <motion.path d="M0 95 H70 L92 80 H118" stroke="#e3b85f" strokeWidth="1.2" style={GLOW}
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.3, ease: "easeOut" }} />
        <motion.path d="M300 95 H230 L208 80 H182" stroke="#e3b85f" strokeWidth="1.2" style={GLOW}
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.3, delay: 0.2, ease: "easeOut" }} />
        <motion.path d="M30 110 H78 L96 95" stroke="#d9a94e" strokeWidth="0.9" opacity="0.8"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.4 }} />
        <motion.path d="M270 110 H222 L204 95" stroke="#d9a94e" strokeWidth="0.9" opacity="0.8"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.5 }} />
        <circle cx="4" cy="95" r="2.4" fill="#f0cf82" style={GLOW} />
        <circle cx="296" cy="95" r="2.4" fill="#f0cf82" style={GLOW} />
        <motion.path
          d="M150 118 C132 104 118 92 118 77 C118 66 127 58 138 58 C144 58 149 62 150 67 C151 62 156 58 162 58 C173 58 182 66 182 77 C182 92 168 104 150 118 Z"
          stroke="#f0cf82" strokeWidth="2" strokeLinejoin="round"
          style={{ filter: "drop-shadow(0 0 10px rgba(240,205,122,1))" }}
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.8, delay: 0.6, ease: "easeInOut" }}
        />
      </svg>

      <FadeUp mount delay={0.2}>
        <p
          className="font-cinzel text-base sm:text-xl tracking-[0.22em] uppercase"
          style={goldText}
          data-testid="ending-tagline"
        >
          Two Hearts. One Journey.
        </p>
      </FadeUp>

      <Lotus />

      <FadeUp mount delay={0.3}>
        <p className="font-cormorant italic text-ivory text-xl sm:text-2xl leading-snug" style={{ textShadow: "0 2px 12px rgba(0,0,0,0.85)" }} data-testid="ending-lookforward">
          We look forward to celebrating with you!
        </p>
      </FadeUp>
    </div>
  </section>
);

export default EndingScene;
