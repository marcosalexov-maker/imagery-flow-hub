import { useQuery } from "@tanstack/react-query";
import { testimonials } from "@/data/content";
import type { Testimonial } from "@/data/types";

export const useTestimonials = () => {
  return useQuery({
    queryKey: ["testimonials"],
    queryFn: async (): Promise<Testimonial[]> =>
      [...testimonials].sort(
        (a, b) => Number(b.is_featured) - Number(a.is_featured),
      ),
  });
};
