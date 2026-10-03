import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import PetalCanvas from "./PetalCanvas";
import { HeartCircuit, PcbCorner, CornerFlourish } from "./shared";

const BACKDROP =
  "https://static.prod-images.emergentagent.com/jobs/6c8a2320-6c63-453a-9c0f-f6c23ee3b38d/images/d6dacc02b47943ab8dda5886771ba5c27e16f4c0aa08b9f922294f1bbbf35d31.jpeg";

const PHASES = ["idle", "seal", "flap", "card", "zoom"];

const RoyalEnvelopeHero = ({ onComplete }) => {
  const [phase, setPhase] = useState("idle");
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsDesktop(window.matchMedia("(pointer: fine)").matches);
  }, []);

  const idx = PHASES.indexOf(phase);
  const at = (p) => idx >= PHASES.indexOf(p);

  const open = () => {
    if (phase !== "idle") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onComplete();
      return;
    }
    setPhase("seal");
    window.setTimeout(() => setPhase("flap"), 680);
    window.setTimeout(() => setPhase("card"), 1580);
    window.setTimeout(() => setPhase("zoom"), 2400);
    window.setTimeout(onComplete, 3260);
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Enter" || e.key === " ") open();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  const sparkles = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => {
        const ang = (i / 14) * Math.PI * 2 + Math.random() * 0.4;
        const dist = 46 + Math.random() * 52;
        return { x: Math.cos(ang) * dist, y: Math.sin(ang) * dist, d: 0.2 + Math.random() * 0.3, s: 3 + Math.random() * 4 };
      }),
    []
  );

  return (
    <motion.div
      className="env-scene"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      data-testid="envelope-scene"
    >
      <img src={BACKDROP} alt="" className="env-bg" draggable="false" />
      <div className="env-bg-tint" />
      <PetalCanvas density="high" className="absolute inset-0 w-full h-full" />

      <motion.p
        className="env-eyebrow font-cormorant"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: at("zoom") ? 0 : 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        A Wedding Invitation
      </motion.p>

      <motion.div
        className="env-wrap"
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
      >
        <div className="env-halo" />

        {/* ===== Envelope ===== */}
        <motion.div
          className="env"
          data-testid="envelope-open-btn"
          onClick={open}
          role="button"
          aria-label="Open the wedding invitation"
          animate={{ y: phase === "idle" ? [0, -7, 0] : 0 }}
          transition={{ duration: 6, repeat: phase === "idle" ? Infinity : 0, ease: "easeInOut" }}
          style={{ cursor: phase === "idle" ? "pointer" : "default" }}
        >
          <div className="env-inner">
            <div className="env-back velvet" />

            {/* ivory card inside */}
            <motion.div
              className="env-card"
              initial={false}
              animate={{ y: at("card") ? "-56%" : "0%" }}
              transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="env-card-frame" />
              <CornerFlourish className="absolute top-1 left-1 w-8 opacity-70" />
              <CornerFlourish className="absolute top-1 right-1 w-8 opacity-70 -scale-x-100" />
              <HeartCircuit className="w-9 opacity-90" />
              <p className="font-script text-3xl leading-none" style={{ color: "#5d0a1c" }}>
                Sanidhya <span className="font-cinzel text-base text-gold align-middle">&amp;</span> Vasudha
              </p>
              <p className="font-cinzel text-[10px] tracking-[0.34em]" style={{ color: "#8a5a1e" }}>
                14 · 02 · 2026
              </p>
            </motion.div>

            {/* pockets */}
            <div className="env-pocket env-pocket-l velvet" />
            <div className="env-pocket env-pocket-r velvet" />
            <div className="env-pocket env-pocket-b velvet" />

            {/* fine gold PCB traces along the border — subtle VLSI motif */}
            <PcbCorner className="absolute top-2.5 left-2.5 w-10 opacity-60 z-30" />
            <PcbCorner className="absolute top-2.5 right-2.5 w-10 opacity-60 z-30 -scale-x-100" />
            <PcbCorner className="absolute bottom-2.5 left-2.5 w-10 opacity-60 z-30 -scale-y-100" />
            <PcbCorner className="absolute bottom-2.5 right-2.5 w-10 opacity-60 z-30 -scale-100" />

            <div className="env-frame" />
          </div>

          {/* flap */}
          <motion.div
            className="env-flap"
            initial={false}
            animate={{ rotateX: at("flap") ? -178 : 0, zIndex: at("card") ? 5 : 30 }}
            transition={{ rotateX: { duration: 1.05, ease: [0.65, 0, 0.3, 1] } }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="flap-face flap-front velvet">
              <div className="flap-frame" />
            </div>
            <div className="flap-face flap-inner" />
          </motion.div>

          {/* wax seal */}
          <motion.button
            type="button"
            className={`env-seal ${phase === "idle" ? "env-seal-breathe" : ""}`}
            data-testid="wax-seal-open-btn"
            aria-label="Break the wax seal and open the invitation"
            onClick={open}
            initial={false}
            animate={
              at("flap")
                ? { opacity: 0, scale: 1.3 }
                : phase === "seal"
                  ? { opacity: 1, scale: [1, 1.18, 1.08] }
                  : { opacity: 1, scale: 1 }
            }
            transition={
              at("flap")
                ? { duration: 0.35, ease: "easeOut" }
                : phase === "seal"
                  ? { duration: 0.5, ease: "easeOut" }
                  : { duration: 0.4 }
            }
          >
            <span className="font-cinzel text-champagne text-sm leading-none tracking-[0.12em]" style={{ textShadow: "0 1px 2px rgba(0,0,0,.5)" }}>
              S &amp; V
            </span>
            <HeartCircuit className="w-5" stroke="#F3D9A0" trace="#E9C378" />
            {/* crack lines appear as the seal breaks */}
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" fill="none" aria-hidden="true">
              <motion.path
                d="M50 4 L45 34 L58 48 L43 66 L52 96"
                stroke="#F3D9A0"
                strokeWidth="2.4"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={phase === "seal" ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
              <motion.path
                d="M45 34 L30 44"
                stroke="#E9C378"
                strokeWidth="1.4"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={phase === "seal" ? { pathLength: 1, opacity: 0.9 } : {}}
                transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
              />
            </svg>
          </motion.button>

          {/* golden sparkle burst */}
          {phase === "seal" &&
            sparkles.map((s, i) => (
              <motion.span
                key={i}
                className="spark"
                style={{ width: s.s, height: s.s }}
                initial={{ x: "-50%", y: "-50%", opacity: 1, scale: 0.5 }}
                animate={{ x: `calc(-50% + ${s.x}px)`, y: `calc(-50% + ${s.y}px)`, opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.75, delay: s.d, ease: "easeOut" }}
              />
            ))}
        </motion.div>

        {/* hint */}
        <motion.div
          className="flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: at("seal") ? 0 : 1 }}
          transition={{ duration: 0.6 }}
        >
          <p className="tap-hint font-cormorant animate-soft-pulse" data-testid="tap-to-open-hint">
            {isDesktop ? "Click to Open" : "Tap to Open"}
          </p>
          <svg width="10" height="26" viewBox="0 0 10 26" fill="none" className="animate-soft-pulse" aria-hidden="true">
            <path d="M5 0 V20 M1 16 L5 21 L9 16" stroke="#C99A45" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default RoyalEnvelopeHero;
