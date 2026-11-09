import { withSupabase } from "npm:@supabase/server@1";

import { sendContactNotification } from "../_shared/contact-notify.ts";
import { parseContactInsertWebhook } from "../_shared/parse-contact-webhook.ts";

export default {
  fetch: withSupabase({ auth: "secret" }, async (req) => {
    if (req.method !== "POST") {
      return Response.json({ message: "Method not allowed" }, { status: 405 });
    }

    let body: unknown;

    try {
      body = await req.json();
    } catch {
      return Response.json(
        { message: "Invalid webhook payload" },
        { status: 400 },
      );
    }

    const payload = parseContactInsertWebhook(body);

    if (!payload) {
      return Response.json({ error: "Unsupported webhook" }, { status: 400 });
    }

    try {
      const data = await sendContactNotification(payload.record);

      return Response.json({ success: true, emailId: data?.id });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to send contact email";

      return Response.json({ error: message }, { status: 500 });
    }
  }),
};
