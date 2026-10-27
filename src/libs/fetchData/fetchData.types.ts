import type {
  FetchStatus,
  FetchStatusWithData,
} from "./../../shared/utils/response/response.utils.types";
import type { ZodType } from "zod";

export type FetchDataProps<Payload = object | undefined> = {
  payload?: Payload;
  uri: string;
  method?: "get" | "post" | "delete" | "patch";
};

export type ServerResponse<T> = T & {
  rateExceeded: boolean;
  message: string;
  statusCode: ErrorCode | SuccessCode;
};

export type FetchDataType = <T>(payload: FetchDataProps) => {
  fetch: <Schema extends ZodType>(validator?: Schema) => Promise<void>;
  isError(): boolean;
  isSuccess(): boolean;
  readonly message: string;
  readonly error: string;
  readonly data: T;
  readonly dataWithStatus: FetchStatusWithData<T>;
  readonly fetchStatus: FetchStatus;
  statusCode: null;
};

export type FetchingStatus = "idle" | "loading" | "error" | "success";

export type ErrorCode = 400 | 403 | 404 | 500;

export type SuccessCode = 200 | 201;
