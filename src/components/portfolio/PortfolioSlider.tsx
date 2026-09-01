import { useRef } from "react";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { PortfolioProject } from "@/data/types";

const categoryLabels: Record<string, string> = {
  fashion: "Fashion",
  editorial: "Editorial",
  portrait: "Portrait",
  commercial: "Commercial",
  lifestyle: "Lifestyle",
  fine_art: "Fine Art",
};

interface PortfolioSliderProps {
  projects: PortfolioProject[];
}

const CARD_CLASSES =
  "snap-start shrink-0 w-[65%] sm:w-[48%] lg:w-[38%] xl:w-[32%]";

const PortfolioSlider = ({ projects }: PortfolioSliderProps) => {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-card]");
    const amount = card ? card.offsetWidth + 20 : track.clientWidth * 0.6;
    track.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  if (projects.length === 0) return null;

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 -mx-6 px-6 md:mx-0 md:px-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {projects.map((project) => {
          const year = project.year || new Date(project.created_at).getFullYear();
          return (
            <div key={project.id} data-card className={CARD_CLASSES}>
              <Link
                to={`/portfolio/${project.slug}`}
                className="group block relative overflow-hidden rounded-3xl aspect-[4/5]"
              >
                <img
                  src={project.preview_image_1}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowUpRight className="w-4 h-4 text-white" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                  <span className="block text-[11px] font-medium tracking-[0.2em] uppercase text-white/70 mb-1.5">
                    {categoryLabels[project.category] || project.category} · {year}
                  </span>
                  <h3 className="text-lg md:text-xl text-white tracking-tight font-normal">
                    {project.title}
                  </h3>
                </div>
              </Link>
            </div>
          );
        })}

        {/* Placeholder do próximo projeto */}
        <div data-card className={CARD_CLASSES}>
          <div className="relative overflow-hidden rounded-3xl aspect-[4/5] bg-white/5 border border-dashed border-foreground/20 flex flex-col items-center justify-center text-center p-6">
            <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-muted-foreground mb-2">
              Coming Soon
            </span>
            <h3 className="text-lg md:text-xl tracking-tight font-normal text-muted-foreground">
              Próximo projeto
            </h3>
          </div>
        </div>
      </div>

      <button
        onClick={() => scrollByCard(-1)}
        aria-label="Previous projects"
        className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-background/80 backdrop-blur-sm border border-foreground/10 items-center justify-center hover:bg-background transition-all duration-300 hover:scale-105"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() => scrollByCard(1)}
        aria-label="Next projects"
        className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-11 h-11 rounded-full bg-background/80 backdrop-blur-sm border border-foreground/10 items-center justify-center hover:bg-background transition-all duration-300 hover:scale-105"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default PortfolioSlider;
