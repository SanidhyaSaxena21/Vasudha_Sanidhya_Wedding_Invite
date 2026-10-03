import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, RotateCcw } from "lucide-react";
import { EnvelopeCanvas } from "./envelope/EnvelopeCanvas";

const BACKDROP = "https://static.prod-images.emergentagent.com/jobs/6c8a2320-6c63-453a-9c0f-f6c23ee3b38d/images/d6dacc02b47943ab8dda5886771ba5c27e16f4c0aa08b9f922294f1bbbf35d31.jpeg";

export default function RoyalEnvelopeHero({ onComplete }) {
  const [phase, setPhase] = useState("closed");
  const reducedMotion = useReducedMotion();
  const continueRef = useRef(null);
  const triggerRef = useRef(null);
  const keyboardOpen = useRef(false);
  const opened = phase === "open";

  const open = (event) => {
    if (phase !== "closed") return;
    keyboardOpen.current = event.detail === 0;
    setPhase("opening");
  };
  const finishOpening = () => {
    setPhase("open");
    if (keyboardOpen.current) requestAnimationFrame(() => continueRef.current?.focus());
  };
  const close = () => {
    setPhase("closed");
    requestAnimationFrame(() => triggerRef.current?.focus());
  };

  return (
    <motion.section className="env-scene" data-testid="envelope-scene" data-phase={phase}
      aria-label="Sanidhya and Vasudha's wedding invitation" exit={{ opacity: 0 }} transition={{ duration: reducedMotion ? 0 : 0.65 }}>
      <img src={BACKDROP} alt="" className="env-bg" draggable="false" />
      <div className="env-bg-tint" aria-hidden="true" />
      <header className="env-heading">
        <span className="env-heading-rule" aria-hidden="true" />
        <p data-testid="envelope-heading">A Wedding Invitation</p>
        <span className="env-heading-rule" aria-hidden="true" />
      </header>

      <div className="env-stage" data-testid="envelope-stage">
        <EnvelopeCanvas phase={phase} reducedMotion={!!reducedMotion} onOpened={finishOpening} />
        <button ref={triggerRef} type="button" className="env-open-target" data-testid="envelope-open-btn"
          aria-label="Break the gold seal and open the wedding envelope" onClick={open}
          disabled={phase !== "closed"} tabIndex={phase === "closed" ? 0 : -1}>
          <span className="sr-only">Open Sanidhya &amp; Vasudha's wedding envelope</span>
        </button>
      </div>

      <div className="env-actions" aria-live="polite">
        {phase === "closed" && <button type="button" onClick={open} className="env-open-caption" data-testid="wax-seal-open-btn">
          <span className="env-caption-diamond" aria-hidden="true">◇</span>
          <span data-testid="tap-to-open-hint">Open with love</span>
          <span className="env-caption-diamond" aria-hidden="true">◇</span>
        </button>}
        {phase === "opening" && <p className="env-opening-status" data-testid="envelope-opening-status">For a lifetime of togetherness</p>}
        {opened && <div className="env-reveal-actions">
          <button ref={continueRef} type="button" className="env-continue" data-testid="envelope-continue-btn" onClick={onComplete}>
            Open invitation <ArrowRight size={16} aria-hidden="true" />
          </button>
          <button type="button" className="env-replay" data-testid="envelope-replay-btn" onClick={close} title="Close envelope" aria-label="Close envelope to open it again">
            <RotateCcw size={17} aria-hidden="true" />
          </button>
        </div>}
      </div>
      <p className="env-dateline" data-testid="envelope-date">10 December 2026</p>
    </motion.section>
  );
}