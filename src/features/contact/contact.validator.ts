import z from "zod";

export const contactValiator = z.object({
  name: z.string().min(2, "Name must be at least 2 character long."),
  contact: z.string().min(2, "Contact must be at least 2 character long."),
  message: z.string().min(2, "Message must be at least 2 character long."),
  honeyPot: z
    .string("Message not sent at the moment, try again later.")
    .refine((value) => !value)
    .nullish(),
});
