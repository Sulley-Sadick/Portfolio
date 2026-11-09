import { type SubmitEvent } from "react";
import {
  FunctionsFetchError,
  FunctionsRelayError,
} from "@supabase/supabase-js";

import { type ContactDataType } from "../../features/contact";
import { contactValiator } from "../../features/contact/contact.validator";
import { supabase } from "../../libs/supabase/supabase-client";
import { useForm } from "./useForm/useForm";

const CONTACT_OFFLINE_MESSAGE =
  "We couldn't send your message. Please check your internet connection and try again.";

const CONTACT_RELAY_MESSAGE =
  "Our messaging service is temporarily unavailable. Please try again in a few minutes.";

async function contactFunctionError(error: unknown) {
  if (error instanceof FunctionsFetchError) {
    return new Error(CONTACT_OFFLINE_MESSAGE);
  }

  if (error instanceof FunctionsRelayError) {
    return new Error(CONTACT_RELAY_MESSAGE);
  }

  if (
    error !== null &&
    typeof error === "object" &&
    "name" in error &&
    typeof error.name === "string"
  ) {
    if (error.name === "FunctionsFetchError") {
      return new Error(CONTACT_OFFLINE_MESSAGE);
    }

    if (error.name === "FunctionsRelayError") {
      return new Error(CONTACT_RELAY_MESSAGE);
    }
  }

  if (
    error !== null &&
    typeof error === "object" &&
    "context" in error &&
    error.context instanceof Response
  ) {
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
      return new Error(body.message);
    }
  }

  return error instanceof Error
    ? error
    : new Error("Something went wrong, try again!");
}

export function useContact() {
  const {
    isLoading,
    reset,
    register,
    setResponse,
    formState,
    handleSubmit,
    msgCtnRef,
  } = useForm<ContactDataType>({
    data: { name: "", message: "", contact: "" },
  });

  const onSubmit = handleSubmit(
    async function sendMessage(payload: ContactDataType, event?: SubmitEvent) {
      const form = event?.currentTarget;
      const honeypot =
        form instanceof HTMLFormElement
          ? String(new FormData(form).get("honeypot") ?? "")
          : (payload.honeypot ?? "");
      const parsed = contactValiator.safeParse({ ...payload, honeypot });

      if (!parsed.success) {
        const tripped = parsed.error.issues.some(
          (issue) => issue.path[0] === "honeypot",
        );

        if (tripped) {
          setResponse({ message: "Data sent successfully", success: true });
          reset({ contact: "", message: "", name: "" });
          return;
        }

        const message =
          parsed.error.issues[0]?.message ?? "Invalid contact message";
        throw new Error(message);
      }

      const { error } = await supabase.functions.invoke("submit-contact", {
        body: {
          name: parsed.data.name,
          contact: parsed.data.contact,
          message: parsed.data.message,
          honeypot: parsed.data.honeypot ?? "",
        },
      });

      if (error) throw await contactFunctionError(error);

      setResponse({ message: "Data sent successfully", success: true });
      reset({ contact: "", message: "", name: "" });
    },
  );

  return { register, formState, onSubmit, isLoading, msgCtnRef };
}
