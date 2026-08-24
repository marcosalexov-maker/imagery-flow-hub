import { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DOMPurify from "dompurify";
import Layout from "@/components/layout/Layout";
import { usePortfolioItem, usePortfolioMedia } from "@/hooks/usePortfolio";
import LoadingSkeleton from "@/components/ui/loading-skeleton";
import ProjectMediaGallery from "@/components/portfolio/ProjectMediaGallery";
import { HeroContent, HeroItem, FadeScale, StaggerContainer, StaggerItem } from "@/components/ui/scroll-animation";
import type { Tables } from "@/integrations/supabase/types";

const darkScope = { "--background": "0 0% 0%" } as React.CSSProperties;

const isVideoMedia = (item: Tables<"portfolio_media">) =>
  item.media_type === "video" ||
  item.media_type === "youtube" ||
  /(?:youtu\.be\/|youtube\.com\/)/.test(item.url);

const PortfolioDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: project, isLoading, error } = usePortfolioItem(slug || "");
  const { data: media } = usePortfolioMedia(project?.id);
  const [tab, setTab] = useState<"video" | "photo" | null>(null);

  const categoryLabels: Record<string, string> = {
    fashion: "Fashion",
    editorial: "Editorial",
    portrait: "Portrait",
    commercial: "Commercial",
    lifestyle: "Lifestyle",
    fine_art: "Fine Art",
    "VIDEO & PHOTOGRAPHY": "VIDEO AND PHOTOGRAPHY"
  };

  const { videos, photos } = useMemo(() => {
    const list = media ?? [];
    const videoList = list.filter(isVideoMedia);
    const sortedVideos = [...videoList].sort((a, b) => {
      if (a.title === "Roma - La Conquista - Travel Video") return -1;
      if (b.title === "Roma - La Conquista - Travel Video") return 1;
      return 0;
    });
    return {
      videos: sortedVideos,
      photos: list.filter((item) => !isVideoMedia(item)),
    };
  }, [media]);

  const activeTab: "video" | "photo" = tab ?? (videos.length > 0 ? "video" : "photo");
  const activeMedia = activeTab === "video" ? videos : photos;
  const showTabs = videos.length > 0 && photos.length > 0;

  if (isLoading) {
    return (
      <Layout>
        <div className="dark bg-background text-foreground" style={darkScope}>
          <div className="container py-20">
            <div className="animate-pulse space-y-8">
              <div className="h-8 bg-muted rounded w-32" />
              <div className="h-12 bg-muted rounded w-2/3" />
              <div className="grid grid-cols-2 gap-6">
                {[...Array(4)].map((_, i) => <LoadingSkeleton key={i} variant="image" />)}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !project) {
    return (
      <Layout>
        <div className="dark bg-background text-foreground" style={darkScope}>
          <div className="container py-20">
            <div className="max-w-xl mx-auto text-center">
              <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
              <p className="text-muted-foreground mb-8">
                The project you're looking for doesn't exist or has been removed.
              </p>
              <Link to="/portfolio" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full">
                <ArrowLeft className="w-4 h-4" />
                Back to Portfolio
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  const images = [project.preview_image_1, project.preview_image_2, project.preview_image_3, project.preview_image_4].filter(Boolean) as string[];
  const cover = project.preview_image_1;

  return (
    <Layout hasHero={true}>
      <div className="dark bg-background text-foreground" style={darkScope}>
        {/* Cover */}
        {cover && (
          <section className="relative w-full h-[42vh] min-h-[280px] md:h-[55vh] md:max-h-[620px] overflow-hidden">
            <img
              src={cover}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover object-center"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/40" />
            <div className="relative h-full container flex flex-col justify-end pb-10 md:pb-14">
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors mb-6 w-fit"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Portfolio
              </Link>
              <span className="inline-block w-fit px-4 py-1.5 text-xs font-medium tracking-wider uppercase bg-foreground/10 backdrop-blur-sm rounded-full mb-4">
                {categoryLabels[project.category] || project.category}
              </span>
              <h1 className="text-4xl md:text-6xl tracking-tight font-normal max-w-3xl">
                {project.title}
              </h1>
            </div>
          </section>
        )}

        {/* Description */}
        <section className={cover ? "pt-6 md:pt-8" : "py-16 md:py-24"}>
          <div className="container">
            <HeroContent>
              {!cover && (
                <>
                  <HeroItem>
                    <Link to="/portfolio" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
                      <ArrowLeft className="w-4 h-4" />
                      Back to Portfolio
                    </Link>
                  </HeroItem>
                  <div className="max-w-3xl">
                    <HeroItem>
                      <span className="inline-block px-4 py-1.5 text-xs font-medium tracking-wider uppercase bg-secondary rounded-full mb-6">
                        {categoryLabels[project.category] || project.category}
                      </span>
                    </HeroItem>
                    <HeroItem>
                      <h1 className="text-4xl md:text-6xl tracking-tight font-normal">{project.title}</h1>
                    </HeroItem>
                  </div>
                </>
              )}
              {project.description && (
                <HeroItem>
                  <div
                    className="max-w-3xl prose-editorial text-white"
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(project.description) }}
                  />
                </HeroItem>
              )}
            </HeroContent>
          </div>
        </section>

        {/* Productions Gallery */}
        <section className="pt-8 md:pt-10 pb-24 md:pb-32">
          <div className="container">
            {media && media.length > 0 ? (
              <>
                {showTabs && (
                  <div className="flex items-center gap-2 mb-8 border-b border-foreground/10">
                    {([
                      ["video", "Vídeos"],
                      ["photo", "Fotografia"],
                    ] as const).map(([key, label]) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setTab(key)}
                        className={`relative px-5 py-3 text-sm tracking-wide transition-colors ${
                          activeTab === key ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {label}
                        {activeTab === key && (
                          <motion.span
                            layoutId="project-tab-underline"
                            className="absolute left-0 right-0 -bottom-px h-px bg-foreground"
                            transition={{ duration: 0.25, ease: "easeOut" }}
                          />
                        )}
                      </button>
                    ))}
                  </div>
                )}

                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  >
                    <ProjectMediaGallery media={activeMedia} projectTitle={project.title} />
                  </motion.div>
                </AnimatePresence>
              </>
            ) : (
              <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {images.map((image, index) => (
                  <StaggerItem key={index}>
                    <FadeScale>
                      <div className="overflow-hidden rounded-xl h-[400px]">
                        <img
                          src={image}
                          alt={`${project.title} - Image ${index + 1}`}
                          className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                          loading={index === 0 ? "eager" : "lazy"}
                        />
                      </div>
                    </FadeScale>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default PortfolioDetail;
