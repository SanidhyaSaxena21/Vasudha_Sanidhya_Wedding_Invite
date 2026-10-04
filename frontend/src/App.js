import React, { Component, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Lenis from "lenis";
import "@/App.css";
import WeddingIntro from "@/components/WeddingIntro";
import InvitationHero from "@/components/InvitationHero";
import FormalInvitation from "@/components/FormalInvitation";
import Programme from "@/components/Programme";
import Countdown from "@/components/Countdown";
import VenuePalace from "@/components/VenuePalace";
import RsvpCards, { FamilyColumns } from "@/components/RsvpCards";
import EditorialFooter from "@/components/EditorialFooter";
import EndingScene from "@/components/EndingScene";
import MusicDock from "@/components/MusicDock";
import PetalCanvas from "@/components/PetalCanvas";
import RsvpAdmin from "@/components/RsvpAdmin";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { err: null };
  }
  static getDerivedStateFromError(err) {
    return { err };
  }
  render() {
    if (this.state.err) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-wine text-champagne font-cormorant p-8 text-center">
          <p>Something interrupted the invitation. Please refresh the page.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

/* Gentle fade + slide-up reveal as each section scrolls into view. */
const ScrollSection = ({ children, className = "" }) => (
  <motion.section
    className={className}
    initial={{ opacity: 0, y: 48 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.section>
);

/* The warm family invitation note that bridges the blessings and the venue. */
const InviteNote = () => (
  <div className="relative py-20 sm:py-24 px-6 overflow-hidden" data-testid="invite-note">
    <div className="absolute inset-0 bg-gradient-to-b from-wine via-burgundy/30 to-wine" />
    <div className="relative max-w-2xl mx-auto text-center">
      <span className="gold-hairline w-24 mx-auto block mb-8 opacity-80" />
      <p className="font-cormorant italic text-ivory/90 text-xl sm:text-2xl lg:text-3xl leading-relaxed" data-testid="invite-note-text">
        Together with our families, we warmly invite you and your loved ones to grace our auspicious
        wedding celebrations with your presence and blessings.
      </p>
      <span className="gold-hairline w-24 mx-auto block mt-8 opacity-80" />
    </div>
  </div>
);

function App() {
  const [revealed, setRevealed] = useState(false);
  const [introGone, setIntroGone] = useState(false);
  const lenisRef = useRef(null);

  const isAdmin = typeof window !== "undefined" && window.location.pathname.replace(/\/$/, "") === "/rsvp-admin";

  useEffect(() => {
    document.body.style.overflow = introGone || isAdmin ? "" : "hidden";
    if (!revealed || isAdmin) return undefined;

    const lenis = new Lenis({ duration: 1.25, smoothWheel: true });
    lenisRef.current = lenis;
    let raf;
    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [revealed, introGone, isAdmin]);

  return (
    <ErrorBoundary>
      {isAdmin ? (
        <RsvpAdmin />
      ) : (
      <div className="relative bg-wine min-h-screen">
        <AnimatePresence onExitComplete={() => setIntroGone(true)}>
          {!introGone && (
            <WeddingIntro
              key="wedding-intro"
              onReveal={() => setRevealed(true)}
              onComplete={() => setIntroGone(true)}
            />
          )}
        </AnimatePresence>

        {revealed && (
          <main className="relative" data-testid="scroll-experience">
            <div className="fixed inset-0 z-[2] pointer-events-none" aria-hidden="true">
              <PetalCanvas density="low" className="w-full h-full opacity-60" />
            </div>

            <InvitationHero />
            <ScrollSection><FormalInvitation /></ScrollSection>
            <ScrollSection><Programme /></ScrollSection>
            <ScrollSection><FamilyColumns /></ScrollSection>
            <ScrollSection><InviteNote /></ScrollSection>
            <ScrollSection><VenuePalace /></ScrollSection>
            <ScrollSection><Countdown /></ScrollSection>
            <ScrollSection><RsvpCards /></ScrollSection>
            <ScrollSection><EndingScene /></ScrollSection>
            <EditorialFooter />
          </main>
        )}

        {revealed && (
          <>
            <div className="vignette-overlay" />
            <div className="grain-overlay" />
            <MusicDock armed={revealed} />
          </>
        )}
      </div>
      )}
    </ErrorBoundary>
  );
}

export default App;
