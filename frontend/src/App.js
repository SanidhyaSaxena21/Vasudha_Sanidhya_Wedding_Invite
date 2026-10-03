import React, { Component, useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import "@/App.css";
import RoyalEnvelopeHero from "@/components/RoyalEnvelopeHero";
import MainInvitation from "@/components/MainInvitation";
import EventsTimeline from "@/components/EventsTimeline";
import VenuePalace from "@/components/VenuePalace";
import EditorialFooter from "@/components/EditorialFooter";
import PetalCanvas from "@/components/PetalCanvas";

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

const Invitation = () => (
  <main className="relative">
    <Petals />
    <MainInvitation />
    <EventsTimeline />
    <VenuePalace />
    <EditorialFooter />
  </main>
);

/* ambient petals drifting across the whole site */
const Petals = () => (
  <div className="fixed inset-0 z-[2] pointer-events-none" aria-hidden="true">
    <PetalCanvas density="low" className="w-full h-full opacity-60" />
  </div>
);

function App() {
  const [revealed, setRevealed] = useState(false);
  const lenisRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = revealed ? "" : "hidden";
    if (!revealed) return undefined;

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
  }, [revealed]);

  return (
    <ErrorBoundary>
      <div className="relative bg-wine min-h-screen">
        <AnimatePresence>
          {!revealed && (
            <RoyalEnvelopeHero key="envelope" onComplete={() => setRevealed(true)} />
          )}
        </AnimatePresence>

        {revealed && <Invitation />}

        {revealed && (
          <>
            <div className="vignette-overlay" />
            <div className="grain-overlay" />
          </>
        )}
      </div>
    </ErrorBoundary>
  );
}

export default App;
