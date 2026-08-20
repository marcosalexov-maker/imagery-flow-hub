CREATE TABLE public.portfolio_media (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES public.portfolio(id) ON DELETE CASCADE,
  media_type TEXT NOT NULL DEFAULT 'image',
  url TEXT NOT NULL,
  poster_url TEXT,
  title TEXT,
  caption TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT SELECT ON public.portfolio_media TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.portfolio_media TO authenticated;
GRANT ALL ON public.portfolio_media TO service_role;

ALTER TABLE public.portfolio_media ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Portfolio media is publicly readable" ON public.portfolio_media FOR SELECT USING (true);
CREATE POLICY "Admins can manage portfolio media" ON public.portfolio_media FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE INDEX portfolio_media_project_idx ON public.portfolio_media (project_id, sort_order);

CREATE TRIGGER update_portfolio_media_updated_at BEFORE UPDATE ON public.portfolio_media FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();