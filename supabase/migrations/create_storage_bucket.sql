-- Create storage bucket for menu images
-- Run this in Supabase SQL Editor

-- Create the images bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public access to view images
CREATE POLICY "Public Access" ON storage.objects
FOR SELECT USING (bucket_id = 'images');

-- Allow authenticated users to upload images
CREATE POLICY "Allow authenticated uploads" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'images');

-- Allow authenticated users to update their own images
CREATE POLICY "Allow authenticated updates" ON storage.objects
FOR UPDATE USING (bucket_id = 'images');

-- Allow authenticated users to delete images
CREATE POLICY "Allow authenticated deletes" ON storage.objects
FOR DELETE USING (bucket_id = 'images');

-- Note: If you get an error about policies already existing, 
-- you can run these commands instead via Supabase Dashboard:
-- 1. Go to Storage in your Supabase dashboard
-- 2. Click "New Bucket"
-- 3. Name it "images"
-- 4. Enable "Public bucket" toggle
-- 5. Click "Create bucket"
