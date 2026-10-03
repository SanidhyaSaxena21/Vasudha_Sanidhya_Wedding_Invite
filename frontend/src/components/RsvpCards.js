import { motion } from "framer-motion";
import { HeartChip } from "./shared";

const COLS = [
  {
    id: "rsvp",
    title: "R.S.V.P.",
    names: [
      "Mrs Rachna Saxena & Mr Saurav Saxena",
      "Mrs Amita Saxena & Mr Gaurav Saxena",
      "Mrs Minakshi Dalela & Mr Manu Dalela",
    ],
  },
  {
    id: "welcoming",
    title: "Welcoming",
    names: ["Manika Dalela", "Manya Dalela", "Shaurya Saxena", "Vaibhav Saxena"],
  },
  {
    id: "compliments",
    title: "Best Compliments",
    names: ["Mr MB Saxena (BABA)", "Mrs Ratna Dalela (Nani)"],
  },
];

/* Three elegant gold-framed ivory columns */
const RsvpCards = () => (
  <section id="rsvp" className="relative py-24 sm:py-28 px-6 overflow-hidden scroll-mt-4" data-testid="rsvp-section">
    <div className="absolute inset-0 bg-gradient-to-b from-wine via-burgundy/40 to-wine" />
    <div className="relative max-w-6xl mx-auto grid md:grid-cols-3 gap-8 md:gap-10">
      {COLS.map((col, i) => (
        <motion.div
          key={col.id}
          data-testid={`${col.id}-card`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: i * 0.15 }}
          whileHover={{ y: -5 }}
          className="relative bg-ivory text-wine rounded-xl px-7 pt-10 pb-9 text-center shadow-[0_25px_60px_rgba(0,0,0,0.5)] border border-gold/40"
        >
          <div className="absolute inset-2 border border-gold/30 rounded-lg pointer-events-none" />
          <HeartChip className="w-24 max-w-full mx-auto opacity-90" stroke="#a67527" trace="#C99A45" />
          <h3 className="font-cinzel text-lg sm:text-xl uppercase tracking-[0.22em] mt-4" style={{ color: "#4a0612" }}>
            {col.title}
          </h3>
          <div className="gold-hairline w-20 mx-auto my-5 opacity-80" />
          <ul className="space-y-3">
            {col.names.map((n) => (
              <li key={n} className="font-cormorant text-base sm:text-lg leading-snug" style={{ color: "#3d040e" }}>
                {n}
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  </section>
);

export default RsvpCards;
