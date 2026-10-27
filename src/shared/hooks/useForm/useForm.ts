import { useCallback, type ChangeEvent } from "react";

import { useFetch } from "../useFetch";
import { useSetState } from "../useSetState/useSetState";
import type { Path, PathValue } from "../../../libs/dot-prop";

export type UpdateProps = {
  message: unknown;
  error?: boolean;
  success?: boolean;
};

type UseFormProps<T> = {
  data?: Partial<T>;
};

export function useForm<T extends Record<string, unknown>>({
  data,
}: UseFormProps<T> = {}) {
  const [
    formData,
    { setValue, getValue, getPathValueFromData, createFieldArray, reset },
  ] = useSetState(data as T);

  const {
    error,
    message,
    isLoading,
    submitRequest: handleSubmit,
    setResponse,
    success,
    clearFormState,
    autoClearFormState,
    msgCtnRef,
  } = useFetch({
    data: formData,
  });

  const register = useCallback(
    <P extends Path<T>>(path: P) => {
      return {
        value: (getPathValueFromData(formData, path) ?? "") as string,
        onChange(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
          setValue(path, e.target.value as PathValue<T, P>);
        },
      };
    },
    [formData, getPathValueFromData, setValue],
  );

  return {
    getValue,
    setValue,
    reset,
    createFieldArray,
    setResponse,
    formState: { message, error, success, isLoading },
    data: formData,
    isLoading,
    handleSubmit,
    msgCtnRef,
    register,
    clearFormState,
    autoClearFormState,
  };
}
