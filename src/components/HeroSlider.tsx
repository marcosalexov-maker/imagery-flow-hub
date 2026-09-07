import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ============================================
// 🎬 HERO SLIDES — ordem de exibição
// 1) vídeo de capa  2) auto retrato  3) uruguai  4) foto p&b
// Para trocar: coloque o arquivo em src/assets/hero/ e ajuste a lista.
// ============================================
import heroVideo from "@/assets/hero/hero-1.mp4";
import heroPoster from "@/assets/hero/hero-1-poster.jpg";
import heroImg2 from "@/assets/hero/hero-2.jpg";
import heroImg3 from "@/assets/hero/hero-3.jpg";
import heroImg4 from "@/assets/hero/hero-4.jpg";

type HeroSlide =
  | { type: "image"; src: string; alt?: string }
  | { type: "video"; src: string; poster?: string };

const HERO_SLIDES: HeroSlide[] = [
  { type: "video", src: heroVideo, poster: heroPoster },
  { type: "image", src: heroImg2, alt: "Auto retrato" },
  { type: "image", src: heroImg3, alt: "Uruguai" },
  { type: "image", src: heroImg4, alt: "Registro em preto e branco" },
];

const SLIDES = HERO_SLIDES.slice(0, 4);
const IMAGE_DURATION = 6000;
const MAX_VIDEO_DURATION = 20000;

// Movimento discreto alternado para as imagens
const MOTION_VARIANTS = [
  { from: { scale: 1.08, x: "-1%" }, to: { scale: 1.0, x: "0%" } },
  { from: { scale: 1.0, x: "1.5%" }, to: { scale: 1.08, x: "-0.5%" } },
  { from: { scale: 1.06, x: "1%" }, to: { scale: 1.0, x: "-1%" } },
  { from: { scale: 1.0, x: "-1.5%" }, to: { scale: 1.07, x: "0.5%" } },
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  const videoRefs = useRef<Record<number, HTMLVideoElement | null>>({});
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % SLIDES.length);
  }, []);

  // Autoplay / advance
  useEffect(() => {
    if (SLIDES.length <= 1 || prefersReducedMotion) return;
    const slide = SLIDES[current];
    const duration = slide.type === "video" ? MAX_VIDEO_DURATION : IMAGE_DURATION;
    const timer = setTimeout(next, duration);
    return () => clearTimeout(timer);
  }, [current, next, prefersReducedMotion]);

  // Play active video, pause the others
  useEffect(() => {
    Object.entries(videoRefs.current).forEach(([key, el]) => {
      if (!el) return;
      if (Number(key) === current && !prefersReducedMotion) {
        el.currentTime = 0;
        el.play().catch(() => {});
      } else {
        el.pause();
      }
    });
  }, [current, prefersReducedMotion]);

  const slide = SLIDES[current];
  const move = MOTION_VARIANTS[current % MOTION_VARIANTS.length];

  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      <AnimatePresence initial={false} mode="sync">
        <motion.div
          key={current}
          className="absolute inset-0"
          initial={{
            opacity: 0,
            ...(prefersReducedMotion ? {} : move.from),
          }}
          animate={{
            opacity: 1,
            ...(prefersReducedMotion ? {} : move.to),
            transition: {
              opacity: { duration: 1.1, ease: "easeInOut" },
              scale: { duration: 9, ease: "linear" },
              x: { duration: 9, ease: "linear" },
            },
          }}
          exit={{ opacity: 0, transition: { duration: 1.1, ease: "easeInOut" } }}
        >
          {slide.type === "video" ? (
            <video
              ref={(el) => {
                videoRefs.current[current] = el;
              }}
              src={slide.src}
              poster={slide.poster}
              className="w-full h-full object-cover"
              muted
              playsInline
              autoPlay
              loop={SLIDES.length === 1}
              preload="auto"
              onEnded={SLIDES.length > 1 ? next : undefined}
            />
          ) : (
            <img
              src={slide.src}
              alt={slide.alt ?? ""}
              className="w-full h-full object-cover"
              loading={current === 0 ? "eager" : "lazy"}
              decoding="async"
            />
          )}
        </motion.div>
      </AnimatePresence>

      {SLIDES.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
          {SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              aria-label={`Ir para o slide ${index + 1}`}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                index === current
                  ? "w-8 bg-white/90"
                  : "w-1.5 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HeroSlider;
