import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { Tables } from "@/integrations/supabase/types";

const categoryLabels: Record<string, string> = {
  fashion: "Fashion",
  editorial: "Editorial",
  portrait: "Portrait",
  commercial: "Commercial",
  lifestyle: "Lifestyle",
  fine_art: "Fine Art",
};

const stripHtml = (value: string) => value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

interface PortfolioSliderProps {
  projects: Tables<"portfolio">[];
}

const PortfolioSlider = ({ projects }: PortfolioSliderProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(0);

  const total = projects.length;

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + total) % total);
  }, [total]);

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  useEffect(() => {
    if (isPaused || total < 2) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide, total]);

  useEffect(() => {
    setCurrentSlide((prev) => (prev >= total ? 0 : prev));
  }, [total]);

  if (total === 0) return null;

  const project = projects[Math.min(currentSlide, total - 1)];
  const description = project.description ? stripHtml(project.description) : "";
  const year = project.year || new Date(project.created_at).getFullYear();

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "tween" as const, duration: 0.7, ease: [0.32, 0.72, 0, 1] as [number, number, number, number] },
        opacity: { duration: 0.5 },
      },
    },
    exit: (dir: number) => ({
      x: dir < 0 ? "100%" : "-100%",
      opacity: 0,
      transition: {
        x: { type: "tween" as const, duration: 0.7, ease: [0.32, 0.72, 0, 1] as [number, number, number, number] },
        opacity: { duration: 0.3 },
      },
    }),
  };

  const imageVariants = {
    enter: { scale: 1.1 },
    center: { scale: 1.05, transition: { duration: 5, ease: "linear" as const } },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: 0.3, ease: [0.32, 0.72, 0, 1] as [number, number, number, number] },
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative aspect-video">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={project.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0"
          >
            <motion.div variants={imageVariants} initial="enter" animate="center" className="absolute inset-0">
              <img
                src={project.preview_image_1}
                alt={project.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </motion.div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />

            <motion.div
              variants={textVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute bottom-0 left-0 right-0 p-6 md:p-10 lg:p-14"
            >
              <span className="inline-block text-xs md:text-sm font-medium tracking-[0.2em] uppercase text-white/70 mb-2 md:mb-3">
                {categoryLabels[project.category] || project.category} · {year}
              </span>
              <h3 className="text-2xl md:text-4xl lg:text-5xl text-white mb-2 md:mb-4 tracking-tight font-normal">
                {project.title}
              </h3>
              {description && (
                <p className="text-sm md:text-base lg:text-lg text-white/80 max-w-lg leading-relaxed line-clamp-3">
                  {description}
                </p>
              )}

              <Link
                to={`/portfolio/${project.slug}`}
                className="inline-flex items-center gap-2 mt-4 md:mt-6 px-5 md:px-6 py-2.5 md:py-3 bg-white/10 backdrop-blur-sm text-white text-sm font-medium rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 hover:gap-3"
              >
                View Project
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {total > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
              aria-label="Previous project"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
              aria-label="Next project"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 md:gap-3">
              {projects.map((item, index) => (
                <button key={item.id} onClick={() => goToSlide(index)} className="group relative p-1" aria-label={`Go to project ${index + 1}`}>
                  <motion.div
                    className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-colors duration-300 ${
                      index === currentSlide ? "bg-white" : "bg-white/40 group-hover:bg-white/60"
                    }`}
                    animate={{ scale: index === currentSlide ? 1.4 : 1, opacity: index === currentSlide ? 1 : 0.6 }}
                    transition={{ duration: 0.3 }}
                  />
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PortfolioSlider;
