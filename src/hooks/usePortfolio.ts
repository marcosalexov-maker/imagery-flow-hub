import { useQuery } from "@tanstack/react-query";
import { portfolioProjects, portfolioMedia } from "@/data/portfolio";
import type { PortfolioProject, PortfolioMedia } from "@/data/types";

export const usePortfolioList = () => {
  return useQuery({
    queryKey: ["portfolio"],
    queryFn: async (): Promise<PortfolioProject[]> => portfolioProjects,
  });
};

export const usePortfolioItem = (slug: string) => {
  return useQuery({
    queryKey: ["portfolio", slug],
    queryFn: async (): Promise<PortfolioProject | null> =>
      portfolioProjects.find((p) => p.slug === slug) ?? null,
    enabled: !!slug,
  });
};

export const usePortfolioMedia = (projectId?: string) => {
  return useQuery({
    queryKey: ["portfolio-media", projectId],
    queryFn: async (): Promise<PortfolioMedia[]> =>
      portfolioMedia
        .filter((m) => m.project_id === projectId)
        .sort((a, b) => a.sort_order - b.sort_order),
    enabled: !!projectId,
  });
};
