import { HeartCircuit } from "./shared";

const ITEMS = ["Sanidhya weds Vasudha", "10 December 2026", "Hotel Green Palm, Ghaziabad", "#SanidhyaWedsVasudha"];

const MarqueeStrip = ({ ariaHidden = false }) => (
  <div className="flex shrink-0 items-center" aria-hidden={ariaHidden}>
    {ITEMS.map((item, i) => (
      <span key={i} className="flex items-center">
        <span className="font-cinzel text-champagne/90 text-xs sm:text-sm uppercase tracking-[0.3em] mx-7 sm:mx-10">
          {item}
        </span>
        <span className="text-gold text-sm" aria-hidden="true">
          ✦
        </span>
      </span>
    ))}
  </div>
);

const EditorialFooter = () => (
  <footer className="relative overflow-hidden" data-testid="editorial-footer">
    <div
      className="border-y border-gold/25 bg-burgundy/40 py-5 overflow-hidden"
      data-testid="editorial-marquee"
    >
      <div className="flex w-max animate-marquee">
        <MarqueeStrip />
        <MarqueeStrip ariaHidden />
      </div>
    </div>

    <div className="relative px-6 py-16 sm:py-20 text-center">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(60% 80% at 50% 100%, rgba(74,6,18,0.55) 0%, transparent 70%)" }}
      />
      <div className="relative flex flex-col items-center gap-5">
        <HeartCircuit className="w-14" data-testid="footer-monogram" />
        <p className="font-script text-4xl sm:text-5xl text-foil leading-tight">Sanidhya &amp; Vasudha</p>
        <span className="gold-hairline w-40" />
        <p className="font-cormorant italic text-ivory/65 text-base sm:text-lg max-w-sm">
          Two hearts, perfectly aligned — crafted with love, and a little bit of silicon.
        </p>
        <p className="font-cinzel text-[10px] uppercase tracking-[0.34em] text-champagne/50 mt-4">
          With love · December 2026
        </p>
      </div>
    </div>
  </footer>
);

export default EditorialFooter;
