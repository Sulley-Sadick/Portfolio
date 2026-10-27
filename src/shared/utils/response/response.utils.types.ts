export type ResponseUtilType<
  T = unknown,
  Success extends "success" | "error" = "success",
> = Success extends "success" ? FetchSuccessType & { data: T } : FetchErrorType;

type FetchSuccessType = {
  message: string;
  success: true;
  error: false;
};

type FetchErrorType = {
  message: string;
  success: false;
  error: true;
};

export type FetchStatusWithData<T> =
  FetchErrorType | (FetchSuccessType & { data: T });

export type FetchStatus = FetchSuccessType | FetchErrorType;
