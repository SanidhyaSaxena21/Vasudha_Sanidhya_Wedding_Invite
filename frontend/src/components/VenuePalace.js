import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin } from "lucide-react";
import { FadeUp, SectionHeading, GoldRule } from "./shared";

const PALACE_MAIN =
  "https://images.unsplash.com/photo-1650118146076-5e584e3ee165?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600";
const PALACE_DOME =
  "https://images.unsplash.com/photo-1640618225440-877bbc22cd30?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200";

/* PLACEHOLDER VENUE — replace with the real venue and address */
const VenuePalace = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={ref} className="relative py-24 sm:py-32 overflow-hidden" data-testid="venue-section">
      <div className="relative max-w-6xl mx-auto px-6 sm:px-10 grid md:grid-cols-2 gap-14 md:gap-20 items-center">
        {/* arched palace imagery with parallax */}
        <FadeUp className="relative">
          <div className="relative rounded-t-full rounded-b-2xl p-3 border border-gold/40 shadow-[0_35px_90px_rgba(0,0,0,0.6)] overflow-hidden bg-burgundy/40">
            <div className="rounded-t-full rounded-b-xl overflow-hidden aspect-[3/4]">
              <motion.img
                src={PALACE_MAIN}
                alt="Royal palace arches at golden hour"
                draggable="false"
                style={{ y }}
                className="w-full h-[116%] object-cover"
              />
            </div>
            <div className="absolute inset-3 rounded-t-full rounded-b-2xl pointer-events-none bg-gradient-to-t from-wine/60 via-transparent to-wine/20" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20, rotate: 4 }}
            whileInView={{ opacity: 1, y: 0, rotate: 3 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute -bottom-8 -right-3 sm:-right-6 w-32 sm:w-44 rounded-lg overflow-hidden border border-gold/50 shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
          >
            <img src={PALACE_DOME} alt="Palace dome at sunset" draggable="false" className="w-full aspect-square object-cover" />
          </motion.div>
        </FadeUp>

        <div className="text-center md:text-left">
          <SectionHeading eyebrow="The Venue" title="A Palace Awaits" />
          <FadeUp delay={0.15}>
            <p className="font-cormorant text-ivory/80 text-lg sm:text-xl leading-relaxed mt-8 max-w-md mx-auto md:mx-0">
              Join us amid sandstone arches, lantern-lit courtyards and gardens scattered with rose petals, as the
              evening sky turns to gold over the lake city.
            </p>
          </FadeUp>
          <FadeUp delay={0.25}>
            <div className="mt-8 space-y-2 font-cormorant text-base sm:text-lg text-champagne/90">
              <p className="font-cinzel tracking-[0.18em] uppercase text-sm text-foil">The Royal Palace</p>
              <p className="text-ivory/70 italic">Palace Road, Lake Pichola</p>
              <p className="text-ivory/70 italic">Udaipur, Rajasthan</p>
              <p className="text-ivory/50 text-sm italic mt-3">(venue &amp; address to be finalised)</p>
            </div>
          </FadeUp>
          <FadeUp delay={0.35}>
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-5 justify-center md:justify-start">
              <a
                href="https://maps.google.com/?q=Udaipur,+Rajasthan"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="venue-map-link"
                className="inline-flex items-center gap-2 font-cinzel text-xs uppercase tracking-[0.28em] text-champagne border border-gold/40 rounded-full px-6 py-3 hover:bg-gold/10 hover:border-gold/70 transition-colors duration-300"
              >
                <MapPin className="w-4 h-4" />
                View on Maps
              </a>
              <p className="font-cormorant italic text-ivory/60 text-sm">
                Dress code — <span className="text-champagne">Royal Indian Formal</span>
              </p>
            </div>
          </FadeUp>
          <FadeUp delay={0.4} className="mt-10 hidden md:flex">
            <GoldRule className="w-2/3 [&>span:first-child]:flex-1 [&>span:last-child]:flex-1" />
          </FadeUp>
        </div>
      </div>
    </section>
  );
};

export default VenuePalace;
