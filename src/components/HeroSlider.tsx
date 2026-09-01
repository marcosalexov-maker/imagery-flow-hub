import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ============================================
// 🎬 HERO SLIDES - EASY TO CHANGE (max 4 items)
// type: "image" | "video"
// image: { type: "image", src: minhaImagem, alt: "descrição" }
// video: { type: "video", src: meuVideo, poster: capaOpcional }
// Coloque os arquivos em src/assets/ e importe acima,
// ou use uma URL completa em "src".
// ============================================
import heroBg from "@/assets/hero-bg.jpg";
import video1 from "@/assets/v1.mp4";
import video2 from "@/assets/v2.mp4";

type HeroSlide =
  | { type: "image"; src: string; alt?: string }
  | { type: "video"; src: string; poster?: string };

const HERO_SLIDES: HeroSlide[] = [
  { type: "video", src: video1 },
  { type: "video", src: video2 },
  { type: "image", src: heroBg, alt: "Apresentação da agência" },
];

const SLIDES = HERO_SLIDES.slice(0, 4);
const IMAGE_DURATION = 6000;
const MAX_VIDEO_DURATION = 20000;

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

  // Play active video, reset the others
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

  return (
    <div className="absolute inset-0 overflow-hidden">
      <AnimatePresence initial={false} mode="sync">
        <motion.div
          key={current}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 1.06 }}
          animate={{
            opacity: 1,
            scale: prefersReducedMotion ? 1 : 1.0,
            transition: {
              opacity: { duration: 1.1, ease: "easeInOut" },
              scale: { duration: 8, ease: "linear" },
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
              loop={SLIDES.length === 1}
              preload="metadata"
              onEnded={SLIDES.length > 1 ? next : undefined}
            />
          ) : (
            <img
              src={slide.src}
              alt={slide.alt ?? ""}
              className="w-full h-full object-cover"
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
