import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://oqthbxvxdlmdkxynzlyt.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xdGhieHZ4ZGxtZGt4eW56bHl0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxODI2OTM1MywiZXhwIjoyMDMzODQ1MzUzfQ.K8SKaBhGCb5ATx-868hcDsMMp8en0h3ka-ovZqd6ZGk";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
