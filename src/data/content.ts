import type { BlogPost, Testimonial } from "./types";

// Conteúdo local. Adicione itens aqui para que apareçam no site.
export const blogPosts: BlogPost[] = [];

export const testimonials: Testimonial[] = [];

export const siteSettings: Record<string, string> = {
  cal_com_url: "demo",
};

// E-mail que recebe as mensagens do formulário de contato.
export const contactEmail = "hello@atelier.studio";
