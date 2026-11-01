import { type ContactDataType } from "../../features/contact";
import { contactValiator } from "../../features/contact/contact.validator";
import { supabase } from "../../libs/supabase/supabase-client";
import { useForm } from "./useForm/useForm";

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

  const onSubmit = handleSubmit(async function sendMessage(payload) {
    try {
      const parsed = contactValiator.parse(payload);
      const { error } = await supabase
        .from("contact_messages")
        .insert(parsed)
        .single();

      if (error) throw error;

      setResponse({ message: "Data sent successfully", success: true });
      reset({ contact: "", message: "", name: "" });
    } catch (error) {
      setResponse({
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong, try again!",
        error: true,
      });
    }
  });

  return { register, formState, onSubmit, isLoading, msgCtnRef };
}
