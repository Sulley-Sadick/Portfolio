import type { ResponseUtilType } from "./response.utils.types";

export function responseUtil<T, Success extends "success" | "error">(
  message: string,
  sucess: Success,
  data?: T,
): ResponseUtilType<T, Success> {
  if (sucess === "success")
    return {
      message,
      success: true,
      error: false,
      ...(data ? { data } : {}),
    } as ResponseUtilType<T, Success>;

  return { message, success: false, error: true } as ResponseUtilType<
    T,
    Success
  >;
}
