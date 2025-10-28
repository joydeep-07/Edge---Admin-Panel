import { createClient } from "@supabase/supabase-js";

// replace with your own values from Supabase dashboard
const supabaseUrl = "https://odxbzaxiblziszgpjcqw.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9keGJ6YXhpYmx6aXN6Z3BqY3F3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE1NzAzNjIsImV4cCI6MjA3NzE0NjM2Mn0.Q5ay4i_zC0AZRX8egMtEkV6OelZ0mPR8Km-zeVS4iOo";

export const supabase = createClient(supabaseUrl, supabaseKey);
