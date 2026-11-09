import { getEnv } from "./utils/getEnv";

const supabaseUrl = getEnv({ name: "VITE_SUPABASE_URL" });
const appUrl = getEnv({ name: "VITE_APP_URL" });
const supabasePublisherKey = getEnv({ name: "VITE_SUPABASE_PUBLISHER_KEY" });
const serverUri =
  getEnv({ name: "VITE_SERVER_URI", required: false }) ?? appUrl;

export const publicUrls = {
  supabaseUrl,
  supabasePublisherKey,
  appUrl,
  serverUri,
};
