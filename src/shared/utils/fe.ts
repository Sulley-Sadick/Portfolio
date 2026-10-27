import { AxiosError } from "axios";
import { ZodError } from "zod";

export function fe(error: unknown) {
  if (typeof error === "string") return error;

  if (error instanceof ZodError)
    return error?.issues[0]?.message || "Something went wrong!";

  if (error instanceof AxiosError)
    return (error?.response?.data?.message as string) || error?.message;

  if (error instanceof Error) return error.message;

  return "Something went wrong!";
}
