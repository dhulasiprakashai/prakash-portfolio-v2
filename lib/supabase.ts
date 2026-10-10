import { createClient } from "@supabase/supabase-js";

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const rawKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const url = rawUrl ? rawUrl.trim() : "";
const key = rawKey ? rawKey.trim() : "";

const isConfigured = 
  Boolean(url && 
  key && 
  !url.includes("YOUR_PROJECT") && 
  !key.includes("YOUR_SUPABASE_ANON_KEY"));

export const supabase = isConfigured
  ? createClient(url, key, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        storageKey: "prakash_portfolio_auth_token",
      },
    })
  : null;

