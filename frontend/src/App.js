import React, { Component, useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import "@/App.css";
import WeddingIntro from "@/components/WeddingIntro";
import InvitationHero from "@/components/InvitationHero";
import FormalInvitation from "@/components/FormalInvitation";
import Programme from "@/components/Programme";
import VenuePalace from "@/components/VenuePalace";
import RsvpCards from "@/components/RsvpCards";
import EditorialFooter from "@/components/EditorialFooter";
import EndingScene from "@/components/EndingScene";
import FloatingNav from "@/components/FloatingNav";
import MusicDock from "@/components/MusicDock";
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

  const scrollTo = (sel) => {
    const el = document.querySelector(sel);
    if (!el) return;
    if (lenisRef.current) lenisRef.current.scrollTo(el, { duration: 1.6 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <ErrorBoundary>
      <div className="relative bg-wine min-h-screen">
        <AnimatePresence>
          {!revealed && (
            <WeddingIntro key="wedding-intro" onComplete={() => setRevealed(true)} />
          )}
        </AnimatePresence>

        {revealed && (
          <main className="relative">
            <div className="fixed inset-0 z-[2] pointer-events-none" aria-hidden="true">
              <PetalCanvas density="low" className="w-full h-full opacity-60" />
            </div>
            <InvitationHero />
            <FormalInvitation />
            <Programme />
            <VenuePalace />
            <RsvpCards />
            <EditorialFooter />
            <EndingScene />
          </main>
        )}

        {revealed && (
          <>
            <div className="vignette-overlay" />
            <div className="grain-overlay" />
            <FloatingNav onNavigate={scrollTo} />
            <MusicDock armed={revealed} />
          </>
        )}
      </div>
    </ErrorBoundary>
  );
}

export default App;
