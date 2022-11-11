import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
	"https://ymxakdbjjozlpagctvfb.supabase.co",
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlteGFrZGJqam96bHBhZ2N0dmZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgxNjg3NzksImV4cCI6MTk4Mzc0NDc3OX0.83nswUzlr_sREYI4SNs0EHF_hkK8xR3qoXTJsO7s7kY"
);