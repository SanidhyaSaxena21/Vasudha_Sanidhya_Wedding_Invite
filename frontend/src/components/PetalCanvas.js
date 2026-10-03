import { useEffect, useRef } from "react";

/**
 * Gentle floating rose petals + warm golden bokeh on a canvas.
 * density: "high" (envelope scene) | "low" (ambient site layer)
 */
const PetalCanvas = ({ density = "high", className = "", style }) => {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const PETALS = density === "high" ? 26 : 12;
    const BOKEH = density === "high" ? 20 : 12;
    const ALPHA = density === "high" ? 1 : 0.55;

    let raf = null;
    let w = 0;
    let h = 0;
    const petals = [];
    const bokeh = [];

    const ROSES = [
      [158, 32, 52],
      [132, 20, 40],
      [176, 44, 64],
      [190, 70, 84],
    ];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const newPetal = (anywhere) => ({
      x: Math.random() * w,
      y: anywhere ? Math.random() * h : -30 - Math.random() * 100,
      s: 4.5 + Math.random() * 7,
      vy: 0.22 + Math.random() * 0.5,
      drift: Math.random() * Math.PI * 2,
      ds: 0.006 + Math.random() * 0.012,
      rot: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 0.02,
      a: (0.45 + Math.random() * 0.4) * ALPHA,
      c: ROSES[Math.floor(Math.random() * ROSES.length)],
    });

    const newBokeh = () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 1.5 + Math.random() * 4.5,
      a: (0.05 + Math.random() * 0.2) * ALPHA,
      tw: 0.4 + Math.random() * 1.2,
      ph: Math.random() * Math.PI * 2,
      dx: (Math.random() - 0.5) * 0.08,
      dy: (Math.random() - 0.5) * 0.06,
    });

    const build = () => {
      petals.length = 0;
      bokeh.length = 0;
      for (let i = 0; i < PETALS; i++) petals.push(newPetal(true));
      for (let i = 0; i < BOKEH; i++) bokeh.push(newBokeh());
    };

    let t = 0;
    const draw = () => {
      t += 1;
      ctx.clearRect(0, 0, w, h);

      // golden bokeh — slow drifting, twinkling lights
      for (const b of bokeh) {
        b.x += b.dx;
        b.y += b.dy;
        if (b.x < -10) b.x = w + 10;
        if (b.x > w + 10) b.x = -10;
        if (b.y < -10) b.y = h + 10;
        if (b.y > h + 10) b.y = -10;
        const tw = 0.55 + 0.45 * Math.sin(t * 0.02 * b.tw + b.ph);
        const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r * 3);
        g.addColorStop(0, `rgba(238, 200, 120, ${b.a * tw})`);
        g.addColorStop(1, "rgba(238, 200, 120, 0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r * 3, 0, Math.PI * 2);
        ctx.fill();
      }

      // rose petals — falling, swaying, tumbling
      for (const p of petals) {
        p.y += p.vy;
        p.drift += p.ds;
        p.x += Math.sin(p.drift) * 0.45;
        p.rot += p.vr;
        if (p.y > h + 30) Object.assign(p, newPetal(false));
        if (p.x < -30) p.x = w + 20;
        if (p.x > w + 30) p.x = -20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot + Math.sin(p.drift) * 0.4);
        ctx.globalAlpha = p.a;
        const grd = ctx.createLinearGradient(-p.s, -p.s, p.s, p.s);
        grd.addColorStop(0, `rgb(${p.c[0]}, ${p.c[1]}, ${p.c[2]})`);
        grd.addColorStop(1, `rgba(${p.c[0] + 40}, ${p.c[1] + 30}, ${p.c[2] + 30}, 0.85)`);
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.s, p.s * 0.58, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      if (!reduce) raf = requestAnimationFrame(draw);
    };

    resize();
    build();
    draw();

    const onResize = () => {
      resize();
      build();
      if (reduce) draw();
    };
    window.addEventListener("resize", onResize);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [density]);

  return <canvas ref={ref} className={`pointer-events-none ${className}`} style={style} aria-hidden="true" />;
};

export default PetalCanvas;
