import { useQuery } from "@tanstack/react-query";
import { blogPosts } from "@/data/content";
import type { BlogPost } from "@/data/types";

export const useBlogList = () => {
  return useQuery({
    queryKey: ["blog"],
    queryFn: async (): Promise<BlogPost[]> =>
      [...blogPosts].sort((a, b) =>
        (b.publish_date ?? "").localeCompare(a.publish_date ?? ""),
      ),
  });
};

export const useBlogPost = (slug: string) => {
  return useQuery({
    queryKey: ["blog", slug],
    queryFn: async (): Promise<BlogPost | null> =>
      blogPosts.find((p) => p.slug === slug) ?? null,
    enabled: !!slug,
  });
};
