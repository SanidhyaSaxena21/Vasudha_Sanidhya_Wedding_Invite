import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Loader2, Heart } from "lucide-react";
import { HeartChip } from "./shared";

const API = process.env.REACT_APP_BACKEND_URL;

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

const RsvpForm = () => {
  const [name, setName] = useState("");
  const [guests, setGuests] = useState(1);
  const [attending, setAttending] = useState(null); // true | false | null
  const [choice, setChoice] = useState(null); // "accept" | "win" | null
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error

  const canSubmit = name.trim().length > 1 && attending !== null && status !== "submitting";

  const submit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    setStatus("submitting");
    try {
      const res = await fetch(`${API}/api/rsvp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), attending, guests: Math.max(1, Number(guests) || 1) }),
      });
      if (!res.ok) throw new Error("fail");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="relative bg-ivory text-wine rounded-2xl px-8 py-12 text-center shadow-[0_25px_60px_rgba(0,0,0,0.5)] border border-gold/40" data-testid="rsvp-success">
        <div className="absolute inset-2 border border-gold/30 rounded-xl pointer-events-none" />
        <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-burgundy text-champagne mx-auto shadow-[0_0_24px_rgba(201,154,69,0.45)]">
          <Heart size={28} fill="currentColor" aria-hidden="true" />
        </span>
        <h3 className="font-cinzel text-2xl sm:text-3xl mt-5" style={{ color: "#4a0612" }}>
          {attending ? "We can't wait to celebrate with you!" : "Thank you for letting us know"}
        </h3>
        <p className="font-cormorant text-lg mt-3" style={{ color: "#6b3a1a" }}>
          Your response has been saved with love.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="relative bg-ivory text-wine rounded-2xl px-6 sm:px-10 py-10 shadow-[0_25px_60px_rgba(0,0,0,0.5)] border border-gold/40" data-testid="rsvp-form">
      <div className="absolute inset-2 border border-gold/30 rounded-xl pointer-events-none" />
      <HeartChip className="w-20 max-w-full mx-auto opacity-90" stroke="#a67527" trace="#C99A45" />
      <h3 className="font-cinzel text-2xl sm:text-3xl text-center mt-4" style={{ color: "#4a0612" }}>
        Kindly Respond
      </h3>
      <p className="font-cormorant text-center text-base sm:text-lg mt-2" style={{ color: "#6b3a1a" }} data-testid="rsvp-family-note">
        You are cordially invited <span className="font-semibold" style={{ color: "#4a0612" }}>with Family</span> — kindly let us know if you'll be joining us
      </p>
      <div className="gold-hairline w-24 mx-auto my-6 opacity-80" />

      <div className="max-w-md mx-auto space-y-6">
        <div>
          <label htmlFor="rsvp-name" className="block font-cinzel text-xs uppercase tracking-[0.2em] mb-2" style={{ color: "#4a0612" }}>
            Member Name
          </label>
          <input
            id="rsvp-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            data-testid="rsvp-name-input"
            placeholder="e.g. SANJAY SAXENA"
            className="w-full rounded-lg border border-gold/50 bg-white/70 px-4 py-3 font-cormorant text-lg text-wine placeholder:text-wine/40 focus:outline-none focus:border-burgundy focus:ring-2 focus:ring-gold/40"
          />
        </div>

        <div>
          <label htmlFor="rsvp-guests" className="block font-cinzel text-xs uppercase tracking-[0.2em] mb-2" style={{ color: "#4a0612" }}>
            Number of Guests
          </label>
          <input
            id="rsvp-guests"
            type="number"
            min="1"
            max="50"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            data-testid="rsvp-guests-input"
            placeholder="e.g. 4"
            className="w-full rounded-lg border border-gold/50 bg-white/70 px-4 py-3 font-cormorant text-lg text-wine placeholder:text-wine/40 focus:outline-none focus:border-burgundy focus:ring-2 focus:ring-gold/40"
          />
        </div>

        <div>
          <span className="block font-cinzel text-xs uppercase tracking-[0.2em] mb-2" style={{ color: "#4a0612" }}>
            Will you join us?
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              data-testid="rsvp-attend-yes"
              onClick={() => { setAttending(true); setChoice("accept"); }}
              className={`rounded-lg border px-4 py-3 font-cormorant text-lg transition-all ${choice === "accept" ? "bg-burgundy text-ivory border-burgundy shadow-[0_0_18px_rgba(201,154,69,0.35)]" : "border-gold/50 text-wine hover:border-burgundy"}`}
            >
              Joyfully Accept
            </button>
            <button
              type="button"
              data-testid="rsvp-attend-win"
              onClick={() => { setAttending(true); setChoice("win"); }}
              className={`rounded-lg border px-4 py-3 font-cormorant text-lg transition-all ${choice === "win" ? "bg-burgundy text-ivory border-burgundy shadow-[0_0_18px_rgba(201,154,69,0.35)]" : "border-gold/50 text-wine hover:border-burgundy"}`}
            >
              Okay You win, I'm In
            </button>
          </div>
        </div>

        {status === "error" && (
          <p className="text-red-600 font-cormorant text-center" data-testid="rsvp-error">
            Something went wrong. Please try again.
          </p>
        )}

        <button
          type="submit"
          disabled={!canSubmit}
          data-testid="rsvp-submit-btn"
          className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-burgundy text-champagne font-cinzel text-sm uppercase tracking-[0.2em] px-6 py-4 transition-all hover:bg-wine hover:shadow-[0_0_24px_rgba(201,154,69,0.4)] disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {status === "submitting" ? <Loader2 size={18} className="animate-spin" aria-hidden="true" /> : <Check size={18} aria-hidden="true" />}
          Send Response
        </button>
      </div>
    </form>
  );
};

/* The family blessing columns — R.S.V.P. · Welcoming · Best Compliments */
export const FamilyColumns = () => (
  <section id="family" className="relative pt-12 pb-20 sm:pb-24 px-6 overflow-hidden" data-testid="family-section">
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

/* RSVP — the "Kindly Respond" form */
const RsvpCards = () => (
  <section id="rsvp" className="relative pt-10 pb-24 sm:pb-28 px-6 overflow-hidden" data-testid="rsvp-section">
    <div className="absolute inset-0 bg-gradient-to-b from-wine via-burgundy/40 to-wine" />

    <div className="relative max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <RsvpForm />
      </motion.div>
    </div>
  </section>
);

export default RsvpCards;
