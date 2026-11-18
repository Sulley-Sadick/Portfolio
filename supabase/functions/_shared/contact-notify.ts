import { Resend } from "npm:resend";

import type { ContactMessageRecord } from "./contact.types.ts";

type ContactNotifyConfig = {
  apiKey: string;
  from: string;
  to: string;
};

function requireEnv(name: string): string {
  const value = Deno.env.get(name)?.trim();
  if (!value) {
    throw new Error(`${name} is not configured`);
  }
  return value;
}

function readNotifyConfig(): ContactNotifyConfig {
  return {
    apiKey: requireEnv("RESEND_API_KEY"),
    from:
      Deno.env.get("RESEND_FROM")?.trim() ||
      "Sulley Sadick <contact@sulleysadick.dev>",
    to: requireEnv("CONTACT_EMAIL_TO"),
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
