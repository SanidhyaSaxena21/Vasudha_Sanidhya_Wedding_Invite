import { useEffect, useState } from "react";
import { ChevronsRight } from "lucide-react";
import { FadeUp, PcbCorner } from "./shared";

/* 10 December 2026, 8:00 PM IST (UTC+5:30) */
const TARGET = new Date("2026-12-10T20:00:00+05:30").getTime();

const calc = () => {
  const diff = TARGET - Date.now();
  if (diff <= 0) return null;
  const s = Math.floor(diff / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
};

const pad = (n) => String(n).padStart(2, "0");

const Unit = ({ value, label }) => (
  <div className="flex flex-col items-center" data-testid={`countdown-${label.toLowerCase()}`}>
    <div className="relative flex items-center justify-center w-[72px] h-[72px] sm:w-28 sm:h-28 rounded-xl border border-gold/40 bg-wine/50 shadow-[0_12px_30px_rgba(0,0,0,0.4)]">
      <span className="absolute inset-1.5 border border-gold/20 rounded-lg pointer-events-none" />
      <span className="font-cinzel text-3xl sm:text-5xl text-foil tabular-nums" data-testid={`countdown-${label.toLowerCase()}-value`}>
        {pad(value)}
      </span>
    </div>
    <span className="font-cormorant uppercase tracking-[0.22em] text-xs sm:text-sm text-champagne/80 mt-3">
      {label}
    </span>
  </div>
);

const Countdown = ({ onNext }) => {
  const [t, setT] = useState(calc);

  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="countdown" className="relative py-24 sm:py-28 px-6 overflow-hidden" data-testid="countdown-section">
      <div className="absolute inset-0 bg-gradient-to-b from-wine via-burgundy/30 to-wine" />
      <PcbCorner className="absolute top-8 left-8 w-24 h-24 opacity-30" />
      <PcbCorner className="absolute bottom-8 right-8 w-24 h-24 opacity-30 rotate-180" />

      <div className="relative max-w-3xl mx-auto text-center">
        <FadeUp>
          <p className="font-cormorant italic text-champagne/80 text-lg sm:text-xl">The countdown has begun</p>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl text-foil tracking-[0.08em] mt-3">
            Until We Say Forever
          </h2>
          <div className="gold-hairline w-32 mx-auto my-6 opacity-80" />
          <p className="font-cormorant text-ivory/80 text-base sm:text-lg">
            10<sup>th</sup> December 2026 · 8:00 PM · Hotel Green Palm
          </p>
        </FadeUp>

        <FadeUp delay={0.15}>
          {t ? (
            <div className="flex items-start justify-center gap-4 sm:gap-7 mt-12" data-testid="countdown-timer">
              <Unit value={t.days} label="Days" />
              <Unit value={t.hours} label="Hours" />
              <Unit value={t.minutes} label="Minutes" />
              <Unit value={t.seconds} label="Seconds" />
            </div>
          ) : (
            <p className="font-cinzel text-2xl sm:text-3xl text-foil mt-12" data-testid="countdown-arrived">
              The day is finally here — let the celebrations begin!
            </p>
          )}
        </FadeUp>

        <FadeUp delay={0.3}>
          <div className="page-advance mt-16" data-testid="page-advance-venue">
            <button
              type="button"
              className="advance-heart advance-countdown"
              onClick={onNext}
              data-testid="advance-venue-btn"
              aria-label="View the venue details"
            >
              <span className="advance-heart-halo" aria-hidden="true" />
              <ChevronsRight className="advance-countdown-icon" strokeWidth={1.4} aria-hidden="true" />
            </button>
            <span className="advance-label font-cormorant">Venue Details</span>
          </div>
        </FadeUp>
      </div>
    </section>
  );
};

export default Countdown;
