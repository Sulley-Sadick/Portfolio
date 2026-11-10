import { withSupabase } from "npm:@supabase/server@1";

import { contactValiator } from "./contact.validator.ts";

export default {
  fetch: withSupabase({ auth: "publishable" }, async (req, ctx) => {
    if (req.method !== "POST") {
      return Response.json({ message: "Method not allowed" }, { status: 405 });
    }

    let body: unknown;

    try {
      body = await req.json();
    } catch {
      return Response.json(
        { message: "Invalid contact message" },
        { status: 400 },
      );
    }

    const parsed = contactValiator.safeParse(body);

    if (!parsed.success) {
      const tripped = parsed.error.issues.some(
        (issue) => issue.path[0] === "honeypot",
      );

      if (tripped) return Response.json({ success: true });

      return Response.json(
        {
          message: parsed.error.issues[0]?.message ?? "Invalid contact message",
        },
        { status: 400 },
      );
    }

    // Row insert only; contact email is sent by DB trigger → send-contact-email.
    const { error } = await ctx.supabaseAdmin.from("contact_messages").insert({
      name: parsed.data.name,
      contact: parsed.data.contact,
      message: parsed.data.message,
    });

    if (error) {
      return Response.json(
        { message: "Something went wrong, try again!" },
        { status: 500 },
      );
    }

    return Response.json({ success: true });
  }),
};
