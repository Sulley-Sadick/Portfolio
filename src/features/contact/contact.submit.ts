import { type SubmitEvent } from "react";
import {
  FunctionsFetchError,
  FunctionsHttpError,
  FunctionsRelayError,
} from "@supabase/supabase-js";

import { supabase } from "../../libs/supabase/supabase-client";
import {
  CONTACT_HONEYPOT_FIELD,
  CONTACT_RATE_LIMIT_MESSAGE,
  CONTACT_SUCCESS_MESSAGE,
} from "./contact.limits";
import {
  contactValidator,
  isHoneypotRejection,
  type ContactFormValues,
} from "./contact.validator";

const CONTACT_OFFLINE_MESSAGE =
  "We could not send your message. Please check your internet connection and try again.";

const CONTACT_RELAY_MESSAGE =
  "The messaging service is temporarily unavailable. Please try again in a few minutes.";

const CONTACT_GENERIC_ERROR = "Something went wrong. Please try again.";

export type ContactSubmitResult =
  | { ok: true; message: string; honeypot: boolean }
  | { ok: false; message: string };

function readHoneypotValue(
  payload: ContactFormValues,
  event?: SubmitEvent,
): string {
  const form = event?.currentTarget;

  if (form instanceof HTMLFormElement) {
    const fromDom = new FormData(form).get(CONTACT_HONEYPOT_FIELD);
    if (typeof fromDom === "string") return fromDom;
  }

  return payload.honeypot ?? "";
}

async function readFunctionErrorMessage(error: unknown): Promise<string> {
  if (error instanceof FunctionsFetchError) {
    return CONTACT_OFFLINE_MESSAGE;
  }

  if (error instanceof FunctionsRelayError) {
    return CONTACT_RELAY_MESSAGE;
  }

  if (error instanceof FunctionsHttpError && error.context instanceof Response) {
    if (error.context.status === 429) {
      return CONTACT_RATE_LIMIT_MESSAGE;
    }

    const body: unknown = await error.context
      .clone()
      .json()
      .catch(() => null);

    if (
      body !== null &&
      typeof body === "object" &&
      "message" in body &&
      typeof body.message === "string"
    ) {
      return body.message;
    }
  }

  if (
    error !== null &&
    typeof error === "object" &&
    "name" in error &&
    typeof error.name === "string"
  ) {
    if (error.name === "FunctionsFetchError") return CONTACT_OFFLINE_MESSAGE;
    if (error.name === "FunctionsRelayError") return CONTACT_RELAY_MESSAGE;
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return CONTACT_GENERIC_ERROR;
}

/**
 * Validate and submit a contact form payload to the submit-contact Edge Function.
 * Honeypot trips resolve as a silent client-side success (no network write).
 */
export async function submitContactMessage(
  payload: ContactFormValues,
  event?: SubmitEvent,
): Promise<ContactSubmitResult> {
  const honeypot = readHoneypotValue(payload, event);
  const parsed = contactValidator.safeParse({ ...payload, honeypot });

  if (!parsed.success) {
    if (isHoneypotRejection(parsed.error)) {
      return { ok: true, message: CONTACT_SUCCESS_MESSAGE, honeypot: true };
    }

    return {
      ok: false,
      message: parsed.error.issues[0]?.message ?? "Invalid contact message",
    };
  }

  const { error } = await supabase.functions.invoke("submit-contact", {
    body: {
      name: parsed.data.name,
      contact: parsed.data.contact,
      message: parsed.data.message,
      [CONTACT_HONEYPOT_FIELD]: parsed.data.honeypot ?? "",
    },
  });

  if (error) {
    return { ok: false, message: await readFunctionErrorMessage(error) };
  }

  return { ok: true, message: CONTACT_SUCCESS_MESSAGE, honeypot: false };
}
