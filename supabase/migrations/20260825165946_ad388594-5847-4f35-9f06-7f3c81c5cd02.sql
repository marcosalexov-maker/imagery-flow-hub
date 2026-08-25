CREATE POLICY "Assets are publicly readable"
ON storage.objects
FOR SELECT
TO anon, authenticated
USING (bucket_id = 'assets');

CREATE POLICY "Admins can upload assets"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'assets' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update assets"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'assets' AND public.has_role(auth.uid(), 'admin'))
WITH CHECK (bucket_id = 'assets' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete assets"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'assets' AND public.has_role(auth.uid(), 'admin'));