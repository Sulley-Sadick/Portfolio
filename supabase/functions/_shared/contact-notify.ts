import { Resend } from "npm:resend";

import type { ContactMessageRecord } from "./contact.types.ts";

type ContactNotifyConfig = {
  apiKey: string;
  from: string;
  to: string;
};

function readNotifyConfig(): ContactNotifyConfig {
  const apiKey = Deno.env.get("RESEND_API_KEY");

  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured");
  }

  return {
    apiKey,
    from: Deno.env.get("RESEND_FROM") ?? "onboarding@resend.dev",
    to: Deno.env.get("CONTACT_EMAIL_TO") ?? "sulleysadick766@gmail.com",
  };
}

export async function sendContactNotification(record: ContactMessageRecord) {
  const { apiKey, from, to } = readNotifyConfig();
  const resend = new Resend(apiKey);
  const { id, name, contact, message } = record;

  const { data, error } = await resend.emails.send({
    from,
    to,
    subject: `New contact message from ${name}`,
    text: [
      "New contact form submission",
      `Name: ${name}`,
      `Contact: ${contact}`,
      `Message: ${message}`,
      `MessageId: ${id}`,
    ].join("\n"),
  });

  if (error) {
    throw new Error(error.message ?? "Failed to send contact email");
  }

  return data;
}
