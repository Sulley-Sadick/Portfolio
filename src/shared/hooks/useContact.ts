import { contactService, type ContactDataType } from "../../features/contact";
import { contactValiator } from "../../features/contact/contact.validator";
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
    const parsed = contactValiator.parse(payload);
    const res = await contactService.create(parsed);

    setResponse(res);
    if (res.success) reset({ contact: "", message: "", name: "" });
  });

  return { register, formState, onSubmit, isLoading, msgCtnRef };
}
