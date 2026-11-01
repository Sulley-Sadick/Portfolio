import { createClient } from "@supabase/supabase-js";

import { publicUrls } from "../../config/publicUrls";

export const supabase = createClient(
  publicUrls.supabaseUrl,
  publicUrls.supabasePublisherKey,
);
