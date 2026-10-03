import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUp } from "lucide-react";

const LINKS = [
  { id: "#story", label: "Our Story" },
  { id: "#invitation", label: "Invitation" },
  { id: "#programme", label: "Programme" },
  { id: "#location", label: "Location" },
  { id: "#rsvp", label: "RSVP" },
];

const FloatingNav = ({ onNavigate }) => {
  const [open, setOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const prog = document.getElementById("programme");
      setShowTop(!!prog && window.scrollY > prog.offsetTop - window.innerHeight / 2);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => {
    setOpen(false);
    onNavigate(id);
  };

  return (
    <div className="fixed bottom-4 right-4 z-[95] flex flex-col items-end gap-2.5">
      <AnimatePresence>
        {showTop && (
          <motion.button
            key="top"
            data-testid="back-to-top-btn"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            onClick={() => go("#story")}
            aria-label="Back to top"
            className="nav-glass flex h-10 w-10 items-center justify-center rounded-full text-champagne hover:text-ivory"
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.nav
            data-testid="nav-menu-panel"
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="nav-glass rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
          >
            {LINKS.map((l) => (
              <button
                key={l.id}
                type="button"
                data-testid={`nav-link-${l.id.slice(1)}`}
                onClick={() => go(l.id)}
                className="block w-full px-7 py-3 text-left font-cinzel text-[11px] uppercase tracking-[0.25em] text-champagne hover:bg-gold/15 hover:text-ivory border-b border-gold/15 last:border-b-0 transition-colors"
              >
                {l.label}
              </button>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>

      <button
        type="button"
        data-testid="nav-menu-btn"
        onClick={() => setOpen((o) => !o)}
        aria-label="Menu"
        className="nav-glass flex h-11 w-11 items-center justify-center rounded-full text-champagne hover:text-ivory transition-colors"
      >
        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>
    </div>
  );
};

export default FloatingNav;
