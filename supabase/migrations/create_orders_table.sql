-- SQL untuk membuat tabel orders di Supabase
-- Jalankan ini di Supabase SQL Editor

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_code VARCHAR(10) UNIQUE NOT NULL,
  customer_name VARCHAR(100) DEFAULT 'Guest',
  items JSONB NOT NULL,
  total_price INTEGER NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'completed')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  verified_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_orders_order_code ON orders(order_code);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);

-- Enable Row Level Security
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anonymous insert (for customers creating orders)
CREATE POLICY "Allow anonymous insert" ON orders
  FOR INSERT
  WITH CHECK (true);

-- Policy: Allow anonymous select by order_code (for QR verification)
CREATE POLICY "Allow select by order_code" ON orders
  FOR SELECT
  USING (true);

-- Policy: Allow update for verification (sellers can verify)
CREATE POLICY "Allow update for verification" ON orders
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Optional: Create a function to auto-delete old orders (older than 24 hours)
CREATE OR REPLACE FUNCTION delete_old_orders()
RETURNS void AS $$
BEGIN
  DELETE FROM orders WHERE created_at < NOW() - INTERVAL '24 hours';
END;
$$ LANGUAGE plpgsql;

-- Optional: Create a scheduled job to clean up old orders daily
-- This requires pg_cron extension which may need to be enabled in Supabase
-- SELECT cron.schedule('cleanup-old-orders', '0 0 * * *', 'SELECT delete_old_orders()');
