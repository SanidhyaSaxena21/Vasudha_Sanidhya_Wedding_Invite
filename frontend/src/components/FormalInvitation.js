import { motion } from "framer-motion";
import { FadeUp, PcbCorner } from "./shared";
import { AdvanceHeart } from "./PageFlow";

/* SECTION 3 — FORMAL WEDDING INVITATION */
const FormalInvitation = ({ onNext }) => (
  <section
    id="invitation"
    className="relative py-24 sm:py-32 px-6 overflow-hidden scroll-mt-4"
    data-testid="formal-invitation-section"
  >
    <div className="absolute inset-0 bg-gradient-to-b from-wine via-burgundy/70 to-wine" />

    {/* burgundy floral arch surrounding the card */}
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[105%] pointer-events-none" aria-hidden="true">
      <motion.img
        src="/images/floral-arch.png"
        alt=""
        draggable="false"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        className="h-full w-auto max-w-none"
      />
    </div>

    <div className="relative z-10 flex justify-center">
      <motion.div
        data-testid="formal-invitation-card"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative bg-ivory text-wine w-full max-w-2xl px-7 sm:px-14 py-14 sm:py-16 text-center shadow-[0_35px_90px_rgba(0,0,0,0.65)]"
      >
        <div className="absolute inset-3 border border-gold/50 pointer-events-none" />
        <div className="absolute inset-4.5 border border-gold/25 pointer-events-none" style={{ inset: "1.35rem" }} />
        <PcbCorner className="absolute top-5 left-5 w-10 opacity-60" />
        <PcbCorner className="absolute top-5 right-5 w-10 opacity-60 -scale-x-100" />
        <PcbCorner className="absolute bottom-5 left-5 w-10 opacity-60 -scale-y-100" />
        <PcbCorner className="absolute bottom-5 right-5 w-10 opacity-60 -scale-100" />

        <FadeUp mount>
          <p className="font-cinzel text-[11px] sm:text-xs uppercase tracking-[0.35em]" style={{ color: "#8a5a1e" }} data-testid="formal-shloka">
            || Shree Ganeshaay Namah ||
          </p>
        </FadeUp>

        <FadeUp mount delay={0.1}>
          <p className="font-cormorant italic text-base sm:text-lg mt-8" style={{ color: "#5d3a1a" }}>
            By the grace of Almighty &amp; Blessings of
          </p>
        </FadeUp>
        <FadeUp mount delay={0.18}>
          <p className="font-cinzel text-lg sm:text-xl mt-4 leading-relaxed" style={{ color: "#4a0612" }}>
            Late Raj Dulari Saxena
          </p>
          <p className="font-cinzel text-gold my-1">&amp;</p>
          <p className="font-cinzel text-lg sm:text-xl leading-relaxed" style={{ color: "#4a0612" }}>
            Late Narendra Bihari Lal Saxena
          </p>
        </FadeUp>

        <FadeUp mount delay={0.26}>
          <span className="gold-hairline w-28 mx-auto block my-7" />
          <p className="font-cormorant text-base sm:text-lg leading-relaxed max-w-md mx-auto" style={{ color: "#3d040e" }}>
            It will be immense pleasure if you solicit your gracious presence on this momentous occasion of the
            wedding ceremony of their grandson
          </p>
        </FadeUp>

        <FadeUp mount delay={0.32}>
          <h3 className="font-cinzel text-4xl sm:text-5xl text-foil-dark tracking-[0.08em] mt-6" data-testid="groom-name">
            SANIDHYA
          </h3>
          <p className="font-cormorant italic text-sm sm:text-base mt-3" style={{ color: "#5d3a1a" }}>
            (Son of Smt. Nidhi Saxena &amp; Shri Sanjay Saxena)
          </p>
        </FadeUp>

        <FadeUp mount delay={0.4}>
          <div className="flex items-center justify-center gap-4 my-7">
            <span className="gold-hairline w-14" />
            <span className="font-cinzel text-xs uppercase tracking-[0.4em] text-gold">With</span>
            <span className="gold-hairline w-14" />
          </div>
        </FadeUp>

        <FadeUp mount delay={0.48}>
          <h3 className="font-cinzel text-4xl sm:text-5xl text-foil-dark tracking-[0.08em]" data-testid="bride-name">
            VASUDHA
          </h3>
          <p className="font-cormorant italic text-sm sm:text-base mt-3" style={{ color: "#5d3a1a" }}>
            (Daughter of Smt. Kusum Lata &amp; Shri Subhash Sharma)
          </p>
        </FadeUp>

        <FadeUp mount delay={0.56}>
          <div className="flex justify-center mt-9 mb-7">
            <AdvanceHeart onNext={onNext} onPaper label="Tap the heart for the Programme" />
          </div>
          <span className="gold-hairline w-28 mx-auto block mb-7" />
          <p className="font-cinzel text-base sm:text-lg tracking-[0.14em]" style={{ color: "#4a0612" }} data-testid="formal-date">
            10th December 2026, 5 PM Onwards
          </p>
          <p className="font-cormorant italic text-sm sm:text-base mt-3" style={{ color: "#6b3a1a" }} data-testid="formal-venue">
            Hotel Green Palm, Pacific Mall, Kaushambi, Ghaziabad
          </p>
        </FadeUp>
      </motion.div>
    </div>
  </section>
);

export default FormalInvitation;
