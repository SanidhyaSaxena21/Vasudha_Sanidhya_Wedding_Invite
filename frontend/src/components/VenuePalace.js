import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin } from "lucide-react";
import { FadeUp, SectionHeading } from "./shared";

/* Real venue — SK Klyde Grand Hotel & Banquets */
const PALACE_MAIN = "/images/venue/venue-main.jpg";
const PALACE_DOME = "/images/venue/venue-court.jpg";

const VENUE_LINK = "https://www.google.com/travel/hotels/s/woACXFERDhtoYqFE9";

/* SECTION — LOCATION */
const VenuePalace = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={ref} id="location" className="relative py-24 sm:py-32 overflow-hidden scroll-mt-4" data-testid="venue-section">
      <div className="relative max-w-6xl mx-auto px-6 sm:px-10 grid md:grid-cols-2 gap-14 md:gap-20 items-center">
        <FadeUp className="relative">
          <div className="relative rounded-2xl p-3 border border-gold/40 shadow-[0_35px_90px_rgba(0,0,0,0.6)] overflow-hidden bg-burgundy/40">
            <div className="rounded-xl overflow-hidden aspect-[4/3]">
              <motion.img
                src={PALACE_MAIN}
                alt="SK Klyde Grand Hotel & Banquets at dusk"
                draggable="false"
                loading="lazy"
                decoding="async"
                style={{ y }}
                className="w-full h-[116%] object-cover"
              />
            </div>
            <div className="absolute inset-3 rounded-2xl pointer-events-none bg-gradient-to-t from-wine/55 via-transparent to-wine/10" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20, rotate: 4 }}
            whileInView={{ opacity: 1, y: 0, rotate: 3 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute -bottom-8 -right-3 sm:-right-6 w-40 sm:w-52 rounded-lg overflow-hidden border border-gold/50 shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
          >
            <img src={PALACE_DOME} alt="SK Klyde Grand courtyard at night" draggable="false" loading="lazy" decoding="async" className="w-full aspect-[16/10] object-cover" />
          </motion.div>
        </FadeUp>

        <div className="text-center md:text-left">
          <SectionHeading eyebrow="The Venue" title="Hotel Green Palm" />
          <FadeUp delay={0.15}>
            <p className="font-cormorant text-ivory/80 text-lg sm:text-xl leading-relaxed mt-8 max-w-md mx-auto md:mx-0">
              Join us as we exchange vows surrounded by family, laughter and blessings — an evening of rituals,
              music and celebration.
            </p>
          </FadeUp>
          <FadeUp delay={0.25}>
            <div className="mt-8 space-y-2 font-cormorant text-base sm:text-lg text-champagne/90">
              <p className="font-cinzel tracking-[0.18em] uppercase text-sm text-foil">Hotel Green Palm</p>
              <p className="text-ivory/70 italic">Pacific Mall, Kaushambi</p>
              <p className="text-ivory/70 italic">Ghaziabad, Delhi NCR</p>
            </div>
          </FadeUp>
          <FadeUp delay={0.35}>
            <div className="mt-8 flex justify-center md:justify-start">
              <a
                href={VENUE_LINK}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="venue-map-link"
                className="inline-flex items-center gap-2 font-cinzel text-xs uppercase tracking-[0.28em] text-champagne border border-gold/40 rounded-full px-6 py-3 hover:bg-gold/10 hover:border-gold/70 transition-colors duration-300"
              >
                <MapPin className="w-4 h-4" />
                View Venue
              </a>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
};

export default VenuePalace;
