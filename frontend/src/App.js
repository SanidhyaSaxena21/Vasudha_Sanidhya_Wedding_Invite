import React, { Component, useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Lenis from "lenis";
import "@/App.css";
import WeddingIntro from "@/components/WeddingIntro";
import InvitationHero from "@/components/InvitationHero";
import FormalInvitation from "@/components/FormalInvitation";
import Programme from "@/components/Programme";
import Countdown from "@/components/Countdown";
import VenuePalace from "@/components/VenuePalace";
import RsvpCards from "@/components/RsvpCards";
import EditorialFooter from "@/components/EditorialFooter";
import EndingScene from "@/components/EndingScene";
import MusicDock from "@/components/MusicDock";
import PetalCanvas from "@/components/PetalCanvas";
import RsvpAdmin from "@/components/RsvpAdmin";
import { HeartTransition, BackButton } from "@/components/PageFlow";

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

/* final page — a gentle vertical scroll through the closing sections */
const ScrollGroup = () => (
  <div data-testid="scroll-group">
    <Countdown />
    <VenuePalace />
    <RsvpCards />
    <EditorialFooter />
    <EndingScene />
  </div>
);

const PAGE_COUNT = 4; // 0 Invitation · 1 Formal · 2 Programme · 3 Scroll group

function App() {
  const [revealed, setRevealed] = useState(false);
  const [introGone, setIntroGone] = useState(false);
  const [page, setPage] = useState(0);
  const [navigating, setNavigating] = useState(false);
  const reduced = useReducedMotion();
  const lenisRef = useRef(null);
  const navTimers = useRef([]);

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

  useEffect(() => () => navTimers.current.forEach(clearTimeout), []);

  const goTo = useCallback((next) => {
    if (navigating || next < 0 || next >= PAGE_COUNT) return;
    navTimers.current.forEach(clearTimeout);
    navTimers.current = [];
    setNavigating(true);
    // swap pages while the heart veil covers the screen
    navTimers.current.push(
      setTimeout(() => {
        setPage(next);
        if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate: true });
        window.scrollTo(0, 0);
      }, 650)
    );
    navTimers.current.push(setTimeout(() => setNavigating(false), 1500));
  }, [navigating]);

  const renderPage = () => {
    switch (page) {
      case 0:
        return <InvitationHero onNext={() => goTo(1)} />;
      case 1:
        return <FormalInvitation onNext={() => goTo(2)} />;
      case 2:
        return <Programme onNext={() => goTo(3)} />;
      case 3:
      default:
        return <ScrollGroup />;
    }
  };

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
          <main className="relative">
            <div className="fixed inset-0 z-[2] pointer-events-none" aria-hidden="true">
              <PetalCanvas density="low" className="w-full h-full opacity-60" />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={page}
                initial={page === 0 ? { opacity: 0, scale: reduced ? 1.02 : 1.14 } : { opacity: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.5 } }}
                transition={{ duration: page === 0 ? (reduced ? 0.6 : 2.2) : 0.5, ease: [0.6, 0, 0.2, 1] }}
                style={{ transformOrigin: "50% 45%" }}
              >
                {renderPage()}
              </motion.div>
            </AnimatePresence>

            {page > 0 && <BackButton onBack={() => goTo(page - 1)} />}
          </main>
        )}

        {revealed && (
          <>
            <div className="vignette-overlay" />
            <div className="grain-overlay" />
            <MusicDock armed={revealed} />
          </>
        )}

        <HeartTransition active={navigating} />
      </div>
      )}
    </ErrorBoundary>
  );
}

export default App;
