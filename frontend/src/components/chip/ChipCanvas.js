import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const FACE_SRC = "/images/chip/chip_face.jpg";
const DIE_SRC = "/images/chip/chip_die.jpg";

const clamp = (n) => Math.max(0, Math.min(1, n));
const easeOut = (t) => 1 - Math.pow(1 - clamp(t), 3);
const easeInOut = (t) => {
  t = clamp(t);
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

const loadImage = (src) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });

const goldText = (ctx, from, to) => {
  const grad = ctx.createLinearGradient(from, 0, to, 0);
  grad.addColorStop(0, "#a9742b");
  grad.addColorStop(0.45, "#f6e0a6");
  grad.addColorStop(0.7, "#e1bf78");
  grad.addColorStop(1, "#c99a45");
  return grad;
};

const composeFace = (img) => {
  const c = document.createElement("canvas");
  c.width = 1024;
  c.height = 1024;
  const x = c.getContext("2d");
  x.drawImage(img, 0, 0, 1024, 1024);
  x.textAlign = "center";
  x.textBaseline = "middle";
  x.fillStyle = goldText(x, 300, 724);
  x.shadowColor = "rgba(50,8,14,0.85)";
  x.shadowBlur = 7;
  x.shadowOffsetY = 3;
  x.font = '600 108px "Cinzel", serif';
  x.fillText("Two Hearts", 512, 452);
  x.fillText("One Journey", 512, 572);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
};

const composeDie = (img) => {
  const c = document.createElement("canvas");
  c.width = 1024;
  c.height = 1024;
  const x = c.getContext("2d");
  x.drawImage(img, 0, 0, 1024, 1024);
  const plate = x.createRadialGradient(512, 360, 20, 512, 360, 300);
  plate.addColorStop(0, "rgba(40,6,12,0.82)");
  plate.addColorStop(1, "rgba(40,6,12,0)");
  x.fillStyle = plate;
  x.fillRect(180, 180, 664, 340);
  x.textAlign = "center";
  x.textBaseline = "middle";
  x.fillStyle = goldText(x, 320, 704);
  x.shadowColor = "rgba(255,210,130,0.6)";
  x.shadowBlur = 16;
  x.font = '600 92px "Cinzel", serif';
  x.fillText("Two Hearts", 512, 320);
  x.fillText("One Journey", 512, 430);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
};

const buildScene = (faceTex, dieTex) => {
  const scene = new THREE.Scene();
  const chip = new THREE.Group();
  scene.add(chip);

  const S = 2;
  const bodyH = 0.5;

  const bodyMat = new THREE.MeshStandardMaterial({ color: 0x5c1020, roughness: 0.5, metalness: 0.2 });
  const body = new THREE.Mesh(new THREE.BoxGeometry(2 * S, bodyH, 2 * S), bodyMat);
  body.position.y = 0;
  chip.add(body);

  // inner glowing die on the body's top surface
  const die = new THREE.Mesh(
    new THREE.PlaneGeometry(3.5, 3.5),
    new THREE.MeshBasicMaterial({ map: dieTex, transparent: true })
  );
  die.rotation.x = -Math.PI / 2;
  die.position.y = bodyH / 2 + 0.012;
  chip.add(die);

  // lid — a thin slab whose top face carries the engraved chip art
  const sideMat = new THREE.MeshStandardMaterial({ color: 0x6b1324, roughness: 0.48, metalness: 0.22 });
  const topMat = new THREE.MeshStandardMaterial({
    map: faceTex,
    emissive: 0xffffff,
    emissiveMap: faceTex,
    emissiveIntensity: 0.45,
    roughness: 0.42,
    metalness: 0.3,
  });
  const lid = new THREE.Mesh(new THREE.BoxGeometry(2 * S, 0.17, 2 * S), [
    sideMat, sideMat, topMat, sideMat, sideMat, sideMat,
  ]);
  const lidPivot = new THREE.Group();
  lidPivot.position.set(0, bodyH / 2 + 0.015, -S);
  lid.position.set(0, 0.085, S);
  lidPivot.add(lid);
  chip.add(lidPivot);

  // gold perimeter pins
  const pinMat = new THREE.MeshStandardMaterial({ color: 0xcf9b45, roughness: 0.28, metalness: 0.92 });
  const pinGeo = new THREE.BoxGeometry(0.1, 0.1, 0.42);
  const perSide = 13;
  const span = 2 * S * 0.86;
  for (let side = 0; side < 4; side++) {
    for (let i = 0; i < perSide; i++) {
      const pin = new THREE.Mesh(pinGeo, pinMat);
      const t = -span / 2 + (span / (perSide - 1)) * i;
      const out = S + 0.16;
      if (side === 0) pin.position.set(t, 0, -out);
      else if (side === 1) { pin.position.set(t, 0, out); }
      else if (side === 2) { pin.rotation.y = Math.PI / 2; pin.position.set(-out, 0, t); }
      else { pin.rotation.y = Math.PI / 2; pin.position.set(out, 0, t); }
      chip.add(pin);
    }
  }

  // lighting — warm candlelight only
  scene.add(new THREE.AmbientLight(0x7e3c22, 1.15));
  const key = new THREE.PointLight(0xffc98a, 3.4, 45, 2);
  key.position.set(2.6, 5, 3.4);
  scene.add(key);
  const warm = new THREE.PointLight(0xff8a44, 1.9, 32, 2);
  warm.position.set(-3.4, 2.4, 2.2);
  scene.add(warm);
  const rim = new THREE.DirectionalLight(0xffe4b2, 0.7);
  rim.position.set(-1, 4, -2);
  scene.add(rim);

  return { scene, chip, lidPivot, die, key, dispose: () => {
    scene.traverse((o) => {
      if (o.geometry) o.geometry.dispose();
      if (o.material) (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => m.dispose());
    });
    faceTex.dispose();
    dieTex.dispose();
  } };
};

export const ChipCanvas = ({ phase, reducedMotion, onOpened, onMorphed }) => {
  const hostRef = useRef(null);
  const state = useRef({ phase, reducedMotion, onOpened, onMorphed });
  state.current = { phase, reducedMotion, onOpened, onMorphed };
  const [ready, setReady] = useState(false);
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    let cancelled = false;
    let frame;
    let renderer;
    let world;
    let observer;
    let lost = false;

    const onLost = (e) => { e.preventDefault(); lost = true; setReady(false); setUnavailable(true); };

    const init = async () => {
      try {
        await Promise.all([
          document.fonts.load('600 108px "Cinzel"'),
          document.fonts.load('600 92px "Cinzel"'),
        ]).catch(() => {});
        const [faceImg, dieImg] = await Promise.all([loadImage(FACE_SRC), loadImage(DIE_SRC)]);
        if (cancelled) return;

        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.4;
        renderer.domElement.setAttribute("data-testid", "chip-3d-canvas");
        renderer.domElement.setAttribute("aria-hidden", "true");
        renderer.domElement.addEventListener("webglcontextlost", onLost);
        host.appendChild(renderer.domElement);

        world = buildScene(composeFace(faceImg), composeDie(dieImg));
        const camStart = new THREE.Vector3(0, 4.2, 5.6);
        const camEnd = new THREE.Vector3(0, 1.0, 2.15);
        const lookStart = new THREE.Vector3(0, 0.05, 0);
        const lookEnd = new THREE.Vector3(0, 0.25, 0);
        const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);

        const resize = () => {
          const { width, height } = host.getBoundingClientRect();
          if (!width || !height) return;
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          renderer.setSize(width, height);
        };
        observer = new ResizeObserver(resize);
        observer.observe(host);
        resize();

        let start = null;
        let lastPhase = null;
        let openedCalled = false;
        let morphedCalled = false;

        const render = (now) => {
          if (cancelled || lost) return;
          const cur = state.current;
          if (cur.phase !== lastPhase) {
            start = now;
            lastPhase = cur.phase;
          }
          const elapsed = start === null ? 0 : (now - start) / 1000;
          const instant = cur.reducedMotion;

          // idle breathing
          const breathe = Math.sin(now * 0.0016) * 0.5 + 0.5;
          world.key.intensity = 2.1 + breathe * 0.5;
          world.die.material.opacity = 1;

          if (cur.phase === "opening" || cur.phase === "morphing") {
            const open = instant ? 1 : easeOut(elapsed / 1.2);
            world.lidPivot.rotation.x = -2.2 * (cur.phase === "morphing" ? 1 : open);
            if (cur.phase === "opening" && !openedCalled && (open >= 1 || instant)) {
              openedCalled = true;
              cur.onOpened && cur.onOpened();
            }
          } else {
            world.lidPivot.rotation.x = 0;
            world.chip.rotation.y = Math.sin(now * 0.0004) * 0.05;
            world.chip.position.y = Math.sin(now * 0.0013) * 0.03;
          }

          if (cur.phase === "morphing") {
            const t = instant ? 1 : easeInOut(elapsed / 1.8);
            camera.position.lerpVectors(camStart, camEnd, t);
            const look = new THREE.Vector3().lerpVectors(lookStart, lookEnd, t);
            camera.lookAt(look);
            world.die.material.opacity = 1;
            if (!morphedCalled && (t >= 1 || instant)) {
              morphedCalled = true;
              cur.onMorphed && cur.onMorphed();
            }
          } else {
            camera.position.copy(camStart);
            camera.lookAt(lookStart);
          }

          renderer.render(world.scene, camera);
          frame = requestAnimationFrame(render);
        };
        frame = requestAnimationFrame(render);
        setReady(true);
      } catch (e) {
        if (!cancelled) {
          setUnavailable(true);
          setReady(false);
        }
      }
    };
    init();

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      observer?.disconnect();
      world?.dispose();
      if (renderer) {
        renderer.domElement.removeEventListener("webglcontextlost", onLost);
        renderer.dispose();
        renderer.domElement.remove();
      }
    };
  }, []);

  // fallback crossfade progression when WebGL is unavailable
  useEffect(() => {
    if (!unavailable) return undefined;
    if (phase === "opening") {
      const t = window.setTimeout(() => state.current.onOpened && state.current.onOpened(), reducedMotion ? 0 : 700);
      return () => window.clearTimeout(t);
    }
    if (phase === "morphing") {
      const t = window.setTimeout(() => state.current.onMorphed && state.current.onMorphed(), reducedMotion ? 0 : 900);
      return () => window.clearTimeout(t);
    }
    return undefined;
  }, [unavailable, phase, reducedMotion]);

  return (
    <>
      <div ref={hostRef} className={`chip-canvas-host ${ready ? "is-ready" : ""}`} data-testid="chip-renderer" data-ready={ready} />
      {unavailable && (
        <div className="chip-fallback" data-testid="chip-fallback" aria-hidden="true">
          <img src={FACE_SRC} alt="" className={`chip-fallback-face ${phase === "closed" ? "" : "is-gone"}`} draggable="false" />
          <img src={DIE_SRC} alt="" className={`chip-fallback-die ${phase === "closed" ? "" : "is-shown"}`} draggable="false" />
        </div>
      )}
      <div className="sr-only" aria-live="polite">
        {(phase === "open" || phase === "morphing") && <p data-testid="chip-inner-text">Two Hearts One Journey</p>}
      </div>
    </>
  );
};

export default ChipCanvas;
