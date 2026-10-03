import { Fragment } from "react";
import { motion } from "framer-motion";
import { Music, Flame } from "lucide-react";
import { FadeUp, PcbCorner } from "./shared";

/* Stylised baraat horse-head icon */
const HorseIcon = ({ className = "" }) => (
  <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
    <path
      d="M22 56c-1.4-11.8 2.4-20.6 10.6-25.8 3.1-2 4.9-5.2 4.9-8.9l-6.9 4.5c-2.4 1.6-5.6.9-7.1-1.5-1.3-2-.9-4.7 1-6.3l10-8.6c1.6-1.4 4-1 5 .9l5 9.6c4.2 7.6 6.3 14.4 6.3 23.1 0 7.4-4.7 13-12.5 13z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <path d="M17 56h32" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

/* PLACEHOLDER-FREE — details as provided by the family */
const EVENTS = [
  {
    id: "lagun-sangeet",
    Icon: Music,
    name: "Lagun & Sangeet Ceremony",
    time: "5:00 PM onwards",
    date: "9th December 2026",
    extra: "Followed by Dinner",
  },
  {
    id: "haldi-bhaat",
    Icon: Flame,
    name: "Haldi & Bhaat Ceremony",
    time: "9:00 AM onwards",
    date: "10th December 2026",
    extra: "Followed by Lunch",
  },
  {
    id: "nikrausi-baraat",
    Icon: HorseIcon,
    name: "Nikrausi of Baraat",
    time: "5:00 PM",
    date: "10th December 2026",
    extra: null,
  },
];

const Connector = () => (
  <div className="relative flex items-center justify-center h-14 w-full md:h-auto md:w-16" aria-hidden="true">
    <motion.span
      className="block h-full w-px md:w-full md:h-px bg-gradient-to-b md:bg-gradient-to-r from-transparent via-gold to-transparent origin-top md:origin-left"
      style={{ filter: "drop-shadow(0 0 5px rgba(201,154,69,0.9))" }}
      initial={{ scaleY: 0, scaleX: 0 }}
      whileInView={{ scaleY: 1, scaleX: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    />
    <motion.span
      className="absolute w-2.5 h-2.5 rotate-45 bg-gold animate-node-glow"
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5, delay: 0.7 }}
    />
  </div>
);

const EventCard = ({ ev, i }) => {
  const { Icon } = ev;
  return (
    <motion.div
      data-testid={`programme-card-${ev.id}`}
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: i * 0.15 }}
      whileHover={{ y: -6 }}
      className="flex-1 relative bg-ivory text-wine rounded-t-[110px] rounded-b-xl px-6 pt-16 pb-9 text-center shadow-[0_25px_60px_rgba(0,0,0,0.5)] border border-gold/30"
    >
      <div className="absolute inset-2 border border-gold/30 rounded-t-[96px] rounded-b-lg pointer-events-none" />
      <span className="absolute -top-1 left-1/2 -translate-x-1/2 flex items-center justify-center w-14 h-14 rounded-full bg-wine border border-gold/50 shadow-[0_0_24px_rgba(201,154,69,0.45)]">
        <Icon className="w-6 h-6 text-champagne" strokeWidth={1.5} />
      </span>
      <p className="font-cormorant text-[10px] uppercase tracking-[0.3em] text-burgundy/60 mt-2">Function {i + 1}</p>
      <h3 className="font-cinzel text-xl sm:text-2xl mt-2 leading-snug" style={{ color: "#4a0612" }}>
        {ev.name}
      </h3>
      <div className="gold-hairline w-20 mx-auto my-4 opacity-80" />
      <p className="font-cormorant font-medium text-base sm:text-lg" style={{ color: "#3d040e" }}>
        {ev.time}
      </p>
      <p className="font-cormorant text-sm sm:text-base mt-1" style={{ color: "#6b3a1a" }}>
        {ev.date}
      </p>
      {ev.extra && (
        <p className="font-cormorant italic text-sm mt-3" style={{ color: "#8a5a1e" }}>
          {ev.extra}
        </p>
      )}
    </motion.div>
  );
};

/* SECTION 5 — WEDDING PROGRAMME */
const Programme = () => (
  <section id="programme" className="relative py-24 sm:py-32 px-4 sm:px-8 overflow-hidden scroll-mt-4" data-testid="programme-section">
    {/* deep burgundy + glowing gold circuit border */}
    <div className="absolute inset-0 bg-gradient-to-b from-wine via-burgundy/60 to-wine" />
    <div className="absolute inset-3 sm:inset-5 pointer-events-none animate-soft-pulse" style={{ filter: "drop-shadow(0 0 8px rgba(201,154,69,0.35))" }}>
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <rect x="0.6" y="1.4" width="98.8" height="97.2" rx="2.5" fill="none" stroke="#C99A45" strokeWidth="0.3" opacity="0.45" vectorEffect="non-scaling-stroke" />
      </svg>
      <PcbCorner className="absolute top-2 left-2 w-12 opacity-70" />
      <PcbCorner className="absolute top-2 right-2 w-12 opacity-70 -scale-x-100" />
      <PcbCorner className="absolute bottom-2 left-2 w-12 opacity-70 -scale-y-100" />
      <PcbCorner className="absolute bottom-2 right-2 w-12 opacity-70 -scale-100" />
    </div>

    <div className="relative max-w-5xl mx-auto pt-6">
      <FadeUp className="text-center">
        <h2 className="font-cinzel text-4xl sm:text-5xl md:text-6xl text-foil tracking-[0.18em]" data-testid="programme-heading">
          PROGRAMME
        </h2>
        <p className="font-cormorant italic text-ivory/75 text-lg sm:text-xl mt-4">You are requested to join</p>
        <span className="gold-hairline w-40 mx-auto mt-6 block" />
      </FadeUp>

      {/* three ceremonies connected by glowing circuit traces */}
      <div className="mt-16 flex flex-col md:flex-row md:items-stretch">
        {EVENTS.map((ev, i) => (
          <Fragment key={ev.id}>
            <div className="flex-1 flex">
              <EventCard ev={ev} i={i} />
            </div>
            {i < EVENTS.length - 1 && <Connector />}
          </Fragment>
        ))}
      </div>

      <FadeUp delay={0.2} className="text-center mt-14">
        <span className="gold-hairline w-24 mx-auto block mb-6" />
        <p className="font-cinzel text-[11px] uppercase tracking-[0.3em] text-champagne">Venue</p>
        <p className="font-cormorant text-ivory/85 text-lg mt-2">
          Hotel Green Palm, Pacific Mall, Kaushambi, Ghaziabad
        </p>
      </FadeUp>
    </div>
  </section>
);

export default Programme;
