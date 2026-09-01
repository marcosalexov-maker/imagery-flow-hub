// Tipos do conteúdo local (antes vinham do banco).

export interface PortfolioProject {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string | null;
  year: number | null;
  preview_image_1: string;
  preview_image_2: string | null;
  preview_image_3: string | null;
  preview_image_4: string | null;
  created_at: string;
  updated_at: string;
}

export interface PortfolioMedia {
  id: string;
  project_id: string;
  media_type: "image" | "video" | "youtube";
  url: string;
  poster_url: string | null;
  title: string | null;
  caption: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  thumbnail_url: string | null;
  content: string | null;
  publish_date: string | null;
  read_time: string | null;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string | null;
  company: string | null;
  quote: string;
  avatar_url: string | null;
  rating: number | null;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}
