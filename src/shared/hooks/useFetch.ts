import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type SubmitEvent,
} from "react";
import { fe } from "../utils/fe";
import { tryCatch } from "../utils/tryCatch";

type UpdateProps = {
  message: unknown;
  error?: boolean | undefined;
  success?: boolean | undefined;
};

export function useFetch<T>({
  data,
}: { data?: T | Partial<T> | undefined } = {}) {
  const formDataRef = useRef(data);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  const msgCtnRef = useCallback(<Ref>(ref?: Ref) => {
    if (ref instanceof HTMLElement) containerRef.current = ref;
  }, []);

  const clearFormState = useCallback(() => {
    const timeoutId = timeoutRef.current;
    if (timeoutId) clearTimeout(timeoutId);
    timeoutRef.current = null;

    setMessage("");
    setIsLoading(false);
    setError(false);
    setSuccess(false);
  }, []);

  const autoClearFormState = useCallback(
    (delayInSecs = 6) => {
      const timeoutId = timeoutRef.current;

      if (timeoutId) clearTimeout(timeoutId);

      timeoutRef.current = setTimeout(clearFormState, delayInSecs * 1000);
    },
    [clearFormState],
  );

  const setResponse = useCallback(
    ({ message, error, success }: UpdateProps) => {
      setMessage(fe(message));
      setError(!!error);
      setSuccess(!!success);
      setIsLoading(false);
      autoClearFormState(success ? 5 : 6);
    },
    [autoClearFormState],
  );

  useLayoutEffect(() => {
    if (!message) return;

    const ctn = containerRef.current;
    if (!(ctn instanceof HTMLElement)) return;

    ctn.classList.add("scroll-mt-120");
    ctn.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const submitRequest = useCallback(
    (callback: (data: T, event?: SubmitEvent) => Promise<void>) => {
      return async function (e?: SubmitEvent) {
        e?.preventDefault();
        clearFormState();
        setIsLoading(true);

        const result = await tryCatch(
          callback(formDataRef.current as unknown as T, e),
        );

        if (!result.success) {
          setResponse({ error: true, message: result.error });
        }

        setIsLoading(false);
      };
    },
    [clearFormState, setResponse],
  );

  useEffect(() => {
    return () => {
      const timeoutId = timeoutRef.current;

      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  useLayoutEffect(() => {
    formDataRef.current = data;
  }, [data]);

  return {
    isLoading,
    error,
    message,
    success,
    setResponse,
    submitRequest,
    clearFormState,
    autoClearFormState,
    msgCtnRef,
  };
}
