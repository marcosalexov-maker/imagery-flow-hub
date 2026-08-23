import { useState } from "react";
import { X, Play } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { FadeScale, StaggerContainer, StaggerItem } from "@/components/ui/scroll-animation";
import type { Tables } from "@/integrations/supabase/types";

interface ProjectMediaGalleryProps {
  media: Tables<"portfolio_media">[];
  projectTitle: string;
}

const getYouTubeId = (url: string) => {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
  return match?.[1] ?? null;
};

const ProjectMediaGallery = ({ media, projectTitle }: ProjectMediaGalleryProps) => {
  const [lightbox, setLightbox] = useState<Tables<"portfolio_media"> | null>(null);

  return (
    <>
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {media.map((item, index) => (
          <StaggerItem key={item.id}>
            <FadeScale>
              <figure className="space-y-3">
                {item.media_type === "youtube" || getYouTubeId(item.url) ? (
                  <div className="overflow-hidden rounded-xl aspect-video bg-black">
                    <iframe
                      src={`https://www.youtube.com/embed/${getYouTubeId(item.url)}`}
                      title={item.title || projectTitle}
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="w-full h-full border-0"
                    />
                  </div>
                ) : item.media_type === "video" ? (
                  <div className="overflow-hidden rounded-xl aspect-video bg-black">
                    <video
                      src={item.url}
                      poster={item.poster_url ?? undefined}
                      controls
                      playsInline
                      preload="metadata"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setLightbox(item)}
                    className="block w-full overflow-hidden rounded-xl aspect-video group"
                    aria-label={`Open ${item.title || projectTitle} full screen`}
                  >
                    <img
                      src={item.url}
                      alt={item.title || `${projectTitle} - ${index + 1}`}
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                  </button>
                )}

                {(item.title || item.caption) && (
                  <figcaption className="space-y-1">
                    {item.title && (
                      <p className="text-base font-medium tracking-tight flex items-center gap-2">
                        {item.media_type === "video" && <Play className="w-4 h-4 text-muted-foreground" />}
                        {item.title}
                      </p>
                    )}
                    {item.caption && <p className="text-sm text-muted-foreground leading-relaxed">{item.caption}</p>}
                  </figcaption>
                )}
              </figure>
            </FadeScale>
          </StaggerItem>
        ))}
      </StaggerContainer>

      <Dialog open={!!lightbox} onOpenChange={(open) => !open && setLightbox(null)}>
        <DialogContent className="max-w-6xl border-none bg-transparent p-0 shadow-none">
          {lightbox && (
            <div className="relative">
              <img
                src={lightbox.url}
                alt={lightbox.title || projectTitle}
                className="w-full max-h-[85vh] object-contain rounded-xl"
              />
              <button
                type="button"
                onClick={() => setLightbox(null)}
                className="absolute top-3 right-3 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/70 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProjectMediaGallery;
