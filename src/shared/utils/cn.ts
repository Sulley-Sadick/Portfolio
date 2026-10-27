import type {} from "clsx";
import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";

export const cn = function (...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
};
