import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { createEnvelopeScene } from "./createEnvelopeScene";
import { EnvelopeFallback } from "./EnvelopeFallback";

const clamp = (n) => Math.max(0, Math.min(1, n));
const smooth = (n) => { const t = clamp(n); return t * t * (3 - 2 * t); };

export const EnvelopeCanvas = ({ phase, reducedMotion, onOpened }) => {
  const hostRef = useRef(null);
  const state = useRef({ phase, reducedMotion, onOpened });
  state.current = { phase, reducedMotion, onOpened };
  const [ready, setReady] = useState(false);
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    let cancelled = false, frame, renderer, world, observer;
    let lostContext = false;
    const contextLost = (event) => { event.preventDefault(); lostContext = true; setReady(false); setUnavailable(true); };
    const init = async () => {
      try {
        await Promise.all([document.fonts.load('48px "Cormorant Garamond"'), document.fonts.load('94px "Great Vibes"')]);
        if (cancelled) return;
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1;
        renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFShadowMap;
        renderer.domElement.setAttribute("data-testid", "envelope-3d-canvas");
        renderer.domElement.setAttribute("aria-hidden", "true");
        renderer.domElement.addEventListener("webglcontextlost", contextLost);
        host.appendChild(renderer.domElement);
        world = createEnvelopeScene();
        const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 50);
        let needsRender = true;
        const resize = () => {
          const { width, height } = host.getBoundingClientRect();
          if (!width || !height) return;
          camera.aspect = width / height;
          camera.position.z = Math.max(7.3, 7.5 / camera.aspect) / (2 * Math.tan(Math.PI / 10));
          camera.updateProjectionMatrix(); renderer.setSize(width, height); needsRender = true;
        };
        observer = new ResizeObserver(resize); observer.observe(host); resize();
        let start = null, lastPhase = "closed", completed = false;
        const render = (now) => {
          if (cancelled || lostContext) return;
          const current = state.current;
          if (current.phase !== lastPhase) {
            needsRender = true;
            if (current.phase === "opening") start = now;
            if (current.phase === "closed") { start = null; completed = false; }
            lastPhase = current.phase;
          }
          const elapsed = start === null ? 0 : (now - start) / 1000;
          const instant = current.reducedMotion && current.phase !== "closed";
          const folding = instant ? 1 : smooth((elapsed - 0.28) / 1.55);
          const lifting = instant ? 1 : smooth((elapsed - 1.48) / 1.0);
          const framing = instant ? 1 : smooth(elapsed / 1.65);
          world.envelope.position.y = -1.11 * framing;
          world.envelope.rotation.set(0.14 * (1 - framing), -0.10 * (1 - framing), -0.065 * (1 - framing));
          world.flap.rotation.x = -Math.PI * folding;
          // The hinge settles behind the insert as the flap rotates away.
          // Keeping its closed depth would wrongly hide the rising card's top edge.
          world.flap.position.z = 0.27 - 0.25 * folding;
          world.card.position.y = 0.58 * lifting;
          world.seal.position.y = -0.69 - 0.31 * smooth(elapsed / 0.7);
          world.seal.position.z = 0.34 + (instant ? 0 : Math.sin(clamp(elapsed / 0.7) * Math.PI) * 0.42);
          if (needsRender || current.phase === "opening") {
            renderer.render(world.scene, camera); needsRender = false;
          }
          if ((elapsed >= 2.5 || instant) && !completed && current.phase === "opening") {
            completed = true; current.onOpened();
          }
          frame = requestAnimationFrame(render);
        };
        frame = requestAnimationFrame(render); setReady(true);
      } catch (error) {
        if (!cancelled) { setUnavailable(true); setReady(false); }
      }
    };
    init();
    return () => {
      cancelled = true; cancelAnimationFrame(frame); observer?.disconnect(); world?.dispose();
      if (renderer) {
        renderer.domElement.removeEventListener("webglcontextlost", contextLost);
        renderer.dispose(); renderer.domElement.remove();
      }
    };
  }, []);

  useEffect(() => {
    if (!unavailable || phase !== "opening") return undefined;
    const timeout = window.setTimeout(() => state.current.onOpened(), reducedMotion ? 0 : 900);
    return () => window.clearTimeout(timeout);
  }, [unavailable, phase, reducedMotion]);

  return <>
    <div ref={hostRef} className={`env-canvas-host ${ready ? "is-ready" : ""}`} data-testid="envelope-renderer" data-ready={ready} />
    {!ready && <EnvelopeFallback open={phase !== "closed"} />}
    <div className="sr-only" aria-live="polite">
      {phase === "open" && <><p data-testid="envelope-flap-text">Two Journey One Heart</p><p data-testid="envelope-inner-card">Sanidhya &amp; Vasudha</p></>}
    </div>
  </>;
};