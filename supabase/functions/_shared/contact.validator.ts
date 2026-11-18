import z from "zod";

import { CONTACT_FIELD_LIMITS } from "./contact.limits.ts";

const { name, contact, message } = CONTACT_FIELD_LIMITS;

export const contactValidator = z.object({
  name: z
    .string()
    .trim()
    .min(name.min, `Name must be at least ${name.min} characters.`)
    .max(name.max, `Name must be at most ${name.max} characters.`),
  contact: z
    .string()
    .trim()
    .min(contact.min, "Enter a valid email address or phone number.")
    .max(contact.max, "Enter a valid email address or phone number.")
    .pipe(
      z.union([z.email(), z.e164()], {
        error: "Enter a valid email address or phone number.",
      }),
    ),
  message: z
    .string()
    .trim()
    .min(message.min, `Message must be at least ${message.min} characters.`)
    .max(message.max, `Message must be at most ${message.max} characters.`),
  /** Bots that fill every named field trip this; humans leave it empty. */
  honeypot: z
    .string()
    .nullish()
    .refine((value) => !value, {
      message: "Message not sent at the moment, try again later.",
    }),
});

export type ContactSubmission = z.infer<typeof contactValidator>;

export function isHoneypotRejection(error: z.ZodError): boolean {
  return error.issues.some((issue) => issue.path[0] === "honeypot");
}
