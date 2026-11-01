import { getEnv } from "./utils/getEnv";

const supabaseUrl = getEnv({ name: "VITE_SUPABASE_URL" });
const appUrl = getEnv({ name: "VITE_APP_URL" });
const supabasePublisherKey = getEnv({ name: "VITE_SUPABASE_PUBLISHER_KEY" });

export const publicUrls = { supabaseUrl, supabasePublisherKey, appUrl };
