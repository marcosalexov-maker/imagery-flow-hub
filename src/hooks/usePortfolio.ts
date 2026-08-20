import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export const usePortfolioList = () => {
  return useQuery({
    queryKey: ["portfolio"],
    queryFn: async (): Promise<Tables<"portfolio">[]> => {
      const { data, error } = await supabase
        .from("portfolio")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });
};

export const usePortfolioItem = (slug: string) => {
  return useQuery({
    queryKey: ["portfolio", slug],
    queryFn: async (): Promise<Tables<"portfolio"> | null> => {
      const { data, error } = await supabase
        .from("portfolio")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });
};

export const usePortfolioMedia = (projectId?: string) => {
  return useQuery({
    queryKey: ["portfolio-media", projectId],
    queryFn: async (): Promise<Tables<"portfolio_media">[]> => {
      const { data, error } = await supabase
        .from("portfolio_media")
        .select("*")
        .eq("project_id", projectId!)
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: true });

      if (error) throw error;
      return data;
    },
    enabled: !!projectId,
  });
};
