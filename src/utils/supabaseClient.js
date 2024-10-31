import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://yhfzqxanioipmjoaiwxi.supabase.co"; // Make sure to wrap the URL in quotes
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InloZnpxeGFuaW9pcG1qb2Fpd3hpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk2OTE5MzgsImV4cCI6MjA0NTI2NzkzOH0.cba0AT8ICf6I1EbdJi5O2xcPS2o3KqKVj4_jlTTEMA4"; // Wrap the key in quotes

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
