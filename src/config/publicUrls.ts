import { CANONICAL_HOST } from "./canonicalUrl";
import { getEnv } from "./utils/getEnv";

const FALLBACK_APP_URL = `https://${CANONICAL_HOST}/`;

const appUrl =
  getEnv({ name: "VITE_APP_URL", required: false }) ?? FALLBACK_APP_URL;

const supabaseUrl = getEnv({ name: "VITE_SUPABASE_URL", required: false });
const supabasePublisherKey = getEnv({
  name: "VITE_SUPABASE_PUBLISHER_KEY",
  required: false,
});

const serverUri =
  getEnv({ name: "VITE_SERVER_URI", required: false }) ?? appUrl;

export const publicUrls = {
  /** Present only when both Supabase env vars are set. */
  supabaseUrl,
  supabasePublisherKey,
  appUrl,
  serverUri,
} as const;

export function isSupabaseConfigured(): boolean {
  return Boolean(supabaseUrl && supabasePublisherKey);
}
