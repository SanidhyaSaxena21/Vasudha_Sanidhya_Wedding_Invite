import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Music, VolumeX } from "lucide-react";

/* Replace /frontend/public/music with any romantic instrumental track
   (wedding.mp3, falling back to wedding.wav). */
const SRC = "/music/wedding.mp3";
const SRC_FALLBACK = "/music/wedding.wav";

const MusicDock = ({ armed }) => {
  const ref = useRef(null);
  const tried = useRef(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!armed || tried.current) return undefined;
    tried.current = true;
    const a = ref.current;
    if (!a) return undefined;
    let iv = null;
    a.volume = 0;
    a.play()
      .then(() => {
        setPlaying(true);
        let v = 0;
        iv = setInterval(() => {
          v = Math.min(0.32, v + 0.02);
          a.volume = v;
          if (v >= 0.32) clearInterval(iv);
        }, 120);
      })
      .catch(() => {});
    return () => {
      if (iv) clearInterval(iv);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [armed]);

  const toggle = () => {
    const a = ref.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      a.play().catch(() => {});
      setPlaying(true);
    }
  };

  return (
    <>
      <audio
        ref={ref}
        src={SRC}
        loop
        preload="auto"
        onError={(e) => {
          if (!e.target.src.endsWith(SRC_FALLBACK)) e.target.src = SRC_FALLBACK;
        }}
      />
      <motion.button
        type="button"
        data-testid="music-toggle-btn"
        onClick={toggle}
        aria-label={playing ? "Pause music" : "Play music"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="nav-glass fixed bottom-4 left-4 z-[95] flex items-center gap-2 rounded-full px-4 py-2.5 text-champagne hover:text-ivory transition-colors"
      >
        {playing ? (
          <VolumeX className="w-4 h-4" />
        ) : (
          <Music className="w-4 h-4 animate-soft-pulse" />
        )}
        <span className="font-cinzel text-[10px] uppercase tracking-[0.25em]">
          {playing ? "Pause" : "Play Music"}
        </span>
      </motion.button>
    </>
  );
};

export default MusicDock;
