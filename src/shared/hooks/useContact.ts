import {
  type ContactDataType,
  submitContactMessage,
} from "../../features/contact";
import { useForm } from "./useForm/useForm";

const EMPTY_CONTACT_FORM: ContactDataType = {
  name: "",
  message: "",
  contact: "",
  honeypot: "",
};

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
    data: EMPTY_CONTACT_FORM,
  });

  const onSubmit = handleSubmit(async (payload, event) => {
    const result = await submitContactMessage(payload, event);

    if (!result.ok) {
      throw new Error(result.message);
    }

    setResponse({ message: result.message, success: true });
    reset(EMPTY_CONTACT_FORM);
  });

  return { register, formState, onSubmit, isLoading, msgCtnRef };
}
