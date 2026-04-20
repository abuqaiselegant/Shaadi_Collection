import { createClient } from '@supabase/supabase-js';
import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Browser client — use in client components
export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);

// Server client — use in API routes and server components
export const createServerClient = () =>
    createClient(supabaseUrl, process.env.SUPABASE_SERVICE_ROLE_KEY!);
