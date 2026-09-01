import { useState, useMemo } from "react";
import { X, Play } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { FadeScale, StaggerContainer, StaggerItem } from "@/components/ui/scroll-animation";
import type { PortfolioMedia } from "@/data/types";

interface ProjectMediaGalleryProps {
  media: PortfolioMedia[];
  projectTitle: string;
}

const getYouTubeId = (url: string) => {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
  return match?.[1] ?? null;
};

const isVideoItem = (item: PortfolioMedia) =>
  item.media_type === "youtube" || item.media_type === "video" || !!getYouTubeId(item.url);

const VideoEmbed = ({ item, projectTitle }: { item: PortfolioMedia; projectTitle: string }) => {
  const youtubeId = getYouTubeId(item.url);

  if (youtubeId) {
    return (
      <div className="overflow-hidden rounded-xl aspect-video bg-black">
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}`}
          title={item.title || projectTitle}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-full h-full border-0"
        />
      </div>
    );
  }

  return (
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
  );
};

const ProjectMediaGallery = ({ media, projectTitle }: ProjectMediaGalleryProps) => {
  const [lightbox, setLightbox] = useState<PortfolioMedia | null>(null);

  const allVideos = useMemo(() => media.length > 0 && media.every(isVideoItem), [media]);

  return (
    <>
      {allVideos ? (
        <StaggerContainer className="flex flex-col gap-16 md:gap-24">
          {media.map((item, index) => (
            <StaggerItem key={item.id}>
              <FadeScale>
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
                  <div className="lg:col-span-3">
                    <VideoEmbed item={item} projectTitle={projectTitle} />
                  </div>
                  <div className="lg:col-span-2 flex flex-col justify-center">
                    {item.title && (
                      <h3 className="text-xl md:text-2xl tracking-tight font-normal text-white mb-3 flex items-center gap-3">
                        <Play className="w-5 h-5 text-white/70" />
                        {item.title}
                      </h3>
                    )}
                    {item.caption && (
                      <p className="text-sm md:text-base leading-relaxed text-white/80">
                        {item.caption}
                      </p>
                    )}
                  </div>
                </div>
              </FadeScale>
            </StaggerItem>
          ))}
        </StaggerContainer>
      ) : (
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {media.map((item, index) => (
            <StaggerItem key={item.id}>
              <FadeScale>
                <figure className="space-y-3">
                  {isVideoItem(item) ? (
                    <VideoEmbed item={item} projectTitle={projectTitle} />
                  ) : (
                    <button
                      type="button"
                      onClick={() => setLightbox(item)}
                      className="relative block w-full overflow-hidden rounded-xl aspect-video group"
                      aria-label={`Open ${item.title || projectTitle} full screen`}
                    >
                      <img
                        src={item.url}
                        alt={item.caption || item.title || `${projectTitle} - ${index + 1}`}
                        className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                        loading={index === 0 ? "eager" : "lazy"}
                      />
                      {(item.title || item.caption) && (
                        <div className="absolute inset-0 flex flex-col justify-end p-6 text-left bg-gradient-to-t from-black/80 via-black/25 to-transparent opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity duration-500">
                          {item.title && (
                            <p className="text-base font-medium tracking-tight text-white">{item.title}</p>
                          )}
                          {item.caption && (
                            <p className="text-sm leading-relaxed text-white/80 mt-1">{item.caption}</p>
                          )}
                        </div>
                      )}
                    </button>
                  )}

                  {isVideoItem(item) && (item.title || item.caption) && (
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
      )}

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
