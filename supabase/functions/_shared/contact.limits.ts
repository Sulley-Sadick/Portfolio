/** Keep in sync with `src/features/contact/contact.limits.ts`. */
export const CONTACT_FIELD_LIMITS = {
  name: { min: 2, max: 100 },
  contact: { min: 3, max: 254 },
  message: { min: 2, max: 2000 },
} as const;

/** Max accepted submissions per client IP hash within the rolling window. */
export const CONTACT_RATE_LIMIT = {
  windowMinutes: 15,
  maxSubmissions: 5,
} as const;
