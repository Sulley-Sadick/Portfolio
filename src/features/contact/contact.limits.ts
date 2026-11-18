/** Keep in sync with `supabase/functions/_shared/contact.limits.ts`. */
export const CONTACT_FIELD_LIMITS = {
  name: { min: 2, max: 100 },
  contact: { min: 3, max: 254 },
  message: { min: 2, max: 2000 },
} as const;

export const CONTACT_HONEYPOT_FIELD = "honeypot" as const;

export const CONTACT_SUCCESS_MESSAGE =
  "Your message was sent successfully. I will get back to you soon.";

export const CONTACT_RATE_LIMIT_MESSAGE =
  "Too many messages were sent recently. Please try again later.";
