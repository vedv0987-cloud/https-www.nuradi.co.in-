import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Server-side admin client (bypasses RLS, never expose to browser)
export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

export interface Subscriber {
  id: string;
  email: string;
  status: "pending" | "active" | "unsubscribed";
  token: string;
  subscribed_at: string;
  confirmed_at: string | null;
  unsubscribed_at: string | null;
}
