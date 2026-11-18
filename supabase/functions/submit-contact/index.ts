import { withSupabase } from "npm:@supabase/server@1";

import { hashClientIp, readClientIp } from "../_shared/client-ip.ts";
import { CONTACT_RATE_LIMIT } from "../_shared/contact.limits.ts";
import {
  contactValidator,
  isHoneypotRejection,
} from "../_shared/contact.validator.ts";

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

    const parsed = contactValidator.safeParse(body);

    if (!parsed.success) {
      if (isHoneypotRejection(parsed.error)) {
        // Silent success — do not tip off bots.
        return Response.json({ success: true });
      }

      return Response.json(
        {
          message:
            parsed.error.issues[0]?.message ?? "Invalid contact message",
        },
        { status: 400 },
      );
    }

    const ip = readClientIp(req);
    const clientIpHash = ip ? await hashClientIp(ip) : null;

    if (clientIpHash) {
      const windowStart = new Date(
        Date.now() - CONTACT_RATE_LIMIT.windowMinutes * 60_000,
      ).toISOString();

      const { count, error: rateError } = await ctx.supabaseAdmin
        .from("contact_messages")
        .select("id", { count: "exact", head: true })
        .eq("client_ip_hash", clientIpHash)
        .gte("created_at", windowStart);

      if (rateError) {
        console.error("contact rate-limit query failed", rateError.message);
        return Response.json(
          { message: "Something went wrong, try again!" },
          { status: 500 },
        );
      }

      if ((count ?? 0) >= CONTACT_RATE_LIMIT.maxSubmissions) {
        return Response.json(
          {
            message:
              "Too many messages were sent recently. Please try again later.",
          },
          { status: 429 },
        );
      }
    }

    // Row insert only; contact email is sent by DB trigger → send-contact-email.
    const { error } = await ctx.supabaseAdmin.from("contact_messages").insert({
      name: parsed.data.name,
      contact: parsed.data.contact,
      message: parsed.data.message,
      client_ip_hash: clientIpHash,
    });

    if (error) {
      console.error("contact_messages insert failed", error.message);
      return Response.json(
        { message: "Something went wrong, try again!" },
        { status: 500 },
      );
    }

    return Response.json({ success: true });
  }),
};
