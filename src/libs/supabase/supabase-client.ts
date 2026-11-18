import { createClient, type SupabaseClient } from "@supabase/supabase-js";

import {
  isSupabaseConfigured,
  publicUrls,
} from "../../config/publicUrls";

/**
 * Browser Supabase client — created only when both env vars are present.
 * Importing this module never throws, so static pages can boot without secrets.
 */
let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (!isSupabaseConfigured()) return null;

  if (!client) {
    client = createClient(
      publicUrls.supabaseUrl!,
      publicUrls.supabasePublisherKey!,
    );
  }

  return client;
}

export { isSupabaseConfigured };
