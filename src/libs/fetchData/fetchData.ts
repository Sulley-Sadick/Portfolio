import type { ZodType } from "zod";
import type { AxiosResponse } from "axios";

import type {
  FetchDataProps,
  FetchDataType,
  ServerResponse,
} from "./fetchData.types";
import { type ErrorCode, type SuccessCode } from "./fetchData.types";
import { syncTryCatch, tryCatch } from "../../shared/utils/tryCatch";
import { fe } from "../../shared/utils/fe";
import { axiosInstance } from "./axios";
import {
  responseUtil,
  type FetchStatus,
  type FetchStatusWithData,
} from "../../shared/utils/response";

export function fetchData(
  getAccessToken: () => string | null | undefined,
): FetchDataType {
  return <T>(payload: FetchDataProps) => {
    const localPayload = payload;

    let status: string | null = "idle";
    let statusCode: ErrorCode | SuccessCode | null = null;
    let error: string | null = null;
    let message: string | null = null;

    let data: T | null = null;

    async function fetch<Schema extends ZodType>(validator?: Schema) {
      if (validator) {
        const res = syncTryCatch(() => validator.parse(localPayload.payload));

        if (!res.success) {
          error = fe(res.error);
          message = "error";
          statusCode = 400;

          return;
        }

        if (data) localPayload.payload = data;
      }

      const accessToken = getAccessToken();

      const axios = axiosInstance({ accessToken });

      let promise: Promise<AxiosResponse<ServerResponse<T>>>;

      const { uri, method = "post", payload } = localPayload;

      switch (method) {
        case "delete":
        case "get": {
          promise = axios[method]<ServerResponse<T>>(uri);

          break;
        }

        default: {
          promise = axios[method]<ServerResponse<T>>(uri, payload);
        }
      }

      message = "error";
      statusCode = 400;

      const result = await tryCatch(promise);

      if (!result.success) {
        error = fe(result.error);
        return;
      }

      if (![200, 201].includes(result.data.data.statusCode)) {
        error = fe(result.data.data.message);
        return;
      }

      const {
        statusCode: _sCode,
        message: resMessage,
        ...rest
      } = result.data.data;

      message = resMessage;
      statusCode = _sCode;
      status = "success";

      data = rest as T;
    }

    return {
      fetch,
      isError() {
        return status === "error";
      },

      isSuccess() {
        return status === "success";
      },
      get message(): string {
        if (!message) throw new Error("No success message");

        return message;
      },

      get error(): string {
        if (!error) throw new Error("No error exists");

        return error;
      },

      get data(): T {
        if (!data)
          throw new Error(error ?? "Data not available, call fetch first");

        return data;
      },
      get dataWithStatus(): FetchStatusWithData<T> {
        if (data) return responseUtil(message!, "success", data!);

        return responseUtil(status!, "error");
      },

      get fetchStatus(): FetchStatus {
        if (status === "success") return responseUtil(message!, "success");

        return responseUtil(error!, "error");
      },

      statusCode,
    };
  };
}

export function createFetchDataClient(
  getAccessToken: () => string | null | undefined,
) {
  return fetchData(getAccessToken);
}
