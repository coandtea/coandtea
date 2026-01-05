// src/supabase.js
import { createClient } from '@supabase/supabase-js';

// Ganti dengan URL dan Anon Key dari Dashboard Supabase Anda
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
